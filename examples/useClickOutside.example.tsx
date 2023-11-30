import React, { useRef } from 'react';
import useClickOutside from '../src/hooks/UseClickOutside';

const Modal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null); // The ref for the modal
  const closeButtonRef = useRef<HTMLButtonElement>(null); // A ref for the close button

  // Call the hook with the modal ref and the close button ref as the refs to ignore
  useClickOutside(
    [modalRef], // Array of refs to detect outside click
    () => onClose(), // Callback to execute on outside click
    ['mousedown', 'touchstart'], // Events to listen for
    true, // Enable the outside click detection
    [closeButtonRef] // Refs to ignore
  );

  return (
    <div ref={modalRef} style={{ border: '1px solid black', padding: '20px' }}>
      {/* Modal content */}
      <p>Modal Content Here</p>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Modal;
