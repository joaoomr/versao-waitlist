import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Como Funciona — Soci",
  description:
    "Descubra como a Soci conecta voce ao ecossistema profissional ao seu redor. Informe quem voce e, explore e descubra, conecte e construa.",
  openGraph: {
    title: "Como Funciona — Soci",
    description:
      "Descubra como a Soci conecta voce ao ecossistema profissional ao seu redor.",
    type: "website",
    locale: "pt_BR",
  },
};

const ecosystemRoles = [
  { label: "Gerente industrial", position: "top-0 left-1/2 -translate-x-1/2" },
  { label: "Fabrica", position: "top-1/4 right-0 translate-x-0" },
  { label: "Manutencao", position: "bottom-1/4 right-0 translate-x-0" },
  { label: "Fornecedor", position: "bottom-0 left-1/2 -translate-x-1/2" },
  { label: "Freelancer", position: "bottom-1/4 left-0" },
  { label: "Faxineira", position: "top-1/4 left-0" },
];

const steps = [
  {
    number: "01",
    title: "Informe quem voce e",
    description:
      "Crie seu perfil profissional com suas habilidades, area de atuacao e experiencia. Quanto mais completo, melhores as conexoes.",
  },
  {
    number: "02",
    title: "Explore e descubra",
    description:
      "Navegue por profissionais do seu ecossistema. Filtre por area, habilidades e localizacao para encontrar quem faz sentido.",
  },
  {
    number: "03",
    title: "Conecte e construa",
    description:
      "Curta perfis que te interessam. Quando a curtida for mutua, uma conexao e criada e voces podem conversar diretamente.",
  },
];

const connectionExamples = [
  {
    pair: "Fabrica + Freelancer",
    description:
      "Uma fabrica encontra o freelancer ideal para um projeto pontual de design industrial.",
  },
  {
    pair: "Gerente + equipe",
    description:
      "Um gerente descobre profissionais qualificados para completar sua equipe de producao.",
  },
  {
    pair: "Fornecedor + empresa",
    description:
      "Um fornecedor se conecta diretamente com empresas que precisam dos seus servicos.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Como Funciona
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl">
          Conecte-se ao ecossistema profissional
          <br />
          ao seu redor
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
          A Soci organiza as relacoes profissionais que ja existem ao seu redor
          e te ajuda a descobrir novas oportunidades de colaboracao.
        </p>
      </section>

      {/* Ecosystem Diagram */}
      <section className="py-16">
        <h2 className="text-center text-2xl font-bold text-heading">
          Todos fazem parte do mesmo ecossistema
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-body">
          Profissionais de todas as funcoes e niveis estao conectados. A Soci
          torna essas conexoes visiveis e acessiveis.
        </p>

        <div className="relative mx-auto mt-12 h-[400px] max-w-[500px]">
          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-primary bg-card">
            <div className="flex h-8 w-8 items-center justify-center rounded-logo bg-primary">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="mt-1 text-[10px] leading-tight text-body text-center">
              Seu ecossistema
              <br />
              organizado pela Soci
            </span>
          </div>

          {/* Satellite roles */}
          {ecosystemRoles.map((role) => (
            <div
              key={role.label}
              className={`absolute ${role.position} flex items-center justify-center`}
            >
              <div className="rounded-card border border-border bg-card px-4 py-2.5">
                <span className="text-sm font-medium text-heading">
                  {role.label}
                </span>
              </div>
            </div>
          ))}

          {/* Connecting lines (decorative) */}
          <svg
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 250;
              const cy = 200;
              const r = 140;
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={cx + r * Math.sin(rad)}
                  y2={cy - r * Math.cos(rad)}
                  stroke="rgba(27,82,153,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="rounded-card border border-border bg-card p-10 text-center">
        <h2 className="text-2xl font-bold text-heading">
          Expanda suas relacoes profissionais de forma estruturada
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-body">
          Deixe de depender apenas de indicacoes aleatorias. Com a Soci, voce
          encontra as pessoas certas no momento certo.
        </p>
        <Link
          href="/cadastro"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-button bg-gradient-to-br from-primary to-primary-hover px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Comece agora
        </Link>
      </section>

      {/* 3 Steps */}
      <section className="py-20">
        <h2 className="text-center text-2xl font-bold text-heading">
          Como voce se conecta
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-body">
          Tres passos simples para expandir seu ecossistema profissional.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-card border border-border bg-card p-6"
            >
              <span className="text-3xl font-bold text-accent">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-heading">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connection Examples */}
      <section className="pb-20">
        <h2 className="text-center text-2xl font-bold text-heading">
          Conexoes que fazem sentido
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-body">
          Veja como diferentes profissionais se beneficiam do ecossistema Soci.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {connectionExamples.map((example) => (
            <div
              key={example.pair}
              className="rounded-card border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-button bg-primary/10">
                <svg
                  className="h-5 w-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-heading">
                {example.pair}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
