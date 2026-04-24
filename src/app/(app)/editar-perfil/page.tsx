"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { ChevronLeft, Upload, PlusCircle, Trash2, Search, Check, X } from "lucide-react";
import { Button, Input, Textarea, Badge } from "@/components/ui";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";
import { getMyProfile, updateProfile, uploadAvatar } from "@/lib/actions/profile-actions";
import { openWaitlist } from "@/lib/waitlist";
import { AREAS_INTERESSE, AREAS_ATUACAO, OBJETIVOS_LABELS, ESCOLARIDADE_OPTIONS } from "@/lib/constants";
import type { Objetivo } from "@/lib/types";

export default function EditarPerfilPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tipo, setTipo] = useState<"pessoa" | "empresa">("pessoa");

  // Profile fields
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [bio, setBio] = useState("");
  const [redeSocial, setRedeSocial] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Sections
  const [areas, setAreas] = useState<string[]>([]);
  const [atuacoes, setAtuacoes] = useState<string[]>([]);
  const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
  const [experiencias, setExperiencias] = useState<Array<{ cargo: string; empresa: string; periodoInicio: string; periodoFim: string }>>([]);
  const [escolaridade, setEscolaridade] = useState<Array<{ nivel: string; instituicao: string; curso: string }>>([]);

  // Search states
  const [searchAreas, setSearchAreas] = useState("");
  const [searchAtuacoes, setSearchAtuacoes] = useState("");

  // New exp form
  const [newExp, setNewExp] = useState({ cargo: "", empresa: "", periodoInicio: "", periodoFim: "" });
  const [newEsc, setNewEsc] = useState({ nivel: "", instituicao: "", curso: "" });

  useEffect(() => {
    async function load() {
      const result = await getMyProfile();
      if (result.success && result.data) {
        const { user, profile, areas: a, atuacoes: at, objetivos: o, experiencias: exp, escolaridade: esc } = result.data;
        setTipo(user.tipo);
        setNome(user.name);
        setAvatarUrl(user.avatarUrl);
        setIdade(profile.idade?.toString() ?? "");
        setBio(profile.bio ?? "");
        setRedeSocial(profile.redeSocial ?? "");
        setSite(profile.site ?? "");
        setLocation([profile.cidade, profile.estado].filter(Boolean).join(", "));
        setAreas(a);
        setAtuacoes(at);
        setObjetivos(o);
        setExperiencias(exp.map((e) => ({
          cargo: e.cargo,
          empresa: e.empresa,
          periodoInicio: e.periodoInicio,
          periodoFim: e.periodoFim ?? "",
        })));
        setEscolaridade(esc.map((e) => ({
          nivel: e.nivel,
          instituicao: e.instituicao ?? "",
          curso: e.curso ?? "",
        })));
      }
      setLoading(false);
    }
    load();
  }, []);

  function toggleItem(list: string[], setList: (v: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function toggleObjetivo(obj: Objetivo) {
    setObjetivos((prev) => prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj]);
  }

  function filteredOptions(options: readonly string[], selected: string[], search: string) {
    if (!search) return [];
    return options.filter((o) => o.toLowerCase().includes(search.toLowerCase()) && !selected.includes(o));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (avatarFile) {
        const fd = new FormData();
        fd.append("file", avatarFile);
        await uploadAvatar(fd);
      }

      const result = await updateProfile({
        nome,
        idade: idade ? parseInt(idade) : null,
        bio,
        redeSocial,
        site,
        areas,
        atuacoes,
        objetivos,
        experiencias: experiencias.map((e) => ({
          ...e,
          periodoFim: e.periodoFim || null,
        })),
        escolaridade: escolaridade.map((e) => ({
          nivel: e.nivel as never,
          instituicao: e.instituicao || null,
          curso: e.curso || null,
        })),
      });

      if (!result.success && result.error === "WAITLIST") {
        openWaitlist();
      } else if (result.success) {
        setSuccess("Perfil salvo com sucesso");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.error ?? "Erro ao salvar");
      }
    } catch {
      setError("Erro inesperado");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-center text-placeholder py-12">Carregando perfil...</p>;

  const isPF = tipo === "pessoa";
  const objetivoKeys: Objetivo[] = ["oportunidades", "contratar", "conexoes"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/perfil" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong">
            <ChevronLeft size={16} className="text-body" />
          </Link>
          <h1 className="text-2xl font-bold text-heading">Editar perfil</h1>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Salvando..." : "Salvar alteracoes"}
        </Button>
      </div>

      {error && <p className="text-sm text-error text-center">{error}</p>}
      {success && <p className="text-sm text-success text-center">{success}</p>}

      {/* Secao 1 — Perfil Base */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <h2 className="text-lg font-semibold text-heading">Secao 1 — Perfil Base</h2>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024) setAvatarFile(f);
        }} />

        <div className="flex flex-col items-center gap-1.5">
          <button onClick={() => fileRef.current?.click()}
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary/40 hover:border-primary transition-colors overflow-hidden">
            {avatarFile ? (
              <img src={URL.createObjectURL(avatarFile)} alt="" className="h-full w-full object-cover" />
            ) : avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <Upload size={22} className="text-placeholder" strokeWidth={1.5} />
            )}
          </button>
          <span className="text-[15px] font-semibold text-heading">{nome}</span>
          <span className="text-xs text-placeholder">Alterar foto</span>
        </div>

        <div className="flex gap-4">
          <div className="flex-[2]">
            <Input label="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="flex-1">
            <Input label={isPF ? "Idade" : "Tempo existencia"} value={idade} onChange={(e) => setIdade(e.target.value)} />
          </div>
        </div>

        <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} maxChars={500} charCount={bio.length} />

        <div className="flex gap-4">
          <div className="flex-1"><Input label="Rede social" value={redeSocial} onChange={(e) => setRedeSocial(e.target.value)} /></div>
          <div className="flex-1"><Input label="Site / Portfolio" value={site} onChange={(e) => setSite(e.target.value)} /></div>
        </div>

        <LocationAutocomplete label="Localizacao" value={location} onChange={(v) => setLocation(v ?? "")} />
      </div>

      {/* Secao 2 — Experiencias (PF only) */}
      {isPF && (
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
          <h2 className="text-lg font-semibold text-heading">Secao 2 — Experiencias</h2>

          {/* Experiencia Profissional */}
          <div className="mb-1">
            <h3 className="text-[15px] font-semibold text-heading">Experiencia Profissional</h3>
            <p className="text-xs text-body mt-0.5">Adicione suas experiencias de trabalho.</p>
          </div>

          {experiencias.map((exp, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-border/8 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-heading">{exp.cargo}</p>
                <p className="text-xs text-body">{exp.empresa} — {exp.periodoInicio}{exp.periodoFim ? ` a ${exp.periodoFim}` : " — Atual"}</p>
              </div>
              <button onClick={() => setExperiencias((prev) => prev.filter((_, idx) => idx !== i))} className="text-placeholder hover:text-error">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <div className="flex gap-3">
            <div className="flex-1"><Input label="Cargo" value={newExp.cargo} onChange={(e) => setNewExp({ ...newExp, cargo: e.target.value })} /></div>
            <div className="flex-1"><Input label="Empresa" value={newExp.empresa} onChange={(e) => setNewExp({ ...newExp, empresa: e.target.value })} /></div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1"><Input label="Inicio" value={newExp.periodoInicio} onChange={(e) => setNewExp({ ...newExp, periodoInicio: e.target.value })} /></div>
            <div className="flex-1"><Input label="Fim" placeholder="Atual" value={newExp.periodoFim} onChange={(e) => setNewExp({ ...newExp, periodoFim: e.target.value })} /></div>
          </div>
          <button onClick={() => {
            if (newExp.cargo && newExp.empresa && newExp.periodoInicio) {
              setExperiencias((prev) => [...prev, { ...newExp }]);
              setNewExp({ cargo: "", empresa: "", periodoInicio: "", periodoFim: "" });
            }
          }} disabled={!newExp.cargo || !newExp.empresa} className="flex items-center gap-2 text-sm font-medium text-accent disabled:text-placeholder">
            <PlusCircle size={16} /> Adicionar experiencia
          </button>

          <div className="h-px bg-border/60 my-2" />

          {/* Experiencia Academica */}
          <div className="mb-1">
            <h3 className="text-[15px] font-semibold text-heading">Experiencia Academica</h3>
            <p className="text-xs text-body mt-0.5">Adicione sua formacao.</p>
          </div>

          {escolaridade.map((esc, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-border/8 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-heading">{ESCOLARIDADE_OPTIONS.find((o) => o.value === esc.nivel)?.label ?? esc.nivel}</p>
                <p className="text-xs text-body">{[esc.instituicao, esc.curso].filter(Boolean).join(" — ")}</p>
              </div>
              <button onClick={() => setEscolaridade((prev) => prev.filter((_, idx) => idx !== i))} className="text-placeholder hover:text-error">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <select value={newEsc.nivel} onChange={(e) => setNewEsc({ ...newEsc, nivel: e.target.value })}
            className="h-11 w-full rounded-[var(--radius-input)] border border-border bg-bg-card-alt px-3.5 text-sm text-heading focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none">
            <option value="">Selecione escolaridade...</option>
            {ESCOLARIDADE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="flex gap-3">
            <div className="flex-1"><Input label="Instituicao" value={newEsc.instituicao} onChange={(e) => setNewEsc({ ...newEsc, instituicao: e.target.value })} /></div>
            <div className="flex-1"><Input label="Curso" value={newEsc.curso} onChange={(e) => setNewEsc({ ...newEsc, curso: e.target.value })} /></div>
          </div>
          <button onClick={() => {
            if (newEsc.nivel) {
              setEscolaridade((prev) => [...prev, { ...newEsc }]);
              setNewEsc({ nivel: "", instituicao: "", curso: "" });
            }
          }} disabled={!newEsc.nivel} className="flex items-center gap-2 text-sm font-medium text-accent disabled:text-placeholder">
            <PlusCircle size={16} /> Adicionar formacao
          </button>
        </div>
      )}

      {/* Secao 3 (PF) / Secao 2 (PJ) — Interesses e Atuacao */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <h2 className="text-lg font-semibold text-heading">{isPF ? "Secao 3" : "Secao 2"} — Interesses e Atuacao</h2>

        {/* Areas de interesse */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Areas de interesse</label>
          <div className="relative">
            <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg-card-alt px-3">
              <Search size={14} className="text-placeholder" />
              <input type="text" className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
                placeholder="Buscar e adicionar areas..." value={searchAreas} onChange={(e) => setSearchAreas(e.target.value)} />
              {searchAreas && <button onClick={() => setSearchAreas("")}><X size={14} className="text-placeholder" /></button>}
            </div>
            {filteredOptions(AREAS_INTERESSE, areas, searchAreas).length > 0 && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-card shadow-lg">
                {filteredOptions(AREAS_INTERESSE, areas, searchAreas).map((item) => (
                  <button key={item} onClick={() => { toggleItem(areas, setAreas, item); setSearchAreas(""); }}
                    className="flex w-full items-center px-3 py-2 text-sm text-body hover:bg-primary/10 text-left">{item}</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {areas.map((a) => <Badge key={a} variant="interest" removable onRemove={() => toggleItem(areas, setAreas, a)}>{a}</Badge>)}
          </div>
        </div>

        {/* Areas de atuacao */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Areas de atuacao</label>
          <div className="relative">
            <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg-card-alt px-3">
              <Search size={14} className="text-placeholder" />
              <input type="text" className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
                placeholder="Buscar e adicionar atuacoes..." value={searchAtuacoes} onChange={(e) => setSearchAtuacoes(e.target.value)} />
              {searchAtuacoes && <button onClick={() => setSearchAtuacoes("")}><X size={14} className="text-placeholder" /></button>}
            </div>
            {filteredOptions(AREAS_ATUACAO, atuacoes, searchAtuacoes).length > 0 && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-card shadow-lg">
                {filteredOptions(AREAS_ATUACAO, atuacoes, searchAtuacoes).map((item) => (
                  <button key={item} onClick={() => { toggleItem(atuacoes, setAtuacoes, item); setSearchAtuacoes(""); }}
                    className="flex w-full items-center px-3 py-2 text-sm text-body hover:bg-primary/10 text-left">{item}</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {atuacoes.map((a) => <Badge key={a} variant="expertise" removable onRemove={() => toggleItem(atuacoes, setAtuacoes, a)}>{a}</Badge>)}
          </div>
        </div>

        {/* Objetivos */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Objetivos na Soci</label>
          <div className="flex flex-col gap-2">
            {objetivoKeys.map((key) => {
              const isSelected = objetivos.includes(key);
              return (
                <button key={key} onClick={() => toggleObjetivo(key)}
                  className={`flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5 text-left transition-all ${
                    isSelected ? "border border-primary bg-primary/10" : "border border-border"
                  }`}>
                  <div className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 ${
                    isSelected ? "border-primary bg-primary" : "border-border-strong"
                  }`}>
                    {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm ${isSelected ? "font-medium text-heading" : "text-body"}`}>
                    {OBJETIVOS_LABELS[key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
