import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-8 w-8 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-24 w-24 text-2xl",
  xl: "h-32 w-32 text-4xl",
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-[14px]",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  src,
  name,
  size = "md",
  shape = "circle",
  className,
}: AvatarProps) {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "object-cover border-2 border-accent/30",
          sizeStyles[size],
          shapeStyles[shape],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-accent/30 font-semibold text-accent",
        sizeStyles[size],
        shapeStyles[shape],
        className
      )}
    >
      {initials}
    </div>
  );
}
