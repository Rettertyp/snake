import { Game } from "./src/Game";
import { Direction } from "./src/Snake";
import * as readline from "readline";

const game = new Game(10, 10);

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  switch (key.name) {
    case "up":
      game.setDirection(Direction.UP);
      break;
    case "right":
      game.setDirection(Direction.RIGHT);
      break;
    case "down":
      game.setDirection(Direction.DOWN);
      break;
    case "left":
      game.setDirection(Direction.LEFT);
      break;
    case "c":
      if (key.ctrl) {
        process.exit();
      }
      break;
  }
});

game.play();
