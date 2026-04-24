"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, User, LogOut, Users, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, Badge, Button, Card } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getMyLeagues, deleteLeague, leaveLeague } from "@/lib/actions/league-actions";
import { openWaitlist } from "@/lib/waitlist";
import type { LeagueListItem } from "@/lib/types";

export default function LigasPage() {
  const router = useRouter();
  const [leagues, setLeagues] = useState<LeagueListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadLeagues = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMyLeagues();
      if (result.success && result.data) {
        setLeagues(result.data);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeagues();
  }, [loadLeagues]);

  const fundadas = leagues.filter((item) => item.role === "fundador");
  const associadas = leagues.filter((item) => item.role !== "fundador");

  async function handleDelete(leagueId: string, _nome: string) {
    setActionLoading(leagueId);
    const result = await deleteLeague(leagueId);
    setActionLoading(null);
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    }
  }

  async function handleLeave(leagueId: string, _nome: string) {
    setActionLoading(leagueId);
    const result = await leaveLeague(leagueId);
    setActionLoading(null);
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    }
  }

  function handleEdit(leagueId: string) {
    router.push(`/editar-liga/${leagueId}`);
  }

  const formatDate = (d: string) => {
    const date = new Date(d);
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  function LeagueCard({ liga, isFundador }: { liga: LeagueListItem; isFundador: boolean }) {
    const isActioning = actionLoading === liga.league.id;

    return (
      <Card elevated>
        <div className="flex items-start gap-4">
          <Avatar name={liga.league.nome} src={liga.league.fotoUrl} size="md" shape="square" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-heading truncate">{liga.league.nome}</h3>
              {isFundador && (
                <span className="flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-medium text-accent">
                  <Crown size={10} /> Fundador
                </span>
              )}
            </div>
            <p className="text-xs text-body mt-0.5">
              {liga.membrosCount} {liga.membrosCount === 1 ? "membro" : "membros"} · {liga.league.visibilidade === "publica" ? "Publica" : "Privada"} · Desde {formatDate(liga.league.createdAt)}
            </p>
            {liga.league.descricao && (
              <p className="text-xs text-placeholder mt-1.5 line-clamp-2">{liga.league.descricao}</p>
            )}
            {(liga.areas.length > 0 || liga.atuacoes.length > 0) && (
              <div className="flex flex-wrap gap-1 mt-2">
                {liga.areas.map((a: string) => <Badge key={a} variant="interest">{a}</Badge>)}
                {liga.atuacoes.map((a: string) => <Badge key={a} variant="expertise">{a}</Badge>)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isActioning ? (
              <Loader2 size={15} className="text-placeholder animate-spin" />
            ) : isFundador ? (
              <>
                <button
                  onClick={() => handleEdit(liga.league.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-placeholder hover:text-accent transition-colors"
                  title="Editar"
                >
                  <Pencil size={15} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleDelete(liga.league.id, liga.league.nome)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-placeholder hover:text-error transition-colors"
                  title="Deletar"
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-placeholder hover:text-accent transition-colors" title="Ver membros">
                  <User size={15} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleLeave(liga.league.id, liga.league.nome)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-placeholder hover:text-error transition-colors"
                  title="Sair da liga"
                >
                  <LogOut size={15} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  }

  const totalLigas = fundadas.length + associadas.length;

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Ligas</h1>
        </div>
        <p className="text-center text-sm text-placeholder py-8">Carregando ligas...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">Ligas</h1>
          <p className="text-sm text-body">{totalLigas} {totalLigas === 1 ? "liga" : "ligas"}</p>
        </div>
        <Link href="/criar-liga">
          <Button size="sm"><Plus size={16} /> Criar Liga</Button>
        </Link>
      </div>

      {totalLigas === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhuma liga ainda"
          description="Crie ou participe de ligas para conectar com comunidades."
        />
      ) : (
        <>
          {/* Fundadas */}
          <div>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-heading">
                Ligas fundadas por voce ({fundadas.length}/5)
              </h2>
              <p className="text-sm text-body mt-0.5">Ligas que voce criou e administra</p>
            </div>
            {fundadas.length > 0 ? (
              <div className="flex flex-col gap-3">
                {fundadas.map((liga) => (
                  <LeagueCard key={liga.league.id} liga={liga} isFundador />
                ))}
              </div>
            ) : (
              <p className="text-sm text-placeholder py-4 text-center">Voce ainda nao fundou nenhuma liga.</p>
            )}
          </div>

          <div className="h-px bg-border/40" />

          {/* Associadas */}
          <div>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-heading">
                Ligas associadas ({associadas.length}/10)
              </h2>
              <p className="text-sm text-body mt-0.5">Ligas das quais voce participa</p>
            </div>
            {associadas.length > 0 ? (
              <div className="flex flex-col gap-3">
                {associadas.map((liga) => (
                  <LeagueCard key={liga.league.id} liga={liga} isFundador={false} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-placeholder py-4 text-center">Voce ainda nao participa de nenhuma liga.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
