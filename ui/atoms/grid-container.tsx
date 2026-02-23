import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const gridContainerVariants = cva("gap-4 grid  grid-cols-1 items-start", {
  variants: {
    variant: {
      lg: "gap-4 lg:grid-cols-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5",
      default:
        "gap-4 lg:grid-cols-5 grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-7",
      "2xl": "gap-4 lg:grid-cols-8 lg:gap-6 xl:grid-cols-9",
      partial_default:
        "gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6 xl:grid-cols-5",
      partial_xs: "gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6 xl:grid-cols-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface GridContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridContainerVariants> {}

const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={gridContainerVariants({ variant, className })}
        {...props}
      />
    );
  }
);

GridContainer.displayName = "GridContainer";

export { GridContainer };
