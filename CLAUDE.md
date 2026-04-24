# CLAUDE.md — Soci V2

## Identidade
- **Nome:** Soci (capital S, lowercase oci)
- **Slogan:** "Rede social de quem constroi junto"
- **UI:** Portugues brasileiro (pt-BR). Codigo em ingles.
- **Dark mode only.** Sem emojis na interface.

## Stack
- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS 4 + design tokens em globals.css
- Neon (serverless PostgreSQL) + Drizzle ORM
- Auth: bcrypt + JWT sessions (jose)
- Storage: Uploadthing
- Realtime: Ably (WebSocket)
- Framer Motion, Zustand, TanStack Query, React Hook Form + Zod
- Lucide React (icones thin line), date-fns
- PostHog + Microsoft Clarity (analytics)
- Resend (email), Vercel (deploy)

## Comandos
```bash
npm run dev        # dev server
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run verify     # typecheck + lint + build
```

## Design Tokens (globals.css)
- bg: #0A1628 | card: rgba(15,29,50,0.8) | sidebar: #0D1B2A
- border: rgba(27,82,153,0.25) | heading: #F1F5F9 | body: #94A3B8
- accent: #60A5FA | primary: #2563EB | primary-hover: #1D4ED8
- success: #22C55E | error: #EF4444 | warning: #F59E0B
- Card radius: 20px | Button: 12px | Input: 10px | Avatar: full/14px
- Font: Inter | H1: 36px bold | H2: 24px bold | Body: 14px | Caption: 12px

## Componentes UI (/src/components/ui/)
- Button (primary/secondary/ghost/danger, sm/md/lg)
- Input (label + error)
- Textarea (label + charCount)
- Avatar (xs/sm/md/lg/xl, circle/square, initials fallback)
- Badge (interest=azul, expertise=verde, objective=amarelo, removable)
- Card (elevated shadow)
- EmptyState (icon + title + description + action)

## Estrutura
```
src/app/(auth)/        — login, cadastro, recuperar-senha
src/app/(onboarding)/  — slides, completar-perfil
src/app/(app)/         — feed, buscar, explorar, conexoes, ligas, chat, perfil, etc.
src/components/ui/     — componentes base reutilizaveis
src/components/layout/ — sidebar, mobile-nav
src/lib/db/            — Drizzle client, schemas, migrations
src/lib/auth/          — auth helpers (session, password hashing)
src/lib/actions/       — server actions por dominio (12 arquivos)
src/lib/validators/    — schemas Zod
src/lib/storage/       — Uploadthing file routes
src/lib/realtime/      — Ably client + hooks
```

## Regras
- Sem emojis na UI
- Sem stock photography
- Icones: Lucide thin line only
- Bio: max 500 chars
- Swipe: Passa (red) / Seguir (blue) / Curtir (green)
- Liga avatar: quadrado arredondado (14px radius)

## Referencias
- Designs: Paper file 01KMV8KTXPVAVRW09TTV4XBVRW
- Specs: soci-v2-specs.md (na pasta Socy)
- Plano tecnico: soci-v2-planejamento-tecnico.md (na pasta Socy)
