import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThrottleTestComponent from '../examples/useThrottle.example';

describe('ThrottleTestComponent', () => {
  jest.useFakeTimers();

  it('initially shows no throttled value', () => {
    render(<ThrottleTestComponent />);
    expect(screen.queryByText(/Throttled Value:/)).not.toBeInTheDocument();
  });

  it('updates throttled value after throttle limit', () => {
    render(<ThrottleTestComponent />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1000ms (throttle limit)
    });

    expect(screen.getByText('Throttled Value: Test')).toBeInTheDocument();
  });

  it('does not update throttled value before throttle limit', () => {
    render(<ThrottleTestComponent />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    act(() => {
      jest.advanceTimersByTime(500); // Advance time by less than throttle limit
    });

    expect(screen.queryByText(/Throttled Value:/)).not.toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
