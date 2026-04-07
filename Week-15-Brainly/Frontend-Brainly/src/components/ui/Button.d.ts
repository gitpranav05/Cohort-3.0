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
export declare const Button: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Button.d.ts.map