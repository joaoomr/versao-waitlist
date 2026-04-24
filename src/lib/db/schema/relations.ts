import { relations } from "drizzle-orm";
import { users, profiles, usersConsents } from "./users";
import {
  userAreas,
  userAtuacao,
  userObjetivos,
  userProfissoes,
  userExperiencias,
  userEscolaridade,
} from "./profile-sections";
import { swipeActions, connections, follows } from "./connections";
import { posts, postLikes, comments } from "./content";
import {
  leagues,
  leagueMembers,
  leagueInvites,
  leagueAreas,
  leagueAtuacao,
} from "./leagues";
import {
  conversations,
  conversationParticipants,
  messages,
} from "./chat";
import { notifications } from "./notifications";
import { feedback } from "./feedback";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  consents: many(usersConsents),
  areas: many(userAreas),
  atuacao: many(userAtuacao),
  objetivos: many(userObjetivos),
  profissoes: many(userProfissoes),
  experiencias: many(userExperiencias),
  escolaridade: many(userEscolaridade),
  posts: many(posts),
  postLikes: many(postLikes),
  comments: many(comments),
  swipeActionsMade: many(swipeActions, { relationName: "swipeUser" }),
  swipeActionsReceived: many(swipeActions, { relationName: "swipeTarget" }),
  connectionsAsA: many(connections, { relationName: "connectionUserA" }),
  connectionsAsB: many(connections, { relationName: "connectionUserB" }),
  followersOf: many(follows, { relationName: "followFollower" }),
  followingBy: many(follows, { relationName: "followFollowing" }),
  leaguesCreated: many(leagues),
  leagueMemberships: many(leagueMembers),
  conversationParticipations: many(conversationParticipants),
  messagesSent: many(messages),
  notifications: many(notifications, { relationName: "notificationUser" }),
  notificationsActed: many(notifications, { relationName: "notificationActor" }),
  feedbacks: many(feedback),
}));

// ---------------------------------------------------------------------------
// Profiles
// ---------------------------------------------------------------------------

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

// ---------------------------------------------------------------------------
// User Consents
// ---------------------------------------------------------------------------

export const usersConsentsRelations = relations(usersConsents, ({ one }) => ({
  user: one(users, {
    fields: [usersConsents.userId],
    references: [users.id],
  }),
}));

// ---------------------------------------------------------------------------
// Profile Sections
// ---------------------------------------------------------------------------

export const userAreasRelations = relations(userAreas, ({ one }) => ({
  user: one(users, {
    fields: [userAreas.userId],
    references: [users.id],
  }),
}));

export const userAtuacaoRelations = relations(userAtuacao, ({ one }) => ({
  user: one(users, {
    fields: [userAtuacao.userId],
    references: [users.id],
  }),
}));

export const userObjetivosRelations = relations(userObjetivos, ({ one }) => ({
  user: one(users, {
    fields: [userObjetivos.userId],
    references: [users.id],
  }),
}));

export const userProfissoesRelations = relations(userProfissoes, ({ one }) => ({
  user: one(users, {
    fields: [userProfissoes.userId],
    references: [users.id],
  }),
}));

export const userExperienciasRelations = relations(
  userExperiencias,
  ({ one }) => ({
    user: one(users, {
      fields: [userExperiencias.userId],
      references: [users.id],
    }),
  })
);

export const userEscolaridadeRelations = relations(
  userEscolaridade,
  ({ one }) => ({
    user: one(users, {
      fields: [userEscolaridade.userId],
      references: [users.id],
    }),
  })
);

// ---------------------------------------------------------------------------
// Connections
// ---------------------------------------------------------------------------

export const swipeActionsRelations = relations(swipeActions, ({ one }) => ({
  user: one(users, {
    fields: [swipeActions.userId],
    references: [users.id],
    relationName: "swipeUser",
  }),
  target: one(users, {
    fields: [swipeActions.targetId],
    references: [users.id],
    relationName: "swipeTarget",
  }),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  userA: one(users, {
    fields: [connections.userAId],
    references: [users.id],
    relationName: "connectionUserA",
  }),
  userB: one(users, {
    fields: [connections.userBId],
    references: [users.id],
    relationName: "connectionUserB",
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "followFollower",
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "followFollowing",
  }),
}));

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  likes: many(postLikes),
  comments: many(comments),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [postLikes.userId],
    references: [users.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

// ---------------------------------------------------------------------------
// Leagues
// ---------------------------------------------------------------------------

export const leaguesRelations = relations(leagues, ({ one, many }) => ({
  founder: one(users, {
    fields: [leagues.founderId],
    references: [users.id],
  }),
  members: many(leagueMembers),
  invites: many(leagueInvites),
  areas: many(leagueAreas),
  atuacao: many(leagueAtuacao),
  conversations: many(conversations),
}));

export const leagueMembersRelations = relations(leagueMembers, ({ one }) => ({
  league: one(leagues, {
    fields: [leagueMembers.leagueId],
    references: [leagues.id],
  }),
  user: one(users, {
    fields: [leagueMembers.userId],
    references: [users.id],
  }),
}));

export const leagueInvitesRelations = relations(leagueInvites, ({ one }) => ({
  league: one(leagues, {
    fields: [leagueInvites.leagueId],
    references: [leagues.id],
  }),
}));

export const leagueAreasRelations = relations(leagueAreas, ({ one }) => ({
  league: one(leagues, {
    fields: [leagueAreas.leagueId],
    references: [leagues.id],
  }),
}));

export const leagueAtuacaoRelations = relations(leagueAtuacao, ({ one }) => ({
  league: one(leagues, {
    fields: [leagueAtuacao.leagueId],
    references: [leagues.id],
  }),
}));

// ---------------------------------------------------------------------------
// Chat
// ---------------------------------------------------------------------------

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    league: one(leagues, {
      fields: [conversations.leagueId],
      references: [leagues.id],
    }),
    participants: many(conversationParticipants),
    messages: many(messages),
  })
);

export const conversationParticipantsRelations = relations(
  conversationParticipants,
  ({ one }) => ({
    conversation: one(conversations, {
      fields: [conversationParticipants.conversationId],
      references: [conversations.id],
    }),
    user: one(users, {
      fields: [conversationParticipants.userId],
      references: [users.id],
    }),
  })
);

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
    relationName: "notificationUser",
  }),
  actor: one(users, {
    fields: [notifications.actorId],
    references: [users.id],
    relationName: "notificationActor",
  }),
}));

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
}));
