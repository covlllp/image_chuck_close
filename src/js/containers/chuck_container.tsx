import * as React from 'react';

import { ChuckCloseImage } from 'js/containers/chuck_image';
import { ImageDataCollector } from 'js/containers/image_data';

import { CANVAS_SIZE } from 'js/constants';

interface ChuckCloseContainerProps {
  imageName: string;
  numBlocks: number;
}

interface ChuckCloseContainerState {
  imageData: ImageData | null;
}

export class ChuckCloseContainer extends React.Component<
  ChuckCloseContainerProps,
  ChuckCloseContainerState
> {
  state: ChuckCloseContainerState = {
    imageData: null,
  };

  private handleDataCollected = (data: ImageData) => {
    const { imageData } = this.state;
    if (!imageData) {
      this.setState({ imageData: data });
    }
  };

  render() {
    const { imageName, numBlocks } = this.props;
    const { imageData } = this.state;
    return (
      <div>
        <ImageDataCollector
          imageId="main-image"
          onDataCollected={this.handleDataCollected}
          imageName={imageName}
        />
        {imageData ? (
          <ChuckCloseImage
            imageData={imageData}
            numBlocks={numBlocks}
            height={CANVAS_SIZE}
            width={CANVAS_SIZE}
          />
        ) : null}
      </div>
    );
  }
}
