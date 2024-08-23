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

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function render(time) {
  analyser.getByteFrequencyData(dataArray);

  const normalizedLoudness = Math.sqrt(dataArray.reduce((a, b) => a + (b * b), 0) / bufferLength) / 255;

  console.log(normalizedLoudness);

  gl.clearColor(normalizedLoudness, normalizedLoudness, normalizedLoudness, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
