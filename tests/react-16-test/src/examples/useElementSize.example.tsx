import React, { useRef } from 'react';
import useElementSize from '../src/hooks/useElementSize';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);

  return (
    <div ref={ref}>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};
