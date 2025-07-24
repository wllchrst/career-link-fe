import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/95 focus-visible:ring-destructive/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:bg-secondary/95",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 active:bg-accent/95",
        success:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500/50",
        warning:
          "bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:bg-orange-700 focus-visible:ring-orange-500/50",
        outline:
          "border border-border bg-background shadow-sm hover:bg-muted hover:text-foreground active:bg-muted/80",
        "outline-destructive":
          "border border-destructive text-destructive bg-background shadow-sm hover:bg-destructive hover:text-destructive-foreground active:bg-destructive/90 focus-visible:ring-destructive/50",
        ghost: "hover:bg-muted hover:text-foreground active:bg-muted/80",
        "ghost-destructive":
          "text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/20 focus-visible:ring-destructive/50",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary/50",
        gradient:
          "bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        soft: "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 focus-visible:ring-primary/50",
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1 has-[>svg]:px-1.5",
        sm: "h-8 px-3 text-sm gap-1.5 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 px-6 text-base has-[>svg]:px-4",
        xl: "h-12 px-8 text-lg has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
