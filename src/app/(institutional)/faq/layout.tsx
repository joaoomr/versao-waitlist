import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Soci",
  description:
    "Perguntas frequentes sobre a Soci. Tire suas duvidas sobre conexoes, Ligas, privacidade e muito mais.",
  openGraph: {
    title: "FAQ — Soci",
    description:
      "Perguntas frequentes sobre a Soci. Tire suas duvidas sobre a plataforma.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
