import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { useOrientation } from '../src/index';

function TestComponent() {
  const orientation = useOrientation();
  return <p>{`Angle: ${orientation.angle}, Type: ${orientation.type}`}</p>;
}

describe('useOrientation', () => {
  beforeEach(() => {
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

  it('initially has default orientation values', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Angle: 0, Type: undefined')).toBeInTheDocument();
  });

  it('handles undefined orientation', () => {
    Object.defineProperty(window.screen, 'orientation', {
      writable: true,
      value: {
        angle: 0,
        type: undefined,
      },
    });
    const { getByText } = render(<TestComponent />);
    window.dispatchEvent(new Event('orientationchange'));
    expect(getByText('Angle: 0, Type: undefined')).toBeInTheDocument();
  });
});
