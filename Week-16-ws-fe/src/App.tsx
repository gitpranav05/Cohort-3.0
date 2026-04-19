import { useEffect, useRef, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<string[]>([
    "hi there",
    "Hello",
    "hi there",
  ]);

  const inpRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        }),
      );
    };
    
  }, []);

  return (
    <div className="min-h-screen bg-black justify-between flex flex-col  items-center text-white">
      <div className="w-full max-w-md">
        <div className="">
          <h1 className="text-2xl mb-4">Chat App</h1>
          {messages.map((message) => (
            <div className="bg-white text-black text-sm rounded-md p-1 m-2 w-max ">
              {message}
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-2 ">
          <input ref={inpRef} type="text" className="w-full border" />
          <button
            onClick={() => {
              const message = inpRef.current?.value;
              wsRef.current?.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                }),
              );
            }}
            className="cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
