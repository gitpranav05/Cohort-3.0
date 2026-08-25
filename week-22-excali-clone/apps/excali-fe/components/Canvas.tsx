"use client";

import { initDraw } from "@/app/game";
import { useEffect, useRef } from "react";

function Canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return (
    <div className="h-screen w-screen bg-white">
      <canvas ref={canvasRef} width={2000} height={1000} />
      <div className="absolute bottom-0 right-0">
        <button className="bg-black text-white cursor-pointer">Rect</button>
        <button className="bg-black text-white cursor-pointer">Circle</button>
      </div>
    </div>
  );
}

export default Canvas;
