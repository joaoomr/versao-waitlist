"use server";

import { MOCK_CONNECTIONS } from "@/lib/mock-data";
import type { ActionResult, PaginatedResult, ConnectionItem } from "@/lib/types";

export async function getConnections(_input: {
  q?: string;
  tipo?: "pessoa" | "empresa";
  estado?: string;
  area?: string;
  atuacao?: string;
  objetivo?: "oportunidades" | "contratar" | "conexoes";
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedResult<ConnectionItem>>> {
  return {
    success: true,
    data: {
      items: MOCK_CONNECTIONS,
      total: MOCK_CONNECTIONS.length,
      page: 1,
      pageSize: 20,
      hasMore: false,
    },
  };
}

export async function removeConnection(
  _connectionId: string
): Promise<ActionResult> {
  return { success: false, error: "WAITLIST" };
}
