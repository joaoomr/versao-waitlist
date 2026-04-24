"use server";

import { MOCK_SEARCH_PROFILES, MOCK_SEARCH_LEAGUES } from "@/lib/mock-data";
import type {
  ActionResult,
  PaginatedResult,
  SearchProfileResult,
  SearchLeagueResult,
} from "@/lib/types";

export async function searchProfiles(input: {
  q?: string;
  tipo?: "pessoa" | "empresa";
  estado?: string;
  area?: string;
  atuacao?: string;
  objetivo?: "oportunidades" | "contratar" | "conexoes";
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedResult<SearchProfileResult>>> {
  const q = input.q?.toLowerCase() ?? "";
  const filtered = q
    ? MOCK_SEARCH_PROFILES.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q)
      )
    : MOCK_SEARCH_PROFILES;

  return {
    success: true,
    data: {
      items: filtered,
      total: filtered.length,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  };
}

export async function searchLeagues(input: {
  q?: string;
  area?: string;
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedResult<SearchLeagueResult>>> {
  const q = input.q?.toLowerCase() ?? "";
  const filtered = q
    ? MOCK_SEARCH_LEAGUES.filter((l) => l.nome.toLowerCase().includes(q))
    : MOCK_SEARCH_LEAGUES;

  return {
    success: true,
    data: {
      items: filtered,
      total: filtered.length,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  };
}
