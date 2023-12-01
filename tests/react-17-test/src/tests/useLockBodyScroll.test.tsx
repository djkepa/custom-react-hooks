// ModalComponent.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalComponent from '../examples/useLockBodyScroll.example';

describe('ModalComponent', () => {
  it('locks body scroll when modal is open and unlocks on close', () => {
    render(<ModalComponent />);

    // Check if body scroll is not locked initially
    expect(document.body.style.overflow).toBe('');

    // Open the modal
    fireEvent.click(screen.getByText('Open Modal'));
    expect(document.body.style.overflow).toBe('hidden');

    // Close the modal
    fireEvent.click(screen.getByText('Close Modal'));
    expect(document.body.style.overflow).toBe('');
  });
});
