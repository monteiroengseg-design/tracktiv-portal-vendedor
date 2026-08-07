import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    // ── 1. Verifica JWT do chamante ────────────────────────────────
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS })
    }

    const supabaseUrl  = Deno.env.get('SUPABASE_URL')!
    const anonKey      = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Cliente com token do usuário logado — respeita RLS
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user }, error: authErr } = await callerClient.auth.getUser()
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401, headers: CORS })
    }

    // ── 2. Confirma que o chamante é gestor ou presidente ──────────
    const { data: callerProfile } = await callerClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!callerProfile || !['gestor', 'presidente'].includes(callerProfile.role)) {
      return new Response(JSON.stringify({ error: 'Acesso negado: apenas gestores podem convidar usuários' }), { status: 403, headers: CORS })
    }

    // ── 3. Lê o body ───────────────────────────────────────────────
    const { email, name, role, extraData = {}, password = null } = await req.json()
    if (!email || !name || !role) {
      return new Response(JSON.stringify({ error: 'email, name e role são obrigatórios' }), { status: 400, headers: CORS })
    }

    // ── 4. Admin client — usa service_role key ─────────────────────
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // ── 5. Cria o usuário no Supabase Auth ──────────────────────────
    // Se vier `password`, cria já com senha definida (fluxo do portal do
    // cliente, onde o gestor define a senha na hora). Sem `password`,
    // manda convite oficial por e-mail (fluxo da equipe interna).
    let userId
    if (password) {
      const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
        email, password, email_confirm: true,
        user_metadata: { name, role }
      })
      if (createErr) {
        return new Response(JSON.stringify({ error: createErr.message }), { status: 400, headers: CORS })
      }
      userId = created.user.id
    } else {
      const { data: invite, error: inviteErr } = await adminClient.auth.admin.inviteUserByEmail(email, {
        data: { name, role },
        redirectTo: 'https://sgrportal.netlify.app/?action=set-password'
      })
      if (inviteErr) {
        return new Response(JSON.stringify({ error: inviteErr.message }), { status: 400, headers: CORS })
      }
      userId = invite.user.id
    }

    // ── 6. Cria profile com UUID gerado pelo Supabase ──────────────
    const { error: profileErr } = await adminClient.from('profiles').upsert({
      id:           userId,
      name,
      email,
      role,
      partner_type: extraData.partnerType || null,
      data:         { active: true, invitePending: !password, ...extraData }
    })

    if (profileErr) {
      console.warn('Profile insert error:', profileErr.message)
    }

    return new Response(
      JSON.stringify({ userId, success: true }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('invite-user error:', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  }
})
