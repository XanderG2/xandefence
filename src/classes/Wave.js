import shuffle from "../utils/shuffle";

const SPAWN_INTERVAL = 10;

export default class Wave {
  queue = []; // Including tick number

  constructor(waveDelay, enemiesTuples) {
    const enemies = [];
    for (const tuple of enemiesTuples) {
      const [EnemyClass, count] = tuple;
      for (let i = 0; i < count; i++) {
        const newEnemy = new EnemyClass();
        enemies.push(newEnemy);
      }
    }
    shuffle(enemies);

    let ticks = waveDelay;
    for (const enemy of enemies) {
      const delay = Math.floor(Math.random() * 2 * SPAWN_INTERVAL);
      ticks += delay;
      this.queue.push([enemy, ticks]);
    }
  }
}
