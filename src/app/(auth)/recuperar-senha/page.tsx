"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { recoverPassword } from "@/lib/actions/auth-actions";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await recoverPassword({ email });
      setEnviado(true);
    } catch {
      // Always show success to prevent email enumeration
      setEnviado(true);
    } finally {
      setLoading(false);
    }
  }

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
        <h1 className="text-xl font-bold text-heading">Recuperar senha</h1>
      </div>

      {/* Card */}
      <div className="flex w-full flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-8">
        {enviado ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/12">
              <Mail size={24} className="text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-heading">Email enviado</h2>
            <p className="text-center text-sm text-body leading-relaxed">
              Se o email{" "}
              <span className="font-medium text-heading">{email}</span>{" "}
              estiver cadastrado, voce recebera um link para redefinir sua senha.
            </p>
            <Link
              href="/login"
              className="mt-2 text-sm text-accent hover:underline"
            >
              Voltar para login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-sm text-body leading-relaxed">
              Insira seu email e enviaremos um link para redefinir sua senha.
            </p>

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link de recuperacao"}
            </Button>

            <p className="text-center text-sm text-body">
              <Link href="/login" className="text-accent hover:underline">
                Voltar para login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
