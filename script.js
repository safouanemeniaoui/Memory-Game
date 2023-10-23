let boxs = document.querySelectorAll(".box");
let score = document.querySelector(".score span");
let player = document.querySelector(".name span");
let start = document.querySelector(".start-btn");
let overlay = document.querySelector(".overlay");
let successAudio = document.querySelector(".success-aud");
let failureAudio = document.querySelector(".failure-aud");
let finalScore = document.querySelector(".final-score");
let finalScoreSpan = document.querySelector(".final-score span");
let newArray = Array.from(boxs);

let val_1 = 0,
  val_2 = 0,
  counter = 0,
  errorTry = 0,
  finish = 0,
  f = 0,
  l = 0;

// start game

start.onclick = function () {
  overlay.style.display = "none";
  start.style.display = "none";
  let name = window.prompt("Enter your name");
  player.innerHTML = name != "" ? name : "player";
};

// Shuffle

let orderArray = [...newArray.keys()];
function shuffle(tab) {
  tab.forEach((el) => {
    let random = Math.trunc(Math.random() * tab.length);
    [tab[tab.indexOf(el)], tab[random]] = [tab[random], tab[tab.indexOf(el)]];
  });
  return tab;
}
shuffle(orderArray);

// Main game function

newArray.forEach((box, index) => {
  box.style.order = orderArray[index];
  box.onclick = function () {
    box.classList.toggle("rotate");
    counter++;
    if (val_1 == 0) {
      val_1 = box.dataset.set;
      f = newArray.indexOf(box);
      box.classList.add("correct");
    }
    if (counter == 2) {
      l = newArray.indexOf(box);
      val_2 = box.dataset.set;
      if (val_2 == val_1 && f != l) {
        finish++;
        successAudio.play();
        check(newArray, val_1);
        check(newArray, val_1);
      } else {
        score.innerHTML = ++errorTry;
        failureAudio.play();
        newArray[f].classList.remove("correct");
        setTimeout(() => {
          newArray.forEach((bx) => {
            bx.classList.remove("rotate");
          });
        }, 500);
      }
      counter = val_1 = val_2 = 0;
    }
    if (finish == 18) {
      finalScoreSpan.innerHTML = errorTry;
      finalScore.style.display = "block";
      overlay.style.display = "block";
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  };
});

function check(array = [], val) {
  array.forEach((bx) => {
    if (bx.dataset.set == val) {
      bx.classList.add("correct");
      array.splice(array.indexOf(bx), 1);
    }
  });
}
