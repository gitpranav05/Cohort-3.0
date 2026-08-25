import { useEffect, useRef, useState } from "react";
import { IconButton } from "./Icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/app/game/Game";

export type Tool = "circle" | "rect" | "pencil";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [select, setSelect] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    game?.setShape(select);
  }, [select,game]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [roomId, socket]);
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
  select: Tool;
  setSelect: (s: Tool) => void;
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
