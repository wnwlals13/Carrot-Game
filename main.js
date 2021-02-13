"use strict";

const startBtn = document.querySelector(".startBtn");
const remainTime = document.querySelector(".remainTime");
const clickCount = document.querySelector(".clickCount");
const playground = document.querySelector(".playground");
const gaming = document.querySelector(".gaming");
const afterGame = document.querySelector(".afterGame");
const afterIcon = document.querySelector(".afterIcon");
const afterMent = document.querySelector(".afterMent");
const icon = document.querySelectorAll(".icon");
const carrot = document.querySelectorAll(".carrot");
const bug = document.querySelectorAll(".bug");
let time = 10;
let count = 0;
let isStop = Boolean(false);
const audio = new Audio("sound/bg.mp3");
const success = new Audio("sound/game_win.mp3");
const fail = new Audio("sound/alert.wav");
const carrot_pull = new Audio("sound/carrot_pull.mp3");
const bug_pull = new Audio("sound/bug_pull.mp3");

// 1. icons get random position
function getRandomPosition(icon) {
  icon.forEach((elem) => {
    const width = Math.floor(Math.random() * (playground.offsetHeight + 100));
    const height = Math.floor(Math.random() * (playground.offsetWidth - 100));

    elem.style.position = `absolute`;
    elem.style.transform = `translate(${width}%,${height}%)`;
  });
}

// 2. when click startBtn, start timer & positioning
startBtn.addEventListener("click", () => {
  // audio.play();
  startGame();
  getRandomPosition(icon);
});

function startGame() {
  startBtn.innerHTML = `<i class="fas fa-stop""></i>`;
  const stopBtn = document.querySelector(".fa-stop");
  stopBtn.addEventListener("click", () => {
    stopGame();
  });
  gaming.style.visibility = "visible";
  const decrease = setInterval(() => {
    if (time > 0 && !isStop && count < 10) {
      setTimer(--time);
      result(time, null);
    } else {
      clearInterval(decrease);
      gaming.style.visibility = `hidden`;
      remainTime.innerHTML = `00:10`;
      clickCount.innerHTML = `0`;
      startBtn.innerHTML = `<i class="fas fa-play"></i>`;
      afterGame.style.visibility = "visible";
    }
  }, 1000);
}

function setTimer(time) {
  remainTime.innerHTML = `00:0${time}`;
}

// 3. when click stopBtn,stop game
function stopGame() {
  console.log("stopBtn clicked");
  startBtn.innerHTML = `<i class="fas fa-play"></i>`;
  afterGame.style.visibility = "visible";
  gaming.style.visibility = `hidden`;
  remainTime.innerHTML = `00:10`;
  clickCount.innerHTML = `0`;
}

// 4. when click restartBtn, restart game
afterIcon.addEventListener("click", () => {
  afterGame.style.visibility = "hidden";
  time = 10;
  count = 0;
  startGame();
  getRandomPosition(icon);
  icon.forEach((element) => {
    element.style.visibility = "visible";
  });
});

// 3. when click icons, remove them
carrot.forEach((element) =>
  element.addEventListener("click", () => {
    removeElement(element);
  })
);

// 4. when click icons, hide them
function removeElement(element) {
  clickCount.innerHTML = `${++count}`;
  element.style.visibility = "hidden";
  result(null, count);
}

// 5. if you click all carrots, you win. if you or not, you fail.
function result(time, count) {
  if ((count != null || time === 0) && count >= 10) {
    isStop = "";
    audio.pause();
    success.play();
    audio.currentTime = 0;
    remainTime.innerHTML = `00:10`;
    clickCount.innerHTML = `${count}`;
    afterMent.innerHTML = `You Win 🎉`;
    afterGame.style.visibility = "visible";
  } else if ((count != null || time === 0) && count < 10) {
    afterMent.innerHTML = `You Lost 💩`;
    audio.pause();
  } else if (time > 0) {
  }
}
