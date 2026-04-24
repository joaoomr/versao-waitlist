"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload } from "lucide-react";
import { Button, Input, Textarea, SearchableTagList } from "@/components/ui";
import { getMyLeagues, updateLeague } from "@/lib/actions/league-actions";
import { AREAS_INTERESSE, AREAS_ATUACAO } from "@/lib/constants";

type Visibilidade = "publica" | "privada";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditarLigaPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [visibilidade, setVisibilidade] = useState<Visibilidade>("publica");
  const [areas, setAreas] = useState<string[]>([]);
  const [atuacoes, setAtuacoes] = useState<string[]>([]);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeague() {
      try {
        const result = await getMyLeagues();
        if (result.success && result.data) {
          const item = result.data.find((l) => l.league.id === id);
          if (item) {
            setNome(item.league.nome);
            setBio(item.league.descricao ?? "");
            setVisibilidade(item.league.visibilidade as Visibilidade);
            setAreas(item.areas);
            setAtuacoes(item.atuacoes);
          } else {
            setError("Liga nao encontrada ou voce nao tem permissao para edita-la");
          }
        }
      } catch {
        setError("Erro ao carregar liga");
      } finally {
        setLoadingData(false);
      }
    }

    loadLeague();
  }, [id]);

  function toggleItem(
    list: string[],
    setList: (v: string[]) => void,
    item: string
  ) {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  async function handleSubmit() {
    if (!nome.trim()) {
      setError("Nome e obrigatorio");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const result = await updateLeague(id, {
        nome: nome.trim(),
        descricao: bio.trim() || undefined,
        visibilidade,
        areas,
        atuacoes,
      });

      if (result.success) {
        router.push("/ligas");
      } else {
        setError(result.error ?? "Erro ao atualizar liga");
      }
    } catch {
      setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link
            href="/ligas"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong"
          >
            <ChevronLeft size={16} className="text-body" />
          </Link>
          <h1 className="text-2xl font-bold text-heading">Editar Liga</h1>
        </div>
        <p className="text-center text-sm text-placeholder py-8">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/ligas"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong"
          >
            <ChevronLeft size={16} className="text-body" />
          </Link>
          <h1 className="text-2xl font-bold text-heading">Editar Liga</h1>
        </div>
        <Button onClick={handleSubmit} disabled={!nome.trim() || loading}>
          {loading ? "Salvando..." : "Salvar alteracoes"}
        </Button>
      </div>

      {error && <p className="text-sm text-error text-center">{error}</p>}

      {/* Perfil da Liga */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <h2 className="text-lg font-semibold text-heading">Perfil da Liga</h2>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024) {
              setFotoFile(f);
            }
          }}
        />

        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 hover:border-primary transition-colors overflow-hidden"
          >
            {fotoFile ? (
              <img
                src={URL.createObjectURL(fotoFile)}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <Upload size={22} className="text-placeholder" strokeWidth={1.5} />
            )}
          </button>
          <span className="text-xs text-placeholder">
            {fotoFile ? fotoFile.name : "Alterar foto da liga"}
          </span>
        </div>

        <Input
          label="Nome da liga"
          placeholder="Ex: Liga Dev SP"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Textarea
          label="Bio da liga"
          placeholder="Descreva o proposito da sua liga..."
          maxChars={500}
          charCount={bio.length}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Visibilidade</label>
          <div className="flex gap-3">
            {(["publica", "privada"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVisibilidade(v)}
                className={`flex flex-1 items-center gap-2.5 rounded-xl px-4 py-3.5 transition-all ${
                  visibilidade === v
                    ? "border-2 border-primary bg-primary/10"
                    : "border border-border"
                }`}
              >
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${
                    visibilidade === v ? "border-primary" : "border-border-strong"
                  }`}
                >
                  {visibilidade === v && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      visibilidade === v ? "font-medium text-heading" : "text-body"
                    }`}
                  >
                    {v === "publica" ? "Publica" : "Privada"}
                  </p>
                  <p className="text-[11px] text-placeholder">
                    {v === "publica"
                      ? "Qualquer pessoa pode entrar"
                      : "Entrada por convite"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interesses e Atuacao */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <h2 className="text-lg font-semibold text-heading">Interesses e Atuacao</h2>

        <SearchableTagList
          label="Areas de interesse"
          options={AREAS_INTERESSE}
          selected={areas}
          onToggle={(item) => toggleItem(areas, setAreas, item)}
          placeholder="Buscar e adicionar areas..."
          badgeVariant="interest"
        />

        <SearchableTagList
          label="Areas de atuacao"
          options={AREAS_ATUACAO}
          selected={atuacoes}
          onToggle={(item) => toggleItem(atuacoes, setAtuacoes, item)}
          placeholder="Buscar e adicionar atuacoes..."
          badgeVariant="expertise"
        />
      </div>
    </div>
  );
}
