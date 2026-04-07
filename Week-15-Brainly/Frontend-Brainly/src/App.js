import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Button, { text: "Click me", className: "hover:bg-[#a9bdff] translate-y-70 translate-x-150 transition-all duration-150 outline-none", startIcon: _jsx(PlusIcon, { size: "md" }), variant: "secondary", size: "md", onClick: () => { } }), _jsx(Button, { text: "Share", className: "hover:bg-purple-500 translate-y-60 translate-x-100 transition-all duration-150 outline-none", startIcon: _jsx(ShareIcon, { size: "md" }), variant: "primary", size: "md", onClick: () => { } })] }));
}
export default App;
//# sourceMappingURL=App.js.map