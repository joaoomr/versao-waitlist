"use server";

import { MOCK_EXPLORE_PROFILES } from "@/lib/mock-data";
import type { ActionResult, ExploreProfile } from "@/lib/types";

export async function getExploreProfiles(_filters: {
  area?: string;
  atuacao?: string;
  objetivo?: string;
}): Promise<ActionResult<ExploreProfile[]>> {
  return { success: true, data: MOCK_EXPLORE_PROFILES };
}

export async function recordSwipe(_input: {
  targetId: string;
  action: "passa" | "seguir" | "curtir";
}): Promise<ActionResult<{ matched: boolean }>> {
  return { success: false, error: "WAITLIST" };
}
