"use client";

import { initDraw } from "@/app/game";
import React, { useEffect, useRef } from "react";

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div className="h-screen w-screen bg-white">
      <canvas ref={canvasRef} width={5000} height={5000} />
    </div>
  );
}

export default Page;
