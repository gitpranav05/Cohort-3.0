import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8081";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected to server");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const joinRoom = () => {
    if (!socket) return;

    socket.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId,
        },
      }),
    );

    setJoined(true);
  };

  const sendMessage = () => {
    if (!socket) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message,
        },
      }),
    );

    // ✅ Add your own message locally
    setMessages((prev) => [...prev, "You: " + message]);

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>WebSocket Chat</h1>

      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid black",
              height: "300px",
              overflowY: "scroll",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
