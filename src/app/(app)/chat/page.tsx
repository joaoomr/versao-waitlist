import { Plus, MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] gap-0 -m-4 lg:-m-8">
      {/* Sidebar conversas */}
      <div className="w-[340px] flex-shrink-0 border-r border-border flex flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-heading">Chat</h1>
          <button className="text-placeholder hover:text-heading">
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button className="flex-1 py-2.5 text-center text-sm font-semibold text-heading bg-primary/8">
            Conexoes
          </button>
          <button className="flex-1 py-2.5 text-center text-sm text-placeholder">
            Ligas
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <EmptyState
            icon={MessageSquare}
            title="Nenhuma conversa ainda"
            description="Faca conexoes para comecar a conversar"
          />
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <EmptyState
          icon={MessageSquare}
          title="Selecione uma conversa"
          description="Escolha uma conversa na lista ao lado ou inicie uma nova conversa com suas conexoes"
        />
      </div>
    </div>
  );
}
