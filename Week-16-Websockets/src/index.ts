import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

interface User {
  socket: WebSocket;
  room: string;
}

let userCount = 0;
let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      let currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;


      allSockets.forEach((user) => {
        if (user.room === currentUserRoom  ) {
          user.socket.send(parsedMessage.payload.message);
        }
      });

    //   for (let i = 0; i < allSockets.length; i++) {
    //     if (allSockets[i]?.room == currentUserRoom) {
    //       allSockets[i]?.socket.send(parsedMessage.payload.message);
    //     }
    //   }
    }
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x.socket != socket);
    userCount--;
  });
});
