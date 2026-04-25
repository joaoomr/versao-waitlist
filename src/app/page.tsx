import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white">
              S
            </div>
            <span className="text-base font-semibold text-heading">Soci</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-body hover:text-heading transition-colors">Home</Link>
            <Link href="/como-funciona" className="text-sm text-body hover:text-heading transition-colors">Como funciona</Link>
            <Link href="/matching" className="text-sm text-body hover:text-heading transition-colors">Matching</Link>
            <Link href="/sobre" className="text-sm text-body hover:text-heading transition-colors">Sobre nos</Link>
            <Link href="/contato" className="text-sm text-body hover:text-heading transition-colors">Contato</Link>
            <Link href="/faq" className="text-sm text-body hover:text-heading transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/feed"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 text-sm text-heading transition-colors hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Entrar
            </Link>
            <Link
              href="/feed"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-hover px-4 text-sm text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-heading lg:text-6xl">
                Muito alem de uma
                <br />
                <span className="text-accent">rede social.</span>
                <br />
                Um mapa do seu
                <br />
                <span className="text-accent whitespace-nowrap">mundo profissional.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-body">
                A Soci organiza as relacoes profissionais que importam para
                voce. Se voce e autonomo, gestor ou fundador, sua rede de
                trabalho envolve fornecedores, prestadores, parceiros,
                colaboradores e clientes. A Soci conecta todas essas pontas.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/feed"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-gradient-to-br from-primary to-primary-hover px-8 text-base font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Comece a se conectar
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/matching" className="text-sm font-medium text-accent hover:text-primary transition-colors">
                  Como funciona o matching
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {ecosystemPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-bg-card p-5"
                >
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-primary/10 text-accent">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-heading">{point.title}</h3>
                    <p className="mt-1 text-sm text-body">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segundo bloco — A rede que conecta seu ecossistema */}
        <section className="border-t border-border bg-bg-card/30 py-24">
          <div className="mx-auto flex max-w-[1200px] items-start gap-12 px-6 lg:gap-16">
            <div className="flex flex-1 flex-col items-start">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Rede profissional
              </span>
              <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-heading lg:text-4xl">
                A rede que conecta todo o seu ecossistema de trabalho
              </h2>
              <p className="mt-5 max-w-md text-body leading-relaxed">
                Profissionais, empresas, fornecedores, colaboradores e parceiros
                conectados por afinidade de atuacao e objetivos.
                Relacoes que geram valor real.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {ecosystemStats.map((stat) => (
                  <div key={stat.label} className="rounded-[var(--radius-card)] border border-border bg-bg-card p-4">
                    <p className="text-2xl font-bold text-heading">{stat.value}</p>
                    <p className="mt-1 text-xs text-body">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile card preview */}
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="w-full max-w-[380px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card shadow-2xl shadow-primary/5">
                <div className="relative h-36 bg-gradient-to-br from-primary/80 via-primary/40 to-bg">
                  <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-bg-card bg-gradient-to-br from-primary to-accent text-lg font-bold text-white shadow-lg">
                    MC
                  </div>
                </div>
                <div className="px-6 pb-6 pt-12">
                  <h3 className="text-lg font-semibold text-heading">Mariana Costa</h3>
                  <p className="mt-0.5 text-sm text-body">UX Researcher, Sao Paulo, SP</p>
                  <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-button)] bg-success/10 px-3 py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm font-medium text-success">Voce se conectou com Mariana!</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-[var(--radius-tag)] bg-primary/10 px-3 py-1 text-xs font-medium text-accent">UX Research</span>
                    <span className="rounded-[var(--radius-tag)] bg-primary/10 px-3 py-1 text-xs font-medium text-accent">Figma</span>
                    <span className="rounded-[var(--radius-tag)] bg-primary/10 px-3 py-1 text-xs font-medium text-accent">Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rede social de quem constroi junto */}
        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                O conceito
              </span>
              <h2 className="mt-3 text-3xl font-bold text-heading lg:text-4xl">
                Rede social de quem constroi junto
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-body">
                Matching profissional baseado em afinidade real. Mesmas areas,
                objetivos alinhados. Cada conexao abre
                portas para algo concreto.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingExamples.map((ex) => (
                <div key={ex.title} className="rounded-[var(--radius-card)] border border-border bg-bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/60 to-primary text-white text-sm font-bold">
                      {ex.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">{ex.name}</p>
                      <p className="text-xs text-body">{ex.role}</p>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-heading mb-2">{ex.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{ex.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {ex.tags.map((tag) => (
                      <span key={tag} className="rounded-[var(--radius-tag)] bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-bg-card/30 py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-14 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Funcionalidades
              </span>
              <h2 className="mt-3 text-3xl font-bold text-heading lg:text-4xl">
                Tudo que voce precisa para crescer
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-body">
                Ferramentas pensadas para quem quer construir conexoes
                profissionais com proposito.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="group rounded-[var(--radius-card)] border border-border bg-bg-card p-6 transition-colors hover:border-border-strong">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-button)] bg-primary/10 text-accent transition-colors group-hover:bg-primary/20">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-heading">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-card px-8 py-16 text-center">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-heading lg:text-4xl">
                  Pronto para construir junto?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-body">
                  Junte-se a profissionais que estao transformando suas redes em
                  oportunidades reais.
                </p>
                <Link
                  href="/feed"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-gradient-to-br from-primary to-primary-hover px-8 text-base font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Criar minha conta
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-10">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-base font-semibold text-heading">Soci</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-body transition-colors hover:text-heading">Home</Link>
              <Link href="/como-funciona" className="text-sm text-body transition-colors hover:text-heading">Como funciona</Link>
              <Link href="/matching" className="text-sm text-body transition-colors hover:text-heading">Matching</Link>
              <Link href="/sobre" className="text-sm text-body transition-colors hover:text-heading">Sobre nos</Link>
              <Link href="/contato" className="text-sm text-body transition-colors hover:text-heading">Contato</Link>
              <Link href="/faq" className="text-sm text-body transition-colors hover:text-heading">FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacidade" className="text-xs text-placeholder transition-colors hover:text-body">Privacidade</Link>
              <Link href="/termos" className="text-xs text-placeholder transition-colors hover:text-body">Termos de Uso</Link>
              <span className="text-xs text-placeholder">2026 Soci. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// ==================== DATA ====================

const ecosystemStats = [
  { value: "100%", label: "Matching por afinidade" },
  { value: "3 acoes", label: "Seguir, Curtir ou Passar" },
  { value: "Ligas", label: "Comunidades tematicas" },
  { value: "27 UFs", label: "Cobertura nacional" },
];

const ecosystemPoints = [
  {
    title: "Fornecedores e prestadores",
    description: "Encontre quem fornece servicos e produtos para o seu setor.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Colaboradores e talentos",
    description: "Profissionais qualificados para integrar equipes e projetos.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Parceiros estrategicos",
    description: "Empresas e profissionais que complementam sua oferta.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const matchingExamples = [
  {
    initials: "RS",
    name: "Renata Silva",
    role: "Product Designer",
    title: "Parceria de design",
    description: "Encontrou um time de desenvolvimento front-end atraves do matching por areas complementares.",
    tags: ["UI Design", "Figma", "Design System"],
  },
  {
    initials: "LA",
    name: "Lucas Almeida",
    role: "CTO, Startup",
    title: "Novo fornecedor de cloud",
    description: "Conectou-se com um consultor de infraestrutura que otimizou os custos em 40%.",
    tags: ["DevOps", "AWS", "Kubernetes"],
  },
  {
    initials: "CM",
    name: "Camila Mendes",
    role: "Head de Marketing",
    title: "Rede de criadores",
    description: "Montou uma liga de profissionais de conteudo e conseguiu parceiros para campanhas.",
    tags: ["Marketing Digital", "SEO", "Growth"],
  },
];

const features = [
  {
    title: "Explorar",
    description: "Descubra profissionais por swipe inteligente. Filtre por area e afinidade.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    title: "Feed profissional",
    description: "Compartilhe projetos e conquistas. Seu portfolio vivo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
  {
    title: "Ligas",
    description: "Comunidades tematicas para trocar conhecimento no seu nicho.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Chat direto",
    description: "Converse com suas conexoes em tempo real, direto ao ponto.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];
