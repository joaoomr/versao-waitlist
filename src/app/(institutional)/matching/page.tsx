import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matching, Soci",
  description:
    "Entenda como o matching da Soci conecta profissionais, empresas, fornecedores e parceiros no seu ecossistema de trabalho.",
};

export default function MatchingPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Matching inteligente
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-heading lg:text-5xl">
          Conexoes profissionais com proposito e afinidade
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
          O matching da Soci nao e aleatorio. Ele conecta voce a profissionais,
          empresas e parceiros que compartilham areas de atuacao e
          objetivos. Relacoes com potencial real de gerar valor.
        </p>
      </section>

      {/* O que e Matching */}
      <section className="pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              O conceito
            </span>
            <h2 className="mt-3 text-3xl font-bold text-heading">
              Mais que uma curtida.
              <br />
              Uma ponte entre ecossistemas.
            </h2>
            <p className="mt-4 text-body leading-relaxed">
              Quando voce curte um perfil na Soci e essa pessoa tambem curte o
              seu, nasce uma conexao. Diferente de redes sociais tradicionais,
              aqui a conexao e profissional. Ela desbloqueia conversa direta,
              visibilidade mutua e a possibilidade de colaboracao real.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              O algoritmo avalia o alinhamento entre suas areas de atuacao,
              interesses e objetivos profissionais para sugerir os perfis mais
              relevantes para voce.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-primary/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading">Descubra</h3>
                  <p className="mt-1 text-sm text-body">Explore perfis filtrados por area, localizacao e afinidade.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-swipe-green/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-swipe-green">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading">Conecte</h3>
                  <p className="mt-1 text-sm text-body">Curtida mutua gera conexao + chat direto entre voces.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-accent/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading">Construa</h3>
                  <p className="mt-1 text-sm text-body">Transforme conexoes em projetos, parcerias e oportunidades.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem voce encontra */}
      <section className="pb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Ecossistema profissional
          </span>
          <h2 className="mt-3 text-3xl font-bold text-heading">
            Encontre quem faz parte do seu mundo profissional
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body">
            A Soci vai alem de conexoes diretas. Ela mapeia todo o ecossistema
            ao redor da sua area de atuacao e aproxima quem faz sentido para voce.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-card)] border border-border bg-bg-card p-6"
            >
              <div className="mb-4 text-accent">{item.icon}</div>
              <h3 className="text-base font-semibold text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-body leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ligas */}
      <section className="pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[var(--radius-card)] border border-border bg-bg-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-lg">
                L
              </div>
              <div>
                <p className="text-sm font-semibold text-heading">Liga de Design SP</p>
                <p className="text-xs text-body">42 membros, Publica</p>
              </div>
            </div>
            <p className="text-sm text-body mb-4">
              Comunidade de designers de produto, UX e UI de Sao Paulo trocando
              experiencias e oportunidades.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-[var(--radius-tag)] bg-primary/10 px-2.5 py-1 text-xs font-medium text-accent">Design</span>
              <span className="rounded-[var(--radius-tag)] bg-success/10 px-2.5 py-1 text-xs font-medium text-success">Colaboracao</span>
              <span className="rounded-[var(--radius-tag)] bg-primary/15 px-2.5 py-1 text-xs font-medium text-accent">SP</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ligas
            </span>
            <h2 className="mt-3 text-3xl font-bold text-heading">
              Comunidades que ampliam seu alcance
            </h2>
            <p className="mt-4 text-body leading-relaxed">
              Ligas sao comunidades tematicas dentro da Soci. Elas agrupam
              profissionais por area, interesse ou regiao, criando espacos de
              troca, visibilidade e oportunidade.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              Participe de ligas existentes ou crie a sua propria para reunir
              fornecedores, colaboradores e parceiros do seu setor.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="rounded-[var(--radius-card)] border border-border bg-bg-card px-8 py-16 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-heading">
              Pronto para encontrar seu ecossistema?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-body">
              Crie sua conta, complete seu perfil e comece a descobrir conexoes
              que realmente fazem sentido para sua carreira.
            </p>
            <Link
              href="/feed"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-gradient-to-br from-primary to-primary-hover px-8 text-base font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Comece agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const ecosystemItems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Colaboradores e talentos",
    description: "Encontre profissionais qualificados para integrar equipes, projetos e demandas pontuais.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Fornecedores e prestadores",
    description: "Descubra quem fornece servicos e produtos para o seu setor. Conecte-se antes de contratar.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Parceiros estrategicos",
    description: "Identifique empresas e profissionais que complementam sua oferta e ampliam seu alcance.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Rede ao seu redor",
    description: "Profissionais da sua cidade, do seu estado e do seu segmento, filtrados por proximidade e relevancia.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Mentores e referencias",
    description: "Acompanhe e aprenda com profissionais mais experientes da sua area de atuacao.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Oportunidades concretas",
    description: "Cada conexao e uma porta: projetos, indicacoes, contratos e colaboracoes surgem naturalmente.",
  },
];
