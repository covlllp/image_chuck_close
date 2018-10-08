interface PainterOptions {
  height: number;
  width: number;
  numBlocks: number;
}

export class Painter {
  private height: number;

  private width: number;

  private numBlocks: number;

  private context: CanvasRenderingContext2D;

  constructor(options: PainterOptions) {
    const { height, numBlocks, width } = options;
    this.height = height;
    this.width = width;
    this.numBlocks = numBlocks;
  }

  get minDimension() {
    return Math.min(this.height, this.width);
  }

  get blockWidth() {
    return Math.floor(this.minDimension / this.numBlocks);
  }

  setCanvasOptions(
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    this.context = context;
  }

  paintBlock(col: number, row: number) {
    const dim = this.blockWidth;
    this.context.fillRect(col * dim, row * dim, dim, dim);
  }
}
