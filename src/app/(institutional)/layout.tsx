import Link from "next/link";
import { WaitlistCtaButton } from "@/components/ui";

export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navbar institucional */}
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
            <WaitlistCtaButton variant="secondary" size="sm">Entrar</WaitlistCtaButton>
            <WaitlistCtaButton size="sm">Criar conta</WaitlistCtaButton>
          </div>
        </div>
      </nav>

      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white">
              S
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
    </>
  );
}
