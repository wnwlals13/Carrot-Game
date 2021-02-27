"use strict";

// import GameBuilder from "./game";

// popup 클래스
export default class PopUp {
  constructor() {
    // replay section에 있는 돔요소들을 가져와서 초기화해줌
    // 이렇게 돔요소들을 클래스의 컨스트럭터로 지정해도 되는군! 🤔
    this.replay_btn = document.querySelector(".replay_btn");
    this.replay = document.querySelector(".replay");
    this.result = document.querySelector(".result");

    this.replay_btn.addEventListener("click", () => {
      this.onClick && this.onClick(); //등록된 onClick 멤버변수가 있다면 호출!
      this.hide();
    });
  }

  // ✨ 잘 이해가 가지 않는 부분!
  // 사용자가 Popup 클래스의 setClickListener를 등록하면,
  // 등록된 onClick을 호출해준다.
  // onClick이라는 콜백을 등록해놓을 테니까 팝업에서 버튼이 클릭되면
  // 내가 전달해준 이 onClick을 호출해!
  setClickListener(onClick) {
    this.onClick = onClick; //onClick 멤버변수는 전달받은 onClick을 가리킴
  }
  hide() {
    this.replay.classList.add("replay-hide");
  }
  showWithText(text) {
    this.result.innerHTML = text;
    this.replay.classList.remove("replay-hide");
  }

  nextLevelBtn() {
    const levelUp = this.replay_btn.querySelector(".fas");
    levelUp.classList.remove("fa-redo-alt");
    levelUp.classList.add("fa-long-arrow-alt-right");
    this.levelUp = this.levelUp + 1;
  }
}
