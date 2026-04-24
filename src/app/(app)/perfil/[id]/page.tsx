import { ChevronLeft, MapPin, Link2, Briefcase, GraduationCap, Heart, MessageCircle, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, Badge, Button, Card } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getProfileById } from "@/lib/actions/profile-actions";
import { getSession } from "@/lib/auth";
import type { FullProfile, FeedPost, UserExperiencia, UserEscolaridade } from "@/lib/types";
import { ProfileActions } from "./profile-actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicPerfilPage({ params }: Props) {
  const { id } = await params;
  const session = await getSession();
  const currentUserId = session?.userId ?? "";

  const profileResult = await getProfileById(id);

  if (!profileResult.success || !profileResult.data) {
    return (
      <EmptyState
        icon={UserIcon}
        title="Perfil nao encontrado"
        description="Este perfil nao existe ou foi removido."
      />
    );
  }

  // Don't show public profile for own account — redirect to /perfil
  if (id === currentUserId) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-body text-center py-8">
          Este e o seu perfil.{" "}
          <Link href="/perfil" className="text-accent hover:underline">
            Ver meu perfil
          </Link>
        </p>
      </div>
    );
  }

  const data: FullProfile = profileResult.data;
  const location = [data.profile.cidade, data.profile.estado]
    .filter(Boolean)
    .join(", ");
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
      {/* Back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/conexoes"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong"
        >
          <ChevronLeft size={16} className="text-body" />
        </Link>
        <h1 className="text-xl font-bold text-heading">Perfil</h1>
      </div>

      {/* Header card */}
      <Card elevated>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            <Avatar
              name={data.user.name}
              src={data.user.avatarUrl}
              size="xl"
              shape={data.user.tipo === "empresa" ? "square" : "circle"}
            />
            <div className="flex flex-col gap-1.5 pt-1">
              <h2 className="text-2xl font-bold text-heading">{data.user.name}</h2>
              {data.profissoes.length > 0 && (
                <p className="text-sm text-body">
                  {data.profissoes.map((p) => p.profissao).join(" · ")}
                </p>
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

          {/* Follow + Message actions (client component) */}
          <ProfileActions targetUserId={id} />
        </div>

        {data.profile.bio && (
          <p className="mt-4 text-sm text-body leading-relaxed">{data.profile.bio}</p>
        )}
      </Card>

      {/* 2-column layout */}
      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex w-[320px] shrink-0 flex-col gap-4">
          {(data.areas.length > 0 || data.atuacoes.length > 0) && (
            <Card elevated>
              <h3 className="text-sm font-semibold text-heading mb-3">Interesses e Atuacao</h3>
              {data.areas.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Interesses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.areas.map((a: string) => (
                      <Badge key={a} variant="interest">{a}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.atuacoes.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Atuacao</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.atuacoes.map((a: string) => (
                      <Badge key={a} variant="expertise">{a}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.objetivos.length > 0 && (
                <div>
                  <p className="text-[11px] font-medium text-placeholder mb-1.5 uppercase tracking-wide">Objetivos</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.objetivos.map((o: string) => (
                      <Badge key={o} variant="default">{o}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

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
                      <p className="text-[11px] text-placeholder">
                        {exp.periodoInicio}{exp.periodoFim ? ` — ${exp.periodoFim}` : " — Atual"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {isPF && data.escolaridade.length > 0 && (
            <Card elevated>
              <h3 className="text-sm font-semibold text-heading mb-3">Formacao</h3>
              <div className="flex flex-col gap-3">
                {data.escolaridade.map((esc: UserEscolaridade) => (
                  <div key={esc.id} className="flex items-start gap-2.5">
                    <Briefcase size={14} className="text-placeholder mt-0.5 shrink-0" />
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

        {/* Right column — posts placeholder */}
        <div className="flex-1 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-heading">Publicacoes</h3>
          <Card elevated>
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <p className="text-sm text-placeholder">Publicacoes publicas apareceram aqui</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
