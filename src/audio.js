const bg = new Audio("../sound/bg.mp3");
const alert = new Audio("../sound/alert.wav");
const bug_pull = new Audio("../sound/bug_pull.mp3");
const carrot_pull = new Audio("../sound/carrot_pull.mp3");
const win = new Audio("../sound/game_win.mp3");

export function playCarrot() {
  playSound(carrot_pull);
}

export function playBug() {
  playSound(bug_pull);
}

export function playAlert() {
  playSound(alert);
}

export function playWin() {
  playSound(win);
}

export function playBack() {
  playSound(bg);
}

export function stopBack() {
  stopSound(bg);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
