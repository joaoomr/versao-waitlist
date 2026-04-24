"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-[var(--radius-tag)] border px-3.5 py-[7px] text-sm transition-colors",
        active
          ? "border-primary/30 bg-primary/12 font-medium text-accent"
          : "border-border text-body hover:border-border-strong"
      )}
    >
      {label}
      <ChevronDown size={12} className={active ? "text-accent" : "text-placeholder"} />
    </button>
  );
}

export function FilterPills() {
  return (
    <div className="flex gap-2 flex-wrap">
      <FilterPill label="Tipo" active />
      <FilterPill label="Localizacao" />
      <FilterPill label="Areas de interesse" />
      <FilterPill label="Areas de atuacao" />
      <FilterPill label="Objetivos" />
      <button className="flex items-center gap-1.5 rounded-[var(--radius-tag)] border border-border px-3.5 py-[7px] text-sm text-body hover:border-border-strong transition-colors">
        <SlidersHorizontal size={14} className="text-body" />
        Mais filtros
      </button>
    </div>
  );
}
