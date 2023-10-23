let game = document.querySelector(".game");
let boxs = document.querySelectorAll(".box");
let score = document.querySelector(".score span");
let player = document.querySelector(".name span");
let start = document.querySelector(".start-btn");
let overlay = document.querySelector(".overlay");
let successAudio = document.querySelector(".success-aud");
let failureAudio = document.querySelector(".failure-aud");
let finalScore = document.querySelector(".final-score");
let finalScoreSpan = document.querySelector(".final-score span");
let scoreIcon = document.querySelector(".score-icon");
let scoresList = document.querySelector(".scores-list");
let closeScoreList = document.querySelector(".btn .close");
let clearScoreList = document.querySelector(".btn .clear");
let scoreTable = document.querySelector(".scores-list table tbody");

let newArray = Array.from(boxs);
let orderArray = [...newArray.keys()];
let errorTry = 0,
  finish = 0;

// Shuffle

shuffle(orderArray);

// Start game

start.onclick = function () {
  overlay.style.display = "none";
  start.style.display = "none";
  let name = window.prompt("Enter your name");
  player.innerHTML = name != "" && name != null ? name : "player";
  startGame();
};

// Main game function

newArray.forEach((box, index) => {
  box.style.order = orderArray[index];
  box.onclick = function () {
    box.classList.toggle("rotate");
    let roratedBoxes = newArray.filter((el) => el.classList.contains("rotate"));
    if (roratedBoxes.length === 2) {
      stopClicking();
      matched(roratedBoxes[0], roratedBoxes[1]);
    }
    if (finish == 18) {
      finalScoreSpan.innerHTML = errorTry;
      finalScore.style.display = "block";
      overlay.style.display = "block";
      saveLocal(player.innerHTML, errorTry);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  };
});

// Scores

if (window.localStorage.getItem("score")) {
  fillScoreTable();
}

scoreIcon.onclick = function () {
  scoresList.classList.add("show-score");
  overlay.style.display = "block";
};
closeScoreList.onclick = function () {
  scoresList.classList.remove("show-score");
  overlay.style.display = "none";
};
clearScoreList.onclick = function () {
  window.localStorage.clear();
  scoresList.classList.remove("show-score");
  overlay.style.display = "none";
  scoreTable.innerHTML = "";
};

// Functions

function matched(box_1, box_2) {
  if (box_1.dataset.set === box_2.dataset.set) {
    box_1.classList.remove("rotate");
    box_2.classList.remove("rotate");
    box_1.classList.add("matched");
    box_2.classList.add("matched");
    finish++;
    successAudio.play();
  } else {
    score.innerHTML = ++errorTry;
    failureAudio.play();
    setTimeout(() => {
      box_1.classList.remove("rotate");
      box_2.classList.remove("rotate");
    }, 1000);
  }
}

function stopClicking() {
  game.classList.add("block-game");
  setTimeout(function () {
    game.classList.remove("block-game");
  }, 1000);
}

function startGame() {
  newArray.forEach((box) => {
    box.classList.add("rotate");
  });
  setTimeout(function () {
    newArray.forEach((box) => {
      box.classList.remove("rotate");
    });
  }, 2000);
}

function shuffle(tab) {
  tab.forEach((el) => {
    let random = Math.trunc(Math.random() * tab.length);
    [tab[tab.indexOf(el)], tab[random]] = [tab[random], tab[tab.indexOf(el)]];
  });
  return tab;
}

function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return (result = `${day}/${month}/${year}`);
}

function saveLocal(name, errors) {
  let tab = [];
  let newObj = {};
  newObj.name = name;
  newObj.errors = errors;
  newObj.date = getDate();

  if (window.localStorage.getItem("score")) {
    tab = JSON.parse(window.localStorage.getItem("score"));
    tab.push(newObj);
    window.localStorage.setItem("score", JSON.stringify(tab));
  } else {
    tab.push(newObj);
    window.localStorage.setItem("score", JSON.stringify(tab));
  }
}

function fillScoreTable() {
  let newTab = JSON.parse(window.localStorage.getItem("score"));
  newTab.forEach((el) => {
    let tr = document.createElement("tr");
    let player = document.createElement("td");
    let score = document.createElement("td");
    let date = document.createElement("td");
    player.innerHTML = el.name;
    score.innerHTML = el.errors;
    date.innerHTML = el.date;
    tr.appendChild(player);
    tr.appendChild(score);
    tr.appendChild(date);
    scoreTable.appendChild(tr);
  });
}
