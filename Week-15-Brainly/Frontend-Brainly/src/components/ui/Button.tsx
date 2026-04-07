import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  onClick: () => void;
}

const defaultStyles = "rounded-md flex";

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-3",
  lg: "py-4 px-6",
};

export const Button = (props: ButtonProps) => {
  return (
    <div className="">
      <button
        className={`hover:cursor-pointer ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}   ${props.className} flex `}
        onClick={props.onClick}
      >
        {props.startIcon ? (
          <div className="pr-2 p-1">{props.startIcon}</div>
        ) : null}
        {props.text}
        {props.endIcon ? <div className="pr-2">{props.endIcon}</div> : null}
      </button>
    </div>
  );
};