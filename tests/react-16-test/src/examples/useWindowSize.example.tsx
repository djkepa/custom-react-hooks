import React from 'react';
import useWindowSize from '../hook/useWindowSize';

const WindowSizeTestComponent: React.FC = () => {
  const { width, height } = useWindowSize(200); // Using a 200ms debounce delay

  return (
    <div>
      <p>Window Width: {width}</p>
      <p>Window Height: {height}</p>
    </div>
  );
};

export default WindowSizeTestComponent;
