import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  className?: string;
  loading?:boolean;
  onClick?: () => void;
}

export function Button({
  variant,
  text,
  startIcon,
  endIcon,
  size,
  className,
  onClick,
  loading

}: ButtonProps) {
  const variantStyle = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-600",
  };

  const sizeStyle = {
    sm: "py-1 px-2",
    md: "py-2 px-3",
    lg: "py-4 px-6",
  };

  const defaultStyles =
    "rounded-md px-4 py-2 flex font-light items-center justify-center outline-none cursor-pointer  ";

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${variantStyle[variant]} ${sizeStyle[size]} ${defaultStyles} ${loading ? "opacity-50 hover:cursor-not-allowed " : null} ${className} `}
    >
      {startIcon ? <div className="pr-2">{startIcon}</div> : null}
      {text}
      {endIcon ? <div className="pr-2">{endIcon}</div> : null}
    </button>
  );
}
