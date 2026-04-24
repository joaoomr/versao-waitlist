"use client";

import { useState } from "react";
import { Search, Check, X } from "lucide-react";
import { Badge } from "@/components/ui";
import { AREAS_INTERESSE, AREAS_ATUACAO, OBJETIVOS_LABELS } from "@/lib/constants";
import type { Objetivo } from "@/lib/types";

interface AreasData {
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
}

interface StepAreasProps {
  data: AreasData;
  onChange: (data: AreasData) => void;
}

function SearchableTagList({
  label,
  description,
  options,
  selected,
  onToggle,
  variant,
}: {
  label: string;
  description: string;
  options: readonly string[];
  selected: string[];
  onToggle: (item: string) => void;
  variant: "interest" | "expertise";
}) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? options.filter(
        (o) =>
          o.toLowerCase().includes(search.toLowerCase()) && !selected.includes(o)
      )
    : [];

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
      <div>
        <h3 className="text-lg font-semibold text-heading">{label}</h3>
        <p className="text-sm text-body">{description}</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg-card-alt px-3">
          <Search size={14} className="text-placeholder" />
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
            placeholder={`Buscar ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-placeholder hover:text-heading">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-border bg-bg-card shadow-lg">
            {filtered.map((item) => (
              <button
                key={item}
                onClick={() => { onToggle(item); setSearch(""); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-body hover:bg-primary/10 hover:text-heading transition-colors text-left"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {search && filtered.length === 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-bg-card px-3 py-2 text-sm text-placeholder shadow-lg">
            Nenhum resultado para "{search}"
          </div>
        )}
      </div>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge
              key={item}
              variant={variant}
              removable
              onRemove={() => onToggle(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      )}

      {/* Quick-add: show first few unselected options */}
      {!search && selected.length < 3 && (
        <div className="flex flex-wrap gap-1.5">
          {options
            .filter((o) => !selected.includes(o))
            .slice(0, 6)
            .map((item) => (
              <button
                key={item}
                onClick={() => onToggle(item)}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-body hover:border-primary/40 hover:text-heading transition-colors"
              >
                + {item}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export function StepAreas({ data, onChange }: StepAreasProps) {
  function toggleArea(item: string) {
    const newAreas = data.areas.includes(item)
      ? data.areas.filter((a) => a !== item)
      : [...data.areas, item];
    onChange({ ...data, areas: newAreas });
  }

  function toggleAtuacao(item: string) {
    const newAtuacoes = data.atuacoes.includes(item)
      ? data.atuacoes.filter((a) => a !== item)
      : [...data.atuacoes, item];
    onChange({ ...data, atuacoes: newAtuacoes });
  }

  function toggleObjetivo(obj: Objetivo) {
    const newObjetivos = data.objetivos.includes(obj)
      ? data.objetivos.filter((o) => o !== obj)
      : [...data.objetivos, obj];
    onChange({ ...data, objetivos: newObjetivos });
  }

  const objetivoKeys: Objetivo[] = ["oportunidades", "contratar", "conexoes"];

  return (
    <div className="flex flex-col gap-6">
      <SearchableTagList
        label="Areas de interesse"
        description="Busque e adicione quantas quiser."
        options={AREAS_INTERESSE}
        selected={data.areas}
        onToggle={toggleArea}
        variant="interest"
      />

      <SearchableTagList
        label="Areas de atuacao"
        description="O que voce faz ou oferece. Busque e adicione quantas quiser."
        options={AREAS_ATUACAO}
        selected={data.atuacoes}
        onToggle={toggleAtuacao}
        variant="expertise"
      />

      {/* Objetivos */}
      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <div>
          <h3 className="text-lg font-semibold text-heading">Objetivos na Soci</h3>
          <p className="text-sm text-body">Selecione um ou mais objetivos.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {objetivoKeys.map((key) => {
            const isSelected = data.objetivos.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleObjetivo(key)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all ${
                  isSelected
                    ? "border border-primary bg-primary/10"
                    : "border border-border"
                }`}
              >
                <div
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-border-strong"
                  }`}
                >
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
  );
}
