import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HoverComponent from '../examples/useHover.example';

describe('HoverComponent', () => {
  it('renders "Not Hovered" by default', () => {
    const { getByText } = render(<HoverComponent />);
    const notHoveredText = getByText('Not Hovered');
    expect(notHoveredText).toBeInTheDocument();
  });

  it('changes to "Hovered" when hovered over', () => {
    const { getByText, getByTestId } = render(<HoverComponent />);
    const hoverComponent = getByTestId('hover-component');

    fireEvent.mouseEnter(hoverComponent);

    const hoveredText = getByText('Hovered');
    expect(hoveredText).toBeInTheDocument();
  });

  it('changes back to "Not Hovered" after hovering', () => {
    const { getByText, getByTestId } = render(<HoverComponent />);
    const hoverComponent = getByTestId('hover-component');

    fireEvent.mouseEnter(hoverComponent);

    const hoveredText = getByText('Hovered');
    expect(hoveredText).toBeInTheDocument();

    fireEvent.mouseLeave(hoverComponent);

    const notHoveredText = getByText('Not Hovered');
    expect(notHoveredText).toBeInTheDocument();
  });
});
