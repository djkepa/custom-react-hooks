import React, { useState, useRef } from 'react';
import useEventListener from '../hook/useEventListener';

const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener('click', () => setCount(count + 1), buttonRef);

  return (
    <div>
      <button ref={buttonRef}>Click Me</button>
      <p>Click count: {count}</p>
    </div>
  );
};

export default ExampleComponent;
