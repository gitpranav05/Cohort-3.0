import { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import { Modal } from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [shareModalOpen, setShareModalOpen] = useState(false);
  const Contents = useContent();
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
            onClick={async() => {
              const resp = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    token: localStorage.getItem("token"),
                  }
                }
              );

              const shareUrl = `http://localhost:5173/share/${resp.data.hash}`;

              navigator.clipboard.writeText(shareUrl);
            }}
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
