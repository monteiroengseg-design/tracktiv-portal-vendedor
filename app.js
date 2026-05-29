/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'tracktiv_v2';
const INSTALL_FEE = 60;
const SALE_COMMISSION = 50;

const NAV_ICONS = {
    gestorDashboard:'📊', gestorConsultores:'👥', gestorInstaladores:'🔧',
    gestorCupons:'🏷️', gestorConfig:'⚙️', gestorClientesPortal:'🌐',
    consultorDashboard:'📊', consultorCRM:'🎯', consultorClientes:'👤',
    consultorProdutos:'📦', consultorTreinamento:'🎓', consultorSimulador:'🧮',
    consultorInformativos:'📋',
    instaladorDashboard:'📊', instaladorCRM:'🎯', instaladorClientes:'👤',
    instaladorInformativos:'📋', instaladorFotos:'📷', instaladorExtrato:'💰',
    clienteHome:'🏠', clienteRastreamento:'📡', clienteSST:'🦺',
    clienteContabilidade:'📊', clienteOutros:'🤖', clienteIndicacao:'🎁', clienteFormulario:'🌐'
};

const VEHICLE_FIELDS = [
    { key: 'placa',   label: 'Placa *',    required: true },
    { key: 'marca',   label: 'Marca *',    required: true },
    { key: 'modelo',  label: 'Modelo *',   required: true },
    { key: 'ano',     label: 'Ano *',      required: true },
    { key: 'cor',     label: 'Cor',        required: false },
    { key: 'chassi',  label: 'Chassi',     required: false },
    { key: 'renavam', label: 'RENAVAM',    required: false }
];

const RAST_GENERAL_FIELDS = [
    { key:'tipoUso',           label:'Tipo de uso *',                type:'select', required:true,  options:['Pessoal','Comercial','Frota'] },
    { key:'teveFurto',         label:'Já teve veículo roubado?',     type:'radio',  required:false, options:['Sim','Não'] },
    { key:'possuiSeguro',      label:'Possui seguro?',               type:'radio',  required:false, options:['Sim','Não'] },
    { key:'motivoPrincipal',   label:'Principal motivo *',           type:'select', required:true,  options:['Segurança','Controle de frota','Exigência do seguro','Outros'] },
    { key:'horarioInstalacao', label:'Melhor horário para instalação',type:'text',  required:false },
    { key:'enderecoInstalacao',label:'Endereço de instalação *',      type:'text',  required:true }
];

const SERVICE_MAP = [
    { key: 'rastreamento',  label: 'Rastreamento',     icon: '📡', sectionId: 'clienteRastreamento',  product: 'Rastreador Veicular',                  docCategory: 'rastreamento' },
    { key: 'sst',           label: 'Seg. Trabalho',    icon: '🦺', sectionId: 'clienteSST',           product: 'Serviços de Segurança do Trabalho',    docCategory: 'sst' },
    { key: 'contabilidade', label: 'Contabilidade',    icon: '📊', sectionId: 'clienteContabilidade', product: 'Consultoria de Contabilidade',          docCategory: 'contabilidade' },
    { key: 'chatbot',       label: 'Chatbot',          icon: '🤖', sectionId: 'clienteOutros',        product: 'Chatbot',                              docCategory: 'chatbot' },
    { key: 'marketing',     label: 'Sites & Marketing',icon: '🌐', sectionId: 'clienteFormulario',    product: 'Sites e Campanhas de Marketing',        docCategory: 'marketing' }
];

/* ═══════════════════════════════════════════════════════════════════
   NAV TREE — hierarchical navigation structure
═══════════════════════════════════════════════════════════════════ */

const NAV_TREE = {
    gestor: [
        { id: 'g_dashboard',    label: 'Dashboard',      icon: '📊', section: 'gestorDashboard' },
        { id: 'g_consultores',  label: 'Consultores',    icon: '👥', children: [
            { id: 'g_cons_lista',   label: 'Lista de Consultores',  icon: '📋', section: 'gestorConsultores' },
            { id: 'g_cons_new',     label: 'Cadastrar Novo',        icon: '➕', action: () => openConsultorModal() },
            { id: 'g_cons_ind',     label: 'Indicações Pendentes',  icon: '⏳', render: () => renderGestorIndicacoes() },
            { id: 'g_cons_rank',    label: 'Ranking',               icon: '🏆', render: () => renderGestorRankingPage() }
        ]},
        { id: 'g_instaladores', label: 'Instaladores',   icon: '🔧', children: [
            { id: 'g_inst_lista',   label: 'Lista de Instaladores',  icon: '📋', section: 'gestorInstaladores' },
            { id: 'g_inst_new',     label: 'Cadastrar Novo',         icon: '➕', action: () => openInstaladorModal() },
            { id: 'g_inst_pend',    label: 'Instalações Pendentes',  icon: '⏳', render: () => renderInstPendentesList() },
            { id: 'g_inst_reg',     label: 'Registro de Instalações',icon: '📊', section: 'gestorInstaladores' }
        ]},
        { id: 'g_tecnicos',    label: 'Técnicos',        icon: '🛠️', children: [
            { id: 'g_tec_lista',    label: 'Lista de Técnicos',    icon: '📋', render: () => renderGestorTecnicos() },
            { id: 'g_tec_new',      label: 'Cadastrar Novo',        icon: '➕', action: () => openTecnicoModal() },
            { id: 'g_tec_chams',    label: 'Todos os Chamados',     icon: '🎫', render: () => renderGestorChamados() }
        ]},
        { id: 'g_clientes',    label: 'Clientes',        icon: '🌐', children: [
            { id: 'g_cli_lista',    label: 'Lista de Clientes',      icon: '📋', section: 'gestorClientesPortal' },
            { id: 'g_cli_new',      label: 'Cadastrar Novo',         icon: '➕', action: () => openGestorClienteModal() },
            { id: 'g_cli_docs',     label: 'Documentos Pendentes',   icon: '⏳', render: () => renderGestorDocsPendentes() },
            { id: 'g_cli_forms',    label: 'Formulários Incompletos',icon: '📋', render: () => renderGestorFormsIncompletos() }
        ]},
        { id: 'g_vendas',      label: 'Vendas',          icon: '💼', children: [
            { id: 'g_vend_aprov',   label: 'Aprovações Pendentes',  icon: '⏳', section: 'gestorDashboard' },
            { id: 'g_vend_hist',    label: 'Histórico de Vendas',   icon: '📊', render: () => renderHistoricoVendas() },
            { id: 'g_vend_rel',     label: 'Relatórios',            icon: '📈', render: () => renderGestorRelatorios() }
        ]},
        { id: 'g_financeiro',  label: 'Financeiro',      icon: '💰', children: [
            { id: 'g_fin_comis',    label: 'Comissões do Mês',      icon: '💵', render: () => renderGestorComissoes() },
            { id: 'g_fin_recorr',   label: 'Recorrências',          icon: '🔄', render: () => renderGestorRecorrencias() },
            { id: 'g_fin_bonus',    label: 'Bônus',                 icon: '⭐', render: () => renderGestorBonus() },
            { id: 'g_fin_extrato',  label: 'Extrato Geral',         icon: '📄', render: () => renderGestorExtrato() }
        ]},
        { id: 'g_cupons',      label: 'Cupons',          icon: '🏷️', children: [
            { id: 'g_cup_lista',    label: 'Lista de Cupons',       icon: '📋', section: 'gestorCupons' },
            { id: 'g_cup_new',      label: 'Criar Cupom',           icon: '➕', action: () => openCouponModal() }
        ]},
        { id: 'g_config',      label: 'Configurações',   icon: '⚙️', children: [
            { id: 'g_cfg_comis',    label: 'Tabela de Comissões',   icon: '💵', section: 'gestorConfig' },
            { id: 'g_cfg_metas',    label: 'Metas',                 icon: '🎯', render: () => renderGestorMetas() },
            { id: 'g_cfg_planos',   label: 'Planos e Preços',       icon: '💎', render: () => renderGestorPlanos() }
        ]},
        { id: 'g_followups',   label: 'Follow-ups',      icon: '📅', render: () => renderFollowUpCalendar() },
        { id: 'g_mensagens',   label: 'Mensagens',       icon: '💬', render: () => renderGestorChatPage() }
    ],
    consultor: [
        { id: 'c_dashboard',   label: 'Dashboard',      icon: '📊', section: 'consultorDashboard' },
        { id: 'c_crm',         label: 'CRM',            icon: '🎯', children: [
            { id: 'c_crm_funil',    label: 'Funil de Vendas',  icon: '📊', section: 'consultorCRM' },
            { id: 'c_crm_etapa',    label: 'Leads por Etapa',  icon: '🎯', render: () => renderLeadsPorEtapa() },
            { id: 'c_crm_score',    label: 'Score de Leads',   icon: '⭐', render: () => renderScoreLeads() },
            { id: 'c_crm_followup', label: 'Follow-ups',       icon: '📅', render: () => renderFollowUpCalendar() }
        ]},
        { id: 'c_clientes',    label: 'Clientes',       icon: '🌐', children: [
            { id: 'c_cli_lista',    label: 'Lista de Clientes', icon: '📋', section: 'consultorClientes' },
            { id: 'c_cli_new',      label: 'Cadastrar Novo',    icon: '➕', action: () => openClientModal() }
        ]},
        { id: 'c_financeiro',  label: 'Financeiro',     icon: '💰', children: [
            { id: 'c_fin_comis',    label: 'Comissões do Mês',  icon: '💵', section: 'consultorDashboard' },
            { id: 'c_fin_recorr',   label: 'Recorrência',       icon: '🔄', render: () => renderConsRecorrencia() },
            { id: 'c_fin_bonus',    label: 'Bônus de Indicação',icon: '⭐', render: () => renderConsBonus() },
            { id: 'c_fin_sim',      label: 'Simulador de Ganhos',icon: '🧮', section: 'consultorSimulador' },
            { id: 'c_fin_extrato',  label: 'Extrato',           icon: '📄', render: () => renderConsExtrato() }
        ]},
        { id: 'c_treinamentos',label: 'Treinamentos',   icon: '🎓', children: [
            { id: 'c_trei_todos',   label: 'Todos os Módulos',  icon: '📋', section: 'consultorTreinamento' },
            { id: 'c_trei_cert',    label: 'Meus Certificados', icon: '🏅', render: () => renderConsCertificados() }
        ]},
        { id: 'c_produtos',    label: 'Produtos',       icon: '📦', section: 'consultorProdutos' },
        { id: 'c_indicacoes',  label: 'Indicações',     icon: '🤝', children: [
            { id: 'c_ind_indicar',  label: 'Indicar Consultor', icon: '➕', render: () => renderIndicarConsultor() },
            { id: 'c_ind_minha',    label: 'Minha Indicação',   icon: '📋', render: () => renderMinhaIndicacao() }
        ]},
        { id: 'c_mensagens',   label: 'Mensagens',      icon: '💬', action: () => openChatOverlay('gestor') }
    ],
    instalador: [
        { id: 'i_dashboard',   label: 'Dashboard',      icon: '📊', section: 'instaladorDashboard' },
        { id: 'i_instalacoes', label: 'Instalações',    icon: '🔧', children: [
            { id: 'i_inst_pend',    label: 'Veículos Pendentes',    icon: '⏳', section: 'instaladorFotos' },
            { id: 'i_inst_ini',     label: 'Iniciar Instalação',    icon: '➕', action: () => openInstallationModal() },
            { id: 'i_inst_hist',    label: 'Histórico',             icon: '📊', section: 'instaladorExtrato' },
            { id: 'i_inst_foto',    label: 'Registro Fotográfico',  icon: '📷', section: 'instaladorFotos' }
        ]},
        { id: 'i_clientes',    label: 'Clientes',       icon: '🌐', children: [
            { id: 'i_cli_lista',    label: 'Lista de Clientes',     icon: '📋', section: 'instaladorClientes' },
            { id: 'i_cli_new',      label: 'Cadastrar Novo',        icon: '➕', action: () => openClientModal() }
        ]},
        { id: 'i_financeiro',  label: 'Financeiro',     icon: '💰', children: [
            { id: 'i_fin_comis',    label: 'Comissões do Mês',      icon: '💵', section: 'instaladorDashboard' },
            { id: 'i_fin_recorr',   label: 'Recorrência',           icon: '🔄', section: 'instaladorDashboard' },
            { id: 'i_fin_extrato',  label: 'Extrato',               icon: '📄', section: 'instaladorExtrato' }
        ]},
        { id: 'i_treinamentos',label: 'Treinamentos',   icon: '🎓', children: [
            { id: 'i_trei_mod',     label: 'Módulo Rastreamento',   icon: '📋', section: 'consultorTreinamento' },
            { id: 'i_trei_cert',    label: 'Meu Certificado',       icon: '🏅', render: () => renderConsCertificados() }
        ]},
        { id: 'i_produtos',    label: 'Produtos',       icon: '📦', section: 'consultorProdutos' },
        { id: 'i_mensagens',   label: 'Mensagens',      icon: '💬', action: () => openChatOverlay('gestor') }
    ],
    tecnico: [
        { id: 't_dashboard', label: 'Dashboard',     icon: '📊', section: 'tecnicoDashboard' },
        { id: 't_clientes',  label: 'Meus Clientes', icon: '👤', section: 'tecnicoClientes' },
        { id: 't_chamados',  label: 'Chamados',      icon: '🎫', section: 'tecnicoChamados' },
        { id: 't_mensagens', label: 'Mensagens',     icon: '💬', action: () => openChatOverlay('gestor') }
    ]
};

const stageOrder = ['Novo Lead', 'Contato Feito', 'Apresentação', 'Proposta', 'Fechado', 'Perdido'];

const SCORE_QUESTIONS = {
    'Novo Lead':     ['O cliente demonstrou interesse espontâneo?', 'Você conseguiu falar diretamente com o decisor?', 'O cliente tem veículo próprio ou frota?', 'O cliente já teve algum problema de segurança com veículo?', 'O cliente conhecia o serviço de rastreamento antes?'],
    'Contato Feito': ['O cliente aceitou uma conversa mais detalhada?', 'Você identificou a real necessidade do cliente?', 'O cliente mencionou orçamento disponível?', 'O cliente tem urgência para resolver o problema?', 'O cliente comparou com concorrentes?'],
    'Apresentação':  ['O cliente demonstrou interesse nas funcionalidades?', 'O cliente fez perguntas durante a apresentação?', 'O cliente identificou um plano que se encaixa na necessidade dele?', 'O cliente envolveu outra pessoa da família/empresa na conversa?', 'O cliente pediu mais informações após a apresentação?'],
    'Proposta':      ['O cliente recebeu e leu a proposta?', 'O cliente pediu alguma personalização?', 'O cliente sinalizou data para decidir?', 'O cliente não levantou objeções graves?', 'O cliente comparou o investimento com o benefício?']
};
const SCORE_WEIGHTS = { 'Novo Lead': 5, 'Contato Feito': 8, 'Apresentação': 10, 'Proposta': 15 };

const planList = [
    { name: 'Essencial',      price: 44.90 },
    { name: 'Profissional',   price: 54.90 },
    { name: 'Controle Total', price: 64.90 },
    { name: 'Empresas',       price: null  }
];

const originOptions = [
    'Google', 'Instagram', 'Facebook',
    'Indicação de amigo', 'Parceiro/Loja', 'Outro'
];

const productList = [
    { title: 'Rastreador Veicular',               subtitle: 'Produto principal',      description: 'Monitoramento 24/7, alertas, rotas em tempo real e proteção de frota para clientes premium.' },
    { title: 'Serviços de Segurança do Trabalho', subtitle: 'Proteção empresarial',   description: 'Documentação NR, treinamentos e consultoria para reduzir riscos e multas.' },
    { title: 'Chatbot',                           subtitle: 'Atendimento automático', description: 'Respostas ágeis, qualificação de leads e atendimento 24h para acelerar o funil.' },
    { title: 'Consultoria de Contabilidade',      subtitle: 'Gestão financeira',      description: 'Apoio fiscal, tributário e contábil para micro e pequenas empresas.' },
    { title: 'Sites e Campanhas de Marketing',    subtitle: 'Presença digital',       description: 'Landing pages, redes sociais e campanhas para gerar leads qualificados.' }
];

const trainingData = [
    { id: 1, locked: false, title: 'Módulo 1: Rastreador Veicular',      subtitle: '6 seções + quiz · ~20 min' },
    { id: 2, locked: false, title: 'Módulo 2: Segurança do Trabalho',    subtitle: '5 seções + quiz · ~20 min' },
    { id: 3, locked: false, title: 'Módulo 3: Chatbot de Atendimento',   subtitle: '5 seções + quiz · ~20 min' },
    { id: 4, locked: false, title: 'Módulo 4: Consultoria Contábil',     subtitle: '5 seções + quiz · ~20 min' },
    { id: 5, locked: false, title: 'Módulo 5: Sites e Marketing Digital', subtitle: '5 seções + quiz · ~20 min' }
];

const TRAK_MODULE_INTROS = {
    1: 'Boa escolha! O Rastreador Veicular é o coração da Tracktiv e sua maior fonte de comissão. Aqui você vai aprender tudo para vender com confiança e fechar negócios reais. Vamos nessa! 🚀',
    2: 'SST pode parecer técnico, mas é um mercado enorme! Empresas pagam caro para ficar em conformidade — e você vai ser quem resolve isso pra elas. Bora dominar esse assunto! 💪',
    3: 'Chatbot é o futuro do atendimento — e o presente dos seus clientes! Esse módulo vai te mostrar como apresentar essa solução e convencer até quem ainda não sabe que precisa. 🤖',
    4: 'Contabilidade é um dos serviços mais recorrentes do mercado. Empresas precisam todo mês, todo ano. Aqui você aprende a abordar e converter esse público de alto valor. 📊',
    5: 'Marketing digital é o que toda empresa quer mas poucos sabem fazer direito. Com esse módulo você vai falar a língua do cliente e fechar contratos com resultado garantido. 🎯'
};

const TRAK_TIPS = [
    '💡 Dica do dia: O melhor horário para abordar um cliente é entre 9h e 11h — o decisor está presente e ainda não está sobrecarregado.',
    '💡 Dica do dia: Consultores que estudam 30 minutos por dia fecham o dobro de vendas em 90 dias. Que tal começar agora?',
    '💡 Dica do dia: Use o nome do cliente pelo menos 3 vezes na conversa — cria conexão e aumenta a taxa de fechamento.',
    '💡 Dica do dia: Objeção = interesse! Se o cliente está perguntando, é porque está considerando. Nunca desanime na primeira resistência.',
    '💡 Dica do dia: O follow-up é onde 80% das vendas acontecem. Sempre marque o próximo passo antes de encerrar a conversa.',
    '💡 Dica do dia: Clientes compram de quem confiam. Compartilhe um caso de sucesso antes de apresentar o produto.',
    '💡 Dica do dia: Silêncio é técnica! Após apresentar sua proposta, fique em silêncio — quem fala primeiro geralmente cede mais.'
];

const SALES_TIPS_BY_MODULE = {
    1: ['💰 Quebre o preço: "Menos de R$1,50 por dia para proteger seu veículo"','😰 Use a dor: "Quanto custaria perder esse veículo hoje?"','⚡ Gere urgência: "O rastreador só protege se instalado antes do problema"','🏆 Prova social: cite quantos veículos já são rastreados na região','🎯 Feche com data: "Essa semana ou na próxima — quando fica melhor?"'],
    2: ['💸 Mostre o custo oculto: afastamento custa 3x o salário + substituto','⚖️ Cite multas: autuações do MTE chegam a R$6.000 por infração','🔍 Ofereça diagnóstico grátis para ver conformidade da empresa','📱 e-Social: todos eventos SST são obrigatórios — quem não se adequar será autuado','🛡️ Reposicione: "Não é gasto, é blindagem jurídica para o seu negócio"'],
    3: ['📲 Mostre a perda: "Quantos clientes sem resposta fora do horário?"','🏎️ Concorrente: "Ele responde em 2 min — você em quanto?"','🧮 Calcule: atendente humano R$2.000+/mês, bot = fração disso','🎪 Demonstre ao vivo em 5 minutos sem instalar nada','🎯 Foco no lead: o bot qualifica, filtra e agenda — zero esforço manual'],
    4: ['📊 "Você sabe quanto está pagando a mais de imposto hoje?"','💡 Simule o regime ideal: "No certo você economiza R$X/mês"','🎁 Diagnóstico gratuito: análise tributária sem custo para mostrar economia','📅 Use o prazo: declaração anual — organizar agora evita multas','🤝 Simplifique: "Você foca no negócio, a gente cuida da contabilidade"'],
    5: ['🔍 "Seu negócio aparece quando buscam seu serviço aqui na cidade?"','📈 Dado: 70% das buscas locais geram visita física em 24 horas','💰 ROI claro: R$500/mês alcança 10.000 pessoas qualificadas na região','🚀 Landing page converte em 48h — resultado rápido e mensurável','⏰ "Cada dia sem presença digital é um dia que o concorrente cresce"']
};

const GLOSSARY_BY_MODULE = {
    1: [{t:'GPS',d:'Satélites que calculam a localização do veículo com precisão de metros.'},{t:'GSM',d:'Rede celular usada pelo rastreador para transmitir dados em tempo real.'},{t:'Cerca eletrônica',d:'Área virtual no mapa — quando o veículo sai, um alerta é disparado.'},{t:'Bloqueio remoto',d:'Comando que impede o motor de ligar — usado em casos de furto.'},{t:'Frota',d:'Conjunto de veículos de uma empresa — leads de alto valor para rastreador.'}],
    2: [{t:'NR',d:'Norma Regulamentadora do MTE — define obrigações de segurança do trabalho.'},{t:'PCMSO',d:'Controle médico de saúde ocupacional — obrigatório com 1+ funcionário CLT.'},{t:'PGR',d:'Programa de Gerenciamento de Riscos — identifica riscos no ambiente de trabalho.'},{t:'ASO',d:'Atestado de Saúde Ocupacional — emitido após exames admissionais ou periódicos.'},{t:'e-Social',d:'Sistema federal que centraliza informações trabalhistas e de SST.'}],
    3: [{t:'Chatbot',d:'Programa que simula conversas humanas via WhatsApp, Instagram e outros canais.'},{t:'Lead',d:'Potencial cliente com interesse demonstrado — o chatbot os captura automaticamente.'},{t:'Funil',d:'Sequência que filtra, qualifica e converte contatos em clientes reais.'},{t:'API',d:'Interface que conecta o chatbot com WhatsApp Business, CRMs e agendamentos.'},{t:'Automação',d:'Execução automática de tarefas 24/7 sem intervenção humana.'}],
    4: [{t:'CNPJ',d:'Número de registro da empresa na Receita Federal.'},{t:'Simples Nacional',d:'Regime tributário simplificado para MPEs — unifica impostos em uma guia mensal.'},{t:'MEI',d:'Microempreendedor Individual — faturamento até R$81 mil/ano e tributação mínima.'},{t:'Lucro Presumido',d:'A Receita presume um percentual de lucro sobre o faturamento para calcular impostos.'},{t:'NF-e',d:'Nota Fiscal Eletrônica — documento fiscal digital obrigatório.'}],
    5: [{t:'SEO',d:'Técnicas para posicionar o site nos primeiros resultados do Google gratuitamente.'},{t:'CPC',d:'Custo Por Clique — você paga apenas quando alguém clica no seu anúncio.'},{t:'Landing Page',d:'Página criada especificamente para converter visitantes em leads ou clientes.'},{t:'CTR',d:'Taxa de cliques — porcentagem de quem vê e clica. Quanto maior, melhor.'},{t:'ROI',d:'Retorno sobre Investimento — quanto você ganhou em relação ao que investiu.'}]
};

const QUIZ_BY_MODULE = {
    1: [
        { q: 'Qual tecnologia o rastreador usa para enviar localização?',
          opts: ['Bluetooth', 'Wi-Fi', 'GSM/GPS', 'Infravermelho'], ans: 2,
          exp: 'O rastreador usa chip GSM (rede de celular) para transmitir a localização via GPS.' },
        { q: 'O que é cerca eletrônica?',
          opts: ['Uma cerca física ao redor do carro', 'Alerta quando o veículo sai de uma área definida', 'Sistema de câmera de segurança', 'Trava física nas rodas'], ans: 1,
          exp: 'A cerca eletrônica cria uma zona virtual no mapa. Se o veículo sair dessa área, o cliente recebe um alerta imediato.' },
        { q: 'Qual recurso é fundamental em caso de furto?',
          opts: ['Câmera interna', 'Bloqueio remoto do motor', 'Alarme sonoro', 'Espelho retrovisor digital'], ans: 1,
          exp: 'O bloqueio remoto impede que o motor seja ligado novamente, facilitando a recuperação.' },
        { q: 'Qual o preço do plano Essencial?',
          opts: ['R$ 39,90/mês', 'R$ 44,90/mês', 'R$ 54,90/mês', 'R$ 64,90/mês'], ans: 1,
          exp: 'O plano Essencial custa R$ 44,90 por mês, que equivale a menos de R$1,50 por dia.' },
        { q: 'Qual plano inclui relatórios avançados e suporte prioritário?',
          opts: ['Essencial', 'Profissional', 'Controle Total', 'Básico'], ans: 2,
          exp: 'O plano Controle Total (R$ 64,90) inclui tudo do Profissional mais relatórios avançados e suporte prioritário.' },
        { q: 'Qual é a melhor pergunta para iniciar uma abordagem de venda?',
          opts: ['Você quer comprar rastreador?', 'Você já teve medo de ter seu veículo roubado?', 'Você conhece nosso produto?', 'Posso te mandar um link?'], ans: 1,
          exp: 'Perguntar sobre a dor (medo de roubo) conecta emocionalmente e abre o interesse do cliente.' },
        { q: 'Quando a recorrência do consultor é ativada?',
          opts: ['Com 1 cliente na base', 'Com 5 clientes e 2 vendas no mês', 'Com 10 vendas no mês', 'Com 3 clientes fechados'], ans: 1,
          exp: 'São necessários pelo menos 5 clientes na base E 2 vendas fechadas no mês para ativar a recorrência.' },
        { q: 'Qual faixa de recorrência se aplica a 7 vendas no mês?',
          opts: ['5%', '10%', '18%', '25%'], ans: 2,
          exp: 'Entre 5 e 9 vendas no mês, a porcentagem de recorrência é de 18% sobre as mensalidades dos clientes ativos elegíveis.' },
        { q: 'O histórico de rotas no plano Profissional cobre quantos dias?',
          opts: ['30 dias', '60 dias', '90 dias', '180 dias'], ans: 2,
          exp: 'O plano Profissional inclui histórico completo de rotas dos últimos 90 dias.' },
        { q: 'Qual argumento de preço é mais eficaz com o cliente?',
          opts: ['É o mais barato do mercado', 'Menos de R$1,50 por dia para proteger seu veículo', 'Temos promoção só hoje', 'É parcelado em 12x'], ans: 1,
          exp: 'Quebrar o preço em "menos de R$1,50 por dia" torna o valor muito mais palatável emocionalmente.' }
    ],
    2: [
        { q: 'O que significa a sigla SST?',
          opts: ['Sistema de Segurança Técnica', 'Saúde e Segurança do Trabalho', 'Serviço Social do Trabalhador', 'Supervisão e Suporte Técnico'], ans: 1,
          exp: 'SST significa Saúde e Segurança do Trabalho — conjunto de normas que visam proteger a integridade física e mental dos trabalhadores.' },
        { q: 'Qual documento avalia os riscos ambientais no trabalho?',
          opts: ['PCMSO', 'ASO', 'PGR', 'CTPS'], ans: 2,
          exp: 'O PGR (Programa de Gerenciamento de Riscos) identifica e avalia os riscos ambientais presentes no ambiente de trabalho.' },
        { q: 'O PCMSO é obrigatório para empresas com quantos funcionários CLT?',
          opts: ['Apenas acima de 50', 'Apenas acima de 100', 'A partir de 1 funcionário CLT', 'Somente indústrias'], ans: 2,
          exp: 'O PCMSO (Programa de Controle Médico de Saúde Ocupacional) é obrigatório para qualquer empresa com pelo menos 1 funcionário CLT.' },
        { q: 'O que é um ASO?',
          opts: ['Atestado de Segurança Ocupacional', 'Atestado de Saúde Ocupacional', 'Análise de Segurança Operacional', 'Autorização de Serviço Obrigatório'], ans: 1,
          exp: 'O ASO (Atestado de Saúde Ocupacional) é emitido pelo médico do trabalho após exames admissionais, periódicos ou demissionais.' },
        { q: 'Qual NR trata especificamente de ergonomia?',
          opts: ['NR-5', 'NR-9', 'NR-17', 'NR-35'], ans: 2,
          exp: 'A NR-17 regula a ergonomia — condições de trabalho que proporcionem conforto e eficiência, reduzindo doenças ocupacionais.' },
        { q: 'O e-Social exige o envio de quais dados de SST?',
          opts: ['Apenas folha de pagamento', 'Somente demissões', 'Eventos de SST como ASOs e CAT', 'Apenas admissões'], ans: 2,
          exp: 'O e-Social exige o envio de eventos de SST incluindo ASOs, CAT (Comunicação de Acidente de Trabalho) e dados de monitoramento de saúde.' },
        { q: 'Qual o principal benefício financeiro do SST para a empresa?',
          opts: ['Redução de custos com uniformes', 'Evitar multas fiscais da Receita', 'Reduzir afastamentos e evitar multas trabalhistas', 'Diminuir o FGTS dos funcionários'], ans: 2,
          exp: 'Afastamentos custam caro: salário, substituto, queda de produção. SST reduz tudo isso e ainda evita as pesadas multas do MTE.' },
        { q: 'Qual NR trata da Comissão Interna de Prevenção de Acidentes?',
          opts: ['NR-1', 'NR-5', 'NR-7', 'NR-12'], ans: 1,
          exp: 'A NR-5 regulamenta a CIPA (Comissão Interna de Prevenção de Acidentes), obrigatória para empresas com mais de 20 funcionários em atividades de risco.' },
        { q: 'Qual é o foco principal da abordagem de venda de SST?',
          opts: ['Vender pelo preço baixo', 'Mostrar que a empresa está irregular e pode ser multada', 'Falar sobre concorrentes', 'Oferecer desconto imediato'], ans: 1,
          exp: 'A abordagem mais eficaz é mostrar ao empresário o risco real de multas e passivos trabalhistas — a dor de estar irregular motiva a ação.' },
        { q: 'Quem pode ser autuado por descumprir normas de SST?',
          opts: ['Apenas empresas com mais de 100 funcionários', 'Somente indústrias pesadas', 'Qualquer empresa com funcionário CLT', 'Apenas multinacionais'], ans: 2,
          exp: 'Qualquer empresa com funcionário CLT, independentemente do porte, está sujeita a autuação do MTE por descumprimento das NRs.' }
    ],
    3: [
        { q: 'O que é um chatbot?',
          opts: ['Um robô físico de atendimento', 'Software que simula conversa humana e automatiza respostas', 'Um sistema de câmera de segurança', 'Um app de gestão financeira'], ans: 1,
          exp: 'Chatbot é um software que usa regras ou IA para simular conversa humana, respondendo clientes automaticamente no WhatsApp, Instagram, site e outros canais.' },
        { q: 'Qual canal é mais usado pelos chatbots no Brasil?',
          opts: ['E-mail', 'WhatsApp', 'Telegram', 'SMS'], ans: 1,
          exp: 'O WhatsApp tem mais de 170 milhões de usuários no Brasil, tornando-o o canal preferencial para chatbots de atendimento ao cliente.' },
        { q: 'O que significa "qualificação de leads" no contexto do chatbot?',
          opts: ['Enviar spam para todos os contatos', 'Filtrar e identificar quais leads têm real interesse de compra', 'Bloquear clientes inativos', 'Fazer ligações automáticas'], ans: 1,
          exp: 'O chatbot faz perguntas estratégicas para identificar se o lead tem perfil, interesse e urgência de compra — entregando ao consultor só os leads quentes.' },
        { q: 'Qual é a principal vantagem do atendimento 24/7 do chatbot?',
          opts: ['Reduz o número de funcionários', 'Garante que nenhum lead seja perdido fora do horário comercial', 'Elimina a necessidade de atendimento humano', 'Gera relatórios automáticos'], ans: 1,
          exp: 'Leads chegam a qualquer hora. O chatbot responde na hora — fora do horário, fins de semana e feriados — garantindo que nenhuma oportunidade se perca.' },
        { q: 'O que é um "funil de atendimento" no chatbot?',
          opts: ['Um relatório de erros do sistema', 'Sequência de mensagens que guia o cliente do primeiro contato à conversão', 'Lista de clientes bloqueados', 'Agenda de reuniões automáticas'], ans: 1,
          exp: 'O funil de atendimento é o roteiro programado que leva o cliente passo a passo: interesse → qualificação → agendamento ou venda.' },
        { q: 'Qual métrica mostra o impacto do chatbot nos negócios?',
          opts: ['Número de seguidores no Instagram', 'Tempo médio de resposta e taxa de conversão de leads', 'Quantidade de e-mails enviados', 'Número de funcionários demitidos'], ans: 1,
          exp: 'Tempo de resposta e taxa de conversão são os KPIs mais importantes: chatbot reduz o tempo de resposta de horas para segundos, aumentando a conversão.' },
        { q: 'Como o chatbot ajuda na geração de leads pelo Instagram?',
          opts: ['Comprando seguidores', 'Respondendo automaticamente comentários e DMs com fluxos de captação', 'Fazendo posts automáticos', 'Enviando mensagens para perfis aleatórios'], ans: 1,
          exp: 'O chatbot integrado ao Instagram responde DMs e comentários automaticamente, inicia o fluxo de qualificação e capta o contato do lead em segundos.' },
        { q: 'Qual empresa é ideal para começar a usar chatbot?',
          opts: ['Apenas grandes empresas com mais de 50 funcionários', 'Qualquer negócio que receba contatos pelo WhatsApp ou redes sociais', 'Somente e-commerces', 'Apenas startups de tecnologia'], ans: 1,
          exp: 'Qualquer negócio que receba mensagens de clientes pode se beneficiar — salão de beleza, clínica, loja, prestador de serviços. O tamanho não importa.' },
        { q: 'O que o chatbot NÃO substitui?',
          opts: ['Respostas a perguntas frequentes', 'O atendimento humano para situações complexas e negociações', 'Agendamentos simples', 'Envio de catálogo de produtos'], ans: 1,
          exp: 'Chatbot trata o volume, mas negociações complexas, reclamações delicadas e vendas de alto valor ainda precisam do toque humano — e isso é uma vantagem a comunicar.' },
        { q: 'Qual argumento mais convence um empresário a contratar chatbot?',
          opts: ['É moderno e está na moda', 'Cada lead perdido fora do horário é dinheiro deixado na mesa', 'Todos os concorrentes já têm', 'O setup é rápido e simples'], ans: 1,
          exp: 'A dor financeira é o gatilho mais forte: mostrar quantos leads chegam fora do horário e quantos são perdidos por falta de resposta rápida converte muito.' }
    ],
    4: [
        { q: 'O que é o Simples Nacional?',
          opts: ['Um banco digital para MEIs', 'Regime tributário simplificado para micro e pequenas empresas', 'Um plano de saúde empresarial', 'Um sistema de folha de pagamento'], ans: 1,
          exp: 'O Simples Nacional é um regime tributário que unifica 8 impostos em uma única guia (DAS), com alíquotas reduzidas para micro e pequenas empresas.' },
        { q: 'O que é o MEI?',
          opts: ['Micro Empresa Industrial', 'Microempreendedor Individual — pessoa que fatura até R$81 mil/ano', 'Meio Empresário Individual', 'Módulo Empresarial Integrado'], ans: 1,
          exp: 'MEI é o Microempreendedor Individual, regime simplificado para quem fatura até R$81 mil por ano, com contribuição mensal fixa e baixo custo de abertura.' },
        { q: 'Qual documento comprova a regularidade fiscal de uma empresa?',
          opts: ['Contrato social', 'Certidão Negativa de Débitos (CND)', 'Alvará de funcionamento', 'Declaração do IR pessoal'], ans: 1,
          exp: 'A CND (ou CNPJ regular) comprova que a empresa não tem dívidas com a Receita Federal — exigida em licitações, financiamentos e parcerias comerciais.' },
        { q: 'O que é o pró-labore?',
          opts: ['Lucro distribuído aos sócios sem tributação', 'Remuneração formal do sócio que trabalha na empresa, com incidência de INSS', 'Empréstimo bancário empresarial', 'Benefício de vale-alimentação'], ans: 1,
          exp: 'Pró-labore é o salário do sócio-administrador. Sobre ele incide INSS — e definir o valor correto faz grande diferença no planejamento tributário.' },
        { q: 'Qual regime é mais vantajoso para uma empresa com muitas despesas dedutíveis?',
          opts: ['Simples Nacional', 'MEI', 'Lucro Real', 'Lucro Presumido'], ans: 2,
          exp: 'No Lucro Real, o imposto é calculado sobre o lucro efetivo. Empresas com muitas despesas dedutíveis pagam menos IR — por isso pode ser mais vantajoso.' },
        { q: 'O que é a nota fiscal eletrônica (NF-e)?',
          opts: ['Um recibo físico obrigatório', 'Documento fiscal digital que registra operações de venda de produtos', 'Boleto bancário digital', 'Comprovante de pagamento de impostos'], ans: 1,
          exp: 'A NF-e é o documento fiscal eletrônico obrigatório para venda de mercadorias. Sua emissão incorreta pode gerar multas e problemas com a Receita.' },
        { q: 'Qual o principal benefício do planejamento tributário?',
          opts: ['Sonegar impostos legalmente', 'Reduzir a carga tributária dentro da lei, pagando menos de forma lícita', 'Atrasar o pagamento de impostos', 'Eliminar todas as obrigações fiscais'], ans: 1,
          exp: 'Planejamento tributário é escolher o regime e estrutura mais vantajosa dentro da lei. Empresas bem assessoradas chegam a economizar 30% em impostos.' },
        { q: 'O que é a escrituração contábil?',
          opts: ['Registro físico de clientes em caderno', 'Registro sistemático e cronológico de todas as operações financeiras da empresa', 'Sistema de ponto eletrônico', 'Controle de estoque manual'], ans: 1,
          exp: 'Escrituração é o registro formal de todas as entradas e saídas financeiras — base para balanço patrimonial, DRE e compliance fiscal.' },
        { q: 'Qual é o perfil ideal de cliente para consultoria contábil?',
          opts: ['Apenas grandes empresas com mais de 200 funcionários', 'Qualquer MEI, ME ou EPP que tenha CNPJ ou queira abrir empresa', 'Somente escritórios de advocacia', 'Apenas indústrias'], ans: 1,
          exp: 'Todo CNPJ ativo é um potencial cliente! MEI, ME e EPP formam a maior fatia do mercado e costumam estar mal assessorados — oportunidade enorme.' },
        { q: 'Como abordar um MEI que acha que não precisa de contador?',
          opts: ['Dizer que ele é obrigado por lei', 'Mostrar quanto ele pode estar pagando a mais de imposto sem planejamento', 'Oferecer o serviço de graça', 'Ignorar e focar em empresas maiores'], ans: 1,
          exp: 'O MEI que não tem assessoria muitas vezes paga mais imposto do que precisa ou está irregular. Mostrar esse impacto financeiro é o gatilho certo.' }
    ],
    5: [
        { q: 'O que é uma landing page?',
          opts: ['Página inicial de um blog', 'Página focada em converter visitantes em leads ou clientes', 'Rede social empresarial', 'Sistema de e-mail marketing'], ans: 1,
          exp: 'Landing page é uma página específica criada para uma campanha, com foco em uma única ação: preencher formulário, ligar, comprar ou contratar.' },
        { q: 'O que é SEO?',
          opts: ['Sistema de E-mail Organizado', 'Otimização para mecanismos de busca — aparecer no Google organicamente', 'Software de Edição Online', 'Serviço de Envio de Orçamento'], ans: 1,
          exp: 'SEO (Search Engine Optimization) são técnicas para fazer o site aparecer nos primeiros resultados do Google sem pagar por anúncios.' },
        { q: 'Qual a principal vantagem do Google Ads sobre o SEO?',
          opts: ['É gratuito', 'Gera resultados imediatos ao aparecer no topo do Google rapidamente', 'Dura mais tempo', 'É mais fácil de implementar'], ans: 1,
          exp: 'Google Ads coloca o negócio no topo do Google imediatamente — ideal para campanhas com urgência. SEO demora meses para dar resultados.' },
        { q: 'O que é uma "taxa de conversão" em marketing digital?',
          opts: ['Percentual de clientes que reclamam', 'Percentual de visitantes/leads que realizam a ação desejada (compra, contato)', 'Número de seguidores ganhos por mês', 'Custo de cada clique no anúncio'], ans: 1,
          exp: 'Taxa de conversão mede a eficiência da campanha: de 100 pessoas que clicaram, quantas viraram clientes. Otimizar isso é o coração do marketing digital.' },
        { q: 'Qual tipo de conteúdo gera mais engajamento no Instagram para negócios locais?',
          opts: ['Fotos genéricas de banco de imagens', 'Vídeos curtos com bastidores, depoimentos e resultados reais', 'Textos longos sem imagem', 'Apenas promoções de preço'], ans: 1,
          exp: 'Conteúdo autêntico — bastidores, depoimentos em vídeo e resultados reais — gera confiança e engajamento muito superior a imagens genéricas.' },
        { q: 'O que é o "pixel" do Facebook/Meta?',
          opts: ['Uma unidade de medida de tela', 'Código instalado no site para rastrear visitantes e otimizar anúncios', 'Tipo de anúncio em vídeo', 'Ferramenta de criação de imagens'], ans: 1,
          exp: 'O pixel é um código que rastreia as ações dos visitantes no site. Com ele, é possível criar públicos personalizados e anúncios muito mais precisos.' },
        { q: 'O que é e-mail marketing?',
          opts: ['Spam enviado em massa', 'Comunicação estratégica via e-mail para nutrir leads e fidelizar clientes', 'Serviço de e-mail corporativo', 'Anúncio pago por e-mail'], ans: 1,
          exp: 'E-mail marketing bem feito tem ROI altíssimo: nutrir leads com conteúdo útil até a compra e manter clientes engajados com novidades e ofertas.' },
        { q: 'Qual métrica indica se um anúncio é eficiente em custo?',
          opts: ['Número de curtidas', 'CPA (Custo por Aquisição) — quanto custa cada cliente conquistado', 'Quantidade de comentários', 'Número de impressões'], ans: 1,
          exp: 'CPA (Custo por Aquisição) mostra quanto cada novo cliente custo em anúncios. Reduzir o CPA enquanto mantém volume de vendas é o objetivo.' },
        { q: 'Por que uma empresa local precisa de presença digital?',
          opts: ['Porque é obrigatório por lei', 'Porque 90% das pessoas pesquisam no Google antes de comprar ou contratar serviços', 'Para competir só com grandes marcas', 'Apenas para vender online'], ans: 1,
          exp: '9 em cada 10 consumidores pesquisam online antes de comprar — mesmo para negócios físicos locais. Não estar no digital é deixar clientes para o concorrente.' },
        { q: 'Qual argumento fecha mais clientes para sites e marketing?',
          opts: ['Nossos sites são bonitos', 'Cada dia sem presença digital é dinheiro que vai pro concorrente que já está lá', 'Fazemos sites rápidos', 'Temos preços baixos'], ans: 1,
          exp: 'O senso de perda (ver o concorrente crescendo enquanto você fica parado) é o gatilho emocional mais forte para empresários que ainda não investiram no digital.' }
    ]
};

/* ═══════════════════════════════════════════════════════════════════
   TRAINING SECTIONS — conteúdo por módulo
═══════════════════════════════════════════════════════════════════ */

const SECTIONS_BY_MODULE = { 1: [
    {
        title: 'Como funciona',
        trak: `Olá! 👋 Eu sou o <strong>TRAK</strong>, seu guia de treinamento aqui na Tracktiv! Antes de sair vendendo, você precisa entender o produto por dentro. Sabe quando você rastreia uma encomenda pelo app? Com o rastreador veicular é <em>igualzinho</em> — só que pro carro do seu cliente! Essa analogia já abre a cabeça de muita gente. <strong>Use ela!</strong> 🚀`,
        html: `
        <h3 style="margin:0 0 18px;">Como o rastreador funciona?</h3>
        <div class="diagram-flow">
            <div class="diagram-node"><div class="dnode-icon">🚗</div>Veículo</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📡</div>Chip GSM</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🛰️</div>Satélite GPS</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">☁️</div>Servidor</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📱</div>App/Web</div>
        </div>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">📍</div><strong>GPS de Alta Precisão</strong><p>Localiza o veículo com precisão de metros, em qualquer lugar do Brasil</p></div>
            <div class="feature-card"><div class="feat-icon">📶</div><strong>Chip GSM Integrado</strong><p>Envia dados via rede de celular, sem precisar de Wi-Fi ou Bluetooth</p></div>
            <div class="feature-card"><div class="feat-icon">📲</div><strong>App ou Web</strong><p>O cliente acessa de qualquer celular, sem instalar nada no computador</p></div>
        </div>
        <div class="script-box">💬 <strong>Como explicar pro cliente:</strong> <em>"É simples: o aparelho fica escondido no carro, conecta ao satélite GPS e manda a localização pro seu celular. É como rastrear uma encomenda, mas do seu carro — em tempo real!"</em></div>`
    },
    {
        title: 'Funcionalidades',
        trak: `Agora que você entende como funciona, vamos conhecer o arsenal completo! 💪 Cada função que eu mostrar aqui é um <strong>argumento de venda</strong>. Tem cliente que fecha só pela cerca eletrônica, outros pelo bloqueio remoto. Conhece tudo pra ter resposta pra tudo!`,
        html: `
        <h3 style="margin:0 0 18px;">O que o rastreador faz?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">📍</div><strong>Localização em tempo real</strong><p>Vê onde está o carro agora mesmo, no mapa, com atualização constante</p></div>
            <div class="feature-card"><div class="feat-icon">⚡</div><strong>Cerca eletrônica</strong><p>Define uma área no mapa. Se o carro sair, o cliente recebe alerta imediato</p></div>
            <div class="feature-card"><div class="feat-icon">🔒</div><strong>Bloqueio remoto</strong><p>Em caso de roubo, bloqueia o motor pelo app. O carro para e não liga mais</p></div>
            <div class="feature-card"><div class="feat-icon">🔔</div><strong>Alertas de ignição</strong><p>Notifica quando o carro é ligado ou desligado — ideal pra saber se o filho chegou</p></div>
            <div class="feature-card"><div class="feat-icon">🚀</div><strong>Alerta de velocidade</strong><p>Avisa quando o veículo ultrapassa a velocidade definida pelo cliente</p></div>
            <div class="feature-card"><div class="feat-icon">🗺️</div><strong>Histórico de rotas</strong><p>Vê todas as rotas dos últimos 90 dias: hora, paradas e percurso completo</p></div>
        </div>
        <div class="script-box">💡 <strong>Dica do TRAK:</strong> <em>Mostre o app ao vivo no celular durante a apresentação. Ver a localização em tempo real é o momento "uau" que acelera a decisão de compra!</em></div>`
    },
    {
        title: 'Benefícios para o cliente',
        trak: `Atenção aqui — isso é <strong>OURO!</strong> 💡 O cliente não compra função, ele compra <em>benefício</em>. Ele compra segurança pra família, paz de espírito, controle do negócio. Guarda essas frases prontas — elas fecham venda!`,
        html: `
        <h3 style="margin:0 0 18px;">Por que o cliente vai querer?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🛡️</div><strong>Segurança</strong><p>Recuperação rápida em caso de furto. Com bloqueio remoto, as chances disparam</p></div>
            <div class="feature-card"><div class="feat-icon">🧘</div><strong>Tranquilidade</strong><p>Saber onde o filho está, se chegou em casa, se o carro está seguro — sem ansiedade</p></div>
            <div class="feature-card"><div class="feat-icon">💰</div><strong>Economia</strong><p>Frotas com rastreador reduzem combustível e manutenção com controle de rotas</p></div>
            <div class="feature-card"><div class="feat-icon">📊</div><strong>Controle total</strong><p>Empresa sabe onde cada motorista está, histórico de rotas, horas trabalhadas</p></div>
        </div>
        <h4 style="margin:18px 0 10px;">Frases prontas pra usar:</h4>
        <div class="script-box">🛡️ <em>"Com o bloqueio remoto, mesmo que roubem o carro, você bloqueia o motor pelo celular. O veículo para — e a polícia age rápido."</em></div>
        <div class="script-box">🧘 <em>"Você recebe uma notificação quando o carro é ligado. É tipo ter um guarda-costas digital pra família toda."</em></div>
        <div class="script-box">💰 <em>"Menos de R$1,50 por dia. Quanto vale a tranquilidade de saber que seu veículo está protegido?"</em></div>
        <div class="script-box">📊 <em>"Com o histórico de rotas você sabe o que cada motorista fez no dia. Sem surpresas na conta de combustível."</em></div>`
    },
    {
        title: 'Casos Reais',
        trak: `Histórias reais vendem mais que qualquer catálogo! 📖 Uma boa história cria conexão emocional e quebra objeção antes mesmo de ela aparecer. <strong>Aprende essas três e usa em toda abordagem!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">3 histórias que fecham venda</h3>
        <div class="story-cards">
            <div class="story-card">
                <div class="story-icon">🏍️</div>
                <h4>A moto recuperada em 20 minutos</h4>
                <p>Um motoboy teve a moto roubada em plena luz do dia. Em menos de 20 minutos, ele acionou o bloqueio remoto pelo app. A polícia localizou o veículo parado a 5km dali — com o ladrão ao lado, sem conseguir religar a moto.</p>
                <div class="story-tip">📌 Use quando o cliente disser "minha região é tranquila" — furto acontece em todo lugar, e 20 min faz toda a diferença.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">👨‍👧</div>
                <h4>O pai que dorme tranquilo</h4>
                <p>Um pai deu o carro pra filha adolescente ir à faculdade. Antes, ficava acordado esperando mensagem. Hoje recebe notificação quando o carro liga e outra quando chega em casa. Configurou ainda alerta de velocidade acima de 80 km/h.</p>
                <div class="story-tip">📌 Use com pais de adolescentes, casais com carro compartilhado ou quem tem funcionário usando o veículo da empresa.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🚚</div>
                <h4>A empresa que economizou 22%</h4>
                <p>Uma transportadora com 4 veículos descobriu, pelo histórico de rotas, que dois motoristas desviavam do trajeto — acrescendo 30 km extras por dia. Com ajustes simples, reduziram 22% do custo de combustível no mês seguinte.</p>
                <div class="story-tip">📌 Use com qualquer cliente que tem frota — mesmo 1 ou 2 carros. A economia pode pagar o rastreador inteiro!</div>
            </div>
        </div>`
    },
    {
        title: 'Os Planos',
        trak: `Saber qual plano indicar pro perfil certo é o segredo do consultor top! 🎯 Não force o mais caro — <strong>indique o certo</strong>. Cliente satisfeito renova, indica amigos e faz upgrade sozinho com o tempo!`,
        html: `
        <h3 style="margin:0 0 18px;">Comparativo de planos</h3>
        <div style="overflow-x:auto;">
            <table class="plan-compare">
                <thead><tr><th>Plano</th><th>Valor/mês</th><th>Inclui</th><th>Perfil ideal</th></tr></thead>
                <tbody>
                    <tr><td class="plan-name">Essencial</td><td class="plan-price">R$ 44,90</td><td>Localização em tempo real + alertas básicos</td><td>Primeiro rastreador, orçamento limitado</td></tr>
                    <tr><td class="plan-name">Profissional</td><td class="plan-price">R$ 54,90</td><td>Essencial + bloqueio remoto + histórico 90 dias</td><td>Autônomo, motoboy, carro financiado</td></tr>
                    <tr><td class="plan-name">Controle Total</td><td class="plan-price">R$ 64,90</td><td>Profissional + relatórios avançados + suporte prioritário</td><td>Família, empresa pequena, quem quer o melhor</td></tr>
                    <tr><td class="plan-name">Empresas</td><td class="plan-price">Sob consulta</td><td>Pacote completo por volume de veículos</td><td>3+ veículos, frotas, transportadoras</td></tr>
                </tbody>
            </table>
        </div>
        <h4 style="margin:16px 0 10px;">Dicas de perfil do TRAK 🤖</h4>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🌱</div><strong>Essencial → Upgrade</strong><p>Comece pelo Essencial pra fechar, depois ofereça upgrade quando o cliente sentir o valor na prática</p></div>
            <div class="feature-card"><div class="feat-icon">👨‍👩‍👧</div><strong>Família com carro novo?</strong><p>Vá direto pro Controle Total. Quem acabou de comprar quer proteger ao máximo</p></div>
            <div class="feature-card"><div class="feat-icon">🚛</div><strong>Empresa com frota?</strong><p>Sempre Empresas. Feche com o dono — o ROI se paga em 1 mês</p></div>
        </div>`
    },
    {
        title: 'Como Vender',
        trak: `Chegou a hora do módulo que transforma conhecimento em dinheiro! 💰 Você já tem o produto, os argumentos e as histórias. Agora vem a <strong>técnica de vendas</strong>. Cada script aqui você pode usar hoje mesmo na próxima conversa!`,
        html: `
        <h3 style="margin:0 0 8px;">As 3 perguntas mágicas</h3>
        <p class="text-muted" style="margin:0 0 14px;">Use no início da conversa pra descobrir a dor do cliente e personalizar a abordagem.</p>
        <div class="script-box"><strong>1. "Você já teve medo de ter seu veículo roubado?"</strong><br>A dor aparece naturalmente. Isso abre o ângulo de segurança — o mais forte de todos.</div>
        <div class="script-box"><strong>2. "Você tem família usando o carro?"</strong><br>Abre o ângulo de tranquilidade e monitoramento familiar. Ideal pra pais e cônjuges.</div>
        <div class="script-box"><strong>3. "Você usa o carro no trabalho ou tem alguma frota?"</strong><br>Abre o ângulo de controle e economia. Mesmo 1 carro de trabalho já justifica o investimento.</div>
        <h3 style="margin:20px 0 12px;">Contornando objeções</h3>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Tá caro, não tenho esse dinheiro agora."</div>
            <div class="obj-a">✅ "R$44,90 dividido por 30 dias = menos de R$1,50 por dia. Menos que um café. Quanto você pagou de seguro esse ano? Isso aqui é prevenção real, sem franquia."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Vou pensar e te dou um retorno."</div>
            <div class="obj-a">✅ "Claro! Mas o que faria você decidir com mais segurança? [Escuta]. A maioria dos clientes arrependeu de uma coisa só — de não ter contratado antes do susto."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Não preciso disso, minha região é tranquila."</div>
            <div class="obj-a">✅ "Que bom! Mas furto de veículos acontece em toda região. O motoboy que usou o bloqueio remoto falou a mesma coisa — e recuperou a moto em 20 minutos."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Já tenho seguro, não preciso de rastreador."</div>
            <div class="obj-a">✅ "O seguro te paga depois — com franquia e demora. O rastreador ajuda a recuperar antes de precisar do seguro. São complementares. E muitas seguradoras dão desconto pra quem tem rastreador!"</div>
        </div>
        <div class="script-box" style="margin-top:18px;">🏆 <strong>Script de fechamento:</strong><br><em>"Você me disse que tem medo de roubo e usa o carro pra trabalhar. Isso aqui resolve os dois. Com o Profissional, você tem localização ao vivo, bloqueio remoto e histórico completo por R$54,90/mês. A gente começa hoje?"</em></div>`
    }
], 2: [
    {
        title: 'O que é SST',
        trak: `Bem-vindo ao Módulo 2! 🦺 Sou eu, o TRAK! Segurança do Trabalho parece coisa de empresa grande — mas <strong>toda empresa com funcionário CLT tem obrigação legal</strong>, independente do tamanho. E o melhor? Muita gente não sabe que está irregular. Você vai chegar como a solução antes que a fiscalização chegue como problema!`,
        html: `
        <h3 style="margin:0 0 18px;">O que é Saúde e Segurança do Trabalho?</h3>
        <div class="diagram-flow">
            <div class="diagram-node"><div class="dnode-icon">🏢</div>Empresa</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📋</div>Normas NR</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🔍</div>Fiscalização MTE</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">✅</div>Conformidade</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">💰</div>Sem multas</div>
        </div>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">📜</div><strong>Obrigação Legal</strong><p>Normas Regulamentadoras (NRs) do Ministério do Trabalho — descumprir gera multas e processos</p></div>
            <div class="feature-card"><div class="feat-icon">🛡️</div><strong>Proteção do trabalhador</strong><p>Exames, laudos e treinamentos que protegem a saúde física e mental de cada funcionário</p></div>
            <div class="feature-card"><div class="feat-icon">💼</div><strong>Para toda empresa CLT</strong><p>MEI com funcionário, ME, EPP — qualquer CNPJ com CLT precisa de SST, sem exceção</p></div>
        </div>
        <div class="script-box">💬 <strong>Como explicar pro cliente:</strong> <em>"SST não é opcional — é lei. Se você tem funcionário registrado, precisa ter os documentos em ordem. Meu serviço faz tudo isso por você, sem burocracia."</em></div>`
    },
    {
        title: 'Os Documentos',
        trak: `Agora vou te ensinar os documentos que toda empresa precisa ter! 📋 Você não precisa decorar tudo — <strong>precisa saber o suficiente pra mostrar ao cliente que ele está irregular</strong>. Isso abre o caminho pra fechar!`,
        html: `
        <h3 style="margin:0 0 18px;">Documentos obrigatórios</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🏥</div><strong>PCMSO</strong><p>Programa de Controle Médico de Saúde Ocupacional — exames admissionais, periódicos e demissionais</p></div>
            <div class="feature-card"><div class="feat-icon">⚠️</div><strong>PGR</strong><p>Programa de Gerenciamento de Riscos — mapeia e controla riscos do ambiente de trabalho</p></div>
            <div class="feature-card"><div class="feat-icon">📄</div><strong>ASO</strong><p>Atestado de Saúde Ocupacional — emitido pelo médico do trabalho após cada exame obrigatório</p></div>
            <div class="feature-card"><div class="feat-icon">🗂️</div><strong>LTCAT</strong><p>Laudo Técnico de Condições Ambientais — necessário para aposentadoria especial e e-Social</p></div>
            <div class="feature-card"><div class="feat-icon">💻</div><strong>e-Social SST</strong><p>Envio digital de eventos de SST ao governo — obrigatório, com multa por atraso ou omissão</p></div>
            <div class="feature-card"><div class="feat-icon">🚨</div><strong>CAT</strong><p>Comunicação de Acidente de Trabalho — deve ser emitida até 1º dia útil após qualquer acidente</p></div>
        </div>
        <div class="script-box">📌 <strong>Dica do TRAK:</strong> <em>Pergunte ao cliente: "Você tem PCMSO e PGR atualizados?" — 80% das pequenas empresas não têm. Essa pergunta já mostra que você sabe do que está falando!</em></div>`
    },
    {
        title: 'Benefícios',
        trak: `Empresário não compra burocracia — compra <strong>resultado e proteção</strong>! 💡 Use esses argumentos pra mostrar que SST não é custo, é investimento. Quem trata como custo paga muito mais caro depois com multas e processos!`,
        html: `
        <h3 style="margin:0 0 18px;">Por que o cliente vai querer?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🚫</div><strong>Evita multas pesadas</strong><p>Multas do MTE vão de R$665 a R$6.634 por infração. Uma única autuação cobre anos de serviço SST</p></div>
            <div class="feature-card"><div class="feat-icon">⚖️</div><strong>Proteção em processos</strong><p>Documentação em dia é a principal defesa em reclamatórias trabalhistas — reduz passivos enormes</p></div>
            <div class="feature-card"><div class="feat-icon">📉</div><strong>Reduz afastamentos</strong><p>PCMSO identifica doenças cedo. Menos afastamentos = menos custo com substitutos e queda de produção</p></div>
            <div class="feature-card"><div class="feat-icon">🤝</div><strong>Funcionário mais produtivo</strong><p>Ambiente seguro e saudável aumenta motivação, reduz turnover e melhora resultados</p></div>
        </div>
        <h4 style="margin:18px 0 10px;">Frases prontas pra usar:</h4>
        <div class="script-box">🚫 <em>"Uma fiscalização pode gerar multas de R$5.000 ou mais por funcionário sem documentação. Nosso serviço custa muito menos que uma única multa."</em></div>
        <div class="script-box">⚖️ <em>"Se um funcionário processar sua empresa e você não tiver os ASOs e o PGR, o juiz presume culpa. A documentação é sua maior proteção."</em></div>
        <div class="script-box">📉 <em>"Cada afastamento custa em média 3x o salário do funcionário entre substituto e perda de produção. SST paga por si mesmo em poucos meses."</em></div>`
    },
    {
        title: 'Casos Reais',
        trak: `Histórias reais são a cola que fecha contratos! 📖 Cada história abaixo acontece todo dia com pequenas empresas. <strong>Escolha a que mais combina com o perfil do seu cliente e use!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">3 histórias que fecham contratos</h3>
        <div class="story-cards">
            <div class="story-card">
                <div class="story-icon">🏗️</div>
                <h4>A oficina que quase fechou</h4>
                <p>Uma oficina mecânica com 4 funcionários foi autuada pelo MTE durante fiscalização de rotina. Sem PCMSO e PGR, levou multa de R$12.000. O proprietário disse: "o valor do serviço de SST ao ano seria menor que essa multa única."</p>
                <div class="story-tip">📌 Use com qualquer pequena empresa que "nunca teve problema" — a fiscalização não avisa quando vem.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">⚖️</div>
                <h4>O processo que poderia ser evitado</h4>
                <p>Uma loja de varejo perdeu uma reclamatória trabalhista de R$35.000 porque não tinha o ASO demissional do funcionário. O médico do trabalho confirmou: o exame teria custado R$80. A documentação seria a defesa perfeita.</p>
                <div class="story-tip">📌 Use quando o cliente disser "meus funcionários são de confiança" — processo trabalhista não tem a ver com confiança.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🏭</div>
                <h4>A fábrica que reduziu afastamentos</h4>
                <p>Uma metalúrgica com 12 funcionários implantou o PCMSO completo. No primeiro ano, identificou 3 casos iniciais de LER e adaptou as bancadas. Resultado: zero afastamentos nos 18 meses seguintes, economizando mais de R$40.000 em substitutos.</p>
                <div class="story-tip">📌 Use com empresas industriais, construtoras ou qualquer negócio com trabalho manual intenso.</div>
            </div>
        </div>`
    },
    {
        title: 'Como Vender SST',
        trak: `Chegou a hora de transformar conhecimento em contrato! 💼 SST vende pela <strong>dor do risco</strong> — ninguém quer multa, processo ou acidente. Seu papel é mostrar que o risco é real e que você resolve com praticidade e preço justo!`,
        html: `
        <h3 style="margin:0 0 8px;">As 3 perguntas que abrem o contrato</h3>
        <p class="text-muted" style="margin:0 0 14px;">Use logo no início pra diagnosticar a situação e criar urgência.</p>
        <div class="script-box"><strong>1. "Você tem funcionários com CLT?"</strong><br>Se sim, a empresa já tem obrigação legal de SST. Isso cria o contexto imediato.</div>
        <div class="script-box"><strong>2. "Seu PCMSO e PGR estão atualizados para o e-Social?"</strong><br>Muitos não sabem nem o que é. Essa pergunta posiciona você como especialista.</div>
        <div class="script-box"><strong>3. "Você já foi fiscalizado pelo MTE? Sabe o que acontece numa autuação?"</strong><br>Cria urgência sem assustar demais — apenas torna o risco real e tangível.</div>
        <h3 style="margin:20px 0 12px;">Contornando objeções</h3>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Minha empresa é pequena, não vão me fiscalizar."</div>
            <div class="obj-a">✅ "O MTE fiscaliza empresas de todos os tamanhos, inclusive MEIs com funcionário. Na verdade, pequenas empresas são autuadas com mais frequência porque costumam estar menos preparadas."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Já tenho um contador, acho que ele resolve isso."</div>
            <div class="obj-a">✅ "Contador cuida do fiscal e tributário — SST é uma área separada, com médico do trabalho e engenheiro de segurança. São serviços complementares, não concorrentes."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Isso parece muito caro para minha realidade."</div>
            <div class="obj-a">✅ "Entendo! Mas compare: uma multa do MTE começa em R$665 por funcionário. Nosso serviço anual custa menos que uma única autuação. Qual o custo de não ter?"</div>
        </div>
        <div class="script-box" style="margin-top:18px;">🏆 <strong>Script de fechamento:</strong><br><em>"Você tem [X] funcionários, o que significa que o PCMSO e o PGR são obrigatórios. Eu faço tudo isso por você — documentação, exames, e-Social — sem você precisar entender de lei. Quer regularizar sua empresa agora?"</em></div>`
    }
], 3: [
    {
        title: 'O que é Chatbot',
        trak: `Módulo 3 — bora falar sobre o produto que está transformando atendimento de todo negócio! 🤖 Um chatbot é basicamente <strong>eu trabalhando pro seu cliente</strong> — respondendo, qualificando leads e agendando, 24 horas por dia, 7 dias por semana, sem reclamar de hora extra!`,
        html: `
        <h3 style="margin:0 0 18px;">Como o chatbot funciona?</h3>
        <div class="diagram-flow">
            <div class="diagram-node"><div class="dnode-icon">💬</div>Lead manda msg</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🤖</div>Bot responde</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🎯</div>Qualifica interesse</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📅</div>Agenda/converte</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">👤</div>Humano só no final</div>
        </div>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">📱</div><strong>WhatsApp + Instagram</strong><p>Atende nos canais onde o cliente já está — sem precisar mudar nada no comportamento do lead</p></div>
            <div class="feature-card"><div class="feat-icon">🕐</div><strong>24/7 sem parar</strong><p>Responde às 3h da madrugada, no domingo, no feriado — nenhum lead fica sem resposta</p></div>
            <div class="feature-card"><div class="feat-icon">🎯</div><strong>Qualificação automática</strong><p>Faz as perguntas certas e entrega só os leads quentes para o vendedor humano</p></div>
        </div>
        <div class="script-box">💬 <strong>Como explicar pro cliente:</strong> <em>"Imagina ter um atendente que nunca dorme, nunca fica doente e responde todos os clientes em segundos — sem custo de salário. Isso é o chatbot."</em></div>`
    },
    {
        title: 'Funcionalidades',
        trak: `Cada função do chatbot é um argumento de venda diferente! 🎯 Aprende todas elas — tem cliente que fecha pelo agendamento automático, outros pela integração com o Instagram. <strong>Conhece tudo pra ter resposta pra tudo!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">O que o chatbot faz?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">⚡</div><strong>Resposta instantânea</strong><p>Responde em segundos — estudos mostram que resposta em até 5 min aumenta conversão em 9x</p></div>
            <div class="feature-card"><div class="feat-icon">🔍</div><strong>Qualificação de leads</strong><p>Pergunta, filtra e segmenta leads por interesse, orçamento e urgência antes de passar pro humano</p></div>
            <div class="feature-card"><div class="feat-icon">📅</div><strong>Agendamento automático</strong><p>Consultas, reuniões e visitas agendadas diretamente no chat, com confirmação automática</p></div>
            <div class="feature-card"><div class="feat-icon">📦</div><strong>Catálogo interativo</strong><p>Apresenta produtos, preços e fotos dentro da conversa — como uma loja dentro do WhatsApp</p></div>
            <div class="feature-card"><div class="feat-icon">🔄</div><strong>Follow-up automático</strong><p>Manda mensagens de acompanhamento para leads que não responderam — sem esquecer nenhum</p></div>
            <div class="feature-card"><div class="feat-icon">📊</div><strong>Relatórios de atendimento</strong><p>Quantos leads chegaram, por qual canal, horário de pico e taxa de conversão do bot</p></div>
        </div>
        <div class="script-box">💡 <strong>Dica do TRAK:</strong> <em>Mostre o fluxo ao vivo no WhatsApp durante a apresentação. Ver o bot respondendo em tempo real é o momento "uau" que acelera a decisão!</em></div>`
    },
    {
        title: 'Benefícios',
        trak: `Agora a parte que fecha contrato — os <strong>benefícios em números!</strong> 📈 Empresário gosta de resultado mensurável. Use esses dados na sua apresentação e veja como a conversa muda de tom imediatamente!`,
        html: `
        <h3 style="margin:0 0 18px;">Por que o cliente vai querer?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">⏰</div><strong>Tempo de resposta</strong><p>De horas para segundos. 78% dos clientes compram de quem responder primeiro</p></div>
            <div class="feature-card"><div class="feat-icon">💸</div><strong>Custo por lead</strong><p>Bot qualifica 100 leads pelo custo de 1 atendente — escala sem custo proporcional</p></div>
            <div class="feature-card"><div class="feat-icon">🔁</div><strong>Zero lead perdido</strong><p>Fora do horário, nos picos, no volume — o bot nunca deixa cliente sem resposta</p></div>
            <div class="feature-card"><div class="feat-icon">📈</div><strong>Mais conversão</strong><p>Negócios que implantaram chatbot relatam em média 35% de aumento na taxa de agendamento</p></div>
        </div>
        <h4 style="margin:18px 0 10px;">Frases prontas pra usar:</h4>
        <div class="script-box">⏰ <em>"Seu concorrente já responde em segundos pelo chatbot. Se você demora horas, o cliente já foi embora. O bot nivela o campo de jogo."</em></div>
        <div class="script-box">💸 <em>"Um atendente custa R$1.500 a R$2.500 por mês. O chatbot faz o volume de 3 atendentes por uma fração disso — e nunca pede férias."</em></div>
        <div class="script-box">🔁 <em>"Pensa nos leads que chegaram no domingo à noite e não receberam resposta. Cada um desses é uma venda perdida. O bot resolve isso hoje."</em></div>`
    },
    {
        title: 'Casos Reais',
        trak: `Histórias reais valem mais que qualquer argumento lógico! 📖 Esses casos acontecem em negócios como os do seu cliente. <strong>Use a história que mais combina com o perfil de quem você está conversando!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">3 histórias que fecham contratos</h3>
        <div class="story-cards">
            <div class="story-card">
                <div class="story-icon">💅</div>
                <h4>O salão que dobrou os agendamentos</h4>
                <p>Um salão de beleza recebia até 40 mensagens por dia no WhatsApp. A proprietária perdia horas respondendo e muitos clientes iam para o concorrente. Com o chatbot, agendamentos automáticos aumentaram 110% no primeiro mês — ela mal acreditou.</p>
                <div class="story-tip">📌 Use com salões, clínicas, estúdios — qualquer negócio baseado em agendamento.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🏠</div>
                <h4>A imobiliária que parou de perder leads</h4>
                <p>Uma imobiliária descobriu que 60% dos leads chegavam fora do horário comercial. O chatbot passou a qualificar interesse, faixa de preço e bairro desejado. O corretor chegava de manhã com uma lista de leads prontos para visita. Conversão triplicou.</p>
                <div class="story-tip">📌 Use com imobiliárias, consultórios, lojas online — qualquer negócio com volume de contatos.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🍕</div>
                <h4>A pizzaria que automatizou os pedidos</h4>
                <p>Uma pizzaria implantou chatbot para receber pedidos pelo WhatsApp. Reduziu erros de pedido em 90%, eliminou a necessidade de atendente telefônico e aumentou o ticket médio com sugestões automáticas de complemento. O dono disse que foi a melhor decisão do ano.</p>
                <div class="story-tip">📌 Use com restaurantes, deliveries, lojas de varejo — onde pedido manual gera erro e atraso.</div>
            </div>
        </div>`
    },
    {
        title: 'Como Vender Chatbot',
        trak: `Hora de fechar contratos! 🚀 Chatbot vende pela <strong>dor de perder leads e pela oportunidade de escalar</strong>. Mostre ao cliente o que ele está perdendo hoje — e como você resolve isso amanhã!`,
        html: `
        <h3 style="margin:0 0 8px;">As 3 perguntas que abrem o contrato</h3>
        <p class="text-muted" style="margin:0 0 14px;">Use no início pra diagnosticar e criar urgência imediata.</p>
        <div class="script-box"><strong>1. "Quantas mensagens você recebe por dia no WhatsApp ou Instagram?"</strong><br>Se for mais de 10, o chatbot já se paga sozinho em tempo economizado.</div>
        <div class="script-box"><strong>2. "Você já perdeu clientes por não responder rápido o suficiente?"</strong><br>Quase sempre a resposta é sim — e isso é a dor que o chatbot resolve.</div>
        <div class="script-box"><strong>3. "O que acontece com os clientes que mandam mensagem fora do horário?"</strong><br>Mostrar que esses leads vão para o concorrente cria urgência real.</div>
        <h3 style="margin:20px 0 12px;">Contornando objeções</h3>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Meu atendimento é personalizado, robô não funciona pra mim."</div>
            <div class="obj-a">✅ "O chatbot não substitui você no momento importante — ele só faz o trabalho repetitivo de triagem. Você fica livre pra dar o atendimento especial só pra quem já está pronto pra comprar."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Meus clientes não vão gostar de falar com robô."</div>
            <div class="obj-a">✅ "Pesquisas mostram que 68% dos clientes preferem resposta imediata de bot a esperar horas por um humano. Eles querem velocidade — e o bot entrega isso."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Já tenho uma pessoa que cuida do WhatsApp."</div>
            <div class="obj-a">✅ "Ótimo! O chatbot não demite ninguém — libera essa pessoa para focar em vendas e atendimento complexo, enquanto o bot cuida do volume. É produtividade, não substituição."</div>
        </div>
        <div class="script-box" style="margin-top:18px;">🏆 <strong>Script de fechamento:</strong><br><em>"Você me disse que perde leads fora do horário e demora pra responder nos picos. O chatbot resolve os dois problemas hoje. Quantas vendas extras por mês isso representa pra você? Bora implementar!"</em></div>`
    }
], 4: [
    {
        title: 'Por que Contabilidade',
        trak: `Módulo 4 — consultoria contábil! 📊 Ei, não torça o nariz! Contabilidade parece chato, mas sabe o que não é chato? <strong>Economizar 30% em impostos</strong>. Todo empresário quer pagar menos tributo de forma legal — e você vai ser quem mostra esse caminho!`,
        html: `
        <h3 style="margin:0 0 18px;">Por que todo CNPJ precisa de assessoria contábil?</h3>
        <div class="diagram-flow">
            <div class="diagram-node"><div class="dnode-icon">🏢</div>Empresa</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📊</div>Receita Federal</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">💸</div>Impostos</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🧮</div>Planejamento</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">💰</div>Economia real</div>
        </div>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">💸</div><strong>Impostos otimizados</strong><p>Regime errado pode fazer a empresa pagar 2x mais imposto do que deveria — sem saber</p></div>
            <div class="feature-card"><div class="feat-icon">🔒</div><strong>Segurança jurídica</strong><p>Escrituração correta protege contra fiscalização da Receita e autuações retroativas</p></div>
            <div class="feature-card"><div class="feat-icon">📈</div><strong>Decisões melhores</strong><p>DRE e balanço corretos revelam a saúde real do negócio — sem achismos no faturamento</p></div>
        </div>
        <div class="script-box">💬 <strong>Como explicar pro cliente:</strong> <em>"Muitos donos de negócio acham que estão pagando o mínimo de imposto — mas sem planejamento tributário, podem estar pagando 20% a mais do que precisariam. Eu mostro exatamente quanto você pode economizar."</em></div>`
    },
    {
        title: 'Serviços Inclusos',
        trak: `Vamos conhecer tudo o que nossa consultoria contábil oferece! 📋 Cada serviço é um argumento de venda diferente. <strong>Conhecer o portfólio te permite personalizar a proposta pro perfil de cada cliente!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">O que está incluído?</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">📓</div><strong>Escrituração contábil</strong><p>Registro de todas as movimentações financeiras — base para qualquer declaração fiscal</p></div>
            <div class="feature-card"><div class="feat-icon">🧾</div><strong>Obrigações fiscais</strong><p>SPED, DCTF, ECF, EFD — todas as declarações enviadas no prazo, sem multa por atraso</p></div>
            <div class="feature-card"><div class="feat-icon">👥</div><strong>Folha de pagamento</strong><p>Holerites, 13º, férias, FGTS e eSocial — processamento mensal sem erro para todos os funcionários</p></div>
            <div class="feature-card"><div class="feat-icon">🏢</div><strong>Abertura/alteração de empresa</strong><p>Constituição de MEI, ME, LTDA, SLU — análise do melhor regime antes de abrir</p></div>
            <div class="feature-card"><div class="feat-icon">🗂️</div><strong>Imposto de Renda PJ</strong><p>Declaração anual de pessoa jurídica com otimização legal de deduções e alíquotas</p></div>
            <div class="feature-card"><div class="feat-icon">🎯</div><strong>Planejamento tributário</strong><p>Análise do melhor regime (Simples, Lucro Presumido, Lucro Real) para maximizar economia</p></div>
        </div>
        <div class="script-box">📌 <strong>Dica do TRAK:</strong> <em>Pergunte "em qual regime tributário sua empresa está?" — se o cliente não souber responder, você acabou de mostrar que ele precisa de assessoria urgente!</em></div>`
    },
    {
        title: 'Benefícios Financeiros',
        trak: `Aqui está o coração do argumento! 💰 Contabilidade estratégica é a única compra que <strong>se paga e ainda dá lucro</strong>. Mostre os números e o cliente fecha sozinho!`,
        html: `
        <h3 style="margin:0 0 18px;">O impacto financeiro real</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🔻</div><strong>Redução de impostos</strong><p>Planejamento tributário correto economiza em média 15% a 30% da carga de imposto anual</p></div>
            <div class="feature-card"><div class="feat-icon">🚫</div><strong>Zero multas por atraso</strong><p>Declarações enviadas no prazo — multa mínima por atraso no SPED é R$500 por mês</p></div>
            <div class="feature-card"><div class="feat-icon">🏦</div><strong>Acesso a crédito</strong><p>Balanço organizado abre portas para financiamento, BNDES e linhas de crédito empresarial</p></div>
            <div class="feature-card"><div class="feat-icon">🎯</div><strong>Foco no core business</strong><p>Dono de empresa ganha tempo e energia pra vender mais — não pra entender nota fiscal</p></div>
        </div>
        <h4 style="margin:18px 0 10px;">Frases prontas pra usar:</h4>
        <div class="script-box">🔻 <em>"Se você fatura R$10.000/mês e está no regime errado, pode estar pagando R$1.500 a mais de imposto todo mês. Nosso serviço se paga só com essa economia."</em></div>
        <div class="script-box">🚫 <em>"A Receita Federal tem 5 anos para cruzar dados e cobrar impostos atrasados. Com escrituração correta, você dorme tranquilo."</em></div>
        <div class="script-box">🏦 <em>"Quando você precisar de capital para crescer, o banco exige balanço dos últimos 3 anos. Quem tem contabilidade em dia, consegue crédito. Quem não tem, fica de fora."</em></div>`
    },
    {
        title: 'Casos Reais',
        trak: `Números reais, histórias reais! 📖 Cada caso abaixo representa centenas de empresas que estavam na mesma situação. <strong>Usa o que mais encaixar com o perfil do seu cliente!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">3 histórias que fecham contratos</h3>
        <div class="story-cards">
            <div class="story-card">
                <div class="story-icon">🛒</div>
                <h4>O lojista que pagava impostos dobrados</h4>
                <p>Um dono de loja de roupas estava no Lucro Presumido há 3 anos. Após análise, descobrimos que o Simples Nacional seria 28% mais barato para o seu perfil de faturamento. A troca de regime gerou uma economia de R$14.400 por ano — com a mesma operação.</p>
                <div class="story-tip">📌 Use com qualquer empresário que nunca fez análise de regime tributário — a maioria nunca fez.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🍽️</div>
                <h4>O restaurante multado pela Receita</h4>
                <p>Um restaurante deixou de enviar o SPED Fiscal por 4 meses "sem querer" — o contador anterior simplesmente parou de trabalhar. A multa da Receita foi de R$2.000 mais juros. Com a consultoria, nunca mais aconteceu — e ainda descobrimos R$3.200 de crédito tributário não aproveitado.</p>
                <div class="story-tip">📌 Use com empresas que já tiveram problema com contador anterior ou que fazem a contabilidade "por conta".</div>
            </div>
            <div class="story-card">
                <div class="story-icon">💻</div>
                <h4>O freelancer que abriu empresa corretamente</h4>
                <p>Um designer freelancer faturava R$8.000/mês como PF e pagava 27,5% de IR. Com abertura correta como MEI e depois ME, passou a pagar 6% de imposto. A diferença? R$1.700 a mais no bolso todo mês, na mesma atividade.</p>
                <div class="story-tip">📌 Use com autônomos, freelancers e prestadores de serviço que ainda operam como PF.</div>
            </div>
        </div>`
    },
    {
        title: 'Como Vender Contabilidade',
        trak: `Vamos fechar contratos contábeis! 💼 O segredo é <strong>mostrar o custo de não ter assessoria</strong>. Todo empresário acha que tá bem — até você mostrar quanto ele está pagando a mais ou arriscando!`,
        html: `
        <h3 style="margin:0 0 8px;">As 3 perguntas que abrem o contrato</h3>
        <p class="text-muted" style="margin:0 0 14px;">Use pra diagnosticar e criar o momento "uau" de revelação.</p>
        <div class="script-box"><strong>1. "Em qual regime tributário sua empresa está — Simples, Presumido ou Real?"</strong><br>Se não souber, você já mostrou que precisa de assessoria. Se souber, pergunte quando foi a última análise.</div>
        <div class="script-box"><strong>2. "Você tem contador hoje? Quando foi a última vez que ele te apresentou um planejamento tributário?"</strong><br>A maioria nunca recebeu planejamento — só declarações entregues. Isso é diferencial.</div>
        <div class="script-box"><strong>3. "Você sabe exatamente quanto está pagando de imposto por mês e se poderia pagar menos?"</strong><br>Essa pergunta incomoda — e incomodar é o primeiro passo pra vender.</div>
        <h3 style="margin:20px 0 12px;">Contornando objeções</h3>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Já tenho contador, não preciso trocar."</div>
            <div class="obj-a">✅ "Que bom! Mas nosso serviço é de consultoria estratégica, não só entrega de declarações. Quando seu contador te apresentou pela última vez uma análise de redução de impostos?"</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Sou MEI, não preciso de contador."</div>
            <div class="obj-a">✅ "MEI tem obrigações anuais e limitações de faturamento. Muitos MEIs ultrapassam o limite sem perceber e ficam irregulares. Uma consultoria garante que você está dentro da lei e, quando crescer, já tem o suporte para migrar."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "É caro manter consultoria mensal."</div>
            <div class="obj-a">✅ "Entendo. Mas considere: uma multa por declaração atrasada começa em R$500. Uma autuação retroativa pode ser dezenas de milhares. Nosso serviço é o seguro mais barato que você vai contratar."</div>
        </div>
        <div class="script-box" style="margin-top:18px;">🏆 <strong>Script de fechamento:</strong><br><em>"Deixa eu fazer uma análise rápida do seu regime tributário atual. Se encontrar economia maior que o custo da consultoria — e eu quase sempre encontro — faz sentido avançar. Posso te apresentar o resultado essa semana?"</em></div>`
    }
], 5: [
    {
        title: 'Marketing Digital',
        trak: `Módulo 5 — o mais visual e empolgante de todos! 🚀 Marketing digital é sobre <strong>fazer clientes encontrarem o seu cliente</strong> antes de encontrar o concorrente. Toda empresa precisa de presença digital hoje — e a maioria ainda está invisível online!`,
        html: `
        <h3 style="margin:0 0 18px;">Por que presença digital é obrigatória hoje?</h3>
        <div class="diagram-flow">
            <div class="diagram-node"><div class="dnode-icon">🔍</div>Cliente pesquisa</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📱</div>Google/Redes</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">🏆</div>Quem aparece</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">📞</div>Recebe contato</div>
            <div class="diagram-arrow">→</div>
            <div class="diagram-node"><div class="dnode-icon">💰</div>Fecha venda</div>
        </div>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🔍</div><strong>90% pesquisam online</strong><p>9 em cada 10 consumidores pesquisam no Google antes de comprar — mesmo para negócios locais</p></div>
            <div class="feature-card"><div class="feat-icon">📱</div><strong>Brasil no social</strong><p>Brasil é o 3º país com mais usuários no Instagram e WhatsApp — onde seu cliente passa horas por dia</p></div>
            <div class="feature-card"><div class="feat-icon">🏆</div><strong>Quem aparece, vende</strong><p>Se o concorrente está no Google e você não, todos os leads online vão para ele — simples assim</p></div>
        </div>
        <div class="script-box">💬 <strong>Como explicar pro cliente:</strong> <em>"Pega o celular agora e pesquisa no Google o serviço que você vende. Se você não aparecer na primeira página, seus clientes estão contratando o concorrente. Eu mudo isso."</em></div>`
    },
    {
        title: 'O que Entregamos',
        trak: `Conheça todo o arsenal digital que você vai vender! 🎯 Cada serviço resolve um problema diferente. <strong>Aprende o portfólio pra poder montar o pacote ideal pro perfil de cada cliente!</strong>`,
        html: `
        <h3 style="margin:0 0 18px;">Nosso portfólio digital</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">🌐</div><strong>Sites e Landing Pages</strong><p>Sites profissionais e páginas de conversão otimizadas — rápidos, responsivos e focados em gerar contato</p></div>
            <div class="feature-card"><div class="feat-icon">📸</div><strong>Gestão de Instagram</strong><p>Feed profissional, stories, Reels e legendas — presença consistente que constrói autoridade</p></div>
            <div class="feature-card"><div class="feat-icon">🎯</div><strong>Google Ads</strong><p>Anúncios no Google para aparecer no topo quando o cliente já está pesquisando — alta intenção de compra</p></div>
            <div class="feature-card"><div class="feat-icon">📣</div><strong>Meta Ads</strong><p>Campanhas no Facebook e Instagram com segmentação precisa por localização, interesse e comportamento</p></div>
            <div class="feature-card"><div class="feat-icon">✉️</div><strong>E-mail Marketing</strong><p>Sequências automatizadas para nutrir leads e reativar clientes inativos com conteúdo relevante</p></div>
            <div class="feature-card"><div class="feat-icon">📊</div><strong>Relatórios e métricas</strong><p>Dashboard mensal com alcance, leads gerados, custo por lead e retorno sobre investimento</p></div>
        </div>
        <div class="script-box">📌 <strong>Dica do TRAK:</strong> <em>Pergunte "me mostra seu Instagram ou site" — isso abre o diagnóstico e mostra exatamente onde estão os problemas. Você vira consultor antes de virar vendedor!</em></div>`
    },
    {
        title: 'Por que o Cliente Precisa',
        trak: `Atenção — esse é o módulo de <strong>argumentação emocional</strong>! 💡 Cliente não contrata marketing porque "é bom ter" — contrata quando sente que está perdendo dinheiro por não ter. Mostre o custo da invisibilidade!`,
        html: `
        <h3 style="margin:0 0 18px;">O custo de estar invisível online</h3>
        <div class="feature-cards">
            <div class="feature-card"><div class="feat-icon">👻</div><strong>Invisibilidade</strong><p>Empresa sem presença digital não existe para 90% dos compradores modernos — ponto final</p></div>
            <div class="feature-card"><div class="feat-icon">🏃</div><strong>Concorrente na frente</strong><p>Enquanto você não está, o concorrente está capturando TODOS os leads que passariam por você</p></div>
            <div class="feature-card"><div class="feat-icon">📉</div><strong>Boca a boca limitado</strong><p>Indicação é ótima, mas tem teto. Marketing digital escala — atinge mil pessoas pelo custo de indicar 10</p></div>
            <div class="feature-card"><div class="feat-icon">📊</div><strong>Sem dados, sem crescimento</strong><p>Marketing digital dá dados reais: quantos viram, clicaram, converteram. Intuição não escala</p></div>
        </div>
        <h4 style="margin:18px 0 10px;">Frases prontas pra usar:</h4>
        <div class="script-box">👻 <em>"Cada dia que seu concorrente está no Google e você não, é um cliente a mais pra ele e a menos pra você. Isso se acumula todo mês."</em></div>
        <div class="script-box">🏃 <em>"Você depende de indicação? Ótimo! Mas sabe o que acontece com quem te indicaram e pesquisa seu nome no Google e não acha nada? Vai pro concorrente que encontrou."</em></div>
        <div class="script-box">📊 <em>"Com marketing digital você sabe exatamente quanto custou cada cliente. Com boca a boca, você nunca sabe o que funciona — só o que está em pé até agora."</em></div>`
    },
    {
        title: 'Casos Reais',
        trak: `Histórias reais de negócios que transformaram vendas com presença digital! 📖 <strong>Use a história que mais se parece com o negócio do seu cliente</strong> — quanto mais parecida, mais poderosa a conexão!`,
        html: `
        <h3 style="margin:0 0 18px;">3 histórias que fecham contratos</h3>
        <div class="story-cards">
            <div class="story-card">
                <div class="story-icon">🏋️</div>
                <h4>A academia que lotou em 60 dias</h4>
                <p>Uma academia de bairro estava com 40% da capacidade ocupada. Com landing page, Google Ads local e gestão de Instagram, atraiu 87 novos alunos em 60 dias. O dono investiu R$800/mês em anúncios e gerou R$13.000 em novas mensalidades. ROI de 16x.</p>
                <div class="story-tip">📌 Use com academias, estúdios, escolas — qualquer negócio que depende de matrículas recorrentes.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">🔧</div>
                <h4>A empresa de manutenção que apareceu no Google</h4>
                <p>Uma empresa de manutenção predial nunca havia investido em marketing. Após SEO local e perfil do Google Meu Negócio otimizado, passou a receber 15 contatos orgânicos por semana — sem gastar nada em anúncios. Em 4 meses, tinha lista de espera.</p>
                <div class="story-tip">📌 Use com prestadores de serviço locais — encanador, eletricista, pintor, manutenção. Google Meu Negócio sozinho já muda o jogo.</div>
            </div>
            <div class="story-card">
                <div class="story-icon">👗</div>
                <h4>A loja que expandiu sem abrir filial</h4>
                <p>Uma loja de roupas femininas vendia só presencialmente. Com e-commerce integrado ao Instagram, Meta Ads segmentado para raio de 30km e e-mail marketing para recompra, triplicou o faturamento sem abrir segunda loja — e com custo operacional menor.</p>
                <div class="story-tip">📌 Use com varejistas, lojas físicas que querem crescer sem o risco de abrir nova unidade.</div>
            </div>
        </div>`
    },
    {
        title: 'Como Vender Marketing',
        trak: `Hora de fechar contratos de marketing digital! 🎯 O segredo é <strong>fazer o diagnóstico ao vivo</strong> — mostra em tempo real o que o cliente está perdendo. Isso é mais poderoso que qualquer apresentação!`,
        html: `
        <h3 style="margin:0 0 8px;">As 3 perguntas que abrem o contrato</h3>
        <p class="text-muted" style="margin:0 0 14px;">Use no início pra criar o diagnóstico e revelar os problemas visualmente.</p>
        <div class="script-box"><strong>1. "Como os seus clientes te encontram hoje?"</strong><br>Se a resposta for só "indicação" ou "boca a boca", você acabou de mostrar o problema e a solução.</div>
        <div class="script-box"><strong>2. "Me mostra seu Instagram ou site. Vamos olhar juntos?"</strong><br>Fazer o diagnóstico ao vivo transforma você em consultor — e o cliente vê os problemas com os próprios olhos.</div>
        <div class="script-box"><strong>3. "Se você somasse todos os clientes que pesquisaram seu serviço este mês e não te encontraram, quanto seria em faturamento perdido?"</strong><br>Essa pergunta cria o senso de perda que motiva ação imediata.</div>
        <h3 style="margin:20px 0 12px;">Contornando objeções</h3>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Já tentei fazer Instagram, não funcionou."</div>
            <div class="obj-a">✅ "Entendo — 90% das tentativas sem estratégia não funcionam. A diferença não é o canal, é o método. A gente usa dados, teste A/B e segmentação que a maioria não faz quando tenta sozinho."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Não tenho dinheiro pra anúncio."</div>
            <div class="obj-a">✅ "Ótimo — então começamos com SEO e Google Meu Negócio, que são gratuitos. Eu otimizo sua presença orgânica e quando você ver o retorno, você mesmo vai querer investir em anúncio."</div>
        </div>
        <div class="objection-block">
            <div class="obj-label">Objeção</div>
            <div class="obj-q">❌ "Meu negócio é local, marketing digital não funciona aqui."</div>
            <div class="obj-a">✅ "É exatamente o contrário! Para negócios locais, o Google Meu Negócio e os anúncios por raio de distância têm o menor custo por cliente de todo marketing. Você não compete com o Brasil — só com seu bairro."</div>
        </div>
        <div class="script-box" style="margin-top:18px;">🏆 <strong>Script de fechamento:</strong><br><em>"Eu analisei seu Instagram e seu Google Meu Negócio agora. Encontrei [X problemas específicos]. Com a nossa gestão, você passa a capturar os leads que hoje estão indo pro concorrente. Quanto vale um cliente novo pra você? Bora começar essa semana?"</em></div>`
    }
]};

/* ═══════════════════════════════════════════════════════════════════
   SAMPLE DATA
═══════════════════════════════════════════════════════════════════ */

const sampleState = {
    users: [
        { id: 'gestor', name: 'Gestor Tracktiv', email: 'gestor@tracktiv.com', password: 'Gestor123', role: 'gestor' },
        { id: 'consultor_1', name: 'Laura Mendes', email: 'consultor@tracktiv.com', password: 'Consultor123', role: 'consultor',
          cpf: '123.456.789-00', address: 'Rua das Orquídeas, 450 - São Paulo/SP', whatsapp: '(11) 91111-2222', pixKey: 'laura@tracktiv.com' },
        { id: 'consultor_2', name: 'Bruno Silva', email: 'bruno@tracktiv.com', password: 'Bruno123', role: 'consultor',
          cpf: '987.654.321-00', address: 'Av. Paulista, 1200 - São Paulo/SP', whatsapp: '(21) 93333-4444', pixKey: 'bruno@tracktiv.com' },
        { id: 'instalador_1', name: 'Carlos Pereira', email: 'instalador@tracktiv.com', password: 'Instalador123', role: 'instalador',
          cpf: '111.222.333-44', address: 'Av. Industrial, 500 - Guarulhos/SP', whatsapp: '(11) 98888-7777', pixKey: 'carlos@tracktiv.com', storeName: 'Moto Peças Carlos' },
        { id: 'cliente_demo', name: 'Auto Prime', email: 'cliente@tracktiv.com', password: 'Cliente123', role: 'cliente',
          clientId: 'c1', referralCode: 'AUTOPRIME23', points: 150, contractedServices: ['rastreamento'] },
        { id: 'tecnico_1', name: 'Rafael Santos', email: 'tecnico@tracktiv.com', password: 'Tecnico123', role: 'tecnico',
          cpf: '555.666.777-88', phone: '(11) 94455-6677', whatsapp: '(11) 94455-6677', specialty: 'Rastreamento Veicular' }
    ],
    clients: [
        // Laura
        { id: 'c1', consultantId: 'consultor_1', instaladorId: null, name: 'Auto Prime', phone: '(11) 98877-6655', isWhatsapp: true, email: 'contato@autoprime.com.br', cpf: '11.222.333/0001-44', rg: '', address: 'Rua das Flores, 100 - SP', product: 'Rastreador Veicular', plan: 'Profissional', monthlyFee: 54.90, plates: 'ABC-1234, DEF-5678', paymentDate: 10, need: 'Segurança da frota de entregas', origins: ['Indicação de amigo'], coupon: '', notes: 'Frota com 6 veículos. Interesse em bloqueio remoto.', stage: 'Fechado', closedDate: todayISO(), createdAt: thirtyDaysAgoISO(9) },
        { id: 'c2', consultantId: 'consultor_1', instaladorId: null, name: 'Loja Torres', phone: '(21) 99222-3344', isWhatsapp: true, email: '', cpf: '', rg: '', address: 'Rua das Torres, 88 - RJ', product: 'Rastreador Veicular', plan: 'Controle Total', monthlyFee: 64.90, plates: 'GHI-9012', paymentDate: 15, need: 'Controle de entregas e motoristas', origins: ['Google'], coupon: 'BEMVINDO10', notes: 'Foco em transporte de carga.', stage: 'Fechado', closedDate: todayISO(), createdAt: thirtyDaysAgoISO(15) },
        { id: 'c3', consultantId: 'consultor_1', instaladorId: null, name: 'Transline', phone: '(31) 99911-2233', isWhatsapp: false, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Profissional', monthlyFee: 54.90, plates: '', paymentDate: 20, need: 'Demonstração agendada', origins: ['Instagram'], coupon: '', notes: 'Demonstração agendada para a próxima semana.', stage: 'Proposta', createdAt: thirtyDaysAgoISO(22) },
        { id: 'c4', consultantId: 'consultor_1', instaladorId: null, name: 'Frota Sul', phone: '(41) 98833-4455', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Controle Total', monthlyFee: 64.90, plates: '', paymentDate: 5, need: 'Apresentação presencial', origins: ['Facebook'], coupon: '', notes: 'Cliente quer apresentação presencial.', stage: 'Apresentação', createdAt: thirtyDaysAgoISO(27) },
        { id: 'c5', consultantId: 'consultor_1', instaladorId: null, name: 'LogiPlace', phone: '(51) 99888-7766', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Serviços de Segurança do Trabalho', plan: 'Essencial', monthlyFee: 44.90, plates: '', paymentDate: 1, need: 'Pacote mensal completo', origins: ['Outro'], coupon: '', notes: 'Interessado em pacote mensal.', stage: 'Contato Feito', createdAt: thirtyDaysAgoISO(30) },
        { id: 'c6', consultantId: 'consultor_1', instaladorId: null, name: 'Grupo Norte', phone: '(61) 99777-4455', isWhatsapp: false, email: '', cpf: '', rg: '', address: '', product: 'Chatbot', plan: 'Essencial', monthlyFee: 44.90, plates: '', paymentDate: 10, need: 'Orçamento especializado', origins: ['Google'], coupon: '', notes: 'Precisa de orçamento.', stage: 'Novo Lead', createdAt: thirtyDaysAgoISO(4) },
        // Bruno
        { id: 'c7', consultantId: 'consultor_2', instaladorId: null, name: 'Rápido Entregas', phone: '(71) 98765-4321', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Sites e Campanhas de Marketing', plan: 'Profissional', monthlyFee: 54.90, plates: '', paymentDate: 10, need: 'Presença digital', origins: ['Instagram'], coupon: '', notes: 'Busca captação de leads.', stage: 'Proposta', createdAt: thirtyDaysAgoISO(5) },
        { id: 'c8', consultantId: 'consultor_2', instaladorId: null, name: 'Contabilidade Fácil', phone: '(81) 99123-4567', isWhatsapp: false, email: '', cpf: '', rg: '', address: '', product: 'Consultoria de Contabilidade', plan: 'Profissional', monthlyFee: 54.90, plates: '', paymentDate: 20, need: 'Sistema de notas fiscais', origins: ['Google'], coupon: '', notes: 'Precisa de NF-e.', stage: 'Contato Feito', createdAt: thirtyDaysAgoISO(10) },
        { id: 'c9', consultantId: 'consultor_2', instaladorId: null, name: 'SmartFleet', phone: '(11) 97766-5544', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Controle Total', monthlyFee: 64.90, plates: 'JKL-3456', paymentDate: 25, need: 'Gestão de frota completa', origins: ['Indicação de amigo'], coupon: '', notes: 'Fechado recentemente.', stage: 'Fechado', closedDate: todayISO(), createdAt: thirtyDaysAgoISO(12) },
        // Instalador Carlos
        { id: 'ci1', consultantId: null, instaladorId: 'instalador_1', name: 'Moto Express', phone: '(11) 97654-3210', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Essencial', monthlyFee: 44.90, plates: 'GHI-9012', paymentDate: 5, need: 'Segurança da moto', origins: ['Parceiro/Loja'], coupon: '', notes: 'Cliente indicado pela loja.', stage: 'Fechado', closedDate: todayISO(), createdAt: thirtyDaysAgoISO(3) },
        { id: 'ci2', consultantId: null, instaladorId: 'instalador_1', name: 'Auto Delivery', phone: '(11) 96543-2109', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Essencial', monthlyFee: 44.90, plates: 'XYZ-7890', paymentDate: 10, need: 'Rastrear veículo de entrega', origins: ['Parceiro/Loja'], coupon: '', notes: '', stage: 'Fechado', closedDate: todayISO(), createdAt: thirtyDaysAgoISO(5) },
        { id: 'ci3', consultantId: null, instaladorId: 'instalador_1', name: 'Frota Unitária', phone: '(11) 95432-1098', isWhatsapp: false, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Profissional', monthlyFee: 54.90, plates: '', paymentDate: 15, need: 'Upgrade de plano', origins: ['Parceiro/Loja'], coupon: '', notes: '', stage: 'Proposta', createdAt: thirtyDaysAgoISO(8) },
        { id: 'ci4', consultantId: null, instaladorId: 'instalador_1', name: 'Transportes WL', phone: '(11) 94321-0987', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Essencial', monthlyFee: 44.90, plates: '', paymentDate: 1, need: 'Primeiro rastreador', origins: ['Parceiro/Loja'], coupon: '', notes: '', stage: 'Novo Lead', createdAt: thirtyDaysAgoISO(2) },
        { id: 'ci5', consultantId: null, instaladorId: 'instalador_1', name: 'Distribuidora JL', phone: '(11) 93210-9876', isWhatsapp: true, email: '', cpf: '', rg: '', address: '', product: 'Rastreador Veicular', plan: 'Essencial', monthlyFee: 44.90, plates: '', paymentDate: 20, need: 'Controle de frota leve', origins: ['Parceiro/Loja'], coupon: '', notes: '', stage: 'Contato Feito', createdAt: thirtyDaysAgoISO(6) }
    ],
    installations: [
        { id: 'install_1', instaladorId: 'instalador_1', clientName: 'Moto Express',    plate: 'GHI-9012', date: todayISO(),               notes: '' },
        { id: 'install_2', instaladorId: 'instalador_1', clientName: 'Auto Delivery',   plate: 'XYZ-7890', date: todayISO(),               notes: '' },
        { id: 'install_3', instaladorId: 'instalador_1', clientName: 'Transportes WL',  plate: 'DEF-5678', date: thirtyDaysAgoISO(5),      notes: 'Instalação na sede do cliente' }
    ],
    coupons: [
        { id: 'coupon_1', code: 'BEMVINDO10', discountType: 'percentage', discountValue: 10, description: '10% de desconto na adesão para novos clientes', active: true },
        { id: 'coupon_2', code: 'FIDELIDADE20', discountType: 'fixed',   discountValue: 20, description: 'R$ 20,00 de desconto na renovação anual',        active: false }
    ],
    clientDocuments: [
        { id: 'cdoc_demo', clientId: 'c1', category: 'rastreamento', name: 'Contrato de Serviço — Auto Prime', fileName: 'contrato_auto_prime.pdf', data: null, type: 'application/pdf', size: 0, uploadedAt: '2026-05-01', uploadedBy: 'Gestor Tracktiv', notes: 'Contrato vigente — plano Profissional' }
    ],
    clientReferrals: [],
    clientRedemptions: [],
    pointsConfig: { pointsPerRef: 100, brlPerPoint: 0.10 },
    segmentForms: {},
    notifications: [],
    goals: { default: 10, byConsultant: {} },
    followUps: [],
    chats: {},
    metaAlertsSent: {},
    chamados: [
        { id: 'ch1', clientId: 'c1', tecnicoId: 'tecnico_1', title: 'Rastreador sem sinal',
          description: 'Rastreador do veículo ABC-1234 não envia posição há 2 dias. Necessário verificar conectividade do dispositivo.',
          priority: 'Urgente', status: 'Em andamento', createdAt: thirtyDaysAgoISO(3), updatedAt: thirtyDaysAgoISO(1),
          messages: [
              { id: 'cm1', from: 'tecnico_1', text: 'Chamado aberto. Verificando conectividade do dispositivo.', at: thirtyDaysAgoISO(3) },
              { id: 'cm2', from: 'tecnico_1', text: 'Problema identificado: antena com sinal fraco. Agendando visita técnica.', at: thirtyDaysAgoISO(1) }
          ]
        },
        { id: 'ch2', clientId: 'c2', tecnicoId: 'tecnico_1', title: 'Configuração de bloqueio remoto',
          description: 'Cliente solicita configuração e teste do bloqueio remoto no veículo GHI-9012.',
          priority: 'Normal', status: 'Aberto', createdAt: thirtyDaysAgoISO(1), updatedAt: thirtyDaysAgoISO(1),
          messages: [
              { id: 'cm3', from: 'tecnico_1', text: 'Chamado registrado. Entraremos em contato em breve para agendar.', at: thirtyDaysAgoISO(1) }
          ]
        }
    ],
    tecnicoClients: { 'tecnico_1': ['c1', 'c2', 'c3'] },
    docSlots: {
        'cliente_demo': [
            { id: 'dslot_1', name: 'Contrato de Serviço', serviceKey: 'rastreamento', docId: 'cdoc_demo', uploadedAt: '2026-05-01', uploadedBy: 'Gestor Tracktiv' },
            { id: 'dslot_2', name: 'Termo de Instalação', serviceKey: 'rastreamento', docId: null },
            { id: 'dslot_3', name: 'Autorização de Rastreamento', serviceKey: 'rastreamento', docId: null }
        ]
    },
    docChecklists: {
        'cliente_demo': [
            { id: 'chk_d1', label: 'RG e CPF',                  done: true,  deadline: null,         addedAt: '2026-05-01', completedAt: '2026-05-10' },
            { id: 'chk_d2', label: 'Comprovante de endereço',    done: false, deadline: '2026-06-30', addedAt: '2026-05-01' },
            { id: 'chk_d3', label: 'Contrato assinado',          done: true,  deadline: null,         addedAt: '2026-05-01', completedAt: '2026-05-15' },
            { id: 'chk_d4', label: 'Autorização de instalação',  done: false, deadline: '2026-06-15', addedAt: '2026-05-01' }
        ]
    }
};

/* ═══════════════════════════════════════════════════════════════════
   APP STATE
═══════════════════════════════════════════════════════════════════ */

const app = {
    state: null,
    currentUser: null,
    activeView: '',
    quizState: null,
    editingConsultantId: null,
    editingClientId: null,
    editingInstaladorId: null,
    editingInstallId: null,
    editingCouponId: null,
    docFilterPending: false,
    navState: { path: [], expandedGroup: null, activeItemId: null },
    clienteNavState: { depth: 0, group: null, subGroup: null, subItem: null }
};

/* ═══════════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════════ */

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

function thirtyDaysAgoISO(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
}

function getCurrentMonthKey() {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`;
}

function getCurrentMonthLabel() {
    const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const n = new Date();
    return `${months[n.getMonth()]}/${n.getFullYear()}`;
}

function formatDate(iso) {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

function formatCurrency(v) {
    return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function esc(v) {
    return String(v ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function stagePillClass(stage) {
    const map = { 'Novo Lead':'pill-new', 'Contato Feito':'pill-contact', 'Apresentação':'pill-presentation', 'Proposta':'pill-proposal', 'Fechado':'pill-closed', 'Perdido':'pill-lost' };
    return map[stage] || 'pill-new';
}

/* ─── SCORE DE PROPENSÃO ─── */

function calcScore(client) {
    const answers = client.scoreAnswers || {};
    let total = 0;
    for (const [stage, weight] of Object.entries(SCORE_WEIGHTS)) {
        const ans = answers[stage] || [];
        total += ans.filter(Boolean).length * weight;
    }
    return Math.min(100, total);
}

function getScoreTemp(score) {
    if (score >= 70) return { emoji: '🔥', label: 'Quente', cls: 'score-hot',  msg: 'Esse lead tá pegando fogo! 🔥 Que tal marcar uma visita presencial ou enviar a proposta agora? O timing é perfeito!' };
    if (score >= 40) return { emoji: '🌡️', label: 'Morno',  cls: 'score-warm', msg: 'Tá quase lá! 🌡️ Que tal compartilhar um caso real de sucesso com esse cliente? Pode ser o empurrãozinho que falta!' };
    return              { emoji: '❄️', label: 'Frio',   cls: 'score-cold', msg: 'Esse lead precisa de aquecimento! ❄️ Que tal nutrir com conteúdo antes de forçar uma venda? Paciência é uma técnica!' };
}

function saveScoreHistory(client) {
    const score = calcScore(client);
    if (!client.scoreHistory) client.scoreHistory = [];
    const today = new Date().toLocaleDateString('pt-BR');
    const last  = client.scoreHistory[client.scoreHistory.length - 1];
    if (!last || last.date !== today || last.score !== score) {
        client.scoreHistory.push({ date: today, score });
        if (client.scoreHistory.length > 20) client.scoreHistory.shift();
    }
}

function openScoreModal(clientId) {
    const c = (app.state.clients || []).find(x => x.id === clientId);
    if (!c) return;
    const score = calcScore(c);
    const temp  = getScoreTemp(score);

    const stagesHtml = Object.entries(SCORE_QUESTIONS).map(([stage, questions]) => {
        const answers = (c.scoreAnswers || {})[stage] || new Array(questions.length).fill(false);
        const pts     = SCORE_WEIGHTS[stage];
        return `
            <div class="score-stage-block">
                <div class="score-stage-header">
                    <span class="score-stage-name">${esc(stage)}</span>
                    <span class="score-pts-badge">+${pts} pts por sim</span>
                </div>
                ${questions.map((q, i) => `
                    <label class="score-check-row">
                        <input type="checkbox" data-stage="${esc(stage)}" data-qi="${i}" ${answers[i] ? 'checked' : ''} class="score-check">
                        <span class="score-q-text">${esc(q)}</span>
                        <span class="score-q-pts">+${pts}</span>
                    </label>
                `).join('')}
            </div>`;
    }).join('');

    const history = (c.scoreHistory || []).slice(-12);
    const historyHtml = history.length ? `
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
            <strong style="font-size:0.9rem;">Histórico do score</strong>
            <div class="score-history-list">
                ${history.map(h => `<span class="score-history-chip">${h.date} · <strong>${h.score}pts</strong></span>`).join('')}
            </div>
        </div>` : '';

    showModal(`📊 Score — ${esc(c.name)}`, `
        <div style="text-align:center;padding:12px 0 20px;">
            <div class="score-circle ${temp.cls}" id="scoreCircle" style="width:80px;height:80px;font-size:1.9rem;margin:0 auto;">${score}</div>
            <div style="font-size:0.76rem;color:var(--text-soft);margin-top:6px;">pontos de propensão</div>
            <div style="font-size:1.15rem;font-weight:700;margin-top:4px;" id="scoreTempLabel">${temp.emoji} ${temp.label}</div>
        </div>
        <div class="trak-bubble" style="margin-bottom:24px;">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text" id="trakScoreMsg">${temp.msg}</div>
        </div>
        <div id="scoreChecklist">${stagesHtml}</div>
        ${historyHtml}
    `);

    document.querySelectorAll('.score-check').forEach(cb => {
        cb.addEventListener('change', () => {
            const stage = cb.dataset.stage;
            const qi    = parseInt(cb.dataset.qi);
            if (!c.scoreAnswers) c.scoreAnswers = {};
            if (!c.scoreAnswers[stage]) c.scoreAnswers[stage] = new Array(SCORE_QUESTIONS[stage].length).fill(false);
            c.scoreAnswers[stage][qi] = cb.checked;
            saveScoreHistory(c);
            saveState();

            const newScore = calcScore(c);
            const newTemp  = getScoreTemp(newScore);
            const circle   = document.getElementById('scoreCircle');
            const msg      = document.getElementById('trakScoreMsg');
            if (circle) { circle.textContent = newScore; circle.className = `score-circle ${newTemp.cls}`; }
            const tempLabel = document.getElementById('scoreTempLabel');
            if (tempLabel) tempLabel.textContent = `${newTemp.emoji} ${newTemp.label}`;
            if (msg) msg.textContent = newTemp.msg;
        });
    });
}

function isClosedThisMonth(client) {
    return client.stage === 'Fechado' && client.closedDate && client.closedDate.slice(0, 7) === getCurrentMonthKey();
}

function computeCommissionPercent(sales) {
    if (sales >= 10) return 25;
    if (sales >= 5)  return 18;
    if (sales >= 2)  return 10;
    return 0;
}

function getGracePeriodMonths(planName) {
    return planName === 'Controle Total' ? 3 : 4;
}

function isClientEligibleForRecurrence(client) {
    if (!client.closedDate || client.stage !== 'Fechado') return false;
    const grace  = getGracePeriodMonths(client.plan || '');
    const closed = new Date(client.closedDate + 'T00:00:00');
    const now    = new Date();
    const months = (now.getFullYear() - closed.getFullYear()) * 12 + (now.getMonth() - closed.getMonth());
    return months >= grace;
}

function getPerformanceBadge(salesCount) {
    if (salesCount >= 10) return { label: 'Ouro',        emoji: '🥇', cls: 'badge-gold'   };
    if (salesCount >= 5)  return { label: 'Prata',       emoji: '🥈', cls: 'badge-silver' };
    if (salesCount >= 2)  return { label: 'Bronze',      emoji: '🥉', cls: 'badge-bronze' };
    return                       { label: 'Em formação', emoji: '🌱', cls: 'badge-warn'   };
}

function buildRanking() {
    return (app.state.users || [])
        .filter(u => u.role === 'consultor')
        .map(u => ({ user: u, m: getConsultantMetrics(u) }))
        .sort((a, b) => b.m.commission - a.m.commission || b.m.salesCount - a.m.salesCount)
        .map((entry, i) => ({ ...entry, rank: i + 1, badge: getPerformanceBadge(entry.m.salesCount) }));
}

function getRecurrenceStatus(clientCount, salesCount) {
    if (clientCount >= 5 && salesCount >= 2) return { label: 'Ativa',          badge: 'badge-active', hint: 'Recorrência ativada.' };
    if (clientCount >= 5)                    return { label: 'Pausada',         badge: 'badge-paused', hint: `Falt${salesCount === 1 ? 'a 1 venda' : 'am ' + (2 - salesCount) + ' vendas'} este mês para ativar.` };
    return                                          { label: 'Faltam clientes', badge: 'badge-warn',   hint: `Falt${5 - clientCount === 1 ? 'a 1 cliente' : 'am ' + (5 - clientCount) + ' clientes'} na base.` };
}

/* ═══════════════════════════════════════════════════════════════════
   METRICS
═══════════════════════════════════════════════════════════════════ */

function getConsultantMetrics(user) {
    const allClients   = (app.state.clients || []).filter(c => c.consultantId === user.id);
    const clients      = allClients.filter(c => c.stage === 'Fechado');
    const clientCount  = clients.length;
    const salesCount   = clients.filter(isClosedThisMonth).length;
    const totalFee     = clients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const percent      = computeCommissionPercent(salesCount);
    const recurrence   = getRecurrenceStatus(clientCount, salesCount);

    const salesCommission = salesCount * SALE_COMMISSION;

    const eligibleClients = recurrence.label === 'Ativa'
        ? clients.filter(isClientEligibleForRecurrence)
        : [];
    const eligibleCount   = eligibleClients.length;
    const eligibleFee     = eligibleClients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const recurrenceComm  = eligibleFee * (percent / 100);

    const commission  = salesCommission + recurrenceComm;
    const stageCounts = stageOrder.reduce((acc, st) => { acc[st] = allClients.filter(c => c.stage === st).length; return acc; }, {});
    return { clients, allClients, clientCount, salesCount, totalFee, eligibleFee, eligibleCount,
             percent, salesCommission, recurrenceComm, commission, recurrence, stageCounts };
}

function getInstaladorMetrics(user) {
    const allInstalls     = (app.state.installations || []).filter(i => i.instaladorId === user.id);
    const monthlyInstalls = allInstalls.filter(i => i.date && i.date.slice(0,7) === getCurrentMonthKey());
    const installCommission = monthlyInstalls.length * INSTALL_FEE;

    const storeClients    = (app.state.clients || []).filter(c => c.instaladorId === user.id && c.stage === 'Fechado');
    const clientCount     = storeClients.length;
    const salesCount      = storeClients.filter(isClosedThisMonth).length;
    const totalFee        = storeClients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const percent         = computeCommissionPercent(salesCount);
    const recurrence      = getRecurrenceStatus(clientCount, salesCount);

    const eligibleClients = recurrence.label === 'Ativa' ? storeClients.filter(isClientEligibleForRecurrence) : [];
    const eligibleFee     = eligibleClients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const recurrenceComm  = eligibleFee * (percent / 100);
    const totalToReceive  = installCommission + recurrenceComm;

    return { allInstalls, monthlyInstalls, installCommission, storeClients, clientCount, salesCount, totalFee, eligibleFee, percent, recurrenceComm, recurrence, totalToReceive };
}

/* ═══════════════════════════════════════════════════════════════════
   STATE MANAGEMENT
═══════════════════════════════════════════════════════════════════ */

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            app.state = { installations: [], coupons: [], pendingApprovals: [], productCommissions: {}, pendingUsers: [], pendingInstallations: [], photoInstallations: [], trainingProgress: {}, clientDocuments: [], clientReferrals: [], clientRedemptions: [], pointsConfig: { pointsPerRef: 100, brlPerPoint: 0.10 }, segmentForms: {}, notifications: [], goals: { default: 10, byConsultant: {} }, followUps: [], chats: {}, metaAlertsSent: {}, chamados: [], tecnicoClients: {}, docChecklists: {}, docSlots: {}, ...parsed };
            // Migração: garante que o usuário demo cliente existe quando não há nenhum cliente cadastrado
            const users = app.state.users || [];
            if (!users.some(u => u.role === 'cliente')) {
                const demoCliente = sampleState.users.find(u => u.role === 'cliente');
                if (demoCliente && !users.some(u => u.email === demoCliente.email)) {
                    app.state.users = [...users, JSON.parse(JSON.stringify(demoCliente))];
                }
            }
            // Migração: garante documentos demo quando não há nenhum
            if (!app.state.clientDocuments || app.state.clientDocuments.length === 0) {
                app.state.clientDocuments = JSON.parse(JSON.stringify(sampleState.clientDocuments || []));
            }
            // Migração: garante contractedServices em todos os clientes existentes
            (app.state.users || []).forEach(u => {
                if (u.role === 'cliente' && !u.contractedServices) u.contractedServices = [];
            });
        } catch (e) {
            app.state = JSON.parse(JSON.stringify(sampleState));
        }
    } else {
        app.state = JSON.parse(JSON.stringify(sampleState));
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app.state));
}

/* ═══════════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════
   HIERARCHICAL NAVIGATION
═══════════════════════════════════════════════════════════════════ */

function showSection(sectionId) {
    document.querySelectorAll('#appScreen .section').forEach(s => {
        s.classList.toggle('active', s.id === sectionId);
    });
    app.activeView = sectionId;
    // Close mobile sidebar
    const mg = document.querySelector('#appScreen .main-grid');
    if (mg) mg.classList.remove('sidebar-open');
}

function renderNavigation() {
    const tabs = document.getElementById('navigationTabs');
    tabs.innerHTML = '';
    const role = app.currentUser.role;
    const tree = NAV_TREE[role] || [];
    const expandedId = app.navState.expandedGroup;

    if (expandedId) {
        // Find the group
        const group = tree.find(item => item.id === expandedId);
        if (group && group.children) {
            // Back button
            const backBtn = document.createElement('button');
            backBtn.className = 'tab nav-back';
            backBtn.type = 'button';
            backBtn.innerHTML = `<span style="font-size:1rem;flex-shrink:0;">‹</span><span>${esc(group.label)}</span>`;
            backBtn.addEventListener('click', () => {
                app.navState.expandedGroup = null;
                renderNavigation();
            });
            tabs.appendChild(backBtn);

            // Label
            const lbl = document.createElement('div');
            lbl.className = 'nav-section-label';
            lbl.textContent = group.label;
            tabs.appendChild(lbl);

            group.children.forEach(child => {
                const btn = document.createElement('button');
                const isActive = app.navState.activeItemId === child.id;
                btn.className = 'tab tab-child' + (isActive ? ' active' : '');
                btn.type = 'button';
                btn.innerHTML = `<span style="font-size:1rem;flex-shrink:0;">${child.icon || ''}</span><span>${esc(child.label)}</span>`;
                btn.addEventListener('click', () => navItemClick(child, group));
                tabs.appendChild(btn);
            });
        }
    } else {
        // Top-level items
        const unread = (app.state.notifications||[]).filter(n=>!n.read && (n.targetUserId === app.currentUser.id || n.consultantId === app.currentUser.id)).length;
        tree.forEach(item => {
            const btn = document.createElement('button');
            const isActive = app.navState.activeItemId === item.id;
            btn.className = 'tab' + (isActive ? ' active' : '');
            btn.type = 'button';
            const icon = item.icon || NAV_ICONS[item.section || ''] || '';
            if (item.children) {
                btn.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0;">${icon}</span><span>${esc(item.label)}</span><span class="nav-chevron">›</span>`;
                btn.addEventListener('click', () => {
                    app.navState.expandedGroup = item.id;
                    app.navState.activeItemId = null;
                    renderNavigation();
                    renderBreadcrumb();
                });
            } else {
                btn.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0;">${icon}</span><span>${esc(item.label)}</span>`;
                if (unread > 0 && item.section === 'consultorDashboard') {
                    btn.innerHTML += `<span class="nav-badge">${unread}</span>`;
                }
                btn.addEventListener('click', () => navItemClick(item, null));
            }
            tabs.appendChild(btn);
        });
    }
}

function navItemClick(item, parent) {
    app.navState.activeItemId = item.id;

    // Build breadcrumb path
    const role = app.currentUser.role;
    const roleLabel = role === 'gestor' ? 'Gestor' : role === 'consultor' ? 'Consultor' : 'Instalador';
    const path = [{ label: roleLabel, groupId: null }];
    if (parent) {
        path.push({ label: parent.label, groupId: parent.id });
    }
    path.push({ label: item.label, groupId: null, active: true });
    app.navState.path = path;

    renderNavigation();
    renderBreadcrumb();

    if (item.action) {
        item.action();
    } else if (item.render) {
        showSection('dynamicContent');
        item.render();
    } else if (item.section) {
        showSection(item.section);
        renderActiveSection(item.section);
    }
}

function renderBreadcrumb() {
    const bar = document.getElementById('breadcrumbBar');
    if (!bar) return;
    const path = app.navState.path || [];
    if (path.length <= 1) {
        bar.innerHTML = '';
        return;
    }
    let html = '';
    path.forEach((seg, i) => {
        if (i > 0) html += `<span class="bc-sep">›</span>`;
        if (seg.active) {
            html += `<span class="bc-item active">${esc(seg.label)}</span>`;
        } else if (seg.groupId) {
            html += `<button class="bc-item" data-groupid="${esc(seg.groupId)}">${esc(seg.label)}</button>`;
        } else {
            html += `<span class="bc-item">${esc(seg.label)}</span>`;
        }
    });
    bar.innerHTML = html;
    bar.querySelectorAll('.bc-item[data-groupid]').forEach(btn => {
        btn.addEventListener('click', () => {
            const gid = btn.dataset.groupid;
            app.navState.expandedGroup = gid;
            app.navState.activeItemId = null;
            app.navState.path = app.navState.path.slice(0, app.navState.path.findIndex(p => p.groupId === gid) + 1);
            renderNavigation();
            renderBreadcrumb();
        });
    });
}

function selectView(viewId, btn) {
    app.activeView = viewId;
    document.querySelectorAll('#appScreen .tab').forEach(t => t.classList.toggle('active', t === btn));
    showSection(viewId);
    renderActiveSection(viewId);
}

function showActiveSection() {
    document.querySelectorAll('#appScreen .section').forEach(s => s.classList.toggle('active', s.id === app.activeView));
}

function renderActiveSection(viewId) {
    const renders = {
        gestorDashboard:    () => { renderGestorStats(); renderConsultorTable(); renderInstaladorDashTable(); renderPendingApprovals(); },
        gestorConsultores:  renderManageConsultors,
        gestorInstaladores: renderGestorInstaladores,
        gestorCupons:       renderGestorCupons,
        gestorConfig:           renderGestorConfig,
        gestorClientesPortal:   renderGestorClientesPortal,
        consultorDashboard: renderConsultorDashboard,
        consultorCRM:       renderFunnelBoard,
        consultorClientes:  renderClientTable,
        consultorProdutos:  renderProducts,
        consultorTreinamento:  renderTrainingModules,
        consultorSimulador:    renderSimulador,
        consultorInformativos: renderInformativos,
        instaladorDashboard:    renderInstaladorDashboard,
        instaladorCRM:          renderInstaladorFunnelBoard,
        instaladorClientes:     renderInstaladorClientes,
        instaladorInformativos: renderInstaladorInformativos,
        instaladorFotos:        renderInstaladorFotos,
        instaladorExtrato:      renderInstaladorExtrato,
        tecnicoDashboard:       renderTecnicoDashboard,
        tecnicoClientes:        renderTecnicoClientes,
        tecnicoChamados:        renderTecnicoChamados
    };
    if (renders[viewId]) renders[viewId]();
}

/* ═══════════════════════════════════════════════════════════════════
   GESTOR: RENDER DASHBOARD
═══════════════════════════════════════════════════════════════════ */

function renderGestorStats() {
    const consultants   = (app.state.users || []).filter(u => u.role === 'consultor');
    const instaladores  = (app.state.users || []).filter(u => u.role === 'instalador');
    const allClients    = app.state.clients || [];
    const totalSales    = allClients.filter(isClosedThisMonth).length;
    const totalMonthlyInst = (app.state.installations || []).filter(i => i.date && i.date.slice(0,7) === getCurrentMonthKey()).length;
    const totalConsComm = consultants.reduce((s, u) => s + getConsultantMetrics(u).commission, 0);
    const totalInstComm = instaladores.reduce((s, u) => s + getInstaladorMetrics(u).totalToReceive, 0);

    document.getElementById('gestorStats').innerHTML = `
        <div class="card"><h3>Consultores</h3><div class="metric">${consultants.length}</div><small>ativos na base</small></div>
        <div class="card"><h3>Instaladores</h3><div class="metric">${instaladores.length}</div><small>parceiros ativos</small></div>
        <div class="card"><h3>Clientes totais</h3><div class="metric">${allClients.length}</div><small>base consolidada</small></div>
        <div class="card"><h3>Vendas no mês</h3><div class="metric">${totalSales}</div><small>fechadas este mês</small></div>
        <div class="card"><h3>Instalações mês</h3><div class="metric">${totalMonthlyInst}</div><small>× R$ ${INSTALL_FEE},00</small></div>
        <div class="card"><h3>Comissão consultores</h3><div class="metric" style="font-size:1.5rem;">R$&nbsp;${formatCurrency(totalConsComm)}</div><small>prevista este mês</small></div>
        <div class="card"><h3>Comissão instaladores</h3><div class="metric" style="font-size:1.5rem;">R$&nbsp;${formatCurrency(totalInstComm)}</div><small>instal. + recorrência</small></div>
        <div class="card"><h3>Total a pagar</h3><div class="metric" style="font-size:1.5rem;">R$&nbsp;${formatCurrency(totalConsComm + totalInstComm)}</div><small>consultores + instaladores</small></div>
    `;
    // Mini bar chart: vendas por consultor
    const chartConsultants = (app.state.users||[]).filter(u=>u.role==='consultor');
    const chartData = chartConsultants.map(u => ({ name: u.name.split(' ')[0], sales: getConsultantMetrics(u).salesCount }));
    const maxSales = Math.max(...chartData.map(d=>d.sales), 1);
    const chartCard = document.createElement('div');
    chartCard.className = 'card';
    chartCard.style.cssText = 'margin-top:0;grid-column:1/-1;';
    chartCard.innerHTML = `
        <h3 style="margin:0 0 16px;">Vendas por consultor</h3>
        ${chartData.length === 0 ? '<p class="text-muted">Nenhum consultor cadastrado.</p>' :
            chartData.map(d => `
                <div class="chart-bar-wrap">
                    <div class="chart-bar-label"><span>${esc(d.name)}</span><strong style="color:var(--accent);">${d.sales}</strong></div>
                    <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${(d.sales/maxSales*100).toFixed(0)}%"></div></div>
                </div>`).join('')}`;
    document.getElementById('gestorStats').appendChild(chartCard);
    const rankingEl = document.getElementById('gestorRanking');
    if (rankingEl) {
        const ranked = buildRanking();
        rankingEl.innerHTML = ranked.length ? ranked.map(r => `
            <div class="ranking-item">
                <div class="rank-pos ${r.rank <= 3 ? 'top' + r.rank : ''}">#${r.rank}</div>
                <div style="font-size:1.3rem;">${r.badge.emoji}</div>
                <div class="rank-name">${esc(r.user.name)}<br><span class="rank-meta">${r.m.salesCount} venda${r.m.salesCount !== 1 ? 's' : ''} · ${r.m.clientCount} cliente${r.m.clientCount !== 1 ? 's' : ''}</span></div>
                <span class="badge ${r.badge.cls}">${r.badge.label}</span>
                <div class="rank-commission">R$ ${formatCurrency(r.m.commission)}</div>
            </div>
        `).join('') : '<p class="text-muted" style="padding:12px 0;">Nenhum consultor cadastrado.</p>';
    }
}

function renderConsultorTable() {
    const body = document.getElementById('consultorTableBody');
    if (!body) return;
    body.innerHTML = '';
    const ranked = buildRanking();
    (app.state.users || []).filter(u => u.role === 'consultor').forEach(u => {
        const m    = getConsultantMetrics(u);
        const re   = ranked.find(r => r.user.id === u.id);
        const b    = re ? re.badge : getPerformanceBadge(m.salesCount);
        const rank = re ? `#${re.rank}` : '—';
        const tr   = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${esc(u.name)}</strong><br><small>${esc(u.email)}</small></td>
            <td>${m.clientCount}</td>
            <td>${m.salesCount}</td>
            <td><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></td>
            <td>R$ ${formatCurrency(m.commission)}</td>
            <td><span class="badge ${b.cls}">${b.emoji} ${b.label}</span> <small style="color:var(--text-soft);">${rank}</small></td>
        `;
        body.appendChild(tr);
    });
}

function renderInstaladorDashTable() {
    const body = document.getElementById('instaladorDashTableBody');
    if (!body) return;
    body.innerHTML = '';
    (app.state.users || []).filter(u => u.role === 'instalador').forEach(u => {
        const m = getInstaladorMetrics(u);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${esc(u.name)}</strong><br><small>${esc(u.email)}</small></td>
            <td>${esc(u.storeName || '—')}</td>
            <td>${m.monthlyInstalls.length}</td>
            <td>${m.clientCount}</td>
            <td><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></td>
            <td>R$ ${formatCurrency(m.totalToReceive)}</td>
        `;
        body.appendChild(tr);
    });
}

function renderManageConsultors() {
    const body = document.getElementById('manageConsultorTable');
    if (!body) return;
    body.innerHTML = '';

    const pending = app.state.pendingUsers || [];
    const pendingConsultors = pending.filter(u => u.role === 'consultor');
    const pendingSection = document.getElementById('pendingReferralsSection');
    const container = body.closest('.card');
    if (pendingConsultors.length) {
        let ps = document.getElementById('pendingReferralsSection');
        if (!ps) {
            ps = document.createElement('div');
            ps.id = 'pendingReferralsSection';
            ps.style.cssText = 'margin-bottom:24px;';
            if (container && container.parentNode) container.parentNode.insertBefore(ps, container);
        }
        const rows = pendingConsultors.map(u => {
            const referrer = (app.state.users || []).find(r => r.id === u.referrerId);
            return `
                <div class="approval-item">
                    <div class="approval-info">
                        <strong>${esc(u.name)}</strong>
                        <span class="approval-meta">${esc(u.email)} · Indicado por: ${esc(referrer?.name || '—')} · ${formatDate(u.requestedAt)}</span>
                    </div>
                    <div class="approval-actions">
                        <button class="small-btn" data-action="approve-ref" data-id="${u.id}">✓ Aprovar</button>
                        <button class="small-btn danger-btn" data-action="reject-ref" data-id="${u.id}">✕ Recusar</button>
                    </div>
                </div>`;
        }).join('');
        ps.innerHTML = `
            <div class="card approval-card">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                    <span style="font-size:1.5rem;">🤝</span>
                    <div><h3 style="margin:0;">Indicações Pendentes</h3><p class="text-muted" style="margin:0;">${pendingConsultors.length} consultor${pendingConsultors.length !== 1 ? 'es' : ''} aguardando aprovação.</p></div>
                </div>
                <div class="approval-list">${rows}</div>
            </div>`;
        ps.querySelectorAll('[data-action="approve-ref"]').forEach(b => b.addEventListener('click', () => approveReferral(b.dataset.id)));
        ps.querySelectorAll('[data-action="reject-ref"]').forEach(b  => b.addEventListener('click', () => rejectReferral(b.dataset.id)));
    } else {
        const ps = document.getElementById('pendingReferralsSection');
        if (ps) ps.remove();
    }
    (app.state.users || []).filter(u => u.role === 'consultor').forEach(u => {
        const m = getConsultantMetrics(u);
        const b = getPerformanceBadge(m.salesCount);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${esc(u.name)}</strong><br><small>${esc(u.email)}</small></td>
            <td>${esc(u.whatsapp || '—')}</td>
            <td>${m.clientCount}</td>
            <td>${m.salesCount}</td>
            <td><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></td>
            <td><span class="badge ${b.cls}">${b.emoji} ${b.label}</span></td>
            <td><div class="table-actions">
                <button class="small-btn" data-action="edit" data-id="${u.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${u.id}">Excluir</button>
            </div></td>
        `;
        body.appendChild(tr);
    });
    body.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => openConsultorModal(b.dataset.id)));
    body.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteConsultor(b.dataset.id)));
}

function renderGestorInstaladores() {
    const tbody = document.getElementById('instaladorTableBody');
    const instBody = document.getElementById('installationTableBody');
    if (!tbody || !instBody) return;

    tbody.innerHTML = '';
    (app.state.users || []).filter(u => u.role === 'instalador').forEach(u => {
        const m = getInstaladorMetrics(u);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${esc(u.name)}</strong><br><small>${esc(u.email)}</small></td>
            <td>${esc(u.storeName || '—')}</td>
            <td>${m.clientCount}</td>
            <td>${m.monthlyInstalls.length}</td>
            <td>R$ ${formatCurrency(m.installCommission)}</td>
            <td><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></td>
            <td><div class="table-actions">
                <button class="small-btn" data-action="edit" data-id="${u.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${u.id}">Excluir</button>
            </div></td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => openInstaladorModal(b.dataset.id)));
    tbody.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteInstalador(b.dataset.id)));

    instBody.innerHTML = '';
    const sorted = [...(app.state.installations || [])].sort((a, b) => b.date.localeCompare(a.date));
    if (!sorted.length) {
        instBody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--text-soft);">Nenhuma instalação registrada.</td></tr>';
        return;
    }
    sorted.forEach(inst => {
        const installer = (app.state.users || []).find(u => u.id === inst.instaladorId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatDate(inst.date)}</td>
            <td>${esc(installer?.name || '—')}</td>
            <td><strong>${esc(inst.clientName)}</strong></td>
            <td>${esc(inst.plate)}</td>
            <td>R$ ${formatCurrency(INSTALL_FEE)}</td>
            <td><div class="table-actions">
                <button class="small-btn danger-btn" data-action="delete" data-id="${inst.id}">Excluir</button>
            </div></td>
        `;
        instBody.appendChild(tr);
    });
    instBody.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteInstallation(b.dataset.id)));
}

function renderGestorCupons() {
    const body = document.getElementById('couponTableBody');
    if (!body) return;
    body.innerHTML = '';
    const coupons = app.state.coupons || [];
    if (!coupons.length) {
        body.innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:var(--text-soft);">Nenhum cupom cadastrado.</td></tr>';
        return;
    }
    coupons.forEach(c => {
        const discLabel = c.discountType === 'percentage' ? `${c.discountValue}%` : `R$ ${formatCurrency(c.discountValue)}`;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${esc(c.code)}</strong></td>
            <td>${discLabel} ${c.discountType === 'percentage' ? 'de desconto' : 'fixo'}</td>
            <td>${esc(c.description)}</td>
            <td><span class="badge ${c.active ? 'badge-active' : 'badge-warn'}">${c.active ? 'Ativo' : 'Inativo'}</span></td>
            <td><div class="table-actions">
                <button class="small-btn" data-action="edit" data-id="${c.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${c.id}">Excluir</button>
            </div></td>
        `;
        body.appendChild(tr);
    });
    body.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => openCouponModal(b.dataset.id)));
    body.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteCoupon(b.dataset.id)));
}

/* ═══════════════════════════════════════════════════════════════════
   CONSULTOR: RENDERS
═══════════════════════════════════════════════════════════════════ */

function renderConsultorDashboard() {
    if (app.currentUser?.role !== 'consultor') return;
    // Marcar notificações do consultor como lidas (compat: targetUserId ou consultantId)
    if (app.state.notifications) {
        const uid = app.currentUser.id;
        app.state.notifications.forEach(n => { if(n.targetUserId===uid || n.consultantId===uid) n.read=true; });
        saveState();
        renderNavigation();
    }
    const m = getConsultantMetrics(app.currentUser);
    document.getElementById('clientCount').textContent     = m.clientCount;
    document.getElementById('salesCount').textContent      = m.salesCount;
    document.getElementById('recurrenceStatus').textContent = m.recurrence.label;
    document.getElementById('recurrenceHint').textContent  = m.recurrence.hint;
    document.getElementById('commissionValue').textContent = formatCurrency(m.commission);
    const commHint = m.salesCount > 0
        ? `${m.salesCount} venda${m.salesCount !== 1 ? 's' : ''} × R$ 50,00 = R$ ${formatCurrency(m.salesCommission)}` +
          (m.recurrenceComm > 0 ? ` + recorrência R$ ${formatCurrency(m.recurrenceComm)}` : '')
        : 'Feche sua primeira venda para começar!';
    document.getElementById('commissionPercent').textContent = commHint;
    const rt = m.recurrence.label === 'Ativa'
        ? 'Recorrência ativa. Você atingiu a base de clientes e as vendas necessárias.'
        : m.recurrence.badge === 'badge-paused'
            ? 'Recorrência pausada. Continue fechando vendas para reativar.'
            : `Falt${5 - m.clientCount === 1 ? 'a 1 cliente' : 'am ' + (5 - m.clientCount) + ' clientes'} na base para começar.`;
    document.getElementById('realtimeStatus').textContent = rt;

    const ranked  = buildRanking();
    const myEntry = ranked.find(r => r.user.id === app.currentUser.id);
    if (myEntry) {
        const rankPos = document.getElementById('myRankPos');
        const rankBadge = document.getElementById('myRankBadge');
        const rankHint  = document.getElementById('myRankHint');
        if (rankPos)   rankPos.textContent   = `#${myEntry.rank}`;
        if (rankBadge) rankBadge.textContent = `${myEntry.badge.emoji} ${myEntry.badge.label}`;
        if (rankHint) {
            const s = myEntry.m.salesCount;
            rankHint.textContent = s < 2  ? `Mais ${2 - s} venda${2 - s > 1 ? 's' : ''} para conquistar Bronze`
                                 : s < 5  ? `Mais ${5 - s} venda${5 - s > 1 ? 's' : ''} para conquistar Prata`
                                 : s < 10 ? `Mais ${10 - s} venda${10 - s > 1 ? 's' : ''} para conquistar Ouro`
                                 : 'Nível máximo! Você é ouro! 🚀';
        }
    }
    // Widgets de meta e follow-up
    renderConsMetaWidget('metaWidget');
    renderTodayFollowUps('todayFollowUpsWidget');
    checkMetaAlerts(app.currentUser.id);
    updateNotifBadge();
}

function renderFunnelBoard() {
    if (app.currentUser?.role !== 'consultor') return;
    const funnel = document.getElementById('funnelBoard');
    funnel.innerHTML = '';
    const m = getConsultantMetrics(app.currentUser);
    stageOrder.forEach(stage => {
        const col = document.createElement('div');
        col.className = 'funnel-column';
        col.innerHTML = `<h3>${stage} <small style="color:var(--text-soft);font-weight:400;">(${m.stageCounts[stage] || 0})</small></h3><div class="drop-zone" data-stage="${stage}"></div>`;
        const zone = col.querySelector('.drop-zone');
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
            e.preventDefault(); zone.classList.remove('drag-over');
            const id = e.dataTransfer.getData('text/plain');
            if (id) updateClientStage(id, stage);
        });
        (app.state.clients || [])
            .filter(c => c.consultantId === app.currentUser.id && c.stage === stage)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(client => {
                const card = document.createElement('article');
                card.className = 'client-card';
                card.draggable = true;
                card.dataset.id = client.id;
                const wa    = client.isWhatsapp ? `<a href="https://wa.me/55${client.phone.replace(/\D/g,'')}" target="_blank" style="color:#25d366;text-decoration:none;" title="Abrir WhatsApp">💬</a>` : '';
                const score = calcScore(client);
                const temp  = getScoreTemp(score);
                const awaitBadge = client.awaitingApproval ? `<div style="font-size:0.72rem;background:#fff3cd;color:#7a4f00;border-radius:8px;padding:2px 8px;margin-bottom:4px;font-weight:700;">⏳ Aguardando aprovação</div>` : '';
                card.innerHTML = `
                    ${awaitBadge}
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:4px;">
                        <strong style="line-height:1.3;">${esc(client.name)}</strong>
                        <button class="score-badge ${temp.cls}" type="button" data-action="trak" title="Sugestão do TRAK">${temp.emoji} ${score}</button>
                    </div>
                    <small>${esc(client.phone)} ${wa} · ${esc(client.plan || client.product)}</small>
                    <small>R$ ${formatCurrency(client.monthlyFee)}/mês</small>
                    <div class="trak-card-balloon" id="trak_${client.id}">
                        <button class="trak-card-close" type="button" data-action="close-trak">×</button>
                        🤖 <span>${esc(temp.msg)}</span>
                    </div>
                    <div class="client-actions">
                        <button class="stage-btn" type="button" data-action="left">←</button>
                        <button class="stage-btn" type="button" data-action="right">→</button>
                        <button class="stage-btn" type="button" data-action="score" title="Ver checklist de score">📊</button>
                        <button class="stage-btn" type="button" data-action="followup" title="Agendar follow-up">📅</button>
                        <button class="stage-btn" type="button" data-action="edit">Editar</button>
                    </div>
                `;
                card.addEventListener('dragstart', () => card.classList.add('dragging'));
                card.addEventListener('dragend',   () => card.classList.remove('dragging'));
                card.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', client.id));
                card.querySelector('[data-action="left"]').addEventListener('click',  () => moveStage(client.id, -1));
                card.querySelector('[data-action="right"]').addEventListener('click', () => moveStage(client.id,  1));
                card.querySelector('[data-action="edit"]').addEventListener('click',  () => openClientModal(client.id));
                card.querySelector('[data-action="score"]').addEventListener('click', () => openScoreModal(client.id));
                card.querySelector('[data-action="followup"]').addEventListener('click', () => openFollowUpModal(client.id));
                card.querySelector('[data-action="trak"]').addEventListener('click', e => {
                    e.stopPropagation();
                    document.getElementById('trak_' + client.id).classList.toggle('visible');
                });
                card.querySelector('[data-action="close-trak"]').addEventListener('click', e => {
                    e.stopPropagation();
                    document.getElementById('trak_' + client.id).classList.remove('visible');
                });
                zone.appendChild(card);
            });
        funnel.appendChild(col);
    });
}

function renderClientTable() {
    const body = document.getElementById('clientTableBody');
    if (!body) return;
    body.innerHTML = '';
    const clients = (app.state.clients || []).filter(c => c.consultantId === app.currentUser.id);
    if (!clients.length) {
        body.innerHTML = '<tr><td colspan="6" style="padding:28px;text-align:center;color:var(--text-soft);">Nenhum cliente cadastrado ainda.</td></tr>';
        return;
    }
    clients.sort((a, b) => calcScore(b) - calcScore(a) || a.name.localeCompare(b.name)).forEach(c => {
        const ph    = (c.phone || '').replace(/\D/g, '');
        const score = calcScore(c);
        const temp  = getScoreTemp(score);
        const row   = document.createElement('tr');
        row.innerHTML = `
            <td>
                <button type="button" class="client-name-btn" data-action="profile" data-id="${c.id}">${esc(c.name)}</button>
                ${c.notes ? `<br><small class="text-muted">${esc(c.notes)}</small>` : ''}
            </td>
            <td>
                <div class="contact-icons">
                    ${ph ? `<a href="tel:+55${ph}" class="contact-icon" title="Ligar">📞</a>` : ''}
                    ${ph && c.isWhatsapp ? `<a href="https://wa.me/55${ph}" target="_blank" class="contact-icon contact-icon-wa" title="WhatsApp">💬</a>` : ''}
                    ${c.email ? `<a href="mailto:${esc(c.email)}" class="contact-icon contact-icon-mail" title="Email">✉️</a>` : ''}
                    <span class="contact-phone">${esc(c.phone || '')}</span>
                </div>
            </td>
            <td>${esc(c.plan || '—')}</td>
            <td>R$ ${formatCurrency(c.monthlyFee)}</td>
            <td><span class="pill ${stagePillClass(c.stage)}">${c.stage}</span></td>
            <td><button class="score-badge ${temp.cls}" type="button" data-action="score" data-id="${c.id}" title="Abrir checklist de score">${temp.emoji} ${score}</button></td>
            <td><div class="table-actions">
                <button class="small-btn" data-action="profile" data-id="${c.id}">Ver perfil</button>
                <button class="small-btn" data-action="edit" data-id="${c.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${c.id}">Excluir</button>
            </div></td>
        `;
        body.appendChild(row);
    });
    body.querySelectorAll('[data-action="profile"]').forEach(b => b.addEventListener('click', () => openClientProfile(b.dataset.id)));
    body.querySelectorAll('[data-action="score"]').forEach(b   => b.addEventListener('click', () => openScoreModal(b.dataset.id)));
    body.querySelectorAll('[data-action="edit"]').forEach(b   => b.addEventListener('click', () => openClientModal(b.dataset.id)));
    body.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteClient(b.dataset.id)));
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const visibleProducts = app.currentUser?.role === 'instalador'
        ? productList.filter(p => p.title === 'Rastreador Veicular')
        : productList;
    visibleProducts.forEach(p => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `<strong>${esc(p.title)}</strong><span>${esc(p.subtitle)}</span><p>${esc(p.description)}</p>`;
        grid.appendChild(card);
    });
}

function renderInformativos() {
    const area = document.getElementById('consultorInformativosArea');
    if (!area) return;
    if (area.dataset.rendered) return;
    area.dataset.rendered = '1';
    if (!app.currentUser) return;
    const m = getConsultantMetrics(app.currentUser);
    area.innerHTML = `
        <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
                <div style="font-size:2.2rem;">📋</div>
                <div>
                    <h2 style="margin:0 0 4px;">Regras de Comissionamento</h2>
                    <p class="text-muted" style="margin:0;">Como seus ganhos são calculados — atualizado para o mês vigente.</p>
                </div>
            </div>

            <h3 style="margin:0 0 12px;">Comissão por venda</h3>
            <p style="margin:0 0 16px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Você recebe <strong>R$ 50,00 fixos</strong> por cada venda concluída e aprovada pelo gestor —
                independente do plano escolhido pelo cliente.
            </p>

            <h3 style="margin:0 0 12px;">Recorrência mensal</h3>
            <p style="margin:0 0 14px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Além da comissão por venda, você acumula <strong>recorrência</strong> — um bônus mensal
                sobre as mensalidades dos seus clientes ativos. Para ativar, você precisa atingir os dois critérios abaixo no mesmo mês:
            </p>
            <div class="feature-cards" style="margin-bottom:24px;">
                <div class="feature-card">
                    <div class="feat-icon">👥</div>
                    <strong>Mínimo 5 clientes</strong>
                    <p>Ter pelo menos 5 clientes ativos na sua base (independente de quando fecharam)</p>
                </div>
                <div class="feature-card">
                    <div class="feat-icon">🎯</div>
                    <strong>Mínimo 2 vendas no mês</strong>
                    <p>Fechar pelo menos 2 novas vendas no mês corrente para reativar ou manter a recorrência. Se não bater, fica pausada — não zera.</p>
                </div>
                <div class="feature-card">
                    <div class="feat-icon">💸</div>
                    <strong>% sobre clientes ativos elegíveis</strong>
                    <p>Quanto mais clientes e mais vendas, maior a porcentagem aplicada</p>
                </div>
            </div>

            <div style="overflow-x:auto;margin-bottom:24px;">
                <table class="plan-compare">
                    <thead><tr><th>Vendas no mês</th><th>% de recorrência</th><th>Badge</th><th>Exemplo</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>0 ou 1 venda</td>
                            <td style="font-weight:700;color:var(--text-soft);">sem recorrência</td>
                            <td><span class="badge badge-warn">🌱 Em formação</span></td>
                            <td style="color:var(--text-soft);font-size:0.85rem;">Feche mais vendas para desbloquear</td>
                        </tr>
                        <tr>
                            <td>2 a 4 vendas</td>
                            <td style="font-weight:700;color:#6b2e00;">10%</td>
                            <td><span class="badge badge-bronze">🥉 Bronze</span></td>
                            <td style="font-size:0.85rem;">10 clientes × R$ 54,90 → R$ 54,90 de recorrência</td>
                        </tr>
                        <tr>
                            <td>5 a 9 vendas</td>
                            <td style="font-weight:700;color:#444;">18%</td>
                            <td><span class="badge badge-silver">🥈 Prata</span></td>
                            <td style="font-size:0.85rem;">10 clientes × R$ 54,90 → R$ 98,82 de recorrência</td>
                        </tr>
                        <tr>
                            <td>10 ou mais vendas</td>
                            <td style="font-weight:700;color:#7a4f00;">25%</td>
                            <td><span class="badge badge-gold">🥇 Ouro</span></td>
                            <td style="font-size:0.85rem;">10 clientes × R$ 54,90 → R$ 137,25 de recorrência</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 style="margin:0 0 12px;">Seu status atual</h3>
            <div class="trak-bubble">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">
                    <strong>Vendas este mês:</strong> ${m.salesCount} → R$ ${formatCurrency(m.salesCommission)} de comissão<br>
                    <strong>Recorrência:</strong> <span class="badge ${m.recurrence.badge}" style="vertical-align:middle;">${m.recurrence.label}</span>
                    ${m.recurrenceComm > 0 ? ` → R$ ${formatCurrency(m.recurrenceComm)} (${m.percent}%)` : ''}<br>
                    <strong>Total previsto:</strong> R$ ${formatCurrency(m.commission)}<br>
                    <span style="margin-top:8px;display:block;color:var(--text-soft);">${m.recurrence.hint}</span>
                </div>
            </div>

            <h3 style="margin:24px 0 12px;">Comissão adicional por produto</h3>
            <p style="margin:0 0 14px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">O gestor pode configurar comissões extras por produto, acima da porcentagem padrão.</p>
            <div style="overflow-x:auto;margin-bottom:24px;">
                <table class="plan-compare">
                    <thead><tr><th>Produto</th><th>Comissão extra</th></tr></thead>
                    <tbody>
                        ${productList.map(p => {
                            const pct = (app.state.productCommissions || {})[p.title];
                            return `<tr><td>${esc(p.title)}</td><td>${pct ? `<strong>${pct}%</strong>` : '<span style="color:var(--text-soft);">—</span>'}</td></tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <h3 style="margin:0 0 12px;">Regras gerais</h3>
            <div class="script-box">📅 <strong>Período de apuração:</strong> As vendas são contadas do 1º ao último dia do mês corrente. A comissão é calculada com base nas vendas fechadas nesse período.</div>
            <div class="script-box">💳 <strong>Pagamento:</strong> A comissão é paga até o 5º dia útil do mês seguinte via PIX cadastrado no seu perfil.</div>
            <div class="script-box">🔄 <strong>Upgrades de plano:</strong> Se um cliente fizer upgrade de plano, a diferença de mensalidade entra na base de cálculo a partir do mês em que o upgrade foi confirmado.</div>
            <div class="script-box">❌ <strong>Cancelamentos:</strong> Clientes cancelados no mês corrente são removidos da base de cálculo. Cancelamentos após o fechamento do mês não afetam a comissão já apurada.</div>
            <div class="script-box">⚠️ <strong>Chargebacks:</strong> Em caso de inadimplência do cliente, a comissão referente a esse cliente é descontada no próximo pagamento.</div>
            <div class="script-box">✅ <strong>Aprovação de fechamentos:</strong> Ao mover um cliente para "Fechado" no funil, a venda é enviada ao gestor para aprovação antes de ser contabilizada.</div>
        </div>

        <div class="card" style="margin-top:16px;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
                <div style="font-size:2rem;">🤝</div>
                <div><h2 style="margin:0 0 4px;">Programa de Indicação</h2>
                <p class="text-muted" style="margin:0;">Indique um consultor e ganhe bônus sobre as vendas dele.</p></div>
            </div>
            ${(() => {
                const ref = computeReferralBonus(app.currentUser.id);
                const pendingRef = (app.state.pendingUsers || []).find(u => u.referrerId === app.currentUser.id);
                const hasReferred = !!ref.referred || !!pendingRef;
                let statusHtml = '';
                if (pendingRef) {
                    statusHtml = `<div class="trak-bubble" style="margin-bottom:16px;"><div class="trak-avatar">🤖</div><div class="trak-text">Sua indicação <strong>${esc(pendingRef.name)}</strong> está aguardando aprovação do gestor. Assim que aprovada, você começará a acumular bônus! 🎯</div></div>`;
                } else if (ref.referred) {
                    const tiers = [{s:15,p:7},{s:10,p:5},{s:5,p:3},{s:2,p:1}];
                    const next = tiers.find(t => ref.referredSales < t.s);
                    const hint = next ? `Mais ${next.s - ref.referredSales} venda${next.s - ref.referredSales > 1 ? 's' : ''} de ${esc(ref.referred.name)} para subir para ${next.p}% de bônus!` : 'Nível máximo! Bônus de 7%! 🏆';
                    statusHtml = `
                        <div class="trak-bubble" style="margin-bottom:16px;">
                            <div class="trak-avatar">🤖</div>
                            <div class="trak-text">
                                <strong>Indicado:</strong> ${esc(ref.referred.name)}<br>
                                <strong>Vendas do indicado este mês:</strong> ${ref.referredSales}<br>
                                <strong>Bônus de indicação:</strong> R$ ${formatCurrency(ref.bonus)} (${ref.bonusPct}% sobre base do indicado)<br>
                                <span style="color:var(--text-soft);margin-top:6px;display:block;">${hint}</span>
                            </div>
                        </div>`;
                }
                return `
                    ${statusHtml}
                    <div style="overflow-x:auto;margin-bottom:20px;">
                        <table class="plan-compare">
                            <thead><tr><th>Vendas do indicado no mês</th><th>Bônus sobre a base dele</th></tr></thead>
                            <tbody>
                                <tr><td>2 a 4 vendas</td><td style="font-weight:700;">1%</td></tr>
                                <tr><td>5 a 9 vendas</td><td style="font-weight:700;">3%</td></tr>
                                <tr><td>10 a 14 vendas</td><td style="font-weight:700;">5%</td></tr>
                                <tr><td>15 ou mais vendas</td><td style="font-weight:700;">7%</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="script-box">📌 Você precisa ter pelo menos 2 vendas no mês para receber o bônus. Cada consultor pode indicar no máximo 1 pessoa.</div>
                    ${!hasReferred ? `<div style="margin-top:16px;"><button id="openReferralBtn" class="primary-btn">+ Indicar consultor</button></div>` : ''}
                `;
            })()}
        </div>
    `;
    if (document.getElementById('openReferralBtn')) {
        document.getElementById('openReferralBtn').addEventListener('click', openReferralModal);
    }
}

/* ─── TRAINING PROGRESS HELPERS ─── */
function getModuleProgress(moduleId) {
    const tp = app.state.trainingProgress || {};
    return tp[moduleId] || { completed: false, sectionsRead: [], bestScore: null, attempts: [], lastAccessed: null, lastSectionIndex: 0 };
}

function saveModuleProgress(moduleId, updates) {
    if (!app.state.trainingProgress) app.state.trainingProgress = {};
    const cur = getModuleProgress(moduleId);
    app.state.trainingProgress[moduleId] = { ...cur, ...updates };
    saveState();
}

function getOverallProgress() {
    const visibleModules = app.currentUser?.role === 'instalador'
        ? trainingData.filter(m => m.id === 1)
        : trainingData;
    const completed = visibleModules.filter(m => getModuleProgress(m.id).completed).length;
    return { completed, total: visibleModules.length, pct: Math.round((completed / visibleModules.length) * 100) };
}

function renderTrainingModules() {
    const grid   = document.getElementById('trainingModules');
    const detail = document.getElementById('trainingDetail');
    if (!grid) return;
    grid.classList.remove('hidden');
    grid.innerHTML = '';
    if (detail) detail.classList.add('hidden');

    const visibleModules = app.currentUser?.role === 'instalador'
        ? trainingData.filter(m => m.id === 1)
        : trainingData;

    const overall = getOverallProgress();

    // Overall progress header
    const headerDiv = document.createElement('div');
    headerDiv.style.cssText = 'margin-bottom:20px;';
    const allDone = overall.completed === overall.total;

    // TRAK daily tip
    const tipOfDay = TRAK_TIPS[new Date().getDay() % TRAK_TIPS.length];
    headerDiv.innerHTML = `
        <div class="training-trak-tip">
            <div style="font-size:1.6rem;flex-shrink:0;">🤖</div>
            <div><strong>TRAK diz:</strong> ${tipOfDay}</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;flex-wrap:wrap;gap:8px;">
            <span style="font-size:0.85rem;font-weight:700;color:var(--text-soft);">Progresso geral</span>
            <span style="font-size:0.85rem;font-weight:800;color:var(--accent);">${overall.completed}/${overall.total} módulos concluídos (${overall.pct}%)</span>
        </div>
        <div class="training-overall-bar"><div class="training-overall-fill" style="width:${overall.pct}%"></div></div>
    `;
    grid.appendChild(headerDiv);

    // Certificate card
    if (allDone) {
        const certDiv = document.createElement('div');
        certDiv.className = 'certificate-card';
        certDiv.style.cssText = 'margin-bottom:20px;';
        certDiv.innerHTML = `
            <div class="certificate-icon">🏆</div>
            <h3 style="margin:0 0 6px;">Certificado de Conclusão</h3>
            <p style="color:var(--text-soft);margin:0 0 4px;">Você completou todos os módulos Tracktiv! Parabéns!</p>
            <button class="cert-print-btn" id="printCertBtn">🎓 Imprimir Certificado</button>
        `;
        grid.appendChild(certDiv);
        certDiv.querySelector('#printCertBtn').addEventListener('click', printCertificate);
    }

    visibleModules.forEach(mod => {
        const prog = getModuleProgress(mod.id);
        const statusLabel = prog.completed ? 'Concluído' : prog.sectionsRead?.length > 0 ? 'Em andamento' : 'Não iniciado';
        const statusCls   = prog.completed ? 'status-completed' : prog.sectionsRead?.length > 0 ? 'status-in-progress' : 'status-not-started';
        const scoreHtml   = prog.bestScore !== null
            ? `<span class="module-score-chip">Quiz: ${prog.bestScore}%</span>`
            : '';
        const lastHtml    = prog.lastAccessed
            ? `<span style="font-size:0.75rem;color:var(--text-soft);">Acessado: ${prog.lastAccessed}</span>`
            : '';

        const card = document.createElement('article');
        card.className = 'product-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:8px;">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                    <strong style="font-size:0.95rem;">${esc(mod.title)}</strong>
                    <span class="module-status-badge ${statusCls}">${statusLabel}</span>
                </div>
                <span style="font-size:0.82rem;color:var(--text-soft);">${esc(mod.subtitle)}</span>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">${scoreHtml}${lastHtml}</div>
            </div>
        `;
        card.addEventListener('click', () => showTrainingModule(mod.id));
        grid.appendChild(card);
    });
}

function showTrainingModule(moduleId) {
    const detail = document.getElementById('trainingDetail');
    const grid   = document.getElementById('trainingModules');
    if (!detail) return;
    const sections  = SECTIONS_BY_MODULE[moduleId] || [];
    const questions = QUIZ_BY_MODULE[moduleId]     || [];
    const prog      = getModuleProgress(moduleId);
    const resumeIdx = prog.lastSectionIndex || 0;
    app.trainingState = { moduleId, sectionIndex: resumeIdx, sections, questions };
    saveModuleProgress(moduleId, { lastAccessed: todayISO() });
    if (grid) grid.classList.add('hidden');
    detail.classList.remove('hidden');
    const totalSteps = sections.length + 1;
    const steps = Array.from({ length: totalSteps }, (_, i) =>
        `<div class="training-step" id="tstep-${i}"></div>`
    ).join('');
    const introMsg = TRAK_MODULE_INTROS[moduleId] || 'Vamos lá! Chegou a hora de aprender. Foca que vale muito! 🚀';
    detail.innerHTML = `
        <div class="trak-bubble" style="margin-bottom:20px;">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text">${introMsg}</div>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
            <button type="button" id="backToModulesBtn" class="secondary-btn" style="flex-shrink:0;">← Módulos</button>
            <div style="flex:1;min-width:160px;">
                <div class="training-progress-bar" id="trainingProgressBar">${steps}</div>
                <div style="font-size:0.8rem;color:var(--text-soft);margin-top:6px;" id="trainingStepLabel"></div>
            </div>
        </div>
        <div id="trainingSectionArea"></div>
    `;
    document.getElementById('backToModulesBtn').addEventListener('click', () => {
        if (grid) grid.classList.remove('hidden');
        detail.classList.add('hidden');
    });
    renderTrainingSection(resumeIdx);
}

function renderTrainingSection(idx) {
    app.trainingState.sectionIndex = idx;
    saveModuleProgress(app.trainingState.moduleId, { lastSectionIndex: idx });
    const area  = document.getElementById('trainingSectionArea');
    const bar   = document.getElementById('trainingProgressBar');
    const label = document.getElementById('trainingStepLabel');
    if (!area) return;
    const moduleId  = app.trainingState.moduleId;
    const prog      = getModuleProgress(moduleId);
    if (bar) {
        bar.querySelectorAll('.training-step').forEach((el, i) => {
            const isRead = prog.sectionsRead?.includes(i);
            el.className = 'training-step' + (isRead || i < idx ? ' done' : i === idx ? ' active' : '');
        });
    }
    const sections = app.trainingState.sections;
    const mod      = trainingData.find(m => m.id === moduleId);
    const isQuiz   = idx >= sections.length;
    if (label) {
        label.textContent = isQuiz
            ? 'Quiz final — teste seus conhecimentos'
            : `Seção ${idx + 1} de ${sections.length}: ${sections[idx].title}`;
    }
    if (isQuiz) {
        const qCount  = app.trainingState.questions.length;
        const glossary = GLOSSARY_BY_MODULE[moduleId] || [];
        const tips     = SALES_TIPS_BY_MODULE[moduleId] || [];
        const attempts = prog.attempts || [];
        const attemptsHtml = attempts.length ? `
            <div style="margin-top:14px;">
                <div style="font-size:0.8rem;font-weight:700;color:var(--text-soft);margin-bottom:8px;">Tentativas anteriores</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    ${attempts.map((a, i) => `<span class="attempt-chip ${a.score >= 70 ? 'best' : ''}">#${i+1} — ${a.score}%</span>`).join('')}
                </div>
            </div>` : '';
        area.innerHTML = `
            <div class="trak-bubble">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">Você chegou no <strong>Quiz Final!</strong> 🎯 São ${qCount} perguntas. Você precisa de 70% pra ser aprovado — mas eu tenho certeza que você vai arrasar! 💪</div>
            </div>
            ${glossary.length ? `
            <div class="card" style="margin-bottom:12px;">
                <h4 style="margin:0 0 4px;">📖 Glossário rápido</h4>
                <p class="text-muted" style="margin:0 0 8px;font-size:0.8rem;">Termos importantes deste módulo.</p>
                <div class="glossary-grid">
                    ${glossary.map(g => `<div class="glossary-item"><div class="glossary-term">${esc(g.t)}</div><div class="glossary-def">${esc(g.d)}</div></div>`).join('')}
                </div>
            </div>` : ''}
            ${tips.length ? `
            <div class="card" style="margin-bottom:12px;">
                <h4 style="margin:0 0 4px;">💰 Dicas rápidas de venda</h4>
                <div class="sales-tips-list">
                    ${tips.map(t => `<div class="sales-tip-item">${esc(t)}</div>`).join('')}
                </div>
            </div>` : ''}
            <div class="quiz-card">
                <div class="quiz-header">
                    <div><h3>Quiz — ${esc(mod ? mod.title : 'Módulo')}</h3><p class="text-muted">${qCount} perguntas sobre o conteúdo do módulo.</p></div>
                    <div style="min-width:180px;"><div class="quiz-progress"><div class="quiz-progress-fill" id="quizProgressFill"></div></div></div>
                </div>
                <div class="quiz-toggle-row">
                    <input type="checkbox" id="timerToggle" ${app._quizTimerEnabled ? 'checked' : ''}>
                    <label for="timerToggle">Temporizador de 30s por pergunta</label>
                </div>
                <div id="quizContent"></div>
            </div>
            <div class="training-nav">
                <button type="button" class="secondary-btn" id="prevSectionBtn">← Seção anterior</button>
                <div></div>
            </div>
            ${attemptsHtml}
        `;
        document.getElementById('prevSectionBtn').addEventListener('click', () => renderTrainingSection(idx - 1));
        document.getElementById('timerToggle').addEventListener('change', e => { app._quizTimerEnabled = e.target.checked; });
        startQuiz();
        return;
    }
    const s        = sections[idx];
    const isLast   = idx === sections.length - 1;
    const isRead   = prog.sectionsRead?.includes(idx);
    const wordCount = s.html.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
    const estMin    = Math.max(1, Math.round(wordCount / 200));
    area.innerHTML = `
        <div class="trak-bubble">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text">${s.trak}</div>
        </div>
        <div class="card" style="margin-bottom:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
                <span class="est-time-chip">⏱ ~${estMin} min de leitura</span>
                ${isRead
                    ? `<span class="section-read-badge">✓ Lido</span>`
                    : `<button type="button" class="mark-read-btn" id="markReadBtn">Marcar como lido</button>`}
            </div>
            ${s.html}
        </div>
        <div class="training-nav">
            ${idx > 0
                ? `<button type="button" class="secondary-btn" id="prevSectionBtn">← Seção anterior</button>`
                : `<div></div>`}
            <button type="button" class="primary-btn" id="nextSectionBtn">${isLast ? 'Ir para o Quiz →' : 'Próxima seção →'}</button>
        </div>
    `;
    if (!isRead) {
        document.getElementById('markReadBtn').addEventListener('click', () => {
            const cur = getModuleProgress(moduleId);
            const read = Array.from(new Set([...(cur.sectionsRead || []), idx]));
            saveModuleProgress(moduleId, { sectionsRead: read });
            renderTrainingSection(idx);
        });
    }
    if (idx > 0) {
        document.getElementById('prevSectionBtn').addEventListener('click', () => renderTrainingSection(idx - 1));
    }
    document.getElementById('nextSectionBtn').addEventListener('click', () => renderTrainingSection(idx + 1));
}

/* ═══════════════════════════════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════════════════════════════ */

const TRAK_CORRECT = [
    'Isso aí! Acertou em cheio! 🚀',
    'Perfeito! Você tá mandando bem! 🔥',
    'Uhuu! Resposta certa! ⭐',
    'Exatamente! Você pegou o conceito! 💡'
];
const TRAK_WRONG = [
    'Quase! Mas não desanima — você aprende errando! 😊',
    'Essa foi difícil! Mas agora você vai lembrar pra sempre! 🧠',
    'Não foi dessa vez — mas você tá evoluindo! 💪',
    'Errou agora, mas tudo bem — segue em frente! 🌱'
];

function startQuiz() {
    if (app.quizState?.timerInterval) clearInterval(app.quizState.timerInterval);
    app.quizState = { index: 0, score: 0, answers: [], timerEnabled: !!(app._quizTimerEnabled), timerInterval: null };
    renderQuizQuestion();
}

function renderQuizQuestion() {
    if (app.quizState?.timerInterval) clearInterval(app.quizState.timerInterval);
    const content = document.getElementById('quizContent');
    const fill    = document.getElementById('quizProgressFill');
    if (!content || !fill) return;
    const { index } = app.quizState;
    const questions  = app.trainingState.questions;
    const q = questions[index];
    if (!q) return renderQuizResult();
    fill.style.width = `${(index / questions.length) * 100}%`;
    const timerHtml = app.quizState.timerEnabled ? `
        <div class="quiz-timer-wrap">
            <span class="quiz-timer-label" id="timerLabel">30s</span>
            <div class="quiz-timer-bar"><div class="quiz-timer-fill" id="timerFill" style="width:100%"></div></div>
        </div>` : '';
    content.innerHTML = `
        ${timerHtml}
        <div class="trak-quiz-header">
            <div class="trak-quiz-avatar">🤖</div>
            <div class="trak-quiz-msg">Pergunta ${index + 1} de ${questions.length} — Você consegue? 🎯</div>
        </div>
        <h3 style="margin-bottom:16px;">${esc(q.q)}</h3>
        <div class="quiz-options" id="quizOptions"></div>
        <div id="quizFeedback"></div>
    `;
    q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectQuizOption(i));
        document.getElementById('quizOptions').appendChild(btn);
    });
    if (app.quizState.timerEnabled) {
        let timeLeft = 30;
        const timerFill  = document.getElementById('timerFill');
        const timerLabel = document.getElementById('timerLabel');
        app.quizState.timerInterval = setInterval(() => {
            timeLeft--;
            if (timerFill)  timerFill.style.width = `${(timeLeft / 30) * 100}%`;
            if (timerLabel) timerLabel.textContent = `${timeLeft}s`;
            if (timeLeft <= 10 && timerFill)  timerFill.classList.add('danger');
            if (timeLeft <= 0) {
                clearInterval(app.quizState.timerInterval);
                selectQuizOption(-1);
            }
        }, 1000);
    }
}

function selectQuizOption(chosen) {
    if (app.quizState?.timerInterval) clearInterval(app.quizState.timerInterval);
    const q       = app.trainingState.questions[app.quizState.index];
    const correct = chosen === q.ans;
    if (correct) app.quizState.score++;
    app.quizState.answers.push({ q: q.q, opts: q.opts, chosen, ans: q.ans, exp: q.exp, correct });
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.ans)                 btn.classList.add('correct');
        if (i === chosen && i !== q.ans) btn.classList.add('wrong');
    });
    const timedOut = chosen === -1;
    const msgs    = timedOut ? ['Tempo esgotado! ⏱ Mas relaxa — próxima vez você chega lá! 💪'] : correct ? TRAK_CORRECT : TRAK_WRONG;
    const trakMsg = msgs[Math.floor(Math.random() * msgs.length)];
    const fb = document.getElementById('quizFeedback');
    fb.innerHTML = `
        <div class="trak-bubble" style="margin-top:18px;">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text"><strong>${trakMsg}</strong><br><span class="text-muted">${esc(q.exp)}</span></div>
        </div>
    `;
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'primary-btn';
    next.style.marginTop = '12px';
    next.textContent = app.quizState.index + 1 === app.trainingState.questions.length ? 'Ver resultado →' : 'Próxima pergunta →';
    next.addEventListener('click', () => { app.quizState.index++; renderQuizQuestion(); });
    fb.appendChild(next);
}

function renderQuizResult() {
    if (app.quizState?.timerInterval) clearInterval(app.quizState.timerInterval);
    const content = document.getElementById('quizContent');
    const fill    = document.getElementById('quizProgressFill');
    if (!content || !fill) return;
    fill.style.width = '100%';
    const bar = document.getElementById('trainingProgressBar');
    if (bar) bar.querySelectorAll('.training-step').forEach(el => { el.className = 'training-step done'; });

    const moduleId = app.trainingState.moduleId;
    const { score, answers } = app.quizState;
    const total    = app.trainingState.questions.length;
    const pct      = Math.round((score / total) * 100);
    const approved = pct >= 70;

    // Save attempt history and best score
    const prog     = getModuleProgress(moduleId);
    const attempts = [...(prog.attempts || []), { score: pct, date: todayISO() }];
    const bestScore = Math.max(pct, prog.bestScore || 0);
    const updates = { attempts, bestScore };
    if (approved) updates.completed = true;
    saveModuleProgress(moduleId, updates);

    // TRAK reaction by tier
    let trakMsg;
    if (pct >= 90) trakMsg = `Incrível! ${score}/${total} — <strong>${pct}%</strong>! Você é referência! Agora vai lá e fecha negócio como um campeão! 🚀🏆`;
    else if (pct >= 70) trakMsg = `Muito bom! ${score}/${total} — <strong>${pct}%</strong>! Você está pronto para o mercado. Segue estudando pra chegar nos 100%! 💪`;
    else trakMsg = `Ei, não desanima! ${score}/${total} — <strong>${pct}%</strong>. Revisa as seções com calma e tenta de novo. Você chega lá! 🌱`;

    // Answer review HTML
    const reviewHtml = (answers || []).map((a, i) => `
        <div class="answer-review-item">
            <div style="font-size:0.8rem;font-weight:700;color:var(--text-soft);margin-bottom:4px;">Pergunta ${i+1}</div>
            <div style="font-size:0.9rem;margin-bottom:6px;">${esc(a.q)}</div>
            ${a.correct
                ? `<div class="answer-correct-mark">✓ Correto — ${esc(a.opts[a.ans])}</div>`
                : `<div class="answer-wrong-mark">✗ Sua resposta: ${a.chosen === -1 ? 'Tempo esgotado' : esc(a.opts[a.chosen] || '')}</div>
                   <div class="answer-correct-mark" style="margin-top:2px;">✓ Certa: ${esc(a.opts[a.ans])}</div>`}
            <div style="font-size:0.78rem;color:var(--text-soft);margin-top:4px;">${esc(a.exp)}</div>
        </div>
    `).join('');

    // Attempt history
    const attemptsHtml = attempts.map((a, i) => `<span class="attempt-chip ${a.score >= 70 ? 'best' : ''}">#${i+1} — ${a.score}%</span>`).join('');

    // Certificate link if all modules done after this approval
    const overallAfter = getOverallProgress();
    const certHtml = (approved && overallAfter.completed === overallAfter.total) ? `
        <div class="certificate-card" style="margin-top:20px;">
            <div class="certificate-icon">🏆</div>
            <h3 style="margin:0 0 6px;">Parabéns! Você completou todos os módulos!</h3>
            <button class="cert-print-btn" id="certPrintBtn">🎓 Imprimir Certificado</button>
        </div>` : '';

    content.innerHTML = `
        <div class="quiz-result">
            <div class="quiz-badge ${pct >= 90 ? 'approved' : approved ? 'approved' : 'retry'}">${pct >= 90 ? '🌟' : approved ? '🏆' : '📚'}</div>
            <h3>${pct >= 90 ? 'Excelente!' : approved ? 'Aprovado! Parabéns!' : 'Quase lá!'}</h3>
            <strong>${score}/${total}</strong>
            <div style="font-size:1.3rem;font-weight:700;color:${approved ? 'var(--accent)' : '#a05000'};">${pct}%</div>
            <div class="trak-bubble" style="margin:20px 0;text-align:left;">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">${trakMsg}</div>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
                <button id="retryQuiz" class="secondary-btn">🔄 Refazer quiz</button>
            </div>
            <div style="margin-top:20px;text-align:left;">
                <div style="font-size:0.85rem;font-weight:700;margin-bottom:8px;">Histórico de tentativas</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">${attemptsHtml}</div>
            </div>
            <div style="margin-top:20px;text-align:left;">
                <div style="font-size:0.85rem;font-weight:700;margin-bottom:4px;">Revisão completa</div>
                ${reviewHtml}
            </div>
        </div>
        ${certHtml}
    `;
    document.getElementById('retryQuiz').addEventListener('click', startQuiz);
    if (document.getElementById('certPrintBtn')) {
        document.getElementById('certPrintBtn').addEventListener('click', printCertificate);
    }
}

function printCertificate() {
    const name = app.currentUser?.name || 'Consultor(a)';
    const date = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificado Tracktiv</title>
    <style>
        body { margin:0; font-family: Georgia, serif; background:#fffde7; display:flex; align-items:center; justify-content:center; min-height:100vh; }
        .cert { border: 6px double #f9a825; border-radius:24px; padding:60px 70px; max-width:700px; text-align:center; background:#fff; box-shadow:0 20px 60px rgba(0,0,0,0.1); }
        h1 { font-size:2.4rem; color:#1a2e4a; margin:0 0 6px; }
        .sub { font-size:1rem; color:#666; margin-bottom:28px; }
        .name { font-size:2rem; color:#f5820d; font-weight:bold; margin:18px 0; border-bottom:2px solid #f9a825; padding-bottom:12px; }
        .body { font-size:1.05rem; color:#333; line-height:1.7; }
        .date { margin-top:28px; font-size:0.9rem; color:#999; }
        .logo { font-size:3rem; margin-bottom:10px; }
        @media print { body { -webkit-print-color-adjust:exact; } }
    </style></head><body>
    <div class="cert">
        <div class="logo">🏆</div>
        <h1>Certificado de Conclusão</h1>
        <div class="sub">Programa de Treinamento Tracktiv</div>
        <div class="body">Certificamos que</div>
        <div class="name">${name}</div>
        <div class="body">concluiu com êxito todos os módulos do Programa de Treinamento Tracktiv, demonstrando conhecimento em Rastreador Veicular, SST, Chatbot, Contabilidade e Marketing Digital.</div>
        <div class="date">Emitido em ${date}</div>
    </div>
    </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE 1: PRODUCT COMMISSIONS (GESTOR CONFIG)
═══════════════════════════════════════════════════════════════════ */

function renderGestorConfig() {
    const content = document.getElementById('gestorConfigContent');
    if (!content) return;
    const pc = app.state.productCommissions || {};
    content.innerHTML = `
        <div class="card" style="margin-bottom:24px;">
            <h3 style="margin:0 0 6px;">Comissão Adicional por Produto</h3>
            <p class="text-muted" style="margin:0 0 18px;">Configure a % de comissão extra por produto. Aparece nos informativos dos consultores e instaladores.</p>
            <div style="overflow-x:auto;">
                <table>
                    <thead><tr><th>Produto</th><th>Categoria</th><th>Comissão extra (%)</th></tr></thead>
                    <tbody>
                        ${productList.map(p => `
                            <tr>
                                <td>${esc(p.title)}</td>
                                <td>${esc(p.subtitle)}</td>
                                <td><div style="display:flex;align-items:center;gap:8px;">
                                    <input type="number" class="pc-input" data-product="${esc(p.title)}" min="0" max="100" step="0.5" value="${pc[p.title] || 0}" style="width:80px;padding:6px 10px;border-radius:8px;border:1px solid var(--border);" />
                                    <span>%</span>
                                </div></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="margin-top:16px;display:flex;align-items:center;gap:14px;">
                <button id="saveProductCommissionsBtn" class="primary-btn">Salvar configurações</button>
                <span id="pcSaveStatus" style="font-size:0.85rem;color:var(--success);"></span>
            </div>
        </div>
    `;
    document.getElementById('saveProductCommissionsBtn').addEventListener('click', () => {
        if (!app.state.productCommissions) app.state.productCommissions = {};
        content.querySelectorAll('.pc-input').forEach(inp => {
            app.state.productCommissions[inp.dataset.product] = Math.min(100, Math.max(0, parseFloat(inp.value) || 0));
        });
        saveState();
        const status = document.getElementById('pcSaveStatus');
        if (status) { status.textContent = '✓ Salvo!'; setTimeout(() => { if (status) status.textContent = ''; }, 2000); }
    });
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE 2: APPROVAL WORKFLOW
═══════════════════════════════════════════════════════════════════ */

function renderPendingApprovals() {
    const el = document.getElementById('gestorPendingApprovals');
    if (!el) return;
    const pending = app.state.pendingApprovals || [];
    if (!pending.length) { el.innerHTML = ''; return; }
    const rows = pending.map(a => {
        const client = (app.state.clients || []).find(c => c.id === a.clientId);
        const actor  = (app.state.users || []).find(u => u.id === (a.consultantId || a.instaladorId));
        if (!client) return '';
        return `
            <div class="approval-item">
                <div class="approval-info">
                    <strong>${esc(client.name)}</strong>
                    <span class="approval-meta">${esc(client.product)} · ${esc(client.plan)} · R$ ${formatCurrency(client.monthlyFee)}/mês</span>
                    <span class="approval-meta">Por: ${esc(actor?.name || '—')} · ${formatDate(a.requestedAt)}</span>
                </div>
                <div class="approval-actions">
                    <button class="small-btn" data-action="approve" data-id="${a.id}">✓ Aprovar</button>
                    <button class="small-btn danger-btn" data-action="reject" data-id="${a.id}">✕ Recusar</button>
                </div>
            </div>`;
    }).join('');
    el.innerHTML = `
        <div class="card approval-card" style="margin-top:8px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                <span style="font-size:1.5rem;">⏳</span>
                <div><h3 style="margin:0;">Aprovações Pendentes</h3><p class="text-muted" style="margin:0;">${pending.length} venda${pending.length !== 1 ? 's' : ''} aguardando aprovação.</p></div>
            </div>
            <div class="approval-list">${rows}</div>
        </div>`;
    el.querySelectorAll('[data-action="approve"]').forEach(b => b.addEventListener('click', () => approveSale(b.dataset.id)));
    el.querySelectorAll('[data-action="reject"]').forEach(b  => b.addEventListener('click', () => rejectSale(b.dataset.id)));
}

function approveSale(approvalId) {
    const approval = (app.state.pendingApprovals || []).find(a => a.id === approvalId);
    if (!approval) return;
    const client = (app.state.clients || []).find(c => c.id === approval.clientId);
    if (!client) return;
    if (approval.product === 'Rastreador Veicular') {
        const instaladores = (app.state.users || []).filter(u => u.role === 'instalador');
        if (instaladores.length) {
            const opts = instaladores.map((u, i) => `${i + 1}: ${u.name}${u.storeName ? ' — ' + u.storeName : ''}`).join('\n');
            const choice = prompt(`Selecionar instalador para ${client.name}:\n${opts}\n\nDigite o número:`);
            const idx = parseInt(choice) - 1;
            if (isNaN(idx) || idx < 0 || idx >= instaladores.length) { alert('Seleção inválida. Aprovação cancelada.'); return; }
            if (!app.state.pendingInstallations) app.state.pendingInstallations = [];
            app.state.pendingInstallations.push({
                id: `pinst_${Date.now()}`,
                clientId: client.id,
                clientName: client.name,
                clientPhone: client.phone || '',
                plate: client.plates || '',
                plan: client.plan,
                instaladorId: instaladores[idx].id,
                approvedAt: todayISO(),
                consultantId: approval.consultantId || null,
                status: 'pending'
            });
        }
    }
    client.stage = 'Fechado';
    client.closedDate = todayISO();
    delete client.awaitingApproval;
    app.state.pendingApprovals = (app.state.pendingApprovals || []).filter(a => a.id !== approvalId);
    // Notificações
    if (approval.consultantId) addNotification(approval.consultantId, 'sale_approved', `✅ Venda para ${client.name} aprovada! Comissão registrada.`, { section: 'consultorDashboard' });
    if (approval.instaladorId) addNotification(approval.instaladorId, 'install_pending', `🔧 Novo veículo aprovado para instalação: ${client.name} — ${client.plates || 'placa a informar'}`, { section: 'instaladorFotos' });
    // Checar metas após aprovar venda
    if (approval.consultantId) checkMetaAlerts(approval.consultantId);
    saveState(); renderAppViews();
}

function rejectSale(approvalId) {
    const approval = (app.state.pendingApprovals || []).find(a => a.id === approvalId);
    if (!approval) return;
    const client = (app.state.clients || []).find(c => c.id === approval.clientId);
    const reason = prompt('Motivo da recusa (opcional):') || '';
    if (client) {
        delete client.awaitingApproval;
        if (reason) client.rejectionNote = reason;
    }
    app.state.pendingApprovals = (app.state.pendingApprovals || []).filter(a => a.id !== approvalId);
    if (approval.consultantId) addNotification(approval.consultantId, 'sale_rejected', `❌ Venda para ${client?.name || 'cliente'} foi recusada.${reason ? ' Motivo: ' + reason : ''}`, { section: 'consultorDashboard' });
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE 4: INSTALADOR FUNNEL + INFORMATIVOS
═══════════════════════════════════════════════════════════════════ */

function renderInstaladorFunnelBoard() {
    if (app.currentUser?.role !== 'instalador') return;
    const funnel = document.getElementById('instaladorFunnelBoard');
    if (!funnel) return;
    funnel.innerHTML = '';
    stageOrder.forEach(stage => {
        const col = document.createElement('div');
        col.className = 'funnel-column';
        const count = (app.state.clients || []).filter(c => c.instaladorId === app.currentUser.id && c.stage === stage).length;
        col.innerHTML = `<h3>${stage} <small style="color:var(--text-soft);font-weight:400;">(${count})</small></h3><div class="drop-zone" data-stage="${stage}"></div>`;
        const zone = col.querySelector('.drop-zone');
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
            e.preventDefault(); zone.classList.remove('drag-over');
            const id = e.dataTransfer.getData('text/plain');
            if (id) updateClientStage(id, stage);
        });
        (app.state.clients || [])
            .filter(c => c.instaladorId === app.currentUser.id && c.stage === stage)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(client => {
                const card = document.createElement('article');
                card.className = 'client-card';
                card.draggable = true;
                card.dataset.id = client.id;
                const wa = client.isWhatsapp ? `<a href="https://wa.me/55${client.phone.replace(/\D/g,'')}" target="_blank" style="color:#25d366;text-decoration:none;">💬</a>` : '';
                const score = calcScore(client);
                const temp  = getScoreTemp(score);
                const awaitBadge = client.awaitingApproval ? `<div style="font-size:0.72rem;background:#fff3cd;color:#7a4f00;border-radius:8px;padding:2px 8px;margin-bottom:4px;font-weight:700;">⏳ Aguardando aprovação</div>` : '';
                card.innerHTML = `
                    ${awaitBadge}
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:4px;">
                        <strong style="line-height:1.3;">${esc(client.name)}</strong>
                        <button class="score-badge ${temp.cls}" type="button" data-action="trak">${temp.emoji} ${score}</button>
                    </div>
                    <small>${esc(client.phone)} ${wa} · ${esc(client.plan || client.product)}</small>
                    <small>R$ ${formatCurrency(client.monthlyFee)}/mês</small>
                    <div class="trak-card-balloon" id="itrak_${client.id}">
                        <button class="trak-card-close" type="button" data-action="close-trak">×</button>
                        🤖 <span>${esc(temp.msg)}</span>
                    </div>
                    <div class="client-actions">
                        <button class="stage-btn" type="button" data-action="left">←</button>
                        <button class="stage-btn" type="button" data-action="right">→</button>
                        <button class="stage-btn" type="button" data-action="score">📊</button>
                        <button class="stage-btn" type="button" data-action="followup" title="Agendar follow-up">📅</button>
                        <button class="stage-btn" type="button" data-action="edit">Editar</button>
                    </div>`;
                card.addEventListener('dragstart', e => { card.classList.add('dragging'); e.dataTransfer.setData('text/plain', client.id); });
                card.addEventListener('dragend',   () => card.classList.remove('dragging'));
                card.querySelector('[data-action="left"]').addEventListener('click',  () => moveStage(client.id, -1));
                card.querySelector('[data-action="right"]').addEventListener('click', () => moveStage(client.id,  1));
                card.querySelector('[data-action="edit"]').addEventListener('click',  () => openClientModal(client.id));
                card.querySelector('[data-action="score"]').addEventListener('click', () => openScoreModal(client.id));
                card.querySelector('[data-action="followup"]').addEventListener('click', () => openFollowUpModal(client.id));
                card.querySelector('[data-action="trak"]').addEventListener('click', ev => {
                    ev.stopPropagation();
                    document.getElementById('itrak_' + client.id)?.classList.toggle('visible');
                });
                card.querySelector('[data-action="close-trak"]').addEventListener('click', ev => {
                    ev.stopPropagation();
                    document.getElementById('itrak_' + client.id)?.classList.remove('visible');
                });
                zone.appendChild(card);
            });
        funnel.appendChild(col);
    });
}

function renderInstaladorInformativos() {
    const area = document.getElementById('instaladorInformativosArea');
    if (!area || area.dataset.rendered) return;
    area.dataset.rendered = '1';
    if (!app.currentUser) return;
    const m  = getInstaladorMetrics(app.currentUser);
    const pc = app.state.productCommissions || {};
    area.innerHTML = `
        <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;">
                <div style="font-size:2.2rem;">📋</div>
                <div><h2 style="margin:0 0 4px;">Informativos do Instalador</h2>
                <p class="text-muted" style="margin:0;">Comissões e regras da sua parceria Tracktiv.</p></div>
            </div>

            <h3 style="margin:0 0 12px;">Comissão por instalação</h3>
            <p style="margin:0 0 14px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Você recebe <strong>R$ ${INSTALL_FEE},00</strong> por cada rastreador instalado confirmado no mês.
            </p>

            <h3 style="margin:0 0 12px;">Recorrência da loja</h3>
            <p style="margin:0 0 16px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Além das instalações, você ganha recorrência sobre clientes captados pela sua loja — mesmo critério dos consultores.
            </p>
            <div style="overflow-x:auto;margin-bottom:24px;">
                <table class="plan-compare">
                    <thead><tr><th>Vendas no mês</th><th>Comissão recorrência</th></tr></thead>
                    <tbody>
                        <tr><td>0 ou 1 venda</td><td style="color:var(--text-soft);">sem recorrência</td></tr>
                        <tr><td>2 a 4 vendas</td><td style="font-weight:700;color:#6b2e00;">10% sobre clientes ativos elegíveis</td></tr>
                        <tr><td>5 a 9 vendas</td><td style="font-weight:700;color:#444;">18% sobre clientes ativos elegíveis</td></tr>
                        <tr><td>10 ou mais</td><td style="font-weight:700;color:#7a4f00;">25% sobre clientes ativos elegíveis</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 style="margin:0 0 12px;">Comissão adicional por produto</h3>
            <div style="overflow-x:auto;margin-bottom:24px;">
                <table class="plan-compare">
                    <thead><tr><th>Produto</th><th>Extra</th></tr></thead>
                    <tbody>${productList.map(p => `<tr><td>${esc(p.title)}</td><td>${pc[p.title] ? `<strong>${pc[p.title]}%</strong>` : '<span style="color:var(--text-soft);">—</span>'}</td></tr>`).join('')}</tbody>
                </table>
            </div>

            <h3 style="margin:0 0 12px;">Seu status atual</h3>
            <div class="trak-bubble">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">
                    <strong>Instalações este mês:</strong> ${m.monthlyInstalls.length} × R$ ${INSTALL_FEE},00 = R$ ${formatCurrency(m.installCommission)}<br>
                    <strong>Clientes da loja:</strong> ${m.clientCount} · <strong>Vendas:</strong> ${m.salesCount}<br>
                    <strong>Recorrência:</strong> <span class="badge ${m.recurrence.badge}" style="vertical-align:middle;">${m.recurrence.label}</span><br>
                    <strong>Total previsto:</strong> R$ ${formatCurrency(m.totalToReceive)}<br>
                    <span style="margin-top:8px;display:block;color:var(--text-soft);">${m.recurrence.hint}</span>
                </div>
            </div>
        </div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE 5+6: REFERRAL SYSTEM
═══════════════════════════════════════════════════════════════════ */

function computeReferralBonus(referrerId) {
    const referrer = (app.state.users || []).find(u => u.id === referrerId);
    if (!referrer) return { bonus: 0, referred: null, bonusPct: 0, referredSales: 0 };
    if (getConsultantMetrics(referrer).salesCount < 2) return { bonus: 0, referred: null, bonusPct: 0, referredSales: 0 };
    const referred = (app.state.users || []).find(u => u.referrerId === referrerId && u.role === 'consultor');
    if (!referred) return { bonus: 0, referred: null, bonusPct: 0, referredSales: 0 };
    const rm = getConsultantMetrics(referred);
    let bonusPct = 0;
    if (rm.salesCount >= 15)     bonusPct = 7;
    else if (rm.salesCount >= 10) bonusPct = 5;
    else if (rm.salesCount >= 5)  bonusPct = 3;
    else if (rm.salesCount >= 2)  bonusPct = 1;
    return { bonus: rm.totalFee * (bonusPct / 100), referred, bonusPct, referredSales: rm.salesCount };
}

function openReferralModal() {
    showModal('Indicar Novo Consultor', `
        <form id="referralForm" class="form-grid">
            <div class="field"><label>Nome completo *</label><input id="refName" type="text" required /></div>
            <div class="field"><label>E-mail *</label><input id="refEmail" type="email" required /></div>
            <div class="field"><label>Senha inicial *</label><input id="refPass" type="text" placeholder="Mínimo 6 caracteres" required /></div>
            <div class="field"><label>WhatsApp</label><input id="refWa" type="tel" placeholder="(11) 99999-9999" /></div>
            <div class="actions" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Enviar indicação</button>
                <button type="button" id="cancelRefBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="refError" class="error-text"></div>
        </form>
    `);
    document.getElementById('cancelRefBtn').addEventListener('click', closeModal);
    document.getElementById('referralForm').addEventListener('submit', handleReferralSave);
}

function handleReferralSave(e) {
    e.preventDefault();
    const name  = document.getElementById('refName').value.trim();
    const email = document.getElementById('refEmail').value.trim().toLowerCase();
    const pass  = document.getElementById('refPass').value.trim();
    const wa    = document.getElementById('refWa').value.trim();
    const errEl = document.getElementById('refError');
    errEl.textContent = '';
    if (!name || !email || !pass) { errEl.textContent = 'Preencha todos os campos obrigatórios.'; return; }
    if (pass.length < 6) { errEl.textContent = 'A senha deve ter pelo menos 6 caracteres.'; return; }
    if ((app.state.users || []).some(u => u.email === email)) { errEl.textContent = 'Este e-mail já está em uso.'; return; }
    if ((app.state.pendingUsers || []).some(u => u.email === email)) { errEl.textContent = 'Já existe uma indicação pendente com este e-mail.'; return; }
    if ((app.state.users || []).some(u => u.referrerId === app.currentUser.id) ||
        (app.state.pendingUsers || []).some(u => u.referrerId === app.currentUser.id)) {
        errEl.textContent = 'Você já tem uma indicação ativa. Cada consultor pode indicar apenas 1 pessoa.'; return;
    }
    if (!app.state.pendingUsers) app.state.pendingUsers = [];
    app.state.pendingUsers.push({ id: `pending_${Date.now()}`, name, email, password: pass, whatsapp: wa, role: 'consultor', referrerId: app.currentUser.id, requestedAt: todayISO() });
    saveState(); closeModal();
    alert('Indicação enviada! O gestor irá analisar e aprovar em breve.');
    const infArea = document.getElementById('consultorInformativosArea');
    if (infArea) { delete infArea.dataset.rendered; renderInformativos(); }
}

function approveReferral(pendingUserId) {
    const pu = (app.state.pendingUsers || []).find(u => u.id === pendingUserId);
    if (!pu) return;
    if (!app.state.users) app.state.users = [];
    app.state.users.push({ ...pu, id: `consultor_${Date.now()}` });
    app.state.pendingUsers = (app.state.pendingUsers || []).filter(u => u.id !== pendingUserId);
    saveState(); renderAppViews();
}

function rejectReferral(pendingUserId) {
    const pu = (app.state.pendingUsers || []).find(u => u.id === pendingUserId);
    if (!pu || !confirm(`Recusar indicação de ${pu.name}?`)) return;
    app.state.pendingUsers = (app.state.pendingUsers || []).filter(u => u.id !== pendingUserId);
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE 7: PHOTO REGISTRATION (INSTALADOR)
═══════════════════════════════════════════════════════════════════ */

function formatDuration(seconds) {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60), s = seconds % 60;
    return m > 0 ? `${m}min ${s}s` : `${s}s`;
}

function renderInstaladorFotos() {
    if (app.currentUser?.role !== 'instalador') return;
    const content = document.getElementById('instaladorFotosContent');
    if (!content) return;
    const pending   = (app.state.pendingInstallations || []).filter(p => p.instaladorId === app.currentUser.id);
    const completed = (app.state.photoInstallations  || []).filter(p => p.instaladorId === app.currentUser.id);

    const pendingRows = pending.length ? pending.map(p => `
        <div class="pending-install-card">
            <div class="pending-install-info">
                <strong>${esc(p.clientName)}</strong>
                <span class="text-muted" style="font-size:0.85rem;">${esc(p.plate || 'Placa não informada')} · Plano ${esc(p.plan)} · Aprovado em ${formatDate(p.approvedAt)}</span>
            </div>
            <button class="primary-btn" data-action="start" data-id="${p.id}" style="flex-shrink:0;">📸 Iniciar</button>
        </div>
    `).join('') : '<p class="text-muted" style="padding:12px 0;">Nenhuma instalação pendente no momento. As instalações aparecem aqui após o gestor aprovar uma venda de Rastreador Veicular.</p>';

    const completedRows = completed.length ? [...completed].sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || '')).map(pi => `
        <div class="photo-record-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">
                <div>
                    <strong>${esc(pi.clientName)}</strong>
                    <div class="text-muted" style="font-size:0.83rem;">${esc(pi.plate)} · ${esc(pi.modelo || '')} · ${formatDate(pi.completedAt)}</div>
                    <div class="text-muted" style="font-size:0.83rem;">Duração: ${formatDuration(pi.durationSeconds)} · Local: ${esc(pi.local || '—')}</div>
                </div>
                ${pi.photoVehicle ? `<img src="${pi.photoVehicle}" alt="Veículo" style="width:80px;height:60px;object-fit:cover;border-radius:10px;border:1px solid var(--border);">` : ''}
            </div>
            ${pi.notes ? `<div class="text-muted" style="font-size:0.84rem;">Obs: ${esc(pi.notes)}</div>` : ''}
        </div>
    `).join('') : '';

    content.innerHTML = `
        <div class="card" style="margin-bottom:18px;">
            <h3 style="margin:0 0 14px;">Aguardando instalação (${pending.length})</h3>
            ${pendingRows}
        </div>
        ${completed.length ? `<div class="card"><h3 style="margin:0 0 14px;">Concluídas (${completed.length})</h3>${completedRows}</div>` : ''}
    `;
    content.querySelectorAll('[data-action="start"]').forEach(b => b.addEventListener('click', () => openPhotoInstallModal(b.dataset.id)));
}

function openPhotoInstallModal(pendingInstId) {
    const pInst = (app.state.pendingInstallations || []).find(p => p.id === pendingInstId);
    if (!pInst) return;
    const startTime = Date.now();
    showModal(`📸 Instalação — ${esc(pInst.clientName)}`, `
        <div style="background:#f0f4ff;border-radius:12px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
            <div style="font-size:1.5rem;">⏱️</div>
            <div>
                <div style="font-size:1.3rem;font-weight:800;font-variant-numeric:tabular-nums;" id="installTimer">00:00</div>
                <div style="font-size:0.8rem;color:var(--text-soft);">Tempo em andamento</div>
            </div>
        </div>
        <form id="photoInstallForm" class="form-grid">
            <div class="field"><label>Placa *</label><input id="piPlate" type="text" value="${esc(pInst.plate)}" required /></div>
            <div class="field"><label>Marca / Modelo *</label><input id="piModelo" type="text" placeholder="Ex: Toyota Corolla" required /></div>
            <div class="field">
                <label>Local *</label>
                <select id="piLocal" required>
                    <option value="">Selecione...</option>
                    <option value="Na loja">Na loja</option>
                    <option value="No cliente">No cliente</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <div class="field full-width">
                <label>Foto do veículo</label>
                <div class="photo-input-group">
                    <button type="button" class="photo-opt-btn" data-input="piPhotoVehicle" data-capture="true">📷 Tirar foto</button>
                    <button type="button" class="photo-opt-btn" data-input="piPhotoVehicle" data-capture="false">🖼️ Escolher da galeria</button>
                    <input id="piPhotoVehicle" type="file" accept="image/*" style="display:none;">
                    <span id="piPhotoVehicleName" class="photo-file-name"></span>
                </div>
                <div id="piPhotoVehiclePreview" class="photo-preview-thumb"></div>
            </div>
            <div class="field full-width">
                <label>Foto do equipamento instalado</label>
                <div class="photo-input-group">
                    <button type="button" class="photo-opt-btn" data-input="piPhotoEquip" data-capture="true">📷 Tirar foto</button>
                    <button type="button" class="photo-opt-btn" data-input="piPhotoEquip" data-capture="false">🖼️ Escolher da galeria</button>
                    <input id="piPhotoEquip" type="file" accept="image/*" style="display:none;">
                    <span id="piPhotoEquipName" class="photo-file-name"></span>
                </div>
                <div id="piPhotoEquipPreview" class="photo-preview-thumb"></div>
            </div>
            <div class="field full-width"><label>Observações</label><textarea id="piNotes" rows="2" placeholder="Detalhes da instalação..."></textarea></div>
            <div class="actions full-width" style="margin-top:8px;">
                <button type="submit" class="primary-btn">✓ Concluir instalação</button>
            </div>
            <div id="piError" class="error-text full-width"></div>
        </form>
    `);
    const timerEl = document.getElementById('installTimer');
    const timerInterval = setInterval(() => {
        if (!document.getElementById('installTimer')) { clearInterval(timerInterval); return; }
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const ss = String(elapsed % 60).padStart(2, '0');
        timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
    // Photo input: camera vs gallery buttons
    document.querySelectorAll('.photo-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.input);
            if (!input) return;
            if (btn.dataset.capture === 'true') {
                input.setAttribute('capture', 'environment');
            } else {
                input.removeAttribute('capture');
            }
            input.click();
        });
    });
    ['piPhotoVehicle', 'piPhotoEquip'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('change', e => {
            const file = e.target.files[0];
            const nameEl   = document.getElementById(id + 'Name');
            const previewEl = document.getElementById(id + 'Preview');
            if (nameEl) nameEl.textContent = file ? file.name : '';
            if (previewEl) {
                if (file) {
                    const url = URL.createObjectURL(file);
                    previewEl.innerHTML = `
                        <img src="${url}" alt="preview" style="max-width:120px;max-height:90px;border-radius:10px;border:1px solid var(--border);margin-top:6px;display:block;">
                        <button type="button" class="retake-btn" data-retake="${id}">🔄 Tirar novamente</button>
                    `;
                    previewEl.querySelector('.retake-btn').addEventListener('click', () => {
                        const inp = document.getElementById(id);
                        if (inp) { inp.setAttribute('capture','environment'); inp.value = ''; inp.click(); }
                    });
                } else {
                    previewEl.innerHTML = '';
                }
            }
        });
    });
    document.getElementById('closeModalBtn').addEventListener('click', () => clearInterval(timerInterval), { once: true });
    document.getElementById('photoInstallForm').addEventListener('submit', async e => {
        e.preventDefault();
        clearInterval(timerInterval);
        await handlePhotoInstallSave(pendingInstId, pInst, Math.floor((Date.now() - startTime) / 1000));
    });
}

async function handlePhotoInstallSave(pendingInstId, pInst, durationSeconds) {
    const plate  = document.getElementById('piPlate').value.trim().toUpperCase();
    const modelo = document.getElementById('piModelo').value.trim();
    const local  = document.getElementById('piLocal').value;
    const notes  = document.getElementById('piNotes').value.trim();
    const errEl  = document.getElementById('piError');
    errEl.textContent = '';
    if (!plate || !modelo || !local) { errEl.textContent = 'Preencha todos os campos obrigatórios.'; return; }
    const toBase64 = file => new Promise(resolve => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
    const photoVehicle = await toBase64(document.getElementById('piPhotoVehicle').files[0]);
    const photoEquip   = await toBase64(document.getElementById('piPhotoEquip').files[0]);
    if (!app.state.photoInstallations) app.state.photoInstallations = [];
    app.state.photoInstallations.push({ id: `phi_${Date.now()}`, pendingInstId, instaladorId: app.currentUser.id, clientId: pInst.clientId, clientName: pInst.clientName, plate, modelo, local, notes, photoVehicle, photoEquip, durationSeconds, completedAt: todayISO() });
    if (!app.state.installations) app.state.installations = [];
    app.state.installations.push({ id: `install_${Date.now()}`, instaladorId: app.currentUser.id, clientName: pInst.clientName, plate, date: todayISO(), notes });
    app.state.pendingInstallations = (app.state.pendingInstallations || []).filter(p => p.id !== pendingInstId);
    // Notificar gestor e consultor
    const gestorU = (app.state.users || []).find(u => u.role === 'gestor');
    if (gestorU) addNotification(gestorU.id, 'install_complete', `🔧 Instalação concluída: ${pInst.clientName} — placa ${plate}`, { section: 'gestorInstaladores' });
    if (pInst.consultantId) addNotification(pInst.consultantId, 'install_complete', `🔧 Instalação concluída para ${pInst.clientName}!`, { section: 'consultorDashboard' });
    saveState(); closeModal(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   INSTALADOR: RENDERS
═══════════════════════════════════════════════════════════════════ */

function renderInstaladorDashboard() {
    if (app.currentUser?.role !== 'instalador') return;
    const m = getInstaladorMetrics(app.currentUser);

    document.getElementById('instaladorStats').innerHTML = `
        <div class="card"><h3>Instalações no mês</h3><div class="metric">${m.monthlyInstalls.length}</div><small>${m.monthlyInstalls.length} × R$ ${INSTALL_FEE},00</small></div>
        <div class="card"><h3>Comissão instalações</h3><div class="metric" style="font-size:1.6rem;">R$&nbsp;${formatCurrency(m.installCommission)}</div></div>
        <div class="card"><h3>Clientes da loja</h3><div class="metric">${m.clientCount}</div><small><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></small></div>
        <div class="card"><h3>Total a receber</h3><div class="metric" style="font-size:1.6rem;">R$&nbsp;${formatCurrency(m.totalToReceive)}</div><small>Instal. + recorrência</small></div>
    `;

    const tbody = document.getElementById('instDashTableBody');
    tbody.innerHTML = '';
    if (!m.monthlyInstalls.length) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding:20px;text-align:center;color:var(--text-soft);">Nenhuma instalação neste mês.</td></tr>';
        return;
    }
    m.monthlyInstalls.forEach(inst => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${formatDate(inst.date)}</td><td><strong>${esc(inst.clientName)}</strong></td><td>${esc(inst.plate)}</td><td>R$ ${formatCurrency(INSTALL_FEE)}</td>`;
        tbody.appendChild(tr);
    });
}

function renderInstaladorClientes() {
    if (app.currentUser?.role !== 'instalador') return;
    const body = document.getElementById('instaladorClientTableBody');
    if (!body) return;
    body.innerHTML = '';
    const clients = (app.state.clients || []).filter(c => c.instaladorId === app.currentUser.id);
    if (!clients.length) {
        body.innerHTML = '<tr><td colspan="6" style="padding:28px;text-align:center;color:var(--text-soft);">Nenhum cliente da loja cadastrado ainda.</td></tr>';
        return;
    }
    clients.sort((a, b) => calcScore(b) - calcScore(a) || a.name.localeCompare(b.name)).forEach(c => {
        const ph = (c.phone || '').replace(/\D/g, '');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <button type="button" class="client-name-btn" data-action="profile" data-id="${c.id}">${esc(c.name)}</button>
                ${c.notes ? `<br><small class="text-muted">${esc(c.notes)}</small>` : ''}
            </td>
            <td>
                <div class="contact-icons">
                    ${ph ? `<a href="tel:+55${ph}" class="contact-icon" title="Ligar">📞</a>` : ''}
                    ${ph && c.isWhatsapp ? `<a href="https://wa.me/55${ph}" target="_blank" class="contact-icon contact-icon-wa" title="WhatsApp">💬</a>` : ''}
                    ${c.email ? `<a href="mailto:${esc(c.email)}" class="contact-icon contact-icon-mail" title="Email">✉️</a>` : ''}
                    <span class="contact-phone">${esc(c.phone || '')}</span>
                </div>
            </td>
            <td>${esc(c.plan || '—')}</td>
            <td>R$ ${formatCurrency(c.monthlyFee)}</td>
            <td><span class="pill ${stagePillClass(c.stage)}">${c.stage}</span></td>
            <td><div class="table-actions">
                <button class="small-btn" data-action="profile" data-id="${c.id}">Ver perfil</button>
                <button class="small-btn" data-action="edit" data-id="${c.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${c.id}">Excluir</button>
            </div></td>
        `;
        body.appendChild(tr);
    });
    body.querySelectorAll('[data-action="profile"]').forEach(b => b.addEventListener('click', () => openClientProfile(b.dataset.id)));
    body.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => openClientModal(b.dataset.id)));
    body.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteClient(b.dataset.id)));
}

function renderInstaladorExtrato() {
    if (app.currentUser?.role !== 'instalador') return;
    const m = getInstaladorMetrics(app.currentUser);
    const content = document.getElementById('extratoContent');
    if (!content) return;

    const instRows = m.monthlyInstalls.length
        ? m.monthlyInstalls.map(i => `<div class="extrato-item"><div>${formatDate(i.date)} · <strong>${esc(i.clientName)}</strong> · ${esc(i.plate)}</div><div>R$ ${formatCurrency(INSTALL_FEE)}</div></div>`).join('')
        : `<div class="extrato-item"><div style="color:var(--text-soft);">Nenhuma instalação neste mês.</div><div>—</div></div>`;

    content.innerHTML = `
        <div class="extrato-block">
            <div class="extrato-block-header">Instalações — ${getCurrentMonthLabel()} (${m.monthlyInstalls.length} instalação${m.monthlyInstalls.length !== 1 ? 'ões' : ''})</div>
            ${instRows}
            <div class="extrato-subtotal"><div>Subtotal instalações</div><div>R$ ${formatCurrency(m.installCommission)}</div></div>
        </div>

        <div class="extrato-block">
            <div class="extrato-block-header">Recorrência da Loja</div>
            <div class="extrato-item"><div>Clientes na base</div><div><strong>${m.clientCount}</strong></div></div>
            <div class="extrato-item"><div>Vendas fechadas no mês</div><div><strong>${m.salesCount}</strong></div></div>
            <div class="extrato-item"><div>Status recorrência</div><div><span class="badge ${m.recurrence.badge}">${m.recurrence.label}</span></div></div>
            <div class="extrato-item"><div>Taxa de comissão</div><div>${m.percent > 0 ? `<strong>${m.percent}%</strong>` : '— <small>(não atingiu requisitos)</small>'}</div></div>
            <div class="extrato-item"><div>Base total de mensalidades</div><div>R$ ${formatCurrency(m.totalFee)}</div></div>
            <div class="extrato-subtotal"><div>Subtotal recorrência</div><div>R$ ${formatCurrency(m.recurrenceComm)}</div></div>
        </div>

        <div class="extrato-total">
            <div>Total a receber — ${getCurrentMonthLabel()}</div>
            <div>R$ ${formatCurrency(m.totalToReceive)}</div>
        </div>
        <p class="text-muted" style="margin-top:14px;font-size:0.88rem;">${esc(m.recurrence.hint)}</p>
    `;
}

/* ═══════════════════════════════════════════════════════════════════
   APP CONTROL
═══════════════════════════════════════════════════════════════════ */

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    document.getElementById('userNameLabel').textContent = app.currentUser.name;
    document.getElementById('pageRoleLabel').textContent =
        app.currentUser.role === 'gestor'     ? 'Área do Gestor' :
        app.currentUser.role === 'instalador' ? 'Portal do Instalador' :
        app.currentUser.role === 'tecnico'    ? 'Portal do Técnico' : 'Portal do Consultor';

    // Initialize nav state
    app.navState = { path: [], expandedGroup: null, activeItemId: null };

    // Set initial view from first nav tree item
    const role = app.currentUser.role;
    const tree = NAV_TREE[role] || [];
    const firstItem = tree[0];
    if (firstItem) {
        if (firstItem.section) {
            app.activeView = firstItem.section;
            app.navState.activeItemId = firstItem.id;
            const roleLabel = role === 'gestor' ? 'Gestor' : role === 'consultor' ? 'Consultor' : role === 'tecnico' ? 'Técnico' : 'Instalador';
            app.navState.path = [{ label: roleLabel, groupId: null }, { label: firstItem.label, groupId: null, active: true }];
        }
    }

    renderNavigation();
    renderBreadcrumb();
    showActiveSection();

    // Inject hamburger button se não existir
    let hb = document.getElementById('hamburgerBtn');
    if (!hb) {
        hb = document.createElement('button');
        hb.id = 'hamburgerBtn'; hb.className = 'hamburger-btn'; hb.innerHTML = '☰';
        hb.setAttribute('aria-label', 'Menu');
        const brandEl = document.querySelector('#appScreen .topbar .brand');
        if (brandEl) brandEl.prepend(hb);
    }
    hb.onclick = () => {
        const mg = document.querySelector('#appScreen .main-grid');
        if (mg) mg.classList.toggle('sidebar-open');
    };

    // Inject sidebar overlay se não existir
    let ov = document.getElementById('sidebarOverlay');
    if (!ov) {
        ov = document.createElement('div');
        ov.id = 'sidebarOverlay'; ov.className = 'sidebar-overlay';
        const mg = document.querySelector('#appScreen .main-grid');
        if (mg) mg.appendChild(ov);
    }
    ov.onclick = () => {
        const mg = document.querySelector('#appScreen .main-grid');
        if (mg) mg.classList.remove('sidebar-open');
    };

    // Avatar no user-chip
    const uname = app.currentUser.name;
    const chip = document.getElementById('userNameLabel')?.closest('.user-chip');
    if (chip) chip.innerHTML = `<div class="user-avatar">${esc(uname.charAt(0).toUpperCase())}</div><strong>${esc(uname)}</strong>`;

    renderAppViews();
}

function renderAppViews() {
    // Skip if currently showing a dynamic (render-fn) page
    if (app.activeView === 'dynamicContent') return;
    updateNotifBadge();

    renderGestorStats();
    renderConsultorTable();
    renderInstaladorDashTable();
    renderPendingApprovals();
    renderManageConsultors();
    renderGestorInstaladores();
    renderGestorCupons();
    renderConsultorDashboard();
    renderFunnelBoard();
    renderClientTable();
    renderProducts();
    renderTrainingModules();
    renderSimulador();
    renderInstaladorDashboard();
    renderInstaladorFunnelBoard();
    renderInstaladorClientes();
    renderInstaladorFotos();
    renderInstaladorExtrato();
    renderGestorClientesPortal();
    // Reset informativos so they re-render with updated data
    ['consultorInformativosArea', 'instaladorInformativosArea'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { delete el.dataset.rendered; }
    });
    if (app.activeView === 'consultorInformativos') renderInformativos();
    if (app.activeView === 'instaladorInformativos') renderInstaladorInformativos();
}

function openClientProfile(clientId) {
    const c = (app.state.clients || []).find(x => x.id === clientId);
    if (!c) return;
    const ph = (c.phone || '').replace(/\D/g, '');
    const history = c.contactHistory || [];
    const historyHtml = history.length
        ? history.slice().reverse().map(h => `
            <div class="history-entry">
                <span class="history-date">${h.date} ${h.time}</span>
                <p class="history-text">${esc(h.text)}</p>
            </div>`).join('')
        : '<p class="text-muted">Nenhuma anotação ainda.</p>';

    showModal(`Perfil: ${esc(c.name)}`, `
        <div class="profile-actions">
            ${ph ? `<a href="tel:+55${ph}" class="profile-action-btn">📞 Ligar</a>` : ''}
            ${ph && c.isWhatsapp ? `<a href="https://wa.me/55${ph}" target="_blank" class="profile-action-btn">💬 WhatsApp</a>` : ''}
            ${c.email ? `<a href="mailto:${esc(c.email)}" class="profile-action-btn">✉️ Email</a>` : ''}
            <button type="button" class="profile-action-btn" id="profileEditBtn">✏️ Editar</button>
            <button type="button" class="profile-action-btn" id="profileFormBtn">📝 Formulário</button>
        </div>

        <div class="profile-section">
            <strong>Dados pessoais</strong>
            <div class="profile-grid">
                <div class="profile-field"><span>Nome</span><strong>${esc(c.name)}</strong></div>
                ${c.cpf ? `<div class="profile-field"><span>CPF</span><strong>${esc(c.cpf)}</strong></div>` : ''}
                ${c.rg ? `<div class="profile-field"><span>RG</span><strong>${esc(c.rg)}</strong></div>` : ''}
                ${c.email ? `<div class="profile-field"><span>E-mail</span><strong>${esc(c.email)}</strong></div>` : ''}
                <div class="profile-field"><span>Telefone</span><strong>${esc(c.phone || '—')}${c.isWhatsapp ? ' 💬' : ''}</strong></div>
                ${c.address ? `<div class="profile-field" style="grid-column:1/-1"><span>Endereço</span><strong>${esc(c.address)}</strong></div>` : ''}
            </div>
        </div>

        <div class="profile-section">
            <strong>Contrato</strong>
            <div class="profile-grid">
                <div class="profile-field"><span>Plano</span><strong>${esc(c.plan || '—')}</strong></div>
                <div class="profile-field"><span>Mensalidade</span><strong>R$ ${formatCurrency(c.monthlyFee)}</strong></div>
                <div class="profile-field"><span>Melhor data pgto</span><strong>${esc(c.paymentDay || '—')}</strong></div>
                <div class="profile-field"><span>Etapa</span><strong>${esc(c.stage)}</strong></div>
                ${c.plates && c.plates.length ? `<div class="profile-field" style="grid-column:1/-1"><span>Placas</span><strong>${c.plates.map(p => esc(p)).join(', ')}</strong></div>` : ''}
                ${c.coupon ? `<div class="profile-field"><span>Cupom</span><strong>${esc(c.coupon)}</strong></div>` : ''}
            </div>
        </div>

        ${(c.need || (c.origin && c.origin.length)) ? `
        <div class="profile-section">
            <strong>Origem e necessidade</strong>
            <div class="profile-grid">
                ${c.origin && c.origin.length ? `<div class="profile-field"><span>Como soube</span><strong>${(Array.isArray(c.origin) ? c.origin : [c.origin]).map(o => esc(o)).join(', ')}</strong></div>` : ''}
                ${c.need ? `<div class="profile-field" style="grid-column:1/-1"><span>Necessidade</span><strong>${esc(c.need)}</strong></div>` : ''}
            </div>
        </div>` : ''}

        <div class="profile-section">
            <strong>Score de propensão</strong>
            <div style="display:flex;align-items:center;gap:14px;margin-top:10px;flex-wrap:wrap;">
                <div class="score-circle ${getScoreTemp(calcScore(c)).cls}" style="width:56px;height:56px;font-size:1.3rem;">${calcScore(c)}</div>
                <div>
                    <div style="font-size:1rem;font-weight:700;">${getScoreTemp(calcScore(c)).emoji} ${getScoreTemp(calcScore(c)).label}</div>
                    <button type="button" class="secondary-btn" id="profileScoreBtn" style="margin-top:6px;font-size:0.82rem;">📊 Ver checklist completo</button>
                </div>
            </div>
        </div>

        <div class="profile-section">
            <strong>Histórico de contatos</strong>
            <div id="historyList">${historyHtml}</div>
            <div class="field" style="margin-top:12px;">
                <label>Nova anotação</label>
                <textarea id="noteInput" rows="2" placeholder="Registre um contato, observação ou follow-up..." style="width:100%;resize:vertical;"></textarea>
            </div>
            <button type="button" class="primary-btn" id="saveNoteBtn" style="margin-top:8px;">📋 Salvar anotação</button>
        </div>
    `);
    document.getElementById('profileEditBtn').addEventListener('click', () => { closeModal(); openClientModal(clientId); });
    document.getElementById('profileScoreBtn').addEventListener('click', () => { closeModal(); openScoreModal(clientId); });
    document.getElementById('saveNoteBtn').addEventListener('click', () => handleAddNote(clientId));
    document.getElementById('profileFormBtn')?.addEventListener('click', () => { closeModal(); openSegmentFormModal(clientId); });
}

function handleAddNote(clientId) {
    const input = document.getElementById('noteInput');
    const text = input ? input.value.trim() : '';
    if (!text) return;
    const c = (app.state.clients || []).find(x => x.id === clientId);
    if (!c) return;
    if (!c.contactHistory) c.contactHistory = [];
    const now = new Date();
    c.contactHistory.push({
        id: 'h' + Date.now(),
        date: now.toLocaleDateString('pt-BR'),
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        text
    });
    saveState();
    const historyHtml = c.contactHistory.slice().reverse().map(h => `
        <div class="history-entry">
            <span class="history-date">${h.date} ${h.time}</span>
            <p class="history-text">${esc(h.text)}</p>
        </div>`).join('');
    document.getElementById('historyList').innerHTML = historyHtml;
    input.value = '';
}

function showModal(title, html) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'false');
}

function closeModal() {
    document.getElementById('modalBackdrop').classList.add('hidden');
    document.getElementById('modalBackdrop').setAttribute('aria-hidden', 'true');
    document.getElementById('modalContent').innerHTML = '';
}

/* ═══════════════════════════════════════════════════════════════════
   CONSULTOR CRUD
═══════════════════════════════════════════════════════════════════ */

function openConsultorModal(id = null) {
    app.editingConsultantId = id;
    const ed = id ? (app.state.users || []).find(u => u.id === id) : null;
    showModal(ed ? 'Editar consultor' : 'Novo consultor', `
        <form id="consultorForm" class="form-grid two-columns">
            <div class="form-section-title">Dados de acesso</div>
            <div class="field"><label>Nome *</label><input id="cName" type="text" value="${esc(ed?.name)}" required /></div>
            <div class="field"><label>E-mail *</label><input id="cEmail" type="email" value="${esc(ed?.email)}" required /></div>
            <div class="field"><label>Senha *</label><input id="cPass" type="text" value="${esc(ed?.password)}" required /></div>
            <div class="field"><label>WhatsApp</label><input id="cWa" type="tel" placeholder="(11) 99999-9999" value="${esc(ed?.whatsapp)}" /></div>
            <div class="form-section-title">Dados pessoais</div>
            <div class="field"><label>CPF</label><input id="cCpf" type="text" placeholder="000.000.000-00" value="${esc(ed?.cpf)}" /></div>
            <div class="field"><label>Chave Pix</label><input id="cPix" type="text" placeholder="CPF, e-mail ou celular" value="${esc(ed?.pixKey)}" /></div>
            <div class="field full-width"><label>Endereço completo</label><input id="cAddr" type="text" placeholder="Rua, nº, bairro, cidade/UF" value="${esc(ed?.address)}" /></div>
            <div class="actions full-width" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar</button>
                <button type="button" id="cancelConsultorBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="consultorFormError" class="error-text full-width"></div>
        </form>
    `);
    document.getElementById('cancelConsultorBtn').addEventListener('click', closeModal);
    document.getElementById('consultorForm').addEventListener('submit', handleConsultorSave);
}

function handleConsultorSave(e) {
    e.preventDefault();
    const name  = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim().toLowerCase();
    const pass  = document.getElementById('cPass').value.trim();
    const err   = document.getElementById('consultorFormError');
    err.textContent = '';
    if (!name || !email || !pass) { err.textContent = 'Nome, e-mail e senha são obrigatórios.'; return; }
    if ((app.state.users || []).some(u => u.email === email && u.id !== app.editingConsultantId)) {
        err.textContent = 'Já existe um usuário com este e-mail.'; return;
    }
    const extra = {
        whatsapp: document.getElementById('cWa').value.trim(),
        cpf:      document.getElementById('cCpf').value.trim(),
        pixKey:   document.getElementById('cPix').value.trim(),
        address:  document.getElementById('cAddr').value.trim()
    };
    if (app.editingConsultantId) {
        const u = app.state.users.find(u => u.id === app.editingConsultantId);
        Object.assign(u, { name, email, password: pass, ...extra });
    } else {
        app.state.users.push({ id: `consultor_${Date.now()}`, name, email, password: pass, role: 'consultor', ...extra });
    }
    saveState(); closeModal(); renderAppViews();
}

function deleteConsultor(id) {
    const u = (app.state.users || []).find(u => u.id === id);
    if (!u || !confirm(`Excluir o consultor ${u.name}? Os clientes vinculados também serão removidos.`)) return;
    app.state.users   = app.state.users.filter(u => u.id !== id);
    app.state.clients = app.state.clients.filter(c => c.consultantId !== id);
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   CLIENT CRUD
═══════════════════════════════════════════════════════════════════ */

function openClientModal(id = null) {
    app.editingClientId = id;
    const ed = id ? (app.state.clients || []).find(c => c.id === id) : null;
    const planOpts = planList.map(p => `<option value="${p.name}" ${(ed?.plan === p.name) ? 'selected' : ''}>${p.name}${p.price ? ' — R$ ' + p.price.toFixed(2).replace('.',',') : ' (personalizado)'}</option>`).join('');
    const prodOpts = productList.map(p => `<option value="${p.title}" ${ed?.product === p.title ? 'selected' : ''}>${p.title}</option>`).join('');
    const originChks = originOptions.map(o => `
        <label class="checkbox-label">
            <input type="checkbox" name="clientOrigin" value="${o}" ${(ed?.origins||[]).includes(o)?'checked':''} />
            <span>${o}</span>
        </label>`).join('');

    showModal(ed ? 'Editar cliente' : 'Novo cliente', `
        <form id="clientForm" class="form-grid two-columns">
            <div class="form-section-title">Dados do Cliente</div>
            <div class="field"><label>Nome *</label><input id="clName" type="text" value="${esc(ed?.name)}" required /></div>
            <div class="field">
                <label>Telefone *</label>
                <input id="clPhone" type="tel" value="${esc(ed?.phone)}" required />
                <label class="checkbox-label" style="margin-top:8px;"><input type="checkbox" id="clWa" ${ed?.isWhatsapp?'checked':''} /><span>É WhatsApp</span></label>
            </div>
            <div class="field"><label>E-mail</label><input id="clEmail" type="email" value="${esc(ed?.email)}" /></div>
            <div class="field"><label>CPF</label><input id="clCpf" type="text" placeholder="000.000.000-00" value="${esc(ed?.cpf)}" /></div>
            <div class="field"><label>RG</label><input id="clRg" type="text" placeholder="00.000.000-0" value="${esc(ed?.rg)}" /></div>
            <div class="field full-width"><label>Endereço completo</label><input id="clAddr" type="text" placeholder="Rua, nº, bairro, cidade/UF" value="${esc(ed?.address)}" /></div>

            <div class="form-section-title">Produto e Plano</div>
            <div class="field"><label>Produto *</label><select id="clProduct" required>${prodOpts}</select></div>
            <div class="field"><label>Plano *</label><select id="clPlan" required>${planOpts}</select></div>
            <div class="field"><label>Mensalidade (R$) *</label><input id="clFee" type="number" min="0" step="0.01" value="${ed?.monthlyFee ?? 44.90}" required /></div>
            <div class="field"><label>Melhor dia de pagamento</label><input id="clPayDay" type="number" min="1" max="28" placeholder="Ex: 10" value="${ed?.paymentDate ?? ''}" /></div>
            <div class="field"><label>Placas dos veículos</label><input id="clPlates" type="text" placeholder="ABC-1234, DEF-5678" value="${esc(ed?.plates)}" /></div>
            <div class="field"><label>Necessidade do cliente</label><input id="clNeed" type="text" placeholder="Ex: Segurança de frota" value="${esc(ed?.need)}" /></div>

            <div class="form-section-title">Origem e Desconto</div>
            <div class="field full-width">
                <label>Como ouviu falar da Tracktiv</label>
                <div class="checkbox-group">${originChks}</div>
            </div>
            <div class="field"><label>Cupom de desconto</label><input id="clCoupon" type="text" placeholder="Ex: BEMVINDO10" value="${esc(ed?.coupon)}" style="text-transform:uppercase;" /></div>

            <div class="field full-width"><label>Observações</label><textarea id="clNotes" rows="3">${esc(ed?.notes)}</textarea></div>

            <div class="actions full-width" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar</button>
                <button type="button" id="cancelClientBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="clientFormError" class="error-text full-width"></div>
        </form>
    `);
    document.getElementById('cancelClientBtn').addEventListener('click', closeModal);
    document.getElementById('clPlan').addEventListener('change', function() {
        const p = planList.find(p => p.name === this.value);
        if (p && p.price !== null) document.getElementById('clFee').value = p.price.toFixed(2);
    });
    document.getElementById('clientForm').addEventListener('submit', handleClientSave);
}

function handleClientSave(e) {
    e.preventDefault();
    const err = document.getElementById('clientFormError');
    err.textContent = '';
    const name    = document.getElementById('clName').value.trim();
    const phone   = document.getElementById('clPhone').value.trim();
    const fee     = Number(document.getElementById('clFee').value);
    if (!name || !phone || !fee) { err.textContent = 'Nome, telefone e mensalidade são obrigatórios.'; return; }
    const origins = [...document.querySelectorAll('input[name="clientOrigin"]:checked')].map(i => i.value);
    const fields = {
        name, phone,
        isWhatsapp: document.getElementById('clWa').checked,
        email:    document.getElementById('clEmail').value.trim(),
        cpf:      document.getElementById('clCpf').value.trim(),
        rg:       document.getElementById('clRg').value.trim(),
        address:  document.getElementById('clAddr').value.trim(),
        product:  document.getElementById('clProduct').value,
        plan:     document.getElementById('clPlan').value,
        monthlyFee: fee,
        paymentDate: Number(document.getElementById('clPayDay').value) || null,
        plates:   document.getElementById('clPlates').value.trim(),
        need:     document.getElementById('clNeed').value.trim(),
        origins,
        coupon:   document.getElementById('clCoupon').value.trim().toUpperCase(),
        notes:    document.getElementById('clNotes').value.trim()
    };
    if (app.editingClientId) {
        const c = app.state.clients.find(c => c.id === app.editingClientId);
        Object.assign(c, fields);
    } else {
        const newClient = {
            id: `client_${Date.now()}`,
            consultantId: null,
            instaladorId: null,
            stage: 'Novo Lead',
            createdAt: todayISO(),
            ...fields
        };
        if (app.currentUser.role === 'instalador') {
            newClient.instaladorId = app.currentUser.id;
        } else {
            newClient.consultantId = app.currentUser.id;
        }
        app.state.clients.push(newClient);
    }
    saveState(); closeModal(); renderAppViews();
}

function moveStage(id, dir) {
    const c = (app.state.clients || []).find(c => c.id === id);
    if (!c) return;
    const idx  = stageOrder.indexOf(c.stage);
    const next = stageOrder[Math.min(stageOrder.length - 1, Math.max(0, idx + dir))];
    updateClientStage(id, next);
}

function updateClientStage(id, stage) {
    const c = (app.state.clients || []).find(c => c.id === id);
    if (!c) return;
    if (stage === 'Fechado' && app.currentUser.role !== 'gestor') {
        if (c.awaitingApproval) { alert('Este cliente já está aguardando aprovação do gestor.'); return; }
        openProposalChecklist(id);
        return;
    }
    c.stage = stage;
    if (stage === 'Fechado') c.closedDate = todayISO();
    else { delete c.closedDate; delete c.awaitingApproval; }
    saveState(); renderAppViews();
}

function deleteClient(id) {
    const c = (app.state.clients || []).find(c => c.id === id);
    if (!c || !confirm(`Excluir cliente ${c.name}?`)) return;
    app.state.clients = app.state.clients.filter(c => c.id !== id);
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   INSTALADOR CRUD
═══════════════════════════════════════════════════════════════════ */

function openInstaladorModal(id = null) {
    app.editingInstaladorId = id;
    const ed = id ? (app.state.users || []).find(u => u.id === id) : null;
    showModal(ed ? 'Editar instalador' : 'Novo instalador', `
        <form id="instaladorForm" class="form-grid two-columns">
            <div class="form-section-title">Dados de acesso</div>
            <div class="field"><label>Nome *</label><input id="iName" type="text" value="${esc(ed?.name)}" required /></div>
            <div class="field"><label>E-mail *</label><input id="iEmail" type="email" value="${esc(ed?.email)}" required /></div>
            <div class="field"><label>Senha *</label><input id="iPass" type="text" value="${esc(ed?.password)}" required /></div>
            <div class="field"><label>WhatsApp *</label><input id="iWa" type="tel" placeholder="(11) 99999-9999" value="${esc(ed?.whatsapp)}" required /></div>
            <div class="form-section-title">Dados pessoais e loja</div>
            <div class="field"><label>CPF *</label><input id="iCpf" type="text" placeholder="000.000.000-00" value="${esc(ed?.cpf)}" required /></div>
            <div class="field"><label>Nome da loja física *</label><input id="iStore" type="text" placeholder="Ex: Moto Peças João" value="${esc(ed?.storeName)}" required /></div>
            <div class="field"><label>Chave Pix</label><input id="iPix" type="text" placeholder="CPF, e-mail ou celular" value="${esc(ed?.pixKey)}" /></div>
            <div class="field full-width"><label>Endereço completo</label><input id="iAddr" type="text" placeholder="Rua, nº, bairro, cidade/UF" value="${esc(ed?.address)}" /></div>
            <div class="actions full-width" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar</button>
                <button type="button" id="cancelInstaladorBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="instaladorFormError" class="error-text full-width"></div>
        </form>
    `);
    document.getElementById('cancelInstaladorBtn').addEventListener('click', closeModal);
    document.getElementById('instaladorForm').addEventListener('submit', handleInstaladorSave);
}

function handleInstaladorSave(e) {
    e.preventDefault();
    const name  = document.getElementById('iName').value.trim();
    const email = document.getElementById('iEmail').value.trim().toLowerCase();
    const pass  = document.getElementById('iPass').value.trim();
    const cpf   = document.getElementById('iCpf').value.trim();
    const store = document.getElementById('iStore').value.trim();
    const err   = document.getElementById('instaladorFormError');
    err.textContent = '';
    if (!name || !email || !pass || !cpf || !store) { err.textContent = 'Preencha todos os campos obrigatórios.'; return; }
    if ((app.state.users || []).some(u => u.email === email && u.id !== app.editingInstaladorId)) {
        err.textContent = 'Já existe um usuário com este e-mail.'; return;
    }
    const data = {
        name, email, password: pass, cpf, storeName: store,
        whatsapp: document.getElementById('iWa').value.trim(),
        pixKey:   document.getElementById('iPix').value.trim(),
        address:  document.getElementById('iAddr').value.trim()
    };
    if (app.editingInstaladorId) {
        Object.assign(app.state.users.find(u => u.id === app.editingInstaladorId), data);
    } else {
        app.state.users.push({ id: `instalador_${Date.now()}`, role: 'instalador', ...data });
    }
    saveState(); closeModal(); renderAppViews();
}

function deleteInstalador(id) {
    const u = (app.state.users || []).find(u => u.id === id);
    if (!u || !confirm(`Excluir o instalador ${u.name}? Clientes e instalações vinculados também serão removidos.`)) return;
    app.state.users         = app.state.users.filter(u => u.id !== id);
    app.state.clients       = app.state.clients.filter(c => c.instaladorId !== id);
    app.state.installations = (app.state.installations || []).filter(i => i.instaladorId !== id);
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   INSTALLATION CRUD
═══════════════════════════════════════════════════════════════════ */

function openInstallationModal(id = null) {
    app.editingInstallId = id;
    const ed = id ? (app.state.installations || []).find(i => i.id === id) : null;
    const instaladores = (app.state.users || []).filter(u => u.role === 'instalador');
    if (!instaladores.length) { alert('Cadastre ao menos um instalador primeiro.'); return; }
    const instOpts = instaladores.map(u => `<option value="${u.id}" ${ed?.instaladorId === u.id ? 'selected' : ''}>${esc(u.name)} — ${esc(u.storeName || '')}</option>`).join('');
    showModal(ed ? 'Editar instalação' : 'Registrar instalação', `
        <form id="installForm" class="form-grid">
            <div class="field"><label>Instalador *</label><select id="instInst" required>${instOpts}</select></div>
            <div class="field"><label>Nome do cliente *</label><input id="instClient" type="text" value="${esc(ed?.clientName)}" required /></div>
            <div class="field"><label>Placa do veículo *</label><input id="instPlate" type="text" placeholder="ABC-1234" value="${esc(ed?.plate)}" required /></div>
            <div class="field"><label>Data da instalação *</label><input id="instDate" type="date" value="${ed?.date || todayISO()}" required /></div>
            <div class="field"><label>Observações</label><textarea id="instNotes" rows="2">${esc(ed?.notes)}</textarea></div>
            <div class="actions" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar — R$ ${INSTALL_FEE},00</button>
                <button type="button" id="cancelInstallBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="installFormError" class="error-text"></div>
        </form>
    `);
    document.getElementById('cancelInstallBtn').addEventListener('click', closeModal);
    document.getElementById('installForm').addEventListener('submit', handleInstallationSave);
}

function handleInstallationSave(e) {
    e.preventDefault();
    const err = document.getElementById('installFormError');
    err.textContent = '';
    const instaladorId = document.getElementById('instInst').value;
    const clientName   = document.getElementById('instClient').value.trim();
    const plate        = document.getElementById('instPlate').value.trim().toUpperCase();
    const date         = document.getElementById('instDate').value;
    if (!clientName || !plate || !date) { err.textContent = 'Preencha todos os campos obrigatórios.'; return; }
    const data = { instaladorId, clientName, plate, date, notes: document.getElementById('instNotes').value.trim() };
    if (app.editingInstallId) {
        Object.assign((app.state.installations || []).find(i => i.id === app.editingInstallId), data);
    } else {
        app.state.installations = app.state.installations || [];
        app.state.installations.push({ id: `install_${Date.now()}`, ...data });
    }
    saveState(); closeModal(); renderAppViews();
}

function deleteInstallation(id) {
    if (!confirm('Excluir esta instalação?')) return;
    app.state.installations = (app.state.installations || []).filter(i => i.id !== id);
    saveState(); renderAppViews();
}

/* ═══════════════════════════════════════════════════════════════════
   COUPON CRUD
═══════════════════════════════════════════════════════════════════ */

function openCouponModal(id = null) {
    app.editingCouponId = id;
    const ed = id ? (app.state.coupons || []).find(c => c.id === id) : null;
    showModal(ed ? 'Editar cupom' : 'Novo cupom', `
        <form id="couponForm" class="form-grid">
            <div class="field"><label>Código do cupom *</label><input id="cpCode" type="text" placeholder="Ex: BEMVINDO10" value="${esc(ed?.code)}" required style="text-transform:uppercase;" /></div>
            <div class="field">
                <label>Tipo de desconto *</label>
                <select id="cpType">
                    <option value="percentage" ${ed?.discountType === 'percentage' ? 'selected' : ''}>Percentual (%)</option>
                    <option value="fixed"      ${ed?.discountType === 'fixed'      ? 'selected' : ''}>Valor fixo (R$)</option>
                </select>
            </div>
            <div class="field"><label>Valor do desconto *</label><input id="cpValue" type="number" min="0" step="0.01" placeholder="Ex: 10" value="${ed?.discountValue ?? ''}" required /></div>
            <div class="field"><label>Nome do indicador</label><input id="cpDesc" type="text" placeholder="Ex: João Silva ou promo de lançamento" value="${esc(ed?.description)}" /></div>
            <div class="field">
                <label class="checkbox-label" style="font-size:1rem;">
                    <input type="checkbox" id="cpActive" ${(!ed || ed.active) ? 'checked' : ''} />
                    <span>Cupom ativo</span>
                </label>
            </div>
            <div class="actions" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar</button>
                <button type="button" id="cancelCouponBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="couponFormError" class="error-text"></div>
        </form>
    `);
    document.getElementById('cancelCouponBtn').addEventListener('click', closeModal);
    document.getElementById('couponForm').addEventListener('submit', handleCouponSave);
}

function handleCouponSave(e) {
    e.preventDefault();
    const err = document.getElementById('couponFormError');
    err.textContent = '';
    const code  = document.getElementById('cpCode').value.trim().toUpperCase();
    const value = Number(document.getElementById('cpValue').value);
    if (!code || !value) { err.textContent = 'Código e valor são obrigatórios.'; return; }
    if ((app.state.coupons || []).some(c => c.code === code && c.id !== app.editingCouponId)) {
        err.textContent = 'Já existe um cupom com este código.'; return;
    }
    const data = {
        code,
        discountType:  document.getElementById('cpType').value,
        discountValue: value,
        description:   document.getElementById('cpDesc').value.trim(),
        active:        document.getElementById('cpActive').checked
    };
    app.state.coupons = app.state.coupons || [];
    if (app.editingCouponId) {
        Object.assign(app.state.coupons.find(c => c.id === app.editingCouponId), data);
    } else {
        app.state.coupons.push({ id: `coupon_${Date.now()}`, ...data });
    }
    saveState(); closeModal(); renderGestorCupons();
}

function deleteCoupon(id) {
    if (!confirm('Excluir este cupom?')) return;
    app.state.coupons = (app.state.coupons || []).filter(c => c.id !== id);
    saveState(); renderGestorCupons();
}

/* ═══════════════════════════════════════════════════════════════════
   SIMULADOR DE GANHOS
═══════════════════════════════════════════════════════════════════ */

function _simComputeAndRender() {
    const area    = document.getElementById('simArea');
    if (!area) return;
    const sales   = parseInt(document.getElementById('simSales')?.value  || 0);
    const plan    = document.getElementById('simPlan')?.value            || planList[0].name;
    const clients = parseInt(document.getElementById('simClients')?.value || 0);
    const hasRef  = document.getElementById('simHasRef')?.checked        || false;
    const refSales = parseInt(document.getElementById('simRefSales')?.value || 0);

    if (document.getElementById('simSalesVal'))   document.getElementById('simSalesVal').textContent   = sales;
    if (document.getElementById('simClientsVal')) document.getElementById('simClientsVal').textContent = clients;
    if (document.getElementById('simRefSalesVal'))document.getElementById('simRefSalesVal').textContent = refSales;
    if (document.getElementById('simRefArea'))    document.getElementById('simRefArea').style.display = hasRef ? 'block' : 'none';

    const planObj   = planList.find(p => p.name === plan) || planList[0];
    const planPrice = planObj.price || 0;
    const pct       = computeCommissionPercent(sales);
    const salesComm = sales * SALE_COMMISSION;

    const recActive = clients >= 5 && sales >= 2;
    const recValue  = recActive ? clients * planPrice * (pct / 100) : 0;

    let refBonus = 0, refBonusPct = 0;
    if (hasRef && refSales >= 2) {
        refBonusPct = refSales >= 15 ? 7 : refSales >= 10 ? 5 : refSales >= 5 ? 3 : 1;
        refBonus    = (refSales * planPrice) * (refBonusPct / 100);
    }
    const total = salesComm + recValue + refBonus;

    // Projeção de 3, 6 e 12 meses mantendo o ritmo atual.
    // Clientes existentes são tratados como elegíveis; novos clientes levam alguns meses para gerar recorrência.
    const planGrace = getGracePeriodMonths(plan);
    function projectMonths(horizonte) {
        let acc = 0;
        for (let m = 1; m <= horizonte; m++) {
            acc += sales * SALE_COMMISSION;
            const totalClients = clients + sales * m;
            if (totalClients >= 5 && sales >= 2) {
                const newEligible = Math.max(0, m - planGrace) * sales;
                const eligibleClients = clients + newEligible;
                acc += eligibleClients * planPrice * (pct / 100);
            }
        }
        return acc;
    }
    const proj3  = projectMonths(3);
    const proj6  = projectMonths(6);
    const proj12 = projectMonths(12);

    let trakComment;
    if (total === 0)       trakComment = 'Use os controles acima para simular seus ganhos. Cada venda conta! 🚀';
    else if (total < 500)  trakComment = `Com R$ ${formatCurrency(total)}/mês você está começando bem. Mantenha o ritmo e a recorrência vai crescer junto! 💪`;
    else if (total < 1500) trakComment = `Ótimo! R$ ${formatCurrency(total)}/mês já é um belo salário extra. Em 6 meses você pode chegar em R$ ${formatCurrency(proj6)}! 🔥`;
    else                   trakComment = `Impressionante! R$ ${formatCurrency(total)}/mês — você está no nível ouro. Em 12 meses, projeção de R$ ${formatCurrency(proj12)}! 🏆🚀`;

    let recTip = '';
    if (!recActive) {
        const nc = Math.max(0, 5 - clients), ns = Math.max(0, 2 - sales);
        const parts = [];
        if (nc > 0) parts.push(`${nc} cliente${nc > 1 ? 's' : ''} ativo${nc > 1 ? 's' : ''}`);
        if (ns > 0) parts.push(`${ns} venda${ns > 1 ? 's' : ''}`);
        if (parts.length) recTip = `Faltam ${parts.join(' e ')} para ativar a recorrência.`;
    }

    area.innerHTML = `
        <div class="sim-breakdown">
            <div class="sim-breakdown-row"><span>Comissão de vendas (${sales} × R$ 50,00)</span><span class="sim-breakdown-val">R$ ${formatCurrency(salesComm)}</span></div>
            <div class="sim-breakdown-row"><span>Recorrência ${recActive ? `✓ ativa (${pct}%)` : '✗ pausada'}</span><span class="sim-breakdown-val" style="color:${recActive?'var(--success)':'var(--text-soft)'};">R$ ${formatCurrency(recValue)}</span></div>
            ${hasRef ? `<div class="sim-breakdown-row"><span>Bônus de indicação (${refBonusPct}%)</span><span class="sim-breakdown-val">R$ ${formatCurrency(refBonus)}</span></div>` : ''}
            <div class="sim-breakdown-row" style="font-weight:700;font-size:1.05rem;"><span>Total estimado / mês</span><span class="sim-breakdown-val">R$ ${formatCurrency(total)}</span></div>
        </div>
        ${recTip ? `<div style="margin-top:10px;font-size:0.82rem;color:var(--warning);font-weight:600;">⚡ ${recTip}</div>` : ''}
        ${sales > 0 ? `
        <div style="margin-top:16px;">
            <h4 style="margin:0 0 10px;font-size:0.95rem;">📈 Projeção mantendo o ritmo atual</h4>
            <div class="sim-breakdown">
                <div class="sim-breakdown-row"><span>Em 3 meses</span><span class="sim-breakdown-val">R$ ${formatCurrency(proj3)}</span></div>
                <div class="sim-breakdown-row"><span>Em 6 meses</span><span class="sim-breakdown-val">R$ ${formatCurrency(proj6)}</span></div>
                <div class="sim-breakdown-row" style="font-weight:700;"><span>Em 12 meses</span><span class="sim-breakdown-val">R$ ${formatCurrency(proj12)}</span></div>
            </div>
            <p style="font-size:0.8rem;color:var(--text-soft);margin:8px 0 0;">Projeção acumulada considerando crescimento da base e recorrência sobre clientes ativos.</p>
        </div>` : ''}
        <div class="sim-trak-area">
            <div class="trak-bubble"><div class="trak-avatar">🤖</div><div class="trak-text">${trakComment}</div></div>
        </div>
        <button class="secondary-btn" id="simTipsBtn" style="margin-top:4px;">💡 Como aumentar meus ganhos?</button>
        <div id="simTipsArea" style="display:none;margin-top:12px;"></div>
    `;
    document.getElementById('simTipsBtn').addEventListener('click', () => {
        const ta = document.getElementById('simTipsArea');
        if (ta.style.display === 'none') {
            ta.style.display = 'block';
            ta.innerHTML = `<div class="card" style="margin:0;"><h4 style="margin:0 0 10px;">🚀 Dicas personalizadas do TRAK</h4><div class="sales-tips-list">
                <div class="sales-tip-item">💰 <strong>R$ 50 por venda:</strong> Cada venda fechada e aprovada vale R$ 50,00 independente do plano.</div>
                <div class="sales-tip-item">📈 <strong>Suba de faixa de recorrência:</strong> 2 vendas = 10%, 5 vendas = 18%, 10 vendas = 25% sobre clientes ativos.</div>
                <div class="sales-tip-item">👥 <strong>Base de clientes:</strong> 5+ clientes ativos + 2 vendas no mês ativam a recorrência mensal.</div>
                <div class="sales-tip-item">🤝 <strong>Indicação:</strong> Indique um consultor e ganhe 3%–7% sobre as vendas dele.</div>
                <div class="sales-tip-item">📋 <strong>Plano maior = recorrência maior:</strong> Foque em Profissional e Controle Total para maximizar ganhos mensais.</div>
                <div class="sales-tip-item">🔄 <strong>Follow-up:</strong> 80% das vendas acontecem no 5º contato. Use o funil!</div>
            </div></div>`;
        } else { ta.style.display = 'none'; }
    });
}

function renderSimulador() {
    const section = document.getElementById('consultorSimulador');
    if (!section) return;
    if (section.dataset.simInit) { _simComputeAndRender(); return; }
    section.dataset.simInit = '1';
    const planOptions = planList.filter(p => p.price).map(p =>
        `<option value="${esc(p.name)}">${esc(p.name)} — R$ ${p.price.toFixed(2).replace('.',',')}/mês</option>`
    ).join('');
    section.querySelector('#simControls').innerHTML = `
        <div class="sim-grid">
            <div class="sim-field">
                <label class="sim-label">Vendas previstas no mês <span class="sim-value-chip" id="simSalesVal">0</span></label>
                <input type="range" class="sim-slider" id="simSales" min="0" max="20" value="0">
            </div>
            <div class="sim-field">
                <label class="sim-label">Clientes ativos na base <span class="sim-value-chip" id="simClientsVal">0</span></label>
                <input type="range" class="sim-slider" id="simClients" min="0" max="50" value="0">
            </div>
            <div class="sim-field">
                <label class="sim-label">Plano predominante</label>
                <select id="simPlan" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;background:var(--bg);">${planOptions}</select>
            </div>
            <div class="sim-field">
                <label class="sim-label">Consultor indicado?</label>
                <div style="display:flex;align-items:center;gap:10px;margin-top:6px;">
                    <input type="checkbox" id="simHasRef" style="width:18px;height:18px;accent-color:var(--accent);">
                    <label for="simHasRef" style="font-size:0.9rem;">Sim, tenho um indicado</label>
                </div>
                <div id="simRefArea" style="display:none;margin-top:10px;">
                    <label class="sim-label">Vendas do indicado <span class="sim-value-chip" id="simRefSalesVal">0</span></label>
                    <input type="range" class="sim-slider" id="simRefSales" min="0" max="20" value="0">
                </div>
            </div>
        </div>
    `;
    ['simSales','simClients','simPlan'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input',  _simComputeAndRender);
        el.addEventListener('change', _simComputeAndRender);
    });
    document.getElementById('simHasRef').addEventListener('change', _simComputeAndRender);
    // simRefSales added dynamically — delegate via parent
    section.addEventListener('input', e => { if (e.target.id === 'simRefSales') _simComputeAndRender(); });
    _simComputeAndRender();
}

/* ═══════════════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════════════ */

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim().toLowerCase();
    const pass  = document.getElementById('passwordInput').value.trim();
    const errEl = document.getElementById('loginError');
    errEl.textContent = '';
    const user = (app.state.users || []).find(u => u.email === email && u.password === pass);
    if (!user) { errEl.textContent = 'E-mail ou senha incorretos.'; return; }
    app.currentUser = user;
    if (user.role === 'cliente') { showClientePortal(); } else { showApp(); }
}

function handleDemo() {
    app.state = JSON.parse(JSON.stringify(sampleState));
    saveState();
    document.getElementById('emailInput').value    = 'cliente@tracktiv.com';
    document.getElementById('passwordInput').value = 'Cliente123';
    document.getElementById('loginMessage').textContent = 'Demo carregado. Gestor: gestor@tracktiv.com / Gestor123 · Consultor: consultor@tracktiv.com / Consultor123 · Cliente: cliente@tracktiv.com / Cliente123';
    document.getElementById('loginError').textContent   = '';
}

/* ═══════════════════════════════════════════════════════════════════
   PORTAL DO CLIENTE
═══════════════════════════════════════════════════════════════════ */

function showClientePortal() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('clientePortal').classList.remove('hidden');
    document.getElementById('clienteNameLabel').textContent = app.currentUser.name;
    app.clienteNavState = { depth: 0, group: null, subGroup: null, subItem: null };
    renderClienteNav();
    renderClienteBreadcrumb();
    showClienteSection('clienteHome');
    renderClienteHome();

    // Hamburger para mobile no portal do cliente
    let hbC = document.getElementById('hamburgerBtnCliente');
    if (!hbC) {
        hbC = document.createElement('button');
        hbC.id = 'hamburgerBtnCliente'; hbC.className = 'hamburger-btn'; hbC.innerHTML = '☰';
        hbC.setAttribute('aria-label', 'Menu');
        const brandEl = document.querySelector('#clientePortal .topbar .brand');
        if (brandEl) brandEl.prepend(hbC);
    }
    hbC.onclick = () => {
        const mg = document.querySelector('#clientePortal .main-grid');
        if (mg) mg.classList.toggle('sidebar-open');
    };

    let ovC = document.getElementById('sidebarOverlayCliente');
    if (!ovC) {
        ovC = document.createElement('div');
        ovC.id = 'sidebarOverlayCliente'; ovC.className = 'sidebar-overlay';
        const mg = document.querySelector('#clientePortal .main-grid');
        if (mg) mg.appendChild(ovC);
    }
    ovC.onclick = () => {
        const mg = document.querySelector('#clientePortal .main-grid');
        if (mg) mg.classList.remove('sidebar-open');
    };

    // Avatar no user-chip do cliente
    const uname = app.currentUser.name;
    const chip = document.getElementById('clienteNameLabel')?.closest('.user-chip');
    if (chip) chip.innerHTML = `<div class="user-avatar">${esc(uname.charAt(0).toUpperCase())}</div><strong>${esc(uname)}</strong>`;
}

/* ═══ PORTAL DO CLIENTE — NAVEGAÇÃO HIERÁRQUICA ═══ */

function showClienteSection(id) {
    document.querySelectorAll('#clientePortal .section').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}

function renderClienteBreadcrumb() {
    const bar = document.getElementById('clienteBreadcrumb');
    if (!bar) return;
    const ns = app.clienteNavState;
    const u = app.currentUser;
    const parts = [{ label: 'Portal', fn: null }];
    if (ns.group) {
        const groupLabels = { servicos: '📦 Meus Serviços', indicacao: '🎁 Indicações', documentos: '📁 Documentos' };
        parts.push({ label: groupLabels[ns.group] || ns.group, fn: ns.subGroup ? () => clienteNavTo(1, ns.group) : null });
    }
    if (ns.subGroup) {
        const svc = SERVICE_MAP.find(s => s.key === ns.subGroup);
        if (svc) parts.push({ label: `${svc.icon} ${svc.label}`, fn: ns.subItem ? () => clienteNavTo(2, ns.group, ns.subGroup) : null });
    }
    if (ns.subItem) {
        const labels = { form: '📝 Formulário', docs: '📎 Documentos', veiculos: '🚗 Veículos' };
        parts.push({ label: labels[ns.subItem] || ns.subItem, fn: null });
    }
    if (parts.length <= 1) { bar.innerHTML = ''; return; }
    bar.innerHTML = parts.map((p, i) => {
        const isLast = i === parts.length - 1;
        const sep = i > 0 ? `<span class="bc-sep">›</span>` : '';
        if (isLast) return `${sep}<span class="bc-item active">${esc(p.label)}</span>`;
        if (p.fn) return `${sep}<button class="bc-item" onclick="(${p.fn.toString()})()">${esc(p.label)}</button>`;
        return `${sep}<span class="bc-item dimmed">${esc(p.label)}</span>`;
    }).join('');
}

function clienteNavTo(depth, group, subGroup, subItem) {
    app.clienteNavState = { depth: depth || 0, group: group || null, subGroup: subGroup || null, subItem: subItem || null };
    renderClienteNav();
    renderClienteBreadcrumb();
}

function renderClienteNav() {
    const tabs = document.getElementById('clienteTabs');
    if (!tabs) return;
    tabs.innerHTML = '';
    const u = app.currentUser;
    const contracted = u.contractedServices || [];
    const ns = app.clienteNavState;

    const mkBtn = (icon, label, hasChevron, isActive, incomplete, onClick) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tab' + (isActive ? ' active' : '');
        const badge = incomplete ? `<span class="nav-badge" style="background:#dc3545;margin-left:auto;">!</span>` : '';
        const chev = hasChevron ? `<span class="nav-chevron">›</span>` : '';
        btn.innerHTML = `<span style="font-size:1.1rem;flex-shrink:0;">${icon}</span><span>${esc(label)}</span>${badge}${chev}`;
        btn.addEventListener('click', onClick);
        return btn;
    };

    const mkBack = (label, onClick) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tab nav-back';
        btn.innerHTML = `<span>←</span><span>${esc(label)}</span>`;
        btn.addEventListener('click', onClick);
        return btn;
    };

    if (ns.depth === 0) {
        // Level 1: root
        tabs.appendChild(mkBtn('🏠', 'Início', false, !ns.group, false, () => {
            clienteNavTo(0); showClienteSection('clienteHome'); renderClienteHome();
        }));
        if (contracted.length > 0) {
            const hasIncomplete = contracted.some(k => {
                const s = SERVICE_MAP.find(sv => sv.key === k);
                if (!s) return false;
                const fs = (app.state.segmentForms || {})[`${u.id}_${k}`] || { data: {} };
                return calcSegmentProgress(s.product, fs.data || {}) < 100;
            });
            tabs.appendChild(mkBtn('📦', 'Meus Serviços', true, ns.group === 'servicos', hasIncomplete, () => {
                clienteNavTo(1, 'servicos');
            }));
        }
        tabs.appendChild(mkBtn('🎁', 'Indicações', true, ns.group === 'indicacao', false, () => {
            clienteNavTo(1, 'indicacao');
        }));
        tabs.appendChild(mkBtn('📁', 'Documentos', true, ns.group === 'documentos', false, () => {
            clienteNavTo(1, 'documentos');
        }));

    } else if (ns.depth === 1 && ns.group === 'servicos') {
        tabs.appendChild(mkBack('Meus Serviços', () => clienteNavTo(0)));
        contracted.forEach(key => {
            const svc = SERVICE_MAP.find(s => s.key === key);
            if (!svc) return;
            const fs = (app.state.segmentForms || {})[`${u.id}_${key}`] || { data: {} };
            const incomplete = calcSegmentProgress(svc.product, fs.data || {}) < 100;
            tabs.appendChild(mkBtn(svc.icon, svc.label, true, ns.subGroup === key, incomplete, () => {
                clienteNavTo(2, 'servicos', key);
                showClienteSection(svc.sectionId);
                renderClienteServiceMenu(key);
            }));
        });

    } else if (ns.depth === 2 && ns.group === 'servicos') {
        const svc = SERVICE_MAP.find(s => s.key === ns.subGroup);
        tabs.appendChild(mkBack(svc ? `${svc.icon} ${svc.label}` : 'Voltar', () => clienteNavTo(1, 'servicos')));
        const subItems = [
            { id: 'form', label: 'Formulário de Dados', icon: '📝' },
            { id: 'docs', label: 'Documentos', icon: '📎' }
        ];
        if (ns.subGroup === 'rastreamento') subItems.splice(1, 0, { id: 'veiculos', label: 'Meus Veículos', icon: '🚗' });
        subItems.forEach(si => {
            tabs.appendChild(mkBtn(si.icon, si.label, false, ns.subItem === si.id, false, () => {
                clienteNavTo(3, 'servicos', ns.subGroup, si.id);
                if (svc) showClienteSection(svc.sectionId);
                renderClienteSubItem(ns.subGroup, si.id);
            }));
        });

    } else if (ns.depth === 1 && ns.group === 'indicacao') {
        tabs.appendChild(mkBack('Indicações', () => clienteNavTo(0)));
        [
            { id: 'codigo',    label: 'Meu Código', icon: '🔗' },
            { id: 'minhas',    label: 'Minhas Indicações', icon: '📋' },
            { id: 'pontos',    label: 'Meus Pontos', icon: '⭐' },
            { id: 'resgatar',  label: 'Resgatar Pontos', icon: '🎁' }
        ].forEach(si => {
            tabs.appendChild(mkBtn(si.icon, si.label, false, ns.subItem === si.id, false, () => {
                app.clienteNavState.subItem = si.id;
                renderClienteBreadcrumb();
                renderClienteNavigation();
                showClienteSection('clienteIndicacao');
                renderClienteIndicacaoSub(si.id);
            }));
        });

    } else if (ns.depth === 1 && ns.group === 'documentos') {
        tabs.appendChild(mkBack('Documentos', () => clienteNavTo(0)));
        [
            { id: 'todos',     label: 'Todos os Documentos', icon: '📁' },
            { id: 'pendentes', label: 'Pendentes', icon: '🔴' },
            { id: 'concluidos',label: 'Concluídos', icon: '✅' }
        ].forEach(si => {
            tabs.appendChild(mkBtn(si.icon, si.label, false, ns.subItem === si.id, false, () => {
                app.clienteNavState.subItem = si.id;
                renderClienteBreadcrumb();
                showClienteSection('clienteFormulario');
                renderClienteDocsList(si.id);
            }));
        });
    }
}

function renderClienteNavigation() {
    // stub — called to refresh after subItem change
}

function renderClienteSection(viewId, serviceKey) {
    // legacy compat — not used in hierarchical nav
    if (serviceKey) { renderClienteService(serviceKey); return; }
    const map = { clienteHome: renderClienteHome, clienteIndicacao: renderClienteIndicacao };
    if (map[viewId]) map[viewId]();
}

function renderClienteServiceMenu(serviceKey) {
    // Shows overview of a service at depth 2 — wait for sub-item selection
    const svc = SERVICE_MAP.find(s => s.key === serviceKey);
    if (!svc) return;
    const el = document.getElementById(svc.sectionId);
    if (!el) return;
    const u = app.currentUser;
    const formKey = `${u.id}_${serviceKey}`;
    const fs = (app.state.segmentForms || {})[formKey] || { data: {} };
    const progress = calcSegmentProgress(svc.product, fs.data || {});
    const slots = ((app.state.docSlots || {})[u.id] || []).filter(sl => sl.serviceKey === serviceKey);
    const slotsFilled = slots.filter(sl => sl.docId).length;
    el.innerHTML = `
        <div class="section-header"><div><h2>${svc.icon} ${esc(svc.label)}</h2><p>Selecione uma seção no menu lateral.</p></div></div>
        <div class="cards-grid">
            <div class="card" style="cursor:pointer;" onclick="clienteNavTo(3,'servicos','${serviceKey}','form');renderClienteNav();renderClienteBreadcrumb();document.querySelectorAll('#clientePortal .section').forEach(s=>s.classList.remove('active'));document.getElementById('${svc.sectionId}').classList.add('active');renderClienteSubItem('${serviceKey}','form');">
                <h3>📝 Formulário de Dados</h3>
                <div class="metric" style="font-size:1.6rem;color:${progress===100?'#10b981':'var(--accent)'};">${progress}%</div>
                <div class="seg-progress-track" style="margin-top:8px;"><div class="seg-progress-fill" style="width:${progress}%;${progress===100?'background:linear-gradient(90deg,#10b981,#059669);':''}"></div></div>
                <small style="margin-top:6px;display:block;">${progress<100?'🔴 Incompleto':'✅ Completo'}</small>
            </div>
            <div class="card" style="cursor:pointer;" onclick="clienteNavTo(3,'servicos','${serviceKey}','docs');renderClienteNav();renderClienteBreadcrumb();document.querySelectorAll('#clientePortal .section').forEach(s=>s.classList.remove('active'));document.getElementById('${svc.sectionId}').classList.add('active');renderClienteSubItem('${serviceKey}','docs');">
                <h3>📎 Documentos</h3>
                <div class="metric" style="font-size:1.6rem;">${slotsFilled}/${slots.length}</div>
                <small style="margin-top:6px;display:block;">${slots.length===0?'Sem slots configurados':slotsFilled<slots.length?`🔴 ${slots.length-slotsFilled} pendente(s)`:'✅ Todos disponíveis'}</small>
            </div>
            ${serviceKey==='rastreamento'?`
            <div class="card" style="cursor:pointer;" onclick="clienteNavTo(3,'servicos','rastreamento','veiculos');renderClienteNav();renderClienteBreadcrumb();document.querySelectorAll('#clientePortal .section').forEach(s=>s.classList.remove('active'));document.getElementById('clienteRastreamento').classList.add('active');renderClienteSubItem('rastreamento','veiculos');">
                <h3>🚗 Meus Veículos</h3>
                <div class="metric" style="font-size:1.6rem;">${((fs.data||{}).vehicles||[]).length}</div>
                <small>cadastrado(s)</small>
            </div>`:''}
        </div>`;
}

function renderClienteSubItem(serviceKey, subItem) {
    const svc = SERVICE_MAP.find(s => s.key === serviceKey);
    if (!svc) return;
    const el = document.getElementById(svc.sectionId);
    if (!el) return;
    if (subItem === 'form')     renderClienteServiceForm(serviceKey, el, svc);
    if (subItem === 'docs')     renderClienteServiceDocs(serviceKey, el, svc);
    if (subItem === 'veiculos') renderClienteVehicles(el);
}

function renderClienteHome() {
    const u = app.currentUser;
    const crm = (app.state.clients || []).find(c => c.id === u.clientId);
    const docs = (app.state.clientDocuments || []).filter(d => d.clientId === u.clientId);
    const refs = (app.state.clientReferrals || []).filter(r => r.clientUserId === u.id);
    const approvedRefs = refs.filter(r => r.status === 'approved').length;
    const contracted = u.contractedServices || [];
    const el = document.getElementById('clienteHome');

    const servicesProgress = SERVICE_MAP.filter(s => contracted.includes(s.key)).map(s => {
        const formKey = `${u.id}_${s.key}`;
        const fs = (app.state.segmentForms || {})[formKey] || { data: {} };
        const prog = calcSegmentProgress(s.product, fs.data || {});
        return { ...s, progress: prog, submitted: fs.submitted };
    });
    const hasIncomplete = servicesProgress.some(s => s.progress < 100);
    const chkItems = (app.state.docChecklists || {})[u.id] || [];
    const chkDone = chkItems.filter(i => i.done).length;
    const chkTotal = chkItems.length;
    const chkPct = chkTotal > 0 ? Math.round(chkDone / chkTotal * 100) : 100;
    const hasPendingDocs = chkTotal > 0 && chkDone < chkTotal;
    const hasAnyAlert = hasIncomplete || hasPendingDocs;

    el.innerHTML = `
        <div class="section-header">
            <div><h2>Bem-vindo, ${esc(u.name)}!</h2>
            <p>Seu portal de documentos, serviços e indicações Tracktiv.</p></div>
        </div>
        ${hasAnyAlert ? `<div style="background:#fff3cd;border:1.5px solid #ffc107;border-radius:14px;padding:14px 18px;margin-bottom:16px;font-size:0.9rem;">🔴 <strong>Ação necessária:</strong>${hasIncomplete ? ' Formulários incompletos.' : ''}${hasPendingDocs ? ` ${chkTotal - chkDone} documento${chkTotal - chkDone > 1 ? 's' : ''} pendente${chkTotal - chkDone > 1 ? 's' : ''} no checklist.` : ''}</div>` : ''}
        <div class="cards-grid" style="margin-bottom:16px;">
            <div class="card"><h3>Plano atual</h3><div class="metric" style="font-size:1.4rem;">${esc(crm?.plan || '—')}</div><small>${crm ? `R$ ${formatCurrency(crm.monthlyFee)}/mês` : ''}</small></div>
            <div class="card"><h3>Documentos disponíveis</h3><div class="metric">${docs.length}</div><small>em todos os serviços</small></div>
            <div class="card"><h3>Pontos acumulados</h3><div class="metric" style="color:var(--accent);">${u.points || 0}</div><small>${approvedRefs} indicação${approvedRefs !== 1 ? 'ões' : ''} aprovada${approvedRefs !== 1 ? 's' : ''}</small></div>
        </div>
        ${contracted.length === 0 ? `
        <div class="card" style="text-align:center;padding:40px 24px;">
            <div style="font-size:2.5rem;margin-bottom:12px;">⚙️</div>
            <h3>Aguardando configuração pelo consultor</h3>
            <p class="text-muted">Seus serviços ainda não foram configurados. Em breve seu consultor liberará o acesso ao portal.</p>
        </div>` : `
        <div class="card" style="margin-bottom:16px;">
            <h3 style="margin:0 0 16px;">Meus serviços</h3>
            ${servicesProgress.map(s => `
                <div style="margin-bottom:16px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <span style="font-size:0.95rem;">${s.icon} <strong>${esc(s.label)}</strong>
                            ${s.progress < 100 ? ` <span style="color:#dc3545;font-size:0.78rem;font-weight:700;">🔴 Incompleto</span>` : s.submitted ? ` <span style="color:#10b981;font-size:0.78rem;font-weight:700;">✅ Enviado</span>` : ` <span style="color:#10b981;font-size:0.78rem;font-weight:700;">✅ Completo</span>`}
                        </span>
                        <strong style="color:${s.progress === 100 ? '#10b981' : 'var(--accent)'};">${s.progress}%</strong>
                    </div>
                    <div class="seg-progress-track"><div class="seg-progress-fill" style="width:${s.progress}%;${s.progress === 100 ? 'background:linear-gradient(90deg,#10b981,#059669);' : ''}"></div></div>
                </div>`).join('')}
        </div>
        ${chkTotal > 0 ? `
        <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
                <h3 style="margin:0;">📋 Documentos Necessários</h3>
                <span style="font-size:0.85rem;color:var(--text-soft);">${chkDone} de ${chkTotal} entregues</span>
            </div>
            <div class="seg-progress-wrap" style="margin-bottom:${hasPendingDocs ? 12 : 0}px;">
                <div class="seg-progress-label"><span>Progresso geral</span><strong style="color:${chkPct === 100 ? '#10b981' : 'var(--accent)'};">${chkPct}%</strong></div>
                <div class="seg-progress-track"><div class="seg-progress-fill" style="width:${chkPct}%;${chkPct === 100 ? 'background:linear-gradient(90deg,#10b981,#059669);' : ''}"></div></div>
            </div>
            ${hasPendingDocs ? `<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:0.85rem;">🔴 Você tem <strong>${chkTotal - chkDone}</strong> documento${chkTotal - chkDone > 1 ? 's' : ''} pendente${chkTotal - chkDone > 1 ? 's' : ''}. Entre em contato com seu consultor para mais informações.</div>` : `<div class="info-box" style="margin-top:10px;background:#e6f7ec;border-color:#a3d9b5;color:#1a6e35;margin-bottom:14px;">✅ Todos os documentos foram entregues!</div>`}
            ${chkItems.map(item => `
                <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;margin-bottom:6px;background:${item.done ? '#f0faf5' : '#fff8f8'};border:1px solid ${item.done ? '#a3d9b5' : '#f5c6cb'};">
                    <span style="font-size:1.1rem;flex-shrink:0;">${item.done ? '✅' : '🔴'}</span>
                    <div style="flex:1;min-width:0;">
                        <div style="${item.done ? 'text-decoration:line-through;color:var(--text-soft);' : ''}font-size:0.9rem;font-weight:600;">${esc(item.label)}</div>
                        ${item.deadline ? `<small style="color:var(--text-soft);">Prazo: ${item.deadline}</small>` : ''}
                        ${item.done && item.completedAt ? `<small style="color:#10b981;"> · Entregue em ${item.completedAt}</small>` : ''}
                    </div>
                    <span class="badge ${item.done ? 'badge-ok' : 'badge-warn'}" style="font-size:0.75rem;flex-shrink:0;">${item.done ? 'Entregue' : 'Pendente'}</span>
                </div>`).join('')}
        </div>` : ''}
        <div class="card">
            <h3 style="margin:0 0 12px;">Acesso rápido</h3>
            <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${servicesProgress.map(s => `<button class="secondary-btn" onclick="document.querySelector('[data-view=${s.sectionId}]')?.click()">${s.icon} ${esc(s.label)}</button>`).join('')}
                <button class="secondary-btn" onclick="document.querySelector('[data-view=clienteIndicacao]')?.click()">🎁 Indicação</button>
            </div>
        </div>`}`;
}

function renderClienteDocumentos(category) {
    const u = app.currentUser;
    const categoryLabels = { rastreamento: 'Rastreamento Veicular', sst: 'Segurança do Trabalho', contabilidade: 'Contabilidade', outros: 'Outros Serviços' };
    const categoryIcons  = { rastreamento: '📡', sst: '🦺', contabilidade: '📊', outros: '📁' };
    const sectionId = { rastreamento: 'clienteRastreamento', sst: 'clienteSST', contabilidade: 'clienteContabilidade', outros: 'clienteOutros' }[category];
    const el = document.getElementById(sectionId);
    const docs = (app.state.clientDocuments || []).filter(d => d.clientId === u.clientId && d.category === category);
    el.innerHTML = `
        <div class="section-header"><div><h2>${categoryIcons[category]} ${categoryLabels[category]}</h2><p>Documentos disponibilizados pelo seu gestor Tracktiv.</p></div></div>
        <div class="card">
            ${docs.length === 0
                ? `<p class="text-muted" style="padding:12px 0;">Nenhum documento disponível nesta categoria ainda.</p>`
                : docs.map(d => `
                    <div class="extrato-item" style="align-items:center;">
                        <div>
                            <strong>${esc(d.name)}</strong>
                            <small style="display:block;color:var(--text-soft);">${esc(d.fileName || '')} · Enviado em ${d.uploadedAt} por ${esc(d.uploadedBy)}</small>
                            ${d.notes ? `<small style="color:var(--text-soft);">${esc(d.notes)}</small>` : ''}
                        </div>
                        <div>
                            ${d.data
                                ? `<button class="small-btn" onclick="clienteDownloadDoc('${esc(d.id)}')">⬇ Baixar</button>`
                                : `<span class="badge badge-warn" style="font-size:0.8rem;">Arquivo demo</span>`}
                        </div>
                    </div>`).join('')
            }
        </div>`;
}

function clienteDownloadDoc(docId) {
    const doc = (app.state.clientDocuments || []).find(d => d.id === docId);
    if (!doc || !doc.data) return;
    const a = document.createElement('a');
    a.href = doc.data;
    a.download = doc.fileName || doc.name;
    a.click();
}

function renderClienteIndicacao() {
    const u = app.currentUser;
    const cfg = app.state.pointsConfig || { pointsPerRef: 100, brlPerPoint: 0.10 };
    const refs = (app.state.clientReferrals || []).filter(r => r.clientUserId === u.id);
    const redemptions = (app.state.clientRedemptions || []).filter(r => r.clientUserId === u.id);
    const points = u.points || 0;
    const brlValue = (points * cfg.brlPerPoint).toFixed(2).replace('.', ',');
    const el = document.getElementById('clienteIndicacao');
    el.innerHTML = `
        <div class="section-header"><div><h2>🎁 Programa de Indicação</h2><p>Indique novos clientes e acumule pontos para resgatar benefícios.</p></div></div>

        <div class="cards-grid" style="margin-bottom:16px;">
            <div class="card">
                <h3>Seus pontos</h3>
                <div class="metric" style="color:var(--accent);">${points}</div>
                <small>≈ R$ ${brlValue} em benefícios</small>
            </div>
            <div class="card">
                <h3>Código de indicação</h3>
                <div style="font-size:1.5rem;font-weight:800;letter-spacing:2px;color:var(--primary);margin:8px 0;">${esc(u.referralCode || '—')}</div>
                <small>Compartilhe com quem deseja indicar</small>
            </div>
            <div class="card">
                <h3>Indicações realizadas</h3>
                <div class="metric">${refs.length}</div>
                <small>${refs.filter(r=>r.status==='approved').length} aprovada${refs.filter(r=>r.status==='approved').length!==1?'s':''}</small>
            </div>
        </div>

        <div class="card" style="margin-bottom:16px;">
            <h3 style="margin:0 0 14px;">Fazer nova indicação</h3>
            <div class="form-grid two-columns">
                <div class="field"><label>Nome do indicado *</label><input id="refNome" type="text" placeholder="Nome completo" /></div>
                <div class="field"><label>Telefone *</label><input id="refTel" type="tel" placeholder="(11) 99999-9999" /></div>
                <div class="field full-width"><label>Serviço de interesse</label>
                    <select id="refServico" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;background:var(--bg);width:100%;">
                        <option>Rastreador Veicular</option>
                        <option>Segurança do Trabalho</option>
                        <option>Consultoria de Contabilidade</option>
                        <option>Chatbot</option>
                        <option>Sites e Campanhas de Marketing</option>
                    </select>
                </div>
            </div>
            <div id="refErrorMsg" class="error-text" style="margin-top:8px;"></div>
            <button class="primary-btn" style="margin-top:12px;" id="submitRefBtn">Enviar indicação</button>
        </div>

        <div class="card" style="margin-bottom:16px;">
            <h3 style="margin:0 0 14px;">Minhas indicações</h3>
            ${refs.length === 0
                ? `<p class="text-muted">Nenhuma indicação enviada ainda.</p>`
                : `<div style="overflow-x:auto;"><table><thead><tr><th>Nome</th><th>Serviço</th><th>Data</th><th>Status</th></tr></thead><tbody>
                    ${refs.map(r=>`<tr><td>${esc(r.nome)}</td><td>${esc(r.servico)}</td><td>${r.createdAt}</td><td><span class="badge ${r.status==='approved'?'badge-active':r.status==='rejected'?'badge-warn':'badge-paused'}">${r.status==='approved'?'Aprovada ✓':r.status==='rejected'?'Recusada':'Pendente'}</span></td></tr>`).join('')}
                   </tbody></table></div>`}
        </div>

        <div class="card" style="margin-bottom:16px;">
            <h3 style="margin:0 0 14px;">Resgatar pontos</h3>
            <p class="text-muted" style="margin:0 0 14px;">Cada ${cfg.pointsPerRef} pontos valem R$ ${(cfg.pointsPerRef * cfg.brlPerPoint).toFixed(2).replace('.',',')}.</p>
            ${points < cfg.pointsPerRef
                ? `<p class="text-muted">Acumule mais ${cfg.pointsPerRef - points} pontos para fazer seu primeiro resgate.</p>`
                : `<div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="secondary-btn" onclick="clienteResgatar('desconto')">🏷️ Desconto na mensalidade</button>
                    <button class="secondary-btn" onclick="clienteResgatar('cashback')">💸 Cashback (dinheiro)</button>
                   </div>`}
        </div>

        <div class="card">
            <h3 style="margin:0 0 14px;">Histórico de resgates</h3>
            ${redemptions.length === 0
                ? `<p class="text-muted">Nenhum resgate realizado ainda.</p>`
                : `<div style="overflow-x:auto;"><table><thead><tr><th>Tipo</th><th>Pontos</th><th>Valor</th><th>Status</th></tr></thead><tbody>
                    ${redemptions.map(r=>`<tr><td>${r.tipo==='desconto'?'Desconto':'Cashback'}</td><td>${r.points}</td><td>R$ ${formatCurrency(r.value)}</td><td><span class="badge ${r.status==='approved'?'badge-active':r.status==='rejected'?'badge-warn':'badge-paused'}">${r.status==='approved'?'Aprovado':r.status==='rejected'?'Recusado':'Pendente'}</span></td></tr>`).join('')}
                   </tbody></table></div>`}
        </div>`;

    document.getElementById('submitRefBtn').addEventListener('click', () => {
        const nome = document.getElementById('refNome').value.trim();
        const tel  = document.getElementById('refTel').value.trim();
        const err  = document.getElementById('refErrorMsg');
        err.textContent = '';
        if (!nome || !tel) { err.textContent = 'Preencha nome e telefone.'; return; }
        const servico = document.getElementById('refServico').value;
        if (!app.state.clientReferrals) app.state.clientReferrals = [];
        app.state.clientReferrals.push({ id: `ref_${Date.now()}`, clientUserId: u.id, nome, telefone: tel, servico, status: 'pending', createdAt: todayISO() });
        saveState();
        renderClienteIndicacao();
        alert('✓ Indicação enviada! O gestor irá entrar em contato com seu indicado.');
    });
}

function clienteResgatar(tipo) {
    const u = app.currentUser;
    const cfg = app.state.pointsConfig || { pointsPerRef: 100, brlPerPoint: 0.10 };
    const points = u.points || 0;
    if (points < cfg.pointsPerRef) return;
    const pointsToUse = cfg.pointsPerRef;
    const value = pointsToUse * cfg.brlPerPoint;
    if (!confirm(`Resgatar ${pointsToUse} pontos como ${tipo === 'desconto' ? 'desconto na mensalidade' : 'cashback'} (R$ ${value.toFixed(2).replace('.',',')})?`)) return;
    if (!app.state.clientRedemptions) app.state.clientRedemptions = [];
    app.state.clientRedemptions.push({ id: `red_${Date.now()}`, clientUserId: u.id, tipo, points: pointsToUse, value, status: 'pending', createdAt: todayISO() });
    const userInState = app.state.users.find(x => x.id === u.id);
    if (userInState) { userInState.points = (userInState.points || 0) - pointsToUse; app.currentUser.points = userInState.points; }
    saveState();
    renderClienteIndicacao();
    alert('✓ Solicitação de resgate enviada! O gestor irá analisar e aprovar em breve.');
}

/* ═══════════════════════════════════════════════════════════════════
   GESTOR: PORTAL CLIENTES
═══════════════════════════════════════════════════════════════════ */

function renderGestorClientesPortal() {
    const el = document.getElementById('gestorClientesPortalContent');
    if (!el) return;
    const clientes = (app.state.users || []).filter(u => u.role === 'cliente');
    const refs = app.state.clientReferrals || [];
    const redemptions = app.state.clientRedemptions || [];
    const cfg = app.state.pointsConfig || { pointsPerRef: 100, brlPerPoint: 0.10 };
    const pendingReds = redemptions.filter(r => r.status === 'pending');
    const pendingRefs = refs.filter(r => r.status === 'pending');

    el.innerHTML = `
        ${pendingReds.length > 0 ? `
        <div class="card" style="margin-bottom:16px;border-left:4px solid var(--accent);">
            <h3 style="margin:0 0 12px;">⚡ Resgates pendentes (${pendingReds.length})</h3>
            ${pendingReds.map(r => {
                const cu = clientes.find(u => u.id === r.clientUserId);
                return `<div class="extrato-item" style="align-items:center;">
                    <div><strong>${cu ? esc(cu.name) : '—'}</strong><small style="display:block;color:var(--text-soft);">${r.tipo==='desconto'?'Desconto na mensalidade':'Cashback'} · ${r.points} pontos · R$ ${formatCurrency(r.value)}</small></div>
                    <div style="display:flex;gap:8px;">
                        <button class="small-btn" onclick="gestorAprovarResgate('${r.id}',true)">✓ Aprovar</button>
                        <button class="danger-btn" onclick="gestorAprovarResgate('${r.id}',false)">✗ Recusar</button>
                    </div>
                </div>`;
            }).join('')}
        </div>` : ''}

        ${pendingRefs.length > 0 ? `
        <div class="card" style="margin-bottom:16px;border-left:4px solid var(--success);">
            <h3 style="margin:0 0 12px;">🤝 Indicações pendentes (${pendingRefs.length})</h3>
            ${pendingRefs.map(r => {
                const cu = clientes.find(u => u.id === r.clientUserId);
                return `<div class="extrato-item" style="align-items:center;">
                    <div><strong>${esc(r.nome)}</strong> — ${esc(r.telefone)}<small style="display:block;color:var(--text-soft);">${esc(r.servico)} · Indicado por ${cu ? esc(cu.name) : '—'}</small></div>
                    <div style="display:flex;gap:8px;">
                        <button class="small-btn" onclick="gestorAprovarIndicacao('${r.id}',true)">✓ Fechar contrato</button>
                        <button class="danger-btn" onclick="gestorAprovarIndicacao('${r.id}',false)">✗ Recusar</button>
                    </div>
                </div>`;
            }).join('')}
        </div>` : ''}

        <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <h3 style="margin:0;">Configuração de pontos</h3>
            </div>
            <div class="form-grid two-columns" style="max-width:480px;">
                <div class="field"><label>Pontos por indicação aprovada</label><input id="cfgPointsPerRef" type="number" min="1" value="${cfg.pointsPerRef}" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;width:100%;"/></div>
                <div class="field"><label>R$ por ponto</label><input id="cfgBrlPerPoint" type="number" min="0.01" step="0.01" value="${cfg.brlPerPoint}" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;width:100%;"/></div>
            </div>
            <button class="secondary-btn" style="margin-top:10px;" onclick="gestorSavePointsConfig()">Salvar configuração</button>
        </div>

        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
                <h3 style="margin:0;">Clientes com acesso ao portal (${clientes.length})</h3>
                <label style="display:flex;align-items:center;gap:8px;font-size:0.88rem;cursor:pointer;user-select:none;">
                    <input type="checkbox" id="filterPendingDocs" ${app.docFilterPending ? 'checked' : ''} onchange="app.docFilterPending=this.checked; renderGestorClientesPortal();" style="width:16px;height:16px;accent-color:var(--accent);">
                    🔴 Apenas com documentos pendentes
                </label>
            </div>
            ${clientes.length === 0
                ? `<p class="text-muted">Nenhum acesso criado ainda. Clique em "+ Novo acesso" para começar.</p>`
                : (() => {
                    const filtered = app.docFilterPending
                        ? clientes.filter(cu => {
                            const items = (app.state.docChecklists || {})[cu.id] || [];
                            return items.length > 0 && items.some(i => !i.done);
                          })
                        : clientes;
                    if (filtered.length === 0) return `<p class="text-muted">Nenhum cliente com documentos pendentes.</p>`;
                    return `<div style="overflow-x:auto;"><table>
                        <thead><tr><th>Nome</th><th>E-mail</th><th>Serviços contratados</th><th>Formulários</th><th>Docs. checklist</th><th>Pontos</th><th>Ações</th></tr></thead>
                        <tbody>
                        ${filtered.map(cu => {
                            const crm = (app.state.clients || []).find(c => c.id === cu.clientId);
                            const contracted = cu.contractedServices || [];
                            const svcChips = contracted.length === 0
                                ? `<span style="color:var(--text-soft);font-size:0.82rem;">Nenhum</span>`
                                : contracted.map(key => {
                                    const svc = SERVICE_MAP.find(s => s.key === key);
                                    return svc ? `<span style="display:inline-block;background:var(--primary);color:white;font-size:0.72rem;padding:2px 8px;border-radius:999px;margin:2px;">${svc.icon} ${svc.label}</span>` : '';
                                }).join('');
                            const formStatus = contracted.length === 0
                                ? `<span style="color:var(--text-soft);font-size:0.82rem;">—</span>`
                                : contracted.map(key => {
                                    const svc = SERVICE_MAP.find(s => s.key === key);
                                    if (!svc) return '';
                                    const formKey = `${cu.id}_${key}`;
                                    const fs = (app.state.segmentForms || {})[formKey] || { data: {} };
                                    const prog = calcSegmentProgress(svc.product, fs.data || {});
                                    return `<div style="font-size:0.8rem;white-space:nowrap;">${prog < 100 ? '🔴' : '✅'} ${svc.icon} ${prog}%</div>`;
                                }).join('');
                            const hasIncompleteForm = contracted.some(key => {
                                const svc = SERVICE_MAP.find(s => s.key === key);
                                if (!svc) return false;
                                const fs = (app.state.segmentForms || {})[`${cu.id}_${key}`] || { data: {} };
                                return calcSegmentProgress(svc.product, fs.data || {}) < 100;
                            });
                            const chkItems = (app.state.docChecklists || {})[cu.id] || [];
                            const chkDone = chkItems.filter(i => i.done).length;
                            const chkTotal = chkItems.length;
                            const chkPct = chkTotal > 0 ? Math.round(chkDone / chkTotal * 100) : null;
                            const hasPendingDocs = chkTotal > 0 && chkDone < chkTotal;
                            const rowAlert = hasIncompleteForm || hasPendingDocs;
                            const chkCell = chkTotal === 0
                                ? `<button class="small-btn" onclick="openDocChecklistModal('${cu.id}')" style="font-size:0.78rem;">+ Criar checklist</button>`
                                : `<div style="font-size:0.82rem;">
                                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                                        <span>${hasPendingDocs ? '🔴' : '✅'}</span>
                                        <span><strong>${chkDone}/${chkTotal}</strong> — ${chkPct}%</span>
                                    </div>
                                    <div class="seg-progress-track" style="height:6px;"><div class="seg-progress-fill" style="width:${chkPct}%;height:6px;${chkPct === 100 ? 'background:linear-gradient(90deg,#10b981,#059669);' : ''}"></div></div>
                                   </div>`;
                            return `<tr style="${rowAlert ? 'background:rgba(220,53,69,0.04);' : ''}">
                                <td><strong>${esc(cu.name)}</strong>${rowAlert ? ' <span style="color:#dc3545;font-size:0.75rem;">🔴</span>' : ''}<br><small style="color:var(--text-soft);">${crm ? esc(crm.name) : '—'}</small></td>
                                <td>${esc(cu.email)}</td>
                                <td style="min-width:140px;">${svcChips}</td>
                                <td style="min-width:120px;">${formStatus}</td>
                                <td style="min-width:130px;">${chkCell}</td>
                                <td>${cu.points || 0}</td>
                                <td style="display:flex;gap:6px;flex-wrap:wrap;">
                                    <button class="small-btn" onclick="openDocChecklistModal('${cu.id}')">📋 Checklist</button>
                                    <button class="small-btn" onclick="openDocUploadModal('${cu.id}')">📎 Docs</button>
                                    <button class="small-btn" onclick="openGestorClienteModal('${cu.id}')">✏️</button>
                                    <button class="danger-btn" onclick="deleteGestorCliente('${cu.id}')">🗑</button>
                                </td>
                            </tr>`;
                        }).join('')}
                        </tbody></table></div>`;
                  })()
            }
        </div>`;
}

function gestorSavePointsConfig() {
    const ppr = parseFloat(document.getElementById('cfgPointsPerRef')?.value) || 100;
    const bpp = parseFloat(document.getElementById('cfgBrlPerPoint')?.value) || 0.10;
    app.state.pointsConfig = { pointsPerRef: Math.max(1, ppr), brlPerPoint: Math.max(0.01, bpp) };
    saveState();
    alert('✓ Configuração de pontos salva.');
}

function gestorAprovarResgate(id, approve) {
    const r = (app.state.clientRedemptions || []).find(x => x.id === id);
    if (!r) return;
    r.status = approve ? 'approved' : 'rejected';
    if (!approve) {
        const cu = (app.state.users || []).find(u => u.id === r.clientUserId);
        if (cu) cu.points = (cu.points || 0) + r.points;
    }
    saveState(); renderGestorClientesPortal();
}

function gestorAprovarIndicacao(id, approve) {
    const r = (app.state.clientReferrals || []).find(x => x.id === id);
    if (!r) return;
    r.status = approve ? 'approved' : 'rejected';
    if (approve) {
        const cfg = app.state.pointsConfig || { pointsPerRef: 100, brlPerPoint: 0.10 };
        const cu = (app.state.users || []).find(u => u.id === r.clientUserId);
        if (cu) cu.points = (cu.points || 0) + cfg.pointsPerRef;
    }
    saveState(); renderGestorClientesPortal();
}

function openGestorClienteModal(id = null) {
    const ed = id ? (app.state.users || []).find(u => u.id === id) : null;
    const contracted = ed?.contractedServices || [];
    const crmOptions = (app.state.clients || []).filter(c => c.stage === 'Fechado').map(c =>
        `<option value="${esc(c.id)}" ${ed?.clientId === c.id ? 'selected' : ''}>${esc(c.name)} — ${esc(c.plan)}</option>`
    ).join('');
    const servicesHtml = SERVICE_MAP.map(s => `
        <label class="checkbox-label" style="padding:6px 0;gap:10px;">
            <input type="checkbox" name="gcService" value="${s.key}" ${contracted.includes(s.key) ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--accent);">
            ${s.icon} ${s.label}
        </label>`).join('');
    showModal(ed ? 'Editar acesso de cliente' : 'Novo acesso de cliente', `
        <form id="gestorClienteForm" class="form-grid two-columns">
            <div class="field"><label>Nome *</label><input id="gcName" type="text" value="${esc(ed?.name || '')}" required /></div>
            <div class="field"><label>E-mail *</label><input id="gcEmail" type="email" value="${esc(ed?.email || '')}" required /></div>
            <div class="field"><label>Senha *</label><input id="gcPass" type="text" value="${esc(ed?.password || '')}" required placeholder="Mínimo 6 caracteres"/></div>
            <div class="field"><label>Código de indicação</label><input id="gcRef" type="text" value="${esc(ed?.referralCode || '')}" placeholder="Ex: NOMEEMPRESA23"/></div>
            <div class="field full-width"><label>Cliente CRM vinculado</label>
                <select id="gcClientId" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;background:var(--bg);width:100%;">
                    <option value="">— Selecionar —</option>
                    ${crmOptions}
                </select>
            </div>
            <div class="field full-width">
                <label>Serviços contratados *</label>
                <div style="display:flex;flex-direction:column;gap:2px;margin-top:6px;padding:12px 16px;background:var(--bg);border:1.5px solid var(--border);border-radius:10px;">
                    ${servicesHtml}
                </div>
                <small style="color:var(--text-soft);">Marque os serviços contratados — apenas eles ficam visíveis no portal do cliente.</small>
            </div>
            <div class="actions full-width" style="margin-top:8px;">
                <button type="submit" class="primary-btn">Salvar</button>
                <button type="button" id="cancelGcBtn" class="secondary-btn">Cancelar</button>
            </div>
            <div id="gcError" class="error-text full-width"></div>
        </form>
    `);
    document.getElementById('cancelGcBtn').addEventListener('click', closeModal);
    document.getElementById('gestorClienteForm').addEventListener('submit', e => {
        e.preventDefault();
        const name     = document.getElementById('gcName').value.trim();
        const email    = document.getElementById('gcEmail').value.trim().toLowerCase();
        const pass     = document.getElementById('gcPass').value.trim();
        const refCode  = document.getElementById('gcRef').value.trim();
        const clientId = document.getElementById('gcClientId').value;
        const contractedServices = Array.from(document.querySelectorAll('input[name="gcService"]:checked')).map(el => el.value);
        const err = document.getElementById('gcError');
        err.textContent = '';
        if (!name || !email || !pass) { err.textContent = 'Nome, e-mail e senha são obrigatórios.'; return; }
        if ((app.state.users || []).some(u => u.email === email && u.id !== id)) {
            err.textContent = 'Este e-mail já está em uso.'; return;
        }
        if (id) {
            const u = app.state.users.find(u => u.id === id);
            Object.assign(u, { name, email, password: pass, referralCode: refCode || u.referralCode, clientId: clientId || u.clientId, contractedServices });
        } else {
            const uid = `cliente_${Date.now()}`;
            const autoCode = name.replace(/\s+/g,'').toUpperCase().slice(0,8) + Math.floor(Math.random()*90+10);
            app.state.users.push({ id: uid, name, email, password: pass, role: 'cliente', clientId, referralCode: refCode || autoCode, points: 0, contractedServices });
        }
        saveState(); closeModal(); renderGestorClientesPortal();
    });
}

function deleteGestorCliente(id) {
    const u = (app.state.users || []).find(u => u.id === id);
    if (!u || !confirm(`Remover acesso de "${u.name}"?`)) return;
    app.state.users = app.state.users.filter(x => x.id !== id);
    saveState(); renderGestorClientesPortal();
}

function openDocUploadModal(clienteUserId) {
    const cu = (app.state.users || []).find(u => u.id === clienteUserId);
    if (!cu) return;
    const docs = (app.state.clientDocuments || []).filter(d => d.clientId === cu.clientId);
    const catOpts = [
        { value: 'rastreamento', label: 'Rastreamento Veicular' },
        { value: 'sst',          label: 'Segurança do Trabalho' },
        { value: 'contabilidade',label: 'Contabilidade' },
        { value: 'outros',       label: 'Outros Serviços' }
    ].map(c => `<option value="${c.value}">${c.label}</option>`).join('');
    showModal(`Documentos — ${esc(cu.name)}`, `
        <div style="margin-bottom:20px;">
            <h4 style="margin:0 0 12px;">Documentos atuais (${docs.length})</h4>
            ${docs.length === 0
                ? `<p class="text-muted">Nenhum documento ainda.</p>`
                : docs.map(d => `
                    <div class="extrato-item" style="align-items:center;margin-bottom:6px;">
                        <div><strong>${esc(d.name)}</strong><small style="display:block;color:var(--text-soft);">${esc(d.category)} · ${d.uploadedAt}</small></div>
                        <button class="danger-btn" onclick="deleteClienteDoc('${d.id}','${clienteUserId}')">🗑</button>
                    </div>`).join('')
            }
        </div>
        <h4 style="margin:0 0 12px;">Adicionar documento</h4>
        <div class="form-grid">
            <div class="field"><label>Nome do documento *</label><input id="docName" type="text" placeholder="Ex: Contrato de Serviço 2026" required /></div>
            <div class="field"><label>Categoria *</label>
                <select id="docCat" style="border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;background:var(--bg);width:100%;">${catOpts}</select>
            </div>
            <div class="field"><label>Notas (opcional)</label><input id="docNotes" type="text" placeholder="Informação adicional" /></div>
            <div class="field"><label>Arquivo (PDF, imagem, max 1 MB)</label>
                <input id="docFile" type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" style="margin-top:4px;" />
            </div>
        </div>
        <div id="docUploadError" class="error-text" style="margin-top:8px;"></div>
        <div class="actions" style="margin-top:12px;">
            <button class="primary-btn" id="saveDocBtn">Salvar documento</button>
            <button class="secondary-btn" id="cancelDocBtn">Fechar</button>
        </div>
    `);
    document.getElementById('cancelDocBtn').addEventListener('click', closeModal);
    document.getElementById('saveDocBtn').addEventListener('click', () => {
        const name  = document.getElementById('docName').value.trim();
        const cat   = document.getElementById('docCat').value;
        const notes = document.getElementById('docNotes').value.trim();
        const file  = document.getElementById('docFile').files[0];
        const err   = document.getElementById('docUploadError');
        err.textContent = '';
        if (!name) { err.textContent = 'Nome do documento é obrigatório.'; return; }
        if (file && file.size > 1048576) { err.textContent = 'Arquivo muito grande. Máximo 1 MB.'; return; }
        const saveDoc = (data) => {
            if (!app.state.clientDocuments) app.state.clientDocuments = [];
            app.state.clientDocuments.push({
                id: `cdoc_${Date.now()}`, clientId: cu.clientId, category: cat, name,
                fileName: file ? file.name : name, data: data || null, type: file ? file.type : '',
                size: file ? file.size : 0, uploadedAt: todayISO(),
                uploadedBy: app.currentUser.name, notes
            });
            // Notificar cliente
            addNotification(cu.id, 'new_document', `📄 Novo documento disponível: "${name}"`, null);
            saveState(); closeModal(); renderGestorClientesPortal();
        };
        if (file) {
            const reader = new FileReader();
            reader.onload = e => saveDoc(e.target.result);
            reader.readAsDataURL(file);
        } else {
            saveDoc(null);
        }
    });
}

function deleteClienteDoc(docId, clienteUserId) {
    if (!confirm('Remover este documento?')) return;
    app.state.clientDocuments = (app.state.clientDocuments || []).filter(d => d.id !== docId);
    saveState();
    openDocUploadModal(clienteUserId);
}

/* ═══════════════════════════════════════════════════════════════════
   PROPOSTA EM PDF (CHECKLIST DE FECHAMENTO)
═══════════════════════════════════════════════════════════════════ */

function openProposalChecklist(clientId) {
    const c = (app.state.clients || []).find(c => c.id === clientId);
    if (!c) return;
    const isRastreador = c.product === 'Rastreador Veicular';
    const checks = [
        { label: 'Nome completo do cliente',   value: c.name,        ok: !!c.name },
        { label: 'CPF / RG',                   value: c.cpf || c.rg, ok: !!(c.cpf || c.rg) },
        { label: 'Endereço completo',           value: c.address,     ok: !!c.address },
        { label: 'Plano escolhido',             value: c.plan,        ok: !!c.plan },
        { label: 'Valor da mensalidade',        value: c.monthlyFee ? `R$ ${formatCurrency(c.monthlyFee)}/mês` : '', ok: !!c.monthlyFee },
        { label: 'Taxa de adesão',              value: 'R$ 100,00',   ok: true },
        { label: 'Melhor data de pagamento',    value: c.paymentDate ? `Dia ${c.paymentDate}` : '', ok: !!c.paymentDate },
        ...(isRastreador ? [{ label: 'Placas dos veículos', value: c.plates, ok: !!c.plates }] : []),
        { label: 'Cupom de desconto',           value: c.coupon || 'Nenhum', ok: true }
    ];
    const allOk = checks.every(ch => ch.ok);
    const missingCount = checks.filter(ch => !ch.ok).length;

    const ph = (c.phone || '').replace(/\D/g, '');
    const waText = encodeURIComponent(`Olá ${c.name}! Sua proposta Tracktiv está pronta. Plano: ${c.plan} — R$ ${formatCurrency(c.monthlyFee)}/mês. Adesão: R$ 100,00. Qualquer dúvida, estamos à disposição!`);
    const waLink  = ph ? `https://wa.me/55${ph}?text=${waText}` : '';
    const mailSubj = encodeURIComponent(`Proposta Tracktiv — ${c.name}`);
    const mailBody = encodeURIComponent(`Olá ${c.name},\n\nSegue sua proposta Tracktiv:\nPlano: ${c.plan}\nMensalidade: R$ ${formatCurrency(c.monthlyFee)}/mês\nTaxa de adesão: R$ 100,00\nVencimento: Dia ${c.paymentDate}\n${c.coupon ? `Cupom: ${c.coupon}\n` : ''}\nAtenciosamente,\nEquipe Tracktiv`);
    const mailLink = c.email ? `mailto:${c.email}?subject=${mailSubj}&body=${mailBody}` : '';

    showModal('Checklist de Fechamento', `
        <div style="margin-bottom:16px;">
            <p class="text-muted" style="margin:0 0 14px;">Verifique os dados antes de gerar e enviar a proposta.</p>
            ${checks.map(ch => `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
                    <span style="font-size:1.1rem;">${ch.ok ? '✅' : '❌'}</span>
                    <div style="flex:1;">
                        <strong style="font-size:0.9rem;">${esc(ch.label)}</strong>
                        <div style="font-size:0.85rem;color:${ch.ok ? 'var(--text-soft)' : 'var(--danger)'};">${ch.ok ? esc(String(ch.value)) : 'Não preenchido — edite o cliente antes de fechar'}</div>
                    </div>
                </div>`).join('')}
        </div>

        ${!allOk ? `
            <div class="info-box" style="margin-bottom:16px;color:var(--danger);background:#fff5f5;border-color:#fcc;">
                ⚠️ ${missingCount} campo${missingCount > 1 ? 's' : ''} obrigatório${missingCount > 1 ? 's' : ''} não preenchido${missingCount > 1 ? 's' : ''}.
                Edite o cliente para completar antes de fechar.
            </div>` : `
            <div style="background:#f0f9f4;border:1px solid #b7dec3;border-radius:10px;padding:14px 16px;margin-bottom:16px;">
                <strong style="color:#1b6d47;">✅ Checklist completo — proposta pronta para envio!</strong>
                <p style="margin:10px 0 12px;font-size:0.9rem;color:var(--text-soft);">Envie a proposta agora. Depois clique em "Enviar para Aprovação" para registrar a venda.</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    <button class="primary-btn" id="pdfOpenBtn">📄 Abrir / Salvar PDF</button>
                    ${waLink  ? `<a href="${waLink}"  target="_blank" class="primary-btn" style="background:#25d366;text-decoration:none;display:inline-flex;align-items:center;">💬 WhatsApp</a>` : ''}
                    ${mailLink ? `<a href="${mailLink}" class="secondary-btn" style="text-decoration:none;display:inline-flex;align-items:center;">✉️ E-mail</a>` : ''}
                </div>
            </div>
            <hr style="margin:0 0 16px;border:none;border-top:1px solid var(--border);">
            <p style="font-size:0.85rem;color:var(--text-soft);margin:0 0 10px;">A aprovação abaixo <strong>não bloqueia o envio</strong> — serve apenas para o gestor contabilizar a venda e liberar a instalação.</p>
        `}

        <div class="actions" style="flex-wrap:wrap;gap:8px;">
            ${allOk ? `<button class="primary-btn" id="enviarAprovacaoBtn">✓ Enviar para Aprovação do Gestor</button>` : ''}
            <button class="secondary-btn" id="cancelChecklistBtn">${allOk ? 'Fechar' : 'Cancelar'}</button>
        </div>
    `);

    document.getElementById('cancelChecklistBtn').addEventListener('click', closeModal);

    if (allOk) {
        document.getElementById('pdfOpenBtn').addEventListener('click', () => {
            const win = window.open('', '_blank');
            if (win) win.document.write(generateProposalHTML(c));
        });
        document.getElementById('enviarAprovacaoBtn').addEventListener('click', () => {
            submitForApproval(clientId);
        });
    }
}

function submitForApproval(clientId) {
    const c = (app.state.clients || []).find(c => c.id === clientId);
    if (!c) return;
    c.awaitingApproval = true;
    if (!app.state.pendingApprovals) app.state.pendingApprovals = [];
    app.state.pendingApprovals.push({
        id: `approval_${Date.now()}`,
        clientId: c.id,
        consultantId: c.consultantId || null,
        instaladorId: c.instaladorId || null,
        previousStage: c.stage,
        requestedAt: todayISO(),
        product: c.product
    });
    // Notificar gestor
    const gestor_ = (app.state.users || []).find(u => u.role === 'gestor');
    if (gestor_) addNotification(gestor_.id, 'new_sale_pending', `💼 Nova venda pendente de aprovação: ${c.name} — ${c.product} (${c.plan})`, { section: 'gestorDashboard' });
    saveState(); renderAppViews(); closeModal();
    alert('✓ Venda enviada para aprovação do gestor!\nO gestor irá confirmar o fechamento e liberar a instalação.');
}

function generateProposalHTML(c) {
    const ph = (c.phone || '').replace(/\D/g, '');
    const waText = encodeURIComponent(`Olá ${c.name}! Sua proposta Tracktiv está pronta. Plano: ${c.plan} - R$ ${formatCurrency(c.monthlyFee)}/mês. Adesão: R$ 100,00. Qualquer dúvida, estamos à disposição!`);
    const waLink = ph ? `https://wa.me/55${ph}?text=${waText}` : '';
    const mailSubj = encodeURIComponent(`Proposta Tracktiv — ${c.name}`);
    const mailBody = encodeURIComponent(`Olá ${c.name},\n\nSegue sua proposta Tracktiv:\nPlano: ${c.plan}\nMensalidade: R$ ${formatCurrency(c.monthlyFee)}/mês\nTaxa de adesão: R$ 100,00\nVencimento: Dia ${c.paymentDate}\n${c.coupon ? `Cupom: ${c.coupon}\n` : ''}\nAtenciosamente,\nEquipe Tracktiv`);
    const mailLink = c.email ? `mailto:${c.email}?subject=${mailSubj}&body=${mailBody}` : '';
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<title>Proposta Tracktiv — ${esc(c.name)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;}
body{background:#f0f2f5;display:flex;justify-content:center;padding:32px 16px;}
.page{background:#fff;max-width:680px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);}
.header{background:linear-gradient(135deg,#17265c,#f5820d);color:#fff;padding:32px 40px;display:flex;align-items:center;gap:20px;}
.logo{width:52px;height:52px;background:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.4rem;color:#17265c;}
.header-text h1{font-size:1.6rem;font-weight:800;margin:0 0 4px;}
.header-text p{font-size:0.9rem;opacity:.85;margin:0;}
.body{padding:36px 40px;}
.section-title{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#f5820d;margin:24px 0 12px;padding-bottom:6px;border-bottom:2px solid #f5820d;}
.row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;font-size:0.95rem;}
.row span:first-child{color:#666;}
.row span:last-child{font-weight:600;color:#17265c;}
.total-row{display:flex;justify-content:space-between;padding:16px 20px;background:#f8f9fc;border-radius:10px;margin-top:16px;font-size:1.1rem;font-weight:700;}
.total-row span:last-child{color:#f5820d;font-size:1.3rem;}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px;}
.btn{padding:13px 24px;border:none;border-radius:10px;font-weight:700;font-size:0.95rem;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
.btn-primary{background:#f5820d;color:#fff;}
.btn-secondary{background:#f0f2f5;color:#17265c;}
.btn-success{background:#2d8a4a;color:#fff;}
.footer{padding:20px 40px;background:#f8f9fc;text-align:center;font-size:0.82rem;color:#aaa;border-top:1px solid #eee;}
@media print{body{padding:0;background:#fff;}.actions{display:none;}.page{box-shadow:none;border-radius:0;max-width:100%;}}
</style>
</head>
<body>
<div class="page">
    <div class="header">
        <div class="logo">T</div>
        <div class="header-text">
            <h1>Proposta Comercial</h1>
            <p>Tracktiv · Portal do Consultor · ${todayISO()}</p>
        </div>
    </div>
    <div class="body">
        <div class="section-title">Dados do Cliente</div>
        <div class="row"><span>Nome</span><span>${esc(c.name)}</span></div>
        ${c.cpf ? `<div class="row"><span>CPF</span><span>${esc(c.cpf)}</span></div>` : ''}
        ${c.rg  ? `<div class="row"><span>RG</span><span>${esc(c.rg)}</span></div>` : ''}
        ${c.address ? `<div class="row"><span>Endereço</span><span>${esc(c.address)}</span></div>` : ''}
        ${c.phone ? `<div class="row"><span>Telefone</span><span>${esc(c.phone)}</span></div>` : ''}
        ${c.email ? `<div class="row"><span>E-mail</span><span>${esc(c.email)}</span></div>` : ''}

        <div class="section-title">Serviço Contratado</div>
        <div class="row"><span>Produto</span><span>${esc(c.product)}</span></div>
        <div class="row"><span>Plano</span><span>${esc(c.plan)}</span></div>
        <div class="row"><span>Mensalidade</span><span>R$ ${formatCurrency(c.monthlyFee)}/mês</span></div>
        <div class="row"><span>Vencimento</span><span>Todo dia ${c.paymentDate}</span></div>
        ${c.plates ? `<div class="row"><span>Veículos (placas)</span><span>${esc(c.plates)}</span></div>` : ''}

        <div class="section-title">Valores</div>
        <div class="row"><span>Taxa de adesão (única)</span><span>R$ 100,00</span></div>
        <div class="row"><span>Mensalidade do plano</span><span>R$ ${formatCurrency(c.monthlyFee)}</span></div>
        ${c.coupon ? `<div class="row"><span>Cupom aplicado</span><span>${esc(c.coupon)}</span></div>` : ''}
        <div class="total-row"><span>Mensalidade total</span><span>R$ ${formatCurrency(c.monthlyFee)}/mês</span></div>

        <div class="actions">
            ${waLink ? `<a href="${waLink}" target="_blank" class="btn btn-success">💬 Enviar pelo WhatsApp</a>` : ''}
            ${mailLink ? `<a href="${mailLink}" class="btn btn-secondary">✉️ Enviar por E-mail</a>` : ''}
            <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
        </div>
    </div>
    <div class="footer">Tracktiv · Proposta gerada em ${todayISO()} · Válida por 30 dias</div>
</div>
</body>
</html>`;
}

/* ═══════════════ FORMULÁRIOS DE SEGMENTO ═══════════════ */

const SEGMENT_FIELDS = {
    'Rastreador Veicular': [
        { key:'placa',       label:'Placa do veículo *',           type:'text',     required:true },
        { key:'marca',       label:'Marca *',                      type:'text',     required:true },
        { key:'modelo',      label:'Modelo *',                     type:'text',     required:true },
        { key:'ano',         label:'Ano *',                        type:'text',     required:true },
        { key:'cor',         label:'Cor',                          type:'text',     required:false },
        { key:'chassi',      label:'Chassi',                       type:'text',     required:false },
        { key:'renavam',     label:'RENAVAM',                      type:'text',     required:false },
        { key:'tipoUso',     label:'Tipo de uso *',                type:'select',   required:true,  options:['Pessoal','Comercial','Frota'] },
        { key:'qtdVeiculos', label:'Quantidade de veículos *',     type:'number',   required:true },
        { key:'teveFurto',   label:'Já teve veículo roubado?',     type:'radio',    required:false, options:['Sim','Não'] },
        { key:'possuiSeguro',label:'Possui seguro?',               type:'radio',    required:false, options:['Sim','Não'] },
        { key:'motivoPrincipal',label:'Principal motivo *',        type:'select',   required:true,  options:['Segurança','Controle de frota','Exigência do seguro','Outros'] },
        { key:'horarioInstalacao',label:'Melhor horário para instalação',type:'text',required:false },
        { key:'enderecoInstalacao',label:'Endereço de instalação *',type:'text',    required:true }
    ],
    'Serviços de Segurança do Trabalho': [
        { key:'razaoSocial',  label:'Razão social *',              type:'text',    required:true },
        { key:'cnpj',         label:'CNPJ *',                      type:'text',    required:true },
        { key:'cnae',         label:'Atividade econômica (CNAE) *',type:'text',    required:true },
        { key:'qtdFuncionarios',label:'Quantidade de funcionários *',type:'number', required:true },
        { key:'funcoesCargos',label:'Funções/cargos existentes',   type:'textarea',required:false },
        { key:'riscos',       label:'Riscos identificados',        type:'checkboxes',required:false,options:['Físico','Químico','Biológico','Ergonômico','Acidente'] },
        { key:'possuiDocSST', label:'Possui documentação SST?',    type:'radio',   required:false, options:['Sim','Não'] },
        { key:'qualDocSST',   label:'Qual documentação?',          type:'text',    required:false },
        { key:'foiAutuado',   label:'Já foi autuado pelo MTE?',    type:'radio',   required:false, options:['Sim','Não'] },
        { key:'possuiSESMT',  label:'Possui SESMT ou médico?',     type:'radio',   required:false, options:['Sim','Não'] },
        { key:'freqAcidentes',label:'Frequência de acidentes',     type:'select',  required:false, options:['Nenhum','Raramente','Mensalmente','Frequentemente'] },
        { key:'docsNecessarios',label:'Documentos necessários',    type:'checkboxes',required:false,options:['PGR','PCMSO','LTCAT','Treinamentos NR','eSocial'] },
        { key:'responsavelNome',label:'Responsável (nome) *',      type:'text',    required:true },
        { key:'responsavelCargo',label:'Cargo do responsável',     type:'text',    required:false }
    ],
    'Consultoria de Contabilidade': [
        { key:'tipoPessoa',   label:'Tipo de pessoa *',            type:'select',  required:true,  options:['MEI','ME','EPP','Outros'] },
        { key:'cnpjCpf',      label:'CNPJ ou CPF *',               type:'text',    required:true },
        { key:'atividade',    label:'Atividade principal *',       type:'text',    required:true },
        { key:'regime',       label:'Regime tributário atual *',   type:'select',  required:true,  options:['Simples Nacional','Lucro Presumido','Lucro Real','Não sei'] },
        { key:'faturamento',  label:'Faturamento médio mensal',    type:'select',  required:false, options:['Até R$ 5.000','R$ 5-20k','R$ 20-50k','R$ 50-100k','Acima R$ 100k'] },
        { key:'qtdCLT',       label:'Funcionários CLT',            type:'number',  required:false },
        { key:'emiteNF',      label:'Emite nota fiscal?',          type:'radio',   required:false, options:['Sim','Não'] },
        { key:'tipoNF',       label:'Qual tipo de NF?',            type:'text',    required:false },
        { key:'possuiContador',label:'Possui contador atual?',     type:'radio',   required:false, options:['Sim','Não'] },
        { key:'motivoMudanca',label:'Por que está mudando?',       type:'text',    required:false },
        { key:'dificuldades', label:'Principais dificuldades',     type:'checkboxes',required:false,options:['Impostos','Folha de pagamento','Declarações','Organização financeira'] },
        { key:'docsNecessarios2',label:'Documentos necessários',   type:'checkboxes',required:false,options:['Abertura de empresa','Declarações','Notas fiscais','Consultoria tributária'] }
    ],
    'Chatbot': [
        { key:'tipoNegocio',  label:'Tipo de negócio *',           type:'text',    required:true },
        { key:'canalAtual',   label:'Canal de atendimento atual *',type:'checkboxes',required:true, options:['WhatsApp','Instagram','Telefone','E-mail'] },
        { key:'volumeMensagens',label:'Volume médio de mensagens/dia *',type:'select',required:true,options:['Menos de 50','50-200','200-500','500+'] },
        { key:'duvidasFrequentes',label:'Principais dúvidas dos clientes',type:'textarea',required:false },
        { key:'horarioFuncionamento',label:'Horário de funcionamento',type:'text', required:false },
        { key:'temEquipe',    label:'Tem equipe de atendimento?',  type:'radio',   required:false, options:['Sim','Não'] },
        { key:'qtdEquipe',    label:'Quantas pessoas?',            type:'number',  required:false },
        { key:'objetivo',     label:'Objetivo do chatbot *',       type:'checkboxes',required:true,options:['Qualificar leads','Responder dúvidas','Agendar','Vender','Suporte'] },
        { key:'integracao',   label:'Integração desejada *',       type:'checkboxes',required:true,options:['WhatsApp','Instagram','Site','Todos'] },
        { key:'tom',          label:'Tom de comunicação',          type:'select',  required:false, options:['Formal','Informal','Neutro'] }
    ],
    'Sites e Campanhas de Marketing': [
        { key:'tipoNegocio',  label:'Tipo de negócio e segmento *',type:'text',   required:true },
        { key:'possuiSite',   label:'Já possui site?',             type:'radio',   required:false, options:['Sim','Não'] },
        { key:'urlSite',      label:'URL do site atual',           type:'text',    required:false },
        { key:'possuiRedes',  label:'Possui redes sociais?',       type:'radio',   required:false, options:['Sim','Não'] },
        { key:'quaisRedes',   label:'Quais redes?',                type:'checkboxes',required:false,options:['Instagram','Facebook','LinkedIn','TikTok','YouTube'] },
        { key:'objetivo',     label:'Objetivo principal *',        type:'checkboxes',required:true,options:['Atrair clientes','Vender online','Presença digital','Todos'] },
        { key:'publicoAlvo',  label:'Público-alvo (descrição)',    type:'textarea', required:false },
        { key:'concorrentes', label:'Referências de design/concorrentes',type:'textarea',required:false },
        { key:'orcamento',    label:'Orçamento mensal para anúncios',type:'select',required:false,options:['Sem orçamento','Até R$ 500','R$ 500-2k','R$ 2k-5k','R$ 5k+'] },
        { key:'servicos',     label:'Serviços desejados *',        type:'checkboxes',required:true,options:['Site institucional','Landing page','Google Ads','Instagram Ads','Gestão de redes'] },
        { key:'identidadeVisual',label:'Identidade visual definida?',type:'radio', required:false, options:['Sim','Não'] },
        { key:'prazo',        label:'Prazo desejado',              type:'select',  required:false, options:['Urgente (< 15 dias)','1 mês','3 meses','Sem prazo'] }
    ]
};

function calcSegmentProgress(product, data) {
    const fields = SEGMENT_FIELDS[product] || [];
    const required = fields.filter(f => f.required);
    if (required.length === 0) return 100;
    const filled = required.filter(f => {
        const v = data[f.key];
        if (!v) return false;
        if (Array.isArray(v)) return v.length > 0;
        return String(v).trim().length > 0;
    }).length;
    return Math.round(filled / required.length * 100);
}

function renderSegmentFieldHTML(field, data) {
    const val = data[field.key] || '';
    const id = `sf_${field.key}`;
    if (field.type === 'text' || field.type === 'number') {
        return `<div class="field">
            <label for="${id}">${esc(field.label)}</label>
            <input id="${id}" data-key="${field.key}" type="${field.type}" value="${esc(String(val))}" ${field.required?'required':''} />
        </div>`;
    }
    if (field.type === 'textarea') {
        return `<div class="field" style="grid-column:1/-1;">
            <label for="${id}">${esc(field.label)}</label>
            <textarea id="${id}" data-key="${field.key}" rows="3" style="resize:vertical;">${esc(String(val))}</textarea>
        </div>`;
    }
    if (field.type === 'select') {
        const opts = (field.options||[]).map(o=>`<option value="${esc(o)}" ${val===o?'selected':''}>${esc(o)}</option>`).join('');
        return `<div class="field">
            <label for="${id}">${esc(field.label)}</label>
            <select id="${id}" data-key="${field.key}" style="border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;background:var(--bg);width:100%;">
                <option value="">— Selecionar —</option>${opts}
            </select>
        </div>`;
    }
    if (field.type === 'radio') {
        const radios = (field.options||[]).map(o=>`
            <label class="checkbox-label">
                <input type="radio" name="${id}" value="${esc(o)}" ${val===o?'checked':''} data-key="${field.key}" style="width:16px;height:16px;accent-color:var(--accent);">
                ${esc(o)}
            </label>`).join('');
        return `<div class="field">
            <label>${esc(field.label)}</label>
            <div class="checkbox-group">${radios}</div>
        </div>`;
    }
    if (field.type === 'checkboxes') {
        const checked = Array.isArray(val) ? val : [];
        const boxes = (field.options||[]).map(o=>`
            <label class="checkbox-label">
                <input type="checkbox" value="${esc(o)}" ${checked.includes(o)?'checked':''} data-key="${field.key}" data-checkbox="1" style="width:16px;height:16px;accent-color:var(--accent);">
                ${esc(o)}
            </label>`).join('');
        return `<div class="field" style="grid-column:1/-1;">
            <label>${esc(field.label)}</label>
            <div class="checkbox-group">${boxes}</div>
        </div>`;
    }
    return '';
}

function openSegmentFormModal(clientId, readOnly) {
    const c = (app.state.clients||[]).find(c=>c.id===clientId);
    if (!c || !c.product) { alert('Cliente sem produto definido.'); return; }
    const fields = SEGMENT_FIELDS[c.product];
    if (!fields) { alert('Formulário não disponível para este produto.'); return; }
    if (!app.state.segmentForms) app.state.segmentForms = {};
    const formState = app.state.segmentForms[clientId] || { data:{}, submitted:false };
    const data = formState.data || {};
    const progress = calcSegmentProgress(c.product, data);
    const isReadOnly = !!readOnly;

    showModal(`Formulário — ${esc(c.product)}`, `
        <div class="seg-progress-wrap">
            <div class="seg-progress-label"><span>Progresso do formulário</span><strong style="color:var(--accent);">${progress}%</strong></div>
            <div class="seg-progress-track"><div class="seg-progress-fill" id="segProgressFill" style="width:${progress}%"></div></div>
        </div>
        ${formState.submitted ? `<div class="info-box" style="margin-bottom:14px;background:#e6f7ec;border-color:#a3d9b5;color:#1a6e35;">✅ Formulário enviado em ${formState.submittedAt||''}. ${isReadOnly?'Visualização apenas.':''}</div>` : ''}
        <form id="segForm" class="form-grid two-columns" style="row-gap:12px;">
            ${fields.map(f => renderSegmentFieldHTML(f, data)).join('')}
        </form>
        ${!isReadOnly ? `
        <div class="actions" style="margin-top:16px;flex-wrap:wrap;gap:8px;">
            <button class="primary-btn" id="segSaveBtn" type="button">💾 Salvar rascunho</button>
            ${progress === 100 && !formState.submitted ? `<button class="secondary-btn" id="segSubmitBtn" type="button" style="background:#10b981;color:white;border-color:#10b981;">✅ Enviar para consultor</button>` : ''}
            <button class="secondary-btn" id="segCancelBtn" type="button">Fechar</button>
        </div>
        <p style="font-size:0.8rem;color:var(--text-soft);margin-top:10px;">Campos com * são obrigatórios. Rascunho salvo automaticamente.</p>
        ` : `<button class="secondary-btn" style="margin-top:14px;" id="segCancelBtn" type="button">Fechar</button>`}
    `);

    const getFormData = () => {
        const d = { ...data };
        const form = document.getElementById('segForm');
        if (!form) return d;
        form.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (el.dataset.checkbox) {
                if (!d[key] || !Array.isArray(d[key])) d[key] = [];
                if (el.checked) { if (!d[key].includes(el.value)) d[key].push(el.value); }
                else { d[key] = d[key].filter(v=>v!==el.value); }
            } else if (el.type === 'radio') {
                if (el.checked) d[key] = el.value;
            } else {
                d[key] = el.value;
            }
        });
        return d;
    };

    const autoSave = () => {
        const d = getFormData();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        app.state.segmentForms[clientId] = { ...formState, data: d };
        const p = calcSegmentProgress(c.product, d);
        const fill = document.getElementById('segProgressFill');
        if (fill) fill.style.width = p + '%';
        saveState();
    };

    // Auto-save on change
    document.getElementById('segForm')?.addEventListener('change', autoSave);
    document.getElementById('segForm')?.addEventListener('input', autoSave);

    document.getElementById('segCancelBtn')?.addEventListener('click', closeModal);

    document.getElementById('segSaveBtn')?.addEventListener('click', () => {
        autoSave();
        alert('✓ Rascunho salvo!');
    });

    document.getElementById('segSubmitBtn')?.addEventListener('click', () => {
        autoSave();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        app.state.segmentForms[clientId] = {
            ...app.state.segmentForms[clientId],
            submitted: true, submittedAt: todayISO()
        };
        // Notifica consultor
        if (!app.state.notifications) app.state.notifications = [];
        app.state.notifications.push({
            id: `notif_${Date.now()}`,
            type: 'form_submitted',
            clientId: c.id, clientName: c.name,
            consultantId: c.consultantId || null,
            read: false, createdAt: todayISO()
        });
        saveState(); closeModal();
        alert('✓ Formulário enviado para o consultor!');
    });
}

/* ── CHECKLIST DE DOCUMENTOS (GESTOR) ── */

function openDocChecklistModal(clienteUserId) {
    const cu = (app.state.users || []).find(u => u.id === clienteUserId);
    if (!cu) return;
    if (!app.state.docChecklists) app.state.docChecklists = {};
    if (!app.state.docChecklists[clienteUserId]) app.state.docChecklists[clienteUserId] = [];
    const items = app.state.docChecklists[clienteUserId];
    const done = items.filter(i => i.done).length;
    const total = items.length;
    const pct = total > 0 ? Math.round(done / total * 100) : 0;

    const itemsHtml = items.length === 0
        ? `<p class="text-muted" style="padding:8px 0;">Nenhum item ainda. Adicione abaixo.</p>`
        : items.map(item => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;margin-bottom:8px;background:${item.done ? '#f0faf5' : '#fff8f8'};border:1px solid ${item.done ? '#a3d9b5' : '#f5c6cb'};">
                <span style="font-size:1.2rem;flex-shrink:0;">${item.done ? '✅' : '🔴'}</span>
                <div style="flex:1;min-width:0;">
                    <div style="${item.done ? 'text-decoration:line-through;color:var(--text-soft);' : ''}font-weight:600;font-size:0.9rem;">${esc(item.label)}</div>
                    ${item.deadline ? `<small style="color:var(--text-soft);">Prazo: ${item.deadline}${item.done && item.completedAt ? ` · Entregue em ${item.completedAt}` : ''}</small>` : item.done && item.completedAt ? `<small style="color:var(--text-soft);">Entregue em ${item.completedAt}</small>` : ''}
                </div>
                <div style="display:flex;gap:5px;flex-shrink:0;">
                    <button class="small-btn" onclick="toggleChecklistItem('${clienteUserId}','${item.id}')" title="${item.done ? 'Reabrir' : 'Marcar como entregue'}">${item.done ? '↩ Reabrir' : '✓ Entregar'}</button>
                    <button class="small-btn" onclick="editChecklistItem('${clienteUserId}','${item.id}')" style="background:#f0f4ff;" title="Editar">✏️</button>
                    <button class="danger-btn" onclick="deleteChecklistItem('${clienteUserId}','${item.id}')" title="Remover">🗑</button>
                </div>
            </div>`).join('');

    showModal(`📋 Checklist de Documentos — ${esc(cu.name)}`, `
        ${total > 0 ? `
        <div style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-size:0.9rem;"><strong>${done}</strong> de <strong>${total}</strong> documentos entregues</span>
                <strong style="color:${pct === 100 ? '#10b981' : 'var(--accent)'};">${pct}%</strong>
            </div>
            <div class="seg-progress-track">
                <div class="seg-progress-fill" style="width:${pct}%;${pct === 100 ? 'background:linear-gradient(90deg,#10b981,#059669);' : ''}"></div>
            </div>
            ${pct === 100 ? `<div class="info-box" style="margin-top:10px;background:#e6f7ec;border-color:#a3d9b5;color:#1a6e35;">✅ Todos os documentos foram entregues!</div>` : ''}
        </div>` : ''}
        <div style="margin-bottom:20px;">${itemsHtml}</div>
        <div style="border-top:1.5px solid var(--border);padding-top:18px;">
            <h4 style="margin:0 0 14px;font-size:0.95rem;">+ Adicionar item ao checklist</h4>
            <div class="form-grid two-columns" style="gap:12px;">
                <div class="field" style="grid-column:1/-1;">
                    <label>Nome do documento *</label>
                    <input id="chkLabel" type="text" placeholder="Ex: PGR atualizado, PCMSO 2026, RG e CPF…" />
                </div>
                <div class="field">
                    <label>Prazo (opcional)</label>
                    <input id="chkDeadline" type="date" />
                </div>
                <div class="field" style="display:flex;align-items:flex-end;">
                    <button class="primary-btn" onclick="addChecklistItem('${clienteUserId}')" type="button" style="width:100%;">+ Adicionar</button>
                </div>
            </div>
            <div style="margin-top:12px;">
                <p style="font-size:0.8rem;color:var(--text-soft);margin:0 0 8px;">Sugestões rápidas:</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                    ${['PGR atualizado','PCMSO 2026','Contrato assinado','RG e CPF','Comprovante de endereço','Autorização de instalação','Declaração de frota','CNPJ','Laudo NR-12'].map(s =>
                        `<button class="secondary-btn" onclick="document.getElementById('chkLabel').value='${s}'" style="font-size:0.78rem;padding:4px 10px;">${s}</button>`
                    ).join('')}
                </div>
            </div>
        </div>
    `);
}

function addChecklistItem(clienteUserId) {
    const label = document.getElementById('chkLabel')?.value.trim();
    const deadline = document.getElementById('chkDeadline')?.value || null;
    if (!label) { alert('Digite o nome do documento.'); return; }
    if (!app.state.docChecklists) app.state.docChecklists = {};
    if (!app.state.docChecklists[clienteUserId]) app.state.docChecklists[clienteUserId] = [];
    app.state.docChecklists[clienteUserId].push({ id: `chk_${Date.now()}`, label, done: false, deadline, addedAt: todayISO() });
    saveState(); openDocChecklistModal(clienteUserId); renderGestorClientesPortal();
}

function toggleChecklistItem(clienteUserId, itemId) {
    const items = (app.state.docChecklists || {})[clienteUserId] || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    item.done = !item.done;
    if (item.done) item.completedAt = todayISO();
    else delete item.completedAt;
    if (item.done && items.every(i => i.done) && items.length > 0) {
        if (!app.state.notifications) app.state.notifications = [];
        const cu = (app.state.users || []).find(u => u.id === clienteUserId);
        app.state.notifications.push({ id: `notif_${Date.now()}`, type: 'checklist_complete', clientUserId: clienteUserId, clientName: cu?.name || '', read: false, createdAt: todayISO() });
    }
    saveState(); openDocChecklistModal(clienteUserId); renderGestorClientesPortal();
}

function editChecklistItem(clienteUserId, itemId) {
    const items = (app.state.docChecklists || {})[clienteUserId] || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const newLabel = prompt('Nome do documento:', item.label);
    if (newLabel === null) { openDocChecklistModal(clienteUserId); return; }
    if (!newLabel.trim()) { alert('Nome não pode ser vazio.'); openDocChecklistModal(clienteUserId); return; }
    item.label = newLabel.trim();
    const newDeadline = prompt('Prazo (AAAA-MM-DD) ou deixe vazio para remover:', item.deadline || '');
    if (newDeadline !== null) item.deadline = newDeadline.trim() || null;
    saveState(); openDocChecklistModal(clienteUserId);
}

function deleteChecklistItem(clienteUserId, itemId) {
    if (!confirm('Remover este item do checklist?')) { openDocChecklistModal(clienteUserId); return; }
    if (app.state.docChecklists?.[clienteUserId]) {
        app.state.docChecklists[clienteUserId] = app.state.docChecklists[clienteUserId].filter(i => i.id !== itemId);
    }
    saveState(); openDocChecklistModal(clienteUserId); renderGestorClientesPortal();
}

/* ─── FORMULÁRIO POR SERVIÇO ─── */
function renderClienteServiceForm(serviceKey, el, svc) {
    if (!svc) svc = SERVICE_MAP.find(s => s.key === serviceKey);
    if (!svc || !el) return;
    const u = app.currentUser;
    const formKey = `${u.id}_${serviceKey}`;
    const formState = (app.state.segmentForms || {})[formKey] || { data: {}, submitted: false };
    const data = formState.data || {};

    // For rastreamento, general fields only (vehicles are in their own tab)
    const isRast = serviceKey === 'rastreamento';
    const fields = isRast ? RAST_GENERAL_FIELDS : (SEGMENT_FIELDS[svc.product] || []);
    const progress = isRast ? calcRastProgress(data) : calcSegmentProgress(svc.product, data);

    el.innerHTML = `
        <div class="section-header"><div><h2>📝 Formulário — ${esc(svc.label)}</h2><p>Preencha suas informações para agilizar o atendimento.</p></div></div>
        <div class="card">
            <div class="seg-progress-wrap" style="margin-bottom:16px;">
                <div class="seg-progress-label"><span>Progresso</span><strong style="color:${progress===100?'#10b981':'var(--accent)'};">${progress}%</strong></div>
                <div class="seg-progress-track"><div class="seg-progress-fill" id="sfFill_${serviceKey}" style="width:${progress}%;${progress===100?'background:linear-gradient(90deg,#10b981,#059669);':''}"></div></div>
            </div>
            ${progress < 100 ? `<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:0.88rem;">🔴 Preencha os campos obrigatórios (*) para liberar o envio.</div>` : ''}
            ${formState.submitted ? `<div class="info-box" style="margin-bottom:14px;background:#e6f7ec;border-color:#a3d9b5;color:#1a6e35;">✅ Enviado em ${formState.submittedAt}. Consultor notificado.</div>` : ''}
            <form id="sfForm_${serviceKey}" class="form-grid two-columns" style="row-gap:12px;">
                ${fields.map(f => renderSegmentFieldHTML(f, data)).join('')}
            </form>
            ${isRast ? `<p style="font-size:0.82rem;color:var(--text-soft);margin-top:12px;">🚗 Para cadastrar veículos, acesse a aba <strong>Meus Veículos</strong>.</p>` : ''}
            <div class="actions" style="margin-top:16px;flex-wrap:wrap;gap:8px;">
                <button class="secondary-btn" id="sfSave_${serviceKey}" type="button">💾 Salvar</button>
                ${progress === 100 && !formState.submitted ? `<button class="primary-btn" id="sfSubmit_${serviceKey}" type="button" style="background:linear-gradient(135deg,#10b981,#059669);border:none;">✅ Enviar para consultor</button>` : ''}
            </div>
            <p style="font-size:0.78rem;color:var(--text-soft);margin-top:8px;">* Campos obrigatórios. Salvo automaticamente.</p>
        </div>`;

    const formEl = document.getElementById(`sfForm_${serviceKey}`);
    const getData = () => {
        const d = { ...data };
        formEl?.querySelectorAll('[data-key]').forEach(inp => {
            const key = inp.dataset.key;
            if (inp.dataset.checkbox) {
                if (!d[key] || !Array.isArray(d[key])) d[key] = [];
                if (inp.checked) { if (!d[key].includes(inp.value)) d[key].push(inp.value); }
                else { d[key] = d[key].filter(v => v !== inp.value); }
            } else if (inp.type === 'radio') { if (inp.checked) d[key] = inp.value; }
            else { d[key] = inp.value; }
        });
        return d;
    };
    const save = () => {
        const d = getData();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        const current = (app.state.segmentForms[formKey] || {});
        app.state.segmentForms[formKey] = { ...current, data: { ...(current.data || {}), ...d } };
        const p = isRast ? calcRastProgress(app.state.segmentForms[formKey].data) : calcSegmentProgress(svc.product, d);
        const fill = document.getElementById(`sfFill_${serviceKey}`);
        if (fill) { fill.style.width = p + '%'; fill.style.background = p === 100 ? 'linear-gradient(90deg,#10b981,#059669)' : ''; }
        saveState();
    };
    formEl?.addEventListener('change', save);
    formEl?.addEventListener('input', save);
    document.getElementById(`sfSave_${serviceKey}`)?.addEventListener('click', () => { save(); alert('✓ Salvo!'); });
    document.getElementById(`sfSubmit_${serviceKey}`)?.addEventListener('click', () => {
        save();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        app.state.segmentForms[formKey] = { ...(app.state.segmentForms[formKey] || {}), submitted: true, submittedAt: todayISO() };
        const crm = (app.state.clients || []).find(c => c.id === u.clientId);
        if (!app.state.notifications) app.state.notifications = [];
        app.state.notifications.push({ id: `notif_${Date.now()}`, type: 'form_submitted', serviceKey, serviceName: svc.label, clientUserId: u.id, clientName: u.name, clientId: u.clientId, consultantId: crm?.consultantId || null, read: false, createdAt: todayISO() });
        saveState();
        renderClienteServiceForm(serviceKey, el, svc);
        alert('✓ Formulário enviado para o consultor!');
    });
}

/* ─── DOCUMENTOS (SLOTS) POR SERVIÇO ─── */
function renderClienteServiceDocs(serviceKey, el, svc) {
    if (!svc) svc = SERVICE_MAP.find(s => s.key === serviceKey);
    if (!svc || !el) return;
    const u = app.currentUser;
    const slots = ((app.state.docSlots || {})[u.id] || []).filter(sl => sl.serviceKey === serviceKey);
    const filled = slots.filter(sl => sl.docId).length;
    const total = slots.length;
    const pct = total > 0 ? Math.round(filled / total * 100) : 100;

    const slotRows = slots.length === 0
        ? `<div style="text-align:center;padding:32px;color:var(--text-soft);">
            <div style="font-size:2rem;margin-bottom:8px;">📂</div>
            <p style="margin:0;">Nenhum slot de documento configurado.<br>Aguarde seu consultor configurar os documentos necessários.</p>
           </div>`
        : slots.map(sl => {
            const doc = sl.docId ? (app.state.clientDocuments || []).find(d => d.id === sl.docId) : null;
            return `<div class="slot-item ${doc ? 'filled' : 'pending'}">
                <span class="slot-item-icon">${doc ? '✅' : '🔴'}</span>
                <div class="slot-item-info">
                    <div class="slot-item-name">${esc(sl.name)}</div>
                    <div class="slot-item-status">${doc ? `Disponível · Enviado em ${sl.uploadedAt || '—'} por ${esc(sl.uploadedBy || '—')}` : 'Aguardando documento'}</div>
                </div>
                ${doc && doc.data ? `<button class="small-btn" onclick="clienteDownloadDoc('${esc(doc.id)}')">⬇ Baixar</button>` : doc ? `<span class="badge badge-warn" style="font-size:0.78rem;">Demo</span>` : ''}
            </div>`;
        }).join('');

    el.innerHTML = `
        <div class="section-header"><div><h2>📎 Documentos — ${esc(svc.label)}</h2><p>Documentos disponibilizados pelo seu consultor.</p></div></div>
        ${total > 0 ? `
        <div class="card" style="margin-bottom:16px;">
            <div class="seg-progress-label" style="margin-bottom:8px;"><span><strong>${filled}</strong> de <strong>${total}</strong> documentos disponíveis</span><strong style="color:${pct===100?'#10b981':'var(--accent)'};">${pct}%</strong></div>
            <div class="seg-progress-track"><div class="seg-progress-fill" style="width:${pct}%;${pct===100?'background:linear-gradient(90deg,#10b981,#059669);':''}"></div></div>
        </div>` : ''}
        <div class="card">${slotRows}</div>`;
}

/* ─── MÚLTIPLOS VEÍCULOS ─── */
function calcRastProgress(data) {
    const vehicles = data.vehicles || [];
    const hasVehicle = vehicles.length > 0 && vehicles.some(v => v.placa && v.marca && v.modelo && v.ano);
    const generalRequired = RAST_GENERAL_FIELDS.filter(f => f.required);
    const generalFilled = generalRequired.filter(f => data[f.key] && String(data[f.key]).trim().length > 0).length;
    const generalOk = generalFilled === generalRequired.length;
    if (generalRequired.length === 0 && !hasVehicle) return 0;
    const totalReq = generalRequired.length + 1; // +1 for at least 1 vehicle
    const totalFilled = generalFilled + (hasVehicle ? 1 : 0);
    return Math.round(totalFilled / totalReq * 100);
}

function renderClienteVehicles(el) {
    const u = app.currentUser;
    const formKey = `${u.id}_rastreamento`;
    const formState = (app.state.segmentForms || {})[formKey] || { data: {} };
    const vehicles = (formState.data || {}).vehicles || [];

    const renderVehicleCard = (v, idx) => `
        <div class="vehicle-card" id="vcard_${idx}">
            <div class="vehicle-card-header">
                <span class="vehicle-card-title">🚗 Veículo ${idx + 1}${v.placa ? ` — ${esc(v.placa)}` : ''}</span>
                <button class="danger-btn" onclick="clienteRemoveVehicle(${idx})" style="padding:4px 10px;font-size:0.8rem;">🗑 Remover</button>
            </div>
            <div class="form-grid two-columns" style="gap:10px;">
                ${VEHICLE_FIELDS.map(f => `
                    <div class="field">
                        <label>${esc(f.label)}</label>
                        <input type="text" data-vidx="${idx}" data-vkey="${f.key}" value="${esc(v[f.key]||'')}" placeholder="${esc(f.label.replace(' *',''))}" oninput="clienteVehicleInput(this)" onchange="clienteVehicleInput(this)" ${f.required?'required':''} />
                    </div>`).join('')}
            </div>
        </div>`;

    el.innerHTML = `
        <div class="section-header">
            <div><h2>🚗 Meus Veículos</h2><p>Cadastre os veículos para rastreamento. Pelo menos 1 é obrigatório.</p></div>
            <button class="primary-btn" onclick="clienteAddVehicle()">+ Adicionar Veículo</button>
        </div>
        ${vehicles.length === 0
            ? `<div class="card" style="text-align:center;padding:40px;">
                <div style="font-size:3rem;margin-bottom:12px;">🚗</div>
                <h3>Nenhum veículo cadastrado</h3>
                <p class="text-muted">Clique em "Adicionar Veículo" para começar.</p>
                <button class="primary-btn" onclick="clienteAddVehicle()" style="margin-top:16px;">+ Adicionar Primeiro Veículo</button>
               </div>`
            : `<div id="vehicleList">${vehicles.map((v, i) => renderVehicleCard(v, i)).join('')}</div>
               <button class="secondary-btn" onclick="clienteAddVehicle()" style="margin-top:4px;">+ Adicionar Veículo</button>`
        }`;
}

function clienteVehicleInput(inp) {
    const u = app.currentUser;
    const formKey = `${u.id}_rastreamento`;
    if (!app.state.segmentForms) app.state.segmentForms = {};
    if (!app.state.segmentForms[formKey]) app.state.segmentForms[formKey] = { data: {} };
    if (!app.state.segmentForms[formKey].data.vehicles) app.state.segmentForms[formKey].data.vehicles = [];
    const idx = parseInt(inp.dataset.vidx, 10);
    const key = inp.dataset.vkey;
    if (!app.state.segmentForms[formKey].data.vehicles[idx]) app.state.segmentForms[formKey].data.vehicles[idx] = {};
    app.state.segmentForms[formKey].data.vehicles[idx][key] = inp.value;
    saveState();
}

function clienteAddVehicle() {
    const u = app.currentUser;
    const formKey = `${u.id}_rastreamento`;
    if (!app.state.segmentForms) app.state.segmentForms = {};
    if (!app.state.segmentForms[formKey]) app.state.segmentForms[formKey] = { data: {} };
    if (!app.state.segmentForms[formKey].data.vehicles) app.state.segmentForms[formKey].data.vehicles = [];
    app.state.segmentForms[formKey].data.vehicles.push({ placa: '', marca: '', modelo: '', ano: '', cor: '', chassi: '', renavam: '' });
    saveState();
    renderClienteVehicles(document.getElementById('clienteRastreamento'));
}

function clienteRemoveVehicle(idx) {
    if (!confirm(`Remover veículo ${idx + 1}?`)) return;
    const u = app.currentUser;
    const formKey = `${u.id}_rastreamento`;
    if (app.state.segmentForms?.[formKey]?.data?.vehicles) {
        app.state.segmentForms[formKey].data.vehicles.splice(idx, 1);
        saveState();
    }
    renderClienteVehicles(document.getElementById('clienteRastreamento'));
}

/* ─── INDICAÇÃO SUB-ITENS ─── */
function renderClienteIndicacaoSub(subItem) {
    const u = app.currentUser;
    const el = document.getElementById('clienteIndicacao');
    if (!el) return;
    if (subItem === 'codigo') {
        el.innerHTML = `
            <div class="section-header"><div><h2>🔗 Meu Código de Indicação</h2></div></div>
            <div class="card" style="text-align:center;padding:40px;">
                <p style="color:var(--text-soft);margin:0 0 16px;">Compartilhe este código e ganhe pontos a cada indicação aprovada.</p>
                <div style="font-size:2.5rem;font-weight:900;letter-spacing:0.12em;color:var(--primary);background:var(--bg);padding:20px 32px;border-radius:16px;display:inline-block;margin-bottom:16px;">${esc(u.referralCode || '—')}</div>
                <br>
                <button class="secondary-btn" onclick="navigator.clipboard?.writeText('${esc(u.referralCode||'')}').then(()=>alert('Código copiado!'))">📋 Copiar código</button>
            </div>`;
    } else if (subItem === 'minhas') {
        const refs = (app.state.clientReferrals || []).filter(r => r.clientUserId === u.id);
        el.innerHTML = `
            <div class="section-header"><div><h2>📋 Minhas Indicações</h2></div></div>
            <div class="card">
                ${refs.length === 0 ? `<p class="text-muted">Você ainda não fez nenhuma indicação.</p>` :
                    refs.map(r => `<div class="extrato-item"><div><strong>${esc(r.nome)}</strong><small style="display:block;color:var(--text-soft);">${esc(r.servico)} · ${r.status === 'approved' ? '✅ Aprovada' : r.status === 'rejected' ? '❌ Recusada' : '⏳ Pendente'}</small></div><span class="badge ${r.status==='approved'?'badge-ok':r.status==='rejected'?'badge-warn':'badge-info'}">${r.status==='approved'?'+100 pts':'—'}</span></div>`).join('')}
            </div>`;
    } else if (subItem === 'pontos') {
        const cfg = app.state.pointsConfig || { pointsPerRef: 100, brlPerPoint: 0.10 };
        el.innerHTML = `
            <div class="section-header"><div><h2>⭐ Meus Pontos</h2></div></div>
            <div class="cards-grid" style="margin-bottom:16px;">
                <div class="card"><h3>Pontos acumulados</h3><div class="metric" style="color:var(--accent);">${u.points || 0}</div></div>
                <div class="card"><h3>Valor em reais</h3><div class="metric">R$ ${formatCurrency((u.points || 0) * cfg.brlPerPoint)}</div><small>${cfg.brlPerPoint.toFixed(2)} por ponto</small></div>
                <div class="card"><h3>Pontos por indicação</h3><div class="metric">${cfg.pointsPerRef}</div><small>a cada contrato fechado</small></div>
            </div>`;
    } else if (subItem === 'resgatar') {
        renderClienteIndicacao(); // reuse existing referral/redemption UI
        return;
    }
}

/* ─── DOCUMENTOS GERAL ─── */
function renderClienteDocsList(filter) {
    const u = app.currentUser;
    const el = document.getElementById('clienteFormulario');
    if (!el) return;
    const allSlots = (app.state.docSlots || {})[u.id] || [];
    const allDocs = (app.state.clientDocuments || []).filter(d => d.clientId === u.clientId);
    const titles = { todos: '📁 Todos os Documentos', pendentes: '🔴 Documentos Pendentes', concluidos: '✅ Documentos Concluídos' };

    let displaySlots = allSlots;
    if (filter === 'pendentes') displaySlots = allSlots.filter(sl => !sl.docId);
    if (filter === 'concluidos') displaySlots = allSlots.filter(sl => sl.docId);

    const filled = allSlots.filter(sl => sl.docId).length;
    const pct = allSlots.length > 0 ? Math.round(filled / allSlots.length * 100) : 100;

    el.innerHTML = `
        <div class="section-header"><div><h2>${titles[filter] || '📁 Documentos'}</h2><p>${filled} de ${allSlots.length} slots preenchidos.</p></div></div>
        ${allSlots.length > 0 ? `
        <div class="card" style="margin-bottom:16px;">
            <div class="seg-progress-label"><span>Progresso geral</span><strong style="color:${pct===100?'#10b981':'var(--accent)'};">${pct}%</strong></div>
            <div class="seg-progress-track"><div class="seg-progress-fill" style="width:${pct}%;${pct===100?'background:linear-gradient(90deg,#10b981,#059669);':''}"></div></div>
        </div>` : ''}
        <div class="card">
            ${displaySlots.length === 0 ? `<p class="text-muted">${filter === 'pendentes' ? 'Nenhum documento pendente.' : filter === 'concluidos' ? 'Nenhum documento concluído ainda.' : 'Nenhum slot configurado.'}</p>` :
                displaySlots.map(sl => {
                    const doc = sl.docId ? (app.state.clientDocuments || []).find(d => d.id === sl.docId) : null;
                    const svc = SERVICE_MAP.find(s => s.key === sl.serviceKey);
                    return `<div class="slot-item ${doc ? 'filled' : 'pending'}">
                        <span class="slot-item-icon">${doc ? '✅' : '🔴'}</span>
                        <div class="slot-item-info">
                            <div class="slot-item-name">${esc(sl.name)}</div>
                            <div class="slot-item-status">${svc ? svc.icon + ' ' + svc.label : ''} · ${doc ? `Disponível · ${sl.uploadedAt || ''}` : 'Aguardando documento'}</div>
                        </div>
                        ${doc && doc.data ? `<button class="small-btn" onclick="clienteDownloadDoc('${esc(doc.id)}')">⬇ Baixar</button>` : doc ? `<span class="badge badge-warn" style="font-size:0.78rem;">Demo</span>` : ''}
                    </div>`;
                }).join('')}
        </div>`;
}

function renderClienteService(serviceKey) {
    const svc = SERVICE_MAP.find(s => s.key === serviceKey);
    if (!svc) return;
    const el = document.getElementById(svc.sectionId);
    if (!el) return;
    const u = app.currentUser;
    const formKey = `${u.id}_${serviceKey}`;
    const formState = (app.state.segmentForms || {})[formKey] || { data: {}, submitted: false };
    const data = formState.data || {};
    const fields = SEGMENT_FIELDS[svc.product] || [];
    const progress = fields.length > 0 ? calcSegmentProgress(svc.product, data) : 100;
    const docs = (app.state.clientDocuments || []).filter(d => d.clientId === u.clientId && d.category === svc.docCategory);

    el.innerHTML = `
        <div class="section-header">
            <div><h2>${svc.icon} ${esc(svc.label)}</h2><p>Formulário de cadastro e documentos do serviço.</p></div>
        </div>
        ${fields.length > 0 ? `
        <div class="card" style="margin-bottom:16px;">
            <h3 style="margin:0 0 14px;">📝 Formulário de Cadastro</h3>
            <div class="seg-progress-wrap" style="margin-bottom:16px;">
                <div class="seg-progress-label"><span>Progresso</span><strong style="color:${progress === 100 ? '#10b981' : 'var(--accent)'};">${progress}%</strong></div>
                <div class="seg-progress-track"><div class="seg-progress-fill" id="svcFill_${serviceKey}" style="width:${progress}%;${progress === 100 ? 'background:linear-gradient(90deg,#10b981,#059669);' : ''}"></div></div>
            </div>
            ${progress < 100 ? `<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:0.88rem;">🔴 Preencha os campos obrigatórios (*) para liberar o envio ao consultor.</div>` : ''}
            ${formState.submitted ? `<div class="info-box" style="margin-bottom:14px;background:#e6f7ec;border-color:#a3d9b5;color:#1a6e35;">✅ Formulário enviado em ${formState.submittedAt}. Seu consultor foi notificado.</div>` : ''}
            <form id="svcForm_${serviceKey}" class="form-grid two-columns" style="row-gap:12px;">
                ${fields.map(f => renderSegmentFieldHTML(f, data)).join('')}
            </form>
            <div class="actions" style="margin-top:16px;flex-wrap:wrap;gap:8px;">
                <button class="secondary-btn" id="svcSave_${serviceKey}" type="button">💾 Salvar</button>
                ${progress === 100 && !formState.submitted ? `<button class="primary-btn" id="svcSubmit_${serviceKey}" type="button" style="background:linear-gradient(135deg,#10b981,#059669);border:none;">✅ Enviar para consultor</button>` : ''}
            </div>
            <p style="font-size:0.8rem;color:var(--text-soft);margin-top:10px;">Campos com * são obrigatórios. Salvo automaticamente ao digitar.</p>
        </div>` : ''}
        <div class="card">
            <h3 style="margin:0 0 14px;">📎 Documentos (${docs.length})</h3>
            ${docs.length === 0
                ? `<p class="text-muted">Nenhum documento disponível nesta categoria ainda.</p>`
                : docs.map(d => `
                    <div class="extrato-item" style="align-items:center;">
                        <div>
                            <strong>${esc(d.name)}</strong>
                            <small style="display:block;color:var(--text-soft);">${esc(d.fileName || '')} · Enviado em ${d.uploadedAt} por ${esc(d.uploadedBy)}</small>
                            ${d.notes ? `<small style="color:var(--text-soft);">${esc(d.notes)}</small>` : ''}
                        </div>
                        ${d.data ? `<button class="small-btn" onclick="clienteDownloadDoc('${esc(d.id)}')">⬇ Baixar</button>` : `<span class="badge badge-warn" style="font-size:0.8rem;">Arquivo demo</span>`}
                    </div>`).join('')
            }
        </div>`;

    const svcFormEl = document.getElementById(`svcForm_${serviceKey}`);
    const getSvcData = () => {
        const d = { ...data };
        svcFormEl?.querySelectorAll('[data-key]').forEach(inp => {
            const key = inp.dataset.key;
            if (inp.dataset.checkbox) {
                if (!d[key] || !Array.isArray(d[key])) d[key] = [];
                if (inp.checked) { if (!d[key].includes(inp.value)) d[key].push(inp.value); }
                else { d[key] = d[key].filter(v => v !== inp.value); }
            } else if (inp.type === 'radio') { if (inp.checked) d[key] = inp.value; }
            else { d[key] = inp.value; }
        });
        return d;
    };
    const autoSave = () => {
        const d = getSvcData();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        app.state.segmentForms[formKey] = { ...formState, data: d };
        const p = calcSegmentProgress(svc.product, d);
        const fill = document.getElementById(`svcFill_${serviceKey}`);
        if (fill) { fill.style.width = p + '%'; fill.style.background = p === 100 ? 'linear-gradient(90deg,#10b981,#059669)' : ''; }
        saveState();
    };
    svcFormEl?.addEventListener('change', autoSave);
    svcFormEl?.addEventListener('input', autoSave);
    document.getElementById(`svcSave_${serviceKey}`)?.addEventListener('click', () => { autoSave(); alert('✓ Salvo!'); });
    document.getElementById(`svcSubmit_${serviceKey}`)?.addEventListener('click', () => {
        autoSave();
        if (!app.state.segmentForms) app.state.segmentForms = {};
        app.state.segmentForms[formKey] = { ...app.state.segmentForms[formKey], submitted: true, submittedAt: todayISO() };
        if (!app.state.notifications) app.state.notifications = [];
        const crm = (app.state.clients || []).find(c => c.id === u.clientId);
        app.state.notifications.push({ id: `notif_${Date.now()}`, type: 'form_submitted', serviceKey, serviceName: svc.label, clientUserId: u.id, clientName: u.name, clientId: u.clientId, consultantId: crm?.consultantId || null, read: false, createdAt: todayISO() });
        saveState();
        renderClienteService(serviceKey);
        renderClienteNav();
        alert('✓ Formulário enviado para o consultor!');
    });
}

function renderClienteFormulario() { /* replaced by renderClienteService — kept for compatibility */ }

/* ═══════════════════════════════════════════════════════════════════
   DYNAMIC RENDER FUNCTIONS — called by NAV_TREE render items
═══════════════════════════════════════════════════════════════════ */

function renderGestorIndicacoes() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const pending = (app.state.pendingUsers || []);
    const rows = pending.length ? pending.map(u => {
        const referrer = (app.state.users || []).find(r => r.id === u.referrerId);
        return `<tr>
            <td>${esc(u.name)}</td>
            <td>${esc(u.email)}</td>
            <td>${esc(u.whatsapp || '—')}</td>
            <td>${esc(referrer ? referrer.name : '—')}</td>
            <td>${esc(u.requestedAt || '—')}</td>
            <td>
                <button class="small-btn" onclick="approvePendingUser('${esc(u.id)}')">✓ Aprovar</button>
                <button class="danger-btn" onclick="rejectPendingUser('${esc(u.id)}')">✗ Rejeitar</button>
            </td>
        </tr>`;
    }).join('') : `<tr><td colspan="6" style="text-align:center;color:var(--text-soft);">Nenhuma indicação pendente.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Indicações Pendentes</h2><p>Consultores indicados aguardando aprovação.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Nome</th><th>E-mail</th><th>WhatsApp</th><th>Indicado por</th><th>Data</th><th>Ações</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorRankingPage() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const consultores = (app.state.users || []).filter(u => u.role === 'consultor');
    const ranked = consultores.map(u => ({ u, m: getConsultantMetrics(u) }))
        .sort((a, b) => b.m.commission - a.m.commission);
    const medals = ['🥇','🥈','🥉'];
    const rows = ranked.length ? ranked.map(({ u, m }, i) => `
        <tr>
            <td>${medals[i] || (i+1)}</td>
            <td>${esc(u.name)}</td>
            <td>${m.salesCount}</td>
            <td>${m.clientCount}</td>
            <td>R$ ${formatCurrency(m.totalFee)}</td>
            <td>R$ ${formatCurrency(m.commission)}</td>
            <td><span class="badge">${esc(m.recurrence.badge === 'badge-gold' ? '🥇 Ouro' : m.recurrence.badge === 'badge-silver' ? '🥈 Prata' : m.recurrence.label)}</span></td>
        </tr>`).join('') : `<tr><td colspan="7" style="text-align:center;color:var(--text-soft);">Nenhum consultor cadastrado.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Ranking do Mês</h2><p>Consultores ordenados por comissão no mês atual.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>#</th><th>Consultor</th><th>Vendas mês</th><th>Clientes</th><th>Mensalidades</th><th>Comissão</th><th>Badge</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderInstPendentesList() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const pending = app.state.pendingInstallations || [];
    const rows = pending.length ? pending.map(p => {
        const inst = (app.state.users || []).find(u => u.id === p.instaladorId);
        return `<tr>
            <td>${esc(p.clientName || '—')}</td>
            <td>${esc(inst ? inst.name : '—')}</td>
            <td>${esc(p.plate || '—')}</td>
            <td>${esc(p.createdAt || '—')}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--text-soft);">Nenhuma instalação pendente.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Instalações Pendentes</h2><p>Veículos aguardando registro fotográfico.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>Instalador</th><th>Placa</th><th>Data</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorDocsPendentes() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const clientes = (app.state.users || []).filter(u => u.role === 'cliente');
    const withPending = clientes.filter(u => {
        const items = (app.state.docChecklists || {})[u.id] || [];
        return items.some(i => !i.done);
    });
    const rows = withPending.length ? withPending.map(u => {
        const items = (app.state.docChecklists || {})[u.id] || [];
        const done = items.filter(i => i.done).length;
        return `<tr>
            <td>${esc(u.name)}</td>
            <td>${esc(u.email)}</td>
            <td>${done}/${items.length}</td>
            <td>${items.length - done} pendente${items.length - done !== 1 ? 's' : ''}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--text-soft);">Nenhum documento pendente.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Documentos Pendentes</h2><p>Clientes com documentos não enviados.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>E-mail</th><th>Progresso</th><th>Pendências</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorFormsIncompletos() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const clientes = (app.state.users || []).filter(u => u.role === 'cliente');
    const incomplete = clientes.filter(u => {
        const contracted = u.contractedServices || [];
        return contracted.some(key => {
            const svc = SERVICE_MAP.find(s => s.key === key);
            if (!svc) return false;
            const formKey = `${u.id}_${key}`;
            const fs = (app.state.segmentForms || {})[formKey] || { data: {} };
            return calcSegmentProgress(svc.product, fs.data || {}) < 100;
        });
    });
    const rows = incomplete.length ? incomplete.map(u => {
        const contracted = u.contractedServices || [];
        const incompleteServices = contracted.filter(key => {
            const svc = SERVICE_MAP.find(s => s.key === key);
            if (!svc) return false;
            const fs = (app.state.segmentForms || {})[`${u.id}_${key}`] || { data: {} };
            return calcSegmentProgress(svc.product, fs.data || {}) < 100;
        });
        return `<tr>
            <td>${esc(u.name)}</td>
            <td>${esc(u.email)}</td>
            <td>${incompleteServices.map(k => { const s = SERVICE_MAP.find(sv => sv.key === k); return s ? esc(s.label) : k; }).join(', ')}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="3" style="text-align:center;color:var(--text-soft);">Nenhum formulário incompleto.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Formulários Incompletos</h2><p>Clientes com formulários de serviço incompletos.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>E-mail</th><th>Serviços incompletos</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderHistoricoVendas() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const fechados = (app.state.clients || []).filter(c => c.stage === 'Fechado')
        .sort((a, b) => (b.closedDate || '').localeCompare(a.closedDate || ''));
    const rows = fechados.length ? fechados.map(c => {
        const cons = (app.state.users || []).find(u => u.id === c.consultantId);
        return `<tr>
            <td>${esc(c.name)}</td>
            <td>${esc(c.plan || '—')}</td>
            <td>R$ ${formatCurrency(c.monthlyFee || 0)}</td>
            <td>${esc(c.closedDate || '—')}</td>
            <td>${esc(cons ? cons.name : '—')}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="5" style="text-align:center;color:var(--text-soft);">Nenhuma venda fechada.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Histórico de Vendas</h2><p>Todos os clientes que fecharam contrato.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>Plano</th><th>Mensalidade</th><th>Data fechamento</th><th>Consultor</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorRelatorios() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const consultores = (app.state.users || []).filter(u => u.role === 'consultor');
    const instaladores = (app.state.users || []).filter(u => u.role === 'instalador');
    const clientes = (app.state.clients || []);
    const fechadosMes = clientes.filter(isClosedThisMonth);
    const totalFees = clientes.filter(c => c.stage === 'Fechado').reduce((s, c) => s + (c.monthlyFee || 0), 0);
    const totalComissoes = consultores.reduce((s, u) => s + getConsultantMetrics(u).commission, 0);
    el.innerHTML = `
        <div class="section-header"><div><h2>Relatórios</h2><p>Resumo consolidado do período.</p></div></div>
        <div class="cards-grid">
            <div class="card"><h3>Consultores</h3><div class="metric">${consultores.length}</div></div>
            <div class="card"><h3>Instaladores</h3><div class="metric">${instaladores.length}</div></div>
            <div class="card"><h3>Total de Clientes</h3><div class="metric">${clientes.length}</div></div>
            <div class="card"><h3>Vendas este Mês</h3><div class="metric">${fechadosMes.length}</div></div>
            <div class="card"><h3>Receita Recorrente</h3><div class="metric" style="font-size:1.4rem;">R$ ${formatCurrency(totalFees)}</div><small>mensalidades ativas</small></div>
            <div class="card"><h3>Comissões Previstas</h3><div class="metric" style="font-size:1.4rem;">R$ ${formatCurrency(totalComissoes)}</div><small>consultores este mês</small></div>
        </div>`;
}

function renderGestorComissoes() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const consultores = (app.state.users || []).filter(u => u.role === 'consultor');
    const rows = consultores.length ? consultores.map(u => {
        const m = getConsultantMetrics(u);
        return `<tr>
            <td>${esc(u.name)}</td>
            <td>${m.salesCount}</td>
            <td>R$ ${formatCurrency(m.saleCommission)}</td>
            <td>${m.percent}%</td>
            <td>R$ ${formatCurrency(m.recurrenceComm)}</td>
            <td><strong>R$ ${formatCurrency(m.commission)}</strong></td>
        </tr>`;
    }).join('') : `<tr><td colspan="6" style="text-align:center;color:var(--text-soft);">Nenhum consultor cadastrado.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Comissões do Mês</h2><p>Breakdown de comissões por consultor.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Consultor</th><th>Vendas</th><th>Comissão Vendas</th><th>% Recorrência</th><th>Comissão Recorrência</th><th>Total</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorRecorrencias() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const eligible = (app.state.clients || []).filter(isClientEligibleForRecurrence);
    const rows = eligible.length ? eligible.map(c => {
        const cons = (app.state.users || []).find(u => u.id === c.consultantId);
        return `<tr>
            <td>${esc(c.name)}</td>
            <td>${esc(c.plan || '—')}</td>
            <td>R$ ${formatCurrency(c.monthlyFee || 0)}</td>
            <td>${esc(cons ? cons.name : '—')}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--text-soft);">Nenhum cliente elegível ainda.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Recorrências</h2><p>Clientes elegíveis para comissão recorrente.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>Plano</th><th>Mensalidade</th><th>Consultor</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderGestorBonus() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    el.innerHTML = `
        <div class="section-header"><div><h2>Bônus</h2><p>Sistema de bônus para consultores e instaladores.</p></div></div>
        <div class="card" style="text-align:center;padding:48px 24px;">
            <div style="font-size:3rem;margin-bottom:16px;">⭐</div>
            <h3 style="margin:0 0 8px;">Em breve</h3>
            <p class="text-muted">O sistema de bônus estará disponível em breve.</p>
        </div>`;
}

function renderGestorExtrato() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const consultores = (app.state.users || []).filter(u => u.role === 'consultor');
    const instaladores = (app.state.users || []).filter(u => u.role === 'instalador');
    const totalCons = consultores.reduce((s, u) => s + getConsultantMetrics(u).commission, 0);
    const totalInst = instaladores.reduce((s, u) => s + getInstaladorMetrics(u).totalToReceive, 0);
    const consRows = consultores.map(u => {
        const m = getConsultantMetrics(u);
        return `<tr><td>${esc(u.name)}</td><td>Consultor</td><td>R$ ${formatCurrency(m.commission)}</td></tr>`;
    }).join('');
    const instRows = instaladores.map(u => {
        const m = getInstaladorMetrics(u);
        return `<tr><td>${esc(u.name)}</td><td>Instalador</td><td>R$ ${formatCurrency(m.totalToReceive)}</td></tr>`;
    }).join('');
    el.innerHTML = `
        <div class="section-header"><div><h2>Extrato Geral</h2><p>Resumo de comissões de todos os colaboradores.</p></div></div>
        <div class="card" style="overflow-x:auto;margin-bottom:16px;">
            <table>
                <thead><tr><th>Nome</th><th>Função</th><th>Total a Pagar</th></tr></thead>
                <tbody>${consRows}${instRows}</tbody>
                <tfoot><tr><td colspan="2"><strong>Total geral</strong></td><td><strong>R$ ${formatCurrency(totalCons + totalInst)}</strong></td></tr></tfoot>
            </table>
        </div>`;
}

function renderGestorMetas() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    if (!app.state.goals) app.state.goals = { default: 10, byConsultant: {} };
    const goals = app.state.goals;
    const consultants = (app.state.users || []).filter(u => u.role === 'consultor');

    const rows = consultants.map(u => {
        const m    = getConsultantMetrics(u);
        const goal = getGoalForConsultant(u.id);
        const pct  = goal > 0 ? Math.min(100, Math.round((m.salesCount / goal) * 100)) : 0;
        const fillCls = pct >= 100 ? 'complete' : pct >= 50 ? 'on-track' : '';
        return `<tr>
            <td><strong>${esc(u.name)}</strong><br><small class="text-muted">${esc(u.email)}</small></td>
            <td style="text-align:center;">${m.salesCount}</td>
            <td>
                <div style="display:flex;align-items:center;gap:8px;">
                    <input type="number" class="meta-input" data-uid="${esc(u.id)}" value="${goal}" min="1" max="999" style="width:72px;padding:5px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.88rem;">
                    <button class="secondary-btn" style="padding:4px 10px;font-size:0.78rem;" data-save-uid="${esc(u.id)}">Salvar</button>
                </div>
            </td>
            <td>
                <div style="display:flex;align-items:center;gap:8px;min-width:130px;">
                    <div class="meta-progress-track" style="flex:1;"><div class="meta-progress-fill ${fillCls}" style="width:${pct}%"></div></div>
                    <span style="font-size:0.78rem;color:var(--text-soft);white-space:nowrap;font-weight:600;">${pct}%</span>
                </div>
            </td>
        </tr>`;
    }).join('');

    el.innerHTML = `
        <div class="section-header"><div><h2>Metas Mensais</h2><p>Configure metas individuais de vendas para cada consultor.</p></div></div>
        <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                <span style="font-weight:600;font-size:0.9rem;">Meta padrão global:</span>
                <input type="number" id="defaultGoalInput" value="${goals.default || 10}" min="1" max="999" style="width:80px;padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:0.88rem;">
                <button type="button" class="primary-btn" id="saveDefaultGoal" style="padding:8px 16px;">Salvar padrão</button>
                <span class="text-muted" style="font-size:0.8rem;">Aplicado a consultores sem meta individual</span>
            </div>
        </div>
        <div class="card" style="overflow-x:auto;">
            ${consultants.length === 0 ? '<p class="text-muted" style="padding:16px 0;">Nenhum consultor cadastrado.</p>' : `
            <table>
                <thead><tr><th>Consultor</th><th>Vendas (mês)</th><th>Meta individual</th><th>Progresso</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`}
        </div>`;

    document.getElementById('saveDefaultGoal')?.addEventListener('click', () => {
        const val = parseInt(document.getElementById('defaultGoalInput').value);
        if (!isNaN(val) && val > 0) {
            app.state.goals.default = val;
            saveState();
            renderGestorMetas();
        }
    });
    el.querySelectorAll('[data-save-uid]').forEach(btn => {
        btn.addEventListener('click', () => {
            const uid = btn.dataset.saveUid;
            const input = el.querySelector(`.meta-input[data-uid="${uid}"]`);
            const val = parseInt(input?.value);
            if (!isNaN(val) && val > 0) {
                if (!app.state.goals.byConsultant) app.state.goals.byConsultant = {};
                app.state.goals.byConsultant[uid] = val;
                saveState();
                renderGestorMetas();
            }
        });
    });
}

function renderGestorPlanos() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const cards = planList.map(p => `
        <div class="card" style="text-align:center;">
            <div style="font-size:2rem;margin-bottom:12px;">💎</div>
            <h3 style="font-size:1.1rem;color:var(--text);">${esc(p.name)}</h3>
            <div class="metric" style="font-size:1.5rem;margin:10px 0;">${p.price ? 'R$ ' + formatCurrency(p.price) : 'Sob consulta'}</div>
            ${p.price ? '<small class="text-muted">por mês</small>' : ''}
        </div>`).join('');
    el.innerHTML = `
        <div class="section-header"><div><h2>Planos e Preços</h2><p>Portfólio atual de planos Tracktiv.</p></div></div>
        <div class="cards-grid">${cards}</div>`;
}

function renderLeadsPorEtapa() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const uid = app.currentUser.id;
    const myClients = (app.state.clients || []).filter(c => c.consultantId === uid);
    const etapasHtml = stageOrder.map(stage => {
        const leads = myClients.filter(c => c.stage === stage);
        if (!leads.length) return '';
        const items = leads.map(c => `<div style="padding:8px 0;border-bottom:1px solid var(--border);">${esc(c.name)} — <small>${esc(c.plan || '—')}</small></div>`).join('');
        return `<div class="card" style="margin-bottom:16px;">
            <h3>${esc(stage)} <span style="color:var(--accent);">(${leads.length})</span></h3>
            ${items}
        </div>`;
    }).join('');
    el.innerHTML = `
        <div class="section-header"><div><h2>Leads por Etapa</h2><p>Seus leads agrupados por etapa do funil.</p></div></div>
        ${etapasHtml || '<div class="card"><p class="text-muted">Nenhum cliente cadastrado.</p></div>'}`;
}

function renderScoreLeads() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const uid = app.currentUser.id;
    const myClients = (app.state.clients || []).filter(c => c.consultantId === uid)
        .map(c => ({ ...c, score: calcScore(c) }))
        .sort((a, b) => b.score - a.score);
    const rows = myClients.length ? myClients.map(c => {
        const temp = getScoreTemp(c.score);
        return `<tr>
            <td>${esc(c.name)}</td>
            <td>${esc(c.stage)}</td>
            <td><span class="${temp.cls}">${temp.emoji} ${c.score}</span></td>
            <td>${esc(temp.label)}</td>
        </tr>`;
    }).join('') : `<tr><td colspan="4" style="text-align:center;color:var(--text-soft);">Nenhum cliente cadastrado.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Score de Leads</h2><p>Seus leads ordenados por propensão de compra.</p></div></div>
        <div class="card" style="overflow-x:auto;">
            <table>
                <thead><tr><th>Cliente</th><th>Etapa</th><th>Score</th><th>Temperatura</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

function renderConsRecorrencia() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const uid = app.currentUser.id;
    const myClients = (app.state.clients || []).filter(c => c.consultantId === uid);
    const m = getConsultantMetrics(app.currentUser);
    const eligible = myClients.filter(isClientEligibleForRecurrence);
    const rows = eligible.length ? eligible.map(c => `<tr>
        <td>${esc(c.name)}</td>
        <td>${esc(c.plan || '—')}</td>
        <td>R$ ${formatCurrency(c.monthlyFee || 0)}</td>
    </tr>`).join('') : `<tr><td colspan="3" style="text-align:center;color:var(--text-soft);">Nenhum cliente elegível ainda.</td></tr>`;
    el.innerHTML = `
        <div class="section-header"><div><h2>Recorrência</h2><p>Detalhamento da sua recorrência este mês.</p></div></div>
        <div class="cards-grid" style="margin-bottom:16px;">
            <div class="card"><h3>Status</h3><div class="metric" style="font-size:1.3rem;"><span class="badge ${m.recurrence.badge}">${esc(m.recurrence.label)}</span></div></div>
            <div class="card"><h3>Taxa</h3><div class="metric">${m.percent}%</div></div>
            <div class="card"><h3>Comissão Recorrência</h3><div class="metric" style="font-size:1.3rem;">R$ ${formatCurrency(m.recurrenceComm)}</div></div>
        </div>
        <div class="card" style="overflow-x:auto;">
            <h3 style="margin:0 0 14px;">Clientes elegíveis</h3>
            <table>
                <thead><tr><th>Cliente</th><th>Plano</th><th>Mensalidade</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <p class="text-muted" style="margin-top:12px;font-size:0.88rem;">${esc(m.recurrence.hint)}</p>`;
}

function renderConsBonus() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    el.innerHTML = `
        <div class="section-header"><div><h2>Bônus de Indicação</h2><p>Ganhos por indicações de novos consultores.</p></div></div>
        <div class="card" style="text-align:center;padding:48px 24px;">
            <div style="font-size:3rem;margin-bottom:16px;">⭐</div>
            <h3 style="margin:0 0 8px;">Em breve</h3>
            <p class="text-muted">O módulo de bônus de indicação estará disponível em breve.</p>
        </div>`;
}

function renderConsExtrato() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const m = getConsultantMetrics(app.currentUser);
    el.innerHTML = `
        <div class="section-header"><div><h2>Extrato</h2><p>Histórico de comissões — ${esc(getCurrentMonthLabel())}.</p></div></div>
        <div class="card">
            <div class="extrato-block">
                <div class="extrato-block-header">Vendas do Mês</div>
                <div class="extrato-item"><div>Vendas fechadas</div><div><strong>${m.salesCount}</strong></div></div>
                <div class="extrato-item"><div>Comissão por venda</div><div>R$ ${formatCurrency(SALE_COMMISSION)}</div></div>
                <div class="extrato-subtotal"><div>Subtotal vendas</div><div>R$ ${formatCurrency(m.saleCommission)}</div></div>
            </div>
            <div class="extrato-block">
                <div class="extrato-block-header">Recorrência</div>
                <div class="extrato-item"><div>Clientes na base</div><div><strong>${m.clientCount}</strong></div></div>
                <div class="extrato-item"><div>Taxa de recorrência</div><div>${m.percent}%</div></div>
                <div class="extrato-item"><div>Base de mensalidades</div><div>R$ ${formatCurrency(m.totalFee)}</div></div>
                <div class="extrato-subtotal"><div>Subtotal recorrência</div><div>R$ ${formatCurrency(m.recurrenceComm)}</div></div>
            </div>
            <div class="extrato-total"><div>Total a receber — ${esc(getCurrentMonthLabel())}</div><div>R$ ${formatCurrency(m.commission)}</div></div>
        </div>`;
}

function renderConsCertificados() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const uid = app.currentUser.id;
    const tp = app.state.trainingProgress || {};
    const completed = trainingData.filter(mod => {
        const prog = tp[mod.id] || {};
        return prog.quizPassed;
    });
    const cards = completed.length ? completed.map(mod => `
        <div class="certificate-card">
            <div class="certificate-icon">🏅</div>
            <h3 style="margin:0 0 6px;">${esc(mod.title)}</h3>
            <p class="text-muted" style="margin:0 0 10px;">Certificado de conclusão</p>
            <div style="font-size:0.84rem;color:var(--text-soft);">Pontuação: ${(tp[mod.id]||{}).bestScore || 0}/10</div>
        </div>`).join('') : '';
    el.innerHTML = `
        <div class="section-header"><div><h2>Meus Certificados</h2><p>Módulos concluídos com aprovação no quiz.</p></div></div>
        ${completed.length ? `<div class="cards-grid">${cards}</div>` : `<div class="card" style="text-align:center;padding:48px 24px;"><div style="font-size:3rem;margin-bottom:16px;">🎓</div><h3 style="margin:0 0 8px;">Nenhum certificado ainda</h3><p class="text-muted">Complete os quizzes dos módulos de treinamento para ganhar certificados.</p></div>`}`;
}

function renderIndicarConsultor() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    // Check if already has a pending/approved referral
    const uid = app.currentUser.id;
    const alreadyReferred = (app.state.users || []).some(u => u.referrerId === uid) ||
        (app.state.pendingUsers || []).some(u => u.referrerId === uid);
    if (alreadyReferred) {
        el.innerHTML = `
            <div class="section-header"><div><h2>Indicar Consultor</h2><p>Indique um novo consultor para a equipe.</p></div></div>
            <div class="card" style="text-align:center;padding:32px 24px;">
                <div style="font-size:2rem;margin-bottom:12px;">✅</div>
                <h3>Indicação já realizada</h3>
                <p class="text-muted">Você já indicou um consultor. Aguarde a aprovação do gestor.</p>
            </div>`;
        return;
    }
    el.innerHTML = `
        <div class="section-header"><div><h2>Indicar Consultor</h2><p>Indique um novo consultor para a equipe Tracktiv.</p></div></div>
        <div class="card" style="max-width:520px;">
            <form id="indicarForm">
                <div class="field" style="margin-bottom:14px;"><label>Nome *</label><input id="indNome" type="text" required /></div>
                <div class="field" style="margin-bottom:14px;"><label>E-mail *</label><input id="indEmail" type="email" required /></div>
                <div class="field" style="margin-bottom:14px;"><label>WhatsApp</label><input id="indWa" type="tel" placeholder="(11) 99999-9999" /></div>
                <div class="field" style="margin-bottom:14px;"><label>Senha provisória *</label><input id="indPass" type="text" required /></div>
                <div id="indErr" class="error-text" style="margin-bottom:8px;"></div>
                <button type="submit" class="primary-btn">Enviar Indicação</button>
            </form>
        </div>`;
    document.getElementById('indicarForm').addEventListener('submit', e => {
        e.preventDefault();
        const name  = document.getElementById('indNome').value.trim();
        const email = document.getElementById('indEmail').value.trim().toLowerCase();
        const wa    = document.getElementById('indWa').value.trim();
        const pass  = document.getElementById('indPass').value.trim();
        const err   = document.getElementById('indErr');
        err.textContent = '';
        if (!name || !email || !pass) { err.textContent = 'Preencha todos os campos obrigatórios.'; return; }
        if ((app.state.users || []).some(u => u.email === email)) { err.textContent = 'Este e-mail já está em uso.'; return; }
        if ((app.state.pendingUsers || []).some(u => u.email === email)) { err.textContent = 'Já existe uma indicação com este e-mail.'; return; }
        if (!app.state.pendingUsers) app.state.pendingUsers = [];
        app.state.pendingUsers.push({ id: `pending_${Date.now()}`, name, email, password: pass, whatsapp: wa, role: 'consultor', referrerId: uid, requestedAt: todayISO() });
        const gestorRef = (app.state.users || []).find(u => u.role === 'gestor');
        if (gestorRef) addNotification(gestorRef.id, 'new_consultant_referred', `👥 Novo consultor indicado pendente: ${name} (indicado por ${app.currentUser.name})`, { section: 'gestorConsultores' });
        saveState();
        renderIndicarConsultor();
    });
}

function renderMinhaIndicacao() {
    const el = document.getElementById('pageContent');
    if (!el) return;
    const uid = app.currentUser.id;
    const u = app.currentUser;
    const referrer = u.referrerId ? (app.state.users || []).find(r => r.id === u.referrerId) : null;
    el.innerHTML = `
        <div class="section-header"><div><h2>Minha Indicação</h2><p>Informações sobre quem te indicou para a Tracktiv.</p></div></div>
        <div class="card">
            ${referrer
                ? `<div style="display:flex;align-items:center;gap:16px;">
                    <div style="font-size:3rem;">🤝</div>
                    <div>
                        <h3 style="margin:0 0 4px;">Indicado por ${esc(referrer.name)}</h3>
                        <p class="text-muted" style="margin:0;">${esc(referrer.email)}</p>
                        ${referrer.whatsapp ? `<p class="text-muted" style="margin:4px 0 0;">${esc(referrer.whatsapp)}</p>` : ''}
                    </div>
                </div>`
                : `<div style="text-align:center;padding:24px;">
                    <div style="font-size:2rem;margin-bottom:12px;">ℹ️</div>
                    <p class="text-muted">Você não foi indicado por nenhum consultor.</p>
                </div>`
            }
        </div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   NOTIFICAÇÕES
═══════════════════════════════════════════════════════════════════ */

const NOTIF_ICONS = {
    sale_approved: '✅', sale_rejected: '❌', new_sale_pending: '💼',
    install_complete: '🔧', install_pending: '🔧', new_consultant_referred: '👥',
    meta_50: '🎯', meta_80: '🔥', meta_100: '🏆',
    new_message: '💬', new_document: '📄', points_credited: '🎁', followup_overdue: '⏰'
};

function addNotification(targetUserId, type, message, linkAction) {
    if (!targetUserId) return;
    if (!app.state.notifications) app.state.notifications = [];
    const cutoff = thirtyDaysAgoISO(30);
    app.state.notifications = app.state.notifications.filter(n => n.createdAt >= cutoff);
    app.state.notifications.push({
        id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        targetUserId, type, message, read: false,
        createdAt: new Date().toISOString(),
        linkAction: linkAction || null
    });
    saveState();
    updateNotifBadge();
}

function updateNotifBadge() {
    if (!app.currentUser) return;
    const uid = app.currentUser.id;
    const unread = (app.state.notifications || []).filter(n => n.targetUserId === uid && !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (badge) {
        badge.textContent = unread > 99 ? '99+' : String(unread);
        badge.classList.toggle('hidden', unread === 0);
    }
    const chatUnread = getChatUnreadCount();
    const chatBadge = document.getElementById('chatBadge');
    if (chatBadge) {
        chatBadge.textContent = chatUnread > 99 ? '99+' : String(chatUnread);
        chatBadge.classList.toggle('hidden', chatUnread === 0);
    }
}

function toggleNotifPanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel) return;
    const wasHidden = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (wasHidden) {
        renderNotifPanel();
        document.getElementById('chatOverlay')?.classList.add('hidden');
    }
}

function renderNotifPanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel || !app.currentUser) return;
    const uid = app.currentUser.id;
    const cutoff = thirtyDaysAgoISO(30);
    const notifs = (app.state.notifications || [])
        .filter(n => n.targetUserId === uid && n.createdAt >= cutoff)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const listHtml = notifs.length === 0
        ? `<div class="notif-empty">Nenhuma notificação nos últimos 30 dias.</div>`
        : notifs.map(n => {
            const icon = NOTIF_ICONS[n.type] || '🔔';
            return `<div class="notif-item ${n.read ? '' : 'unread'}" data-nid="${esc(n.id)}" ${n.linkAction ? `data-link='${JSON.stringify(n.linkAction).replace(/'/g,"&#39;")}'` : ''}>
                <div class="notif-item-icon">${icon}</div>
                <div class="notif-item-body">
                    <p class="notif-item-msg">${esc(n.message)}</p>
                    <span class="notif-item-time">${fmtNotifTime(n.createdAt)}</span>
                </div>
                ${!n.read ? '<div class="notif-item-dot"></div>' : ''}
            </div>`;
        }).join('');

    panel.innerHTML = `
        <div class="notif-panel-header">
            <strong>Notificações</strong>
            <button type="button" id="markAllReadBtn">✓ Marcar todas lidas</button>
        </div>
        <div class="notif-list">${listHtml}</div>`;

    document.getElementById('markAllReadBtn')?.addEventListener('click', () => {
        (app.state.notifications || []).forEach(n => { if (n.targetUserId === uid) n.read = true; });
        saveState(); updateNotifBadge(); renderNotifPanel();
    });

    panel.querySelectorAll('.notif-item').forEach(el => {
        el.addEventListener('click', () => {
            const n = (app.state.notifications || []).find(x => x.id === el.dataset.nid);
            if (n) { n.read = true; saveState(); updateNotifBadge(); }
            const linkStr = el.dataset.link;
            if (linkStr) {
                try {
                    const action = JSON.parse(linkStr);
                    panel.classList.add('hidden');
                    if (action.section) {
                        showSection(action.section);
                        renderActiveSection(action.section);
                    } else if (action.render) {
                        const fns = {
                            renderFollowUpCalendar, renderGestorRelatorios,
                            renderGestorMetas, renderGestorComissoes
                        };
                        showSection('dynamicContent');
                        if (fns[action.render]) fns[action.render]();
                    }
                } catch(e) { /* invalid link */ }
            }
            renderNotifPanel();
        });
    });
}

function fmtNotifTime(iso) {
    try {
        const d = new Date(iso);
        const ms = Date.now() - d;
        const min = Math.floor(ms / 60000);
        const hr  = Math.floor(ms / 3600000);
        const day = Math.floor(ms / 86400000);
        if (min < 1)  return 'Agora';
        if (min < 60) return `${min}min atrás`;
        if (hr  < 24) return `${hr}h atrás`;
        if (day < 7)  return `${day}d atrás`;
        return formatDate(iso.slice(0, 10));
    } catch { return ''; }
}

/* ═══════════════════════════════════════════════════════════════════
   METAS MENSAIS
═══════════════════════════════════════════════════════════════════ */

const TRAK_META_MSGS = [
    ['Calma, a viagem começa com o primeiro passo! 🚀 Você tem tempo para mudar o jogo este mês.', 'Cada grande vendedor já esteve onde você está. Foque em uma venda por vez! 💪'],
    ['Boa! Você está no caminho certo. Continue assim! 🌟', 'Metade do caminho percorrido — o segundo tempo é onde os campeões brilham! ⚡'],
    ['Quase lá! Você está a um passo do objetivo. Não para agora! 🔥', 'Que ritmo! A linha de chegada está bem perto. Vai fundo! 🏃'],
    ['META BATIDA! Você é um(a) monstro das vendas! 🏆🥇', 'SENSACIONAL! Você bateu a meta! Hora de celebrar — e mirar mais alto! 🎉'],
    ['ALÉM DA META! Você está em outro nível. Isso é excelência pura! 🌟🏆', 'Acima e além! Cada venda extra é comissão extra no bolso. Lenda! 💰🔥']
];

function getGoalForConsultant(userId) {
    const g = app.state.goals || {};
    const byC = g.byConsultant || {};
    return byC[userId] != null ? byC[userId] : (g.default || 10);
}

function checkMetaAlerts(consultantId) {
    const consultant = (app.state.users || []).find(u => u.id === consultantId);
    if (!consultant) return;
    const m = getConsultantMetrics(consultant);
    const goal = getGoalForConsultant(consultantId);
    if (goal <= 0) return;
    const pct = (m.salesCount / goal) * 100;
    if (!app.state.metaAlertsSent) app.state.metaAlertsSent = {};
    const key  = `${consultantId}_${getCurrentMonthKey()}`;
    const sent = app.state.metaAlertsSent[key] || 0;
    const gestor = (app.state.users || []).find(u => u.role === 'gestor');
    if (pct >= 100 && sent < 100) {
        app.state.metaAlertsSent[key] = 100;
        addNotification(consultantId, 'meta_100', `🏆 Você bateu sua meta de ${goal} vendas este mês!`, { section: 'consultorDashboard' });
        if (gestor) addNotification(gestor.id, 'meta_100', `🏆 ${consultant.name} bateu a meta de ${goal} vendas!`, { render: 'renderGestorMetas' });
    } else if (pct >= 80 && sent < 80) {
        app.state.metaAlertsSent[key] = 80;
        addNotification(consultantId, 'meta_80', `🔥 Você está em ${Math.round(pct)}% da meta! (${m.salesCount}/${goal} vendas)`, { section: 'consultorDashboard' });
        if (gestor) addNotification(gestor.id, 'meta_80', `🔥 ${consultant.name} está em ${Math.round(pct)}% da meta!`, { render: 'renderGestorMetas' });
    } else if (pct >= 50 && sent < 50) {
        app.state.metaAlertsSent[key] = 50;
        addNotification(consultantId, 'meta_50', `🎯 Você chegou em 50% da meta! (${m.salesCount}/${goal} vendas)`, { section: 'consultorDashboard' });
        if (gestor) addNotification(gestor.id, 'meta_50', `🎯 ${consultant.name} chegou em 50% da meta.`, { render: 'renderGestorMetas' });
    }
    saveState();
}

function renderConsMetaWidget(containerId) {
    const el = document.getElementById(containerId);
    if (!el || !app.currentUser) return;
    const goal  = getGoalForConsultant(app.currentUser.id);
    const m     = getConsultantMetrics(app.currentUser);
    const sales = m.salesCount;
    const pct   = goal > 0 ? Math.min(100, Math.round((sales / goal) * 100)) : 0;
    const over  = sales > goal;
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysLeft    = daysInMonth - today.getDate();
    const daysPassed  = today.getDate();
    const projection  = daysPassed > 0 ? Math.round((sales / daysPassed) * daysInMonth) : 0;
    const msgIdx      = over ? 4 : pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 50 ? 1 : 0;
    const msgs        = TRAK_META_MSGS[msgIdx];
    const msg         = msgs[Math.floor(Math.random() * msgs.length)];
    const fillCls     = pct >= 100 ? 'complete' : pct >= 50 ? 'on-track' : '';
    const pctColor    = pct >= 100 ? '#22c55e' : pct >= 80 ? 'var(--primary)' : '#f59e0b';

    el.innerHTML = `<div class="card" style="margin-bottom:8px;">
        <h3>Meta do mês</h3>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4px;">
            <div>
                <span class="metric" style="font-size:1.9rem;">${sales}</span>
                <span class="text-muted" style="font-size:0.88rem;"> / ${goal} vendas</span>
            </div>
            <span style="font-size:1.5rem;font-weight:800;color:${pctColor};">${pct}%</span>
        </div>
        <div class="meta-progress-track"><div class="meta-progress-fill ${fillCls}" style="width:${pct}%;"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:7px;font-size:0.77rem;color:var(--text-soft);">
            <span>📅 ${daysLeft} dia${daysLeft !== 1 ? 's' : ''} restante${daysLeft !== 1 ? 's' : ''}</span>
            <span>📈 Projeção: ${projection} venda${projection !== 1 ? 's' : ''}</span>
        </div>
        <div class="trak-bubble" style="margin-top:12px;">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text">${esc(msg)}</div>
        </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   FOLLOW-UP CALENDAR
═══════════════════════════════════════════════════════════════════ */

const FU_TYPES = ['Ligação', 'Visita', 'Email', 'WhatsApp'];
const FU_ICONS_MAP = { 'Ligação': '📞', 'Visita': '🤝', 'Email': '✉️', 'WhatsApp': '💬' };

function openFollowUpModal(clientId) {
    const c = (app.state.clients || []).find(x => x.id === clientId);
    if (!c) return;
    const uid = app.currentUser?.id;
    const existing = (app.state.followUps || []).filter(f => f.clientId === clientId && !f.done && f.date >= todayISO());
    const existHtml = existing.length ? `
        <div style="margin-bottom:12px;padding:10px;background:var(--surface-2);border-radius:8px;font-size:0.82rem;">
            <strong style="font-size:0.82rem;">Follow-ups já agendados:</strong>
            ${existing.map(f => `<div style="margin-top:4px;">${FU_ICONS_MAP[f.type] || '📅'} ${formatDate(f.date)}${f.time ? ' ' + f.time : ''} — ${esc(f.type)}${f.notes ? ' · ' + esc(f.notes) : ''}</div>`).join('')}
        </div>` : '';

    showModal(`📅 Agendar Follow-up — ${esc(c.name)}`, `
        ${existHtml}
        <form id="followUpForm">
            <div class="field" style="margin-bottom:12px;"><label>Data *</label><input type="date" id="fuDate" required value="${todayISO()}" min="${todayISO()}"></div>
            <div class="field" style="margin-bottom:12px;"><label>Hora</label><input type="time" id="fuTime" value="09:00"></div>
            <div class="field" style="margin-bottom:12px;">
                <label>Tipo *</label>
                <select id="fuType">${FU_TYPES.map(t => `<option value="${esc(t)}">${FU_ICONS_MAP[t] || ''} ${esc(t)}</option>`).join('')}</select>
            </div>
            <div class="field" style="margin-bottom:16px;"><label>Observação</label><input type="text" id="fuNotes" placeholder="Ex: perguntar sobre plano profissional" maxlength="200"></div>
            <div id="fuErr" class="error-text" style="margin-bottom:8px;"></div>
            <div style="display:flex;gap:10px;">
                <button type="submit" class="primary-btn">Agendar</button>
                <button type="button" id="cancelFuBtn" class="secondary-btn">Cancelar</button>
            </div>
        </form>`);

    document.getElementById('cancelFuBtn').addEventListener('click', closeModal);
    document.getElementById('followUpForm').addEventListener('submit', e => {
        e.preventDefault();
        const date  = document.getElementById('fuDate').value;
        const time  = document.getElementById('fuTime').value;
        const type  = document.getElementById('fuType').value;
        const notes = document.getElementById('fuNotes').value.trim();
        if (!date) { document.getElementById('fuErr').textContent = 'Data obrigatória.'; return; }
        if (!app.state.followUps) app.state.followUps = [];
        app.state.followUps.push({ id: `fu_${Date.now()}`, clientId, consultantId: uid, date, time, type, notes, done: false, result: null, createdAt: new Date().toISOString() });
        saveState(); closeModal();
    });
}

function renderFollowUpCalendar() {
    const el = document.getElementById('pageContent');
    if (!el || !app.currentUser) return;
    const uid = app.currentUser.id;
    const isGestor = app.currentUser.role === 'gestor';
    const todayStr = todayISO();
    const now   = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth();

    const allFUs = isGestor
        ? (app.state.followUps || [])
        : (app.state.followUps || []).filter(f => f.consultantId === uid);

    const overdue  = allFUs.filter(f => !f.done && f.date < todayStr).sort((a, b) => a.date.localeCompare(b.date));
    const todayFUs = allFUs.filter(f => !f.done && f.date === todayStr).sort((a, b) => (a.time||'').localeCompare(b.time||''));
    const upcoming = allFUs.filter(f => !f.done && f.date > todayStr).sort((a, b) => a.date.localeCompare(b.date));
    const doneList = allFUs.filter(f => f.done).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

    // Build calendar grid
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthKey    = `${year}-${String(month + 1).padStart(2, '0')}`;
    const fus4month   = allFUs.filter(f => f.date.startsWith(monthKey));
    const byDay       = {};
    fus4month.forEach(f => {
        const d = parseInt(f.date.split('-')[2]);
        if (!byDay[d]) byDay[d] = [];
        byDay[d].push(f);
    });
    const DAY_NAMES   = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

    let calHtml = `<div class="fu-calendar">`;
    DAY_NAMES.forEach(d => { calHtml += `<div class="fu-cal-day-name">${d}</div>`; });
    for (let i = 0; i < firstDay; i++) calHtml += `<div class="fu-cal-day other-month"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
        const isToday = dateStr === todayStr;
        const df      = byDay[d] || [];
        const dots    = df.slice(0, 4).map(f => `<div class="fu-cal-dot ${f.done ? 'done' : f.date < todayStr ? 'overdue' : ''}"></div>`).join('');
        calHtml += `<div class="fu-cal-day ${isToday ? 'today' : ''} ${df.length ? 'has-items' : ''}" data-fu-date="${dateStr}">
            <div class="fu-cal-day-num">${d}</div>
            <div class="fu-cal-dots">${dots}</div>
        </div>`;
    }
    calHtml += `</div>`;

    const renderItem = (f) => {
        const c    = (app.state.clients || []).find(x => x.id === f.clientId);
        const cons = (app.state.users || []).find(u => u.id === f.consultantId);
        const isOv = !f.done && f.date < todayStr;
        const icon = FU_ICONS_MAP[f.type] || '📅';
        return `<div class="fu-item ${f.done ? 'done-item' : isOv ? 'overdue' : ''}">
            <div class="fu-item-icon">${icon}</div>
            <div class="fu-item-body">
                <div class="fu-item-title">${esc(c?.name || '—')}${isOv ? ' <span style="color:#e53e3e;font-size:0.72rem;font-weight:700;">VENCIDO</span>' : ''}</div>
                <div class="fu-item-meta">${esc(f.type)} · ${formatDate(f.date)}${f.time ? ' ' + f.time : ''}${isGestor && cons ? ' · ' + esc(cons.name) : ''}</div>
                ${f.notes ? `<div class="fu-item-meta" style="margin-top:2px;">📝 ${esc(f.notes)}</div>` : ''}
                ${f.done && f.result ? `<div class="fu-item-meta" style="color:#22c55e;margin-top:2px;">✅ ${esc(f.result)}</div>` : ''}
                ${!f.done ? `<div class="fu-item-actions">
                    <button class="secondary-btn" style="padding:4px 10px;font-size:0.76rem;" data-done-fu="${esc(f.id)}">✅ Marcar feito</button>
                    ${c ? `<button class="secondary-btn" style="padding:4px 10px;font-size:0.76rem;" data-reagendar="${esc(f.id)}">📅 Reagendar</button>` : ''}
                </div>` : ''}
            </div>
        </div>`;
    };

    const sec = (title, items, empty) => `
        <h3 style="margin:20px 0 10px;font-size:0.93rem;">${title}</h3>
        ${items.length ? `<div class="fu-list">${items.map(renderItem).join('')}</div>` : `<p class="text-muted" style="font-size:0.85rem;">${empty}</p>`}`;

    const totalPend = overdue.length + todayFUs.length + upcoming.length;
    el.innerHTML = `
        <div class="section-header"><div><h2>Follow-ups${isGestor ? ' — Todos' : ''}</h2><p>Calendário e lista de acompanhamentos agendados.</p></div></div>
        <div class="card" style="margin-bottom:14px;">
            <h3 style="margin:0 0 2px;">${MONTH_NAMES[month]} ${year}</h3>
            <p class="text-muted" style="font-size:0.8rem;margin:0 0 10px;">${totalPend} pendente${totalPend!==1?'s':''} · ${doneList.length} concluído${doneList.length!==1?'s':''} (exibindo últimos)</p>
            ${calHtml}
        </div>
        <div class="card">
            ${sec('⏰ Vencidos', overdue, 'Nenhum follow-up vencido.')}
            ${sec('📅 Hoje', todayFUs, 'Nenhum follow-up para hoje.')}
            ${sec('🗓️ Próximos', upcoming.slice(0, 12), upcoming.length === 0 ? 'Nenhum follow-up futuro agendado.' : '')}
            ${doneList.length ? sec('✅ Concluídos recentes', doneList, '') : ''}
        </div>`;

    el.querySelectorAll('[data-done-fu]').forEach(btn => {
        btn.addEventListener('click', () => {
            const fu = (app.state.followUps || []).find(f => f.id === btn.dataset.doneFu);
            if (!fu) return;
            const result = prompt('Resultado do follow-up (opcional):') || '';
            fu.done = true;
            fu.result = result;
            fu.completedAt = new Date().toISOString();
            saveState();
            renderFollowUpCalendar();
        });
    });
    el.querySelectorAll('[data-reagendar]').forEach(btn => {
        btn.addEventListener('click', () => {
            const fu = (app.state.followUps || []).find(f => f.id === btn.dataset.reagendar);
            if (fu) openFollowUpModal(fu.clientId);
        });
    });
    el.querySelectorAll('.fu-cal-day[data-fu-date]').forEach(day => {
        day.addEventListener('click', () => {
            const date = day.dataset.fuDate;
            const items = allFUs.filter(f => f.date === date);
            if (!items.length) return;
            const listHtml = items.map(f => {
                const c = (app.state.clients || []).find(x => x.id === f.clientId);
                const icon = FU_ICONS_MAP[f.type] || '📅';
                return `<div class="fu-item ${f.done ? 'done-item' : ''}">
                    <div class="fu-item-icon">${icon}</div>
                    <div class="fu-item-body">
                        <div class="fu-item-title">${esc(c?.name || '—')}</div>
                        <div class="fu-item-meta">${esc(f.type)}${f.time ? ' · ' + f.time : ''}${f.done ? ' · ✅ Concluído' : ''}</div>
                        ${f.notes ? `<div class="fu-item-meta">📝 ${esc(f.notes)}</div>` : ''}
                    </div>
                </div>`;
            }).join('');
            showModal(`📅 ${formatDate(date)}`, `<div class="fu-list" style="padding:8px 0;">${listHtml}</div>`);
        });
    });
}

function renderTodayFollowUps(containerId) {
    const el = document.getElementById(containerId);
    if (!el || !app.currentUser) return;
    const uid      = app.currentUser.id;
    const todayStr = todayISO();
    const fus = (app.state.followUps || [])
        .filter(f => f.consultantId === uid && !f.done && f.date <= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date) || (a.time||'').localeCompare(b.time||''));
    if (!fus.length) { el.innerHTML = ''; return; }

    const items = fus.slice(0, 5).map(f => {
        const c  = (app.state.clients || []).find(x => x.id === f.clientId);
        const isOv = f.date < todayStr;
        const icon = FU_ICONS_MAP[f.type] || '📅';
        return `<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);">
            <span>${icon}</span>
            <div style="flex:1;">
                <div style="font-size:0.84rem;font-weight:600;">${esc(c?.name || '—')}</div>
                <div style="font-size:0.74rem;color:${isOv ? '#e53e3e' : 'var(--text-soft)'};">${isOv ? '⏰ Vencido' : (f.time || 'Hoje')} · ${esc(f.type)}</div>
            </div>
        </div>`;
    }).join('');

    el.innerHTML = `<div class="card" style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 style="margin:0;">Follow-ups${fus.some(f => f.date < todayStr) ? ' <span style="color:#e53e3e;font-size:0.75rem;">· vencidos</span>' : ''}</h3>
            <button class="secondary-btn" style="padding:3px 10px;font-size:0.76rem;" id="viewAllFUBtn">Ver todos</button>
        </div>
        ${items}
        ${fus.length > 5 ? `<div style="font-size:0.76rem;color:var(--text-soft);margin-top:7px;">+${fus.length - 5} mais</div>` : ''}
    </div>`;

    document.getElementById('viewAllFUBtn')?.addEventListener('click', () => {
        showSection('dynamicContent');
        renderFollowUpCalendar();
    });
}

/* ═══════════════════════════════════════════════════════════════════
   CHAT INTERNO
═══════════════════════════════════════════════════════════════════ */

function getChatKey(uid1, uid2) {
    return [uid1, uid2].sort((a, b) => (a === 'gestor' ? -1 : b === 'gestor' ? 1 : a.localeCompare(b))).join('__');
}

function getChatUnreadCount() {
    if (!app.currentUser || !app.state.chats) return 0;
    const uid = app.currentUser.id;
    let count = 0;
    Object.values(app.state.chats).forEach(msgs => {
        if (Array.isArray(msgs)) msgs.forEach(m => { if (m.to === uid && !m.read) count++; });
    });
    return count;
}

function sendChatMessage(targetUserId, text) {
    if (!text.trim()) return;
    const fromId = app.currentUser.id;
    const key    = getChatKey(fromId, targetUserId);
    if (!app.state.chats) app.state.chats = {};
    if (!app.state.chats[key]) app.state.chats[key] = [];
    app.state.chats[key].push({ id: `msg_${Date.now()}`, from: fromId, to: targetUserId, text: text.trim(), time: new Date().toISOString(), read: false });
    const sender = (app.state.users || []).find(u => u.id === fromId);
    const preview = text.trim().slice(0, 45) + (text.length > 45 ? '…' : '');
    addNotification(targetUserId, 'new_message', `💬 ${sender?.name || 'Mensagem'}: "${preview}"`, null);
    saveState();
    updateNotifBadge();
}

function markChatMessagesRead(otherUserId) {
    const key  = getChatKey(app.currentUser.id, otherUserId);
    const msgs = (app.state.chats || {})[key] || [];
    let changed = false;
    msgs.forEach(m => { if (m.to === app.currentUser.id && !m.read) { m.read = true; changed = true; } });
    if (changed) saveState();
    updateNotifBadge();
}

function renderChatConversation(otherUserId, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    markChatMessagesRead(otherUserId);
    const key   = getChatKey(app.currentUser.id, otherUserId);
    const msgs  = (app.state.chats || {})[key] || [];
    const other = (app.state.users || []).find(u => u.id === otherUserId);
    const myId  = app.currentUser.id;
    const isGestor = app.currentUser.role === 'gestor';

    const msgsHtml = msgs.length === 0
        ? `<div class="chat-empty">Nenhuma mensagem ainda. Diga oi! 👋</div>`
        : msgs.map(m => {
            const mine = m.from === myId;
            return `<div class="chat-bubble ${mine ? 'mine' : 'theirs'}">
                ${esc(m.text)}
                <span class="chat-bubble-meta">${fmtNotifTime(m.time)}</span>
            </div>`;
        }).join('');

    const backFn = isGestor ? `renderGestorChatPanel('${containerId}')` : `document.getElementById('chatOverlay').classList.add('hidden')`;

    el.innerHTML = `
        <div class="chat-panel-header">
            <button type="button" class="chat-back-btn" id="chatBackBtn">‹</button>
            <div class="chat-list-avatar" style="width:32px;height:32px;font-size:0.85rem;">${esc((other?.name || '?').charAt(0).toUpperCase())}</div>
            <h3>${esc(other?.name || 'Usuário')}</h3>
            <button type="button" class="chat-close-btn" id="chatCloseConvBtn">×</button>
        </div>
        <div class="chat-messages" id="chatMsgArea">${msgsHtml}</div>
        <div class="chat-input-area">
            <input type="text" id="chatMsgInput" placeholder="Digite uma mensagem…" maxlength="500" autocomplete="off">
            <button type="button" id="chatSendBtn">Enviar</button>
        </div>`;

    requestAnimationFrame(() => {
        const area = document.getElementById('chatMsgArea');
        if (area) area.scrollTop = area.scrollHeight;
    });

    document.getElementById('chatBackBtn')?.addEventListener('click', () => {
        if (isGestor) renderGestorChatPanel(containerId);
        else document.getElementById('chatOverlay')?.classList.add('hidden');
    });
    document.getElementById('chatCloseConvBtn')?.addEventListener('click', () => {
        document.getElementById('chatOverlay')?.classList.add('hidden');
    });

    const doSend = () => {
        const input = document.getElementById('chatMsgInput');
        if (!input?.value.trim()) return;
        sendChatMessage(otherUserId, input.value);
        input.value = '';
        renderChatConversation(otherUserId, containerId);
    };
    document.getElementById('chatSendBtn')?.addEventListener('click', doSend);
    document.getElementById('chatMsgInput')?.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
    });
}

function renderGestorChatPanel(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const myId  = app.currentUser.id;
    const staff = (app.state.users || []).filter(u => u.role === 'consultor' || u.role === 'instalador');

    const items = staff.map(u => {
        const key     = getChatKey(myId, u.id);
        const msgs    = (app.state.chats || {})[key] || [];
        const last    = msgs[msgs.length - 1];
        const unread  = msgs.filter(m => m.to === myId && !m.read).length;
        const preview = last ? (last.from === myId ? 'Você: ' : '') + last.text.slice(0, 42) : 'Nenhuma mensagem ainda';
        const role    = u.role === 'consultor' ? 'Consultor' : 'Instalador';
        return `<div class="chat-list-item ${unread ? 'has-unread' : ''}" data-chat-uid="${esc(u.id)}">
            <div class="chat-list-avatar">${esc(u.name.charAt(0).toUpperCase())}</div>
            <div class="chat-list-body">
                <div class="chat-list-name">${esc(u.name)} <span style="font-size:0.73rem;color:var(--text-soft);">${role}</span></div>
                <div class="chat-list-preview">${esc(preview)}</div>
            </div>
            ${unread ? `<div class="chat-unread-pill">${unread}</div>` : ''}
        </div>`;
    }).join('');

    el.innerHTML = `
        <div class="chat-panel-header">
            <h3>Mensagens</h3>
            <button type="button" class="chat-close-btn" id="chatCloseListBtn">×</button>
        </div>
        <div class="chat-messages" style="padding:10px;overflow-y:auto;">
            ${staff.length === 0 ? '<div class="chat-empty">Nenhum consultor ou instalador cadastrado.</div>' : items}
        </div>`;

    document.getElementById('chatCloseListBtn')?.addEventListener('click', () => {
        document.getElementById('chatOverlay')?.classList.add('hidden');
    });
    el.querySelectorAll('[data-chat-uid]').forEach(item => {
        item.addEventListener('click', () => renderChatConversation(item.dataset.chatUid, containerId));
    });
}

function openChatOverlay(targetUserIdOrNull) {
    const overlay = document.getElementById('chatOverlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    document.getElementById('notifPanel')?.classList.add('hidden');

    if (app.currentUser.role === 'gestor') {
        renderGestorChatPanel('chatBody');
    } else {
        const target = targetUserIdOrNull || 'gestor';
        renderChatConversation(target, 'chatBody');
    }
}

function renderGestorChatPage() {
    const el = document.getElementById('pageContent');
    if (!el || !app.currentUser) return;
    const myId  = app.currentUser.id;
    const staff = (app.state.users || []).filter(u => u.role === 'consultor' || u.role === 'instalador');

    const buildConv = (uid) => {
        const key     = getChatKey(myId, uid);
        const msgs    = (app.state.chats || {})[key] || [];
        const other   = (app.state.users || []).find(u => u.id === uid);
        const unread  = msgs.filter(m => m.to === myId && !m.read).length;
        const last    = msgs[msgs.length - 1];
        const preview = last ? (last.from === myId ? 'Você: ' : '') + last.text.slice(0, 50) : 'Nenhuma mensagem ainda';
        const role    = other?.role === 'consultor' ? 'Consultor' : 'Instalador';
        return `<div class="chat-list-item ${unread ? 'has-unread' : ''}" data-page-chat="${esc(uid)}" style="cursor:pointer;">
            <div class="chat-list-avatar">${esc((other?.name || '?').charAt(0).toUpperCase())}</div>
            <div class="chat-list-body">
                <div class="chat-list-name">${esc(other?.name || '?')} <span style="font-size:0.73rem;color:var(--text-soft);">${role}</span></div>
                <div class="chat-list-preview">${esc(preview)}</div>
            </div>
            ${unread ? `<div class="chat-unread-pill">${unread}</div>` : ''}
        </div>`;
    };

    el.innerHTML = `
        <div class="section-header"><div><h2>Mensagens</h2><p>Conversas com consultores e instaladores.</p></div></div>
        <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;height:520px;">
            <div class="card" style="padding:12px;overflow-y:auto;height:100%;">
                ${staff.length === 0
                    ? '<p class="text-muted" style="font-size:0.85rem;padding:12px 0;">Nenhum consultor ou instalador.</p>'
                    : staff.map(u => buildConv(u.id)).join('')}
            </div>
            <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;height:100%;" id="pageChatConv">
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-soft);font-size:0.9rem;">
                    ← Selecione uma conversa
                </div>
            </div>
        </div>`;

    const renderPageConv = (uid) => {
        markChatMessagesRead(uid);
        const key   = getChatKey(myId, uid);
        const msgs  = (app.state.chats || {})[key] || [];
        const other = (app.state.users || []).find(u => u.id === uid);
        const msgsHtml = msgs.length === 0
            ? '<div class="chat-empty">Nenhuma mensagem ainda. Diga oi! 👋</div>'
            : msgs.map(m => `<div class="chat-bubble ${m.from === myId ? 'mine' : 'theirs'}">${esc(m.text)}<span class="chat-bubble-meta">${fmtNotifTime(m.time)}</span></div>`).join('');
        const conv = document.getElementById('pageChatConv');
        if (!conv) return;
        conv.innerHTML = `
            <div class="chat-panel-header" style="border-radius:0;">
                <div class="chat-list-avatar" style="width:30px;height:30px;font-size:0.8rem;">${esc((other?.name||'?').charAt(0).toUpperCase())}</div>
                <h3>${esc(other?.name||'?')}</h3>
            </div>
            <div class="chat-messages" id="pageMsgArea">${msgsHtml}</div>
            <div class="chat-input-area">
                <input type="text" id="pageChatInput" placeholder="Digite uma mensagem…" maxlength="500" autocomplete="off">
                <button type="button" id="pageChatSend">Enviar</button>
            </div>`;
        requestAnimationFrame(() => {
            const area = document.getElementById('pageMsgArea');
            if (area) area.scrollTop = area.scrollHeight;
        });
        const doSend = () => {
            const inp = document.getElementById('pageChatInput');
            if (!inp?.value.trim()) return;
            sendChatMessage(uid, inp.value);
            inp.value = '';
            renderPageConv(uid);
            renderGestorChatPage();
        };
        document.getElementById('pageChatSend')?.addEventListener('click', doSend);
        document.getElementById('pageChatInput')?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } });
    };

    el.querySelectorAll('[data-page-chat]').forEach(item => {
        item.addEventListener('click', () => renderPageConv(item.dataset.pageChat));
    });
}

/* ═══════════════════════════════════════════════════════════════════
   TÉCNICO PROFILE
═══════════════════════════════════════════════════════════════════ */

function renderTecnicoDashboard() {
    if (!app.currentUser || app.currentUser.role !== 'tecnico') return;
    const uid = app.currentUser.id;
    const myChamados  = (app.state.chamados || []).filter(c => c.tecnicoId === uid);
    const assignedIds = ((app.state.tecnicoClients || {})[uid] || []);

    const open    = myChamados.filter(c => c.status === 'Aberto').length;
    const inProg  = myChamados.filter(c => c.status === 'Em andamento').length;
    const waiting = myChamados.filter(c => c.status === 'Aguardando cliente').length;
    const closed  = myChamados.filter(c => ['Resolvido','Fechado'].includes(c.status)).length;

    const stats = document.getElementById('tecnicoStats');
    if (stats) stats.innerHTML = `
        <div class="stat-card"><div class="stat-value">${assignedIds.length}</div><div class="stat-label">Clientes atribuídos</div></div>
        <div class="stat-card"><div class="stat-value">${open}</div><div class="stat-label">Chamados abertos</div></div>
        <div class="stat-card"><div class="stat-value">${inProg}</div><div class="stat-label">Em andamento</div></div>
        <div class="stat-card"><div class="stat-value">${waiting}</div><div class="stat-label">Aguard. cliente</div></div>
    `;

    const recentes = document.getElementById('tecnicoChamadosRecentes');
    if (recentes) {
        const active = myChamados
            .filter(c => c.status !== 'Fechado')
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .slice(0, 5);
        recentes.innerHTML = `
            <div class="card" style="margin-top:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                    <h3 style="margin:0;">Chamados recentes</h3>
                    <button class="secondary-btn" onclick="showSection('tecnicoChamados');renderTecnicoChamados()">Ver todos</button>
                </div>
                ${active.length === 0
                    ? '<p class="text-muted">Nenhum chamado ativo.</p>'
                    : active.map(ch => renderChamadoCard(ch)).join('')}
            </div>`;
    }
}

function renderTecnicoClientes() {
    if (!app.currentUser || app.currentUser.role !== 'tecnico') return;
    const uid = app.currentUser.id;
    const assignedIds = ((app.state.tecnicoClients || {})[uid] || []);
    const clients = (app.state.clients || []).filter(c => assignedIds.includes(c.id));
    const el = document.getElementById('tecnicoClientesContent');
    if (!el) return;

    if (clients.length === 0) {
        el.innerHTML = '<div class="card"><p class="text-muted">Nenhum cliente atribuído ainda. Aguarde o gestor atribuir clientes a você.</p></div>';
        return;
    }
    el.innerHTML = `<div class="card" style="overflow-x:auto;">
        <table>
            <thead><tr><th>Cliente</th><th>Telefone</th><th>Produto</th><th>Plano</th><th>Chamados ativos</th><th>Ações</th></tr></thead>
            <tbody>
                ${clients.map(c => {
                    const chams = (app.state.chamados || []).filter(ch => ch.clientId === c.id && ch.tecnicoId === uid);
                    const openCount = chams.filter(ch => ['Aberto','Em andamento','Aguardando cliente'].includes(ch.status)).length;
                    return `<tr>
                        <td><strong>${esc(c.name)}</strong></td>
                        <td>${esc(c.phone || '—')}</td>
                        <td>${esc(c.product || '—')}</td>
                        <td>${esc(c.plan || '—')}</td>
                        <td>${openCount > 0
                            ? `<span class="badge badge-warn">${openCount} aberto${openCount > 1 ? 's' : ''}</span>`
                            : '<span class="badge badge-active">Sem pendências</span>'}</td>
                        <td class="table-actions">
                            <button class="secondary-btn" onclick="openChamadoModal('${c.id}')">+ Chamado</button>
                            <button class="secondary-btn" onclick="renderTecnicoClienteChamados('${c.id}')">Ver chamados</button>
                        </td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    </div>`;
}

function renderTecnicoClienteChamados(clientId) {
    const client = (app.state.clients || []).find(c => c.id === clientId);
    if (!client) return;
    const uid = app.currentUser.id;
    const chams = (app.state.chamados || [])
        .filter(ch => ch.clientId === clientId && ch.tecnicoId === uid)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    showModal(`Chamados — ${client.name}`, `
        <div style="margin-bottom:12px;display:flex;justify-content:flex-end;">
            <button class="primary-btn" onclick="closeModal();openChamadoModal('${clientId}')">+ Novo chamado</button>
        </div>
        ${chams.length === 0
            ? '<p class="text-muted">Nenhum chamado registrado para este cliente.</p>'
            : chams.map(ch => renderChamadoCard(ch)).join('')}
    `);
}

function renderTecnicoChamados() {
    if (!app.currentUser || app.currentUser.role !== 'tecnico') return;
    const uid = app.currentUser.id;
    const all = (app.state.chamados || [])
        .filter(c => c.tecnicoId === uid)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const el = document.getElementById('tecnicoChamadosContent');
    if (!el) return;

    const filterBar = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
        ${['Todos','Aberto','Em andamento','Aguardando cliente','Resolvido','Fechado'].map(s =>
            `<button class="secondary-btn" style="font-size:0.8rem;padding:5px 12px;"
                onclick="filterTecnicoChamados('${s}')">${s}</button>`
        ).join('')}
    </div>`;

    el.innerHTML = filterBar + `<div id="tecnicoChamadosList">` +
        (all.length === 0
            ? '<p class="text-muted">Nenhum chamado ainda. Abra um chamado a partir da lista de clientes.</p>'
            : all.map(ch => renderChamadoCard(ch)).join(''))
        + '</div>';
}

function filterTecnicoChamados(status) {
    const uid = app.currentUser.id;
    let chams = (app.state.chamados || []).filter(c => c.tecnicoId === uid);
    if (status !== 'Todos') chams = chams.filter(c => c.status === status);
    chams.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const el = document.getElementById('tecnicoChamadosList');
    if (!el) return;
    el.innerHTML = chams.length === 0
        ? '<p class="text-muted">Nenhum chamado com este status.</p>'
        : chams.map(ch => renderChamadoCard(ch)).join('');
}

function renderChamadoCard(ch) {
    const client = (app.state.clients || []).find(c => c.id === ch.clientId);
    const clientName = client ? client.name : 'Cliente desconhecido';
    const statusCls = {
        'Aberto':             'chamado-status-aberto',
        'Em andamento':       'chamado-status-andamento',
        'Aguardando cliente': 'chamado-status-aguardando',
        'Resolvido':          'chamado-status-resolvido',
        'Fechado':            'chamado-status-fechado'
    }[ch.status] || '';
    const priorityIcon = ch.priority === 'Urgente' ? '🔴' : ch.priority === 'Normal' ? '🟡' : '🟢';
    const msgCount = (ch.messages || []).length;
    return `
        <div class="chamado-card" onclick="openChamadoDetail('${ch.id}')">
            <div class="chamado-header">
                <span class="chamado-title">${esc(ch.title)}</span>
                <span class="chamado-status-pill ${statusCls}">${esc(ch.status)}</span>
            </div>
            <div class="chamado-meta">
                ${priorityIcon} <strong>${esc(ch.priority)}</strong> &bull; ${esc(clientName)} &bull; ${ch.createdAt}
            </div>
            <div class="chamado-desc">${esc((ch.description || '').slice(0, 100))}${(ch.description || '').length > 100 ? '…' : ''}</div>
            <div class="chamado-footer">
                <span>${msgCount} mensagem${msgCount !== 1 ? 'ns' : ''}</span>
                <span class="chamado-link">Ver detalhes ›</span>
            </div>
        </div>`;
}

function openChamadoModal(clientId) {
    if (!app.currentUser) return;
    const uid = app.currentUser.id;
    const assignedIds = app.currentUser.role === 'tecnico'
        ? ((app.state.tecnicoClients || {})[uid] || [])
        : (app.state.clients || []).map(c => c.id);
    const clients = (app.state.clients || []).filter(c => assignedIds.includes(c.id));

    showModal('Abrir novo chamado', `
        <form onsubmit="saveChamado(event)">
            <div class="field">
                <label>Cliente *</label>
                <select id="chamadoClientId" required>
                    <option value="">Selecione...</option>
                    ${clients.map(c => `<option value="${c.id}" ${c.id === clientId ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
                </select>
            </div>
            <div class="field">
                <label>Título *</label>
                <input id="chamadoTitle" type="text" required placeholder="Ex: Rastreador sem sinal">
            </div>
            <div class="field">
                <label>Prioridade</label>
                <select id="chamadoPriority">
                    <option>Normal</option>
                    <option>Urgente</option>
                    <option>Baixa</option>
                </select>
            </div>
            <div class="field">
                <label>Descrição *</label>
                <textarea id="chamadoDesc" rows="4" required placeholder="Descreva o problema ou solicitação..."></textarea>
            </div>
            <div class="actions">
                <button type="submit" class="primary-btn">Abrir chamado</button>
                <button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `);
}

function saveChamado(e) {
    e.preventDefault();
    const clientId = document.getElementById('chamadoClientId').value;
    const title    = document.getElementById('chamadoTitle').value.trim();
    const priority = document.getElementById('chamadoPriority').value;
    const desc     = document.getElementById('chamadoDesc').value.trim();
    if (!clientId || !title || !desc) return;
    const uid = app.currentUser.id;
    const now = todayISO();
    const ch = {
        id: 'ch_' + Date.now(), clientId, tecnicoId: uid, title, description: desc,
        priority, status: 'Aberto', createdAt: now, updatedAt: now,
        messages: [{ id: 'cm_' + Date.now(), from: uid, text: `Chamado aberto: ${desc}`, at: now }]
    };
    if (!app.state.chamados) app.state.chamados = [];
    app.state.chamados.push(ch);
    const gestor = (app.state.users || []).find(u => u.role === 'gestor');
    if (gestor) addNotification(gestor.id, 'chamado', `Novo chamado aberto por ${app.currentUser.name}: "${title}"`, { render: 'renderGestorChamados' });
    saveState();
    closeModal();
    if (app.currentUser.role === 'tecnico') {
        renderTecnicoChamados();
        renderTecnicoDashboard();
    }
}

function openChamadoDetail(chamadoId) {
    const ch = (app.state.chamados || []).find(c => c.id === chamadoId);
    if (!ch) return;
    const client = (app.state.clients || []).find(c => c.id === ch.clientId);
    const clientName = client ? client.name : 'Desconhecido';
    const priorityIcon = ch.priority === 'Urgente' ? '🔴' : ch.priority === 'Normal' ? '🟡' : '🟢';
    const statusOptions = ['Aberto','Em andamento','Aguardando cliente','Resolvido','Fechado'];
    const canEdit = app.currentUser && (app.currentUser.role === 'tecnico' || app.currentUser.role === 'gestor');

    const msgsHtml = (ch.messages || []).map(m => {
        const sender = (app.state.users || []).find(u => u.id === m.from);
        const senderName = sender ? sender.name : m.from;
        const isMine = m.from === app.currentUser.id;
        return `<div class="chamado-msg ${isMine ? 'chamado-msg-mine' : 'chamado-msg-other'}">
            <div class="chamado-msg-meta">${esc(senderName)} &bull; ${m.at}</div>
            <div class="chamado-msg-text">${esc(m.text)}</div>
        </div>`;
    }).join('');

    showModal(`Chamado #${ch.id.slice(-4)}: ${ch.title}`, `
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;font-size:0.9rem;">
            ${priorityIcon} <strong>${esc(ch.priority)}</strong>
            &bull; Cliente: <strong>${esc(clientName)}</strong>
            &bull; Aberto em: ${ch.createdAt}
        </div>
        <div class="card" style="margin-bottom:14px;padding:12px 14px;background:var(--surface-2);">
            <strong>Descrição:</strong><br>${esc(ch.description)}
        </div>
        ${canEdit ? `
        <div class="field" style="margin-bottom:14px;">
            <label>Status do chamado</label>
            <select id="chamadoStatusSel" onchange="updateChamadoStatus('${ch.id}',this.value)">
                ${statusOptions.map(s => `<option ${ch.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
        </div>` : ''}
        <div class="chamado-thread" id="chamadoThread_${ch.id}">
            ${msgsHtml || '<p class="text-muted" style="text-align:center;padding:18px 0;">Nenhuma mensagem ainda.</p>'}
        </div>
        ${canEdit ? `
        <div class="field" style="margin-top:14px;">
            <label>Adicionar mensagem</label>
            <textarea id="chamadoMsgInput" rows="3" placeholder="Escreva uma atualização ou anotação..."></textarea>
        </div>
        <div class="actions">
            <button class="primary-btn" onclick="sendChamadoMessage('${ch.id}')">Enviar</button>
            <button class="secondary-btn" onclick="closeModal()">Fechar</button>
        </div>` : `<div class="actions"><button class="secondary-btn" onclick="closeModal()">Fechar</button></div>`}
    `);
}

function updateChamadoStatus(chamadoId, newStatus) {
    const ch = (app.state.chamados || []).find(c => c.id === chamadoId);
    if (!ch) return;
    ch.status    = newStatus;
    ch.updatedAt = todayISO();
    if (!ch.messages) ch.messages = [];
    ch.messages.push({ id: 'cm_' + Date.now(), from: app.currentUser.id, text: `Status alterado para: ${newStatus}`, at: todayISO() });
    saveState();
    if (app.currentUser.role === 'tecnico') {
        renderTecnicoDashboard();
        renderTecnicoChamados();
    }
}

function sendChamadoMessage(chamadoId) {
    const input = document.getElementById('chamadoMsgInput');
    const text = input?.value.trim();
    if (!text) return;
    const ch = (app.state.chamados || []).find(c => c.id === chamadoId);
    if (!ch) return;
    if (!ch.messages) ch.messages = [];
    ch.messages.push({ id: 'cm_' + Date.now(), from: app.currentUser.id, text, at: todayISO() });
    ch.updatedAt = todayISO();
    if (app.currentUser.role === 'tecnico') {
        const gestor = (app.state.users || []).find(u => u.role === 'gestor');
        if (gestor) addNotification(gestor.id, 'chamado', `Nova mensagem no chamado "${ch.title}" por ${app.currentUser.name}`, { render: 'renderGestorChamados' });
    }
    saveState();
    closeModal();
    openChamadoDetail(chamadoId);
}

/* ─── GESTOR: TÉCNICOS MANAGEMENT ─── */

function renderGestorTecnicos() {
    const tecnicos = (app.state.users || []).filter(u => u.role === 'tecnico');
    const chamados = app.state.chamados || [];
    const tClients = app.state.tecnicoClients || {};

    document.getElementById('pageContent').innerHTML = `
        <div class="section-header">
            <div><h2>Técnicos</h2><p>Cadastre técnicos e gerencie clientes atribuídos.</p></div>
            <button class="primary-btn" onclick="openTecnicoModal()">+ Novo técnico</button>
        </div>
        ${tecnicos.length === 0
            ? `<div class="card"><p class="text-muted">Nenhum técnico cadastrado. Clique em "+ Novo técnico" para começar.</p></div>`
            : `<div class="card" style="overflow-x:auto;">
                <table>
                    <thead><tr><th>Nome</th><th>Especialidade</th><th>Telefone</th><th>Clientes</th><th>Chamados abertos</th><th>Ações</th></tr></thead>
                    <tbody>
                    ${tecnicos.map(t => {
                        const aIds       = tClients[t.id] || [];
                        const openChams  = chamados.filter(c => c.tecnicoId === t.id && ['Aberto','Em andamento','Aguardando cliente'].includes(c.status)).length;
                        return `<tr>
                            <td><strong>${esc(t.name)}</strong><br><small class="text-muted">${esc(t.email)}</small></td>
                            <td>${esc(t.specialty || '—')}</td>
                            <td>${esc(t.phone || '—')}</td>
                            <td><span class="badge badge-active">${aIds.length} cliente${aIds.length !== 1 ? 's' : ''}</span></td>
                            <td>${openChams > 0 ? `<span class="badge badge-warn">${openChams}</span>` : '<span class="badge badge-active">0</span>'}</td>
                            <td class="table-actions">
                                <button class="secondary-btn" onclick="openAssignTecnicoClientModal('${t.id}')">Atribuir clientes</button>
                                <button class="secondary-btn" onclick="openTecnicoModal('${t.id}')">Editar</button>
                                <button class="danger-btn"    onclick="deleteTecnico('${t.id}')">Excluir</button>
                            </td>
                        </tr>`;
                    }).join('')}
                    </tbody>
                </table>
            </div>`}
    `;
    showSection('dynamicContent');
}

function openTecnicoModal(tecnicoId) {
    const t = tecnicoId ? (app.state.users || []).find(u => u.id === tecnicoId) : null;
    showModal(t ? 'Editar técnico' : 'Cadastrar técnico', `
        <form onsubmit="saveTecnico(event,'${tecnicoId || ''}')">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div class="field"><label>Nome *</label><input id="tecNome" value="${t ? esc(t.name) : ''}" required></div>
                <div class="field"><label>E-mail *</label><input id="tecEmail" type="email" value="${t ? esc(t.email) : ''}" required></div>
                <div class="field"><label>Senha${t ? ' (em branco = manter)' : ' *'}</label><input id="tecSenha" type="password" ${t ? '' : 'required'}></div>
                <div class="field"><label>CPF</label><input id="tecCPF" value="${t ? esc(t.cpf || '') : ''}"></div>
                <div class="field"><label>Telefone</label><input id="tecTel" value="${t ? esc(t.phone || '') : ''}"></div>
                <div class="field"><label>WhatsApp</label><input id="tecWA" value="${t ? esc(t.whatsapp || '') : ''}"></div>
                <div class="field" style="grid-column:1/-1;"><label>Especialidade</label><input id="tecEsp" value="${t ? esc(t.specialty || '') : ''}" placeholder="Ex: Rastreamento Veicular"></div>
            </div>
            <div class="actions">
                <button type="submit" class="primary-btn">${t ? 'Salvar' : 'Cadastrar'}</button>
                <button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button>
            </div>
        </form>
    `);
}

function saveTecnico(e, tecnicoId) {
    e.preventDefault();
    const nome  = document.getElementById('tecNome').value.trim();
    const email = document.getElementById('tecEmail').value.trim().toLowerCase();
    const senha = document.getElementById('tecSenha').value.trim();
    const cpf   = document.getElementById('tecCPF').value.trim();
    const tel   = document.getElementById('tecTel').value.trim();
    const wa    = document.getElementById('tecWA').value.trim();
    const esp   = document.getElementById('tecEsp').value.trim();
    const users = app.state.users || [];

    if (tecnicoId) {
        const u = users.find(x => x.id === tecnicoId);
        if (!u) return;
        u.name = nome; u.email = email; u.cpf = cpf; u.phone = tel; u.whatsapp = wa; u.specialty = esp;
        if (senha) u.password = senha;
    } else {
        if (users.find(x => x.email === email)) { alert('Este e-mail já está cadastrado.'); return; }
        const newT = { id: 'tecnico_' + Date.now(), name: nome, email, password: senha, role: 'tecnico', cpf, phone: tel, whatsapp: wa, specialty: esp };
        users.push(newT);
        if (!app.state.tecnicoClients) app.state.tecnicoClients = {};
        app.state.tecnicoClients[newT.id] = [];
    }
    saveState();
    closeModal();
    renderGestorTecnicos();
}

function deleteTecnico(tecnicoId) {
    if (!confirm('Excluir este técnico? Os chamados vinculados serão mantidos no histórico.')) return;
    app.state.users = (app.state.users || []).filter(u => u.id !== tecnicoId);
    if (app.state.tecnicoClients) delete app.state.tecnicoClients[tecnicoId];
    saveState();
    renderGestorTecnicos();
}

function openAssignTecnicoClientModal(tecnicoId) {
    const t = (app.state.users || []).find(u => u.id === tecnicoId);
    if (!t) return;
    const allClients = app.state.clients || [];
    const assigned   = ((app.state.tecnicoClients || {})[tecnicoId] || []);
    showModal(`Atribuir clientes — ${t.name}`, `
        <p class="text-muted" style="margin-bottom:14px;">Selecione os clientes que serão atendidos por este técnico:</p>
        <div style="max-height:360px;overflow-y:auto;">
            ${allClients.length === 0
                ? '<p class="text-muted">Nenhum cliente cadastrado.</p>'
                : allClients.map(c => `
                    <label style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);cursor:pointer;">
                        <input type="checkbox" value="${c.id}" ${assigned.includes(c.id) ? 'checked' : ''} style="width:16px;height:16px;">
                        <span><strong>${esc(c.name)}</strong> <small class="text-muted">${esc(c.product || '')}</small></span>
                    </label>`).join('')}
        </div>
        <div class="actions" style="margin-top:16px;">
            <button class="primary-btn" onclick="saveAssignTecnicoClients('${tecnicoId}')">Salvar</button>
            <button class="secondary-btn" onclick="closeModal()">Cancelar</button>
        </div>
    `);
}

function saveAssignTecnicoClients(tecnicoId) {
    const boxes = document.querySelectorAll('#modalContent input[type=checkbox]');
    const selected = Array.from(boxes).filter(cb => cb.checked).map(cb => cb.value);
    if (!app.state.tecnicoClients) app.state.tecnicoClients = {};
    app.state.tecnicoClients[tecnicoId] = selected;
    saveState();
    closeModal();
    renderGestorTecnicos();
}

function renderGestorChamados() {
    const chamados = (app.state.chamados || []).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const tecnicos = (app.state.users || []).filter(u => u.role === 'tecnico');
    const clients  = app.state.clients || [];

    document.getElementById('pageContent').innerHTML = `
        <div class="section-header">
            <div><h2>Todos os chamados</h2><p>Visão consolidada de todos os chamados do sistema.</p></div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
            ${['Todos','Aberto','Em andamento','Aguardando cliente','Resolvido','Fechado'].map(s =>
                `<button class="secondary-btn" style="font-size:0.8rem;padding:5px 12px;"
                    onclick="filterGestorChamados('${s}')">${s}</button>`
            ).join('')}
        </div>
        <div id="gestorChamadosList">
            ${_gestorChamadosListHtml(chamados, clients, tecnicos)}
        </div>
    `;
    showSection('dynamicContent');
}

function _gestorChamadosListHtml(chamados, clients, tecnicos) {
    if (chamados.length === 0) return '<div class="card"><p class="text-muted">Nenhum chamado registrado.</p></div>';
    return chamados.map(ch => {
        const c   = clients.find(x => x.id === ch.clientId);
        const tec = tecnicos.find(x => x.id === ch.tecnicoId);
        const priorityIcon = ch.priority === 'Urgente' ? '🔴' : ch.priority === 'Normal' ? '🟡' : '🟢';
        const statusCls = {
            'Aberto':             'chamado-status-aberto',
            'Em andamento':       'chamado-status-andamento',
            'Aguardando cliente': 'chamado-status-aguardando',
            'Resolvido':          'chamado-status-resolvido',
            'Fechado':            'chamado-status-fechado'
        }[ch.status] || '';
        return `<div class="chamado-card" onclick="openChamadoDetail('${ch.id}')">
            <div class="chamado-header">
                <span class="chamado-title">${esc(ch.title)}</span>
                <span class="chamado-status-pill ${statusCls}">${esc(ch.status)}</span>
            </div>
            <div class="chamado-meta">
                ${priorityIcon} ${esc(ch.priority)} &bull; Cliente: <strong>${c ? esc(c.name) : '—'}</strong> &bull; Técnico: <strong>${tec ? esc(tec.name) : '—'}</strong> &bull; ${ch.updatedAt}
            </div>
        </div>`;
    }).join('');
}

function filterGestorChamados(status) {
    const tecnicos = (app.state.users || []).filter(u => u.role === 'tecnico');
    const clients  = app.state.clients || [];
    let chams = app.state.chamados || [];
    if (status !== 'Todos') chams = chams.filter(c => c.status === status);
    chams = chams.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const el = document.getElementById('gestorChamadosList');
    if (el) el.innerHTML = _gestorChamadosListHtml(chams, clients, tecnicos);
}

/* ═══════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════ */

function init() {
    loadState();

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('demoButton').addEventListener('click', handleDemo);

    document.getElementById('logoutBtn').addEventListener('click', () => {
        app.currentUser = null;
        document.getElementById('appScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('loginMessage').textContent = 'Use seu usuário para acessar o portal.';
    });

    document.getElementById('clienteLogoutBtn').addEventListener('click', () => {
        app.currentUser = null;
        document.getElementById('clientePortal').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('loginMessage').textContent = 'Use seu usuário para acessar o portal.';
    });

    document.getElementById('openGestorClienteModalBtn').addEventListener('click', () => openGestorClienteModal());

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', e => {
        if (e.target === document.getElementById('modalBackdrop')) closeModal();
    });

    // Gestor buttons
    document.getElementById('openConsultorModalBtn').addEventListener('click',      () => openConsultorModal());
    document.getElementById('openConsultorModalBtn2').addEventListener('click',     () => openConsultorModal());
    document.getElementById('openInstaladorModalBtnDash').addEventListener('click', () => openInstaladorModal());
    document.getElementById('openInstaladorModalBtn').addEventListener('click',     () => openInstaladorModal());
    document.getElementById('openInstallationModalBtn').addEventListener('click',   () => openInstallationModal());
    document.getElementById('openCouponModalBtn').addEventListener('click',         () => openCouponModal());

    // Consultor buttons
    document.getElementById('openClientModalBtn').addEventListener('click',  () => openClientModal());
    document.getElementById('openClientModalBtn2').addEventListener('click', () => openClientModal());

    // Instalador buttons
    document.getElementById('openInstaladorClientModalBtn').addEventListener('click', () => openClientModal());
    document.getElementById('openInstaladorClientCRMBtn').addEventListener('click',   () => openClientModal());

    // Pre-render public sections
    renderProducts();
    renderTrainingModules();

    // Notification bell
    document.getElementById('notifBtn')?.addEventListener('click', e => {
        e.stopPropagation();
        toggleNotifPanel();
    });

    // Chat button
    document.getElementById('chatBtn')?.addEventListener('click', e => {
        e.stopPropagation();
        openChatOverlay(null);
    });

    // Chat overlay backdrop
    document.getElementById('chatOverlayBackdrop')?.addEventListener('click', () => {
        document.getElementById('chatOverlay')?.classList.add('hidden');
    });

    // Close notification panel when clicking outside
    document.addEventListener('click', e => {
        const panel = document.getElementById('notifPanel');
        const btn   = document.getElementById('notifBtn');
        if (panel && !panel.classList.contains('hidden') && !panel.contains(e.target) && e.target !== btn && !btn?.contains(e.target)) {
            panel.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
