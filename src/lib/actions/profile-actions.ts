"use server";

import { MOCK_CURRENT_USER } from "@/lib/mock-data";
import type { ActionResult, FullProfile, Objetivo, EscolaridadeNivel } from "@/lib/types";

export async function getMyProfile(): Promise<ActionResult<FullProfile | null>> {
  return { success: true, data: MOCK_CURRENT_USER };
}

export async function getProfileById(
  _targetUserId: string
): Promise<ActionResult<FullProfile | null>> {
  return { success: true, data: MOCK_CURRENT_USER };
}

export async function saveOnboardingTipo(_input: {
  tipo: "pessoa" | "empresa";
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function saveOnboardingPerfilBase(_input: {
  nome?: string;
  idade?: number;
  bio?: string;
  redeSocial?: string;
  site?: string;
  estado?: string;
  cidade?: string;
  codigoIbge: number | null;
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function saveOnboardingAreas(_input: {
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function saveOnboardingExperiencias(_input: {
  experiencias: Array<{
    cargo: string;
    empresa: string;
    periodoInicio: string;
    periodoFim: string | null;
  }>;
  escolaridade: Array<{
    nivel: EscolaridadeNivel;
    instituicao: string | null;
    curso: string | null;
  }>;
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function completeOnboarding(): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function updateProfile(_input: {
  nome: string;
  idade: number | null;
  bio: string;
  redeSocial: string;
  site: string;
  areas: string[];
  atuacoes: string[];
  objetivos: Objetivo[];
  experiencias: Array<{
    cargo: string;
    empresa: string;
    periodoInicio: string;
    periodoFim: string | null;
  }>;
  escolaridade: Array<{
    nivel: EscolaridadeNivel;
    instituicao: string | null;
    curso: string | null;
  }>;
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function uploadAvatar(
  _formData: FormData
): Promise<ActionResult<{ url: string }>> {
  return { success: false, error: "WAITLIST" };
}

export async function getFollowCounts(
  _targetUserId?: string
): Promise<ActionResult<{ followersCount: number; followingCount: number }>> {
  return { success: true, data: { followersCount: 128, followingCount: 47 } };
}

export async function getConnectionCount(
  _targetUserId?: string
): Promise<ActionResult<{ count: number }>> {
  return { success: true, data: { count: 2 } };
}
