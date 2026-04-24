"use server";

import { MOCK_CURRENT_USER } from "@/lib/mock-data";
import type { ActionResult } from "@/lib/types";

export async function getAccountInfo(): Promise<
  ActionResult<{
    name: string;
    email: string;
    avatarUrl: string | null;
    tipo: string;
    createdAt: string;
  } | null>
> {
  return {
    success: true,
    data: {
      name: MOCK_CURRENT_USER.user.name,
      email: MOCK_CURRENT_USER.user.email,
      avatarUrl: MOCK_CURRENT_USER.user.avatarUrl,
      tipo: MOCK_CURRENT_USER.user.tipo,
      createdAt: MOCK_CURRENT_USER.user.createdAt,
    },
  };
}

export async function toggleNotifications(): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function submitFeedback(_input: {
  rating: number;
  content?: string;
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function softDeleteAccount(): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function exportUserData(): Promise<
  ActionResult<Record<string, unknown>>
> {
  return { success: false, error: "WAITLIST" };
}
