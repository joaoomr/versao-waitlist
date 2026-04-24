import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato — Soci",
  description:
    "Entre em contato com a equipe da Soci. Duvidas, sugestoes, suporte tecnico ou parcerias.",
  openGraph: {
    title: "Contato — Soci",
    description: "Fale com a equipe da Soci.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
