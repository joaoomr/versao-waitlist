"use server";

import type { ActionResult } from "@/lib/types";

export async function follow(_targetId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function unfollow(_targetId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function getFollowCounts(
  _targetUserId?: string
): Promise<ActionResult<{ following: number; followers: number }>> {
  return { success: true, data: { following: 47, followers: 128 } };
}
