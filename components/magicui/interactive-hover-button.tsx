import { cn } from "@/lib/utils";
import { motion as m, MotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  motionProps?: MotionProps;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, color, motionProps, ...props }, ref) => {
  return (
    <m.button
      ref={ref as any}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...(props as any)}
      {...motionProps}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            `h-2 w-2 rounded-full transition-all duration-400 group-hover:scale-[100.8] ${color}`
          )}
        />
        <span className="inline-block transition-all duration-400 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-400 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </m.button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
