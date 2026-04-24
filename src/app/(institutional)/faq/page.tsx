"use client";

import { useState } from "react";
import Link from "next/link";

type Category = "geral" | "conta" | "conexoes" | "ligas" | "privacidade";

interface FaqItem {
  question: string;
  answer: string;
  category: Category;
}

const categories: { key: Category; label: string }[] = [
  { key: "geral", label: "Geral" },
  { key: "conta", label: "Conta e Perfil" },
  { key: "conexoes", label: "Conexoes" },
  { key: "ligas", label: "Ligas" },
  { key: "privacidade", label: "Privacidade" },
];

const faqItems: FaqItem[] = [
  {
    question: "O que e a Soci?",
    answer:
      "A Soci e uma rede social profissional que conecta todo o ecossistema de trabalho ao seu redor. Diferente de plataformas tradicionais, a Soci mapeia conexoes diretas e indiretas — de gerentes a fornecedores, de freelancers a fabricas — para que voce descubra profissionais relevantes e construa relacoes de trabalho significativas.",
    category: "geral",
  },
  {
    question: "A Soci e uma plataforma de vagas?",
    answer:
      "Nao. A Soci nao e um portal de empregos. Nosso foco e conectar profissionais dentro de ecossistemas de trabalho, facilitando colaboracoes, parcerias e networking estruturado. Embora conexoes feitas na plataforma possam gerar oportunidades, nosso objetivo principal e a construcao de relacoes profissionais.",
    category: "geral",
  },
  {
    question: "Como funciona o sistema de conexoes?",
    answer:
      "Na Soci, voce explora perfis profissionais e pode realizar tres acoes: Passar, Seguir ou Curtir. Seguir e unilateral — voce acompanha o conteudo do profissional. Curtir e uma demonstracao de interesse mutuo: quando dois profissionais se curtem, uma Conexao e criada e o chat entre eles e liberado.",
    category: "conexoes",
  },
  {
    question: "O que sao Ligas?",
    answer:
      "Ligas sao comunidades profissionais dentro da Soci. Voce pode criar ou participar de Ligas para se conectar com grupos especificos — por exemplo, profissionais de uma mesma area, setor ou regiao. Cada Liga tem seu proprio perfil, com foto, descricao, area de atuacao e membros.",
    category: "ligas",
  },
  {
    question: "Quem pode usar a Soci?",
    answer:
      "Qualquer profissional pode usar a Soci. Nao importa seu cargo, area de atuacao ou nivel de experiencia — do estagiario ao diretor, do freelancer a empresa. A Soci e feita para todo o ecossistema de trabalho.",
    category: "geral",
  },
  {
    question: "Meus dados estao seguros na plataforma?",
    answer:
      "Sim. A Soci segue os mais altos padroes de seguranca e esta em conformidade com a LGPD (Lei Geral de Protecao de Dados). Seus dados sao criptografados, e voce tem controle total sobre quais informacoes compartilha no seu perfil.",
    category: "privacidade",
  },
  {
    question: "Como posso entrar em contato com o suporte?",
    answer:
      "Voce pode entrar em contato com nosso suporte pelo email suporte.soci@gmail.com ou pela pagina de Contato. Nosso horario de atendimento e de segunda a sexta, das 9h as 18h, e respondemos em ate 24 horas uteis.",
    category: "conta",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("geral");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const filteredItems = faqItems.filter(
    (item) => item.category === activeCategory
  );

  function toggleItem(index: number) {
    setOpenIndex(openIndex === index ? -1 : index);
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          FAQ
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl">
          Perguntas frequentes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-body">
          Encontre respostas para as duvidas mais comuns sobre a Soci, conexoes,
          Ligas e privacidade.
        </p>
      </section>

      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setOpenIndex(0);
            }}
            className={`rounded-badge px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-primary text-white"
                : "border border-border bg-card text-body hover:text-heading"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="mx-auto mt-12 max-w-3xl space-y-3 pb-16">
        {filteredItems.map((item, index) => (
          <div
            key={item.question}
            className="rounded-card border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="pr-4 text-base font-medium text-heading">
                {item.question}
              </span>
              <svg
                className={`h-5 w-5 shrink-0 text-placeholder transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="border-t border-border px-6 py-5">
                <p className="text-sm leading-relaxed text-body">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <p className="py-8 text-center text-body">
            Nenhuma pergunta encontrada nessa categoria.
          </p>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="rounded-card border border-border bg-card p-10 text-center">
          <h2 className="text-2xl font-bold text-heading">
            Nao encontrou o que procurava?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body">
            Nossa equipe de suporte esta pronta para ajudar voce com qualquer
            duvida.
          </p>
          <Link
            href="/contato"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-button bg-gradient-to-br from-primary to-primary-hover px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Falar com o suporte
          </Link>
        </div>
      </section>
    </div>
  );
}
