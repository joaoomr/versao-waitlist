import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — Soci",
  description:
    "Leia os termos e condicoes de uso da plataforma Soci.",
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        Legal
      </span>
      <h1 className="mt-4 text-4xl font-bold leading-tight text-heading">
        Termos de Uso
      </h1>
      <p className="mt-3 text-sm text-placeholder">
        Ultima atualizacao: 27 de marco de 2026
      </p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-body">
        {/* 1 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            1. Aceitacao dos termos
          </h2>
          <p className="mt-3">
            Ao criar uma conta ou utilizar a Soci (&quot;plataforma&quot;),
            voce concorda com estes Termos de Uso. Se nao concordar com
            qualquer parte destes termos, nao utilize o servico.
          </p>
          <p className="mt-2">
            A Soci reserva-se o direito de atualizar estes termos a qualquer
            momento. Alteracoes significativas serao comunicadas por email ou
            notificacao na plataforma.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            2. Descricao do servico
          </h2>
          <p className="mt-3">
            A Soci e uma plataforma de networking profissional que conecta
            pessoas dentro de ecossistemas de trabalho. O servico permite
            criar perfil profissional, descobrir e conectar-se com outros
            profissionais, participar de comunidades (ligas) e trocar
            mensagens com conexoes.
          </p>
          <p className="mt-2">
            A plataforma nao e um portal de empregos, marketplace de servicos
            ou rede social generica. Seu foco e exclusivamente em conexoes
            profissionais.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            3. Cadastro e conta
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              Voce deve fornecer informacoes verdadeiras e atualizadas no
              cadastro
            </li>
            <li>
              E necessario ter pelo menos 18 anos para criar uma conta
            </li>
            <li>
              Cada pessoa pode manter apenas uma conta na plataforma
            </li>
            <li>
              Voce e responsavel por manter a confidencialidade da sua senha
            </li>
            <li>
              A Soci pode suspender ou encerrar contas que violem estes termos
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            4. Uso aceitavel
          </h2>
          <p className="mt-3">Ao utilizar a Soci, voce concorda em:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Usar a plataforma para fins profissionais legitimos</li>
            <li>Respeitar outros usuarios em todas as interacoes</li>
            <li>Nao publicar conteudo ilegal, ofensivo, discriminatorio ou enganoso</li>
            <li>Nao usar a plataforma para spam, assedio ou solicicitacoes comerciais nao autorizadas</li>
            <li>Nao tentar acessar contas ou dados de outros usuarios</li>
            <li>Nao utilizar bots, scrapers ou outros meios automatizados</li>
            <li>Nao infringir direitos de propriedade intelectual de terceiros</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            5. Conteudo do usuario
          </h2>
          <p className="mt-3">
            Voce e responsavel por todo conteudo que publica na plataforma,
            incluindo posts, comentarios, mensagens e informacoes de perfil.
          </p>
          <p className="mt-2">
            Ao publicar conteudo na Soci, voce concede a plataforma uma
            licenca nao exclusiva para exibir esse conteudo dentro do servico.
            Essa licenca e revogada ao excluir o conteudo ou sua conta.
          </p>
          <p className="mt-2">
            A Soci pode remover conteudo que viole estes termos, sem aviso
            previo.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            6. Conexoes e interacoes
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Seguir:</strong> acao unilateral. Voce pode seguir
              qualquer usuario e deixar de seguir a qualquer momento
            </li>
            <li>
              <strong>Conexao:</strong> estabelecida quando dois usuarios se
              curtem mutuamente. Pode ser desfeita por qualquer uma das partes
            </li>
            <li>
              <strong>Mensagens:</strong> disponiveis apenas entre usuarios
              conectados
            </li>
            <li>
              <strong>Ligas:</strong> comunidades com regras proprias. O
              fundador pode gerenciar membros e conteudo
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            7. Propriedade intelectual
          </h2>
          <p className="mt-3">
            A marca Soci, logotipo, design, codigo-fonte e conteudo
            institucional sao propriedade da plataforma e protegidos por leis
            de propriedade intelectual.
          </p>
          <p className="mt-2">
            O uso da plataforma nao concede direitos sobre marcas, logos ou
            conteudo institucional da Soci.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            8. Limitacao de responsabilidade
          </h2>
          <p className="mt-3">
            A Soci e fornecida &quot;como esta&quot;. Nao garantimos
            disponibilidade ininterrupta, ausencia total de erros ou que o
            servico atendera todas as suas expectativas.
          </p>
          <p className="mt-2">
            A Soci nao se responsabiliza por:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Conteudo publicado por usuarios</li>
            <li>Interacoes entre usuarios fora da plataforma</li>
            <li>Perdas decorrentes de uso indevido da conta</li>
            <li>Indisponibilidade temporaria do servico</li>
          </ul>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            9. Encerramento de conta
          </h2>
          <p className="mt-3">
            Voce pode encerrar sua conta a qualquer momento. Ao encerrar, seus
            dados serao tratados conforme descrito na{" "}
            <a href="/privacidade" className="text-accent underline">
              Politica de Privacidade
            </a>
            .
          </p>
          <p className="mt-2">
            A Soci pode suspender ou encerrar contas que violem estes termos,
            com ou sem aviso previo, dependendo da gravidade da violacao.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            10. Disposicoes gerais
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              Estes termos sao regidos pelas leis da Republica Federativa do
              Brasil
            </li>
            <li>
              Eventuais disputas serao resolvidas no foro da comarca do
              domicilio do usuario
            </li>
            <li>
              A invalidade de qualquer clausula nao afeta as demais
            </li>
            <li>
              A tolerancia quanto a qualquer violacao nao implica ren&uacute;ncia
              ao direito
            </li>
          </ul>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            11. Contato
          </h2>
          <p className="mt-3">
            Para duvidas sobre estes termos:
          </p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:suporte.soci@gmail.com"
              className="text-accent underline"
            >
              suporte.soci@gmail.com
            </a>
          </p>
          <p className="mt-1">
            <strong>Pagina de contato:</strong>{" "}
            <a href="/contato" className="text-accent underline">
              soci-app.vercel.app/contato
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
