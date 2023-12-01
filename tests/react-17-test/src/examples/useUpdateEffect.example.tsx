import React, { useState } from 'react';
import useUpdateEffect from '../hook/useUpdateEffect';

const UpdateEffectTestComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useUpdateEffect(() => {
    setMessage(`Effect ran at count: ${count}`);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p>Count: {count}</p>
      <p>{message}</p>
    </div>
  );
};

export default UpdateEffectTestComponent;
