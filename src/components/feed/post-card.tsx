"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Trash2, Flag, Check } from "lucide-react";
import { Avatar } from "@/components/ui";
import { likePost, unlikePost, deletePost } from "@/lib/actions/feed-actions";
import { getComments, createComment } from "@/lib/actions/comment-actions";
import { openWaitlist } from "@/lib/waitlist";
import type { FeedPost, Comment } from "@/lib/types";

interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}

interface PostCardProps {
  item: FeedPost;
  currentUserId: string;
  currentUserName: string;
}

export function PostCard({ item, currentUserId, currentUserName }: PostCardProps) {
  const [liked, setLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.post.likesCount);
  const [commentsCount, setCommentsCount] = useState(item.post.commentsCount);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<CommentWithAuthor[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthor = item.post.authorId === currentUserId;

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "agora";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  async function handleLike() {
    const result = await likePost(item.post.id);
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    }
  }

  async function handleToggleComments() {
    const willShow = !showComments;
    setShowComments(willShow);

    if (willShow && !commentsLoaded) {
      const result = await getComments(item.post.id);
      if (result.success && result.data) {
        setCommentsList(result.data.items as CommentWithAuthor[]);
        setCommentsLoaded(true);
      }
    }
  }

  async function handleSubmitComment() {
    const trimmed = commentText.trim();
    if (!trimmed || submittingComment) return;

    setSubmittingComment(true);

    const result = await createComment({ postId: item.post.id, content: trimmed });

    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    } else if (result.success && result.data) {
      const newComment: CommentWithAuthor = {
        id: result.data.commentId,
        postId: item.post.id,
        authorId: currentUserId,
        content: trimmed,
        createdAt: new Date().toISOString(),
        author: {
          id: currentUserId,
          name: currentUserName,
          avatarUrl: null,
        },
      };
      setCommentsList((prev) => [newComment, ...prev]);
      setCommentsCount((c) => c + 1);
      setCommentText("");
    }

    setSubmittingComment(false);
  }

  async function handleDelete() {
    setShowMenu(false);
    const result = await deletePost(item.post.id);
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    } else if (result.success) {
      setDeleted(true);
    }
  }

  function handleShare() {
    const url = `${window.location.origin}/feed`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (deleted) return null;

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={item.author.name} src={item.author.avatarUrl} size="sm" />
          <div>
            <Link href="/perfil" className="text-sm font-semibold text-heading hover:text-accent transition-colors">
              {item.author.name}
            </Link>
            <p className="text-xs text-body">
              {item.author.profissao ? `${item.author.profissao} · ` : ""}{timeAgo(item.post.createdAt)}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative" ref={menuRef}>
          <button
            className="text-placeholder hover:text-heading transition-colors"
            onClick={() => setShowMenu((s) => !s)}
          >
            <MoreHorizontal size={18} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-8 z-20 min-w-[160px] rounded-xl border border-border bg-bg-card shadow-lg py-1">
                {isAuthor ? (
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>
                ) : (
                  <button
                    onClick={() => setShowMenu(false)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-body hover:text-heading hover:bg-bg-card-alt transition-colors"
                  >
                    <Flag size={14} />
                    Denunciar
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-heading leading-relaxed">{item.post.content}</p>

      {/* Actions */}
      <div className="flex items-center justify-between text-sm text-body">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors ${liked ? "text-error" : "hover:text-error"}`}
          >
            <Heart size={16} strokeWidth={1.5} fill={liked ? "currentColor" : "none"} />
            {likesCount}
          </button>
          <button
            onClick={handleToggleComments}
            className={`flex items-center gap-1.5 transition-colors ${showComments ? "text-accent" : "hover:text-accent"}`}
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            {commentsCount}
          </button>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} strokeWidth={1.5} className="text-success" />
              <span className="text-success">Link copiado</span>
            </>
          ) : (
            <>
              <Share2 size={16} strokeWidth={1.5} />
              Compartilhar
            </>
          )}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          {/* Comment input */}
          <div className="flex items-center gap-2">
            <Avatar name={currentUserName} size="xs" />
            <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-input)] border border-border bg-bg-card-alt px-3 py-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                placeholder="Escreva um comentario..."
                className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
                disabled={submittingComment}
              />
              <button
                onClick={handleSubmitComment}
                disabled={!commentText.trim() || submittingComment}
                className="text-accent disabled:opacity-40 transition-opacity"
              >
                <Send size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Comment list */}
          {commentsList.length > 0 && (
            <div className="flex flex-col gap-3">
              {commentsList.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <Avatar name={comment.author.name} src={comment.author.avatarUrl} size="xs" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-heading">{comment.author.name}</span>
                      <span className="text-[11px] text-placeholder">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-body">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {commentsLoaded && commentsList.length === 0 && (
            <p className="text-xs text-placeholder text-center py-2">Nenhum comentario ainda</p>
          )}
        </div>
      )}
    </div>
  );
}
