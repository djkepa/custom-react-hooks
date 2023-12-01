import React, { useState } from 'react';
import useThrottle from '../hook/useThrottle';

const ThrottleTestComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const throttledValue = useThrottle(inputValue, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {throttledValue !== undefined && <div>Throttled Value: {throttledValue}</div>}
    </div>
  );
};

export default ThrottleTestComponent;
