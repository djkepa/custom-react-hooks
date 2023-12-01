import React from 'react';
import useKeyPress from '../hook/useKeyPress';

const TestComponent: React.FC = () => {
  const enterPressed = useKeyPress('Enter');

  return (
    <div>
      <p>Press the "Enter" key</p>
      {enterPressed && <p>You are pressing the "Enter" key!</p>}
    </div>
  );
};

export default TestComponent;
