import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
