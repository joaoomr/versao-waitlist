// =============================================================================
// Soci V2 — Type Definitions
// Source of truth: soci-v2-planejamento-tecnico.md Schema V2 (21 tabelas)
// =============================================================================

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export type UserTipo = "pessoa" | "empresa";

export type SwipeAction = "passa" | "seguir" | "curtir";

export type LeagueVisibility = "publica" | "privada";

export type LeagueRole = "fundador" | "membro";

export type ConversationType = "direct" | "league";

export type NotificationType =
  | "follow"
  | "like"
  | "comment"
  | "connection"
  | "league_invite";

export type Objetivo = "oportunidades" | "contratar" | "conexoes";

export type ConsentType = "termos" | "privacidade" | "analytics";

export type EscolaridadeNivel =
  | "ensino_fundamental_incompleto"
  | "ensino_fundamental_completo"
  | "ensino_medio_incompleto"
  | "ensino_medio_completo"
  | "ensino_tecnico_incompleto"
  | "ensino_tecnico_completo"
  | "ensino_superior_incompleto"
  | "ensino_superior_completo"
  | "pos_graduacao_incompleta"
  | "pos_graduacao_completa"
  | "mestrado_incompleto"
  | "mestrado_completo"
  | "doutorado_incompleto"
  | "doutorado_completo";

// ---------------------------------------------------------------------------
// Grupo 1: Usuarios e Perfis
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  tipo: UserTipo;
  avatarUrl: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  idade: number | null;
  bio: string | null;
  redeSocial: string | null;
  site: string | null;
  estado: string | null;
  cidade: string | null;
  codigoIbge: number | null;
  latitude: number | null;
  longitude: number | null;
  onboardingCompleted: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 2: Secoes do Perfil (junction tables)
// ---------------------------------------------------------------------------

export interface UserArea {
  id: string;
  userId: string;
  area: string;
}

export interface UserAtuacao {
  id: string;
  userId: string;
  atuacao: string;
}

export interface UserObjetivo {
  id: string;
  userId: string;
  objetivo: Objetivo;
}

export interface UserProfissao {
  id: string;
  userId: string;
  profissao: string;
  ordem: number;
}

export interface UserExperiencia {
  id: string;
  userId: string;
  cargo: string;
  empresa: string;
  periodoInicio: string;
  periodoFim: string | null;
}

export interface UserEscolaridade {
  id: string;
  userId: string;
  nivel: EscolaridadeNivel;
  instituicao: string | null;
  curso: string | null;
}

// ---------------------------------------------------------------------------
// Grupo 3: Conexoes e Matching
// ---------------------------------------------------------------------------

export interface SwipeActionRecord {
  id: string;
  userId: string;
  targetId: string;
  action: SwipeAction;
  createdAt: string;
}

export interface Connection {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 4: Conteudo
// ---------------------------------------------------------------------------

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaUrls: string[];
  mediaType: string | null;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 5: Ligas
// ---------------------------------------------------------------------------

export interface League {
  id: string;
  nome: string;
  descricao: string | null;
  fotoUrl: string | null;
  visibilidade: LeagueVisibility;
  founderId: string;
  createdAt: string;
}

export interface LeagueArea {
  id: string;
  leagueId: string;
  area: string;
}

export interface LeagueAtuacao {
  id: string;
  leagueId: string;
  atuacao: string;
}

export interface LeagueObjetivo {
  id: string;
  leagueId: string;
  objetivo: Objetivo;
}

export interface LeagueMember {
  id: string;
  leagueId: string;
  userId: string;
  role: LeagueRole;
  joinedAt: string;
}

export interface LeagueInvite {
  id: string;
  leagueId: string;
  code: string;
  expiresAt: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 6: Chat
// ---------------------------------------------------------------------------

export interface Conversation {
  id: string;
  type: ConversationType;
  leagueId: string | null;
  createdAt: string;
}

export interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  lastReadAt: string | null;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  mediaUrl: string | null;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 7: Notificacoes
// ---------------------------------------------------------------------------

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  actorId: string;
  referenceId: string | null;
  read: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 8: Feedback
// ---------------------------------------------------------------------------

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  content: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Grupo 9: LGPD Consents
// ---------------------------------------------------------------------------

export interface UserConsent {
  id: string;
  userId: string;
  consentType: ConsentType;
  accepted: boolean;
  version: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Composite types (used by front-end pages)
// ---------------------------------------------------------------------------

/** Full profile with all junction data — used by profile pages, edit profile */
export interface FullProfile {
  user: User;
  profile: Profile;
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
  profissoes: UserProfissao[];
  experiencias: UserExperiencia[];
  escolaridade: UserEscolaridade[];
}

/** Explore card — minimal profile data for swipe cards */
export interface ExploreProfile {
  userId: string;
  name: string;
  avatarUrl: string | null;
  tipo: UserTipo;
  location: string | null;
  experiencias: string[];
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
  matchScore: number;
}

/** Feed post with author info */
export interface FeedPost {
  post: Post;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
    profissao: string | null;
  };
  isLiked: boolean;
}

/** Connection list item */
export interface ConnectionItem {
  connectionId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string | null;
    tipo: UserTipo;
    subtitle: string;
  };
  createdAt: string;
}

/** Search result item (profiles and leagues) */
export interface SearchProfileResult {
  userId: string;
  name: string;
  avatarUrl: string | null;
  tipo: UserTipo;
  subtitle: string;
}

export interface SearchLeagueResult {
  leagueId: string;
  nome: string;
  fotoUrl: string | null;
  membrosCount: number;
  subtitle: string;
}

/** League with member count — used by /ligas page */
export interface LeagueListItem {
  league: League;
  membrosCount: number;
  areas: string[];
  atuacoes: string[];
  role: LeagueRole;
}

/** Conversation preview — used by chat sidebar */
export interface ConversationPreview {
  conversation: Conversation;
  otherUser: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  lastMessage: {
    content: string;
    createdAt: string;
    isOwn: boolean;
  } | null;
  unreadCount: number;
}

/** Notification with actor info */
export interface NotificationItem {
  notification: Notification;
  actor: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}

// ---------------------------------------------------------------------------
// Server action return types
// ---------------------------------------------------------------------------

export interface ActionResult<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
