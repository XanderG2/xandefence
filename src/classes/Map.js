import Wave from "./Wave";
import NPCVillager from "./enemies/NPCVillager";
import PlayerNoob from "./enemies/PlayerNoob";
import Slot from "./Slot";

export default class Map {
  size = 200;
  enemies = [];
  slots = [
    new Slot(30, true),
    new Slot(60, false),
    new Slot(50, true),
    new Slot(100, false)
  ];
  queue = []; // including when
  tickNumber = 0;
  waveNumber = -1;
  waves = [
    new Wave(2, [[NPCVillager, 10]]),
    new Wave(5, [[NPCVillager, 20], [PlayerNoob, 4]])
  ]; // what and when for each wave
  coins = 1000;
  maxHp = 20;
  hp = this.maxHp;
  state = "PLAYING";
  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index >= 0) {
      this.enemies.splice(index, 1);
    }
  }
  tick() {
    this.tickNumber++;
    // Advance
    for (const enemy of this.enemies) {
      enemy.tick();
      if (enemy.isDead()) {
        this.removeEnemy(enemy);
      } else if (enemy.pos > this.size) {
        this.hp -= enemy.hp;
        this.removeEnemy(enemy);
      }
    }

    // Die
    if (this.hp <= 0) {
      this.lose();
    }

    // Spawn
    while (this.queue.length > 0 && this.queue[0][1] <= this.tickNumber) {
      const tuple = this.queue.shift();
      const enemy = tuple[0];
      this.enemies.push(enemy);
    }

    // Kill
    for (const slot of this.slots) {
      slot.tick(this.enemies);
    }

    // Check for end of wave
    if (this.enemies.length === 0 && this.queue.length === 0) {
      this.waveNumber++;
      this.tickNumber = 0;
      if (this.waves.length > this.waveNumber) {
        this.queue = [...this.waves[this.waveNumber].queue];
      } else {
        this.state = "WIN";
      }
    }
  }

  lose() {
    this.state = "LOSE";
  }
}
