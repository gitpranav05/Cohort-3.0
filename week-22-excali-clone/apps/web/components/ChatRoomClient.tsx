"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const { loading, socket } = useSocket();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chats, setChats] = useState(messages);

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }),
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);


  return (
    <div>
      {chats.map((chat, i) => (
        <div key={i}>{chat.message}</div>
      ))}

      <input
        value={currentMessage}
        type="text"
        className="border-amber-50 border-2  rounded-2xl p-5"
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        placeholder="Room-Id"
      />

      <button
        className="bg-gray-300 cursor-pointer text-gray-700 rounded-2xl p-5"
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMessage,
            }),
          );
        }}
      >
        Send
      </button>
    </div>
  );
}
