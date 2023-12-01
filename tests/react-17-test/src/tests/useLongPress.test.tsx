// LongPressTestComponent.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LongPressTestComponent from '../examples/useLongPress.example';

describe('LongPressTestComponent', () => {
  jest.useFakeTimers();

  it('updates status on long press start', () => {
    render(<LongPressTestComponent />);
    fireEvent.mouseDown(screen.getByText('Press and Hold'));
    expect(screen.getByText('Status: Long Press Started')).toBeInTheDocument();
  });

  it('updates status on long press finish', () => {
    render(<LongPressTestComponent />);
    fireEvent.mouseDown(screen.getByText('Press and Hold'));
    jest.advanceTimersByTime(500); // Advance the timer by the threshold value
    fireEvent.mouseUp(screen.getByText('Press and Hold'));
    expect(screen.getByText('Status: Long Press Finished')).toBeInTheDocument();
  });

  it('updates status on long press cancel', () => {
    render(<LongPressTestComponent />);
    fireEvent.mouseDown(screen.getByText('Press and Hold'));
    fireEvent.mouseLeave(screen.getByText('Press and Hold'));
    jest.advanceTimersByTime(500);
    expect(screen.getByText('Status: Long Press Cancelled')).toBeInTheDocument();
  });

  // Restore real timers after the tests
  afterAll(() => {
    jest.useRealTimers();
  });
});
