import * as React from 'react';

import { ChuckCloseImage } from 'js/containers/chuck_image';
import { ImageDataCollector } from 'js/containers/image_data';
import { getCanvasDimensions } from 'js/lib/image_data';

interface ChuckCloseContainerProps {
  imageName: string;
  numBlocks: number;
}

interface ChuckCloseContainerState {
  imageData: ImageData | null;
  windowWidth: number;
  windowHeight: number;
}

export class ChuckCloseContainer extends React.Component<
  ChuckCloseContainerProps,
  ChuckCloseContainerState
> {
  constructor(props: ChuckCloseContainerProps) {
    super(props);

    this.state = {
      imageData: null,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  private handleDataCollected = (data: ImageData) => {
    const { imageData } = this.state;
    if (!imageData) {
      this.setState({ imageData: data });
    }
  };

  private updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  render() {
    const { imageName, numBlocks } = this.props;
    const { imageData, windowHeight, windowWidth } = this.state;

    const dimensions = getCanvasDimensions(imageData, {
      height: windowHeight,
      width: windowWidth,
    });

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
            height={dimensions.height}
            width={dimensions.width}
          />
        ) : null}
      </div>
    );
  }
}
