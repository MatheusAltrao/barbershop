import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        CONFIRMADO:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        PENDENTE:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        CANCELADO:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        FINALIZADO:
          "border-transparent bg-gray-500 text-white hover:bg-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type StatusProps =
  | "CONFIRMADO"
  | "PENDENTE"
  | "CANCELADO"
  | "FINALIZADO";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
