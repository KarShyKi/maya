const card = document.getElementById("card");
const flowerBg = document.getElementById("flowerBg");

let stepIndex = 0;
let quizStarted = false;

/* =========================
   STEPS (ORIGINAL + ADDED CONTENT ONLY)
========================= */

const steps = [
  { type: "text", content: "Wasssssuuupppppuu Bhunti Maya!!!!" },
  { type: "text", content: "Vhana ta dheri manxa, but lets make things a bit interesting." },
  { type: "text", content: "Volume full please 🔊🔊🔊🔊🔊🔊🔊" },
  { type: "text", content: "Do you want to know how special you are to me?" },

  {
    type: "media-reveal",
    src: "./icons/main.mp4"
  },

  { type: "text", content: "I know I irritate you a lot" },
  { type: "text", content: "But it's purely out of love." },
  { type: "text", content: "So are you ready for the main part?" },

  /* 🔥 YOUR HAPPY NEW YEAR PART (ADDED) */
  { type: "text", content: "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️" },
  { type: "text", content: "HAPPY NEW YEAR!!!! 🎆🎆🎆🎆🎆🎆🎆" },
  { type: "text", content: "Sorry sorry 😁😁😁😁" },

  /* ✨ TRANSITION STEP (ADDED) */
  { type: "transition", content: "Okay… now the real question 😳" },

  /* QUIZ (UNCHANGED) */
  {
    type: "quiz",
    question: "Will you be my Valentine?",
    options: ["Yes 💖", "No 😏"],
    correct: 0,
    successText: "Thank uuuuuuu!!!!! Ji chanta matina yan mutu 💖💖💖"
  }
];

/* =========================
   FLOWERS (INCREASED COUNT)
========================= */

const flowerIcons = ["./icons/flower1.svg", "./icons/bg_rose.svg"];

/* 🔥 INCREASED FROM 20 → 50 */
for (let i = 0; i < 50; i++) {
  const img = document.createElement("img");
  img.src = flowerIcons[i % 2];
  img.className = "flower";

  img.style.left = Math.random() * 100 + "vw";
  img.style.top = Math.random() * 100 + "vh";
  img.style.animationDuration = 10 + Math.random() * 6 + "s";

  flowerBg.appendChild(img);
}

/* =========================
   TYPEWRITER
========================= */

function typeText(el, text, done) {
  el.textContent = "";
  el.classList.add("cursor");
  let i = 0;

  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(timer);
      el.classList.remove("cursor");
      if (done) done();
    }
  }, 60);
}

/* =========================
   RENDER
========================= */

function renderStep() {
  const step = steps[stepIndex];
  card.innerHTML = "";

  /* TEXT */
  if (step.type === "text") {
    const p = document.createElement("p");
    card.appendChild(p);
    typeText(p, step.content, () => {
      setTimeout(() => {
        stepIndex++;
        renderStep();
      }, 1200);
    });
  }

  /* TRANSITION */
  if (step.type === "transition") {
    const p = document.createElement("p");
    p.className = "quiz-transition";
    card.appendChild(p);
    typeText(p, step.content, () => {
      setTimeout(() => {
        stepIndex++;
        renderStep();
      }, 1200);
    });
  }

  /* VIDEO */
  if (step.type === "media-reveal") {
    const btn = document.createElement("button");
    btn.textContent = "Reveal 👀";

    btn.onclick = () => {
      card.classList.add("no-bg");
      card.innerHTML = "";

      const video = document.createElement("video");
      video.src = step.src;
      video.autoplay = true;
      video.playsInline = true;

      card.appendChild(video);

      video.onended = () => {
        card.classList.remove("no-bg");
        stepIndex++;
        renderStep();
      };
    };

    card.appendChild(btn);
  }

  /* QUIZ */
  if (step.type === "quiz") {
    quizStarted = true;
    flowerBg.classList.add("bloom");

    const q = document.createElement("p");
    q.textContent = step.question;
    card.appendChild(q);

    step.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;

      btn.onclick = () => {
        if (i === step.correct) {
          card.innerHTML = step.successText;
        }
      };

      card.appendChild(btn);
    });
  }
}

renderStep();
