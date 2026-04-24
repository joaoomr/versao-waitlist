"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui";

export default function AppError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <AlertTriangle className="h-12 w-12 text-warning" strokeWidth={1.5} />
      <h2 className="text-lg font-semibold text-heading">Algo deu errado</h2>
      <p className="max-w-sm text-sm text-body">
        Ocorreu um erro inesperado. Tente novamente ou volte para a pagina inicial.
      </p>
      <Button onClick={reset} variant="secondary" size="sm">
        Tentar novamente
      </Button>
    </div>
  );
}
