import Enemy from "./Enemy";
export default class Map {
  size = 200;
  enemies = [new Enemy()];
  slots = [];
  queue = []; // including when
  tickNumber = 0;
  waveNumber = 0;
  waves = []; // what and when for each wave
  coins = 1000;
  hp = 100;
  maxHp = 100;

  tick() {
    this.tickNumber++;
    // Advance
    for (const enemy of this.enemies) {
      enemy.tick();
      if (enemy.pos > this.size) {
        this.hp -= enemy.hp;
        this.removeEnemy(enemy);
      }
    }

    // Die
    if (this.hp <= 0) {
      this.lose();
    }

    // Spawn
    for (const slot of this.slots) {
      slot.tick();
    }

    // Check for end of wave
    if (this.enemies.length === 0 && this.queue.length === 0) {
      this.waveNumber++;
      this.tickNumber = 0;
      if (this.waves.length > 0) {
        this.queue = this.waves[this.waveNumber].queue;
        alert("Next wave");
      } else {
        alert("You win");
      }
    }
  }

  lose() {
    alert("You lose");
  }
}
