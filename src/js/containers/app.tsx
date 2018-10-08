import * as React from 'react';

import { Image } from 'js/components/image';
import { Slider } from 'js/components/slider';

interface AppState {
  imageWidth: number;
}

export class App extends React.Component<{}, AppState> {
  state = {
    imageWidth: 0,
  };

  private updateImageWidth = (width: number) => {
    this.setState({
      imageWidth: width,
    });
  };

  render() {
    const { imageWidth } = this.state;
    return (
      <div className="app">
        <Image className="image" name="colin_vanlang.jpg" />
        {imageWidth}
        <Slider
          min={0}
          max={100}
          onChange={this.updateImageWidth}
          value={imageWidth}
        />
      </div>
    );
  }
}
