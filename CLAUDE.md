# Tracktiv Portal do Vendedor — CLAUDE.md

## Modo de trabalho

**AUTONOMIA TOTAL:** Claude Code deve trabalhar sem pedir confirmações ou fazer perguntas. Tomar decisões sozinho, executar, corrigir erros automaticamente e reportar apenas o resultado final.

## O que é este projeto

Portal web SaaS da Tracktiv, empresa de rastreamento veicular. Single-page app sem build step — HTML + CSS + JS puros, persistência via `localStorage`.

**Repositório:** https://github.com/monteiroengseg-design/tracktiv-portal-vendedor

**Login de demo:**
| Role | Email | Senha |
|---|---|---|
| Presidente | presidente@tracktiv.com.br | Admin@2024 |
| Gestor | gestor@tracktiv.com | Gestor123 |
| Consultor | consultor@tracktiv.com | Consultor123 |
| Parceiro Instalador | instalador@tracktiv.com | Instalador123 |
| Técnico | tecnico@tracktiv.com | Tecnico123 |
| Cliente | cliente@tracktiv.com | Cliente123 |

---

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | Estrutura HTML de todas as seções e modais |
| `styles.css` | Design System v3 — variáveis CSS, componentes, responsividade |
| `app.js` | Toda a lógica (~10 600 linhas) — estado, nav, CRUD, renders |

**Nunca criar arquivos extras.** Todas as mudanças ficam nesses três arquivos.

---

## Arquitetura central

```
app.state          → objeto global com todo o estado
loadState()        → carrega do localStorage (STORAGE_KEY = 'tracktiv_v2')
saveState()        → persiste no localStorage
renderAppViews()   → re-renderiza tudo com base no role atual
showSection(id)    → mostra/oculta seções via classe .active
showModal(t, html) → abre o modal genérico
closeModal()       → fecha o modal
addNotification(userId, type, msg, link) → cria notificação
```

### NAV_TREE
Cada role tem uma árvore de navegação com itens de tipo:
- `section: 'sectionId'` → chama `showSection()` + `renderActiveSection()`
- `render: () => fn()` → chama `showSection('dynamicContent')` + executa função
- `action: () => fn()` → executa ação (abre modal, etc.) sem trocar seção
- `children: [...]` → grupo expansível

Para **Parceiro Indicador** existe `NAV_TREE_INDICADOR` separado (linha ~174), selecionado em `renderNavigation()` quando `app.currentUser.partnerType === 'indicador'`.

### Roles e partnerType
- `gestor`, `consultor`, `tecnico`, `cliente` — roles únicos
- `instalador` — dois subtipos via campo `partnerType`:
  - `'instalador'` → Parceiro Instalador (instala rastreadores, portal completo)
  - `'indicador'` → Parceiro Indicador (indica leads, acompanha comissão)

---

## Padrões de código

### Render em dynamicContent
```javascript
function renderMinhaView() {
    const el = document.getElementById('dynamicContent');
    if (!el) return;
    el.innerHTML = `<div class="section-header">...</div> ...`;
    showSection('dynamicContent');
}
```

### Migrações de estado
Sempre no bloco `if (saved)` de `loadState()`:
```javascript
if (!app.state.novoCampo) app.state.novoCampo = [];
```

### Utilitários disponíveis
```javascript
todayISO()                  // '2026-06-01'
thirtyDaysAgoISO(n)         // n dias atrás
formatDate(iso)             // '01/06/2026'
formatCurrency(v)           // '54,90'
esc(v)                      // escapa HTML (use sempre em dados do usuário)
getCurrentMonthKey()        // '2026-06'
getCurrentMonthLabel()      // 'Junho/2026'
calcScore(client)           // score de propensão 0–100
calculateChurnScore(client) // score de risco de churn 0–100
getChurnBadge(score)        // { label, cls, icon, color }
detectUpsellOpportunities(consultantId) // array de oportunidades
generateProposta(clientId)  // abre modal de proposta PDF
```

### CSS — variáveis principais
```css
--primary: #1a2e4a    --accent: #f5820d
--bg: #f0f4f8         --surface: #ffffff
--text: #0f172a       --text-soft: #475569
--success: #10b981    --warning: #f59e0b
--danger: #ef4444     --info: #3b82f6
--sidebar-width: 260px
--radius-md: 12px     --shadow-sm / --shadow-md
```

---

## Features implementadas

### Design System v3
Plus Jakarta Sans, sidebar dark `#0f1c2e`, topbar 62px, botões com animação de gradiente, modais com backdrop blur, `@media` 768px e 480px.

### 5 features avançadas — COMPLETAS (sessão 2026-06-01)

**1. Motor de Churn Preditivo** (`app.js` linha ~9818)
- `calculateChurnScore(client)` — 5 sinais: follow-up gaps, chamados abertos, tempo no plano, histórico de contato, score original
- `getChurnBadge(score)` — Alto / Médio / Baixo
- Badges na tabela de clientes e nos cards do funil (`.churn-mini-badge`)
- Seção "Clientes em Risco" no CRM do consultor e em Vendas do gestor
- `openChurnDetail(clientId)` — modal com breakdown + ações
- Auto-notifica consultor ao cruzar 70 pts (usa `app.state.churnAlertsSent`)

**2. Gerador de Proposta PDF** (`app.js` linha ~10013)
- `generateProposta(clientId)` — modal com proposta profissional
- `PLAN_FEATURES` mapeia planos → lista de features
- Botões: Imprimir/PDF, WhatsApp (mensagem pré-preenchida), E-mail
- Histórico salvo em `client.proposalHistory[]`
- `@media print` oculta sidebar/topbar/botões
- Acessível via: perfil do cliente, tabela, botão "Gerar Proposta" no nav

**3. Re-engajamento de Leads Perdidos** (`app.js` linha ~10147)
- Modal automático ao mover lead para "Perdido" (hook em `updateClientStage`)
- Timer: 30 / 60 / 90 dias
- `REENGAGEMENT_MSGS` — mensagens por motivo de perda
- `app.state.reengagementQueue[]` — fila persistente
- `checkReengagementQueue()` — roda no init, cria follow-ups automáticos
- Seção "Leads p/ Reativar" no CRM do consultor

**4. Central de Upsell Inteligente** (`app.js` linha ~10375)
- `detectUpsellOpportunities(consultantId)` — detecta CNPJ, múltiplos veículos, tempo sem upgrade, plano sem bloqueio
- `getUpsellScript(opp)` — script personalizado por sinal
- Cards com sinais, script expansível, WA deeplink, botão copiar
- Estimativa de receita adicional mensal
- View do gestor: tabela consolidada de todas as oportunidades

**5. Kit de Recuperação de Veículo** (`app.js` linha ~10466)
- Card pulsante vermelho no portal do cliente (só para stage='Fechado')
- `openRecoveryKit(clientUserId)` → `activateRecoveryKit()` → `showRecoveryDocument()`
- Documento com titular, veículo, GPS simulado, contatos de emergência
- Notifica gestor automaticamente via `addNotification`
- `app.state.recoveryHistory[]` guarda histórico
- `@media print` cobre o documento de recuperação também

### Portal de Parceiros — PARCIALMENTE IMPLEMENTADO (⚠️ tem bug)

**O que foi feito:**
- `NAV_TREE_INDICADOR` definido (linha ~174) com nav simplificado para indicadores
- Grupo "Parceiros" no nav do gestor renomeado (era "Instaladores")

**✅ IMPLEMENTADO COMPLETAMENTE:**
- `openParceirosModal(id)` — formulário com dropdown Instalador/Indicador, campos condicionais (loja/comissão%), região
- `renderIndicadorDashboard`, `renderIndicadorReferrals`, `renderIndicadorExtrato`, `openNovaIndicacaoModal` — portal indicador completo
- `app.state.indicadorReferrals`, migration `partnerType`, `renderNavigation()` com `NAV_TREE_INDICADOR`
- Demo Parceiro Indicador: `parceiro@tracktiv.com` / `Parceiro123` (Fernanda Lima)
- Gestor: tabela separada por tipo com seção "PARCEIROS INSTALADORES" e "PARCEIROS INDICADORES"

### Mural de Performance e Desafios — COMPLETO

**Funções principais** (`app.js` linha ~11016):
- `addToSalesFeed(client, consultor)` — hook em approval e updateClientStage
- `getMuralRanking()` — ranking por vendas no mês, pontos
- `getChallengeProgress(challenge, userId)` — progresso individual em desafio
- `renderMural()` — visão de consultor/instalador: ranking, meta, desafios, feed
- `renderGestorMuralConfig()` — painel do gestor com toggles por seção
- `openDesafioModal(id)` — criar/editar desafio
- Nav: `g_mural` (gestor), `c_mural` (consultor), `i_mural` (instalador)
- State: `app.state.muralConfig{}`, `app.state.challenges[]`, `app.state.salesFeed[]`
- Toggle geral + toggles individuais (ranking, meta, feed, desafios, comissões, ocultar nomes)
- Desafios: tipo (vendas/clientes/treinamentos), meta, prazo, prêmio, visibilidade pública/privada
- TRAK tips motivacionais nos cards de desafio

### Link de Cadastro do Consultor — COMPLETO

**Funções principais** (`app.js` linha ~11424):
- `getConsultorPublicLink(userId)` — gera URL com `?cadastro=BASE64_ID`
- `checkPublicCadastroParam()` — chamado em `init()`, mostra form público se URL tem `?cadastro=`
- `showPublicCadastroForm(consultor, code)` — form multi-step full-screen (3 etapas)
- `renderPublicFormStep(step)` — renderiza etapa do formulário
- `renderMeuLink()` — visão do consultor com link, botão copiar, WA share, tabela de leads recebidos
- Nav: `c_link` "Meu Link" para consultor
- Leads chegam com `fromPublicForm: true`, `stage: 'Novo Lead'`, notificação automática ao consultor

---

## Dados de amostra (sampleState)

```
Consultores:        Laura (consultor_1), Bruno (consultor_2)
Parceiro Instalador: Carlos Pereira (instalador_1) — partnerType: 'instalador'
Parceiro Indicador:  Fernanda Lima (indicador_1) — parceiro@tracktiv.com / Parceiro123
Técnico:            Rafael Santos (tecnico_1)
Cliente:            Auto Prime (cliente_demo) — clientId: 'c1'
```

Planos do Rastreador: Essencial R$44,90 · Profissional R$54,90 · Controle Total R$64,90 · Empresas (sob consulta)

---

## Regras para edições

1. **Sempre checar sintaxe** após editar app.js: `node --check app.js`
2. **CSS balanceado**: `{` e `}` devem ter contagem igual
3. **Nunca mudar o `role`** de usuários existentes — usar campos adicionais
4. **`esc()` em todo output** de dados do usuário para evitar XSS
5. **Sem dependências externas** — sem npm, webpack, React, etc.
6. **Migração sempre** ao adicionar campos ao `app.state`
7. **`saveState()` + `renderAppViews()`** ao final de qualquer mutação de estado
