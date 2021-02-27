"use strict";

// 게임에대한 정보는 모름, 아이템을 배치하고 클릭만 핸들링 함
import * as sound from "./audio.js";

const carrot_size = 80;

export const itemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class GameField {
  constructor(bug_count, carrot_count) {
    this.bug_count = bug_count;
    this.carrot_count = carrot_count;
    this.score = document.querySelector(".score");
    this.ground = document.querySelector(".ground");
    this.groundRect = this.ground.getBoundingClientRect();
    // this.ground.addEventListener("click", (event) => this.onClick(event)); //arrow function은 this가 유지된디ㅏ.
    this.ground.addEventListener("click", this.onClick);
  }
  init() {
    this.ground.innerHTML = " ";
    this._addItem("carrot", this.carrot_count, "./img/carrot.png");
    this._addItem("bug", this.bug_count, "./img/bug.png");
  }
  // _ (underscore)는 프라이빗 함수를 나타낸다. -> 예전에 썼던 방법이라 좋지 않다.
  _addItem(className, count, src) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.groundRect.width - carrot_size;
    const y2 = this.groundRect.height - carrot_size;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      const x = randomNumber(x2, x1);
      const y = randomNumber(y2, y1);
      item.setAttribute("class", className);
      item.setAttribute("src", src);
      item.style.position = "absolute";
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.ground.append(item);
    }
  }

  //게임이 시작했는지 아닌지 그런건 몰라요.
  //콜백을 등록할 수 있도록 하는것 = setClickListener!✨
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // ✨ this 바인딩
  // 클래스 안에있는 어떤 함수를 다른 콜백으로 전달할 떄는
  // onClick이라는 멤버변수를 만들고 이 멤버변수는 arrow function을 가리키고 있게 만든다.
  // 자동적으로 this가 바인딩이 된다.
  // this = 어떤 클래스안에 있는 함수를 콜백으로 전달할 때, 함수에 포함되어 있는 클래스의 정보가 사라진다.
  //  그래서 클래스와 this를 묶는 데 사용하는 것이 바인딩. 이 떄, arrow function을 사용하면 간편하게 바인딩 해줄 수 있다.
  onClick = (event) => {
    const item = event.target;
    if (item.matches(".carrot")) {
      item.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(itemType.carrot);
    } else if (item.matches(".bug")) {
      this.onItemClick && this.onItemClick(itemType.bug);
    }
  };
}

// ✨
// randomNUmber 는 필드안의 데이터와 무관하게 공통적으로 쓰인다.
// 클래스는 == 청사진,  클래스를 new를 이용해서 오브젝트를 만들 때,
// 만들어진 오브젝트마다 함수들이 들어가 있다. ->즉, 메모리에 동일하게 올라간다.
//클래스에 상관없는 함수라면 클래스에 포함하는 것보다 밖에주는 게 효율적 -> static 함수
function randomNumber(max, min) {
  return Math.random() * (max - min) + min;
}
