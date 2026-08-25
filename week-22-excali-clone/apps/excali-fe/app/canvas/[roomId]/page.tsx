"use client";

import React, { useEffect, useRef } from "react";

function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      let click: boolean = false;
      let startX: number = 0;
      let startY: number = 0;

      canvas.addEventListener("mousedown", (e) => {
        click = true;

        startX = e.clientX;
        startY = e.clientY;

        // console.log("Mousedown", e.clientX);
        // console.log("Mousedown", e.clientY);
      });

      canvas.addEventListener("mouseup", (e) => {
        click = false;
        // console.log("Mouseup x:", e.clientX);
        // console.log("Mouseup y:", e.clientY);
      });

      canvas.addEventListener("mousemove", (e) => {
          if (click) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          const width = e.clientX - startX;
          const height = e.clientY - startY;


          ctx.strokeRect(startX, startY, width, height);
          // console.log("Mousemove x:", canvas.width);
          // console.log("Mousemove y:", canvas.height);
        }
      });
    }
  }, [canvasRef]);

  return (
    <div className="h-screen  bg-white">
      <canvas ref={canvasRef} width={5000} height={5000} />
    </div>
  );
}

export default Page;
