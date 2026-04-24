"use client";

import { useState, useEffect, useCallback } from "react";
import { SwipeCard } from "@/components/explore/swipe-card";
import { ActionButtons } from "@/components/explore/action-buttons";
import { EmptyState, SearchableTagList } from "@/components/ui";
import { Compass, ChevronDown, ChevronUp } from "lucide-react";
import { getExploreProfiles } from "@/lib/actions/explore-actions";
import { recordSwipe } from "@/lib/actions/explore-actions";
import { openWaitlist } from "@/lib/waitlist";
import { AREAS_INTERESSE, AREAS_ATUACAO } from "@/lib/constants";
import type { ExploreProfile } from "@/lib/types";

const TIPOS = ["Pessoa Fisica", "Empresa"] as const;
const LOCALIZACOES = [
  "Sao Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR",
  "Porto Alegre, RS", "Salvador, BA", "Recife, PE", "Brasilia, DF",
  "SP", "RJ", "MG", "PR", "SC", "RS", "BA", "PE", "GO", "DF",
] as const;
const INTENCOES = ["Oportunidades de trabalho", "Contratar colaboradores", "Fazer novas conexoes"] as const;

export default function ExplorarPage() {
  const [profiles, setProfiles] = useState<ExploreProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchMessage, setMatchMessage] = useState("");
  const [followed, setFollowed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Multi-select filters
  const [filterTipo, setFilterTipo] = useState<string[]>([]);
  const [filterLocal, setFilterLocal] = useState<string[]>([]);
  const [filterAreas, setFilterAreas] = useState<string[]>([]);
  const [filterAtuacao, setFilterAtuacao] = useState<string[]>([]);
  const [filterIntencao, setFilterIntencao] = useState<string[]>([]);

  const toggleFilter = useCallback((list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }, []);

  const hasFilters = filterTipo.length > 0 || filterLocal.length > 0 || filterAreas.length > 0 || filterAtuacao.length > 0 || filterIntencao.length > 0;
  const filterCount = filterTipo.length + filterLocal.length + filterAreas.length + filterAtuacao.length + filterIntencao.length;

  const loadProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getExploreProfiles({});
      if (result.success && result.data) {
        setProfiles(result.data);
        setCurrentIndex(0);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const currentProfile = profiles[currentIndex];

  async function handleSwipe(action: "passa" | "curtir") {
    if (!currentProfile) return;

    const result = await recordSwipe({ targetId: currentProfile.userId, action });
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
      return;
    }

    setFollowed(false);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setProfiles([]);
    }
  }

  async function handleFollow() {
    if (!currentProfile || followed) return;
    const result = await recordSwipe({ targetId: currentProfile.userId, action: "seguir" });
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    } else {
      setFollowed(true);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-heading w-full">Explorar</h1>
        <p className="text-sm text-placeholder py-12">Carregando perfis...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Explorar</h1>
        {profiles.length > 0 && (
          <span className="text-sm text-placeholder">
            {currentIndex + 1} de {profiles.length} perfis
          </span>
        )}
      </div>

      {/* Filtros toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors ${
          hasFilters ? "border-primary/30 bg-primary/5 text-accent" : "border-border text-body hover:border-border-strong"
        }`}
      >
        <span>
          Filtros{filterCount > 0 && ` (${filterCount} selecionados)`}
        </span>
        {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showFilters && (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-bg-card p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SearchableTagList
              label="Tipo"
              options={TIPOS}
              selected={filterTipo}
              onToggle={(item) => toggleFilter(filterTipo, setFilterTipo, item)}
              placeholder="Pessoa ou empresa..."
            />
            <SearchableTagList
              label="Localizacao"
              options={LOCALIZACOES}
              selected={filterLocal}
              onToggle={(item) => toggleFilter(filterLocal, setFilterLocal, item)}
              placeholder="Cidade ou estado..."
            />
            <SearchableTagList
              label="Areas de interesse"
              options={AREAS_INTERESSE}
              selected={filterAreas}
              onToggle={(item) => toggleFilter(filterAreas, setFilterAreas, item)}
              placeholder="Buscar areas..."
              badgeVariant="interest"
            />
            <SearchableTagList
              label="Areas de atuacao"
              options={AREAS_ATUACAO}
              selected={filterAtuacao}
              onToggle={(item) => toggleFilter(filterAtuacao, setFilterAtuacao, item)}
              placeholder="Buscar atuacoes..."
              badgeVariant="expertise"
            />
            <SearchableTagList
              label="Intencao"
              options={INTENCOES}
              selected={filterIntencao}
              onToggle={(item) => toggleFilter(filterIntencao, setFilterIntencao, item)}
              placeholder="Buscar intencao..."
              badgeVariant="objective"
            />
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                setFilterTipo([]);
                setFilterLocal([]);
                setFilterAreas([]);
                setFilterAtuacao([]);
                setFilterIntencao([]);
              }}
              className="self-start text-xs text-placeholder hover:text-accent transition-colors"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>
      )}

      {matchMessage && (
        <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success text-center w-full">
          {matchMessage}
        </div>
      )}

      {!currentProfile ? (
        <EmptyState
          icon={Compass}
          title="Nenhum perfil disponivel"
          description="Volte mais tarde para descobrir novas conexoes."
        />
      ) : (
        <>
          <SwipeCard
            name={currentProfile.name}
            location={currentProfile.location ?? ""}
            experiences={currentProfile.experiencias}
            interests={currentProfile.areas}
            expertise={currentProfile.atuacoes}
            objectives={currentProfile.objetivos}
          />
          <ActionButtons
            onPass={() => handleSwipe("passa")}
            onFollow={handleFollow}
            onLike={() => handleSwipe("curtir")}
            followed={followed}
          />
        </>
      )}
    </div>
  );
}
