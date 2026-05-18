/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'tracktiv_v2';
const INSTALL_FEE = 60;

const stageOrder = ['Novo Lead', 'Contato Feito', 'Apresentação', 'Proposta', 'Fechado', 'Perdido'];

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
        { q: 'Qual faixa de comissão se aplica a 7 vendas no mês?',
          opts: ['5%', '8%', '10%', '12%'], ans: 1,
          exp: 'Entre 5 e 9 vendas, a comissão é de 8% sobre a base total de mensalidades.' },
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
          cpf: '111.222.333-44', address: 'Av. Industrial, 500 - Guarulhos/SP', whatsapp: '(11) 98888-7777', pixKey: 'carlos@tracktiv.com', storeName: 'Moto Peças Carlos' }
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
    ]
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
    editingCouponId: null
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

function isClosedThisMonth(client) {
    return client.stage === 'Fechado' && client.closedDate && client.closedDate.slice(0, 7) === getCurrentMonthKey();
}

function computeCommissionPercent(sales) {
    if (sales >= 10) return 12;
    if (sales >= 5)  return 8;
    if (sales >= 2)  return 5;
    return 0;
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
    const clients      = (app.state.clients || []).filter(c => c.consultantId === user.id);
    const clientCount  = clients.length;
    const salesCount   = clients.filter(isClosedThisMonth).length;
    const totalFee     = clients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const percent      = computeCommissionPercent(salesCount);
    const commission   = totalFee * (percent / 100);
    const recurrence   = getRecurrenceStatus(clientCount, salesCount);
    const stageCounts  = stageOrder.reduce((acc, st) => { acc[st] = clients.filter(c => c.stage === st).length; return acc; }, {});
    return { clients, clientCount, salesCount, totalFee, percent, commission, recurrence, stageCounts };
}

function getInstaladorMetrics(user) {
    const allInstalls     = (app.state.installations || []).filter(i => i.instaladorId === user.id);
    const monthlyInstalls = allInstalls.filter(i => i.date && i.date.slice(0,7) === getCurrentMonthKey());
    const installCommission = monthlyInstalls.length * INSTALL_FEE;

    const storeClients    = (app.state.clients || []).filter(c => c.instaladorId === user.id);
    const clientCount     = storeClients.length;
    const salesCount      = storeClients.filter(isClosedThisMonth).length;
    const totalFee        = storeClients.reduce((s, c) => s + Number(c.monthlyFee || 0), 0);
    const percent         = computeCommissionPercent(salesCount);
    const recurrenceComm  = totalFee * (percent / 100);
    const recurrence      = getRecurrenceStatus(clientCount, salesCount);
    const totalToReceive  = installCommission + recurrenceComm;

    return { allInstalls, monthlyInstalls, installCommission, storeClients, clientCount, salesCount, totalFee, percent, recurrenceComm, recurrence, totalToReceive };
}

/* ═══════════════════════════════════════════════════════════════════
   STATE MANAGEMENT
═══════════════════════════════════════════════════════════════════ */

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            app.state = { installations: [], coupons: [], ...parsed };
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

function renderNavigation() {
    const tabs = document.getElementById('navigationTabs');
    tabs.innerHTML = '';
    const role = app.currentUser.role;
    let items;
    if (role === 'gestor') {
        items = [
            { id: 'gestorDashboard',    label: 'Dashboard' },
            { id: 'gestorConsultores',  label: 'Consultores' },
            { id: 'gestorInstaladores', label: 'Instaladores' },
            { id: 'gestorCupons',       label: 'Cupons' }
        ];
    } else if (role === 'instalador') {
        items = [
            { id: 'instaladorDashboard', label: 'Dashboard' },
            { id: 'instaladorClientes',  label: 'Clientes da Loja' },
            { id: 'instaladorExtrato',   label: 'Extrato' }
        ];
    } else {
        items = [
            { id: 'consultorDashboard',   label: 'Dashboard' },
            { id: 'consultorCRM',         label: 'Funil' },
            { id: 'consultorClientes',    label: 'Clientes' },
            { id: 'consultorProdutos',    label: 'Produtos' },
            { id: 'consultorTreinamento', label: 'Treinamentos' },
            { id: 'consultorInformativos', label: 'Informativos' }
        ];
    }
    items.forEach((item, i) => {
        const btn = document.createElement('button');
        btn.className = 'tab' + (i === 0 ? ' active' : '');
        btn.type = 'button';
        btn.textContent = item.label;
        btn.dataset.view = item.id;
        btn.addEventListener('click', () => selectView(item.id, btn));
        tabs.appendChild(btn);
    });
    app.activeView = items[0].id;
    showActiveSection();
}

function selectView(viewId, btn) {
    app.activeView = viewId;
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === btn));
    showActiveSection();
    renderActiveSection(viewId);
}

function showActiveSection() {
    document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === app.activeView));
}

function renderActiveSection(viewId) {
    const renders = {
        gestorDashboard:    () => { renderGestorStats(); renderConsultorTable(); renderInstaladorDashTable(); },
        gestorConsultores:  renderManageConsultors,
        gestorInstaladores: renderGestorInstaladores,
        gestorCupons:       renderGestorCupons,
        consultorDashboard: renderConsultorDashboard,
        consultorCRM:       renderFunnelBoard,
        consultorClientes:  renderClientTable,
        consultorProdutos:  renderProducts,
        consultorTreinamento:  renderTrainingModules,
        consultorInformativos: renderInformativos,
        instaladorDashboard: renderInstaladorDashboard,
        instaladorClientes:  renderInstaladorClientes,
        instaladorExtrato:   renderInstaladorExtrato
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
    const m = getConsultantMetrics(app.currentUser);
    document.getElementById('clientCount').textContent     = m.clientCount;
    document.getElementById('salesCount').textContent      = m.salesCount;
    document.getElementById('recurrenceStatus').textContent = m.recurrence.label;
    document.getElementById('recurrenceHint').textContent  = m.recurrence.hint;
    document.getElementById('commissionValue').textContent = formatCurrency(m.commission);
    document.getElementById('commissionPercent').textContent = m.percent > 0 ? `${m.percent}% sobre a base de mensalidades (R$ ${formatCurrency(m.totalFee)})` : 'Sem comissão definida ainda';
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
                const wa = client.isWhatsapp ? `<a href="https://wa.me/55${client.phone.replace(/\D/g,'')}" target="_blank" style="color:#25d366;text-decoration:none;" title="Abrir WhatsApp">💬</a>` : '';
                card.innerHTML = `
                    <strong>${esc(client.name)}</strong>
                    <small>${esc(client.phone)} ${wa} · ${esc(client.plan || client.product)}</small>
                    <small>R$ ${formatCurrency(client.monthlyFee)}/mês</small>
                    <div class="client-actions">
                        <button class="stage-btn" type="button" data-action="left">←</button>
                        <button class="stage-btn" type="button" data-action="right">→</button>
                        <button class="stage-btn" type="button" data-action="edit">Editar</button>
                    </div>
                `;
                card.addEventListener('dragstart', () => card.classList.add('dragging'));
                card.addEventListener('dragend',   () => card.classList.remove('dragging'));
                card.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', client.id));
                card.querySelector('[data-action="left"]').addEventListener('click',  () => moveStage(client.id, -1));
                card.querySelector('[data-action="right"]').addEventListener('click', () => moveStage(client.id,  1));
                card.querySelector('[data-action="edit"]').addEventListener('click',  () => openClientModal(client.id));
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
    clients.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
        const ph = (c.phone || '').replace(/\D/g, '');
        const row = document.createElement('tr');
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
            <td><div class="table-actions">
                <button class="small-btn" data-action="profile" data-id="${c.id}">Ver perfil</button>
                <button class="small-btn" data-action="edit" data-id="${c.id}">Editar</button>
                <button class="small-btn danger-btn" data-action="delete" data-id="${c.id}">Excluir</button>
            </div></td>
        `;
        body.appendChild(row);
    });
    body.querySelectorAll('[data-action="profile"]').forEach(b => b.addEventListener('click', () => openClientProfile(b.dataset.id)));
    body.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => openClientModal(b.dataset.id)));
    body.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', () => deleteClient(b.dataset.id)));
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    productList.forEach(p => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `<strong>${esc(p.title)}</strong><span>${esc(p.subtitle)}</span><p>${esc(p.description)}</p>`;
        grid.appendChild(card);
    });
}

function renderInformativos() {
    const area = document.getElementById('consultorInformativosArea');
    if (!area || area.dataset.rendered) return;
    area.dataset.rendered = '1';
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

            <h3 style="margin:0 0 12px;">Como funciona a comissão</h3>
            <p style="margin:0 0 16px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Sua comissão é calculada sobre a <strong>soma total das mensalidades</strong> de todos os seus clientes na base.
                A <strong>porcentagem aplicada</strong> depende do número de novas vendas fechadas no mês corrente.
            </p>

            <div style="overflow-x:auto;margin-bottom:24px;">
                <table class="plan-compare">
                    <thead><tr><th>Vendas no mês</th><th>% de comissão</th><th>Badge</th><th>Exemplo</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>0 ou 1 venda</td>
                            <td style="font-weight:700;color:var(--text-soft);">0%</td>
                            <td><span class="badge badge-warn">🌱 Em formação</span></td>
                            <td style="color:var(--text-soft);font-size:0.85rem;">Sem comissão — foque em fechar as primeiras vendas</td>
                        </tr>
                        <tr>
                            <td>2 a 4 vendas</td>
                            <td style="font-weight:700;color:#6b2e00;">5%</td>
                            <td><span class="badge badge-bronze">🥉 Bronze</span></td>
                            <td style="font-size:0.85rem;">Base R$ 1.000 → R$ 50,00 de comissão</td>
                        </tr>
                        <tr>
                            <td>5 a 9 vendas</td>
                            <td style="font-weight:700;color:#444;">8%</td>
                            <td><span class="badge badge-silver">🥈 Prata</span></td>
                            <td style="font-size:0.85rem;">Base R$ 1.000 → R$ 80,00 de comissão</td>
                        </tr>
                        <tr>
                            <td>10 ou mais vendas</td>
                            <td style="font-weight:700;color:#7a4f00;">12%</td>
                            <td><span class="badge badge-gold">🥇 Ouro</span></td>
                            <td style="font-size:0.85rem;">Base R$ 1.000 → R$ 120,00 de comissão</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 style="margin:0 0 12px;">Recorrência mensal</h3>
            <p style="margin:0 0 14px;color:var(--text-soft);font-size:0.93rem;line-height:1.7;">
                Além da comissão por venda, você pode ativar a <strong>recorrência</strong> — um bônus mensal
                pago sobre a base de clientes mantida. Para ativar, você precisa atingir os dois critérios abaixo no mesmo mês:
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
                    <p>Fechar pelo menos 2 novas vendas no mês corrente para reativar ou manter a recorrência</p>
                </div>
                <div class="feature-card">
                    <div class="feat-icon">💸</div>
                    <strong>Comissão aplicada à base total</strong>
                    <p>A porcentagem é aplicada sobre a soma de todas as mensalidades — quanto maior a base, maior o ganho</p>
                </div>
            </div>

            <h3 style="margin:0 0 12px;">Seu status atual</h3>
            <div class="trak-bubble">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">
                    <strong>Base de mensalidades:</strong> R$ ${formatCurrency(m.totalFee)}<br>
                    <strong>Vendas este mês:</strong> ${m.salesCount}<br>
                    <strong>Comissão atual:</strong> R$ ${formatCurrency(m.commission)} (${m.percent}%)<br>
                    <strong>Recorrência:</strong> <span class="badge ${m.recurrence.badge}" style="vertical-align:middle;">${m.recurrence.label}</span><br>
                    <span style="margin-top:8px;display:block;color:var(--text-soft);">${m.recurrence.hint}</span>
                </div>
            </div>

            <h3 style="margin:24px 0 12px;">Regras gerais</h3>
            <div class="script-box">📅 <strong>Período de apuração:</strong> As vendas são contadas do 1º ao último dia do mês corrente. A comissão é calculada com base nas vendas fechadas nesse período.</div>
            <div class="script-box">💳 <strong>Pagamento:</strong> A comissão é paga até o 5º dia útil do mês seguinte via PIX cadastrado no seu perfil.</div>
            <div class="script-box">🔄 <strong>Upgrades de plano:</strong> Se um cliente fizer upgrade de plano, a diferença de mensalidade entra na base de cálculo a partir do mês em que o upgrade foi confirmado.</div>
            <div class="script-box">❌ <strong>Cancelamentos:</strong> Clientes cancelados no mês corrente são removidos da base de cálculo. Cancelamentos após o fechamento do mês não afetam a comissão já apurada.</div>
            <div class="script-box">⚠️ <strong>Chargebacks:</strong> Em caso de inadimplência do cliente, a comissão referente a esse cliente é descontada no próximo pagamento.</div>
        </div>
    `;
}

function renderTrainingModules() {
    const grid   = document.getElementById('trainingModules');
    const detail = document.getElementById('trainingDetail');
    if (!grid) return;
    grid.classList.remove('hidden');
    grid.innerHTML = '';
    if (detail) detail.classList.add('hidden');
    trainingData.forEach(mod => {
        const card = document.createElement('article');
        card.className = 'product-card';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = 'background:none;border:none;padding:0;text-align:left;width:100%;display:grid;gap:12px;cursor:pointer;';
        btn.innerHTML = `<strong>${esc(mod.title)}</strong><span>${esc(mod.subtitle)}</span>`;
        btn.addEventListener('click', () => showTrainingModule(mod.id));
        card.appendChild(btn);
        grid.appendChild(card);
    });
}

function showTrainingModule(moduleId) {
    const detail = document.getElementById('trainingDetail');
    const grid   = document.getElementById('trainingModules');
    if (!detail) return;
    const sections  = SECTIONS_BY_MODULE[moduleId] || [];
    const questions = QUIZ_BY_MODULE[moduleId]     || [];
    app.trainingState = { moduleId, sectionIndex: 0, sections, questions };
    if (grid) grid.classList.add('hidden');
    detail.classList.remove('hidden');
    const totalSteps = sections.length + 1;
    const steps = Array.from({ length: totalSteps }, (_, i) =>
        `<div class="training-step" id="tstep-${i}"></div>`
    ).join('');
    detail.innerHTML = `
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
    renderTrainingSection(0);
}

function renderTrainingSection(idx) {
    app.trainingState.sectionIndex = idx;
    const area  = document.getElementById('trainingSectionArea');
    const bar   = document.getElementById('trainingProgressBar');
    const label = document.getElementById('trainingStepLabel');
    if (!area) return;
    if (bar) {
        bar.querySelectorAll('.training-step').forEach((el, i) => {
            el.className = 'training-step' + (i < idx ? ' done' : i === idx ? ' active' : '');
        });
    }
    const sections = app.trainingState.sections;
    const mod      = trainingData.find(m => m.id === app.trainingState.moduleId);
    const isQuiz   = idx >= sections.length;
    if (label) {
        label.textContent = isQuiz
            ? 'Quiz final — teste seus conhecimentos'
            : `Seção ${idx + 1} de ${sections.length}: ${sections[idx].title}`;
    }
    if (isQuiz) {
        const qCount = app.trainingState.questions.length;
        area.innerHTML = `
            <div class="trak-bubble">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">Você chegou no <strong>Quiz Final!</strong> 🎯 São ${qCount} perguntas pra testar o que você aprendeu. Você precisa de 70% pra ser aprovado — mas eu tenho certeza que você vai arrasar! Bora lá! 💪</div>
            </div>
            <div class="quiz-card">
                <div class="quiz-header">
                    <div><h3>Quiz — ${esc(mod ? mod.title : 'Módulo')}</h3><p class="text-muted">${qCount} perguntas sobre o conteúdo do módulo.</p></div>
                    <div style="min-width:180px;"><div class="quiz-progress"><div class="quiz-progress-fill" id="quizProgressFill"></div></div></div>
                </div>
                <div id="quizContent"></div>
            </div>
            <div class="training-nav">
                <button type="button" class="secondary-btn" id="prevSectionBtn">← Seção anterior</button>
                <div></div>
            </div>
        `;
        document.getElementById('prevSectionBtn').addEventListener('click', () => renderTrainingSection(idx - 1));
        startQuiz();
        return;
    }
    const s      = sections[idx];
    const isLast = idx === sections.length - 1;
    area.innerHTML = `
        <div class="trak-bubble">
            <div class="trak-avatar">🤖</div>
            <div class="trak-text">${s.trak}</div>
        </div>
        <div class="card" style="margin-bottom:0;">${s.html}</div>
        <div class="training-nav">
            ${idx > 0
                ? `<button type="button" class="secondary-btn" id="prevSectionBtn">← Seção anterior</button>`
                : `<div></div>`}
            <button type="button" class="primary-btn" id="nextSectionBtn">${isLast ? 'Ir para o Quiz →' : 'Próxima seção →'}</button>
        </div>
    `;
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
    app.quizState = { index: 0, score: 0 };
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const content = document.getElementById('quizContent');
    const fill    = document.getElementById('quizProgressFill');
    if (!content || !fill) return;
    const { index } = app.quizState;
    const questions  = app.trainingState.questions;
    const q = questions[index];
    if (!q) return renderQuizResult();
    fill.style.width = `${(index / questions.length) * 100}%`;
    content.innerHTML = `
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
}

function selectQuizOption(chosen) {
    const q       = app.trainingState.questions[app.quizState.index];
    const correct = chosen === q.ans;
    if (correct) app.quizState.score++;
    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.ans)                 btn.classList.add('correct');
        if (i === chosen && i !== q.ans) btn.classList.add('wrong');
    });
    const msgs    = correct ? TRAK_CORRECT : TRAK_WRONG;
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
    const content = document.getElementById('quizContent');
    const fill    = document.getElementById('quizProgressFill');
    if (!content || !fill) return;
    fill.style.width = '100%';
    const bar = document.getElementById('trainingProgressBar');
    if (bar) bar.querySelectorAll('.training-step').forEach(el => { el.className = 'training-step done'; });
    const { score } = app.quizState;
    const total    = app.trainingState.questions.length;
    const pct      = Math.round((score / total) * 100);
    const approved = pct >= 70;
    const trakMsg  = approved
        ? `Você arrasou! ${score} de ${total} questões certas — <strong>${pct}%</strong>! Você está mais que pronto pra vender. Agora vai lá e fecha negócio! 🚀`
        : `Ei, não desanima! ${score} de ${total} certo é o começo. Revisa as seções com calma e tenta de novo — você chega lá! 🌱`;
    content.innerHTML = `
        <div class="quiz-result">
            <div class="quiz-badge ${approved ? 'approved' : 'retry'}">${approved ? '🏆' : '📚'}</div>
            <h3>${approved ? 'Aprovado! Parabéns!' : 'Quase lá!'}</h3>
            <strong>${score}/${total}</strong>
            <div style="font-size:1.3rem;font-weight:700;color:${approved ? 'var(--accent)' : '#a05000'};">${pct}%</div>
            <div class="trak-bubble" style="margin:20px 0 0;text-align:left;">
                <div class="trak-avatar">🤖</div>
                <div class="trak-text">${trakMsg}</div>
            </div>
            <button id="retryQuiz" class="secondary-btn" style="margin-top:18px;">🔄 Refazer quiz</button>
        </div>
    `;
    document.getElementById('retryQuiz').addEventListener('click', startQuiz);
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
    clients.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
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
        app.currentUser.role === 'instalador' ? 'Portal do Instalador' : 'Portal do Consultor';
    renderNavigation();
    renderAppViews();
}

function renderAppViews() {
    renderGestorStats();
    renderConsultorTable();
    renderInstaladorDashTable();
    renderManageConsultors();
    renderGestorInstaladores();
    renderGestorCupons();
    renderConsultorDashboard();
    renderFunnelBoard();
    renderClientTable();
    renderProducts();
    renderTrainingModules();
    renderInstaladorDashboard();
    renderInstaladorClientes();
    renderInstaladorExtrato();
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
    document.getElementById('saveNoteBtn').addEventListener('click', () => handleAddNote(clientId));
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
    c.stage = stage;
    if (stage === 'Fechado') c.closedDate = todayISO();
    else delete c.closedDate;
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
    showApp();
}

function handleDemo() {
    app.state = JSON.parse(JSON.stringify(sampleState));
    saveState();
    document.getElementById('emailInput').value    = 'consultor@tracktiv.com';
    document.getElementById('passwordInput').value = 'Consultor123';
    document.getElementById('loginMessage').textContent = 'Demo carregado. Acesse como consultor, gestor ou instalador.';
    document.getElementById('loginError').textContent   = '';
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

    // Pre-render public sections
    renderProducts();
    renderTrainingModules();
}

document.addEventListener('DOMContentLoaded', init);
