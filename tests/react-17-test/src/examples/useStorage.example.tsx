import React, { useState } from 'react';
import useStorage from '../hook/useStorage';

const StorageTestComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useStorage('testKey', '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setStoredValue(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save to Storage</button>
      <div>Stored Value: {storedValue}</div>
    </div>
  );
};

export default StorageTestComponent;
