import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeoutTestComponent from '../examples/useTimeout.example';

describe('TimeoutTestComponent', () => {
  jest.useFakeTimers();

  it('shows active status initially', () => {
    render(<TimeoutTestComponent />);
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
    expect(screen.getByText('No timeout set')).toBeInTheDocument();
  });

  it('activates and triggers timeout', () => {
    render(<TimeoutTestComponent />);
    fireEvent.click(screen.getByText('Set Timeout'));

    expect(screen.getByText('Timeout is active...')).toBeInTheDocument();
    expect(screen.getByText('Status: Active')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    expect(screen.getByText('Timeout triggered')).toBeInTheDocument();
    expect(screen.getByText('Status: Inactive')).toBeInTheDocument();
  });

  it('clears the active timeout', () => {
    render(<TimeoutTestComponent />);
    fireEvent.click(screen.getByText('Set Timeout'));
    fireEvent.click(screen.getByText('Clear Timeout'));

    expect(screen.getByText('Timeout cleared')).toBeInTheDocument();
    expect(screen.getByText('Status: Inactive')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
