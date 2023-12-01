import React, { useState } from 'react';
import useDebounce from '../hook/useDebounce';

const DebounceTestComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const debouncedLog = useDebounce((val: string) => {
    console.log(`Debounced value: ${val}`);
  }, 1000)[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedLog(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default DebounceTestComponent;
