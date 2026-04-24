"use server";

import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import type { ActionResult, PaginatedResult, NotificationItem } from "@/lib/types";

export async function getNotifications(
  _page: number = 1,
  _pageSize: number = 50
): Promise<ActionResult<PaginatedResult<NotificationItem>>> {
  return {
    success: true,
    data: {
      items: MOCK_NOTIFICATIONS,
      total: MOCK_NOTIFICATIONS.length,
      page: 1,
      pageSize: 50,
      hasMore: false,
    },
  };
}

export async function getUnreadCount(): Promise<ActionResult<{ count: number }>> {
  const count = MOCK_NOTIFICATIONS.filter((n) => !n.notification.read).length;
  return { success: true, data: { count } };
}

export async function markAsRead(_notificationId: string): Promise<ActionResult> {
  return { success: true };
}

export async function markAllAsRead(): Promise<ActionResult> {
  return { success: true };
}
