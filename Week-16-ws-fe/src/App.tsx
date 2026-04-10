import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {

  const [socket, setSocket] = useState(); 
  const inpRef = useRef();

  function sendMsg() {
    if(!socket){
      return;
    }

    const msg = inpRef.current.value;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    socket.send(msg);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws);

    ws.onmessage = (ev) =>{
      console.log(ev.data)
    }
  }, []);

  return (
    <div>
      <input ref={inpRef} type="text" placeholder="Message" />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default App;
