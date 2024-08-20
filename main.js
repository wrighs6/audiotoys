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

const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
const audioCtx = new AudioContext();
const source = audioCtx.createMediaStreamSource(stream);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);

analyser.fftSize = 32;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let maxsum = 100.0;

function render(time) {
  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (const amplitude of dataArray) {
    sum += amplitude * amplitude;
  }

  if (sum > maxsum) {
    maxsum = sum;
  }

  const c = sum / maxsum;

  gl.clearColor(c, c, c, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
