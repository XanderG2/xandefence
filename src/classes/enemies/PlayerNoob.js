import Enemy from "../Enemy";
import React from "react";

export default class PlayerNoob extends Enemy {
  maxHp = 30;
  hp = this.maxHp;

  render() {
    return <span>N</span>;
  }
}
