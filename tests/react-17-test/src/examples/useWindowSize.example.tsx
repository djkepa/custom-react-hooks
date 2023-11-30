import React from 'react';
import useWindowSize from '../src/hooks/useWindowSize';

const MyComponent = () => {
  const { width, height } = useWindowSize(200); // 200ms debounce delay

  return (
    <div>
      <p>Window width: {width}</p>
      <p>Window height: {height}</p>
    </div>
  );
};