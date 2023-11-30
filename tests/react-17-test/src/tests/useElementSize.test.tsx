import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import useElementSize from '../src/index';
import React, { useEffect, useRef } from 'react';

// Mock Component using useElementSize
const TestComponent = ({ onSizeChange }) => {
  const ref = useRef(null);
  const size = useElementSize(ref);

  useEffect(() => {
    onSizeChange(size);
  }, [size, onSizeChange]);

  return (
    <div
      ref={ref}
      style={{ width: '100px', height: '100px' }}
      data-testid="size-element"
    ></div>
  );
};

describe('useElementSize', () => {
  it('measures the size of the element', async () => {
    let sizeData;
    const handleSizeChange = jest.fn((size) => {
      sizeData = size;
    });

    const { getByTestId } = render(<TestComponent onSizeChange={handleSizeChange} />);
    const sizeElement = getByTestId('size-element');

    // Mock the element's offsetWidth and offsetHeight
    Object.defineProperty(sizeElement, 'offsetWidth', { configurable: true, value: 100 });
    Object.defineProperty(sizeElement, 'offsetHeight', { configurable: true, value: 100 });

    // Force a re-render to apply the new mock measurements
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(handleSizeChange).toHaveBeenCalled();
    expect(sizeData.width).toBe(100);
    expect(sizeData.height).toBe(100);
  });
});
