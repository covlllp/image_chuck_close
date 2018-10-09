import * as React from 'react';

import { Canvas } from 'js/components/canvas';
import { Image } from 'js/components/image';

interface ImageDataCollectorProps {
  imageId: string;
  imageName: string;
  onDataCollected?: (data: ImageData) => void;
}
interface ImageDataCollectorState {
  isImageLoaded: boolean;
}

export class ImageDataCollector extends React.Component<
  ImageDataCollectorProps,
  ImageDataCollectorState
> {
  state: ImageDataCollectorState = {
    isImageLoaded: false,
  };

  private handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  private drawCanvas = (
    canvasElem: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => {
    const { imageId, onDataCollected } = this.props;
    const canvas = canvasElem;
    const image = document.getElementById(imageId) as HTMLImageElement;
    if (!image) return;
    const { naturalHeight, naturalWidth } = image;
    canvas.height = naturalHeight;
    canvas.width = naturalWidth;
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, naturalWidth, naturalHeight);
    if (onDataCollected) {
      onDataCollected(data);
    }
  };

  render() {
    const { imageName, imageId } = this.props;
    const { isImageLoaded } = this.state;
    return (
      <div>
        {isImageLoaded ? (
          <Canvas className="hidden" drawCanvas={this.drawCanvas} />
        ) : null}
        <Image
          id={imageId}
          className="image hidden"
          name={imageName}
          onLoad={this.handleImageLoad}
        />
      </div>
    );
  }
}
