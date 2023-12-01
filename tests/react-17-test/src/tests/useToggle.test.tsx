import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToggleTestComponent from '../examples/useToggle.example';

describe('ToggleTestComponent', () => {
  it('starts with hidden message', () => {
    render(<ToggleTestComponent />);
    expect(screen.queryByText('Message Visible')).toBeNull();
  });

  it('toggles message visibility on click', () => {
    render(<ToggleTestComponent />);
    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Message Visible')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Message Visible')).toBeNull();
  });

  it('shows message when "Set True" is clicked', () => {
    render(<ToggleTestComponent />);
    fireEvent.click(screen.getByText('Set True'));
    expect(screen.getByText('Message Visible')).toBeInTheDocument();
  });

  it('hides message when "Set False" is clicked', () => {
    render(<ToggleTestComponent />);
    fireEvent.click(screen.getByText('Set False'));
    expect(screen.queryByText('Message Visible')).toBeNull();
  });
});
