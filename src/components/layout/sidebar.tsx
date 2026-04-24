"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Compass,
  Users,
  UsersRound,
  MessageSquare,
  Bell,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { logout } from "@/lib/actions/auth-actions";

interface SidebarProps {
  userName?: string;
  userImage?: string | null;
  unreadNotifications?: number;
  unreadMessages?: number;
}

const navItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/buscar", label: "Buscar", icon: Search },
  { href: "/explorar", label: "Explorar", icon: Compass },
  { href: "/conexoes", label: "Conexoes", icon: Users },
  { href: "/ligas", label: "Ligas", icon: UsersRound },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/notificacoes", label: "Notificacoes", icon: Bell },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function Sidebar({
  userName = "Usuario",
  userImage,
  unreadNotifications = 0,
  unreadMessages = 0,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-border bg-bg-sidebar lg:flex">
      <div className="flex flex-1 flex-col gap-2 px-4 py-6">
        {/* Logo */}
        <Link
          href="/feed"
          className="mb-4 flex items-center gap-3 px-3 py-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-lg font-bold text-white">
            S
          </div>
          <span className="text-xl font-bold text-heading">Soci</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            const showBadge =
              (item.href === "/notificacoes" && unreadNotifications > 0) ||
              (item.href === "/chat" && unreadMessages > 0);
            const badgeCount =
              item.href === "/notificacoes"
                ? unreadNotifications
                : unreadMessages;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-[10px] px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/12 text-accent font-medium"
                    : "text-placeholder hover:text-heading hover:bg-bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </div>
                {showBadge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-[10px] bg-error px-1 text-[11px] font-semibold text-white">
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2.5 border-t border-border px-4 py-3">
        <Avatar name={userName} src={userImage} size="sm" />
        <span className="flex-1 truncate text-sm font-medium text-heading">
          {userName}
        </span>
        <Link
          href="/configuracoes"
          className="text-placeholder hover:text-heading transition-colors"
          title="Configuracoes"
        >
          <Settings size={18} strokeWidth={1.5} />
        </Link>
        <button
          onClick={() => logout()}
          className="text-placeholder hover:text-error transition-colors"
          title="Sair"
        >
          <LogOut size={18} strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
}
