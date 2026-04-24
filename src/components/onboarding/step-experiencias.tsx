"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui";
import { ESCOLARIDADE_OPTIONS } from "@/lib/constants";

interface ExperienciaItem {
  cargo: string;
  empresa: string;
  periodoInicio: string;
  periodoFim: string;
}

interface EscolaridadeItem {
  nivel: string;
  instituicao: string;
  curso: string;
}

interface ExperienciasData {
  experiencias: ExperienciaItem[];
  escolaridade: EscolaridadeItem[];
}

interface StepExperienciasProps {
  data: ExperienciasData;
  onChange: (data: ExperienciasData) => void;
}

export function StepExperiencias({ data, onChange }: StepExperienciasProps) {
  // Form state for adding new items
  const [newExp, setNewExp] = useState<ExperienciaItem>({ cargo: "", empresa: "", periodoInicio: "", periodoFim: "" });
  const [newEsc, setNewEsc] = useState<EscolaridadeItem>({ nivel: "", instituicao: "", curso: "" });

  function addExperiencia() {
    if (!newExp.cargo || !newExp.empresa || !newExp.periodoInicio) return;
    onChange({
      ...data,
      experiencias: [...data.experiencias, { ...newExp }],
    });
    setNewExp({ cargo: "", empresa: "", periodoInicio: "", periodoFim: "" });
  }

  function removeExperiencia(index: number) {
    onChange({
      ...data,
      experiencias: data.experiencias.filter((_, i) => i !== index),
    });
  }

  function addEscolaridade() {
    if (!newEsc.nivel) return;
    onChange({
      ...data,
      escolaridade: [...data.escolaridade, { ...newEsc }],
    });
    setNewEsc({ nivel: "", instituicao: "", curso: "" });
  }

  function removeEscolaridade(index: number) {
    onChange({
      ...data,
      escolaridade: data.escolaridade.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Experiencia Profissional */}
      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <div>
          <h3 className="text-lg font-semibold text-heading">Experiencia Profissional</h3>
          <p className="text-sm text-body">Adicione suas experiencias de trabalho.</p>
        </div>

        {/* Added items */}
        {data.experiencias.map((exp, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-border/8 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-heading">{exp.cargo}</p>
              <p className="text-xs text-body">{exp.empresa} — {exp.periodoInicio}{exp.periodoFim ? ` a ${exp.periodoFim}` : " a Atual"}</p>
            </div>
            <button onClick={() => removeExperiencia(i)} className="text-placeholder hover:text-error transition-colors">
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        ))}

        {/* Add new form */}
        <div className="h-px bg-border/60" />
        <p className="text-sm font-medium text-body">Adicionar nova experiencia:</p>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input label="Cargo" placeholder="Ex: Product Designer" value={newExp.cargo} onChange={(e) => setNewExp({ ...newExp, cargo: e.target.value })} />
          </div>
          <div className="flex-1">
            <Input label="Empresa" placeholder="Ex: Nubank" value={newExp.empresa} onChange={(e) => setNewExp({ ...newExp, empresa: e.target.value })} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input label="Inicio" placeholder="2020" value={newExp.periodoInicio} onChange={(e) => setNewExp({ ...newExp, periodoInicio: e.target.value })} />
          </div>
          <div className="flex-1">
            <Input label="Fim" placeholder="Atual" value={newExp.periodoFim} onChange={(e) => setNewExp({ ...newExp, periodoFim: e.target.value })} />
          </div>
        </div>
        <button
          onClick={addExperiencia}
          disabled={!newExp.cargo || !newExp.empresa || !newExp.periodoInicio}
          className="flex items-center gap-2 py-1 text-sm font-medium text-accent disabled:text-placeholder disabled:cursor-not-allowed"
        >
          <PlusCircle size={16} strokeWidth={1.5} />
          Adicionar experiencia
        </button>
      </div>

      {/* Experiencia Academica */}
      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <div>
          <h3 className="text-lg font-semibold text-heading">Experiencia Academica</h3>
          <p className="text-sm text-body">Adicione sua formacao.</p>
        </div>

        {/* Added items */}
        {data.escolaridade.map((esc, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-border/8 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-heading">
                {ESCOLARIDADE_OPTIONS.find((o) => o.value === esc.nivel)?.label ?? esc.nivel}
              </p>
              <p className="text-xs text-body">
                {[esc.instituicao, esc.curso].filter(Boolean).join(" — ") || "Sem detalhes"}
              </p>
            </div>
            <button onClick={() => removeEscolaridade(i)} className="text-placeholder hover:text-error transition-colors">
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        ))}

        {/* Add new form */}
        <div className="h-px bg-border/60" />
        <p className="text-sm font-medium text-body">Adicionar nova formacao:</p>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-label">Escolaridade</label>
          <select
            value={newEsc.nivel}
            onChange={(e) => setNewEsc({ ...newEsc, nivel: e.target.value })}
            className="h-11 w-full rounded-[var(--radius-input)] border border-border bg-bg-card-alt px-3.5 text-sm text-heading focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none"
          >
            <option value="" className="text-placeholder">Selecione...</option>
            {ESCOLARIDADE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input label="Instituicao" placeholder="Ex: USP" value={newEsc.instituicao} onChange={(e) => setNewEsc({ ...newEsc, instituicao: e.target.value })} />
          </div>
          <div className="flex-1">
            <Input label="Curso" placeholder="Ex: Ciencia da Computacao" value={newEsc.curso} onChange={(e) => setNewEsc({ ...newEsc, curso: e.target.value })} />
          </div>
        </div>
        <button
          onClick={addEscolaridade}
          disabled={!newEsc.nivel}
          className="flex items-center gap-2 py-1 text-sm font-medium text-accent disabled:text-placeholder disabled:cursor-not-allowed"
        >
          <PlusCircle size={16} strokeWidth={1.5} />
          Adicionar formacao
        </button>
      </div>
    </div>
  );
}
