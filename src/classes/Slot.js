export default class Slot {
  cost = 100;
  tower = null;
  pos = 0;
  up = true;
  constructor(_pos, _up) {
    this.pos = _pos;
    this.up = _up;
  }
  tick() {
    if (this.tower) {
      this.tower.tick();
    }
  }
}
