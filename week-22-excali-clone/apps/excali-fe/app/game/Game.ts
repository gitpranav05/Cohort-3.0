import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;

      endX: number;
      endY: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private click: boolean;
  private startX = 0;
  private startY = 0;
  private select: Tool = "circle";
  private destroyed = false;
  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.click = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.destroyed = true;
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);

    this.socket.removeEventListener("message", this.messageHandler);
  }

  setShape(tool: "circle" | "pencil" | "rect") {
    this.select = tool;
  }

  async init() {
    const existingShapes = await getExistingShapes(this.roomId);
    if (this.destroyed) {
      return;
    }
    // Keep shapes received while the initial HTTP request was in flight.
    this.existingShapes.push(...existingShapes);
    this.clearCanvas();
  }

  messageHandler = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      if (!parsedShape.shape) {
        return;
      }
      this.existingShapes.push(parsedShape.shape);
      this.clearCanvas();
    }
  };

  initHandlers() {
    this.socket.addEventListener("message", this.messageHandler);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255, 255, 255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        // Keep previously saved shapes with a negative radius renderable.
        const radius = Math.abs(shape.radius);
        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e: { clientX: number; clientY: number }) => {
    this.click = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };
  mouseUpHandler = (e: { clientX: number; clientY: number }) => {
    this.click = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const selectedTool = this.select;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + (width < 0 ? -radius : radius),
        centerY: this.startY + (height < 0 ? -radius : radius),
      };
    }

    if (!shape) {
      return;
    }

    if (this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: Number(this.roomId),
      }),
    );
  };
  mouseMoveHandler = (e: { clientX: number; clientY: number }) => {
    if (this.click) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const selectedTool = this.select;
      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        const centerX = this.startX + (width < 0 ? -radius : radius);
        const centerY = this.startY + (height < 0 ? -radius : radius);
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
