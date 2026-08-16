import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("turbo:load", () => {
  const canvas = document.getElementById("drawingCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  const startBtn = document.getElementById("startBtn");
  const countdown = document.getElementById("countdown");
  let canDraw = false;
  let timer = null;


  const titleInput = document.getElementById("titleInput");
  const saveBtn = document.getElementById("saveBtn");
  const saveMessage = document.getElementById("saveMessage");

  saveBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    if (!title) {
      saveMessage.textContent = "タイトルを入力してください";
      return;
    }

    const odai = odaiMessage.textContent;

    // Canvas → Blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

    // Blob → File
    const file = new File([blob], "drawing.png", { type: "image/png" });

    // FormData に詰める
    const formData = new FormData();
    formData.append("title", title);
    formData.append("odai", odai);
    formData.append("image", file);

    // ★ headers を絶対に付けない（重要）
    const res = await fetch("/drawings", {
      method: "POST",
      body: formData
    });

    const json = await res.json();
    saveMessage.textContent = "保存しました！（ID: " + json.id + "）";
  });




  startBtn.addEventListener("click", () => {
    if (timer) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canDraw = true;
    let timeLeft = 30;

    countdown.textContent = `残り ${timeLeft} 秒`;
    startBtn.textContent = "描画中";

    // ★ setInterval を async にする（必須）
    timer = setInterval(async () => {
      timeLeft -= 1;
      countdown.textContent = `残り ${timeLeft} 秒`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        canDraw = false;

        countdown.textContent = "終了";
        startBtn.textContent = "やりなおし";

      }
    }, 1000);
  });

  // パレット処理（あなたのコードそのまま）
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
  
  const odaiMessage = document.getElementById("odaiMessage");

  // お題の候補
  const odaiList = [
    "犬の絵を描いてください",
    "好きな食べ物を描いてください",
    "今日の気分を絵にしてください",
    "空想の生き物を描いてください",
    "子どもの頃に好きだったものを描いてください"
  ];

  // ランダムに1つ選ぶ
  const randomOdai = odaiList[Math.floor(Math.random() * odaiList.length)];
  odaiMessage.textContent = randomOdai;
});
