"use server";

type AuthResult<T = { userId: string }> =
  | { success: true; data: T }
  | { success: false; error: string };

// Vitrine publica: toda escrita retorna WAITLIST para consistencia com o
// padrao geral. Rotas de auth (/login, /cadastro, /recuperar-senha) nao existem
// mais; essas actions permanecem como endpoints potencialmente atingiveis via
// fetch direto e precisam fechar a porta no server (defesa em profundidade).

export async function login(
  _input: { email: string; senha: string }
): Promise<AuthResult> {
  return { success: false, error: "WAITLIST" };
}

export async function signup(_input: unknown): Promise<AuthResult> {
  return { success: false, error: "WAITLIST" };
}

export async function recoverPassword(
  _input: { email: string }
): Promise<AuthResult<null>> {
  return { success: false, error: "WAITLIST" };
}

// logout e idempotente; sem sessao real, resposta neutra ok
export async function logout(): Promise<{ success: true }> {
  return { success: true };
}
