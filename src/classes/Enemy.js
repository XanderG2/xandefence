import React from "react";

export default class Enemy {
  maxHp = 10;
  hp = this.maxHp;
  pos = 0;
  speed = 1;
  effects = []; // Includes duration

  tick() {
    this.pos += this.speed;
  }

  isDead() {
    return this.hp <= 0;
  }

  render() {
    return <span>E</span>;
  }
  renderWithHealthBar() {
    return (
      <span className="enemyWithBar">
        <span className="healthBar">
          <span
            className="healthBarHealth"
            style={{ width: (100 * this.hp) / this.maxHp + "%" }}
          />
        </span>
        {this.render()}
      </span>
    );
  }
}
