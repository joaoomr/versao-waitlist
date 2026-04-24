import { Users } from "lucide-react";
import { Badge } from "@/components/ui";

export function SlideLiga() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Liga preview card */}
      <div className="flex w-[320px] flex-col gap-3.5 rounded-[var(--radius-card)] border border-border-strong bg-bg-card p-6 shadow-[var(--shadow-elevated)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-accent/30 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
            <Users size={20} className="text-accent" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-heading">Liga Dev SP</p>
            <p className="text-xs text-body">48 membros</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="interest">React</Badge>
          <Badge variant="interest">Node.js</Badge>
          <Badge variant="interest">Open Source</Badge>
        </div>
        <p className="text-xs text-body leading-relaxed">
          Comunidade de devs focada em projetos open-source e networking profissional.
        </p>
        {/* Member avatars */}
        <div className="flex">
          {["A", "B", "C"].map((letter, i) => (
            <div
              key={letter}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-sidebar text-[10px] font-semibold text-white"
              style={{
                marginLeft: i > 0 ? "-6px" : 0,
                backgroundColor: ["#2563EB", "#7C3AED", "#059669"][i],
              }}
            >
              {letter}
            </div>
          ))}
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-sidebar bg-[#1E293B] text-[9px] text-body"
            style={{ marginLeft: "-6px" }}
          >
            +45
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2.5 max-w-[420px]">
        <h2 className="text-[28px] font-bold text-heading text-center leading-tight">
          Crie ligas e comunidades
        </h2>
        <p className="text-sm text-body text-center leading-relaxed">
          Reuna profissionais com interesses em comum. Mantenha-se proximo de quem constroi junto com voce.
        </p>
      </div>
    </div>
  );
}
