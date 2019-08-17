export default class Tower {
  range = 5;
  aoe = true;
  reloadSpeed = 3;
  cooldown = this.reloadSpeed;
  effect = null;
  effectDuration = 0;
  damage = 1;
  level = 1;

  tick(slot, enemies) {
    if (this.cooldown > 0) {
      this.cooldown--;
    } else {
      const enemiesInRange = enemies.filter(
        enemy => Math.abs(enemy.pos - slot.pos) <= this.range
      );
      if (enemiesInRange.length) {
        this.cooldown = this.reloadSpeed;
        const enemiesToAttack = this.aoe ? enemiesInRange : [enemiesInRange[0]];
        for (const enemy of enemiesToAttack) {
          enemy.attack(this.damage);
        }
      }
    }
  }
}
