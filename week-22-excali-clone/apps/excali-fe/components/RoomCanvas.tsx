"use client";

import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
const DEV_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MGRjYjllLTY2MDItNDgyNy1hN2NhLTU5Zjc5NDg3NzM3NCIsImlhdCI6MTc4NzY4OTYyMn0.t999aNkeb9NVcmRJBsYNsXFxEBICThIxlfEDUgWLRgs";

function getWebSocketToken() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return DEV_TOKEN;
  }

  try {
    const encodedPayload = storedToken.split(".")[1];
    const payload = JSON.parse(
      atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/")),
    );

    return typeof payload.id === "string" ? storedToken : DEV_TOKEN;
  } catch {
    return DEV_TOKEN;
  }
}

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!WS_URL) return;

    const token = getWebSocketToken();
    let disposed = false;

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      if (disposed) {
        ws.close();
        return;
      }
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: Number(roomId),
        }),
      );
    };

    ws.onclose = () => {
      setSocket((currentSocket) =>
        currentSocket === ws ? null : currentSocket,
      );
    };

    return () => {
      disposed = true;
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [roomId]);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div className="h-screen w-screen bg-white">
      <Canvas roomId={roomId} socket={socket} />
      
    </div>
  );
}
