import { useEffect, useState } from "react";

const WS_URL = String(process.env.WS_URL);

function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkODU3OTNjLTgzNTctNDc1NC04YzhkLWQwNzMxODdhZDA4NSIsImlhdCI6MTc4NzIyNTg2N30.xLeaGeGsV7gg_ESjfZz0u_5vLgE64GmlDwMABqMzXlM";

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080?token=${encodeURIComponent(token)}`,
    );

    // console.log("Chat WebSocket:", ws.url);


    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, []);

  return {
    socket,
    loading,
  };
}

export default useSocket;
