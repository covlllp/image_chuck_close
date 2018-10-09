import * as React from 'react';

import { Slider } from 'js/components/slider';
import { ChuckCloseContainer } from 'js/containers/chuck_container';

import { STARTING_BLOCK_NUM, MAX_BLOCK_NUM, MIN_BLOCK_NUM } from 'js/constants';

interface AppState {
  numBlocks: number;
}

export class App extends React.Component<{}, AppState> {
  state = {
    numBlocks: STARTING_BLOCK_NUM,
  };

  private updateNumBlocks = (num: number) => {
    this.setState({
      numBlocks: num,
    });
  };

  render() {
    const { numBlocks } = this.state;
    return (
      <div className="app">
        <ChuckCloseContainer
          imageName="colin_vanlang.jpg"
          numBlocks={numBlocks}
        />
        <div className="slider-container">
          <Slider
            min={MIN_BLOCK_NUM}
            max={MAX_BLOCK_NUM}
            onChange={this.updateNumBlocks}
            value={numBlocks}
          />
        </div>
      </div>
    );
  }
}

// chromecast_image_14.jpg
// chromecast_image_33.jpg
// colin_vanlang.jpg
