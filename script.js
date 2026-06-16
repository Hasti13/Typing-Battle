const words = ["javascript", "coding", "array", "function", "deployment", "algorithm", "object", "Framework", "Authentication", "react", "debug", "compile", "variable", "frontend", "backend", "web", "programming"];
let score = 0, lives = 3, speed = 3;
let active = [];
let timer;

const gameArea = document.getElementById("gameArea");
const input = document.getElementById("input");

function createwords() {
    const el = document.createElement("div");
    el.className = "word";
    el.textContent = words[Math.floor(Math.random() * words.length)];
    el.style.left = Math.random() * 80 + "%";
    el.style.animationDuration = (10 - speed * 0.5) + "s";

    gameArea.appendChild(el);
    active.push(el);

    el.onanimationend = function () {
        if (gameArea.contains(el)) {
            el.remove();
            active = active.filter(function (w) {
                return w !== el;
            });

            lives--;
            input.value = "";

            update();
            if (lives <= 0) endGame();
        }
    };
}

input.oninput = function () {
    const val = input.value.trim();
    active.forEach(function (word) {
        if (word.textContent === val) {
            word.remove();
            active = active.filter(function (w) {
                return w !== word;
            });

            score += 10;
            if (score % 50 === 0) speed++;
            update();
            input.value = "";
        }
    });
};

function update() {
    scoreEl.textContent = score;
    livesEl.textContent = lives;
}

function startGame() {
    startScreen.classList.add("hidden");
    timer = setInterval(createwords, 2000);
    input.focus();
}

function endGame() {
    clearInterval(timer);
    finalScore.textContent = "Score: " + score;
    gameOver.classList.remove("hidden");
}

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
