"use client";

import { User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepTipoProps {
  selected: "pessoa" | "empresa" | null;
  onSelect: (tipo: "pessoa" | "empresa") => void;
}

const options = [
  {
    value: "pessoa" as const,
    icon: User,
    label: "Pessoa Fisica",
    description: "Profissional buscando conexoes, oportunidades e networking",
  },
  {
    value: "empresa" as const,
    icon: Building2,
    label: "Empresa",
    description: "Organizacao buscando talentos, parceiros e visibilidade",
  },
];

export function StepTipo({ selected, onSelect }: StepTipoProps) {
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[28px] font-bold text-heading text-center">
          Como voce quer usar o Soci?
        </h2>
        <p className="text-sm text-body">Isso personaliza sua experiencia na plataforma.</p>
      </div>

      <div className="flex gap-5">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={cn(
                "flex w-[260px] flex-col items-center gap-3.5 rounded-[var(--radius-card)] p-9 transition-all",
                isSelected
                  ? "border-2 border-primary bg-bg-card shadow-[0_0_24px_rgba(37,99,235,0.15)]"
                  : "border border-border bg-bg-card hover:border-border-strong"
              )}
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full border",
                  isSelected
                    ? "bg-primary/15 border-primary/30"
                    : "bg-border/10 border-border"
                )}
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  className={isSelected ? "text-accent" : "text-placeholder"}
                />
              </div>
              <span className="text-[17px] font-semibold text-heading">{opt.label}</span>
              <p className="text-sm text-body text-center leading-relaxed">{opt.description}</p>
              {isSelected && (
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
