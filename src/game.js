"use strict";
// 정보를 기억하고 있을 필요는 없다.

import { GameField, itemType } from "./field.js";
import * as sound from "./audio.js";

// 문자열 비교시 실수할 수 있기때문에 - freeze🧚‍♀️
export const Reason = Object.freeze({
  win: "win",
  lost: "lost",
  cancel: "cancel",
});

// 🤔 level 설정!
//level 1, 2, 3
// gameDuration ==
// carrot 10, 15, 20 (+5)
// bug 5, 8, 11 (+5)

// ✨ builder pattern : 간단명료, 가독성 좋음
//정확하게 어떤 값을 설정하는지 한눈에 알아보기 쉽다.
export default class GameBuilder {
  gameLevel(level) {
    this.gameLevel = level;
    return this;
  }

  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  build() {
    return new Game(
      this.gameLevel,
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(game_level, game_duration, carrot_count, bug_count) {
    this.game_level = game_level;
    this.game_duration = game_duration;
    this.carrot_count = carrot_count;
    this.bug_count = bug_count;
    this.timeId = undefined;

    this.field_btn = document.querySelector(".field_btn");
    this.timer = document.querySelector(".timer");
    this.score = document.querySelector(".score");
    this.level = document.querySelector(".level");

    this.field_btn.addEventListener("click", () => {
      // if (field_btn.classList.contains("stop_btn")) { -> 난 상태를 이렇게 기준점을 나눴지만 엘리쌤처럼 하는 게 더 좋은듯
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
      // started = !started; // true => false , false => true
      // ✨ 이부분을 수정했음!! 당근 클릭 되어씀!
    });

    this.started = false; // 시작되었는가?를 기억
    this._score = 0; // 최종적인 점수를 기억
    this.timeId = undefined;

    this.gameField = new GameField(bug_count, carrot_count);
    this.gameField.setClickListener(this.onItemClick); //콜백함수등록
  }

  //game.js -> main.js 게임이 멈췄을 때 알려줄 수 있도록 리스너 등록
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this._score = 0;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    this.levelUp();
    this.showLevelZone();
    sound.playBack();
  }

  stop(reason) {
    this.started = false;
    this._score = 0;
    this.stopTimer();
    this.hideGameButton();
    this.hideLevelZone();
    sound.stopBack();
    this.onGameStop && this.onGameStop(reason);
  }

  //✨binding
  onItemClick = (item) => {
    // ✨ 게임이 시작되지 않았다면! 함수를 나간다.
    if (!this.started) {
      return;
    }
    //타겟이 css selector가 맞는지. = matches
    if (item === itemType.carrot) {
      this._score++;
      this.updateScoreBoard(this._score);
      if (this._score === this.carrot_count) {
        this.stop(Reason.win);
      }
    } else if (item === itemType.bug) {
      this.stop(Reason.lost);
    }
  };

  initGame() {
    this._score = 0;
    this.score.innerText = this.carrot_count;
    this.gameField.init(); //class이렇게 쓰기
  }

  startTimer() {
    let remainingTimeSec = this.game_duration;
    this.updateTimerText(remainingTimeSec);
    this.timeId = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timeId);
        this.stop(this.carrot_count === this._score ? Reason.win : Reason.lost); // 타이머 시간이 끝나면
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timer.innerText = `${minutes}:${seconds}`;
  }

  stopTimer() {
    clearInterval(this.timeId);
  }

  updateScoreBoard(_score) {
    this.score.innerText = this.carrot_count - _score;
  }

  levelUp() {
    this.level.innerText = `level ${this.game_level}`;
  }

  showStopButton() {
    const icon = this.field_btn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.field_btn.style.visibility = "visible";
  }

  showTimerAndScore() {
    this.timer.style.visibility = "visible";
    this.score.style.visibility = "visible";
  }

  showLevelZone() {
    this.level.style.visibility = "visible";
  }

  hideGameButton() {
    this.field_btn.style.visibility = "hidden";
  }

  hideLevelZone() {
    this.level.style.visibility = "hidden";
  }
}
