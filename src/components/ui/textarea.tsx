import { cn } from "@/lib/utils";
import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  charCount?: number;
  maxChars?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, charCount, maxChars, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "min-h-[80px] w-full rounded-[var(--radius-input)] border bg-bg-card-alt px-3.5 py-3 text-sm text-heading placeholder:text-placeholder transition-colors resize-none",
            "focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none",
            error ? "border-error" : "border-border",
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error && <p className="text-xs text-error">{error}</p>}
          {maxChars !== undefined && (
            <p className="text-xs text-placeholder ml-auto">
              {charCount ?? 0}/{maxChars}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
