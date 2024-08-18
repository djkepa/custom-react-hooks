import React from 'react';
import { render } from '@testing-library/react';
import { useElementSize } from '../src/index';
import '@testing-library/jest-dom';

jest.mock('../src/index', () => ({
  __esModule: true,
  useElementSize: () => [() => {}, { width: 100, height: 100 }],
}));

const TestComponent = ({ onSizeChange }) => {
  const [setRef, size] = useElementSize();

  React.useEffect(() => {
    onSizeChange(size);
  }, [size, onSizeChange]);

  return (
    <div
      ref={(node) => setRef(node)}
      style={{ width: '100px', height: '100px' }}
      data-testid="size-element"
    />
  );
};

describe('useElementSize', () => {
  it('measures the size of the element', () => {
    const handleSizeChange = jest.fn();

    render(<TestComponent onSizeChange={handleSizeChange} />);

    expect(handleSizeChange).toHaveBeenCalledWith({ width: 100, height: 100 });
  });
});
