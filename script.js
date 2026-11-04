const screens = document.querySelectorAll(".screen");
function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}

// Secret PIN: 14 February = 1402
let enteredPin = "";
const correctPin = "1402";
const dots = document.getElementById("pin-dots");
const pinFeedback = document.getElementById("pin-feedback");

function updatePin() {
  dots.textContent = [...enteredPin.padEnd(4, "○")].join("　");
}
document.querySelectorAll("[data-digit]").forEach(button => {
  button.addEventListener("click", () => {
    if (enteredPin.length < 4) enteredPin += button.dataset.digit;
    updatePin();
    if (enteredPin.length === 4) checkPin();
  });
});
document.querySelector('[data-action="clear"]').addEventListener("click", () => {
  enteredPin = enteredPin.slice(0, -1);
  pinFeedback.textContent = "Hint: your special day 💌";
  updatePin();
});
document.querySelector('[data-action="enter"]').addEventListener("click", checkPin);

function checkPin() {
  if (enteredPin === correctPin) {
    pinFeedback.textContent = "Correct!! Welcome, birthday girl 💗";
    setTimeout(() => showScreen("menu-screen"), 450);
  } else {
    pinFeedback.textContent = "Oopsie, try again birthday girl 🥺";
    enteredPin = "";
    updatePin();
  }
}

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => document.getElementById(button.dataset.open).classList.add("open"));
});
document.querySelectorAll(".close").forEach(button => {
  button.addEventListener("click", () => button.closest(".modal").classList.remove("open"));
});
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.classList.remove("open");
  });
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") document.querySelectorAll(".modal.open").forEach(m => m.classList.remove("open"));
});

document.getElementById("to-question").addEventListener("click", () => showScreen("question-screen"));
document.querySelectorAll("[data-back]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.back)));
document.getElementById("yes-button").addEventListener("click", () => {
  showScreen("ending-screen");
  showerHearts();
});
let noCount = 0;
document.getElementById("no-button").addEventListener("click", () => {
  noCount++;
  const replies = ["Excuse me?? 😭", "Wrong answer, madam.", "Try again, Sexyy Sakshi 💗", "I am choosing to ignore that answer."];
  document.getElementById("answer-feedback").textContent = replies[Math.min(noCount - 1, replies.length - 1)];
});
document.getElementById("replay-button").addEventListener("click", () => {
  enteredPin = "";
  updatePin();
  showScreen("pin-screen");
});
document.getElementById("another-secret").addEventListener("click", () => {
  document.getElementById("secret-two").classList.remove("hidden");
  document.getElementById("another-secret").textContent = "secret unlocked ♡";
});
function showerHearts() {
  const icons = ["💗", "💜", "💛", "✨", "🌷"];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("span");
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    Object.assign(el.style, {
      position: "fixed", left: Math.random() * 100 + "vw", top: "-35px",
      fontSize: (15 + Math.random() * 18) + "px", zIndex: 100,
      pointerEvents: "none", transition: `top ${2 + Math.random() * 2}s linear, transform 3s ease`
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.top = "105vh";
      el.style.transform = `rotate(${Math.random() * 500 - 250}deg)`;
    });
    setTimeout(() => el.remove(), 4300);
  }
}
