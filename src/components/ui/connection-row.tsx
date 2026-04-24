import { MessageSquare, User, UserMinus } from "lucide-react";
import { Avatar } from "./avatar";

interface ConnectionRowProps {
  name: string;
  subtitle: string;
  avatarShape?: "circle" | "square";
}

export function ConnectionRow({ name, subtitle, avatarShape = "circle" }: ConnectionRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card px-4 py-4">
      <Avatar name={name} size="md" shape={avatarShape} />
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-heading">{name}</span>
        <span className="text-xs text-body">{subtitle}</span>
      </div>
      <div className="flex gap-2">
        <button className="text-placeholder hover:text-heading transition-colors" title="Ver perfil">
          <User size={18} strokeWidth={1.5} />
        </button>
        <button className="text-placeholder hover:text-heading transition-colors" title="Chat">
          <MessageSquare size={18} strokeWidth={1.5} />
        </button>
        <button className="text-error/70 hover:text-error transition-colors" title="Desfazer conexao">
          <UserMinus size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
