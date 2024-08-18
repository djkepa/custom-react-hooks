import React from 'react';
import { render } from '@testing-library/react';
import { useEffectOnce } from '../src/index';

const TestComponent = ({ effect }) => {
  useEffectOnce(effect);
  return <div>Test Component</div>;
};

describe('useEffectOnce', () => {
  it('should run the effect only once after mounting', () => {
    const mockEffect = jest.fn();
    const { rerender } = render(<TestComponent effect={mockEffect} />);

    expect(mockEffect).toHaveBeenCalledTimes(1);

    rerender(<TestComponent effect={mockEffect} />);
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });

  it('should run cleanup function on unmount if provided', () => {
    const mockCleanup = jest.fn();
    const effect = () => mockCleanup;
    const { unmount } = render(<TestComponent effect={effect} />);

    unmount();

    expect(mockCleanup).toHaveBeenCalledTimes(1);
  });
});
