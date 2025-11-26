import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge-floating transition-glass focus:outline-none focus:ring-2 focus:ring-primary/20",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border-primary/20",
        secondary:
          "bg-surface backdrop-blur-md text-foreground border-border",
        success:
          "badge-success",
        warning:
          "badge-warning",
        danger:
          "badge-danger",
        info:
          "badge-info",
        destructive:
          "badge-danger",
        outline:
          "bg-transparent border-border text-foreground hover:bg-surface hover:backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
