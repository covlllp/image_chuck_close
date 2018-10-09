import { mapValues } from 'lodash';

import { PIXEL_CHECK_OFFSET, RANGE_HEIGHT, WINDOW_SCALE } from 'js/constants';

interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface Range {
  start: number;
  end: number;
  length: number;
}

interface BlockRange {
  col: Range;
  row: Range;
}

interface Dimensions {
  height: number;
  width: number;
}

export function RGBAToString(rgba: RGBA) {
  return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`;
}

function getColorIndicesForCoord(x: number, y: number, width: number): RGBA {
  const red = y * (width * 4) + x * 4;
  return {
    red,
    green: red + 1,
    blue: red + 2,
    alpha: red + 3,
  };
}

export function getAverageImageColor(
  imageData: ImageData,
  range: BlockRange,
): RGBA {
  const { data } = imageData;
  const values = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
  };
  let count = 0;

  for (let i = 0; i < range.col.length; i += PIXEL_CHECK_OFFSET) {
    for (let k = 0; k < range.row.length; k += PIXEL_CHECK_OFFSET) {
      const indices = getColorIndicesForCoord(
        range.col.start + i,
        range.row.start + k,
        imageData.width,
      );
      values.red += data[indices.red];
      values.green += data[indices.green];
      values.blue += data[indices.blue];
      values.alpha += data[indices.alpha];
      count += 1;
    }
  }

  const color = mapValues(values, (c: number) => Math.floor(c / count));
  return {
    red: color.red,
    green: color.green,
    blue: color.blue,
    alpha: color.alpha,
  };
}

export function getRange(dim: number, index: number, num: number) {
  const start = Math.floor((dim * index) / num);
  const end = Math.floor((dim * (index + 1)) / num);
  return {
    start,
    end,
    length: end - start,
  };
}

export function getImageDataRanges(
  imageData: ImageData,
  col: number,
  row: number,
  blocks: Dimensions,
): BlockRange {
  const colRange = getRange(imageData.width, col, blocks.width);
  const rowRange = getRange(imageData.height, row, blocks.height);
  return {
    col: colRange,
    row: rowRange,
  };
}

export function getCanvasDimensions(
  imageData: ImageData | null,
  windowDimensions: Dimensions,
) {
  if (!imageData) {
    return {
      height: 0,
      width: 0,
    };
  }
  const { height: innerHeight, width: innerWidth } = windowDimensions;
  const { height, width } = imageData;
  const heightSF = (innerHeight * WINDOW_SCALE - RANGE_HEIGHT) / height; // for the range bar
  const widthSF = (innerWidth * WINDOW_SCALE) / width;
  const sf = Math.min(heightSF, widthSF);
  return {
    height: Math.floor(height * sf),
    width: Math.floor(width * sf),
  };
}

export function getNumBlockDimensions(
  imageData: ImageData,
  numBlocks: number,
): Dimensions {
  const { height, width } = imageData;
  const heightDim = height / numBlocks;
  const widthDim = width / numBlocks;
  const drivingDim = Math.min(heightDim, widthDim);
  return {
    height: Math.floor(height / drivingDim),
    width: Math.floor(width / drivingDim),
  };
}
