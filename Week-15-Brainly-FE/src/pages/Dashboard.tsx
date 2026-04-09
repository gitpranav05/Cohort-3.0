import { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import { Modal } from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Sidebar />
      <div className="p-4 min-h-screen bg-[#cecbff] ml-76">
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
            size="md"
            className={` hover:-translate-y-1  transition-all duration-300 `}
            startIcon={<Plus size="md" />}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            size="md"
            className={` hover:-translate-y-1  transition-all duration-300 `}
            startIcon={<Share size="md" />}
          />
        </div>
        <div className="flex py-5">
          <Card
            title="Project Ideas"
            type="youtube"
            // https://www.youtube.com/watch?v=4XVvbZj794o&t=670s
            // https://www.youtube.com/embed/4XVvbZj794o?si=mWKUSf94ItOvbPS3
            link="https://www.youtube.com/embed/4XVvbZj794o?si=mWKUSf94ItOvbPS3"
          />
          <Card
            title="Tweets"
            type="twitter"
            link={"https://x.com/shydev69/status/1947203097975259206"}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
