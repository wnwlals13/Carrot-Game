"use strict";

const startBtn = document.querySelector(".startBtn");
const remainTime = document.querySelector(".remainTime");
const clickCount = document.querySelector(".clickCount");
const gameField = document.querySelector(".game_field");
const fieldRect = gameField.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");
const popUpI = document.querySelector(".pop-up_icon");
const popUpM = document.querySelector(".pop-up_message");

const carrotSize = 80;
const carrotCount = 10;
const bugCount = 5;
const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const bgSound = new Audio("/sound/bg.mp3");
const alertSound = new Audio("/sound/alert.wav");
const winSound = new Audio("/sound/game_win.mp3");

let decrease = undefined;
let score = 0;
let started = false;
let game_duration = 10;

gameField.addEventListener("click", onFieldClick);
startBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpI.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

// start game
function startGame() {
  started = true;
  playSound(bgSound);
  getRandomPosition();
  showStopButton();
  showTimerAndScore();
  startTimer();
}

// stop game
function stopGame() {
  started = false;
  stopGameTimer();
  hideStartBtn();
  showPopUp("REPLAY ❓");
  playSound(alertSound);
  stopSound(bgSound);
}

//finish gmae
function finishGame(isWin) {
  started = false;
  stopGameTimer();
  hideStartBtn();
  if (isWin) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  showPopUp(isWin ? "You Won 🎉" : "You Lost💩");
}

function showStopButton() {
  const stopBtn = startBtn.querySelector(".fas");
  stopBtn.classList.add("fa-stop");
  stopBtn.classList.remove("fa-play");
  startBtn.style.visibility = "visible";
}

function showTimerAndScore() {
  remainTime.style.visibility = "visible";
  clickCount.style.visibility = "visible";
}

function startTimer() {
  let remaining = game_duration;
  updateTimerText(remaining);
  decrease = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(decrease);
      finishGame(carrotCount === score);
      return;
    }
    updateTimerText(--remaining);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60); // 3.2 -> 3
  const seconds = time % 60;
  remainTime.innerHTML = `${minutes}:${seconds}`;
}

function stopGameTimer() {
  clearInterval(decrease);
}

function hideStartBtn() {
  startBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  popUpM.innerHTML = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    //당근!
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard(score);
    if (score === carrotCount) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    //벌레!

    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard(score) {
  clickCount.innerHTML = carrotCount - score;
}

// 1. icons get random position
// make bug and carrot first, and add them to fields. (x, y, width, height) -> getBoundingClientRect();
function getRandomPosition() {
  score = 0;
  gameField.innerHTML = "";
  clickCount.innerHTML = carrotCount;
  addItem("carrot", carrotCount, "img/carrot.png");
  addItem("bug", bugCount, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrotSize; //gameField에서 캐럿의 사이즈를 빼줘야 이미지가 화면을 넘어가지 않는다.
  const y2 = fieldRect.height - carrotSize;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function randomNumber(min, max) {
  //included min, excluded max
  return Math.random() * (max - min) + min;
}

// 4. when click icons, hide them
// function removeElement(element) {
//   clickCount.innerHTML = `${--carrotCount}`;
//   element.style.visibility = "hidden";
//   // result(null, carrotCount);
// }
// 5. if you click all carrots, you win. if you or not, you fail.
// function result(time, count) {
//   if ((count != null || time === 0) && count <= 0) {
//     isStop = "";
//     audio.pause();
//     success.play();
//     audio.currentTime = 0;
//     remainTime.innerHTML = `00:10`;
//     popUpM.innerHTML = `You Win 🎉`;
//     popUp.classList.remove("pop-up--hide");
//   } else if ((count != null || time === 0) && count < 10) {
//     popUpM.innerHTML = `You Lost 💩`;
//     audio.pause();
//   } else if (time > 0) {
//   }
// }
