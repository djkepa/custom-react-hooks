import React, { useState } from 'react';
import useLongPress from '../hook/useLongPress';

const LongPressTestComponent: React.FC = () => {
  const [status, setStatus] = useState('Ready');

  const longPressCallback = () => {
    setStatus('Long Press Finished');
  };

  const longPressEvents = useLongPress(longPressCallback, {
    threshold: 500,
    onStart: () => setStatus('Long Press Started'),
    onFinish: () => setStatus('Long Press Finished'),
    onCancel: () => setStatus('Long Press Cancelled'),
  });

  return (
    <div>
      <button {...longPressEvents}>Press and Hold</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default LongPressTestComponent;
