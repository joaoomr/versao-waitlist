"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { ConnectionRow } from "@/components/ui/connection-row";
import { SearchableTagList } from "@/components/ui";
import { searchProfiles, searchLeagues } from "@/lib/actions/search-actions";
import { AREAS_INTERESSE, AREAS_ATUACAO } from "@/lib/constants";
import type { SearchProfileResult, SearchLeagueResult } from "@/lib/types";

const ESTADOS_CIDADES = [
  "Sao Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR",
  "Porto Alegre, RS", "Salvador, BA", "Recife, PE", "Goiania, GO", "Brasilia, DF",
  "Florianopolis, SC", "Fortaleza, CE", "Manaus, AM", "Campinas, SP", "Santos, SP",
  "Niteroi, RJ", "Uberlandia, MG", "Joinville, SC", "Londrina, PR", "Vitoria, ES",
  "SP", "RJ", "MG", "PR", "SC", "RS", "BA", "PE", "GO", "DF", "CE", "AM", "ES",
] as const;

const INTENCOES = ["Oportunidades de trabalho", "Contratar colaboradores", "Fazer novas conexoes"] as const;

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"perfis" | "ligas">("perfis");
  const [profileResults, setProfileResults] = useState<SearchProfileResult[]>([]);
  const [leagueResults, setLeagueResults] = useState<SearchLeagueResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Multi-select filters
  const [filterLocalizacao, setFilterLocalizacao] = useState<string[]>([]);
  const [filterAreas, setFilterAreas] = useState<string[]>([]);
  const [filterAtuacao, setFilterAtuacao] = useState<string[]>([]);
  const [filterIntencao, setFilterIntencao] = useState<string[]>([]);

  const toggleFilter = useCallback((list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }, []);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      if (tab === "perfis") {
        const result = await searchProfiles({
          q: query,
          estado: filterLocalizacao[0] || undefined,
          area: filterAreas[0] || undefined,
          atuacao: filterAtuacao[0] || undefined,
          objetivo: filterIntencao.length > 0
            ? (filterIntencao[0] === "Oportunidades de trabalho" ? "oportunidades"
              : filterIntencao[0] === "Contratar colaboradores" ? "contratar"
              : "conexoes") as "oportunidades" | "contratar" | "conexoes"
            : undefined,
        });
        if (result.success && result.data) {
          setProfileResults(result.data.items);
        }
      } else {
        const result = await searchLeagues({
          q: query,
          area: filterAreas[0] || undefined,
        });
        if (result.success && result.data) {
          setLeagueResults(result.data.items);
        }
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  const hasFilters = filterLocalizacao.length > 0 || filterAreas.length > 0 || filterAtuacao.length > 0 || filterIntencao.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-heading">Buscar</h1>

      <form onSubmit={handleSearch}>
        <div className="flex h-12 items-center gap-2.5 rounded-xl border border-border bg-bg-card-alt px-4">
          <Search size={20} className="text-placeholder" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar perfis, empresas ou ligas..."
            className="flex-1 bg-transparent text-[15px] text-heading placeholder:text-placeholder focus:outline-none"
          />
        </div>
      </form>

      {/* Filtros multi-select */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SearchableTagList
            label="Localizacao"
            options={ESTADOS_CIDADES}
            selected={filterLocalizacao}
            onToggle={(item) => toggleFilter(filterLocalizacao, setFilterLocalizacao, item)}
            placeholder="Cidade ou estado..."
            badgeVariant="default"
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
              setFilterLocalizacao([]);
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

      {/* Tabs */}
      <div className="flex">
        <button
          onClick={() => { setTab("perfis"); setSearched(false); }}
          className={`flex-1 border-b-2 py-2.5 text-center text-sm font-semibold transition-colors ${
            tab === "perfis" ? "border-primary text-accent" : "border-border text-placeholder"
          }`}
        >
          Perfis
        </button>
        <button
          onClick={() => { setTab("ligas"); setSearched(false); }}
          className={`flex-1 border-b-2 py-2.5 text-center text-sm font-semibold transition-colors ${
            tab === "ligas" ? "border-primary text-accent" : "border-border text-placeholder"
          }`}
        >
          Ligas
        </button>
      </div>

      {/* Resultados */}
      {loading ? (
        <p className="text-center text-sm text-placeholder py-8">Buscando...</p>
      ) : !searched ? (
        <p className="text-center text-sm text-placeholder py-8">Digite algo para buscar</p>
      ) : tab === "perfis" ? (
        profileResults.length === 0 ? (
          <p className="text-center text-sm text-placeholder py-8">Nenhum perfil encontrado</p>
        ) : (
          <div className="flex flex-col gap-3">
            {profileResults.map((r) => (
              <ConnectionRow
                key={r.userId}
                name={r.name}
                subtitle={r.subtitle}
                avatarShape={r.tipo === "empresa" ? "square" : undefined}
              />
            ))}
          </div>
        )
      ) : leagueResults.length === 0 ? (
        <p className="text-center text-sm text-placeholder py-8">Nenhuma liga encontrada</p>
      ) : (
        <div className="flex flex-col gap-3">
          {leagueResults.map((r) => (
            <ConnectionRow
              key={r.leagueId}
              name={r.nome}
              subtitle={r.subtitle}
              avatarShape="square"
            />
          ))}
        </div>
      )}
    </div>
  );
}
