"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { login } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login({ email, senha });
      if (result.success) {
        router.push("/feed");
      } else {
        setError(result.error ?? "Erro ao entrar");
      }
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      {/* Back to home */}
      <div className="flex w-full">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-placeholder hover:text-heading transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Home
        </Link>
      </div>

      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-1.5 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary text-xl font-bold text-white">
          S
        </div>
        <p className="text-sm text-heading font-bold group-hover:text-accent transition-colors">Soci</p>
        <p className="text-sm text-placeholder">
          Rede social de quem constroi junto
        </p>
      </Link>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-8"
      >
        {error && (
          <p className="text-sm text-error text-center">{error}</p>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <div className="mt-1.5 text-right">
            <Link
              href="/recuperar-senha"
              className="text-sm text-accent hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-sm text-body">
          Nao tem conta?{" "}
          <Link href="/cadastro" className="text-accent hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
