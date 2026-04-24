"use server";

import { MOCK_LEAGUES } from "@/lib/mock-data";
import type { ActionResult, LeagueListItem } from "@/lib/types";

export async function getMyLeagues(): Promise<ActionResult<LeagueListItem[]>> {
  return { success: true, data: MOCK_LEAGUES };
}

export async function createLeague(_input: {
  nome: string;
  descricao?: string;
  visibilidade: "publica" | "privada";
  areas: string[];
  atuacoes: string[];
}): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function updateLeague(
  _leagueId: string,
  _input: {
    nome?: string;
    descricao?: string;
    visibilidade?: "publica" | "privada";
    areas?: string[];
    atuacoes?: string[];
  }
): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function deleteLeague(_leagueId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function joinLeague(
  _leagueId: string,
  _inviteCode?: string
): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function leaveLeague(_leagueId: string): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function removeMember(
  _leagueId: string,
  _memberId: string
): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}

export async function createInvite(
  _leagueId: string
): Promise<ActionResult<{ code: string; expiresAt: string }>> {
  return { success: false, error: "WAITLIST" };
}
