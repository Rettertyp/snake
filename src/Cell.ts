export enum CellContent {
  EMTPY = "-",
  SNAKE = "O",
  FOOD = "X",
}

export class Cell {
  content: CellContent = CellContent.EMTPY;
  readonly i: number;
  readonly j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}
