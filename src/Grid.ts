import { Cell, CellContent } from "./Cell";

export class Grid {
  private readonly grid: Cell[][] = [];
  readonly height: number;
  readonly width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;

    for (let i = 0; i < height; i++) {
      this.grid.push([]);
      for (let j = 0; j < width; j++) {
        this.grid[i].push(new Cell(i, j));
      }
    }
  }

  getCell(i: number, j: number): Cell {
    return this.grid[i][j];
  }

  setCellContent(i: number, j: number, content: CellContent): void {
    this.getCell(i, j).content = content;
  }

  toString(): string {
    let resStr: string = "";

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        resStr += ` ${this.getCell(i, j).content} `;
      }
      resStr += "\n";
    }

    return resStr;
  }
}
