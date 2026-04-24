import { ChevronLeft } from "lucide-react";

interface ProgressHeaderProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

export function ProgressHeader({ step, totalSteps, onBack }: ProgressHeaderProps) {
  const percentage = Math.round((step / totalSteps) * 100);
  const isComplete = percentage >= 100;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong"
          >
            <ChevronLeft size={16} className="text-body" />
          </button>
        )}
        <h1 className="text-xl font-bold text-heading">Completar perfil</h1>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-body">
          Etapa {step} de {totalSteps}
        </span>
        <span className={`text-sm font-semibold ${isComplete ? "text-success" : "text-accent"}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-border">
        <div
          className={`h-1 rounded-full transition-all ${
            isComplete
              ? "bg-gradient-to-r from-primary to-success"
              : "bg-gradient-to-r from-primary to-accent"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
