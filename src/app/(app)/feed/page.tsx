import Link from "next/link";
import { FileText } from "lucide-react";
import { Avatar, Button } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { FeedList } from "@/components/feed/feed-list";
import { getFeed } from "@/lib/actions/feed-actions";
import { getMyProfile } from "@/lib/actions/profile-actions";
import { getSession } from "@/lib/auth";

export default async function FeedPage() {
  const session = await getSession();
  const currentUserId = session?.userId ?? "";

  const feedResult = await getFeed(1, 20);
  const profileResult = await getMyProfile();

  const currentUserName =
    profileResult.success && profileResult.data
      ? profileResult.data.user.name
      : "Usuario";

  const feedPosts =
    feedResult.success && feedResult.data ? feedResult.data.items : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Feed</h1>
      </div>

      {/* Create post */}
      <Link
        href="/criar-post"
        className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-bg-card px-5 py-4 hover:border-border-strong transition-colors"
      >
        <Avatar name={currentUserName} size="sm" />
        <div className="flex-1 text-sm text-placeholder">No que voce esta trabalhando?</div>
        <Button size="sm" tabIndex={-1}>Publicar</Button>
      </Link>

      {/* Posts */}
      {feedPosts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Nenhum post ainda"
          description="Seja o primeiro a publicar algo na comunidade."
        />
      ) : (
        <FeedList
          posts={feedPosts}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      )}
    </div>
  );
}
