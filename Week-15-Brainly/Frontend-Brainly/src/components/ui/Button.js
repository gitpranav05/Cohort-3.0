import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const Button = (props) => {
    return (_jsx("div", { className: "", children: _jsxs("button", { className: `hover:cursor-pointer ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}   ${props.className} flex `, onClick: props.onClick, children: [props.startIcon ? (_jsx("div", { className: "pr-2 p-1", children: props.startIcon })) : null, props.text, props.endIcon ? _jsx("div", { className: "pr-2", children: props.endIcon }) : null] }) }));
};
//# sourceMappingURL=Button.js.map