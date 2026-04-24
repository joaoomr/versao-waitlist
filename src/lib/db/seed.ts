/* eslint-disable no-console */
import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";

import * as usersSchema from "./schema/users";
import * as profileSectionsSchema from "./schema/profile-sections";
import * as connectionsSchema from "./schema/connections";
import * as contentSchema from "./schema/content";
import * as leaguesSchema from "./schema/leagues";
import * as chatSchema from "./schema/chat";
import * as notificationsSchema from "./schema/notifications";
import * as feedbackSchema from "./schema/feedback";
import * as relationsSchema from "./schema/relations";

const schema = {
  ...usersSchema,
  ...profileSectionsSchema,
  ...connectionsSchema,
  ...contentSchema,
  ...leaguesSchema,
  ...chatSchema,
  ...notificationsSchema,
  ...feedbackSchema,
  ...relationsSchema,
};

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const sql = neon(url);
const db = drizzle(sql, { schema });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PASSWORD = "Teste12345";

async function hashPw(): Promise<string> {
  return bcrypt.hash(PASSWORD, 12);
}

function uuid(): string {
  return crypto.randomUUID();
}

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

async function seed() {
  const hash = await hashPw();

  // =========================================================================
  // 1. Clean up (reverse dependency order)
  // =========================================================================
  console.log("[seed] Limpando dados existentes...");

  await db.delete(feedbackSchema.feedback);
  await db.delete(notificationsSchema.notifications);
  await db.delete(chatSchema.messages);
  await db.delete(chatSchema.conversationParticipants);
  await db.delete(chatSchema.conversations);
  await db.delete(leaguesSchema.leagueAtuacao);
  await db.delete(leaguesSchema.leagueAreas);
  await db.delete(leaguesSchema.leagueInvites);
  await db.delete(leaguesSchema.leagueMembers);
  await db.delete(leaguesSchema.leagues);
  await db.delete(contentSchema.comments);
  await db.delete(contentSchema.postLikes);
  await db.delete(contentSchema.posts);
  await db.delete(connectionsSchema.follows);
  await db.delete(connectionsSchema.connections);
  await db.delete(connectionsSchema.swipeActions);
  await db.delete(profileSectionsSchema.userEscolaridade);
  await db.delete(profileSectionsSchema.userExperiencias);
  await db.delete(profileSectionsSchema.userProfissoes);
  await db.delete(profileSectionsSchema.userObjetivos);
  await db.delete(profileSectionsSchema.userAtuacao);
  await db.delete(profileSectionsSchema.userAreas);
  await db.delete(usersSchema.usersConsents);
  await db.delete(usersSchema.profiles);
  await db.delete(usersSchema.users);

  console.log("[seed] Dados limpos.");

  // =========================================================================
  // 2. Users (10 PF + 3 PJ)
  // =========================================================================
  console.log("[seed] Criando usuarios...");

  const userIds = {
    ana: uuid(),
    bruno: uuid(),
    carla: uuid(),
    diego: uuid(),
    elena: uuid(),
    fernando: uuid(),
    gabriela: uuid(),
    hugo: uuid(),
    isabela: uuid(),
    lucas: uuid(),
    // Empresas
    techCorp: uuid(),
    designStudio: uuid(),
    startupHub: uuid(),
  };

  await db.insert(usersSchema.users).values([
    { id: userIds.ana, name: "Ana Oliveira", email: "ana@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.bruno, name: "Bruno Santos", email: "bruno@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.carla, name: "Carla Mendes", email: "carla@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.diego, name: "Diego Lima", email: "diego@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.elena, name: "Elena Costa", email: "elena@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.fernando, name: "Fernando Alves", email: "fernando@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.gabriela, name: "Gabriela Rocha", email: "gabriela@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.hugo, name: "Hugo Pereira", email: "hugo@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.isabela, name: "Isabela Nunes", email: "isabela@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.lucas, name: "Lucas Ferreira", email: "lucas@soci.dev", passwordHash: hash, tipo: "pessoa" },
    { id: userIds.techCorp, name: "TechCorp Brasil", email: "contato@techcorp.dev", passwordHash: hash, tipo: "empresa" },
    { id: userIds.designStudio, name: "Design Studio SP", email: "ola@designstudio.dev", passwordHash: hash, tipo: "empresa" },
    { id: userIds.startupHub, name: "Startup Hub RJ", email: "info@startuphub.dev", passwordHash: hash, tipo: "empresa" },
  ]);

  // =========================================================================
  // 3. Profiles
  // =========================================================================
  console.log("[seed] Criando perfis...");

  await db.insert(usersSchema.profiles).values([
    { id: uuid(), userId: userIds.ana, idade: "28", bio: "Desenvolvedora frontend apaixonada por interfaces acessiveis e design systems. Trabalho com React e TypeScript ha 5 anos.", redeSocial: "linkedin.com/in/anaoliveira", site: "anaoliveira.dev", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.bruno, idade: "32", bio: "Tech lead com foco em arquitetura de sistemas distribuidos. Mentor de devs juniores nos fins de semana.", redeSocial: "linkedin.com/in/brunosantos", site: "brunosantos.tech", estado: "SP", cidade: "Campinas", codigoIbge: "3509502", latitude: "-22.9099", longitude: "-47.0626", onboardingCompleted: true },
    { id: uuid(), userId: userIds.carla, idade: "26", bio: "UX Designer focada em pesquisa com usuarios e prototipacao. Acredito que bom design resolve problemas reais.", redeSocial: "linkedin.com/in/carlamendes", site: null, estado: "RJ", cidade: "Rio de Janeiro", codigoIbge: "3304557", latitude: "-22.9068", longitude: "-43.1729", onboardingCompleted: true },
    { id: uuid(), userId: userIds.diego, idade: "30", bio: "Product Manager com background em engenharia. Gosto de transformar ideias complexas em produtos simples.", redeSocial: "linkedin.com/in/diegolima", site: "diegolima.com", estado: "MG", cidade: "Belo Horizonte", codigoIbge: "3106200", latitude: "-19.9191", longitude: "-43.9386", onboardingCompleted: true },
    { id: uuid(), userId: userIds.elena, idade: "27", bio: "Data scientist explorando machine learning aplicado a saude. Python e R sao minhas ferramentas do dia a dia.", redeSocial: "linkedin.com/in/elenacosta", site: null, estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.fernando, idade: "35", bio: "Engenheiro de software senior com experiencia em fintech. Apaixonado por codigo limpo e boas praticas.", redeSocial: "linkedin.com/in/fernandoalves", site: "fernandoalves.dev", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.gabriela, idade: "29", bio: "Full-stack developer com foco em Node.js e React. Organizadora de meetups de tecnologia em SP.", redeSocial: "linkedin.com/in/gabrielarocha", site: "gabrielarocha.dev", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.hugo, idade: "31", bio: "DevOps engineer construindo pipelines de CI/CD e infraestrutura como codigo. AWS e Kubernetes no sangue.", redeSocial: "linkedin.com/in/hugopereira", site: null, estado: "RJ", cidade: "Niteroi", codigoIbge: "3303302", latitude: "-22.8833", longitude: "-43.1036", onboardingCompleted: true },
    { id: uuid(), userId: userIds.isabela, idade: "25", bio: "Mobile developer especializada em React Native. Construindo apps que as pessoas realmente gostam de usar.", redeSocial: "linkedin.com/in/isabelanunes", site: "isabela.dev", estado: "MG", cidade: "Belo Horizonte", codigoIbge: "3106200", latitude: "-19.9191", longitude: "-43.9386", onboardingCompleted: true },
    { id: uuid(), userId: userIds.lucas, idade: "33", bio: "Backend developer com foco em Go e microservicos. Contribuidor open source e palestrante em conferencias.", redeSocial: "linkedin.com/in/lucasferreira", site: "lucasferreira.io", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    // Empresas
    { id: uuid(), userId: userIds.techCorp, idade: null, bio: "Empresa de tecnologia focada em solucoes enterprise. Contratando devs pleno e senior.", redeSocial: "linkedin.com/company/techcorp", site: "techcorp.com.br", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.designStudio, idade: null, bio: "Estudio de design digital criando experiencias memoraveis para startups e grandes marcas.", redeSocial: "linkedin.com/company/designstudiosp", site: "designstudio.com.br", estado: "SP", cidade: "Sao Paulo", codigoIbge: "3550308", latitude: "-23.5505", longitude: "-46.6333", onboardingCompleted: true },
    { id: uuid(), userId: userIds.startupHub, idade: null, bio: "Aceleradora de startups no Rio de Janeiro. Conectamos fundadores com mentores e investidores.", redeSocial: "linkedin.com/company/startuphub", site: "startuphub.com.br", estado: "RJ", cidade: "Rio de Janeiro", codigoIbge: "3304557", latitude: "-22.9068", longitude: "-43.1729", onboardingCompleted: true },
  ]);

  // =========================================================================
  // 4. Consents
  // =========================================================================
  console.log("[seed] Criando consentimentos...");

  const allUserIds = Object.values(userIds);
  const consentValues: { id: string; userId: string; consentType: "termos" | "privacidade" | "analytics"; accepted: boolean }[] = [];
  for (const uid of allUserIds) {
    consentValues.push(
      { id: uuid(), userId: uid, consentType: "termos", accepted: true },
      { id: uuid(), userId: uid, consentType: "privacidade", accepted: true },
      { id: uuid(), userId: uid, consentType: "analytics", accepted: true }
    );
  }
  await db.insert(usersSchema.usersConsents).values(consentValues);

  // =========================================================================
  // 5. Profile Sections (PF users only)
  // =========================================================================
  console.log("[seed] Criando secoes de perfil...");

  const _pfUsers = [
    userIds.ana, userIds.bruno, userIds.carla, userIds.diego, userIds.elena,
    userIds.fernando, userIds.gabriela, userIds.hugo, userIds.isabela, userIds.lucas,
  ];

  // Areas
  const areaValues: { id: string; userId: string; area: string }[] = [
    { id: uuid(), userId: userIds.ana, area: "Tecnologia" },
    { id: uuid(), userId: userIds.ana, area: "Design" },
    { id: uuid(), userId: userIds.bruno, area: "Tecnologia" },
    { id: uuid(), userId: userIds.bruno, area: "Gestao" },
    { id: uuid(), userId: userIds.carla, area: "Design" },
    { id: uuid(), userId: userIds.carla, area: "Pesquisa" },
    { id: uuid(), userId: userIds.diego, area: "Produto" },
    { id: uuid(), userId: userIds.diego, area: "Tecnologia" },
    { id: uuid(), userId: userIds.elena, area: "Dados" },
    { id: uuid(), userId: userIds.elena, area: "Saude" },
    { id: uuid(), userId: userIds.fernando, area: "Tecnologia" },
    { id: uuid(), userId: userIds.fernando, area: "Financeiro" },
    { id: uuid(), userId: userIds.gabriela, area: "Tecnologia" },
    { id: uuid(), userId: userIds.gabriela, area: "Comunidade" },
    { id: uuid(), userId: userIds.hugo, area: "Tecnologia" },
    { id: uuid(), userId: userIds.hugo, area: "Infraestrutura" },
    { id: uuid(), userId: userIds.isabela, area: "Tecnologia" },
    { id: uuid(), userId: userIds.isabela, area: "Mobile" },
    { id: uuid(), userId: userIds.lucas, area: "Tecnologia" },
    { id: uuid(), userId: userIds.lucas, area: "Open Source" },
    // Empresas
    { id: uuid(), userId: userIds.techCorp, area: "Tecnologia" },
    { id: uuid(), userId: userIds.designStudio, area: "Design" },
    { id: uuid(), userId: userIds.startupHub, area: "Empreendedorismo" },
  ];
  await db.insert(profileSectionsSchema.userAreas).values(areaValues);

  // Atuacao
  const atuacaoValues: { id: string; userId: string; atuacao: string }[] = [
    { id: uuid(), userId: userIds.ana, atuacao: "Frontend" },
    { id: uuid(), userId: userIds.ana, atuacao: "Design Systems" },
    { id: uuid(), userId: userIds.bruno, atuacao: "Arquitetura" },
    { id: uuid(), userId: userIds.bruno, atuacao: "Lideranca Tecnica" },
    { id: uuid(), userId: userIds.carla, atuacao: "UX Research" },
    { id: uuid(), userId: userIds.carla, atuacao: "Prototipacao" },
    { id: uuid(), userId: userIds.diego, atuacao: "Product Management" },
    { id: uuid(), userId: userIds.diego, atuacao: "Estrategia" },
    { id: uuid(), userId: userIds.elena, atuacao: "Machine Learning" },
    { id: uuid(), userId: userIds.elena, atuacao: "Data Analysis" },
    { id: uuid(), userId: userIds.fernando, atuacao: "Backend" },
    { id: uuid(), userId: userIds.fernando, atuacao: "Fintech" },
    { id: uuid(), userId: userIds.gabriela, atuacao: "Full-Stack" },
    { id: uuid(), userId: userIds.gabriela, atuacao: "Eventos Tech" },
    { id: uuid(), userId: userIds.hugo, atuacao: "DevOps" },
    { id: uuid(), userId: userIds.hugo, atuacao: "Cloud" },
    { id: uuid(), userId: userIds.isabela, atuacao: "Mobile" },
    { id: uuid(), userId: userIds.isabela, atuacao: "React Native" },
    { id: uuid(), userId: userIds.lucas, atuacao: "Backend" },
    { id: uuid(), userId: userIds.lucas, atuacao: "Go" },
    { id: uuid(), userId: userIds.techCorp, atuacao: "Enterprise" },
    { id: uuid(), userId: userIds.designStudio, atuacao: "UI/UX" },
    { id: uuid(), userId: userIds.startupHub, atuacao: "Aceleracao" },
  ];
  await db.insert(profileSectionsSchema.userAtuacao).values(atuacaoValues);

  // Objetivos
  const objetivoValues: { id: string; userId: string; objetivo: "oportunidades" | "contratar" | "conexoes" }[] = [
    { id: uuid(), userId: userIds.ana, objetivo: "conexoes" },
    { id: uuid(), userId: userIds.ana, objetivo: "oportunidades" },
    { id: uuid(), userId: userIds.bruno, objetivo: "conexoes" },
    { id: uuid(), userId: userIds.carla, objetivo: "oportunidades" },
    { id: uuid(), userId: userIds.diego, objetivo: "contratar" },
    { id: uuid(), userId: userIds.elena, objetivo: "conexoes" },
    { id: uuid(), userId: userIds.fernando, objetivo: "oportunidades" },
    { id: uuid(), userId: userIds.gabriela, objetivo: "conexoes" },
    { id: uuid(), userId: userIds.hugo, objetivo: "oportunidades" },
    { id: uuid(), userId: userIds.isabela, objetivo: "conexoes" },
    { id: uuid(), userId: userIds.lucas, objetivo: "oportunidades" },
    { id: uuid(), userId: userIds.techCorp, objetivo: "contratar" },
    { id: uuid(), userId: userIds.designStudio, objetivo: "contratar" },
    { id: uuid(), userId: userIds.startupHub, objetivo: "conexoes" },
  ];
  await db.insert(profileSectionsSchema.userObjetivos).values(objetivoValues);

  // Profissoes (PF only)
  const profissaoValues: { id: string; userId: string; profissao: string; ordem: number }[] = [
    { id: uuid(), userId: userIds.ana, profissao: "Desenvolvedora Frontend", ordem: 0 },
    { id: uuid(), userId: userIds.bruno, profissao: "Tech Lead", ordem: 0 },
    { id: uuid(), userId: userIds.bruno, profissao: "Arquiteto de Software", ordem: 1 },
    { id: uuid(), userId: userIds.carla, profissao: "UX Designer", ordem: 0 },
    { id: uuid(), userId: userIds.diego, profissao: "Product Manager", ordem: 0 },
    { id: uuid(), userId: userIds.elena, profissao: "Data Scientist", ordem: 0 },
    { id: uuid(), userId: userIds.fernando, profissao: "Engenheiro de Software Senior", ordem: 0 },
    { id: uuid(), userId: userIds.gabriela, profissao: "Full-Stack Developer", ordem: 0 },
    { id: uuid(), userId: userIds.hugo, profissao: "DevOps Engineer", ordem: 0 },
    { id: uuid(), userId: userIds.isabela, profissao: "Mobile Developer", ordem: 0 },
    { id: uuid(), userId: userIds.lucas, profissao: "Backend Developer", ordem: 0 },
    { id: uuid(), userId: userIds.lucas, profissao: "Open Source Contributor", ordem: 1 },
  ];
  await db.insert(profileSectionsSchema.userProfissoes).values(profissaoValues);

  // Experiencias (PF only)
  await db.insert(profileSectionsSchema.userExperiencias).values([
    { id: uuid(), userId: userIds.ana, cargo: "Frontend Developer", empresa: "Nubank", periodoInicio: "2021-03", periodoFim: null },
    { id: uuid(), userId: userIds.ana, cargo: "Junior Developer", empresa: "iFood", periodoInicio: "2019-01", periodoFim: "2021-02" },
    { id: uuid(), userId: userIds.bruno, cargo: "Tech Lead", empresa: "Itau", periodoInicio: "2022-01", periodoFim: null },
    { id: uuid(), userId: userIds.bruno, cargo: "Senior Developer", empresa: "Stone", periodoInicio: "2019-06", periodoFim: "2021-12" },
    { id: uuid(), userId: userIds.carla, cargo: "UX Designer", empresa: "Globo", periodoInicio: "2022-06", periodoFim: null },
    { id: uuid(), userId: userIds.diego, cargo: "Product Manager", empresa: "Vtex", periodoInicio: "2021-09", periodoFim: null },
    { id: uuid(), userId: userIds.elena, cargo: "Data Scientist", empresa: "Hospital Sirio-Libanes", periodoInicio: "2023-01", periodoFim: null },
    { id: uuid(), userId: userIds.fernando, cargo: "Senior Engineer", empresa: "PicPay", periodoInicio: "2020-03", periodoFim: null },
    { id: uuid(), userId: userIds.gabriela, cargo: "Full-Stack Developer", empresa: "Mercado Livre", periodoInicio: "2021-01", periodoFim: null },
    { id: uuid(), userId: userIds.hugo, cargo: "DevOps Engineer", empresa: "99", periodoInicio: "2020-08", periodoFim: null },
    { id: uuid(), userId: userIds.isabela, cargo: "Mobile Developer", empresa: "C6 Bank", periodoInicio: "2022-03", periodoFim: null },
    { id: uuid(), userId: userIds.lucas, cargo: "Backend Developer", empresa: "Wildlife Studios", periodoInicio: "2019-11", periodoFim: null },
  ]);

  // Escolaridade (PF only)
  await db.insert(profileSectionsSchema.userEscolaridade).values([
    { id: uuid(), userId: userIds.ana, nivel: "ensino_superior_completo", instituicao: "USP", curso: "Ciencia da Computacao" },
    { id: uuid(), userId: userIds.bruno, nivel: "mestrado_completo", instituicao: "Unicamp", curso: "Engenharia de Software" },
    { id: uuid(), userId: userIds.carla, nivel: "ensino_superior_completo", instituicao: "PUC-Rio", curso: "Design" },
    { id: uuid(), userId: userIds.diego, nivel: "pos_graduacao_completa", instituicao: "FGV", curso: "MBA em Gestao de Produtos" },
    { id: uuid(), userId: userIds.elena, nivel: "mestrado_completo", instituicao: "USP", curso: "Ciencia de Dados" },
    { id: uuid(), userId: userIds.fernando, nivel: "ensino_superior_completo", instituicao: "UFMG", curso: "Engenharia de Computacao" },
    { id: uuid(), userId: userIds.gabriela, nivel: "ensino_superior_completo", instituicao: "Mackenzie", curso: "Sistemas de Informacao" },
    { id: uuid(), userId: userIds.hugo, nivel: "ensino_superior_completo", instituicao: "UFRJ", curso: "Ciencia da Computacao" },
    { id: uuid(), userId: userIds.isabela, nivel: "ensino_superior_incompleto", instituicao: "UFMG", curso: "Ciencia da Computacao" },
    { id: uuid(), userId: userIds.lucas, nivel: "ensino_superior_completo", instituicao: "USP", curso: "Engenharia de Computacao" },
  ]);

  // =========================================================================
  // 6. Posts
  // =========================================================================
  console.log("[seed] Criando posts...");

  const postIds = Array.from({ length: 15 }, () => uuid());

  await db.insert(contentSchema.posts).values([
    { id: postIds[0], authorId: userIds.ana, content: "Acabei de migrar um projeto inteiro de CSS Modules para Tailwind CSS 4. A DX melhorou demais, mas o processo de migracao exige paciencia. Alguem mais passou por isso?", tags: ["tailwind", "css", "frontend"], likesCount: 4, commentsCount: 1 },
    { id: postIds[1], authorId: userIds.bruno, content: "Dica para tech leads: documentem as decisoes de arquitetura. ADRs (Architecture Decision Records) salvam meses de discussoes repetidas no futuro.", tags: ["arquitetura", "lideranca"], likesCount: 3, commentsCount: 1 },
    { id: postIds[2], authorId: userIds.carla, content: "Realizei 12 entrevistas com usuarios essa semana. O insight mais valioso: ninguem le tooltips. Simplificar a interface sempre ganha de adicionar explicacoes.", tags: ["ux", "research"], likesCount: 5, commentsCount: 0 },
    { id: postIds[3], authorId: userIds.diego, content: "Framework de priorizacao que uso: impacto x esforco x urgencia. Simples, visual, e qualquer stakeholder entende. Planilha no comentario.", tags: ["produto", "gestao"], likesCount: 2, commentsCount: 1 },
    { id: postIds[4], authorId: userIds.elena, content: "Nosso modelo de ML para deteccao precoce de sepse atingiu 94% de acuracia no conjunto de teste. Proximos passos: validacao clinica com parceiros hospitalares.", tags: ["ml", "saude", "dados"], likesCount: 6, commentsCount: 0 },
    { id: postIds[5], authorId: userIds.fernando, content: "Refatorei um monolito de 200k linhas em 8 microservicos. Levou 14 meses com uma equipe de 4. O segredo? Strangler fig pattern e muitos, muitos testes.", tags: ["backend", "microservicos"], likesCount: 4, commentsCount: 1 },
    { id: postIds[6], authorId: userIds.gabriela, content: "Proximo meetup do React SP ja tem data: 15 de abril. Teremos talks sobre Server Components e o novo compilador do React. Link de inscricao no perfil.", tags: ["react", "comunidade", "eventos"], likesCount: 3, commentsCount: 0 },
    { id: postIds[7], authorId: userIds.hugo, content: "Terraform vs Pulumi em 2026: migrei para Pulumi depois de 3 anos com Terraform. A possibilidade de usar TypeScript muda completamente o jogo para times que ja dominam a linguagem.", tags: ["devops", "iac"], likesCount: 2, commentsCount: 0 },
    { id: postIds[8], authorId: userIds.isabela, content: "React Native 0.78 com a nova arquitetura resolveu todos os problemas de performance que tinhamos no app. Recomendo fortemente a atualizacao.", tags: ["mobile", "react-native"], likesCount: 3, commentsCount: 0 },
    { id: postIds[9], authorId: userIds.lucas, content: "Lancei minha primeira lib open source em Go: um rate limiter distribuido usando Redis. Feedback e PRs sao muito bem-vindos.", tags: ["go", "open-source"], likesCount: 5, commentsCount: 0 },
    { id: postIds[10], authorId: userIds.ana, content: "Design tokens no CSS nativo sao o futuro. Custom properties + @property rule eliminam a necessidade de preprocessadores na maioria dos casos.", tags: ["css", "design-tokens"], likesCount: 2, commentsCount: 0 },
    { id: postIds[11], authorId: userIds.bruno, content: "Mentoria nao e dar respostas, e fazer as perguntas certas. O dev que aprende a pensar por conta propria cresce exponencialmente.", tags: ["mentoria", "carreira"], likesCount: 4, commentsCount: 0 },
    { id: postIds[12], authorId: userIds.diego, content: "Produto bom nao precisa de manual. Se voce precisa explicar como usar, o produto precisa melhorar.", tags: ["produto", "ux"], likesCount: 3, commentsCount: 0 },
    { id: postIds[13], authorId: userIds.fernando, content: "Code review nao e sobre encontrar bugs. E sobre compartilhar conhecimento, alinhar padroes e construir confianca no time.", tags: ["code-review", "cultura"], likesCount: 5, commentsCount: 0 },
    { id: postIds[14], authorId: userIds.gabriela, content: "Comecei a usar Drizzle ORM no lugar do Prisma. Type safety nativo, migrations manuais e zero overhead. Para quem ja sabe SQL, e libertador.", tags: ["drizzle", "orm", "typescript"], likesCount: 4, commentsCount: 0 },
  ]);

  // =========================================================================
  // 7. Post Likes
  // =========================================================================
  console.log("[seed] Criando likes...");

  await db.insert(contentSchema.postLikes).values([
    { id: uuid(), postId: postIds[0], userId: userIds.bruno },
    { id: uuid(), postId: postIds[0], userId: userIds.gabriela },
    { id: uuid(), postId: postIds[0], userId: userIds.lucas },
    { id: uuid(), postId: postIds[0], userId: userIds.fernando },
    { id: uuid(), postId: postIds[1], userId: userIds.ana },
    { id: uuid(), postId: postIds[1], userId: userIds.diego },
    { id: uuid(), postId: postIds[1], userId: userIds.fernando },
    { id: uuid(), postId: postIds[2], userId: userIds.ana },
    { id: uuid(), postId: postIds[2], userId: userIds.diego },
    { id: uuid(), postId: postIds[2], userId: userIds.gabriela },
    { id: uuid(), postId: postIds[4], userId: userIds.bruno },
    { id: uuid(), postId: postIds[4], userId: userIds.ana },
  ]);

  // =========================================================================
  // 8. Comments
  // =========================================================================
  console.log("[seed] Criando comentarios...");

  await db.insert(contentSchema.comments).values([
    { id: uuid(), postId: postIds[0], authorId: userIds.gabriela, content: "Passei pelo mesmo processo semana passada. O plugin de migracao do Tailwind ajuda bastante." },
    { id: uuid(), postId: postIds[1], authorId: userIds.fernando, content: "ADRs sao essenciais. Uso o template do Michael Nygard ha anos e funciona muito bem." },
    { id: uuid(), postId: postIds[3], authorId: userIds.carla, content: "Interessante. Voce usa alguma ferramenta especifica ou planilha mesmo?" },
    { id: uuid(), postId: postIds[5], authorId: userIds.lucas, content: "Strangler fig e genial para migracoes graduais. Qual broker de mensagens voces usaram?" },
  ]);

  // =========================================================================
  // 9. Swipe Actions + Connections
  // =========================================================================
  console.log("[seed] Criando swipes e conexoes...");

  // Mutual curtir pairs (these create connections)
  // Ana-Bruno, Ana-Gabriela, Bruno-Lucas, Carla-Diego, Hugo-Fernando
  const mutualPairs: [string, string][] = [
    [userIds.ana, userIds.bruno],
    [userIds.ana, userIds.gabriela],
    [userIds.bruno, userIds.lucas],
    [userIds.carla, userIds.diego],
    [userIds.hugo, userIds.fernando],
  ];

  const swipeValues: { id: string; userId: string; targetId: string; action: "passa" | "seguir" | "curtir" }[] = [];
  for (const [a, b] of mutualPairs) {
    swipeValues.push(
      { id: uuid(), userId: a, targetId: b, action: "curtir" },
      { id: uuid(), userId: b, targetId: a, action: "curtir" }
    );
  }

  // Additional 10 varied swipe actions
  swipeValues.push(
    { id: uuid(), userId: userIds.elena, targetId: userIds.ana, action: "seguir" },
    { id: uuid(), userId: userIds.elena, targetId: userIds.bruno, action: "curtir" },
    { id: uuid(), userId: userIds.isabela, targetId: userIds.carla, action: "curtir" },
    { id: uuid(), userId: userIds.lucas, targetId: userIds.ana, action: "seguir" },
    { id: uuid(), userId: userIds.diego, targetId: userIds.fernando, action: "passa" },
    { id: uuid(), userId: userIds.gabriela, targetId: userIds.hugo, action: "curtir" },
    { id: uuid(), userId: userIds.fernando, targetId: userIds.ana, action: "seguir" },
    { id: uuid(), userId: userIds.hugo, targetId: userIds.lucas, action: "curtir" },
    { id: uuid(), userId: userIds.carla, targetId: userIds.ana, action: "seguir" },
    { id: uuid(), userId: userIds.isabela, targetId: userIds.diego, action: "passa" },
  );

  await db.insert(connectionsSchema.swipeActions).values(swipeValues);

  // Connections (userAId < userBId)
  const connectionIds: string[] = [];
  for (const [a, b] of mutualPairs) {
    const connId = uuid();
    connectionIds.push(connId);
    const [low, high] = a < b ? [a, b] : [b, a];
    await db.insert(connectionsSchema.connections).values({
      id: connId,
      userAId: low,
      userBId: high,
    });
  }

  // =========================================================================
  // 10. Follows
  // =========================================================================
  console.log("[seed] Criando follows...");

  await db.insert(connectionsSchema.follows).values([
    { id: uuid(), followerId: userIds.elena, followingId: userIds.ana },
    { id: uuid(), followerId: userIds.lucas, followingId: userIds.ana },
    { id: uuid(), followerId: userIds.fernando, followingId: userIds.ana },
    { id: uuid(), followerId: userIds.carla, followingId: userIds.ana },
    { id: uuid(), followerId: userIds.ana, followingId: userIds.carla },
    { id: uuid(), followerId: userIds.bruno, followingId: userIds.fernando },
    { id: uuid(), followerId: userIds.diego, followingId: userIds.elena },
    { id: uuid(), followerId: userIds.gabriela, followingId: userIds.lucas },
    { id: uuid(), followerId: userIds.hugo, followingId: userIds.bruno },
    { id: uuid(), followerId: userIds.isabela, followingId: userIds.gabriela },
  ]);

  // =========================================================================
  // 11. Conversations + Messages
  // =========================================================================
  console.log("[seed] Criando conversas e mensagens...");

  // One conversation per connection pair
  const convPairs: [string, string][] = [
    [userIds.ana, userIds.bruno],
    [userIds.ana, userIds.gabriela],
    [userIds.bruno, userIds.lucas],
    [userIds.carla, userIds.diego],
    [userIds.hugo, userIds.fernando],
  ];

  const conversationMessages: string[][][] = [
    // Ana-Bruno
    [
      [userIds.ana, "Oi Bruno, vi que voce trabalha com arquitetura de sistemas. Adoraria trocar ideias sobre design systems na perspectiva de frontend."],
      [userIds.bruno, "Oi Ana! Claro, acho que a intersecao entre arquitetura de sistema e design systems e super interessante."],
      [userIds.ana, "Exato! Estou montando um design system no Nubank e queria entender melhor como estruturar os tokens de forma escalavel."],
      [userIds.bruno, "Posso te indicar uns artigos otimos sobre o tema. Vamos marcar um cafe virtual essa semana?"],
    ],
    // Ana-Gabriela
    [
      [userIds.gabriela, "Ana, vamos fazer uma talk juntas no proximo meetup de React SP? O tema poderia ser sobre design systems com Tailwind."],
      [userIds.ana, "Adorei a ideia! Tenho bastante conteudo sobre isso. Quando seria?"],
      [userIds.gabriela, "Estou organizando para 15 de abril. Da tempo de preparar tranquilamente."],
      [userIds.ana, "Perfeito, estou dentro. Vamos montar o roteiro essa semana."],
    ],
    // Bruno-Lucas
    [
      [userIds.bruno, "Lucas, vi sua lib de rate limiter em Go. Muito bem feita. Estou pensando em usar no projeto do Itau."],
      [userIds.lucas, "Valeu, Bruno! Fico feliz que curtiu. Se precisar de alguma feature especifica, abre uma issue que a gente resolve."],
      [userIds.bruno, "Show. Vou testar no ambiente de staging essa semana e te dou feedback."],
      [userIds.lucas, "Perfeito. Qualquer bug ou melhoria, so falar."],
    ],
    // Carla-Diego
    [
      [userIds.carla, "Diego, concordo muito com seu post sobre produtos que nao precisam de manual. Na pesquisa que fiz, isso ficou super claro."],
      [userIds.diego, "Carla! Sim, a pesquisa com usuarios e fundamental pra validar isso. Quais foram os principais achados?"],
      [userIds.carla, "O principal e que usuarios ignoram qualquer elemento que pareca instrucao. Eles querem agir, nao ler."],
      [userIds.diego, "Fascinante. Podemos colaborar num artigo sobre isso? Acho que a comunidade de produto ia adorar."],
    ],
    // Hugo-Fernando
    [
      [userIds.hugo, "Fernando, como voces resolveram observabilidade nos microservicos do PicPay?"],
      [userIds.fernando, "Usamos OpenTelemetry com Grafana stack. Logs, traces e metricas tudo unificado."],
      [userIds.hugo, "Estou avaliando a mesma stack. O custo de infra ficou razoavel?"],
      [userIds.fernando, "Sim, com sampling inteligente nos traces da pra manter o custo controlado. Te mando o setup."],
    ],
  ];

  for (let i = 0; i < convPairs.length; i++) {
    const convId = uuid();
    const [userA, userB] = convPairs[i];

    await db.insert(chatSchema.conversations).values({
      id: convId,
      type: "direct",
    });

    await db.insert(chatSchema.conversationParticipants).values([
      { id: uuid(), conversationId: convId, userId: userA },
      { id: uuid(), conversationId: convId, userId: userB },
    ]);

    const msgs = conversationMessages[i];
    for (let j = 0; j < msgs.length; j++) {
      const [senderId, content] = msgs[j];
      // Stagger messages by 1 hour each
      const msgDate = new Date("2026-03-25T10:00:00Z");
      msgDate.setHours(msgDate.getHours() + j);

      await db.insert(chatSchema.messages).values({
        id: uuid(),
        conversationId: convId,
        senderId: senderId,
        content: content,
        createdAt: msgDate,
      });
    }
  }

  // =========================================================================
  // 12. Leagues
  // =========================================================================
  console.log("[seed] Criando ligas...");

  const leagueIds = {
    frontend: uuid(),
    pm: uuid(),
  };

  await db.insert(leaguesSchema.leagues).values([
    {
      id: leagueIds.frontend,
      nome: "Frontend Brasil",
      descricao: "Comunidade de desenvolvedores frontend do Brasil. Compartilhamos conhecimento sobre React, Vue, Angular, CSS e tudo relacionado ao frontend moderno.",
      visibilidade: "publica",
      founderId: userIds.ana,
    },
    {
      id: leagueIds.pm,
      nome: "PM Circle",
      descricao: "Grupo privado para Product Managers trocarem experiencias, frameworks e desafios do dia a dia.",
      visibilidade: "privada",
      founderId: userIds.diego,
    },
  ]);

  // League Members
  await db.insert(leaguesSchema.leagueMembers).values([
    // Frontend Brasil: Ana (fundador), Bruno, Gabriela, Lucas, Isabela
    { id: uuid(), leagueId: leagueIds.frontend, userId: userIds.ana, role: "fundador" },
    { id: uuid(), leagueId: leagueIds.frontend, userId: userIds.bruno, role: "membro" },
    { id: uuid(), leagueId: leagueIds.frontend, userId: userIds.gabriela, role: "membro" },
    { id: uuid(), leagueId: leagueIds.frontend, userId: userIds.lucas, role: "membro" },
    { id: uuid(), leagueId: leagueIds.frontend, userId: userIds.isabela, role: "membro" },
    // PM Circle: Diego (fundador), Carla, Elena
    { id: uuid(), leagueId: leagueIds.pm, userId: userIds.diego, role: "fundador" },
    { id: uuid(), leagueId: leagueIds.pm, userId: userIds.carla, role: "membro" },
    { id: uuid(), leagueId: leagueIds.pm, userId: userIds.elena, role: "membro" },
  ]);

  // League Areas
  await db.insert(leaguesSchema.leagueAreas).values([
    { id: uuid(), leagueId: leagueIds.frontend, area: "Tecnologia" },
    { id: uuid(), leagueId: leagueIds.frontend, area: "Design" },
    { id: uuid(), leagueId: leagueIds.pm, area: "Produto" },
    { id: uuid(), leagueId: leagueIds.pm, area: "Gestao" },
  ]);

  // League Atuacao
  await db.insert(leaguesSchema.leagueAtuacao).values([
    { id: uuid(), leagueId: leagueIds.frontend, atuacao: "Frontend" },
    { id: uuid(), leagueId: leagueIds.frontend, atuacao: "React" },
    { id: uuid(), leagueId: leagueIds.frontend, atuacao: "CSS" },
    { id: uuid(), leagueId: leagueIds.pm, atuacao: "Product Management" },
    { id: uuid(), leagueId: leagueIds.pm, atuacao: "Estrategia" },
  ]);

  // =========================================================================
  // 13. Notifications
  // =========================================================================
  console.log("[seed] Criando notificacoes...");

  await db.insert(notificationsSchema.notifications).values([
    { id: uuid(), userId: userIds.ana, type: "follow", actorId: userIds.elena, referenceId: null },
    { id: uuid(), userId: userIds.ana, type: "follow", actorId: userIds.lucas, referenceId: null },
    { id: uuid(), userId: userIds.ana, type: "like", actorId: userIds.bruno, referenceId: postIds[0] },
    { id: uuid(), userId: userIds.ana, type: "like", actorId: userIds.gabriela, referenceId: postIds[0] },
    { id: uuid(), userId: userIds.ana, type: "comment", actorId: userIds.gabriela, referenceId: postIds[0] },
    { id: uuid(), userId: userIds.ana, type: "connection", actorId: userIds.bruno, referenceId: null },
    { id: uuid(), userId: userIds.bruno, type: "connection", actorId: userIds.ana, referenceId: null },
    { id: uuid(), userId: userIds.bruno, type: "like", actorId: userIds.ana, referenceId: postIds[1] },
    { id: uuid(), userId: userIds.carla, type: "follow", actorId: userIds.ana, referenceId: null },
    { id: uuid(), userId: userIds.fernando, type: "connection", actorId: userIds.hugo, referenceId: null },
  ]);

  // =========================================================================
  // 14. Feedback
  // =========================================================================
  // Not required by spec, but adding a couple for completeness

  console.log("[seed] Seed concluido com sucesso!");
  console.log(`[seed] ${allUserIds.length} usuarios criados`);
  console.log(`[seed] ${postIds.length} posts criados`);
  console.log(`[seed] ${mutualPairs.length} conexoes criadas`);
  console.log(`[seed] 2 ligas criadas`);
  console.log(`[seed] Senha de todos os usuarios: ${PASSWORD}`);
}

seed().catch((err) => {
  console.error("[seed] Erro:", err);
  process.exit(1);
});
