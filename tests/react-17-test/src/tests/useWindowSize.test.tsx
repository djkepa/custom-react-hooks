import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WindowSizeTestComponent from '../examples/useWindowSize.example';

describe('WindowSizeTestComponent', () => {
  it('displays the current window size', () => {
    render(<WindowSizeTestComponent />);
    expect(screen.getByText(`Window Width: 1024`)).toBeInTheDocument();
    expect(screen.getByText(`Window Height: 768`)).toBeInTheDocument();
  });

  it('updates window size on resize', async () => {
    render(<WindowSizeTestComponent />);
    // Simulate window resize
    window.innerWidth = 800;
    window.innerHeight = 600;
    window.dispatchEvent(new Event('resize'));

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('Window Width: 800')).toBeInTheDocument();
      expect(screen.getByText('Window Height: 600')).toBeInTheDocument();
    });
  });
});
