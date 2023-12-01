// PortalTestComponent.tsx
import React from 'react';
import usePortal from '../hook/usePortal';

const PortalTestComponent: React.FC = () => {
  const { Portal, openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      <button onClick={closePortal}>Close Portal</button>
      <Portal>
        <div id="portal-content">This is portal content</div>
      </Portal>
      {isOpen && <p>Portal is open</p>}
    </div>
  );
};

export default PortalTestComponent;
