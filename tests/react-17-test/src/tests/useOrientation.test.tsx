// useOrientation.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../examples/useOrientation.example';

describe('useOrientation', () => {
  const originalOrientation = window.screen.orientation;

  beforeAll(() => {
    // Mock window.screen.orientation with getters and setters
    Object.defineProperty(window.screen, 'orientation', {
      configurable: true,
      get: () => ({
        angle: 0,
        type: 'portrait-primary',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });
  });

  afterAll(() => {
    // Restore the original orientation
    Object.defineProperty(window.screen, 'orientation', {
      configurable: true,
      value: originalOrientation,
    });
  });

  it('returns device orientation data without element ref', () => {
    render(<MyComponent />);
    expect(
      screen.getByText(/Device Orientation: Angle - 0, Type - portrait-primary/),
    ).toBeInTheDocument();
  });

  it('returns element orientation data with ref', () => {
    render(<MyComponent />);
    expect(screen.getByText(/Element Orientation: Aspect Ratio/)).toBeInTheDocument();
  });

  it('updates state on orientation change', () => {
    // Change the mock orientation
    Object.defineProperty(window.screen, 'orientation', {
      configurable: true,
      get: () => ({
        angle: 90,
        type: 'landscape-primary',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    // Simulate an orientation change event
    window.dispatchEvent(new Event('orientationchange'));

    render(<MyComponent />);
    expect(
      screen.getByText(/Device Orientation: Angle - 90, Type - landscape-primary/),
    ).toBeInTheDocument();
  });
});
