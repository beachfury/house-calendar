import React from "react";
import { cn } from "@/lib/utils"; // optional, or just use className manually

export function Button({
  children,
  className = "",
  onClick,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "secondary";
  size?: "default" | "icon";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-black text-white hover:bg-neutral-800",
    ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
    secondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
  };

  const sizes = {
    default: "h-9 px-4 text-sm",
    icon: "h-9 w-9"
  };

  return (
    <button
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
