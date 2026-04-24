"use server";

import { MOCK_FEED_POSTS } from "@/lib/mock-data";
import type { ActionResult, PaginatedResult, FeedPost } from "@/lib/types";

export async function getFeed(
  page: number = 1,
  pageSize: number = 20
): Promise<ActionResult<PaginatedResult<FeedPost>>> {
  const items = MOCK_FEED_POSTS;
  return {
    success: true,
    data: {
      items,
      total: items.length,
      page,
      pageSize,
      hasMore: false,
    },
  };
}

export async function createPost(_input: {
  content: string;
  tags: string[];
  mediaUrls: string[];
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function likePost(_postId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function unlikePost(_postId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function deletePost(_postId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}
