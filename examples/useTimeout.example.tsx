import React from 'react';
import useTimeout from '../src/hooks/useTimeout';

const MyComponent = () => {
  const doSomething = () => {
    console.log('Action after timeout');
  };

  const { reset, clear, isActive } = useTimeout(doSomething, 5000);

  return (
    <div>
      {isActive ? <p>Timeout is active</p> : <p>Timeout is inactive</p>}
      <button onClick={reset}>Start/Restart Timeout</button>
      <button onClick={clear}>Stop Timeout</button>
    </div>
  );
};