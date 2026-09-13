import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18.2/+esm";

// ----- Canvas Setup -----
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
gl.getExtension("OES_texture_float");

const textureEl = document.createElement("canvas");
const textureCtx = textureEl.getContext("2d");

// ----- Text Settings -----
const fontOptions = {
  "Arial": "Arial, sans-serif",
  "Verdana": "Verdana, sans-serif",
  "Tahoma": "Tahoma, sans-serif",
  "Times New Roman": "Times New Roman, serif",
  "Georgia": "Georgia, serif",
  "Garamond": "Garamond, serif",
  "Courier New": "Courier New, monospace",
  "Brush Script MT": "Brush Script MT, cursive"
};

const params = {
  fontName: "Verdana",
  isBold: false,
  fontSize: 80,
  text: "fluid",
  pointerSize: null,
  color: { r: 1, g: 0, b: 0.5 }
};

const pointer = { x:0, y:0, dx:0, dy:0, moved:false };

// ----- Shaders & Programs -----
let outputColor, velocity, divergence, pressure, canvasTexture;
let isPreview = true;

// Create text texture
function createTextCanvasTexture() {
  canvasTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, canvasTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

// Update text on canvas
function updateTextCanvas() {
  textureEl.width = canvas.width;
  textureEl.height = canvas.height;

  textureCtx.fillStyle = "black";
  textureCtx.fillRect(0, 0, textureEl.width, textureEl.height);

  textureCtx.font = `${params.isBold ? "bold" : "normal"} ${params.fontSize * devicePixelRatio}px ${fontOptions[params.fontName]}`;
  textureCtx.fillStyle = "#fff";
  textureCtx.textAlign = "center";
  textureCtx.filter = "blur(3px)";
  const textBox = textureCtx.measureText(params.text);
  textureCtx.fillText(params.text, textureEl.width/2, textureEl.height/2 + textBox.actualBoundingBoxAscent/2);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, canvasTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl);
}

// ----- GUI -----
function createControls() {
  const gui = new GUI();
  gui.close();

  gui.add(params, "text").onChange(updateTextCanvas);
  gui.add(params, "fontSize", 10, 300).name("font size, px").onChange(updateTextCanvas);
  gui.add(params, "isBold").name("bold").onChange(updateTextCanvas);
  gui.add(params, "fontName", Object.keys(fontOptions)).name("font").onChange(updateTextCanvas);
  gui.addColor(params, "color");
}

// ----- Mouse / Touch -----
function setupEvents() {
  canvas.addEventListener("mousemove", e => {
    isPreview = false;
    updateMousePosition(e.pageX, e.pageY);
  });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    isPreview = false;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
  });
}

function updateMousePosition(x, y) {
  pointer.moved = true;
  pointer.dx = 5 * (x - pointer.x);
  pointer.dy = 5 * (y - pointer.y);
  pointer.x = x;
  pointer.y = y;
}

// ----- Initialize -----
function init() {
  createTextCanvasTexture();
  createControls();
  setupEvents();
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  render();
}

// ----- Resize -----
function resizeCanvas() {
  canvas.width = textureEl.width = window.innerWidth;
  canvas.height = textureEl.height = window.innerHeight;
  params.pointerSize = 4 / window.innerHeight;
  updateTextCanvas();
}

// ----- Animation -----
function render(t) {
  // ici tu gardes ton code de simulation (fluid + shaders)
  requestAnimationFrame(render);
}

// Start
init();

