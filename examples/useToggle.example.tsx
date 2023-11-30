import React from 'react';
import useToggle from '../src/hooks/useToggle';

const MyComponent = () => {
  const handleToggle = (newValue) => {
    console.log('Toggle state is now:', newValue);
  };

  const { value, toggle, setTrue, setFalse } = useToggle(false, handleToggle);

  return (
    <div>
      <p>The toggle state is: {value ? 'True' : 'False'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
};