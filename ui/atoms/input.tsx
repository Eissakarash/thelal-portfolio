import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "relative items-start px-4 bg-transparent text-[#282828] h-[50px]  border  max-lg:pr-5 flex disabled:cursor-not-allowed text-justify w-full disabled:opacity-50 text-base focus-visible:outline-primary outline-4",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
      ghost: {
        true: "border-none bg-transparent border-0 text-primary font-bold ",
      },
      size: {
        lg: "sm:text-[16px] px-5 py-[8px] text-[14px]",
      },
    },
  }
);
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  label?: string;
  startComponent?: React.ReactElement;
  endComponent?: React.ReactElement;
  isError?: string | boolean | null | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startComponent,
      endComponent,
      name,
      label,
      error,
      size,
      isError,
      ghost,
      ...props
    },
    ref
  ) => {
    const [currantType, setCurrantType] = React.useState(type);
    return (
      <section className={cn("relative flex w-full flex-1 flex-col")}>
        {label && (
          <label htmlFor={name} className="pb-2 text-[16px] font-bold">
            {label}
          </label>
        )}
        {type === "password" && (
          <div className="absolute z-10 -translate-y-1/2 top-1/2 end-2">
            <button type="button" className="focus:outline-none">
              {currantType === "password" ? (
                <EyeOff
                  className="mt-1 fill-natural size-8"
                  onClick={() => setCurrantType("text")}
                />
              ) : (
                <Eye
                  className="mt-1 stroke-natural size-8"
                  onClick={() => setCurrantType("password")}
                />
              )}
            </button>
          </div>
        )}
        <div className="relative flex">
          {endComponent &&
            React.cloneElement(endComponent, {
              className: "h-5 ms-2 absolute top-[40%] translate-y-1/2",
            })}

          <input
            id={name}
            type={currantType}
            className={cn(
              inputVariants({ className, size, error, ghost, ...props }),
              {
                "!ps-8": startComponent,
                "!border-red-500": isError,
              }
            )}
            ref={ref}
            {...props}
          />
          {startComponent &&
            React.cloneElement(startComponent, {
              className: "h-5 ms-2 absolute top-1/2 -translate-y-1/2",
            })}
        </div>
        <p className="w-full m-0 text-sm text-red-500 text-start">{isError}</p>
      </section>
    );
  }
);
Input.displayName = "Input";

export { Input };
