import React from 'react';
import useKeyPress from '../src/hooks/useKeyPress';

const MyComponent = () => {
  const keyPressed = useKeyPress('Enter', { debounce: 200, global: true });

  return (
    <div>
      {keyPressed ? 'Enter key is pressed' : 'Press the Enter key'}
    </div>
  );
};