import { Cell, CellContent } from "./Cell";
import { Grid } from "./Grid";
import { LinkedList } from "./LinkedList";

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export class Snake {
  private readonly body: LinkedList<Cell> = new LinkedList();
  private direction: Direction = Direction.UP;
  private readonly grid: Grid;
  private length: number = 1;

  constructor(grid: Grid) {
    this.grid = grid;

    this.init();
  }

  private init(): void {
    const snakeI: number = Math.floor(this.grid.height / 2);
    const snakeJ: number = Math.floor(this.grid.width / 2);

    const startCell: Cell = this.grid.getCell(snakeI, snakeJ);
    this.moveHead(startCell);

    this.spawnFood();
  }

  private spawnFood(): void {
    let i: number;
    let j: number;

    do {
      i = Math.floor(Math.random() * this.grid.height);
      j = Math.floor(Math.random() * this.grid.width);
    } while (this.grid.getCell(i, j).content !== CellContent.EMTPY);

    this.grid.getCell(i, j).content = CellContent.FOOD;
  }

  private moveHead(cell: Cell): void {
    this.body.insertAtBegin(cell);
    cell.content = CellContent.SNAKE;
  }

  private removeTail(): void {
    const removedCell: Cell = this.body.removeLast();
    removedCell.content = CellContent.EMTPY;
  }

  private getNextCell(): Cell | null {
    const head: Cell = this.body.peak();
    let newI: number = head.i;
    let newJ: number = head.j;

    switch (this.direction) {
      case Direction.UP:
        newI--;
        break;
      case Direction.RIGHT:
        newJ++;
        break;
      case Direction.DOWN:
        newI++;
        break;
      case Direction.LEFT:
        newJ--;
        break;
    }

    if (newI < 0 || newJ < 0 || newI >= this.grid.height || newJ >= this.grid.width || this.grid.getCell(newI, newJ).content === CellContent.SNAKE) {
      return null;
    }

    return this.grid.getCell(newI, newJ);
  }

  move(): boolean {
    const nextCell: Cell | null = this.getNextCell();

    // check whether we crashed
    if (!nextCell) return false;

    // check whether food was eaten
    const ateFood: boolean = nextCell.content === CellContent.FOOD;

    this.moveHead(nextCell);

    if (ateFood) {
      this.length++;
      this.spawnFood();
    } else {
      this.removeTail();
    }

    return true;
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
  }

  getLength(): number {
    return this.length;
  }
}
