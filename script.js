const screens = [...document.querySelectorAll(".screen")];

function requestFullscreen() {
  const request = document.documentElement.requestFullscreen;
  if (!request || document.fullscreenElement) return;
  try {
    const result = request.call(document.documentElement);
    if (result && typeof result.catch === "function") result.catch(() => {});
  } catch (_) {
    // Fullscreen is optional and may be denied by the browser.
  }
}

document.addEventListener("pointerdown", requestFullscreen, { once: true });
document.addEventListener("keydown", requestFullscreen, { once: true });

function showScreen(id) {
  const current = document.querySelector(".screen.active");
  if (current) current.classList.remove("active");
  const next = document.getElementById(id);
  if (!next) return;
  next.classList.add("active");
  if (id === "celebration") launchConfetti();
  if (id === "letter") startLetter();
  window.scrollTo({ top: 0, behavior: "instant" });
}

document.querySelector("#open-notification").addEventListener("click", () => showScreen("envelope"));
document.querySelector("#open-envelope").addEventListener("click", function () {
  this.classList.add("opening");
  document.querySelector("#envelope-hint").textContent = "opening...";
  setTimeout(() => showScreen("question"), 800);
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});
document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.back));
});
const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const toast = document.querySelector("#toast");
let noCount = 0;

function moveNoButton() {
  noCount++;
  const parent = noButton.parentElement;
  const maxX = Math.max(20, parent.clientWidth - noButton.offsetWidth - 20);
  const maxY = 120;
  noButton.style.position = "absolute";
  noButton.style.left = `${10 + Math.random() * maxX}px`;
  noButton.style.top = `${70 + Math.random() * maxY}px`;
  toast.textContent = noCount > 3 ? "I knew you would say yes 😏" : "Come on, just say yes na 🥺";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", event => {
  event.preventDefault();
  moveNoButton();
});
noButton.addEventListener("click", moveNoButton);
yesButton.addEventListener("click", () => showScreen("celebration"));
document.querySelector("#continue-letter").addEventListener("click", () => showScreen("letter"));

document.querySelector("#download-certificate").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1100;
  const ctx = canvas.getContext("2d");

  const backdrop = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  backdrop.addColorStop(0, "#4d315f");
  backdrop.addColorStop(0.52, "#816394");
  backdrop.addColorStop(1, "#49335e");
  ctx.fillStyle = backdrop;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const paper = ctx.createLinearGradient(70, 70, 830, 1030);
  paper.addColorStop(0, "#fffdf9");
  paper.addColorStop(0.5, "#fff8ed");
  paper.addColorStop(1, "#fffaf7");
  ctx.fillStyle = paper;
  ctx.fillRect(65, 65, 770, 970);

  ctx.strokeStyle = "#c8a958";
  ctx.lineWidth = 12;
  ctx.strokeRect(48, 48, 804, 1004);
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 72, 756, 956);
  ctx.strokeStyle = "#e5d4a9";
  ctx.lineWidth = 1;
  ctx.strokeRect(88, 88, 724, 924);

  ctx.fillStyle = "#bd9b50";
  [[115, 115], [785, 115], [115, 985], [785, 985]].forEach(([x, y]) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-5, -5, 10, 10);
    ctx.restore();
  });

  const seal = ctx.createRadialGradient(430, 135, 8, 450, 155, 58);
  seal.addColorStop(0, "#f6e8b8");
  seal.addColorStop(0.64, "#c9a34f");
  seal.addColorStop(1, "#987438");
  ctx.beginPath();
  ctx.arc(450, 155, 58, 0, Math.PI * 2);
  ctx.fillStyle = "#fff9e8";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#c5a357";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(450, 155, 49, 0, Math.PI * 2);
  ctx.fillStyle = seal;
  ctx.fill();
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff9e8";
  ctx.font = "54px Georgia";
  ctx.fillText("👑", 450, 174);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ad8841";
  ctx.font = "bold 25px Georgia";
  ctx.fillText("ROYAL DECREE", 450, 250);

  ctx.fillStyle = "#3b254c";
  ctx.font = "italic 42px Georgia";
  ctx.fillText("Certificate of", 450, 320);
  ctx.font = "italic bold 58px Georgia";
  ctx.fillText("Princess-hood", 450, 380);

  ctx.strokeStyle = "#c6a85f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(280, 420);
  ctx.lineTo(420, 420);
  ctx.moveTo(480, 420);
  ctx.lineTo(620, 420);
  ctx.stroke();
  ctx.fillStyle = "#b7954f";
  ctx.font = "20px Georgia";
  ctx.fillText("✦", 450, 427);

  ctx.font = "32px Georgia";
  ctx.fillStyle = "#5b3a68";
  ctx.fillText("This is to certify that", 450, 490);
  ctx.strokeStyle = "#c9a859";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(250, 548);
  ctx.lineTo(325, 548);
  ctx.moveTo(575, 548);
  ctx.lineTo(650, 548);
  ctx.stroke();
  ctx.fillStyle = "#956997";
  ctx.font = "italic bold 68px Georgia";
  ctx.fillText("Sunidhi", 450, 570);

  ctx.fillStyle = "#5b3a68";
  ctx.font = "26px Georgia";
  ctx.fillText("said YES to Shadab's question:", 450, 630);
  ctx.font = "italic 36px Georgia";
  ctx.fillText('"Will you be my princess forever?"', 450, 690);

  ctx.fillStyle = "#735682";
  ctx.font = "27px Georgia";
  ctx.fillText("and is hereby crowned Princess,", 450, 765);
  ctx.fillText("officially, forever.", 450, 805);

  ctx.strokeStyle = "#d9c89e";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(190, 850);
  ctx.lineTo(710, 850);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = "#80638e";
  ctx.font = "22px Georgia";
  ctx.fillText("November 18, 2026", 235, 905);
  ctx.textAlign = "right";
  ctx.fillStyle = "#9a789f";
  ctx.font = "italic 20px Georgia";
  ctx.fillText("With love,", 665, 885);
  ctx.fillStyle = "#795489";
  ctx.font = "italic 32px Georgia";
  ctx.fillText("Shadab", 665, 925);

  const link = document.createElement("a");
  link.download = "Sunidhi-Princess-Certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

const letterText = `Happy Princess Day.\n\nSome people need a crown to feel royal. You just walk in, smile, and everything around you gets a little better.\n\nThank you for being soft when I'm a mess and strong when I need it. Today’s yours: be dramatic, be spoiled, be adored.\n\nStill the best thing that ever happened to me.\n\nYours.\nShadab`;
let letterTimer;

function startLetter() {
  clearInterval(letterTimer);
  const target = document.querySelector("#typed-letter");
  target.textContent = "";
  let index = 0;
  letterTimer = setInterval(() => {
    target.textContent += letterText[index] || "";
    index++;
    if (index >= letterText.length) clearInterval(letterTimer);
  }, 24);
}

function launchConfetti() {
  const confetti = document.querySelector("#confetti");
  confetti.innerHTML = "";
  const symbols = ["👑", "💜", "✨", "🌸", "💖", "⭐"];
  for (let i = 0; i < 42; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[i % symbols.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${3 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.fontSize = `${16 + Math.random() * 14}px`;
    confetti.appendChild(piece);
  }
}

function updateClock() {
  const now = new Date();
  document.querySelector("#clock").textContent =
    `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
}
updateClock();
