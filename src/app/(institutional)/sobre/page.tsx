import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sobre a Soci, Rede profissional que conecta ecossistemas",
  description:
    "Conheca a missao, visao e valores da Soci. A rede social profissional que conecta todo o seu ecossistema de trabalho.",
  openGraph: {
    title: "Sobre a Soci",
    description:
      "Conheca a missao, visao e valores da Soci. A rede social profissional que conecta ecossistemas.",
    type: "website",
    locale: "pt_BR",
  },
};

const valores = [
  {
    title: "Privacidade e Seguranca",
    description:
      "Seus dados sao protegidos com os mais altos padroes de seguranca. Voce tem controle total sobre suas informacoes.",
  },
  {
    title: "Respeito em Cada Conexao",
    description:
      "Toda interacao na plataforma e baseada em respeito mutuo. Conexoes so acontecem quando ambos os lados demonstram interesse.",
  },
  {
    title: "Transparencia e Responsabilidade",
    description:
      "Somos claros sobre como a plataforma funciona, como usamos seus dados e como tomamos decisoes.",
  },
  {
    title: "Confianca e Autenticidade",
    description:
      "Perfis reais, conexoes genuinas. Incentivamos a autenticidade e combatemos comportamentos artificiais.",
  },
  {
    title: "Integridade e Compliance",
    description:
      "Operamos em conformidade com a legislacao brasileira e as melhores praticas de governanca digital.",
  },
  {
    title: "Conexoes Relevantes",
    description:
      "Priorizamos qualidade sobre quantidade. Cada conexao sugerida tem um proposito claro e potencial real.",
  },
];

const contatos = [
  {
    label: "Email geral",
    value: "suporte.soci@gmail.com",
    icon: (
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
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Suporte",
    value: "suporte.soci@gmail.com",
    icon: (
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
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  {
    label: "Redes sociais",
    value: "@soci.oficial",
    icon: (
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
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Sobre a Soci
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl">
          A rede profissional que conecta
          <br />
          todo o seu ecossistema de trabalho
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
          A Soci nasceu da necessidade de conectar pessoas que ja trabalham
          juntas, direta ou indiretamente, mas que ainda nao se conhecem.
          Acreditamos que o ecossistema profissional vai muito alem do
          organograma.
        </p>
      </section>

      {/* Missao & Visao */}
      <section className="grid gap-8 py-8 sm:grid-cols-2">
        {/* Missao */}
        <div className="rounded-card border border-border bg-card p-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Missao
          </span>
          <h2 className="mt-3 text-xl font-bold text-heading">
            Conectar pessoas e empresas dentro do ecossistema de trabalho
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Nossa missao e tornar visivel o ecossistema profissional que ja
            existe ao redor de cada pessoa. Conectamos gerentes a equipes,
            fabricas a fornecedores, freelancers a empresas. Todos os elos
            da cadeia produtiva que colaboram para construir algo maior.
          </p>
        </div>

        {/* Visao */}
        <div className="rounded-card border border-border bg-card p-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Visao
          </span>
          <h2 className="mt-3 text-xl font-bold text-heading">
            Ser a maior rede social profissional do Brasil
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-body">
            Queremos ser a plataforma referencia para conexoes profissionais
            no Brasil. Um espaco onde qualquer profissional, do chao de fabrica
            ao diretor executivo, encontra seu lugar e expande seu ecossistema
            de trabalho de forma organizada e significativa.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16">
        <h2 className="text-center text-2xl font-bold text-heading">
          Valores
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-body">
          Os principios que guiam cada decisao e cada funcionalidade da Soci.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor) => (
            <div
              key={valor.title}
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
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-heading">
                {valor.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {valor.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section className="pb-20">
        <h2 className="text-center text-2xl font-bold text-heading">
          Contato
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-body">
          Entre em contato com a nossa equipe.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
          {contatos.map((item) => (
            <div
              key={item.label}
              className="rounded-card border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-button bg-primary/10">
                {item.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-heading">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-body">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
