import type { ReactElement } from "react";

function SidebarItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex text-slate-600 text-xl m-4 items-center gap-3 pl-7 hover:bg-slate-200 p-2 transition-all duration-300 cursor-pointer"
    >
      {icon} {text}
    </div>
  );
}

export default SidebarItem;
