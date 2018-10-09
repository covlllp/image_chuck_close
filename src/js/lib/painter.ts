import { getRange } from 'js/lib/image_data';

interface PainterOptions {
  height: number;
  width: number;
  numBlocks: number;
}

export class Painter {
  private height: number;

  private width: number;

  private numHeightBlocks: number;

  private numWidthBlocks: number;

  private context: CanvasRenderingContext2D;

  constructor(options: PainterOptions) {
    const { height, width } = options;
    this.height = height;
    this.width = width;
  }

  get minDimension() {
    return Math.min(this.height, this.width);
  }

  get blockWidth() {
    return Math.floor(this.width / this.numWidthBlocks);
  }

  updateOptions(
    blocks: {
      width: number;
      height: number;
    },
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    this.numHeightBlocks = blocks.height;
    this.numWidthBlocks = blocks.width;
    this.context = context;
  }

  paintBlock(col: number, row: number, color?: string) {
    const colInfo = getRange(this.width, col, this.numWidthBlocks);
    const rowInfo = getRange(this.height, row, this.numHeightBlocks);
    this.context.fillStyle = color || 'black';
    this.context.fillRect(
      colInfo.start,
      rowInfo.start,
      colInfo.length,
      rowInfo.length,
    );
  }
}
