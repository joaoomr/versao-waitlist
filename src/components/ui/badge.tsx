import { cn } from "@/lib/utils";

type BadgeVariant = "interest" | "expertise" | "objective" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  interest: "bg-primary/10 border-primary/20 text-accent",
  expertise: "bg-success/8 border-success/20 text-swipe-green",
  objective: "bg-warning/8 border-warning/20 text-warning",
  default: "bg-bg-card-alt border-border text-body",
};

export function Badge({
  children,
  variant = "default",
  removable,
  onRemove,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-tag)] border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="opacity-50 hover:opacity-100 transition-opacity text-current"
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
}
