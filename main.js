const canvas = document.querySelector("canvas");
const wgl = canvas.getContext("webgl2");

function resizeCanvas() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  wgl.viewport(0, 0, width, height);
}

resizeCanvas();
window.addEventListener("resize" , resizeCanvas);
