import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useClickOutside from '../../../../packages/use-click-outside/dist/index';

describe('useClickOutside', () => {
  it('should call callback when clicked outside', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null); // Initialize with null
      useClickOutside(ref, callback);

      return <div ref={ref}>Inside</div>;
    };

    const { container } = render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();

    // Simulate a click outside
    fireEvent.mouseDown(container);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when clicked inside', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null); // Initialize with null
      useClickOutside(ref, callback);

      return <div ref={ref}>Inside</div>;
    };

    const { getByText } = render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();

    // Simulate a click inside
    fireEvent.mouseDown(getByText('Inside'));
    expect(callback).not.toHaveBeenCalled();
  });
});
