"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Badge } from "./badge";

interface SearchableTagListProps {
  label?: string;
  options: readonly string[];
  selected: string[];
  onToggle: (item: string) => void;
  placeholder?: string;
  badgeVariant?: "interest" | "expertise" | "objective" | "default";
}

export function SearchableTagList({
  label,
  options,
  selected,
  onToggle,
  placeholder = "Buscar e adicionar...",
  badgeVariant = "default",
}: SearchableTagListProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = search
    ? options.filter(
        (o) =>
          o.toLowerCase().includes(search.toLowerCase()) &&
          !selected.includes(o)
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-label">{label}</label>
      )}
      <div className="relative">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-bg-card-alt px-3">
          <Search size={14} className="text-placeholder" />
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-heading placeholder:text-placeholder outline-none"
            placeholder={placeholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
          {search && (
            <button onClick={() => setSearch("")} type="button">
              <X size={14} className="text-placeholder" />
            </button>
          )}
        </div>
        {open && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-lg border border-border bg-bg-card shadow-lg">
            {filtered.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onToggle(item);
                  setSearch("");
                }}
                className="flex w-full items-center px-3 py-2 text-sm text-body hover:bg-primary/10 hover:text-heading text-left"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <Badge
              key={item}
              variant={badgeVariant}
              removable
              onRemove={() => onToggle(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
