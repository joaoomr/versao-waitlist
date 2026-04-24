"use client";

import { PostCard } from "@/components/feed/post-card";
import type { FeedPost } from "@/lib/types";

interface FeedListProps {
  posts: FeedPost[];
  currentUserId: string;
  currentUserName: string;
}

export function FeedList({ posts, currentUserId, currentUserName }: FeedListProps) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((item) => (
        <PostCard
          key={item.post.id}
          item={item}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      ))}
    </div>
  );
}
