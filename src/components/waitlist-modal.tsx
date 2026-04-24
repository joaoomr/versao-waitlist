"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { WAITLIST_EVENT, WAITLIST_URL } from "@/lib/waitlist";

export function WaitlistModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(WAITLIST_EVENT, handler);
    return () => window.removeEventListener(WAITLIST_EVENT, handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-10 w-full max-w-md rounded-[var(--radius-card)] border border-border bg-bg-card p-8 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-placeholder hover:text-heading transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <span className="text-2xl font-bold text-accent">S</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-heading">
              Esta e uma vitrine da Soci
            </h2>
            <p className="text-sm text-body leading-relaxed">
              Para curtir, comentar, seguir e interagir com a comunidade,
              cadastre-se na lista de espera. Seja um dos primeiros a ter acesso.
            </p>
          </div>

          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Entrar na lista de espera
            <ExternalLink size={14} />
          </a>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-placeholder hover:text-body transition-colors"
          >
            Continuar explorando
          </button>
        </div>
      </div>
    </div>
  );
}
