const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");

function resizeCanvas() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  gl.viewport(0, 0, width, height);
}

resizeCanvas();
window.addEventListener("resize" , resizeCanvas);

function render(time) {
  const r = time % 499.0 / 499.0;
  const g = time % 569.0 / 569.0;
  const b = time % 691.0 / 691.0;

  gl.clearColor(r, g, b, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
