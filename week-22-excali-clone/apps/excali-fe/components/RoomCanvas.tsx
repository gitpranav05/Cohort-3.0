"use client";

import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const WS_URL = process.env.WS_URL;

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!WS_URL) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setSocket(ws);
    };
  }, []);

  if(!socket){
    return(
      <div>
        Connecting to server...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white">
      <Canvas roomId={roomId} />
    </div>
  );
}
