import React from 'react';
import { render, renderHook } from '@testing-library/react';
import useOrientation from '../src/index';
import '@testing-library/jest-dom';

function TestComponent() {
  const orientation = useOrientation();
  return <p>{`Angle: ${orientation.angle}, Type: ${orientation.type}`}</p>;
}

describe('useOrientation', () => {
  const originalOrientation = window.screen.orientation;

  beforeEach(() => {
    Object.defineProperty(window.screen, 'orientation', {
      writable: true,
      value: {
        angle: 0,
        type: 'portrait-primary',
      },
    });
  });

  beforeAll(() => {
    Object.defineProperty(window.screen, 'orientation', {
      writable: true,
      value: {
        angle: 0,
        type: 'portrait-primary',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window.screen, 'orientation', {
      value: originalOrientation,
    });
  });

  it('initially has default orientation values', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Angle: 0, Type: portrait-primary')).toBeInTheDocument();
  });

  it('updates orientation on orientationchange event', () => {
    // Mock the orientation change
    Object.defineProperty(window.screen, 'orientation', {
      value: {
        angle: 90,
        type: 'landscape-primary',
      },
    });
    window.dispatchEvent(new Event('orientationchange'));

    const { getByText } = render(<TestComponent />);
    expect(getByText('Angle: 90, Type: landscape-primary')).toBeInTheDocument();
  });

  // Additional test cases to simulate various orientation types
  it.each([
    [180, 'landscape-secondary'],
    [-90, 'portrait-secondary'],
  ])('responds to different orientation types', (angle, type) => {
    Object.defineProperty(window.screen, 'orientation', {
      value: {
        angle: angle,
        type: type,
      },
    });
    window.dispatchEvent(new Event('orientationchange'));

    const { getByText } = render(<TestComponent />);
    expect(getByText(`Angle: ${angle}, Type: ${type}`)).toBeInTheDocument();
  });

  // Test for undefined orientation (e.g., feature not supported)
  it('handles undefined orientation', () => {
    // Mock the orientation with undefined type
    Object.defineProperty(window.screen, 'orientation', {
      writable: true,
      value: {
        angle: 0,
        type: undefined,
      },
    });

    // Dispatch the orientationchange event to trigger the update
    window.dispatchEvent(new Event('orientationchange'));

    const { getByText } = render(<TestComponent />);
    expect(getByText('Angle: 0, Type: undefined')).toBeInTheDocument();
  });

  afterAll(() => {
    Object.defineProperty(window.screen, 'orientation', {
      writable: true,
      value: {
        angle: 0,
        type: 'portrait-primary',
      },
    });
  });
});
