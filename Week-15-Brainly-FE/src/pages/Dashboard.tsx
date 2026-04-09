import { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import { Modal } from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const Contents = useContent();
  // console.log(Contents);
  return (
    <div>
      <Sidebar />
      <div className="p-4 min-h-screen  bg-[#cecbff] ml-76">
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
        <div className="flex flex-wrap py-5">
          
          {Contents.map(({ type, link, title, _id }) => (
            <div>
              <Card title={title} type={type} link={link} divId={_id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
