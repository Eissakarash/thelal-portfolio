"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "ease-in-out  w-fit text-center border border-[#333] flex transition !px-4 py-2  duration-300 disabled:cursor-none items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary: "text-[#333] hover:bg-[#333] hover:text-white ",
        secondary: "hover:text-[#333] hover:bg-white bg-[#333] text-white",
        ghost: "hover:text-[#333] hover:bg-white bg-transparent text-[#333]",
        outline:
          "hover:text-[#333] hover:bg-white bg-transparent text-[#333] border-[#333]",
        danger: "hover:text-white hover:bg-red-500 bg-red-500 text-white",
      },
      animated: {
        true: "hover:-translate-y-1",
      },
      weight: {
        normal: "font-[400]",
        medium: "font-[500]",
        semibold: "font-[600]",
        bold: "font-[700]",
      },
      shadow: {
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      width: {
        full: "!w-full flex-1",
      },
      center: {
        true: "m-auto",
      },

      size: {
        xxs: "text-xs",
        normal: "!text-sm",
        sm: "text-[16px] ",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        xxl: "text-2xl",
      },
      isLoading: { true: "cursor-wait" },
    },
    defaultVariants: {
      variant: "primary",

      weight: "normal",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "button",
      as = "button",
      asChild = false,
      isLoading,

      width,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : as;

    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ className, width, ...props }))}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader className={cn("size-6 fill-current mx-auto")} />
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
