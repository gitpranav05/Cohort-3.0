import { initDraw } from "@/app/game";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "./Icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape = "circle" | "rect" | "pencil";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [select, setSelect] = useState<Shape>("circle");

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initDraw(canvasRef.current, roomId, socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);
  return (
    <div className="overflow-hidden h-screen">
      <canvas ref={canvasRef}></canvas>;
      <Topbar select={select} setSelect={setSelect} />
    </div>
  );
}

function Topbar({
  select,
  setSelect,
}: {
  select: Shape;
  setSelect: (s: Shape) => void;
}) {
  return (
    <div className="fixed top-3 text-2xl  left-2 flex gap-3">
      <IconButton
        icon={<Pencil />}
        onClick={() => {
          setSelect("pencil");
        }}
        activated={select === "pencil"}
      />
      <IconButton
        icon={<RectangleHorizontalIcon />}
        onClick={() => {
          setSelect("rect");
        }}
        activated={select === "rect"}
      />
      <IconButton
        icon={<Circle />}
        onClick={() => {
          setSelect("circle");
        }}
        activated={select === "circle"}
      />
    </div>
  );
}
