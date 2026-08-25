import { initDraw } from "@/app/game";
import React, { useEffect, useRef } from "react";

function Canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);
  return <canvas ref={canvasRef} width={3000} height={3000}></canvas>;
}

export default Canvas;
