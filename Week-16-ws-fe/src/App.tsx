import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "./types";
import { JoinScreen } from "./components/JoinScreen";
import { ChatScreen } from "./components/ChatScreen";

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [roomId, setRoomId] = useState(() => localStorage.getItem("chat_roomId") || "");
  const [userName, setUserName] = useState(() => localStorage.getItem("chat_userName") || "");
  const [joined, setJoined] = useState(() => localStorage.getItem("chat_joined") === "true");
  const [inputValue, setInputValue] = useState("");
  
  const [mySenderId] = useState(() => {
    const saved = localStorage.getItem("chat_senderId");
    if (saved) return saved;
    const newId = Math.random().toString(36).substring(2, 10);
    localStorage.setItem("chat_senderId", newId);
    return newId;
  });

  const wsRef = useRef<WebSocket | null>(null);

  // Sync basic state to LocalStorage
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chat_roomId", roomId);
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem("chat_userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("chat_joined", joined.toString());
  }, [joined]);

  // Connect helper abstracted so it can be called on mount OR on form submit
  const connectToRoom = (targetRoom: string) => {
    if (wsRef.current) return; // Prevent duplicate connections

    // Uses Vercel environment variable if present, otherwise defaults straight to your Render backend!
    const WS_URL = import.meta.env.VITE_WS_URL || "wss://cohort-3-0.onrender.com";
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: targetRoom,
          },
        })
      );
      setJoined(true);
    };

    ws.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        setMessages((m) => [...m, parsedMessage]);
      } catch (e) {
        setMessages((m) => [
          ...m,
          { text: event.data, name: "Unknown", senderId: "" },
        ]);
      }
    };

    ws.onclose = () => {
      setJoined(false);
      wsRef.current = null;
    };

    wsRef.current = ws;
  };

  // Auto-connect on mount if the user previously joined
  useEffect(() => {
    if (joined && roomId && userName && !wsRef.current) {
      connectToRoom(roomId);
    }
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim() || !userName.trim()) return;
    connectToRoom(roomId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !wsRef.current) return;

    const messageData = JSON.stringify({
      text: inputValue,
      name: userName,
      senderId: mySenderId,
    });

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: messageData,
        },
      })
    );
    setInputValue("");
  };

  const handleLeave = () => {
    wsRef.current?.close();
    setJoined(false);
    setMessages([]);
    setRoomId("");
  };

  if (!joined) {
    return (
      <JoinScreen
        userName={userName}
        setUserName={setUserName}
        roomId={roomId}
        setRoomId={setRoomId}
        onJoin={handleJoin}
      />
    );
  }

  return (
    <ChatScreen
      roomId={roomId}
      messages={messages}
      mySenderId={mySenderId}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onSend={handleSend}
      onLeave={handleLeave}
    />
  );
}
