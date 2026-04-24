"use server";

import { MOCK_COMMENTS } from "@/lib/mock-data";
import type { ActionResult } from "@/lib/types";

export async function getComments(
  postId: string,
  _page: number = 1,
  _pageSize: number = 20
): Promise<
  ActionResult<{
    items: Array<{
      id: string;
      postId: string;
      authorId: string;
      content: string;
      createdAt: string;
      author: { id: string; name: string; avatarUrl: string | null };
    }>;
  }>
> {
  const items = MOCK_COMMENTS.filter((c) => c.postId === postId);
  return { success: true, data: { items } };
}

export async function createComment(_input: {
  postId: string;
  content: string;
}): Promise<ActionResult<{ commentId: string }>> {
  return { success: false, error: "WAITLIST" };
}

export async function deleteComment(
  _commentId: string
): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}
