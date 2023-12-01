import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestComponent from '../examples/useIdle.example';

jest.useFakeTimers();

describe('useIdle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('returns false initially', () => {
    const { getByTestId } = render(<TestComponent idleTime={3000} />);
    const idleStatus = getByTestId('idle-status');
    expect(idleStatus).toHaveTextContent('Not Idle');
  });

  it('becomes idle after specified idle time', () => {
    const { getByTestId } = render(<TestComponent idleTime={3000} />);
    const idleStatus = getByTestId('idle-status');

    // Advance the timers to make it idle
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(idleStatus).toHaveTextContent('Idle');
  });

  it('returns to not idle when there is activity', () => {
    const { getByTestId } = render(<TestComponent idleTime={3000} />);
    const idleStatus = getByTestId('idle-status');

    // Advance the timers to make it idle initially
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(idleStatus).toHaveTextContent('Idle');

    // Simulate activity
    act(() => {
      document.dispatchEvent(new Event('mousemove'));
      jest.advanceTimersByTime(1000); // Advance the timer after the activity
    });

    expect(idleStatus).toHaveTextContent('Not Idle');
  });

  it('clears timers and removes event listeners on unmount', () => {
    const { unmount } = render(<TestComponent idleTime={3000} />);
    unmount();
  });
});
