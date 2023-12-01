import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TestComponent from '../examples/useElementSize.example';
import '@testing-library/jest-dom';

describe('useElementSize', () => {
  it('should render with initial dimensions', () => {
    render(<TestComponent />);
    const widthElement = screen.getByText('Width: 0px');
    const heightElement = screen.getByText('Height: 0px');
    expect(widthElement).toBeInTheDocument();
    expect(heightElement).toBeInTheDocument();
  });

  it('should update dimensions when custom width is set', () => {
    render(<TestComponent />);
    const widthElement = screen.getByText(/Width: \d+px/); // Use a regular expression
    const widthInput = screen.getByLabelText('Set custom width');
    fireEvent.change(widthInput, { target: { value: '300' } });
    expect(widthElement).toBeInTheDocument();
  });

  it('should update dimensions when custom height is set', () => {
    render(<TestComponent />);
    const heightElement = screen.getByText('Height: 0px');
    const heightInput = screen.getByLabelText('Set custom height');
    fireEvent.change(heightInput, { target: { value: '200' } });
    const updatedHeightElement = screen.getByText('Height: 200px');
    expect(updatedHeightElement).toBeInTheDocument();
  });
});
