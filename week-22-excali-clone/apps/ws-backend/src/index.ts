import "dotenv/config";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: number[];
  id: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded.id) {
      return null;
    }

    return decoded.id as string;
  } catch (e) {
    return null;
  }
}

function parseRoomId(value: unknown): number | null {
  const roomId = Number(value);
  return Number.isInteger(roomId) && roomId > 0 ? roomId : null;
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const id = checkUser(token);

  // console.log(url);

  if (!id) {
    ws.close();
    return;
  }

  users.push({
    id,
    rooms: [],
    ws,
  });

  ws.on("error", console.error);

  ws.on("message", async function message(data) {
    try {

    
    const parsedData = JSON.parse(data as unknown as string);

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      const roomId = parseRoomId(parsedData.roomId);
      if (roomId === null) {
        return;
      }
      if (!user.rooms.includes(roomId)) {
        user.rooms.push(roomId);
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      const roomId = parseRoomId(parsedData.roomId);
      if (roomId === null) {
        return;
      }
      user.rooms = user.rooms.filter((room) => room !== roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = parseRoomId(parsedData.roomId);
      if (roomId === null) {
        return;
      }
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId:id
        }
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            }),
          );
        }
      });
    }
  }
  catch(e){
    console.log("Error Occured:",e);
  }
  });

  ws.on("close", () => {
    const userIndex = users.findIndex((user) => user.ws === ws);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }
  });
});
