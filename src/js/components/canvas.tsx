import * as React from 'react';

interface CanvasProps {
  className?: string;
  drawCanvas?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => void;
}

export class Canvas extends React.Component<CanvasProps, {}> {
  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  private canvas: HTMLCanvasElement;

  private drawCanvas() {
    if (!this.canvas) return;
    const context = this.canvas.getContext('2d');
    if (!context) return;
    const { drawCanvas } = this.props;
    if (!drawCanvas) return;
    drawCanvas(this.canvas, context);
  }

  render() {
    const { className } = this.props;
    return (
      <canvas
        className={className}
        ref={c => {
          this.canvas = c;
        }}
      />
    );
  }
}
