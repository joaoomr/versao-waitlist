import { Avatar, Badge } from "@/components/ui";

export function SlidePerfil() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview card */}
      <div className="flex w-[300px] flex-col items-center gap-4 rounded-[var(--radius-card)] border border-border-strong bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
        <Avatar name="Seu Nome" size="md" />
        <span className="text-[15px] font-semibold text-heading">Seu Nome</span>
        <span className="text-xs text-body">Product Designer em Sao Paulo</span>
        <div className="flex flex-wrap justify-center gap-1.5">
          <Badge variant="interest">Tecnologia</Badge>
          <Badge variant="interest">Design</Badge>
          <Badge variant="interest">Dev Web</Badge>
        </div>
        <div className="w-full">
          <div className="h-[5px] w-full rounded-full bg-border">
            <div className="h-[5px] w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
          <p className="mt-1.5 text-center text-[11px] text-accent">75% completo</p>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2.5 max-w-[420px]">
        <h2 className="text-[28px] font-bold text-heading text-center leading-tight">
          Monte seu perfil profissional
        </h2>
        <p className="text-sm text-body text-center leading-relaxed">
          Compartilhe suas experiencias, areas de atuacao e objetivos. Quanto mais completo, melhores as descobertas.
        </p>
      </div>
    </div>
  );
}
