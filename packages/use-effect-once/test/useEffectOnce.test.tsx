import React from 'react';
import { render } from '@testing-library/react';
import useEffectOnce from '../src/index';

const TestComponent = ({ effect }) => {
  useEffectOnce(effect);
  return <div>Test Component</div>;
};

describe('useEffectOnce', () => {
  it('should run the effect only once after mounting', () => {
    const mockEffect = jest.fn();
    const { rerender } = render(<TestComponent effect={mockEffect} />);

    // The effect should have been called once
    expect(mockEffect).toHaveBeenCalledTimes(1);

    // Rerendering the component with the same effect
    rerender(<TestComponent effect={mockEffect} />);
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });

  it('should run cleanup function on unmount if provided', () => {
    const mockCleanup = jest.fn();
    const effect = () => mockCleanup;
    const { unmount } = render(<TestComponent effect={effect} />);

    // Trigger component unmount
    unmount();

    // The cleanup function should be called upon unmounting
    expect(mockCleanup).toHaveBeenCalledTimes(1);
  });
});
