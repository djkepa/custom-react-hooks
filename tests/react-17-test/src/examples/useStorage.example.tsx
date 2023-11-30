import React from 'react';
import useStorage from '../src/hooks/useStorage';

const MyComponent = () => {
  const [value, setValue] = useStorage('myKey', 'defaultValue', 'local');

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue('newValue')}>Update Value</button>
    </div>
  );
};