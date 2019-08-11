import React from "react";

export default class Enemy {
  hp = 1;
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
}
