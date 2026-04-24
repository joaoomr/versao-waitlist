"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, User, MessageSquare, UserMinus } from "lucide-react";
import { Avatar, SearchableTagList } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getConnections, removeConnection } from "@/lib/actions/connection-actions";
import { getOrCreateConversation } from "@/lib/actions/chat-actions";
import { openWaitlist } from "@/lib/waitlist";
import { AREAS_INTERESSE, AREAS_ATUACAO } from "@/lib/constants";
import type { ConnectionItem } from "@/lib/types";

const TIPOS = ["Pessoa Fisica", "Empresa"] as const;
const LOCALIZACOES = [
  "Sao Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR",
  "Porto Alegre, RS", "Salvador, BA", "Recife, PE", "Brasilia, DF",
  "SP", "RJ", "MG", "PR", "SC", "RS", "BA", "PE", "GO", "DF",
] as const;

export default function ConexoesPage() {
  const router = useRouter();
  const [connections, setConnections] = useState<ConnectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filtros
  const [filterTipo, setFilterTipo] = useState<string[]>([]);
  const [filterLocal, setFilterLocal] = useState<string[]>([]);
  const [filterAreas, setFilterAreas] = useState<string[]>([]);

  const toggleFilter = useCallback((list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }, []);

  const hasFilters = filterTipo.length > 0 || filterLocal.length > 0 || filterAreas.length > 0;
  const filterCount = filterTipo.length + filterLocal.length + filterAreas.length;

  const loadConnections = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getConnections({ q: searchQuery });
      if (result.success && result.data) {
        setConnections(result.data.items);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  async function handleRemoveConnection(connectionId: string) {
    const result = await removeConnection(connectionId);
    if (!result.success && result.error === "WAITLIST") {
      openWaitlist();
    } else if (result.success) {
      setConnections((prev) => prev.filter((c) => c.connectionId !== connectionId));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-heading">Conexoes</h1>
        <p className="text-sm text-body">
          {connections.length} {connections.length === 1 ? "conexao" : "conexoes"} realizadas
        </p>
      </div>

      {/* Busca */}
      <div className="flex h-11 items-center gap-2 rounded-[var(--radius-input)] border border-border bg-bg-card-alt px-3.5">
        <Search size={16} className="text-placeholder" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nome..."
          className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
        />
      </div>

      {/* Filtros toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors ${
          hasFilters ? "border-primary/30 bg-primary/5 text-accent" : "border-border text-body hover:border-border-strong"
        }`}
      >
        <span>Filtros{filterCount > 0 && ` (${filterCount} selecionados)`}</span>
        <Search size={14} className="text-placeholder" />
      </button>

      {showFilters && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
          </div>
          {hasFilters && (
            <button
              onClick={() => { setFilterTipo([]); setFilterLocal([]); setFilterAreas([]); }}
              className="self-start text-xs text-placeholder hover:text-accent transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <p className="text-center text-sm text-placeholder py-8">Carregando conexoes...</p>
      ) : connections.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhuma conexao ainda"
          description="Explore perfis e faca novas conexoes. Quando duas pessoas se curtem mutuamente, uma conexao e criada automaticamente."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {connections.map((conn) => (
            <div
              key={conn.connectionId}
              className="flex items-center gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-4 transition-colors hover:border-border-strong"
            >
              {/* Avatar */}
              <Avatar
                name={conn.user.name}
                size="md"
                shape={conn.user.tipo === "empresa" ? "square" : "circle"}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-heading truncate">{conn.user.name}</p>
                <p className="text-xs text-body truncate">{conn.user.subtitle}</p>
                {/* Localizacao e areas serao adicionadas com backend real */}
              </div>

              {/* Acoes */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => router.push(`/perfil/${conn.user.id}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-body hover:text-accent hover:border-primary/30 transition-colors"
                  title="Ver perfil"
                >
                  <User size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={async () => {
                    const result = await getOrCreateConversation(conn.user.id);
                    if (!result.success && result.error === "WAITLIST") {
                      openWaitlist();
                    } else if (result.success && result.data) {
                      router.push(`/chat?conv=${result.data.conversationId}`);
                    }
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-body hover:text-accent hover:border-primary/30 transition-colors"
                  title="Enviar mensagem"
                >
                  <MessageSquare size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleRemoveConnection(conn.connectionId)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-body hover:text-error hover:border-error/30 transition-colors"
                  title="Desfazer conexao"
                >
                  <UserMinus size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
