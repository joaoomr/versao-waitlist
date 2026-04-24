import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className
      )}
    >
      <Icon className="h-12 w-12 text-placeholder" strokeWidth={1.5} />
      <h3 className="text-lg font-semibold text-heading">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-body">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
