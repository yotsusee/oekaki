// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// お絵描き用コード
document.addEventListener("turbo:load", () => {
  const canvas = document.getElementById("drawingCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

    // スタートボタン & カウントダウン
  const startBtn = document.getElementById("startBtn");
  const countdown = document.getElementById("countdown");
  let canDraw = false;
  let timer = null;

  startBtn.addEventListener("click", () => {
    // すでにタイマーが動いていたら何もしない
    if (timer) return;

    // 再スタート時にキャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    canDraw = true;
    let timeLeft = 30;

    countdown.textContent = `残り ${timeLeft} 秒`;
    startBtn.textContent = "描画中";

    // 1秒ごとにカウントダウン
    timer = setInterval(() => {
      timeLeft -= 1;
      countdown.textContent = `残り ${timeLeft} 秒`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null; // ← これで再スタート可能になる
        canDraw = false;
        countdown.textContent = "終了";
        startBtn.textContent = "やりなおし";
      }
    }, 1000);
  });

  // パレット
  const colorPicker = document.getElementById("colorPicker");
  const sizePicker = document.getElementById("sizePicker");
  const eraserBtn = document.getElementById("eraserBtn");
  const penBtn = document.getElementById("penBtn");
  const clearBtn = document.getElementById("clearCanvas");

  let currentColor = "#000000";
  let currentSize = 3;
  let isEraser = false;

  colorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
    isEraser = false;
  });

  sizePicker.addEventListener("input", (e) => {
    currentSize = e.target.value;
  });

  eraserBtn.addEventListener("click", () => {
    isEraser = true;
  });

  penBtn.addEventListener("click", () => {
    isEraser = false;
  });

  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  canvas.addEventListener("mousedown", (e) => {
    if (!canDraw) return;
    drawing = true;

    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", () => drawing = false);
  canvas.addEventListener("mouseleave", () => drawing = false);

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing || !canDraw) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? "white" : currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  });
});
