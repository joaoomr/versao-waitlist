interface NodeProps {
  initials: string;
  label: string;
  size: "sm" | "md" | "lg";
  isPrimary?: boolean;
}

function NetworkNode({ initials, label, size, isPrimary }: NodeProps) {
  const sizeMap = { sm: "h-11 w-11 text-sm", md: "h-[52px] w-[52px] text-base", lg: "h-[68px] w-[68px] text-xl" };
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-full border-2 font-semibold ${sizeMap[size]} ${
          isPrimary
            ? "bg-gradient-to-br from-primary to-primary-hover border-accent/40 text-white"
            : "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-accent/30 text-accent"
        }`}
      >
        {initials}
      </div>
      <span className={`text-[11px] ${isPrimary ? "text-heading font-medium" : "text-body"}`}>
        {label}
      </span>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-5 w-px bg-primary/30" />
      <div className="h-2 w-2 rounded-full bg-primary" />
      <div className="h-5 w-px bg-primary/30" />
    </div>
  );
}

export function SlideEcossistema() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Network visualization */}
      <div className="flex items-center gap-5">
        <NetworkNode initials="AB" label="Designer" size="md" />
        <Connector />
        <NetworkNode initials="VC" label="Voce" size="lg" isPrimary />
        <Connector />
        <NetworkNode initials="RC" label="Dev" size="md" />
      </div>
      <div className="flex gap-8 -mt-1">
        <div className="flex flex-col items-center gap-1">
          <div className="h-4 w-px bg-primary/20" />
          <NetworkNode initials="MF" label="Fornecedor" size="sm" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-4 w-px bg-primary/20" />
          <NetworkNode initials="LS" label="Parceiro" size="sm" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2.5 max-w-[480px]">
        <h2 className="text-[28px] font-bold text-heading text-center leading-tight">
          Conecte-se com todo o seu ecossistema profissional
        </h2>
        <p className="text-sm text-body text-center leading-relaxed">
          Encontre profissionais, colaboradores, fornecedores e parceiros alinhados com o seu trabalho.
        </p>
      </div>
    </div>
  );
}
