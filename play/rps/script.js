let rules = false;

let round = localStorage.getItem("round") || 0;
round = parseInt(round);
const currentRound = round + 1;
let score = localStorage.getItem("score") || 0;
score = parseInt(score);
let match = localStorage.getItem("match") || 0;
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

const values = ["paper", "scissors", "rock"];
const terminator = [2, 3, 1];

function generateRandom() {
  let difference = 3;
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
  if (i == r) {
    return matchTie(i, r);
  } else {
    return terminator[i - 1] === r ? matchLoss(i, r) : matchWon(i, r);
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
    localStorage.setItem("round", round);
    document.getElementById("round").innerText = `Round ${round + 1}`;
    localStorage.setItem("match", 0);
    localStorage.setItem("score", 0);
    document.getElementById("score").innerText = 0;
    document.getElementById(
      "match-info"
    ).innerText = `Match 1 of ${totalMatch}`;
  } else {
    localStorage.setItem("score", score);
    document.getElementById("score").innerText = score;
    localStorage.setItem("match", match);
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
            <button class="choice-button choice-paper" onclick="handleStart(1)">
              <img src="../../images/icon-paper.svg" alt="Paper" />
            </button>
            <button
              class="choice-button choice-scissor"
              onclick="handleStart(2)"
            >
              <img src="../../images/icon-scissors.svg" alt="Scissor" />
            </button>
          </div>
          <div class="bottom-choice">
            <button class="choice-button choice-rock" onclick="handleStart(3)">
              <img src="../../images/icon-rock.svg" alt="Rock" />
            </button>
          </div>
        </div>
    `;
}

function reset() {
  localStorage.setItem("round", 0);
  localStorage.setItem("match", 0);
  localStorage.setItem("score", 0);
  document.getElementById("round").innerText = "Round 1";
  document.getElementById("match-info").innerText = `Match 1 of 5`;
  document.getElementById("score").innerText = 0;
}
