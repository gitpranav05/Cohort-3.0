import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon: ReactElement;
  endIcon: ReactElement;
  onClick: () => void;
}

export const button = () => {
  return <button></button>;
};
