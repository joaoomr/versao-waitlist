import { MapPin, Link2, Briefcase, GraduationCap, Heart, MessageCircle, Pencil, PlusCircle } from "lucide-react";
import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, Badge, Button, Card } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getMyProfile } from "@/lib/actions/profile-actions";
import { getFeed } from "@/lib/actions/feed-actions";
import { getFollowCounts } from "@/lib/actions/follow-actions";
import { getConnections } from "@/lib/actions/connection-actions";
import type { FullProfile, FeedPost, UserExperiencia, UserEscolaridade } from "@/lib/types";

export default async function PerfilPage() {
  const profileResult = await getMyProfile();

  if (!profileResult.success || !profileResult.data) {
    return <EmptyState icon={UserIcon} title="Nao autenticado" description="Faca login para ver seu perfil." />;
  }

  const data: FullProfile = profileResult.data;

  // Get user posts via feed (filtered by author on client)
  const feedResult = await getFeed(1, 10);
  const myPosts: FeedPost[] = feedResult.success && feedResult.data
    ? feedResult.data.items.filter((item: FeedPost) => item.post.authorId === data.user.id)
    : [];

  const location = [data.profile.cidade, data.profile.estado].filter(Boolean).join(", ");
  const isPF = data.user.tipo === "pessoa";

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "agora";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header card — full width */}
      <Card elevated>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            <Avatar name={data.user.name} src={data.user.avatarUrl} size="xl" />
            <div className="flex flex-col gap-1.5 pt-1">
              <h1 className="text-2xl font-bold text-heading">{data.user.name}</h1>
              {data.profissoes.length > 0 && (
                <p className="text-sm text-body">{data.profissoes.map((p) => p.profissao).join(" · ")}</p>
              )}
              {location && (
                <p className="flex items-center gap-1 text-xs text-placeholder">
                  <MapPin size={12} /> {location}
                </p>
              )}
              <div className="flex items-center gap-4 mt-1">
                {data.profile.redeSocial && (
                  <span className="text-xs text-accent">{data.profile.redeSocial}</span>
                )}
                {data.profile.site && (
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <Link2 size={10} /> {data.profile.site}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Link href="/editar-perfil">
            <Button variant="secondary" size="sm">
              <Pencil size={14} /> Editar
            </Button>
          </Link>
        </div>

        {data.profile.bio && (
          <p className="mt-4 text-sm text-body leading-relaxed">{data.profile.bio}</p>
        )}

        {/* Stats — connection/follow counts not available from profile action, show 0 */}
        <div className="mt-4 flex gap-6 border-t border-border pt-4">
          <div className="text-center">
            <span className="text-lg font-bold text-heading">0</span>
            <span className="ml-1 text-xs text-placeholder">conexoes</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-heading">0</span>
            <span className="ml-1 text-xs text-placeholder">seguindo</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-heading">0</span>
            <span className="ml-1 text-xs text-placeholder">seguidores</span>
          </div>
        </div>
      </Card>

      {/* 2-column layout */}
      <div className="flex gap-6">
        {/* Left column — info cards */}
        <div className="flex w-[320px] shrink-0 flex-col gap-4">
          {/* Areas */}
          {(data.areas.length > 0 || data.atuacoes.length > 0) && (
            <Card elevated>
              <h3 className="text-sm font-semibold text-heading mb-3">Interesses e Atuacao</h3>
              {data.areas.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Interesses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.areas.map((a: string) => <Badge key={a} variant="interest">{a}</Badge>)}
                  </div>
                </div>
              )}
              {data.atuacoes.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Atuacao</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.atuacoes.map((a: string) => <Badge key={a} variant="expertise">{a}</Badge>)}
                  </div>
                </div>
              )}
              {data.objetivos.length > 0 && (
                <div>
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Objetivos</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.objetivos.map((o: string) => <Badge key={o} variant="default">{o}</Badge>)}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Experiencia */}
          {isPF && data.experiencias.length > 0 && (
            <Card elevated>
              <h3 className="text-sm font-semibold text-heading mb-3">Experiencia</h3>
              <div className="flex flex-col gap-3">
                {data.experiencias.map((exp: UserExperiencia) => (
                  <div key={exp.id} className="flex items-start gap-2.5">
                    <Briefcase size={14} className="text-placeholder mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-heading">{exp.cargo}</p>
                      <p className="text-xs text-body">{exp.empresa}</p>
                      <p className="text-[11px] text-placeholder">{exp.periodoInicio}{exp.periodoFim ? ` — ${exp.periodoFim}` : " — Atual"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Formacao */}
          {isPF && data.escolaridade.length > 0 && (
            <Card elevated>
              <h3 className="text-sm font-semibold text-heading mb-3">Formacao</h3>
              <div className="flex flex-col gap-3">
                {data.escolaridade.map((esc: UserEscolaridade) => (
                  <div key={esc.id} className="flex items-start gap-2.5">
                    <GraduationCap size={14} className="text-placeholder mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-heading">{esc.instituicao ?? "Instituicao"}</p>
                      <p className="text-xs text-body">{esc.curso ?? esc.nivel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right column — posts */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-heading">Publicacoes</h3>
            <Link href="/criar-post" className="flex items-center gap-1 text-xs text-accent hover:underline">
              <PlusCircle size={12} /> Criar post
            </Link>
          </div>

          {myPosts.length === 0 ? (
            <Card elevated>
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <p className="text-sm text-placeholder">Nenhuma publicacao ainda</p>
                <Link href="/criar-post" className="text-sm text-accent hover:underline">
                  Criar primeiro post
                </Link>
              </div>
            </Card>
          ) : (
            myPosts.map((item: FeedPost) => (
              <Card key={item.post.id} elevated>
                <p className="text-sm text-heading leading-relaxed">{item.post.content}</p>
                {item.post.tags && item.post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.post.tags.map((tag: string) => (
                      <span key={tag} className="text-xs text-accent">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-placeholder">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Heart size={12} /> {item.post.likesCount}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} /> {item.post.commentsCount}</span>
                  </div>
                  <span>{timeAgo(item.post.createdAt)}</span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
