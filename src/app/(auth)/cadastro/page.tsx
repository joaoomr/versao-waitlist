"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { signup } from "@/lib/actions/auth-actions";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [consentTermos, setConsentTermos] = useState(false);
  const [consentAnalytics, setConsentAnalytics] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signup({
        nome,
        email,
        senha,
        consentTermos: consentTermos as true,
        consentPrivacidade: consentTermos as true,
        consentAnalytics,
      });

      if (result.success) {
        router.push("/onboarding");
      } else {
        setError(result.error ?? "Erro ao criar conta");
      }
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    nome && email && senha.length >= 8 && consentTermos;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      {/* Header */}
      <div className="flex w-full items-center gap-3">
        <Link
          href="/login"
          className="flex h-9 w-9 items-center justify-center rounded-[10px] text-placeholder hover:text-heading transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Link>
        <h1 className="text-xl font-bold text-heading">Criar conta</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-8"
      >
        {error && (
          <p className="text-sm text-error text-center">{error}</p>
        )}

        <Input
          label="Nome completo"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Minimo 8 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* LGPD Consent */}
        <div className="flex flex-col gap-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consentTermos}
              onChange={(e) => setConsentTermos(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-xs text-body leading-relaxed">
              Li e concordo com os{" "}
              <Link href="/termos" className="text-accent hover:underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="text-accent hover:underline">
                Politica de Privacidade
              </Link>
            </span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consentAnalytics}
              onChange={(e) => setConsentAnalytics(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-xs text-body leading-relaxed">
              Autorizo o uso de dados anonimizados para melhoria da plataforma
              (analytics)
            </span>
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={!canSubmit || loading}>
          {loading ? "Criando conta..." : "Criar conta"}
        </Button>

        <p className="text-center text-sm text-body">
          Ja tem conta?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
