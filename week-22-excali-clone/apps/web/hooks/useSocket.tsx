import React, { useEffect, useState } from 'react'

const WS_URL = String(process.env.WS_URL);

function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8080");
    ws.onopen = () =>{
        setLoading(false);
        setSocket(ws)
    }
  },[]);

  return {
    socket,
    loading
  }
  
}

export default useSocket