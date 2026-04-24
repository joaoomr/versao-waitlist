"use server";

import type { ActionResult, PaginatedResult, ConversationPreview } from "@/lib/types";

export async function getConversations(): Promise<
  ActionResult<ConversationPreview[]>
> {
  return { success: true, data: [] };
}

export async function getMessages(
  _conversationId: string,
  _page?: number,
  _pageSize?: number
): Promise<
  ActionResult<
    PaginatedResult<{
      id: string;
      conversationId: string;
      senderId: string;
      content: string;
      mediaUrl: string | null;
      createdAt: string;
    }>
  >
> {
  return {
    success: true,
    data: { items: [], total: 0, page: 1, pageSize: 50, hasMore: false },
  };
}

export async function sendMessage(_input: {
  conversationId: string;
  content: string;
}): Promise<ActionResult<{ messageId: string }>> {
  return { success: false, error: "WAITLIST" };
}

export async function markConversationRead(
  _conversationId: string
): Promise<ActionResult> {
  return { success: true };
}

export async function getOrCreateConversation(
  _targetUserId: string
): Promise<ActionResult<{ conversationId: string }>> {
  return { success: false, error: "WAITLIST" };
}
