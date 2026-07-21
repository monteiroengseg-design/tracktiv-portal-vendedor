-- Supabase schema and seed generated from app.js sampleState
-- Includes auth.users seed, public.profiles, data tables, relationships, and RLS policies.

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- Seed auth.users with encrypted passwords
-- Execute no SQL Editor do Supabase (requer pgcrypto)
-- ----------------------------------------------------------------
do $$
begin
  if exists (
    select 1 from pg_namespace n
    join pg_class c on n.oid = c.relnamespace
    where n.nspname = 'auth' and c.relname = 'users'
  ) then

    -- Presidente (id fixo — precisa bater com public.profiles.id pra RLS via auth.uid() funcionar)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '00000000-0000-0000-0000-000000000001',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'presidente@tracktiv.com.br',
      crypt('Admin@2024', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Presidente Demo"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Admin@2024', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '00000000-0000-0000-0000-000000000001'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

    -- Gestor (id fixo — bate com public.profiles.id; e-mail alinhado com CLAUDE.md/sampleState)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '00000000-0000-0000-0000-000000000002',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'gestor@tracktiv.com',
      crypt('Gestor123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Gestor Tracktiv"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Gestor123', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '00000000-0000-0000-0000-000000000002'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

    -- Técnico (id fixo — bate com public.profiles.id)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '55555555-5555-5555-5555-555555555555',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'tecnico@tracktiv.com',
      crypt('Tecnico123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Rafael Santos"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Tecnico123', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '55555555-5555-5555-5555-555555555555'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

    -- Consultor (id fixo — bate com public.profiles.id)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '11111111-1111-1111-1111-111111111111',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'consultor@tracktiv.com',
      crypt('Consultor123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Laura Mendes"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Consultor123', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '11111111-1111-1111-1111-111111111111'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

    -- Instalador (id fixo — bate com public.profiles.id)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '33333333-3333-3333-3333-333333333333',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'instalador@tracktiv.com',
      crypt('Instalador123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Carlos Pereira"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Instalador123', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '33333333-3333-3333-3333-333333333333'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

    -- Cliente (id fixo — bate com public.profiles.id)
    insert into auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      '77777777-7777-7777-7777-777777777777',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      'cliente@tracktiv.com',
      crypt('Cliente123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Auto Prime Transportes"}',
      now(), now(), '', '', '', ''
    )
    on conflict (id) do update set
      instance_id = excluded.instance_id,
      encrypted_password = crypt('Cliente123', gen_salt('bf')),
      email_confirmed_at = coalesce(auth.users.email_confirmed_at, excluded.email_confirmed_at),
      confirmation_token = coalesce(auth.users.confirmation_token, ''),
      recovery_token = coalesce(auth.users.recovery_token, ''),
      email_change_token_new = coalesce(auth.users.email_change_token_new, ''),
      email_change = coalesce(auth.users.email_change, ''),
      updated_at = now();

    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    select gen_random_uuid(), u.id::text, u.id,
           jsonb_build_object('sub', u.id::text, 'email', u.email),
           'email', now(), now(), now()
    from auth.users u
    where u.id = '77777777-7777-7777-7777-777777777777'
      and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

  end if;
end
$$;

-- ----------------------------------------------------------------
-- Clients (criado antes de profiles para evitar referência circular)
-- FKs para profiles serão adicionadas via ALTER TABLE após profiles ser criada
-- ----------------------------------------------------------------
create table if not exists public.clients (
  id uuid primary key,
  consultant_id uuid,
  instalador_id uuid,
  name text not null,
  phone text,
  is_whatsapp boolean default false,
  email text,
  cpf text,
  rg text,
  address text,
  product text,
  plan text,
  monthly_fee numeric(10,2),
  plates text,
  payment_date int,
  need text,
  origins text[],
  coupon text,
  notes text,
  stage text,
  closed_date date,
  created_at timestamptz default now()
);

create index if not exists idx_clients_consultant on public.clients (consultant_id);
create index if not exists idx_clients_instalador on public.clients (instalador_id);

-- ----------------------------------------------------------------
-- Profiles (referencia clients via linked_client_id — funciona agora)
-- ----------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key,
  name text not null,
  email text,
  role text not null,
  partner_type text,
  linked_client_id uuid references public.clients(id),
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create unique index if not exists profiles_email_idx on public.profiles(email);

-- Adiciona FKs de clients para profiles (agora que profiles existe)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'clients_consultant_id_fkey'
  ) then
    alter table public.clients
      add constraint clients_consultant_id_fkey
      foreign key (consultant_id) references public.profiles(id);
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'clients_instalador_id_fkey'
  ) then
    alter table public.clients
      add constraint clients_instalador_id_fkey
      foreign key (instalador_id) references public.profiles(id);
  end if;
end
$$;

-- ----------------------------------------------------------------
-- Installations
-- ----------------------------------------------------------------
create table if not exists public.installations (
  id uuid primary key,
  instalador_id uuid references public.profiles(id),
  client_id uuid references public.clients(id),
  client_name text,
  plate text,
  date date,
  notes text,
  created_at timestamptz default now()
);
create index if not exists idx_installations_instalador on public.installations (instalador_id);

-- ----------------------------------------------------------------
-- Coupons
-- ----------------------------------------------------------------
create table if not exists public.coupons (
  id uuid primary key,
  code text not null unique,
  discount_type text,
  discount_value numeric,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- Client documents
-- ----------------------------------------------------------------
create table if not exists public.client_documents (
  id uuid primary key,
  client_id uuid references public.clients(id),
  category text,
  name text,
  file_name text,
  mime_type text,
  size int,
  uploaded_at date,
  uploaded_by text,
  notes text,
  data bytea
);

-- ----------------------------------------------------------------
-- Chamados (tickets)
-- ----------------------------------------------------------------
create table if not exists public.chamados (
  id uuid primary key,
  client_id uuid references public.clients(id),
  tecnico_id uuid references public.profiles(id),
  title text,
  description text,
  priority text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  messages jsonb default '[]'::jsonb
);
create index if not exists idx_chamados_tecnico on public.chamados (tecnico_id);

-- ----------------------------------------------------------------
-- Technician-client assignment
-- ----------------------------------------------------------------
create table if not exists public.tecnico_clients (
  tecnico_id uuid references public.profiles(id),
  client_id uuid references public.clients(id),
  primary key (tecnico_id, client_id)
);

-- ----------------------------------------------------------------
-- Client technician history
-- ----------------------------------------------------------------
create table if not exists public.client_tecnico_history (
  id uuid primary key,
  client_id uuid references public.clients(id),
  tecnico_id uuid references public.profiles(id),
  tecnico_name text,
  assigned_at date,
  assigned_by text,
  obs text
);

-- ----------------------------------------------------------------
-- Document slots
-- ----------------------------------------------------------------
create table if not exists public.doc_slots (
  id uuid primary key,
  client_key text,
  name text,
  service_key text,
  doc_id uuid references public.client_documents(id),
  uploaded_at date,
  uploaded_by text
);

-- ----------------------------------------------------------------
-- Document checklists
-- ----------------------------------------------------------------
create table if not exists public.doc_checklists (
  id uuid primary key,
  client_key text,
  "label" text,
  "required" boolean default false,
  category text,
  instruction text,
  "done" boolean default false,
  "status" text,
  deadline date,
  added_by text,
  added_by_id uuid references public.profiles(id),
  added_at date,
  completed_at date,
  uploaded_doc_id uuid references public.client_documents(id)
);

-- ----------------------------------------------------------------
-- Comunicados
-- ----------------------------------------------------------------
create table if not exists public.comunicados (
  id uuid primary key,
  autor_id uuid references public.profiles(id),
  titulo text,
  mensagem text,
  prioridade text,
  criado_em date,
  lidos text[] default '{}'
);

-- ----------------------------------------------------------------
-- Notifications
-- ----------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key,
  user_id uuid references public.profiles(id),
  type text,
  message text,
  link text,
  seen boolean default false,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- Points config
-- ----------------------------------------------------------------
create table if not exists public.points_config (
  id text primary key default 'points_config',
  points_per_ref int,
  brl_per_point numeric(10,2),
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- Goals config
-- ----------------------------------------------------------------
create table if not exists public.goals_config (
  id text primary key default 'default',
  default_goal int,
  by_consultant jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- Products and plan configuration
-- ----------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key,
  name text not null,
  category text,
  description text,
  status text,
  featured boolean default false,
  icon text,
  signup_fee numeric,
  monthly_fee numeric,
  payment_options text[],
  discount_annual numeric,
  special_conditions text,
  payment_personalized text,
  card_installments int,
  visibility text[],
  commission jsonb,
  created_at timestamptz default now()
);

create table if not exists public.product_plans (
  id uuid primary key,
  product_id uuid references public.products(id) on delete cascade,
  name text,
  value numeric,
  description text,
  items text[]
);

-- ----------------------------------------------------------------
-- Mural config
-- ----------------------------------------------------------------
create table if not exists public.mural_config (
  id text primary key default 'main',
  enabled boolean default true,
  show_ranking boolean default true,
  show_meta boolean default true,
  show_feed boolean default true,
  show_challenges boolean default true,
  show_commissions boolean default false,
  hide_feed_names boolean default false,
  meta_value int default 10,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- Challenges and sales feed
-- ----------------------------------------------------------------
create table if not exists public.challenges (
  id uuid primary key,
  title text,
  description text,
  type text,
  goal int,
  start_date date,
  end_date date,
  prize text,
  prize_visible boolean default false,
  visibility text,
  status text,
  created_at date
);

create table if not exists public.sales_feed (
  id uuid primary key,
  consultor_id uuid references public.profiles(id),
  consultor_name text,
  client_name text,
  plan text,
  date date,
  timestamp bigint
);

-- ----------------------------------------------------------------
-- Executive/client business tables
-- ----------------------------------------------------------------
create table if not exists public.executive_clients (
  id uuid primary key,
  executive_id uuid references public.profiles(id),
  client_id uuid references public.clients(id),
  monthly_revenue numeric(12,2),
  payment_day int,
  operational_cost numeric(12,2),
  profit_comm_pct numeric(5,2),
  start_date date,
  notes text
);

create table if not exists public.executive_payments (
  id uuid primary key,
  executive_id uuid references public.profiles(id),
  client_id uuid references public.clients(id),
  month text,
  type text,
  monthly_revenue numeric(12,2),
  operational_cost numeric(12,2),
  profit numeric(12,2),
  profit_comm_pct numeric(5,2),
  portfolio_comm numeric(12,2),
  company_net numeric(12,2),
  client_pay_status text,
  client_paid_at date,
  commission_status text,
  commission_paid_at date,
  registered_at date,
  notes text
);

create table if not exists public.executive_sales (
  id uuid primary key,
  executive_id uuid references public.profiles(id),
  client_name text,
  plan_name text,
  plan_value numeric(12,2),
  comm_type text,
  comm_value numeric(12,2),
  sale_date date,
  month text,
  commission_status text,
  commission_paid_at date,
  notes text
);

-- ----------------------------------------------------------------
-- Generic app state store for misc arrays and objects
-- ----------------------------------------------------------------
create table if not exists public.app_state_entries (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- ----------------------------------------------------------------
-- RLS policies
-- ----------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.installations enable row level security;
alter table public.chamados enable row level security;
alter table public.client_documents enable row level security;
alter table public.client_tecnico_history enable row level security;
alter table public.doc_checklists enable row level security;
alter table public.doc_slots enable row level security;
alter table public.comunicados enable row level security;
alter table public.notifications enable row level security;
alter table public.product_plans enable row level security;
alter table public.products enable row level security;
alter table public.challenges enable row level security;
alter table public.sales_feed enable row level security;
alter table public.executive_payments enable row level security;
alter table public.executive_clients enable row level security;
alter table public.executive_sales enable row level security;
alter table public.app_state_entries enable row level security;
alter table public.tecnico_clients enable row level security;

create policy tecnico_clients_select on public.tecnico_clients
  for select using (
    tecnico_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy tecnico_clients_insert_admin on public.tecnico_clients
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy tecnico_clients_delete_admin on public.tecnico_clients
  for delete using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy profiles_select_authenticated on public.profiles
  for select using (true);
create policy profiles_update_own_or_admin on public.profiles
  for update using (
    id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy profiles_insert_admin on public.profiles
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
    or id = auth.uid()
  );

create policy clients_select_role_based on public.clients
  for select using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
    or consultant_id = auth.uid()
    or instalador_id = auth.uid()
    or (select linked_client_id from public.profiles where id = auth.uid()) = public.clients.id
  );
create policy clients_insert_consultor_or_gestor on public.clients
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor','consultor','instalador')
  );
create policy clients_update_owner_or_admin on public.clients
  for update using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
    or consultant_id = auth.uid()
    or instalador_id = auth.uid()
  );
create policy clients_delete_admin on public.clients
  for delete using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy installations_select_installer_admin on public.installations
  for select using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
    or instalador_id = auth.uid()
  );
create policy installations_insert_installer on public.installations
  for insert with check (
    instalador_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy installations_update_installer_or_admin on public.installations
  for update using (
    instalador_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy installations_delete_admin on public.installations
  for delete using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy chamados_select_assigned_or_admin on public.chamados
  for select using (
    tecnico_id = auth.uid()
    or (select consultant_id from public.clients where id = public.chamados.client_id) = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy chamados_insert_staff_or_admin on public.chamados
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor','consultor','tecnico')
    or tecnico_id = auth.uid()
  );
create policy chamados_update_assigned_or_admin on public.chamados
  for update using (
    tecnico_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy client_documents_select_related on public.client_documents
  for select using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
    or (select consultant_id from public.clients where id = public.client_documents.client_id) = auth.uid()
    or (select instalador_id from public.clients where id = public.client_documents.client_id) = auth.uid()
    or (select linked_client_id from public.profiles where id = auth.uid()) = public.client_documents.client_id
  );
create policy client_documents_insert_allowed on public.client_documents
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor','consultor','instalador')
  );

create policy notifications_select_owner on public.notifications
  for select using (
    user_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy notifications_insert_owner on public.notifications
  for insert with check (
    user_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy notifications_update_owner_or_admin on public.notifications
  for update using (
    user_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy comunicados_select_public on public.comunicados
  for select using (true);
create policy comunicados_insert_admin on public.comunicados
  for insert with check (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy comunicados_update_admin on public.comunicados
  for update using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy comunicados_delete_admin on public.comunicados
  for delete using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

-- Permite qualquer autenticado marcar um comunicado como lido (acrescentar o
-- próprio uid em `lidos`) sem precisar de UPDATE geral na tabela — evita que
-- um usuário sem permissão de admin reescreva título/mensagem de outro autor.
create or replace function public.mark_comunicado_read(p_comunicado_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.comunicados
  set lidos = array_append(lidos, auth.uid()::text)
  where id = p_comunicado_id
    and not (auth.uid()::text = any(lidos));
end;
$$;
grant execute on function public.mark_comunicado_read(uuid) to authenticated;

create policy products_select_public on public.products
  for select using (true);
create policy product_plans_select_public on public.product_plans
  for select using (true);

create policy challenges_select_public on public.challenges
  for select using (true);
create policy sales_feed_select_owner on public.sales_feed
  for select using (
    consultor_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy executive_payments_select_admin_or_exec on public.executive_payments
  for select using (
    executive_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy executive_clients_select_admin_or_exec on public.executive_clients
  for select using (
    executive_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );
create policy executive_sales_select_admin_or_exec on public.executive_sales
  for select using (
    executive_id = auth.uid()
    or (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

create policy app_state_entries_select_admin on public.app_state_entries
  for select using (
    (select role from public.profiles where id = auth.uid()) in ('presidente','gestor')
  );

-- ----------------------------------------------------------------
-- Seed profiles and clients with UUID normalization
-- ----------------------------------------------------------------
insert into public.profiles (id, name, email, role, data, created_at)
values
  ('00000000-0000-0000-0000-000000000001', 'Presidente Demo', 'presidente@tracktiv.com.br', 'presidente', '{}', now()),
  ('00000000-0000-0000-0000-000000000002', 'Gestor Tracktiv', 'gestor@tracktiv.com', 'gestor', '{}', now()),
  ('11111111-1111-1111-1111-111111111111', 'Laura Mendes', 'consultor@tracktiv.com', 'consultor', '{"cpf":"312.456.789-04","address":"Rua das Orquídeas, 450 - São Paulo/SP","whatsapp":"(11) 91234-5678","pixKey":"laura.mendes@tracktiv.com"}', now()),
  ('22222222-2222-2222-2222-222222222222', 'Bruno Carvalho', 'bruno@tracktiv.com', 'consultor', '{"cpf":"987.654.321-09","address":"Av. Paulista, 1578 - São Paulo/SP","whatsapp":"(11) 97654-3210","pixKey":"bruno.carvalho@tracktiv.com"}', now()),
  ('33333333-3333-3333-3333-333333333333', 'Carlos Pereira', 'instalador@tracktiv.com', 'instalador', '{"partnerType":"instalador","cpf":"111.222.333-44","address":"Av. Industrial, 500 - Guarulhos/SP","whatsapp":"(11) 98888-7777","pixKey":"carlos.pereira@gmail.com","storeName":"AutoTech Guarulhos","region":"Guarulhos/SP"}', now()),
  ('44444444-4444-4444-4444-444444444444', 'Fernanda Lima', 'parceiro@tracktiv.com', 'instalador', '{"partnerType":"indicador","cpf":"222.333.444-55","address":"Rua das Acácias, 200 - Campinas/SP","whatsapp":"(19) 97777-8888","pixKey":"fernanda.lima@gmail.com","region":"Campinas/SP","commissionPct":10}', now()),
  ('55555555-5555-5555-5555-555555555555', 'Rafael Santos', 'tecnico@tracktiv.com', 'tecnico', '{"cpf":"555.666.777-88","phone":"(11) 94455-6677","whatsapp":"(11) 94455-6677","specialty":"Rastreamento Veicular","qualifications":["rastreamento"]}', now()),
  ('66666666-6666-6666-6666-666666666666', 'Carlos Drummond', 'executivo@tracktiv.com', 'executivo', '{"cpf":"123.456.789-00","phone":"(11) 99876-5432","whatsapp":"(11) 99876-5432","pixKey":"drummond@email.com","company":"Drummond Soluções Empresariais","bank":"Nubank","bankAgency":"001","bankAccount":"12345-6","notes":"Parceiro estratégico com foco em clientes corporativos da região Sul.","hasConsultorRole":true,"saleCommType":"fixed","saleCommFixed":50,"saleCommPct":0,"hasRecurrence":true,"recurrenceType":"fixed_pct","recurrenceCustomPct":8}', now()),
  ('77777777-7777-7777-7777-777777777777', 'Auto Prime Transportes', 'cliente@tracktiv.com', 'cliente', '{"clientId":"c1","referralCode":"AUTOPRIME23","points":150,"contractedServices":["rastreamento"]}', now())
on conflict (id) do nothing;

insert into public.clients (id, consultant_id, instalador_id, name, phone, is_whatsapp, email, cpf, rg, address, product, plan, monthly_fee, plates, payment_date, need, origins, coupon, notes, stage, closed_date, created_at)
values
  ('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', null, 'Auto Prime Transportes', '(11) 98877-6655', true, 'contato@autoprime.com.br', '11.222.333/0001-44', '', 'Rua das Flores, 100 - Vila Mariana, São Paulo/SP', 'Rastreador Veicular', 'Profissional', 54.90, 'ABC-1D34, DEF-5E78', 10, 'Segurança e controle da frota de entregas', array['Indicação de amigo'], '', 'Frota com 6 veículos. Decisor é o Diretor de Operações, Sr. Marcos. Interesse em bloqueio remoto e relatórios de rota.', 'Fechado', '2026-06-07', '2026-05-29'),
  ('10000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', null, 'Distribuidora Torres & Filhos', '(11) 99222-3344', true, 'compras@torresfilhos.com.br', '22.333.444/0001-55', '', 'Av. Industrial, 850 - Osasco/SP', 'Rastreador Veicular', 'Controle Total', 64.90, 'GHI-9J12', 15, 'Controle de entregas e redução de desvios de rota', array['Google'], 'BEMVINDO10', 'Empresa com 8 veículos de carga. Quer rastrear motoristas e gerar relatório de jornada.', 'Fechado', '2026-06-07', '2026-05-23'),
  ('10000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', null, 'Transline Logística', '(11) 99911-2233', false, 'transline@transline.com.br', '33.444.555/0001-66', '', 'Rod. Anhangüera, km 28 - Barueri/SP', 'Rastreador Veicular', 'Profissional', 54.90, '', 20, 'Rastreamento de frota refrigerada', array['Instagram'], '', 'Transportadora de alimentos. Aguarda autorização do sócio para fechar. Proposta enviada por e-mail.', 'Proposta', null, '2026-05-16'),
  ('10000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', null, 'Frota Sul Serviços', '(11) 98833-4455', true, '', '', '', 'Av. do Contorno, 1200 - Santo André/SP', 'Rastreador Veicular', 'Controle Total', 64.90, '', 5, 'Gestão de técnicos de campo em tempo real', array['Facebook'], '', 'Empresa de manutenção com 12 técnicos em campo. Quer integrar GPS com sistema próprio de chamados.', 'Apresentação', null, '2026-05-11'),
  ('10000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', null, 'Construtora Oliveira & Irmãos', '(11) 99888-7766', true, 'rh@construtoraoi.com.br', '44.555.666/0001-77', '', 'Rua do Progresso, 340 - Guarulhos/SP', 'Segurança do Trabalho', 'Básico', 149.90, '', 1, 'Regularização de PGR e PCMSO para licitação municipal', array['Indicação de amigo'], '', 'Construtora com 18 funcionários CLT. Prazo para regularizar documentação é em 30 dias (licitação). Urgente.', 'Contato Feito', null, '2026-05-30'),
  ('10000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', null, 'Clínica Saúde Ativa', '(11) 99777-4455', false, 'clinicasaudeativa@email.com', '55.666.777/0001-88', '', 'Rua das Palmeiras, 78 - Pinheiros, São Paulo/SP', 'Chatbot de Atendimento', 'Starter', 89.90, '', 10, 'Automatizar agendamentos e reduzir faltas de pacientes', array['Google'], '', 'Clínica com 3 médicos. Recebe +80 contatos por dia no WhatsApp. Quer bot para triagem e agendamento.', 'Novo Lead', null, '2026-06-03'),
  ('10000000-0000-0000-0000-000000000007', '22222222-2222-2222-2222-222222222222', null, 'Rápido Entregas Express', '(11) 98765-4321', true, 'ti@rapidoexpress.com.br', '66.777.888/0001-99', '', 'Av. das Nações, 500 - Campinas/SP', 'Sites e Marketing Digital', 'Crescimento', 499.90, '', 10, 'Captação de novos clientes corporativos online', array['Instagram'], '', 'Empresa de entrega expresso. Quer site + Google Ads para atrair contratos B2B. Orçamento aprovado.', 'Proposta', null, '2026-06-02'),
  ('10000000-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', null, 'Escritório Vieira Contabilidade', '(11) 99123-4567', false, 'contato@vieiracontabil.com.br', '77.888.999/0001-11', '', 'Rua Vergueiro, 2340 - Saúde, São Paulo/SP', 'Consultoria Contábil', 'MEI/ME', 199.90, '', 20, 'Migração do regime MEI para ME com planejamento tributário', array['Google'], '', 'Contador autônomo que quer abrir escritório. Faturou R$120k no ano passado e precisa migrar do MEI urgente.', 'Contato Feito', null, '2026-05-28'),
  ('10000000-0000-0000-0000-000000000009', '22222222-2222-2222-2222-222222222222', null, 'SmartFleet Rastreamento', '(11) 97766-5544', true, 'frota@smartfleet.com.br', '88.999.000/0001-22', '', 'Rod. Régis Bittencourt, km 290 - São Paulo/SP', 'Rastreador Veicular', 'Empresas', 64.90, 'JKL-3F56, MNO-7G89', 25, 'Monitoramento de frota de caminhões com integração ao ERP', array['Indicação de amigo'], '', 'Transportadora com 22 caminhões. Contrato anual fechado. Aguarda instalação.', 'Fechado', '2026-06-07', '2026-05-26'),
  ('10000000-0000-0000-0000-00000000000a', null, '33333333-3333-3333-3333-333333333333', 'Moto Express Delivery', '(11) 97654-3210', true, 'contato@motoexpress.com.br', '99.000.111/0001-33', '', 'Av. Tiradentes, 450 - Guarulhos/SP', 'Rastreador Veicular', 'Essencial', 44.90, 'GHI-9H12', 5, 'Rastreamento de motos para entrega de medicamentos', array['Parceiro/Loja'], '', 'Empresa de delivery farmacêutico. 4 motos. Instaladas na AutoTech.', 'Fechado', '2026-06-07', '2026-06-04'),
  ('10000000-0000-0000-0000-00000000000b', null, '33333333-3333-3333-3333-333333333333', 'Auto Delivery Solutions', '(11) 96543-2109', true, '', '', '', 'Av. São João, 890 - Guarulhos/SP', 'Rastreador Veicular', 'Essencial', 44.90, 'XYZ-7I90', 10, 'Segurança de veículo de entregas para e-commerce', array['Parceiro/Loja'], '', 'Autônomo que faz entregas para marketplace. Veículo financiado.', 'Fechado', '2026-06-07', '2026-06-02'),
  ('10000000-0000-0000-0000-00000000000c', null, '33333333-3333-3333-3333-333333333333', 'Frota Unitária Serviços', '(11) 95432-1098', false, 'frota@frotaunitaria.com.br', '', '', 'Rua Industrial, 220 - Guarulhos/SP', 'Rastreador Veicular', 'Profissional', 54.90, '', 15, 'Upgrade do plano Essencial para Profissional — quer bloqueio remoto', array['Parceiro/Loja'], '', 'Cliente antigo da loja. Quer adicionar bloqueio remoto após tentativa de roubo.', 'Proposta', null, '2026-05-30'),
  ('10000000-0000-0000-0000-00000000000d', null, '33333333-3333-3333-3333-333333333333', 'Transportes Wassily', '(11) 94321-0987', true, '', '', '', 'Av. Salgado Filho, 1100 - Guarulhos/SP', 'Rastreador Veicular', 'Essencial', 44.90, '', 1, 'Primeiro rastreador — frota de vans escolares', array['Parceiro/Loja'], '', 'Dono de 3 vans escolares. Pais dos alunos pediram rastreamento. Visita agendada.', 'Novo Lead', null, '2026-06-05'),
  ('10000000-0000-0000-0000-00000000000e', null, '33333333-3333-3333-3333-333333333333', 'Distribuidora Jardim Largo', '(11) 93210-9876', true, 'compras@jardimlargodistr.com.br', '00.111.222/0001-44', '', 'Rua das Acácias, 330 - Guarulhos/SP', 'Rastreador Veicular', 'Profissional', 54.90, '', 20, 'Controle de 5 veículos de distribuição no Grande ABC', array['Parceiro/Loja'], '', 'Distribuidora de bebidas. Quer relatório de quilometragem por veículo para reembolso de motoristas.', 'Contato Feito', null, '2026-06-01')
on conflict (id) do nothing;

update public.profiles
set linked_client_id = '10000000-0000-0000-0000-000000000001'
where id = '77777777-7777-7777-7777-777777777777';

-- ----------------------------------------------------------------
-- Seed installations
-- ----------------------------------------------------------------
insert into public.installations (id, instalador_id, client_id, client_name, plate, date, notes)
values
  ('20000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', '10000000-0000-0000-0000-00000000000a', 'Moto Express Delivery', 'GHI-9H12', '2026-06-07', 'Instalação realizada na sede do cliente. Rastreador instalado na moto 1.'),
  ('20000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', '10000000-0000-0000-0000-00000000000b', 'Auto Delivery Solutions', 'XYZ-7I90', '2026-06-07', 'Rastreador instalado no veículo principal de entregas.'),
  ('20000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', '10000000-0000-0000-0000-000000000001', 'Auto Prime Transportes', 'ABC-1D34', '2026-06-02', 'Instalação no depósito central. Técnico Carlos realizou o serviço.')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed coupons
-- ----------------------------------------------------------------
insert into public.coupons (id, code, discount_type, discount_value, description, active)
values
  ('30000000-0000-0000-0000-000000000001', 'BEMVINDO10', 'percentage', 10, '10% de desconto na adesão para novos clientes', true),
  ('30000000-0000-0000-0000-000000000002', 'FIDELIDADE20', 'fixed', 20, 'R$ 20,00 de desconto na renovação anual', false)
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed client documents
-- ----------------------------------------------------------------
insert into public.client_documents (id, client_id, category, name, file_name, mime_type, size, uploaded_at, uploaded_by, notes)
values
  ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'rastreamento', 'Contrato de Serviço — Auto Prime', 'contrato_auto_prime.pdf', 'application/pdf', 0, '2026-05-01', 'Gestor Tracktiv', 'Contrato vigente — plano Profissional')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed chamados
-- ----------------------------------------------------------------
insert into public.chamados (id, client_id, tecnico_id, title, description, priority, status, created_at, updated_at, messages)
values
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Rastreador sem sinal', 'Rastreador do veículo ABC-1234 não envia posição há 2 dias. Necessário verificar conectividade do dispositivo.', 'Urgente', 'Em andamento', '2026-05-29 00:00:00', '2026-06-06 00:00:00', '[{"id":"cm1","from":"tecnico_1","text":"Chamado aberto. Verificando conectividade do dispositivo.","at":"2026-05-29"},{"id":"cm2","from":"tecnico_1","text":"Problema identificado: antena com sinal fraco. Agendando visita técnica.","at":"2026-06-06"}]'),
  ('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'Configuração de bloqueio remoto', 'Cliente solicita configuração e teste do bloqueio remoto no veículo GHI-9012.', 'Normal', 'Aberto', '2026-06-06 00:00:00', '2026-06-06 00:00:00', '[{"id":"cm3","from":"tecnico_1","text":"Chamado registrado. Entraremos em contato em breve para agendar.","at":"2026-06-06"}]')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Technician-client assignments and history
-- ----------------------------------------------------------------
insert into public.tecnico_clients (tecnico_id, client_id)
values
  ('55555555-5555-5555-5555-555555555555', '10000000-0000-0000-0000-000000000001'),
  ('55555555-5555-5555-5555-555555555555', '10000000-0000-0000-0000-000000000002'),
  ('55555555-5555-5555-5555-555555555555', '10000000-0000-0000-0000-000000000003')
on conflict (tecnico_id, client_id) do nothing;

insert into public.client_tecnico_history (id, client_id, tecnico_id, tecnico_name, assigned_at, assigned_by, obs)
values
  ('60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Rafael Santos', '2026-05-15', 'Gestor Tracktiv', 'Cliente indicado para suporte de instalação')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Doc slots and checklists
-- ----------------------------------------------------------------
insert into public.doc_slots (id, client_key, name, service_key, doc_id, uploaded_at, uploaded_by)
values
  ('70000000-0000-0000-0000-000000000001', 'cliente_demo', 'Contrato de Serviço', 'rastreamento', '40000000-0000-0000-0000-000000000001', '2026-05-01', 'Gestor Tracktiv'),
  ('70000000-0000-0000-0000-000000000002', 'cliente_demo', 'Termo de Instalação', 'rastreamento', null, null, null),
  ('70000000-0000-0000-0000-000000000003', 'cliente_demo', 'Autorização de Rastreamento', 'rastreamento', null, null, null)
on conflict (id) do nothing;

insert into public.doc_checklists (id, client_key, "label", "required", category, instruction, "done", "status", deadline, added_by, added_by_id, added_at, completed_at, uploaded_doc_id)
values
  ('80000000-0000-0000-0000-000000000001', 'cliente_demo', 'RG e CPF', true, 'geral', 'Envie cópia de RG e CPF do titular do contrato.', true, 'concluido', null, 'Rafael Santos', '55555555-5555-5555-5555-555555555555', '2026-05-01', '2026-05-10', null),
  ('80000000-0000-0000-0000-000000000002', 'cliente_demo', 'Comprovante de endereço', true, 'geral', 'Comprovante recente (ate 3 meses). Pode ser conta de luz, agua ou telefone fixo.', false, 'aguardando', '2026-06-30', 'Rafael Santos', '55555555-5555-5555-5555-555555555555', '2026-05-01', null, null),
  ('80000000-0000-0000-0000-000000000003', 'cliente_demo', 'Contrato assinado', true, 'rastreamento', 'Contrato de prestacao de servicos devidamente assinado em todas as paginas.', true, 'concluido', null, 'Rafael Santos', '55555555-5555-5555-5555-555555555555', '2026-05-01', '2026-05-15', null),
  ('80000000-0000-0000-0000-000000000004', 'cliente_demo', 'Autorização de instalação', true, 'rastreamento', 'Formulario de autorizacao para instalacao do rastreador no veiculo. Assine e devolva digitalizado.', false, 'enviado', '2026-06-15', 'Rafael Santos', '55555555-5555-5555-5555-555555555555', '2026-05-01', null, null)
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed comunicados
-- ----------------------------------------------------------------
insert into public.comunicados (id, autor_id, titulo, mensagem, prioridade, criado_em, lidos)
values
  ('90000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Bem-vindo ao Portal Tracktiv!', 'Ola, equipe! O portal do vendedor Tracktiv esta disponivel para toda a equipe. Aqui voce gerencia clientes, acompanha comissoes, acessa treinamentos e muito mais. Qualquer duvida ou sugestao, fale diretamente com o gestor pelo chat interno. Bom trabalho!', 'normal', '2026-05-01', '{}'),
  ('90000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Meta de junho: 12 contratos fechados!', 'Equipe, a meta de junho e de 12 contratos fechados por consultor. Quem atingir a meta recebe bonus de R$ 300 + certificado de Top Vendedor. Foque nos clientes em etapa "Proposta" - eles estao a um passo do fechamento! Use o simulador de ganhos para acompanhar sua progressao. Vamos com tudo!', 'importante', '2026-06-01', '{}'),
  ('90000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Novo fluxo de aprovacao de vendas', 'A partir de agora, todas as vendas do plano "Empresas" precisam de aprovacao do gestor antes da instalacao. Isso garante que o contrato seja revisado antes do tecnico ir ao cliente. O processo de aprovacao leva no maximo 24h uteis. Qualquer duvida, entre em contato.', 'urgente', '2026-06-02', '{}')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed products and plans
-- ----------------------------------------------------------------
insert into public.products (id, name, category, description, status, featured, icon, signup_fee, monthly_fee, payment_options, discount_annual, special_conditions, payment_personalized, card_installments, visibility, commission)
values
  ('a0000000-0000-0000-0000-000000000001', 'Rastreador Veicular', 'rastreamento', 'Monitoramento 24/7, alertas em tempo real e protecao completa para veiculos pessoais e frotas empresariais.', 'ativo', true, '', 60, 44.90, array['pix','boleto','cartao'], 10, '', '', 12, array['consultor','instalador'], '{"tipo":"fixo","valor":50,"recorrencia":10}'),
  ('a0000000-0000-0000-0000-000000000002', 'Seguranca do Trabalho', 'sst', 'Documentacao NR, treinamentos obrigatorios e consultoria para conformidade com o MTE.', 'ativo', false, '', 0, 149.90, array['pix','boleto','cartao'], 15, '', '', 6, array['consultor'], '{"tipo":"percentual","valor":15,"recorrencia":8}'),
  ('a0000000-0000-0000-0000-000000000003', 'Chatbot de Atendimento', 'chatbot', 'Automacao via WhatsApp, Instagram e outros canais. Qualificacao de leads 24h sem intervencao humana.', 'ativo', false, '', 200, 89.90, array['pix','cartao'], 10, '', '', 12, array['consultor'], '{"tipo":"percentual","valor":20,"recorrencia":10}'),
  ('a0000000-0000-0000-0000-000000000004', 'Consultoria Contabil', 'contabilidade', 'Apoio fiscal, tributario e contabil completo para micro e pequenas empresas.', 'ativo', false, '', 0, 199.90, array['pix','boleto','cartao','transferencia'], 20, '', '', 3, array['consultor'], '{"tipo":"percentual","valor":12,"recorrencia":7}'),
  ('a0000000-0000-0000-0000-000000000005', 'Sites e Marketing Digital', 'marketing', 'Landing pages, gestao de redes sociais e campanhas para atrair e converter leads.', 'ativo', false, '', 500, 299.90, array['pix','cartao','boleto'], 10, '', '', 6, array['consultor'], '{"tipo":"percentual","valor":10,"recorrencia":5}')
on conflict (id) do nothing;

insert into public.product_plans (id, product_id, name, value, description, items)
values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Essencial', 44.90, 'Ideal para uso pessoal basico', array['Localizacao em tempo real','Historico 30 dias','Alertas de ignicao','App mobile']),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Profissional', 54.90, 'Para autonomos e financiados', array['Tudo do Essencial','Bloqueio remoto','Historico 90 dias','Alerta bateria fraca']),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Controle Total', 64.90, 'Para familias e controle avancado', array['Tudo do Profissional','Multiplos usuarios','Relatorios avancados','Suporte prioritario']),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Empresas', null, 'Para frotas - orcamento personalizado', array['Tudo do Controle Total','Gerente de conta','API de integracao','SLA garantido']),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'Basico', 149.90, 'Ate 5 funcionarios', array['PCMSO','PGR','ASO','Suporte basico']),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'Avancado', 249.90, 'Ate 20 funcionarios', array['Tudo do Basico','e-Social','Treinamentos NR','Consultoria mensal']),
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'Empresarial', null, '20+ funcionarios', array['Tudo do Avancado','Assessoria juridica','Auditorias','SLA 24h']),
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', 'Starter', 89.90, 'Para pequenos negocios', array['1 canal','Ate 500 conversas/mes','Templates basicos','Relatorios simples']),
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000003', 'Business', 149.90, 'Para medios negocios', array['3 canais','Conversas ilimitadas','Agendamento automatico','CRM integrado']),
  ('b0000000-0000-0000-0000-00000000000a', 'a0000000-0000-0000-0000-000000000003', 'Enterprise', null, 'Personalizado', array['Canais ilimitados','IA avancada','Integracao API','Suporte dedicado']),
  ('b0000000-0000-0000-0000-00000000000b', 'a0000000-0000-0000-0000-000000000004', 'MEI/ME', 199.90, 'Para MEI e ME', array['DAS mensal','DEFIS','NF-e ilimitadas','Suporte WhatsApp']),
  ('b0000000-0000-0000-0000-00000000000c', 'a0000000-0000-0000-0000-000000000004', 'Empresarial', 349.90, 'Para EPP e Ltda', array['Tudo do MEI/ME','Folha de pagamento','eSocial','Planejamento tributario']),
  ('b0000000-0000-0000-0000-00000000000d', 'a0000000-0000-0000-0000-000000000004', 'Premium', null, 'Personalizado', array['Tudo do Empresarial','BPO financeiro','Assessoria juridica','Gerente exclusivo']),
  ('b0000000-0000-0000-0000-00000000000e', 'a0000000-0000-0000-0000-000000000005', 'Presenca', 299.90, 'Presenca digital basica', array['Site landing page','2 redes sociais','4 posts/semana','Google Meu Negocio']),
  ('b0000000-0000-0000-0000-00000000000f', 'a0000000-0000-0000-0000-000000000005', 'Crescimento', 499.90, 'Para crescer online', array['Tudo do Presenca','Google Ads','Meta Ads','Relatorio mensal']),
  ('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000005', 'Dominancia', null, 'Resultado maximo', array['Tudo do Crescimento','SEO avancado','Funil de vendas','Gerente de marketing'])
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed mural config, challenges, and sales feed
-- ----------------------------------------------------------------
insert into public.mural_config (id, enabled, show_ranking, show_meta, show_feed, show_challenges, show_commissions, hide_feed_names, meta_value)
values ('main', true, true, true, true, true, false, false, 10)
on conflict (id) do nothing;

insert into public.challenges (id, title, description, type, goal, start_date, end_date, prize, prize_visible, visibility, status, created_at)
values
  ('c0000000-0000-0000-0000-000000000001', 'Sprint de Vendas - Junho', 'Feche 3 contratos no mes e ganhe o premio!', 'vendas', 3, '2026-06-01', '2026-06-30', 'Jantar para 2 + R$ 200 em credito Tracktiv', true, 'publico', 'ativo', '2026-06-01')
on conflict (id) do nothing;

insert into public.sales_feed (id, consultor_id, consultor_name, client_name, plan, date, timestamp)
values
  ('d0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Laura Mendes', 'Auto Prime', 'Profissional', '2026-06-01', 1748779200000),
  ('d0000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'Bruno Silva', 'SmartFleet', 'Controle Total', '2026-06-01', 1748775600000)
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed executive business records
-- ----------------------------------------------------------------
insert into public.executive_clients (id, executive_id, client_id, monthly_revenue, payment_day, operational_cost, profit_comm_pct, start_date, notes)
values
  ('e0000000-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', '10000000-0000-0000-0000-000000000001', 5000, 10, 1500, 50, '2026-05-01', 'Contrato anual renovavel.'),
  ('e0000000-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', '10000000-0000-0000-0000-000000000002', 3500, 15, 900, 40, '2026-04-01', '')
on conflict (id) do nothing;

insert into public.executive_payments (id, executive_id, client_id, month, type, monthly_revenue, operational_cost, profit, profit_comm_pct, portfolio_comm, company_net, client_pay_status, client_paid_at, commission_status, commission_paid_at, registered_at, notes)
values
  ('f0000000-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', '10000000-0000-0000-0000-000000000001', '2026-05', 'carteira', 5000, 1500, 3500, 50, 1750, 1750, 'pago', '2026-05-12', 'pago', '2026-05-15', '2026-05-12', ''),
  ('f0000000-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', '10000000-0000-0000-0000-000000000002', '2026-05', 'carteira', 3500, 900, 2600, 40, 1040, 1560, 'pago', '2026-05-16', 'pendente', null, '2026-05-16', ''),
  ('f0000000-0000-0000-0000-000000000003', '66666666-6666-6666-6666-666666666666', '10000000-0000-0000-0000-000000000001', '2026-06', 'carteira', 5000, 1500, 3500, 50, 1750, 1750, 'pendente', null, 'pendente', null, '2026-06-01', '')
on conflict (id) do nothing;

insert into public.executive_sales (id, executive_id, client_name, plan_name, plan_value, comm_type, comm_value, sale_date, month, commission_status, commission_paid_at, notes)
values
  ('f0000000-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'Nova Logistica Ltda', 'Profissional', 54.90, 'fixed', 50, '2026-05-10', '2026-05', 'pago', '2026-05-15', '')
on conflict (id) do nothing;

-- ----------------------------------------------------------------
-- Seed app state misc entries
-- ----------------------------------------------------------------
insert into public.app_state_entries (key, value)
values
  ('commission_rules', '{"consultorFirstSale":50,"consultorRecurrence":[{"minSales":1,"maxSales":4,"pct":10},{"minSales":5,"maxSales":9,"pct":15},{"minSales":10,"maxSales":null,"pct":20}],"instaladorInstall":60,"indicadorRef":10,"referralBonus":100,"history":[] }'),
  ('recurrence_rules', '{"gracePeriodDays":30,"minClientsToActivate":1,"minMonthlySales":0,"history":[]}'),
  ('presidente_config', '{"companyName":"Tracktiv","cnpj":"","address":"","email":"","phone":"","logo":""}'),
  ('mural_config', '{"enabled":true,"showRanking":true,"showMeta":true,"showFeed":true,"showChallenges":true,"showComissions":false,"hideFeedNames":false,"metaValue":10}'),
  ('form_configs', '{}'),
  ('segment_forms', '{}'),
  ('training_progress', '{}'),
  ('pending_approvals', '[]'),
  ('product_commissions', '{}'),
  ('pending_users', '[]'),
  ('pending_installations', '[]'),
  ('photo_installations', '[]'),
  ('reengagement_queue', '[]'),
  ('recovery_history', '[]'),
  ('indicador_referrals', '[]'),
  ('saved_simulations', '[]'),
  ('sim_custom_costs', '[]'),
  ('sim_custom_revenues', '[]'),
  ('chats', '{}'),
  ('follow_ups', '[]'),
  ('client_referrals', '[]'),
  ('client_redemptions', '[]'),
  ('meta_alerts_sent', '{}')
on conflict (key) do update set value = excluded.value, updated_at = now();
