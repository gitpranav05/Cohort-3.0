"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { messages: string }[];
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
          setChats((c) => [...c, { messages: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);


  return <div>
    {messages.map((m, i) => <div key={i}> {m.messages} </div>)}

    <input type="text" value={currentMessage} onChange={e =>{
        setCurrentMessage(e.target.value)
    }} />

    <button onClick={()=>{
        socket?.send(JSON.stringify({
            type:"chat",
            roomId:id,
            message:currentMessage
        }))
    }} >Send</button>
  </div>
}
