"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button } from "./button";
import { openWaitlist } from "@/lib/waitlist";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface WaitlistCtaButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export const WaitlistCtaButton = forwardRef<
  HTMLButtonElement,
  WaitlistCtaButtonProps
>(({ children, ...props }, ref) => {
  return (
    <Button ref={ref} onClick={openWaitlist} {...props}>
      {children}
    </Button>
  );
});

WaitlistCtaButton.displayName = "WaitlistCtaButton";
