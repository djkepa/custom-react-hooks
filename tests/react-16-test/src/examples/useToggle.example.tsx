import React from 'react';
import useToggle from '../hook/useToggle';

const ToggleTestComponent: React.FC = () => {
  const { value, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
      {value && <p>Message Visible</p>}
    </div>
  );
};

export default ToggleTestComponent;
