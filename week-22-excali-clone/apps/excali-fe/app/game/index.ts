import axios from "axios";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
): Promise<() => void> {
  const ctx = canvas.getContext("2d");

  const existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return () => undefined;
  }
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const handleMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  socket.onmessage = handleMessage;

  clearCanvas(existingShapes, canvas, ctx);

  let click: boolean = false;
  let startX: number = 0;
  let startY: number = 0;

  const handleMouseDown = (e: MouseEvent) => {
    click = true;

    startX = e.clientX;
    startY = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!click) {
      return;
    }

    click = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      height,
      width,
    };

    existingShapes.push(shape);

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape,
          }),
          roomId: Number(roomId),
        }),
      );
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (click) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    if (socket.onmessage === handleMessage) {
      socket.onmessage = null;
    }
  };
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/chat/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });

  return shapes;
}
