"use client";

import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!WS_URL) return;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkODU3OTNjLTgzNTctNDc1NC04YzhkLWQwNzMxODdhZDA4NSIsImlhdCI6MTc4NzIyNTg2N30.xLeaGeGsV7gg_ESjfZz0u_5vLgE64GmlDwMABqMzXlM";

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
