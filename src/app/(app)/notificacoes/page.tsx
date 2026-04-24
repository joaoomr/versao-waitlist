"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, MessageCircle, UserPlus, Users, Bell, CheckCheck } from "lucide-react";
import { Avatar, Button } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getNotifications, markAsRead, markAllAsRead } from "@/lib/actions/notification-actions";
import type { NotificationItem } from "@/lib/types";

const typeIcons = {
  follow: UserPlus,
  like: Heart,
  comment: MessageCircle,
  connection: Users,
  league_invite: Bell,
};

const typeMessages = {
  follow: "comecou a seguir voce",
  like: "curtiu sua publicacao",
  comment: "comentou na sua publicacao",
  connection: "agora e uma conexao",
  league_invite: "te convidou para uma liga",
};

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getNotifications(1, 50);
      if (result.success && result.data) {
        setNotifications(result.data.items);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  async function handleClickNotification(notificationId: string) {
    // Mark as read optimistically
    setNotifications((prev) =>
      prev.map((n) =>
        n.notification.id === notificationId
          ? { ...n, notification: { ...n.notification, read: true } }
          : n
      )
    );

    try {
      await markAsRead(notificationId);
    } catch {
      // Revert on error
      loadNotifications();
    }
  }

  async function handleMarkAllAsRead() {
    setMarkingAll(true);
    try {
      const result = await markAllAsRead();
      if (result.success) {
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, notification: { ...n.notification, read: true } }))
        );
      }
    } catch {
      // Handle error
    } finally {
      setMarkingAll(false);
    }
  }

  const unreadCount = notifications.filter((n) => !n.notification.read).length;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "agora";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-heading">Notificacoes</h1>
        <p className="text-center text-sm text-placeholder py-8">Carregando notificacoes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">Notificacoes</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-body">{unreadCount} nao {unreadCount === 1 ? "lida" : "lidas"}</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={markingAll}
          >
            <CheckCheck size={14} />
            {markingAll ? "Marcando..." : "Marcar todas como lidas"}
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Nenhuma notificacao"
          description="Quando alguem interagir com voce, aparecera aqui."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => {
            const Icon = typeIcons[n.notification.type as keyof typeof typeIcons] ?? Bell;
            const message = typeMessages[n.notification.type as keyof typeof typeMessages] ?? "interagiu com voce";

            return (
              <button
                key={n.notification.id}
                onClick={() => {
                  if (!n.notification.read) {
                    handleClickNotification(n.notification.id);
                  }
                }}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors text-left w-full ${
                  n.notification.read
                    ? "border-border bg-bg-card"
                    : "border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/8"
                }`}
              >
                <Avatar name={n.actor.name} src={n.actor.avatarUrl} size="sm" />
                <div className="flex-1">
                  <p className="text-sm text-heading">
                    <span className="font-semibold">{n.actor.name}</span>{" "}
                    <span className="text-body">{message}</span>
                  </p>
                  <p className="text-xs text-placeholder">{timeAgo(n.notification.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!n.notification.read && (
                    <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                  )}
                  <Icon size={16} className="text-placeholder" strokeWidth={1.5} />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
