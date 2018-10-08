import * as React from 'react';

interface ImageProps {
  className?: string;
  name: string;
}

export const Image: React.SFC<ImageProps> = props => {
  const { className, name } = props;
  return (
    <img className={className} src={`/static/images/${name}`} alt={name} />
  );
};
