import { z } from "zod";

// ---------------------------------------------------------------------------
// Post
// ---------------------------------------------------------------------------

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Conteudo e obrigatorio")
    .max(2000, "Conteudo deve ter no maximo 2000 caracteres"),
  tags: z.array(z.string().max(50)).max(20).optional().default([]),
  mediaUrls: z.array(z.string().url()).max(10, "Maximo 10 imagens").optional().default([]),
});

// ---------------------------------------------------------------------------
// Comment
// ---------------------------------------------------------------------------

export const createCommentSchema = z.object({
  postId: z.string().uuid("Post invalido"),
  content: z
    .string()
    .min(1, "Comentario e obrigatorio")
    .max(500, "Comentario deve ter no maximo 500 caracteres"),
});

// ---------------------------------------------------------------------------
// Like
// ---------------------------------------------------------------------------

export const likePostSchema = z.object({
  postId: z.string().uuid("Post invalido"),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type LikePostInput = z.infer<typeof likePostSchema>;
