import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, renderHook } from '@testing-library/react';
import useHover from '../src/index';

const TestComponent = () => {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return <div ref={ref}>{isHovered ? 'Hovered' : 'Not Hovered'}</div>;
};

describe('useHover', () => {
  it('should indicate when the element is not being hovered over', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Not Hovered')).toBeInTheDocument();
  });

  it('should indicate when the element is being hovered over', () => {
    const { getByText } = render(<TestComponent />);
    const element = getByText('Not Hovered');

    fireEvent.mouseEnter(element);
    expect(getByText('Hovered')).toBeInTheDocument();
  });

  it('should indicate when the element is no longer being hovered over', () => {
    const { getByText } = render(<TestComponent />);
    const element = getByText('Not Hovered');

    fireEvent.mouseEnter(element);
    expect(getByText('Hovered')).toBeInTheDocument();

    fireEvent.mouseLeave(element);
    expect(getByText('Not Hovered')).toBeInTheDocument();
  });
});
