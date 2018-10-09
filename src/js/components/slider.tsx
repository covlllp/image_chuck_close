import * as React from 'react';

interface SliderProps {
  max: number;
  min: number;
  onChange?: (value: number) => void;
  step?: number;
  value: number;
}

export const Slider: React.SFC<SliderProps> = props => {
  const { min, max, onChange, step, value } = props;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(+(event.target as HTMLInputElement).value);
    }
  };

  return (
    <input
      className="slider"
      type="range"
      min={min}
      max={max}
      onChange={handleChange}
      step={step || 1}
      value={value}
    />
  );
};
