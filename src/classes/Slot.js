export default class Slot {
  cost = 100;
  tower = null;

  tick() {
    if (this.tower) {
      this.tower.tick();
    }
  }
}
