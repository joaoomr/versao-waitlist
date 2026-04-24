import { MOCK_USER_ID } from "@/lib/mock-data";

export async function hashPassword(_password: string): Promise<string> {
  return "mock-hash";
}

export async function verifyPassword(
  _password: string,
  _hash: string
): Promise<boolean> {
  return true;
}

export async function createSession(_userId: string): Promise<void> {
  // no-op in showcase
}

export async function getSession(): Promise<{ userId: string } | null> {
  return { userId: MOCK_USER_ID };
}

export async function destroySession(): Promise<void> {
  // no-op in showcase
}

export async function requireAuth(): Promise<{ userId: string }> {
  return { userId: MOCK_USER_ID };
}

export async function getOptionalAuth(): Promise<{ userId: string } | null> {
  return { userId: MOCK_USER_ID };
}
