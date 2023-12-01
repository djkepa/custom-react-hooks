import React, { useState } from 'react';
import useTimeout from '../hook/useTimeout';

const TimeoutTestComponent: React.FC = () => {
  const [message, setMessage] = useState('No timeout set');
  const { reset, clear, isActive } = useTimeout(() => setMessage('Timeout triggered'), 2000); // 2-second timeout

  const handleSetTimeout = () => {
    reset();
    setMessage('Timeout is active...');
  };

  const handleClearTimeout = () => {
    clear();
    setMessage('Timeout cleared');
  };

  return (
    <div>
      <button onClick={handleSetTimeout}>Set Timeout</button>
      <button onClick={handleClearTimeout}>Clear Timeout</button>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>{message}</p>
    </div>
  );
};

export default TimeoutTestComponent;
