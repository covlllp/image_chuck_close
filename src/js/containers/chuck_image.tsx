import * as React from 'react';

import { Canvas } from 'js/components/canvas';
import {
  RGBAToString,
  getAverageImageColor,
  getImageDataRanges,
  getNumBlockDimensions,
} from 'js/lib/image_data';
import { Painter } from 'js/lib/painter';

interface ChuckCloseImageProps {
  imageData: ImageData;
  height: number;
  width: number;
  numBlocks: number;
}

export class ChuckCloseImage extends React.Component<ChuckCloseImageProps> {
  constructor(props: ChuckCloseImageProps) {
    super(props);
    this.painter = new Painter(props);
  }

  componentDidUpdate() {
    this.painter = new Painter(this.props);
    this.drawCanvas(this.canvas, this.canvasContext);
  }

  private drawCanvas = (
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => {
    const canvas = canvasElem;
    const { imageData, height, width, numBlocks } = this.props;
    this.canvas = canvas;
    this.canvasContext = context;
    canvas.height = height;
    canvas.width = width;
    const blocks = getNumBlockDimensions(imageData, numBlocks);
    this.painter.updateOptions(blocks, canvasElem, context);

    for (let i = 0; i < blocks.width; i += 1) {
      for (let k = 0; k < blocks.height; k += 1) {
        const range = getImageDataRanges(imageData, i, k, blocks);
        const color = getAverageImageColor(imageData, range);
        this.painter.paintBlock(i, k, RGBAToString(color));
      }
    }
  };

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  private painter: Painter;

  render() {
    return (
      <div className="chuck-close">
        <Canvas drawCanvas={this.drawCanvas} />
      </div>
    );
  }
}
