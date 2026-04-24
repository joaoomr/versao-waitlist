"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { Button, Avatar } from "@/components/ui";
import { ProgressHeader } from "@/components/onboarding/progress-header";
import { StepTipo } from "@/components/onboarding/step-tipo";
import { StepPerfilBase } from "@/components/onboarding/step-perfil-base";
import { StepAreas } from "@/components/onboarding/step-areas";
import { StepExperiencias } from "@/components/onboarding/step-experiencias";
import {
  saveOnboardingTipo,
  saveOnboardingPerfilBase,
  saveOnboardingAreas,
  saveOnboardingExperiencias,
  completeOnboarding,
  uploadAvatar,
} from "@/lib/actions/profile-actions";
import type { Objetivo } from "@/lib/types";

type Tipo = "pessoa" | "empresa" | null;

interface PerfilBaseData {
  nome: string;
  idade: string;
  bio: string;
  redeSocial: string;
  site: string;
  estado: string;
  cidade: string;
  codigoIbge: number | null;
  avatarFile: File | null;
}

interface ExperienciasData {
  experiencias: Array<{ cargo: string; empresa: string; periodoInicio: string; periodoFim: string }>;
  escolaridade: Array<{ nivel: string; instituicao: string; curso: string }>;
}

interface AreasData {
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
}

export default function CompletarPerfilPage() {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState<Tipo>(null);
  const [perfilBase, setPerfilBase] = useState<PerfilBaseData>({
    nome: "", idade: "", bio: "", redeSocial: "", site: "",
    estado: "", cidade: "", codigoIbge: null, avatarFile: null,
  });
  const [experiencias, setExperiencias] = useState<ExperienciasData>({
    experiencias: [], escolaridade: [],
  });
  const [areas, setAreas] = useState<AreasData>({
    areas: [], atuacoes: [], objetivos: [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const totalSteps = tipo === "empresa" ? 3 : 4;
  const percentage = Math.round((step / totalSteps) * 100);

  const saveCurrentStep = useCallback(async (): Promise<boolean> => {
    setSaving(true);
    setError("");

    try {
      switch (step) {
        case 1: {
          if (!tipo) { setError("Selecione um tipo"); setSaving(false); return false; }
          const result = await saveOnboardingTipo({ tipo });
          if (!result.success) { setError(result.error ?? "Erro"); setSaving(false); return false; }
          break;
        }
        case 2: {
          // Upload avatar if selected
          if (perfilBase.avatarFile) {
            const formData = new FormData();
            formData.append("file", perfilBase.avatarFile);
            await uploadAvatar(formData);
          }
          const result = await saveOnboardingPerfilBase({
            nome: perfilBase.nome || undefined,
            idade: perfilBase.idade ? parseInt(perfilBase.idade) : undefined,
            bio: perfilBase.bio || undefined,
            redeSocial: perfilBase.redeSocial || undefined,
            site: perfilBase.site || undefined,
            estado: perfilBase.estado || undefined,
            cidade: perfilBase.cidade || undefined,
            codigoIbge: perfilBase.codigoIbge,
          });
          if (!result.success) { setError(result.error ?? "Erro"); setSaving(false); return false; }
          break;
        }
        case 3: {
          if (tipo === "empresa") {
            // PJ: step 3 = areas
            const result = await saveOnboardingAreas({
              areas: areas.areas,
              atuacoes: areas.atuacoes,
              objetivos: areas.objetivos,
            });
            if (!result.success) { setError(result.error ?? "Erro"); setSaving(false); return false; }
          } else {
            // PF: step 3 = experiencias
            const result = await saveOnboardingExperiencias({
              experiencias: experiencias.experiencias.map((e) => ({
                ...e,
                periodoFim: e.periodoFim || null,
              })),
              escolaridade: experiencias.escolaridade.map((e) => ({
                nivel: e.nivel as Parameters<typeof saveOnboardingExperiencias>[0] extends { escolaridade: Array<infer T> } ? T extends { nivel: infer N } ? N : never : never,
                instituicao: e.instituicao || null,
                curso: e.curso || null,
              })),
            });
            if (!result.success) { setError(result.error ?? "Erro"); setSaving(false); return false; }
          }
          break;
        }
        case 4: {
          // PF: step 4 = areas
          const result = await saveOnboardingAreas({
            areas: areas.areas,
            atuacoes: areas.atuacoes,
            objetivos: areas.objetivos,
          });
          if (!result.success) { setError(result.error ?? "Erro"); setSaving(false); return false; }
          break;
        }
      }
      setSaving(false);
      return true;
    } catch {
      setError("Erro inesperado. Tente novamente.");
      setSaving(false);
      return false;
    }
  }, [step, tipo, perfilBase, experiencias, areas]);

  async function handleNext() {
    const saved = await saveCurrentStep();
    if (!saved) return;

    if (step === totalSteps) {
      await completeOnboarding();
      router.push("/feed");
      return;
    }
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  async function handleSkip() {
    if (step === 1) {
      // Tipo is required, can't skip
      setError("Selecione um tipo para continuar");
      return;
    }
    if (step === totalSteps) {
      await completeOnboarding();
      router.push("/feed");
      return;
    }
    setStep((prev) => prev + 1);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <StepTipo selected={tipo} onSelect={setTipo} />;
      case 2:
        return (
          <StepPerfilBase
            tipo={tipo}
            data={perfilBase}
            onChange={setPerfilBase}
          />
        );
      case 3:
        if (tipo === "empresa") {
          return (
            <StepAreas
              data={areas}
              onChange={setAreas}
            />
          );
        }
        return (
          <StepExperiencias
            data={experiencias}
            onChange={setExperiencias}
          />
        );
      case 4:
        return (
          <StepAreas
            data={areas}
            onChange={setAreas}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <ProgressHeader
          step={step}
          totalSteps={totalSteps}
          onBack={step > 1 ? handleBack : undefined}
        />

        <div className="mt-8 flex gap-8">
          <div className="flex-1">
            {error && (
              <p className="mb-4 text-sm text-error text-center">{error}</p>
            )}

            {renderStep()}

            <div className="mt-8 flex flex-col items-center gap-3.5">
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full"
                disabled={saving || (step === 1 && !tipo)}
              >
                {saving ? "Salvando..." : step === totalSteps ? "Finalizar" : "Continuar"}
              </Button>
              {step > 1 && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-placeholder hover:text-body transition-colors"
                  disabled={saving}
                >
                  Pular esta etapa
                </button>
              )}
            </div>
          </div>

          <div className="hidden w-[260px] lg:block">
            <div className="sticky top-10 flex flex-col items-center gap-3.5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
              <Avatar name={perfilBase.nome || "Seu Nome"} size="lg" />
              <span className="text-[15px] font-semibold text-heading">
                {perfilBase.nome || "Seu Nome"}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className={percentage >= 100 ? "text-success" : "text-accent"} />
                <span className={`text-xs font-medium ${percentage >= 100 ? "text-success" : "text-accent"}`}>
                  {percentage}% completo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
