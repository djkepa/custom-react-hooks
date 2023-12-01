import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestComponent from '../examples/useKeyPress.example';

describe('TestComponent', () => {
  it('displays message when the Enter key is pressed', async () => {
    render(<TestComponent />);

    // Simulate pressing the Enter key
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(await screen.findByText('You are pressing the "Enter" key!')).toBeInTheDocument();

    // Simulate releasing the Enter key
    fireEvent.keyUp(document, { key: 'Enter', code: 'Enter' });

    // Wait for the message to disappear
    await waitFor(() => {
      expect(screen.queryByText('You are pressing the "Enter" key!')).toBeNull();
    });
  });
});
