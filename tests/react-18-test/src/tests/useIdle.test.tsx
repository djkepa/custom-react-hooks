import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act, waitFor, renderHook } from '@testing-library/react';
import useIdle from '../../../../packages/use-idle/dist/index';

const TestComponent = ({ idleTime }: any) => {
  const isIdle = useIdle(idleTime);
  return <div>{isIdle ? 'Idle' : 'Active'}</div>;
};

describe('useIdle', () => {
  jest.useFakeTimers();

  it('starts in an active state', () => {
    const { getByText } = render(<TestComponent idleTime={1000} />);
    expect(getByText('Active')).toBeInTheDocument();
  });

  it('resets idle timer on activity', async () => {
    const { getByText } = render(<TestComponent idleTime={1000} />);

    // Advance timers by time to set 'Idle'
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Wait for 'Idle' state
    await waitFor(() => {
      expect(getByText('Idle')).toBeInTheDocument();
    });

    // Trigger activity and reset timer
    act(() => {
      fireEvent.mouseMove(window);
      jest.advanceTimersByTime(500); // Halfway to idle
    });

    // Wait for 'Active' state
    await waitFor(() => {
      expect(getByText('Active')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
