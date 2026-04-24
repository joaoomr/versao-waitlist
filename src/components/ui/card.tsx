import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className, elevated }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-bg-card p-5",
        elevated && "shadow-[var(--shadow-elevated)]",
        className
      )}
    >
      {children}
    </div>
  );
}
