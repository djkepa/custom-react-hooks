import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../src/index';

describe('useClickOutside', () => {
  it('should call callback when clicked outside', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, callback);

      return <div ref={ref}>Inside</div>;
    };

    const { container } = render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();

    fireEvent.mouseDown(container);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when clicked inside', () => {
    const callback = jest.fn();
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, callback);

      return <div ref={ref}>Inside</div>;
    };

    const { getByText } = render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByText('Inside'));
    expect(callback).not.toHaveBeenCalled();
  });
});
