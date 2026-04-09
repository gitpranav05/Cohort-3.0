import Notes from "../icons/Notes";
import Twitter from "../icons/Twitter";
import Video from "../icons/Video";
import SidebarItem from "./SidebarItem";
import Linked from "../icons/Linked";
import Tags from "../icons/Tags";
import Brain from "../icons/Brain";

function Sidebar() {
  return (
    <div className="h-screen bg-white shadow-lg w-75 position-fixed left-0 top-0 fixed">
      <div className="translate-y-14 px-5">
      <Brain />
      </div>
      <h1 className="font-semibold text-3xl pl-15 p-5">Second Brain</h1>
      <div className="pt-7 ">
        <SidebarItem text="Twitter" icon={<Twitter size="lg" />} />
        <SidebarItem text="Videos" icon={<Video size="lg" />} />
        <SidebarItem text="Documents" icon={<Notes size="lg" />} />
        <SidebarItem text="Links" icon={<Linked size="lg" />} />
        <SidebarItem text="Tags" icon={<Tags size="lg" />} />
      </div>
    </div>
  );
}

export default Sidebar;
