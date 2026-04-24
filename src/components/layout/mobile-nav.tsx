"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/buscar", label: "Buscar", icon: Search },
  { href: "/explorar", label: "Explorar", icon: Compass },
  { href: "/conexoes", label: "Conexoes", icon: Users },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-bg-sidebar py-2 lg:hidden">
      {mobileItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 text-[10px]",
              isActive ? "text-accent" : "text-placeholder"
            )}
          >
            <Icon size={20} strokeWidth={1.5} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
