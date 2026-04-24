import type { Metadata } from "next";
import { WaitlistModal } from "@/components/waitlist-modal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soci — Rede social de quem constroi junto",
  description:
    "Conecte-se com todo o seu ecossistema profissional. Encontre profissionais, colaboradores, fornecedores e parceiros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {/* Listener global do evento soci:waitlist — precisa estar em todo
            layout (landing, institutional e app) */}
        <WaitlistModal />
      </body>
    </html>
  );
}
