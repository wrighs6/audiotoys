const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl2");
let width = 300;
let height = 150;

const observer = new ResizeObserver((entries) => {
  width = canvas.clientWidth;
  height = canvas.clientHeight;
});
observer.observe(canvas)
