import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidade — Soci",
  description:
    "Saiba como a Soci coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-20">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        Legal
      </span>
      <h1 className="mt-4 text-4xl font-bold leading-tight text-heading">
        Politica de Privacidade
      </h1>
      <p className="mt-3 text-sm text-placeholder">
        Ultima atualizacao: 27 de marco de 2026
      </p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-body">
        {/* 1 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            1. Introducao
          </h2>
          <p className="mt-3">
            A Soci (&quot;nos&quot;, &quot;nosso&quot; ou &quot;plataforma&quot;)
            valoriza a privacidade dos seus usuarios. Esta Politica de
            Privacidade descreve como coletamos, utilizamos, armazenamos e
            protegemos suas informacoes pessoais ao utilizar nossos servicos,
            em conformidade com a Lei Geral de Protecao de Dados Pessoais
            (LGPD — Lei n. 13.709/2018).
          </p>
          <p className="mt-2">
            Ao criar uma conta ou utilizar a plataforma, voce concorda com as
            praticas descritas nesta politica. Caso nao concorde, recomendamos
            que nao utilize o servico.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            2. Dados que coletamos
          </h2>
          <p className="mt-3">
            Coletamos apenas os dados necessarios para o funcionamento da
            plataforma:
          </p>
          <h3 className="mt-4 font-medium text-heading">
            2.1 Dados fornecidos por voce
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Nome completo</li>
            <li>Endereco de email</li>
            <li>Senha (armazenada de forma criptografada)</li>
            <li>
              Informacoes de perfil: profissao, bio, habilidades, localizacao,
              experiencia, empresa atual
            </li>
            <li>Conteudo publicado: posts, comentarios, mensagens</li>
            <li>Imagens de perfil e publicacoes</li>
          </ul>
          <h3 className="mt-4 font-medium text-heading">
            2.2 Dados coletados automaticamente
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Dados de uso: paginas acessadas, acoes realizadas na plataforma</li>
            <li>Dados de dispositivo: tipo de navegador, sistema operacional</li>
            <li>Endereco IP (para seguranca e prevencao de abuso)</li>
            <li>Cookies essenciais para autenticacao e preferencias</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            3. Como utilizamos seus dados
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Criar e manter sua conta na plataforma</li>
            <li>Exibir seu perfil para outros usuarios</li>
            <li>Calcular compatibilidade entre perfis (matching)</li>
            <li>Permitir comunicacao entre conexoes (chat)</li>
            <li>Enviar notificacoes relevantes sobre atividade na plataforma</li>
            <li>Enviar emails transacionais (recuperacao de senha)</li>
            <li>Melhorar e personalizar a experiencia do usuario</li>
            <li>Garantir a seguranca da plataforma e prevenir abusos</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            4. Compartilhamento de dados
          </h2>
          <p className="mt-3">
            Nao vendemos seus dados pessoais. Podemos compartilha-los apenas
            nas seguintes situacoes:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Com outros usuarios:</strong> informacoes do seu perfil
              publico (nome, profissao, bio, habilidades) sao visiveis para
              outros usuarios logados
            </li>
            <li>
              <strong>Com prestadores de servico:</strong> utilizamos servicos
              terceirizados para hospedagem, banco de dados, envio de email e
              armazenamento de arquivos, todos sob acordos de confidencialidade
            </li>
            <li>
              <strong>Por obrigacao legal:</strong> quando exigido por lei,
              ordem judicial ou autoridade competente
            </li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            5. Armazenamento e seguranca
          </h2>
          <p className="mt-3">
            Seus dados sao armazenados em servidores seguros com criptografia
            em transito (HTTPS/TLS). Senhas sao criptografadas com algoritmo
            bcrypt e nunca armazenadas em texto puro.
          </p>
          <p className="mt-2">
            Adotamos medidas tecnicas e organizacionais para proteger seus dados
            contra acesso nao autorizado, perda ou alteracao, incluindo:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Criptografia de senhas com bcrypt</li>
            <li>Conexoes seguras via HTTPS</li>
            <li>Headers de seguranca (HSTS, X-Frame-Options, CSP)</li>
            <li>Autenticacao obrigatoria para acesso a dados protegidos</li>
            <li>Validacao e sanitizacao de todas as entradas do usuario</li>
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            6. Seus direitos (LGPD)
          </h2>
          <p className="mt-3">
            Em conformidade com a LGPD, voce tem os seguintes direitos sobre
            seus dados pessoais:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Acesso:</strong> solicitar quais dados pessoais temos
              sobre voce
            </li>
            <li>
              <strong>Correcao:</strong> corrigir dados incompletos, inexatos
              ou desatualizados
            </li>
            <li>
              <strong>Exclusao:</strong> solicitar a exclusao dos seus dados
              pessoais
            </li>
            <li>
              <strong>Portabilidade:</strong> solicitar a transferencia dos
              seus dados para outro servico
            </li>
            <li>
              <strong>Revogacao de consentimento:</strong> retirar seu
              consentimento a qualquer momento
            </li>
            <li>
              <strong>Informacao:</strong> saber com quem seus dados sao
              compartilhados
            </li>
          </ul>
          <p className="mt-3">
            Para exercer qualquer desses direitos, entre em contato pelo email{" "}
            <a
              href="mailto:suporte.soci@gmail.com"
              className="text-accent underline"
            >
              suporte.soci@gmail.com
            </a>
            . Responderemos em ate 15 dias uteis.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            7. Cookies
          </h2>
          <p className="mt-3">
            Utilizamos cookies essenciais para manter sua sessao ativa e
            garantir o funcionamento da plataforma. Nao utilizamos cookies de
            rastreamento publicitario.
          </p>
          <p className="mt-2">
            Cookies de analytics podem ser utilizados para entender o uso da
            plataforma de forma agregada e anonima, sempre respeitando sua
            privacidade.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            8. Retencao de dados
          </h2>
          <p className="mt-3">
            Seus dados pessoais sao mantidos enquanto sua conta estiver ativa.
            Ao solicitar a exclusao da conta, seus dados serao removidos em ate
            30 dias, exceto quando houver obrigacao legal de retencao.
          </p>
          <p className="mt-2">
            Mensagens enviadas em conversas podem ser mantidas para a outra
            parte da conversa, mesmo apos a exclusao da sua conta.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            9. Alteracoes nesta politica
          </h2>
          <p className="mt-3">
            Podemos atualizar esta politica periodicamente. Alteracoes
            significativas serao comunicadas por email ou notificacao na
            plataforma. A data da ultima atualizacao sera sempre exibida no
            topo deste documento.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-lg font-semibold text-heading">
            10. Contato
          </h2>
          <p className="mt-3">
            Para duvidas, solicitacoes ou reclamacoes sobre esta politica ou
            sobre o tratamento dos seus dados pessoais:
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
