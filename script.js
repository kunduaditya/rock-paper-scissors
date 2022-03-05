let rules = false;

let round = localStorage.getItem("round-ls") || 0;
round = parseInt(round);
const currentRound = round + 1;
let score = localStorage.getItem("score-ls") || 0;
score = parseInt(score);
let match = localStorage.getItem("match-ls") || 0;
match = parseInt(match);
let totalMatch = round ? (round + 1) * 5 : 5;
document.getElementById("round").innerText = `Round ${currentRound}`;
document.getElementById("score").innerText = score;
document.getElementById("match-info").innerText = `Match ${
  match + 1
} of ${totalMatch}`;

function handleclose() {
  if (rules === true) {
    rules = false;
    const element = document.getElementById("rules");
    const element_bg = document.getElementById("rules-bg");
    element.style.display = "none";
    element_bg.style.display = "none";
    return;
  } else {
    rules = true;
    const element = document.getElementById("rules");
    const element_bg = document.getElementById("rules-bg");
    element.style.display = "unset";
    element_bg.style.display = "unset";
    return;
  }
}

const values = ["scissors", "paper", "rock", "lizard", "spock"];
const terminator = [
  [5, 3],
  [1, 4],
  [2, 5],
  [3, 1],
  [4, 2],
];

function generateRandom() {
  let difference = 5;
  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + 1;

  return rand;
}

function handleStart(i) {
  if (i == undefined) {
    return;
  }
  const r = generateRandom();
  const tc = terminator[i - 1];
  if (i == r) {
    matchTie(i, r);
  } else if (tc[0] == r) {
    matchLoss(i, r);
  } else if (tc[1] == r) {
    matchLoss(i, r);
  } else {
    matchWon(i, r);
  }
}

function matchTie(i, r) {
  document.getElementById("dynamic").innerHTML = `
  <div class="result">
          <div class="user">
            <p align="center">You Picked</p>
            <div class="result-button result-${values[i - 1]} result-winner">
              <img src="../../images/icon-${values[i - 1]}.svg" alt="${
    values[i - 1]
  }" />
            </div>
          </div>
          <div class="info">
            <h1 align="center">TIE</h1>
            <button class="result-btn" onclick="nextMatch()">Retry</button>
          </div>
          <div class="computer">
            <p align="center">Computer Picked</p>
            <div class="result-button result-${values[r - 1]} result-winner">
              <img src="../../images/icon-${values[r - 1]}.svg" alt="${
    values[r - 1]
  }" />
            </div>
          </div>
        </div>
  `;
}
function matchWon(i, r) {
  score++;
  match++;
  if (match >= totalMatch) {
    round++;
    match = 0;
    score = 0;
    totalMatch = (round + 1) * 5;
    localStorage.setItem("round-ls", round);
    document.getElementById("round").innerText = `Round ${round + 1}`;
    localStorage.setItem("match-ls", 0);
    localStorage.setItem("score-ls", 0);
    document.getElementById("score").innerText = 0;
    document.getElementById(
      "match-info"
    ).innerText = `Match 1 of ${totalMatch}`;
  } else {
    localStorage.setItem("score-ls", score);
    document.getElementById("score").innerText = score;
    localStorage.setItem("match-ls", match);
    document.getElementById("match-info").innerText = `Match ${
      match + 1
    } of ${totalMatch}`;
  }
  document.getElementById("dynamic").innerHTML = `
  <div class="result">
          <div class="user">
            <p align="center">You Picked</p>
            <div class="result-button result-${values[i - 1]} result-winner">
              <img src="../../images/icon-${values[i - 1]}.svg" alt="${
    values[i - 1]
  }" />
            </div>
          </div>
          <div class="info">
            <h1 align="center">You Won</h1>
            <button class="result-btn" onclick="nextMatch()">Next Match</button>
          </div>
          <div class="computer">
            <p align="center">Computer Picked</p>
            <div class="result-button result-${values[r - 1]}">
              <img src="../../images/icon-${values[r - 1]}.svg" alt="${
    values[r - 1]
  }" />
            </div>
          </div>
        </div>
  `;
}
function matchLoss(i, r) {
  score = score - 1;
  document.getElementById("score").innerText = score;
  document.getElementById("dynamic").innerHTML = `
  <div class="result">
          <div class="user">
            <p align="center">You Picked</p>
            <div class="result-button result-${values[i - 1]}">
              <img src="../../images/icon-${values[i - 1]}.svg" alt="${
    values[i - 1]
  }" />
            </div>
          </div>
          <div class="info">
            <h1 align="center">You Lost</h1>
            <button class="result-btn" onclick="nextMatch()">Retry</button>
          </div>
          <div class="computer">
            <p align="center">Computer Picked</p>
            <div class="result-button result-${values[r - 1]} result-winner">
              <img src="../../images/icon-${values[r - 1]}.svg" alt="${
    values[r - 1]
  }" />
            </div>
          </div>
        </div>
  `;
}

function nextMatch() {
  document.getElementById("dynamic").innerHTML = `
    <div class="player-choice">
          <div class="upper-choice">
            <button
              class="choice-button choice-scissor"
              onclick="handleStart(1)"
            >
              <img src="../../images/icon-scissors.svg" />
            </button>
          </div>
          <div class="middle-choice">
            <button class="choice-button choice-spock" onclick="handleStart(5)">
              <img src="../../images/icon-spock.svg" />
            </button>
            <button class="choice-button choice-paper" onclick="handleStart(2)">
              <img src="../../images/icon-paper.svg" />
            </button>
          </div>
          <div class="bottom-choice">
            <button
              class="choice-button choice-lizard"
              onclick="handleStart(4)"
            >
              <img src="../../images/icon-lizard.svg" />
            </button>
            <button class="choice-button choice-rock" onclick="handleStart(3)">
              <img src="../../images/icon-rock.svg" />
            </button>
          </div>
        </div>
    `;
}

function reset() {
  localStorage.setItem("round-ls", 0);
  localStorage.setItem("match-ls", 0);
  localStorage.setItem("score-ls", 0);
  document.getElementById("round").innerText = "Round 1";
  document.getElementById("match-info").innerText = `Match 1 of 5`;
  document.getElementById("score").innerText = 0;
}
