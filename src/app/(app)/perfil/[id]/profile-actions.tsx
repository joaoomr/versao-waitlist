"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, MessageSquare, UserCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { follow } from "@/lib/actions/follow-actions";
import { getOrCreateConversation } from "@/lib/actions/chat-actions";

interface ProfileActionsProps {
  targetUserId: string;
}

export function ProfileActions({ targetUserId }: ProfileActionsProps) {
  const router = useRouter();
  const [followed, setFollowed] = useState(false);
  const [following, setFollowing] = useState(false);
  const [messaging, setMessaging] = useState(false);

  async function handleFollow() {
    setFollowing(true);
    try {
      const result = await follow(targetUserId);
      if (result.success) {
        setFollowed(true);
      }
    } finally {
      setFollowing(false);
    }
  }

  async function handleMessage() {
    setMessaging(true);
    try {
      const result = await getOrCreateConversation(targetUserId);
      if (result.success && result.data) {
        router.push(`/chat?conv=${result.data.conversationId}`);
      }
    } finally {
      setMessaging(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleFollow}
        disabled={followed || following}
      >
        {followed ? (
          <>
            <UserCheck size={14} /> Seguindo
          </>
        ) : (
          <>
            <UserPlus size={14} /> {following ? "..." : "Seguir"}
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleMessage}
        disabled={messaging}
      >
        <MessageSquare size={14} /> {messaging ? "..." : "Mensagem"}
      </Button>
    </div>
  );
}
