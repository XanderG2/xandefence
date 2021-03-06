import Tower from "./Tower";

export default class Slot {
  cost = 100;
  tower = new Tower();
  pos = 0;
  up = true;
  constructor(_pos, _up) {
    this.pos = _pos;
    this.up = _up;
  }
  tick(enemies) {
    if (this.tower) {
      this.tower.tick(this, enemies);
    }
  }
}
