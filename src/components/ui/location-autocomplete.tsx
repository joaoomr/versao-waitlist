"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import municipios from "@/data/municipios-ibge.json";

interface LocationAutocompleteProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
}

type Municipio = {
  id: number;
  nome: string;
  uf: string;
  lat: number;
  lng: number;
};

const data = municipios as Municipio[];

// Pre-compute unique states
const estados = [...new Set(data.map((m) => m.uf))].sort();

export function LocationAutocomplete({
  label = "Localizacao",
  value = "",
  onChange,
  placeholder = "Buscar cidade ou estado...",
  error,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Filter results: show cities matching query, plus states
  const results = useMemo(() => {
    if (query.length < 2) return [];

    const q = query.toLowerCase();
    const items: { label: string; value: string }[] = [];

    // Match states first
    for (const uf of estados) {
      const stateNames: Record<string, string> = {
        AC: "Acre", AL: "Alagoas", AP: "Amapa", AM: "Amazonas", BA: "Bahia",
        CE: "Ceara", DF: "Distrito Federal", ES: "Espirito Santo", GO: "Goias",
        MA: "Maranhao", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
        MG: "Minas Gerais", PA: "Para", PB: "Paraiba", PR: "Parana",
        PE: "Pernambuco", PI: "Piaui", RJ: "Rio de Janeiro",
        RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondonia",
        RR: "Roraima", SC: "Santa Catarina", SP: "Sao Paulo", SE: "Sergipe",
        TO: "Tocantins",
      };
      const fullName = stateNames[uf] || uf;
      if (fullName.toLowerCase().includes(q) || uf.toLowerCase().includes(q)) {
        items.push({ label: fullName, value: fullName });
      }
    }

    // Match cities (limit to 8)
    const cityMatches = data
      .filter((m) => m.nome.toLowerCase().includes(q))
      .slice(0, 8)
      .map((m) => ({
        label: `${m.nome}, ${m.uf}`,
        value: `${m.nome}, ${m.uf}`,
      }));

    return [...items.slice(0, 3), ...cityMatches];
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(val: string) {
    setQuery(val);
    onChange?.(val);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-label">{label}</label>
      )}
      <div className="relative">
        <MapPin
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholder"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-[var(--radius-input)] border bg-bg-card-alt pl-10 pr-3.5 text-sm text-heading placeholder:text-placeholder transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none ${
            error ? "border-error" : "border-border"
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-border bg-bg-card shadow-[var(--shadow-elevated)]">
          {results.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => handleSelect(r.value)}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-body hover:bg-primary/8 hover:text-heading transition-colors"
            >
              <MapPin size={14} className="text-placeholder shrink-0" strokeWidth={1.5} />
              {r.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
