import React from 'react';
import usePortal from "../src/hooks/usePortal";

const MyComponent = () => {
  const { Portal, openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      {isOpen && <Portal><div>Portal Content</div></Portal>}
      {isOpen && <button onClick={closePortal}>Close Portal</button>}
    </div>
  );
};