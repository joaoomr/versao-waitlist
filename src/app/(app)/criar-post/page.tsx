"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { Avatar, Button, Textarea } from "@/components/ui";
import { createPost } from "@/lib/actions/feed-actions";
import { getMyProfile } from "@/lib/actions/profile-actions";
import { openWaitlist } from "@/lib/waitlist";

export default function CriarPostPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    async function loadUser() {
      const result = await getMyProfile();
      if (result.success && result.data) {
        setUserName(result.data.user.name);
      }
    }
    loadUser();
  }, []);

  function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    const remaining = 10 - images.length;
    setImages((prev) => [...prev, ...imageFiles.slice(0, remaining)]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);
    setError("");

    try {
      // TODO: Integrate image upload with Uploadthing
      // For now, images are not uploaded
      const mediaUrls: string[] = [];

      // Parse tags
      const parsedTags = tags
        .split(/[\s,]+/)
        .map((t) => t.replace(/^#/, "").trim())
        .filter(Boolean);

      const result = await createPost({
        content: content.trim(),
        tags: parsedTags,
        mediaUrls,
      });

      if (!result.success && result.error === "WAITLIST") {
        openWaitlist();
      } else if (result.success) {
        router.push("/feed");
      } else {
        setError(result.error ?? "Erro ao publicar");
      }
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = content.trim().length > 0 && !loading;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/feed"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong text-body hover:text-heading transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-bold text-heading">Criar post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {loading ? "Publicando..." : "Publicar"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-error text-center">{error}</p>
      )}

      <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <div className="flex items-center gap-3">
          <Avatar name={userName} size="sm" />
          <div>
            <p className="text-sm font-medium text-heading">{userName}</p>
            <p className="text-xs text-body">Publicando como voce</p>
          </div>
        </div>

        <Textarea
          placeholder="No que voce esta trabalhando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxChars={2000}
          charCount={content.length}
          className="min-h-[160px]"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-label">Tags (opcional)</label>
          <input
            type="text"
            placeholder="Ex: #design #produto #carreira"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="h-11 w-full rounded-[var(--radius-input)] border border-border bg-bg-card-alt px-3.5 text-sm text-heading placeholder:text-placeholder focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none"
          />
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Midia (opcional)</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddImages}
          />

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative h-20 w-20 rounded-lg overflow-hidden border border-border">
                  <img src={URL.createObjectURL(img)} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < 10 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-24 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-sm text-placeholder hover:border-accent hover:text-accent transition-colors"
            >
              <ImagePlus size={20} strokeWidth={1.5} />
              Adicionar imagens ({images.length}/10)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
