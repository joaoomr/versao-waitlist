"use server";

type AuthResult<T = { userId: string }> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function login(
  _input: { email: string; senha: string }
): Promise<AuthResult> {
  return { success: true, data: { userId: "mock" } };
}

export async function signup(
  _input: unknown
): Promise<AuthResult> {
  return { success: true, data: { userId: "mock" } };
}

export async function logout(): Promise<{ success: true }> {
  return { success: true };
}

export async function recoverPassword(
  _input: { email: string }
): Promise<AuthResult<null>> {
  return { success: true, data: null };
}
