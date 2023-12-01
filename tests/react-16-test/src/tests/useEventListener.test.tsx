import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExampleComponent from '../examples/useEventListener.example';

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByText('Click count: 0')).toBeInTheDocument();
  });

  it('updates count on button click', () => {
    render(<ExampleComponent />);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(screen.getByText('Click count: 1')).toBeInTheDocument();
  });

  it('does not update count when condition is false', () => {
    // Modify useEventListener hook in ExampleComponent to accept and use a condition
    // For this test, pass a condition prop to ExampleComponent and set it to false
    // This will require modifying ExampleComponent and useEventListener to handle this test case
  });
});
