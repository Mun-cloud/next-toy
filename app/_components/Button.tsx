"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "bg-white w-fit text-black px-3 py-1 rounded-md mx-auto disabled:bg-gray-600",
        className
      )}
      {...rest}
      disabled={pending}
    >
      {children}
    </button>
  );
};

export default Button;
