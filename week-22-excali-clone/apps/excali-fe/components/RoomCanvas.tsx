"use client";

import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!WS_URL) return;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MGRjYjllLTY2MDItNDgyNy1hN2NhLTU5Zjc5NDg3NzM3NCIsImlhdCI6MTc4NzY2ODEyMH0.elUJZv8mFDdbPM_wumVI2nLPZ-o9o9FIKYPzZVfYeDI";

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: Number(roomId),
        }),
      );
    };
  }, []);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div className="h-screen w-screen bg-white">
      <Canvas roomId={roomId} socket={socket} />
      
    </div>
  );
}
