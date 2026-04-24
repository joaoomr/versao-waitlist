import type {
  FeedPost,
  ExploreProfile,
  ConnectionItem,
  LeagueListItem,
  NotificationItem,
  SearchProfileResult,
  SearchLeagueResult,
  FullProfile,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Mock current user
// ---------------------------------------------------------------------------

export const MOCK_USER_ID = "mock-visitor-001";

export const MOCK_CURRENT_USER: FullProfile = {
  user: {
    id: MOCK_USER_ID,
    name: "Visitante Soci",
    email: "visitante@soci.app",
    tipo: "pessoa",
    avatarUrl: null,
    deletedAt: null,
    createdAt: "2024-10-01T00:00:00Z",
    updatedAt: "",
  },
  profile: {
    id: "profile-visitor",
    userId: MOCK_USER_ID,
    idade: null,
    bio: "Explorando a rede social de quem constroi junto.",
    redeSocial: null,
    site: null,
    estado: "SP",
    cidade: "Sao Paulo",
    codigoIbge: null,
    latitude: null,
    longitude: null,
    onboardingCompleted: true,
    createdAt: "2024-10-01T00:00:00Z",
  },
  areas: ["Tecnologia", "Empreendedorismo"],
  atuacoes: ["Desenvolvimento de Software"],
  objetivos: ["conexoes", "oportunidades"],
  profissoes: [{ id: "p1", userId: MOCK_USER_ID, profissao: "Desenvolvedor", ordem: 1 }],
  experiencias: [],
  escolaridade: [],
};

// ---------------------------------------------------------------------------
// Mock feed posts
// ---------------------------------------------------------------------------

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    post: {
      id: "post-1",
      authorId: "user-mariana",
      content:
        "Acabei de lancar minha startup de EdTech! Depois de 18 meses desenvolvendo, finalmente temos nosso MVP no ar. Precisamos de parceiros comerciais e investidores anjo que acreditem em educacao acessivel para o interior do Brasil. DM aberta!",
      mediaUrls: [],
      mediaType: null,
      tags: ["startup", "edtech", "empreendedorismo"],
      likesCount: 87,
      commentsCount: 23,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-mariana",
      name: "Mariana Lima",
      avatarUrl: null,
      profissao: "CEO & Co-fundadora",
    },
    isLiked: false,
  },
  {
    post: {
      id: "post-2",
      authorId: "user-lucas",
      content:
        "Quem mais na area de dados percebe que 80% do trabalho e limpeza de dados? Rs... Mas serio, compartilhem suas dicas de automacao de ETL. Estou experimentando dbt + Airflow e os resultados sao promissores.",
      mediaUrls: [],
      mediaType: null,
      tags: ["datascience", "engenharia-de-dados", "dbt"],
      likesCount: 142,
      commentsCount: 41,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-lucas",
      name: "Lucas Ferreira",
      avatarUrl: null,
      profissao: "Data Scientist",
    },
    isLiked: true,
  },
  {
    post: {
      id: "post-3",
      authorId: "user-isabela",
      content:
        "Buscando co-founder tecnico para fintech voltada para MEIs. Temos tração inicial, pitch deck pronto e reuniao com investidor agendada para o proximo mes. Preciso de alguem apaixonado por produto e que saiba navegar ambiguidade.",
      mediaUrls: [],
      mediaType: null,
      tags: ["cofounder", "fintech", "startup"],
      likesCount: 63,
      commentsCount: 18,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-isabela",
      name: "Isabela Mendes",
      avatarUrl: null,
      profissao: "Co-fundadora",
    },
    isLiked: false,
  },
  {
    post: {
      id: "post-4",
      authorId: "user-joao",
      content:
        "Stack do nosso novo projeto: Next.js + tRPC + Drizzle + Neon. Migramos do REST e nao voltamos. A tipagem end-to-end e um diferencial enorme — bugs de contrato entre front e back simplesmente deixaram de existir.",
      mediaUrls: [],
      mediaType: null,
      tags: ["nextjs", "typescript", "fullstack"],
      likesCount: 198,
      commentsCount: 56,
      createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-joao",
      name: "Joao Silva",
      avatarUrl: null,
      profissao: "Desenvolvedor Full Stack",
    },
    isLiked: false,
  },
  {
    post: {
      id: "post-5",
      authorId: "user-ana",
      content:
        "Reflexao rapida sobre lideranca remota: os melhores lideres que conheci nao eram os que mais sabiam — eram os que melhor sabiam quando perguntar. Humildade tecnica e subestimada no mercado de tecnologia.",
      mediaUrls: [],
      mediaType: null,
      tags: ["lideranca", "produto", "carreira"],
      likesCount: 234,
      commentsCount: 67,
      createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-ana",
      name: "Ana Beatriz",
      avatarUrl: null,
      profissao: "Product Manager",
    },
    isLiked: true,
  },
  {
    post: {
      id: "post-6",
      authorId: "user-pedro",
      content:
        "Acabei de concluir o redesign do nosso onboarding. Reducao de 40% no churn na primeira semana. O segredo? Remover etapas — menos e mais. Design centrado no usuario nao e sobre adicionar funcionalidades.",
      mediaUrls: [],
      mediaType: null,
      tags: ["ux", "design", "produto"],
      likesCount: 311,
      commentsCount: 44,
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-pedro",
      name: "Pedro Costa",
      avatarUrl: null,
      profissao: "Designer UX/UI",
    },
    isLiked: false,
  },
  {
    post: {
      id: "post-7",
      authorId: "user-carla",
      content:
        "Recrutando para a equipe de growth. Procuro alguem apaixonado por dados e experimentacao rapida. Hibrido em Porto Alegre ou remoto para todo Brasil. Salario competitivo + equity. Manda mensagem!",
      mediaUrls: [],
      mediaType: null,
      tags: ["vagas", "growth", "marketing"],
      likesCount: 52,
      commentsCount: 29,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
    author: {
      id: "user-carla",
      name: "Carla Santos",
      avatarUrl: null,
      profissao: "Head de Marketing",
    },
    isLiked: false,
  },
];

// ---------------------------------------------------------------------------
// Mock explore profiles
// ---------------------------------------------------------------------------

export const MOCK_EXPLORE_PROFILES: ExploreProfile[] = [
  {
    userId: "user-rafael",
    name: "Rafael Oliveira",
    avatarUrl: null,
    tipo: "pessoa",
    location: "Belo Horizonte, MG",
    experiencias: ["Engenheiro Senior @ Nubank", "Backend Lead @ iFood"],
    areas: ["Tecnologia", "Fintech"],
    atuacoes: ["Engenharia de Software", "Arquitetura de Sistemas"],
    objetivos: ["oportunidades", "conexoes"],
    matchScore: 94,
  },
  {
    userId: "user-mariana",
    name: "Mariana Lima",
    avatarUrl: null,
    tipo: "pessoa",
    location: "Sao Paulo, SP",
    experiencias: ["CEO @ EduConnect", "Gerente de Produto @ Creditas"],
    areas: ["Empreendedorismo", "Educacao"],
    atuacoes: ["Gestao de Produto", "Lideranca"],
    objetivos: ["contratar", "oportunidades"],
    matchScore: 89,
  },
  {
    userId: "user-ana",
    name: "Ana Beatriz",
    avatarUrl: null,
    tipo: "pessoa",
    location: "Rio de Janeiro, RJ",
    experiencias: ["Product Manager @ XP Inc", "PM @ RecargaPay"],
    areas: ["Tecnologia", "Fintech"],
    atuacoes: ["Gestao de Produto", "Estrategia"],
    objetivos: ["conexoes", "oportunidades"],
    matchScore: 85,
  },
  {
    userId: "user-isabela",
    name: "Isabela Mendes",
    avatarUrl: null,
    tipo: "pessoa",
    location: "Florianopolis, SC",
    experiencias: ["Co-fundadora @ FinMEI", "Analista @ Totvs"],
    areas: ["Fintech", "Empreendedorismo"],
    atuacoes: ["Empreendedorismo", "Desenvolvimento de Negocios"],
    objetivos: ["oportunidades", "contratar"],
    matchScore: 82,
  },
  {
    userId: "user-pedro",
    name: "Pedro Costa",
    avatarUrl: null,
    tipo: "pessoa",
    location: "Curitiba, PR",
    experiencias: ["Designer Principal @ Conta Simples", "UX Lead @ Loggi"],
    areas: ["Design", "Tecnologia"],
    atuacoes: ["Design UX/UI", "Research"],
    objetivos: ["conexoes"],
    matchScore: 78,
  },
];

// ---------------------------------------------------------------------------
// Mock connections
// ---------------------------------------------------------------------------

export const MOCK_CONNECTIONS: ConnectionItem[] = [
  {
    connectionId: "conn-1",
    user: {
      id: "user-ana",
      name: "Ana Beatriz",
      avatarUrl: null,
      tipo: "pessoa",
      subtitle: "Product Manager | Rio de Janeiro, RJ",
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    connectionId: "conn-2",
    user: {
      id: "user-pedro",
      name: "Pedro Costa",
      avatarUrl: null,
      tipo: "pessoa",
      subtitle: "Designer UX/UI | Curitiba, PR",
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ---------------------------------------------------------------------------
// Mock leagues
// ---------------------------------------------------------------------------

export const MOCK_LEAGUES: LeagueListItem[] = [
  {
    league: {
      id: "league-1",
      nome: "StartupBR — Empreendedores",
      descricao: "Comunidade para fundadores, co-founders e entusiastas de startups brasileiras. Compartilhe aprendizados, busque co-founders e troque experiencias.",
      fotoUrl: null,
      visibilidade: "publica",
      founderId: "user-mariana",
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    membrosCount: 47,
    areas: ["Empreendedorismo", "Startups"],
    atuacoes: ["Desenvolvimento de Negocios", "Gestao de Produto"],
    role: "membro",
  },
  {
    league: {
      id: "league-2",
      nome: "Devs do Sul",
      descricao: "Liga para desenvolvedores da regiao Sul do Brasil. Network, vagas, eventos e muito codigo.",
      fotoUrl: null,
      visibilidade: "publica",
      founderId: "user-joao",
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    },
    membrosCount: 31,
    areas: ["Tecnologia"],
    atuacoes: ["Engenharia de Software", "Desenvolvimento de Software"],
    role: "fundador",
  },
];

// ---------------------------------------------------------------------------
// Mock notifications
// ---------------------------------------------------------------------------

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    notification: {
      id: "notif-1",
      userId: MOCK_USER_ID,
      type: "like",
      actorId: "user-joao",
      referenceId: "post-5",
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    actor: { id: "user-joao", name: "Joao Silva", avatarUrl: null },
  },
  {
    notification: {
      id: "notif-2",
      userId: MOCK_USER_ID,
      type: "follow",
      actorId: "user-ana",
      referenceId: null,
      read: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    actor: { id: "user-ana", name: "Ana Beatriz", avatarUrl: null },
  },
  {
    notification: {
      id: "notif-3",
      userId: MOCK_USER_ID,
      type: "comment",
      actorId: "user-rafael",
      referenceId: "post-4",
      read: false,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    actor: { id: "user-rafael", name: "Rafael Oliveira", avatarUrl: null },
  },
  {
    notification: {
      id: "notif-4",
      userId: MOCK_USER_ID,
      type: "connection",
      actorId: "user-pedro",
      referenceId: null,
      read: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    actor: { id: "user-pedro", name: "Pedro Costa", avatarUrl: null },
  },
  {
    notification: {
      id: "notif-5",
      userId: MOCK_USER_ID,
      type: "like",
      actorId: "user-carla",
      referenceId: "post-6",
      read: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    actor: { id: "user-carla", name: "Carla Santos", avatarUrl: null },
  },
];

// ---------------------------------------------------------------------------
// Mock search results
// ---------------------------------------------------------------------------

export const MOCK_SEARCH_PROFILES: SearchProfileResult[] = [
  {
    userId: "user-joao",
    name: "Joao Silva",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Desenvolvedor Full Stack | Sao Paulo, SP",
  },
  {
    userId: "user-ana",
    name: "Ana Beatriz",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Product Manager | Rio de Janeiro, RJ",
  },
  {
    userId: "user-pedro",
    name: "Pedro Costa",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Designer UX/UI | Curitiba, PR",
  },
  {
    userId: "user-mariana",
    name: "Mariana Lima",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "CEO & Co-fundadora | Sao Paulo, SP",
  },
  {
    userId: "user-rafael",
    name: "Rafael Oliveira",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Engenheiro de Software | Belo Horizonte, MG",
  },
  {
    userId: "user-carla",
    name: "Carla Santos",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Head de Marketing | Porto Alegre, RS",
  },
  {
    userId: "user-lucas",
    name: "Lucas Ferreira",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Data Scientist | Sao Paulo, SP",
  },
  {
    userId: "user-isabela",
    name: "Isabela Mendes",
    avatarUrl: null,
    tipo: "pessoa",
    subtitle: "Co-fundadora | Florianopolis, SC",
  },
];

export const MOCK_SEARCH_LEAGUES: SearchLeagueResult[] = [
  {
    leagueId: "league-1",
    nome: "StartupBR — Empreendedores",
    fotoUrl: null,
    membrosCount: 47,
    subtitle: "47 membros | Publica",
  },
  {
    leagueId: "league-2",
    nome: "Devs do Sul",
    fotoUrl: null,
    membrosCount: 31,
    subtitle: "31 membros | Publica",
  },
  {
    leagueId: "league-3",
    nome: "Product Community BR",
    fotoUrl: null,
    membrosCount: 62,
    subtitle: "62 membros | Publica",
  },
];

// ---------------------------------------------------------------------------
// Mock comments
// ---------------------------------------------------------------------------

export const MOCK_COMMENTS = [
  {
    id: "comment-1",
    postId: "post-1",
    authorId: "user-rafael",
    content: "Parabens pela coragem! Qual o modelo de negocio?",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    author: { id: "user-rafael", name: "Rafael Oliveira", avatarUrl: null },
  },
  {
    id: "comment-2",
    postId: "post-1",
    authorId: "user-pedro",
    content: "Incrivel! Ja testei e o UX e muito bom.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    author: { id: "user-pedro", name: "Pedro Costa", avatarUrl: null },
  },
];
