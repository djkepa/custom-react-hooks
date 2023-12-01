import React, { useState } from 'react';
import useLockBodyScroll from '../hook/useLockBodyScroll';

const ModalComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useLockBodyScroll(isModalOpen);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ background: 'white', padding: 20, margin: 50 }}>
            <p>Modal Content</p>
            <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
