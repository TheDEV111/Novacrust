"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-4 rounded-[20px] font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 text-foreground hover:bg-gray-300 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
