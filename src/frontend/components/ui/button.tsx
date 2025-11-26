import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-glass disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-glass shadow-glass hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20",
        destructive:
          "bg-destructive text-white rounded-glass shadow-glass hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-surface backdrop-blur-md rounded-glass hover:bg-surface-hover hover:border-border-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20",
        secondary:
          "bg-surface backdrop-blur-md border border-border text-foreground rounded-glass hover:bg-surface-hover hover:border-border-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20",
        ghost:
          "bg-transparent rounded-glass hover:bg-surface hover:backdrop-blur-md active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-4",
        sm: "h-8 rounded-glass gap-1.5 px-4 py-2 has-[>svg]:px-3 text-xs",
        lg: "h-12 rounded-glass-lg px-8 py-4 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-glass",
        "icon-sm": "size-8 rounded-glass",
        "icon-lg": "size-12 rounded-glass-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
