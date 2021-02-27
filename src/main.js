"use strict";

import PopUp from "./popUp.js";
import GameBuilder, { Reason } from "./game.js";
import * as sound from "./audio.js";

// ✨ 이 게임의 상태를 기억하고 있는 변수
// 상태를 기억하고 있는 변수가 왜 있어야 하는가? -> 동일 버튼을 클릭했을 때 게임의 상태가 달라지기 때문
// 동일한 field_btn을 클릭했을 때, 게임이 진행중인지? 아닌지에 따라서 처리해줘야 하는 로직이 달라진다.
// let started = false; // 시작되었는가?를 기억
// let _score = 0; // 최종적인 점수를 기억
// let timeId = undefined; //총 남은 시간, 게임시작 전에는 undefined

// 🍊 Popup
const gameFinishBanner = new PopUp(); // 이름은 더 의미있게 정해주는 게 좋음

// 🍊 game
const game = new GameBuilder()
  .gameLevel(1)
  .gameDuration(10)
  .carrotCount(10)
  .bugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY ❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = `You won🎉 level up❓`;
      gameFinishBanner.nextLevelBtn();
      sound.playWin();
      break;
    case Reason.lost:
      message = `You Lost 🐶`;
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
