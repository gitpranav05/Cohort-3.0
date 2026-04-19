import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === "join" && parsedMessage.payload?.roomId) {
        const existingUser = allSockets.find((x) => x.socket === socket);
        // Update user room if they are reconnecting/changing rooms, rather than duplicating
        if (existingUser) {
          existingUser.room = parsedMessage.payload.roomId;
        } else {
          allSockets.push({
            socket,
            room: parsedMessage.payload.roomId,
          });
        }
      }

      if (parsedMessage.type === "chat" && parsedMessage.payload?.message) {
        const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;

        // Ensure user is in a room before broadcasting their message to avoid leaking
        if (currentUserRoom) {
          allSockets.forEach((user) => {
            if (user.room === currentUserRoom) {
              user.socket.send(parsedMessage.payload.message);
            }
          });
        }
      }
    } catch (e) {
      console.error("Invalid websocket message parsing error:", e);
    }
  });

  // Native `ws` library uses 'close', NOT 'disconnect'
  socket.on("close", () => {
    allSockets = allSockets.filter((x) => x.socket !== socket);
  });
});
