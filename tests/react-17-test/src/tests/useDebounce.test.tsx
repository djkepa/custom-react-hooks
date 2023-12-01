// DebounceTestComponent.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DebounceTestComponent from '../examples/useDebounce.example';

describe('DebounceTestComponent', () => {
  jest.useFakeTimers();

  it('calls the debounced function after the specified delay', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DebounceTestComponent />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });

    // Fast-forward time by 1000ms (the debounce delay)
    jest.advanceTimersByTime(1000);

    expect(consoleSpy).toHaveBeenCalledWith('Debounced value: test');

    consoleSpy.mockRestore();
  });

  // Restore real timers after the tests
  afterAll(() => {
    jest.useRealTimers();
  });
});
