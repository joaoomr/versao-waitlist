/**
 * Soci V2 — Matching Algorithm
 *
 * Formula:
 *   baseScore = areaScore * 0.45 + objetivoScore * 0.30
 *   finalScore = clamp(10, 100, baseScore + bonuses)
 *
 * Bonuses:
 *   - Proximity: <30km +15, <100km +10, <200km +5, same state +5
 *   - Profession: 1+ match +10, each extra +5, cap +15
 *   - Intention: contratar↔oportunidades +10, conexoes both +5, cap +15
 *   - League: +10 per shared, cap +20
 */

import type { Objetivo } from "@/lib/types";

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface MatchInput {
  areasA: string[];
  areasB: string[];
  objetivosA: Objetivo[];
  objetivosB: Objetivo[];
  latA?: number | null;
  lonA?: number | null;
  latB?: number | null;
  lonB?: number | null;
  estadoA?: string | null;
  estadoB?: string | null;
  profissoesA: string[];
  profissoesB: string[];
  sharedLeagues: number;
}

export function calculateMatchScore(input: MatchInput): number {
  const {
    areasA, areasB,
    objetivosA, objetivosB,
    latA, lonA, latB, lonB,
    estadoA, estadoB,
    profissoesA, profissoesB,
    sharedLeagues,
  } = input;

  // Base score: 50 if no data
  const hasData = areasA.length > 0 || areasB.length > 0 || objetivosA.length > 0 || objetivosB.length > 0;

  if (!hasData) return 50;

  const areaScore = jaccard(areasA, areasB) * 100;
  const objetivoScore = jaccard(objetivosA, objetivosB) * 100;
  const baseScore = Math.round(areaScore * 0.45 + objetivoScore * 0.30);

  // Proximity bonus
  let proximityBonus = 0;
  if (latA && lonA && latB && lonB) {
    const km = haversineKm(latA, lonA, latB, lonB);
    if (km < 30) proximityBonus = 15;
    else if (km < 100) proximityBonus = 10;
    else if (km < 200) proximityBonus = 5;
  } else if (estadoA && estadoB && estadoA === estadoB) {
    proximityBonus = 5;
  }

  // Profession bonus
  let profBonus = 0;
  const profSetA = new Set(profissoesA.map((s) => s.toLowerCase()));
  const profSetB = new Set(profissoesB.map((s) => s.toLowerCase()));
  let profMatches = 0;
  for (const p of profSetA) {
    if (profSetB.has(p)) profMatches++;
  }
  if (profMatches >= 1) profBonus = 10 + (profMatches - 1) * 5;
  profBonus = Math.min(profBonus, 15);

  // Intention bonus
  let intentionBonus = 0;
  const hasContratar = (objs: Objetivo[]) => objs.includes("contratar");
  const hasOportunidades = (objs: Objetivo[]) => objs.includes("oportunidades");
  const hasConexoes = (objs: Objetivo[]) => objs.includes("conexoes");

  if (
    (hasContratar(objetivosA) && hasOportunidades(objetivosB)) ||
    (hasOportunidades(objetivosA) && hasContratar(objetivosB))
  ) {
    intentionBonus += 10;
  }
  if (hasConexoes(objetivosA) && hasConexoes(objetivosB)) {
    intentionBonus += 5;
  }
  intentionBonus = Math.min(intentionBonus, 15);

  // League bonus
  const leagueBonus = Math.min(sharedLeagues * 10, 20);

  const finalScore = baseScore + proximityBonus + profBonus + intentionBonus + leagueBonus;
  return Math.max(10, Math.min(100, finalScore));
}
