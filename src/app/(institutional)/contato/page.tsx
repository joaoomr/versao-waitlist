"use client";

import { useState, type FormEvent } from "react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // TODO: wire up sendContactForm server action from @/lib/actions/contact-actions
    try {
      // Placeholder: simulate submission
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
    } catch {
      setError("Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Left — Form */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Contato
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-heading">
            Fale com a nossa equipe
          </h1>
          <p className="mt-3 max-w-lg text-body">
            Tem alguma duvida, sugestao ou precisa de ajuda? Preencha o
            formulario abaixo e retornaremos o mais breve possivel.
          </p>

          {submitted ? (
            <div className="mt-10 rounded-card border border-success/30 bg-success/10 p-8">
              <h2 className="text-xl font-semibold text-heading">
                Mensagem enviada
              </h2>
              <p className="mt-2 text-sm text-body">
                Obrigado pelo contato. Nossa equipe responde em ate 24 horas
                uteis.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {error && (
                <div className="rounded-card border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Nome + Email row */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-1.5 block text-sm font-medium text-label"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="h-11 w-full rounded-input border border-border bg-card px-4 text-sm text-heading placeholder:text-placeholder outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-label"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-11 w-full rounded-input border border-border bg-card px-4 text-sm text-heading placeholder:text-placeholder outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>

              {/* Assunto */}
              <div>
                <label
                  htmlFor="assunto"
                  className="mb-1.5 block text-sm font-medium text-label"
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  required
                  value={formData.assunto}
                  onChange={(e) =>
                    setFormData({ ...formData, assunto: e.target.value })
                  }
                  className="h-11 w-full rounded-input border border-border bg-card px-4 text-sm text-heading outline-none transition-colors focus:border-primary"
                >
                  <option value="" disabled>
                    Selecione um assunto
                  </option>
                  <option value="duvida">Duvida geral</option>
                  <option value="suporte">Suporte tecnico</option>
                  <option value="parceria">Parceria</option>
                  <option value="feedback">Feedback</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label
                  htmlFor="mensagem"
                  className="mb-1.5 block text-sm font-medium text-label"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  required
                  rows={5}
                  placeholder="Escreva sua mensagem..."
                  value={formData.mensagem}
                  onChange={(e) =>
                    setFormData({ ...formData, mensagem: e.target.value })
                  }
                  className="w-full resize-none rounded-input border border-border bg-card px-4 py-3 text-sm text-heading placeholder:text-placeholder outline-none transition-colors focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center rounded-button bg-gradient-to-br from-primary to-primary-hover px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          )}
        </div>

        {/* Right — Info sidebar */}
        <aside className="space-y-6 lg:pt-20">
          {/* Contact info card */}
          <div className="rounded-card border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-heading">
              Informacoes de contato
            </h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-heading">Email geral</p>
                  <p className="text-sm text-body">suporte.soci@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-heading">Suporte</p>
                  <p className="text-sm text-body">suporte.soci@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-heading">
                    Redes sociais
                  </p>
                  <p className="text-sm text-body">@soci.oficial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours card */}
          <div className="rounded-card border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-heading">
              Horario de atendimento
            </h2>
            <p className="mt-3 text-sm text-body">
              Segunda a sexta, 9h as 18h
            </p>
            <p className="mt-1 text-sm text-placeholder">
              Respondemos em ate 24 horas uteis.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
