import { Grid } from "./Grid";
import { Direction, Snake } from "./Snake";

export class Game {
  private readonly grid: Grid;
  private readonly snake: Snake;
  private isAlive: boolean = true;

  constructor(height: number, width: number) {
    this.grid = new Grid(height, width);
    this.snake = new Snake(this.grid);
  }

  async play(): Promise<void> {
    while (this.isAlive) {
      this.print();

      // wait
      await new Promise<void>((resolve) => {
        const delay = 1000 - this.snake.getLength() * 40;
        setTimeout(() => resolve(), delay);
      });

      this.isAlive = this.snake.move();
    }

    console.log("\n\n\nGAME OVER!");

    process.exit();
  }

  private print(): void {
    let resStr = "\n\n\n\n\n\n\n\n\n\n\n" + this.grid.toString();
    resStr += "\nScore: " + this.snake.getLength();
    console.log(resStr);
  }

  setDirection(direction: Direction): void {
    this.snake.setDirection(direction);
  }
}
