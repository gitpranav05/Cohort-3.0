import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Button({
  variant,
  text,
  startIcon,
  endIcon,
  size,
  disabled,
  className,
  onClick,
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
    "rounded-md px-4 py-2 flex font-light items-center justify-center  outline-none   ";

  return (
    <button
      onClick={onClick}
      className={`${variantStyle[variant]} ${sizeStyle[size]} ${defaultStyles} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className} `}
    >
      {startIcon ? <div className="pr-2">{startIcon}</div> : null}
      {text}
      {endIcon ? <div className="pr-2">{endIcon}</div> : null}
    </button>
  );
}
