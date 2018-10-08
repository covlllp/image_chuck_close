import * as React from 'react';

interface ImageProps {
  className?: string;
  id?: string;
  name: string;
  onLoad?: () => void;
}

export const Image: React.SFC<ImageProps> = props => {
  const { className, id, name, onLoad } = props;
  return (
    <img
      id={id}
      className={className}
      src={`/static/images/${name}`}
      alt={name}
      onLoad={onLoad}
    />
  );
};
