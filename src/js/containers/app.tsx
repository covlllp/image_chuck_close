import * as React from 'react';

import { Slider } from 'js/components/slider';
import { ChuckCloseContainer } from 'js/containers/chuck_container';

import { CANVAS_SIZE, MIN_BLOCK_NUM } from 'js/constants';

interface AppState {
  numBlocks: number;
}

export class App extends React.Component<{}, AppState> {
  state = {
    numBlocks: MIN_BLOCK_NUM,
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
        {numBlocks}
        <Slider
          min={MIN_BLOCK_NUM}
          max={CANVAS_SIZE}
          onChange={this.updateNumBlocks}
          value={numBlocks}
        />
      </div>
    );
  }
}
