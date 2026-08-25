export function initDraw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  canvas.addEventListener("mouseup", () => {
    click = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (click) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}
