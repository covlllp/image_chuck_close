import * as React from 'react';

import { Canvas } from 'js/components/canvas';
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

  componentDidUpdate(prevProps: ChuckCloseImageProps) {
    const { numBlocks } = this.props;
    if (prevProps.numBlocks !== numBlocks) {
      this.painter = new Painter(this.props);
    }
  }

  private drawCanvas = (
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => {
    this.painter.setCanvasOptions(canvasElem, context);
    const canvas = canvasElem;
    const { height, width } = this.props;
    canvas.height = height;
    canvas.width = width;

    this.painter.paintBlock(3, 5);
  };

  private painter: Painter;

  render() {
    return (
      <div className="chuck-close">
        <Canvas drawCanvas={this.drawCanvas} />
      </div>
    );
  }
}
