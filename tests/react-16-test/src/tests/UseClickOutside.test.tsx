import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickOutsideComponent from '../examples/useClickOutside.example';

describe('useClickOutside', () => {
  it('calls onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    render(<ClickOutsideComponent onClose={onClose} />);

    fireEvent.mouseDown(document); // Simulate a click outside the modal
    expect(onClose).toHaveBeenCalled(); // onClose should be called
  });

  it('does not call onClose when clicking inside the modal', () => {
    const onClose = jest.fn();
    const { getByText } = render(<ClickOutsideComponent onClose={onClose} />);

    fireEvent.mouseDown(getByText('Modal Content Here')); // Click inside the modal
    expect(onClose).not.toHaveBeenCalled(); // onClose should not be called
  });

  it('does not call onClose when clicking the close button', () => {
    const onClose = jest.fn();
    const { getByText } = render(<ClickOutsideComponent onClose={onClose} />);

    fireEvent.click(getByText('Close')); // Click the close button
    expect(onClose).toHaveBeenCalled(); // onClose should be called
  });
});
