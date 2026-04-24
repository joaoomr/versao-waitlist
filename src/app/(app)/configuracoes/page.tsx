import { User, Bell, MessageSquare, Trash2, LogOut, Star, Settings } from "lucide-react";
import { Avatar, Card, Button } from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { getAccountInfo } from "@/lib/actions/settings-actions";

export default async function ConfiguracoesPage() {
  const result = await getAccountInfo();

  if (!result.success || !result.data) {
    return <EmptyState icon={Settings} title="Nao autenticado" description="Faca login." />;
  }

  const account = result.data;

  const memberSince = account.createdAt
    ? new Date(account.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-heading">Configuracoes</h1>

      {/* Conta */}
      <Card elevated>
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-accent" strokeWidth={1.5} />
          <h2 className="text-base font-semibold text-heading">Conta</h2>
        </div>
        <div className="flex items-center gap-4">
          <Avatar name={account.name} size="md" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-heading">{account.name}</span>
            <span className="text-sm text-body">{account.email}</span>
            {memberSince && <span className="text-xs text-placeholder">Membro desde {memberSince}</span>}
          </div>
        </div>
      </Card>

      {/* Notificacoes */}
      <Card elevated>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-accent" strokeWidth={1.5} />
          <h2 className="text-base font-semibold text-heading">Notificacoes</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-heading">Receber notificacoes</p>
            <p className="text-xs text-body">Curtidas, comentarios, conexoes e ligas</p>
          </div>
          <div className="flex h-6 w-11 items-center rounded-full px-0.5 justify-end bg-primary">
            <div className="h-5 w-5 rounded-full bg-white" />
          </div>
        </div>
      </Card>

      {/* Feedback */}
      <Card elevated>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-accent" strokeWidth={1.5} />
          <h2 className="text-base font-semibold text-heading">Feedback</h2>
        </div>
        <div className="mb-4 h-16 rounded-[var(--radius-input)] border border-border bg-bg-card-alt p-3 text-sm text-placeholder">
          Compartilhe sua experiencia ou sugestao...
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className="text-placeholder"
              />
            ))}
          </div>
          <Button variant="secondary" size="sm">Enviar feedback</Button>
        </div>
      </Card>

      {/* Danger zone */}
      <div className="flex gap-3">
        <Button variant="danger" className="flex-1">
          <Trash2 size={16} />
          Excluir conta
        </Button>
        <Button variant="danger" className="flex-1 opacity-70">
          <LogOut size={16} />
          Sair
        </Button>
      </div>
    </div>
  );
}
