import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import useLongPress from '../src/index';

function TestComponent({ callback, options }) {
  const bindings = useLongPress(callback, options);
  return <button {...bindings}>Press me</button>;
}

describe('useLongPress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('triggers long press after threshold', () => {
    const callback = jest.fn();
    const { getByText } = render(
      <TestComponent
        callback={callback}
        options={{ threshold: 500 }}
      />,
    );
    const button = getByText('Press me');

    fireEvent.mouseDown(button);
    jest.advanceTimersByTime(500); // Wait for the threshold to pass
    fireEvent.mouseUp(button);

    jest.runAllTimers(); // Ensure all timers are cleared

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not trigger on quick press', () => {
    const callback = jest.fn();
    const { getByText } = render(
      <TestComponent
        callback={callback}
        options={{ threshold: 500 }}
      />,
    );
    const button = getByText('Press me');

    fireEvent.mouseDown(button);
    jest.advanceTimersByTime(100); // Advance timers less than threshold
    fireEvent.mouseUp(button);

    jest.runAllTimers(); // Ensure all timers are cleared

    expect(callback).not.toHaveBeenCalled();
  });

  it('calls onStart and onFinish', () => {
    const onStart = jest.fn();
    const onFinish = jest.fn();
    const { getByText } = render(
      <TestComponent
        callback={() => {}}
        options={{ threshold: 500, onStart, onFinish }}
      />,
    );
    const button = getByText('Press me');

    fireEvent.mouseDown(button);
    expect(onStart).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(500); // Wait for the threshold to pass
    fireEvent.mouseUp(button);

    jest.runAllTimers(); // Ensure all timers are cleared

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('triggers long press on touch', () => {
    const callback = jest.fn();
    const { getByText } = render(
      <TestComponent
        callback={callback}
        options={{ threshold: 500 }}
      />,
    );
    const button = getByText('Press me');

    fireEvent.touchStart(button);
    jest.advanceTimersByTime(500); // Wait for the threshold to pass
    fireEvent.touchEnd(button);

    jest.runAllTimers(); // Ensure all timers are cleared

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancels long press on mouse leave', () => {
    const callback = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(
      <TestComponent
        callback={callback}
        options={{ threshold: 500, onCancel }}
      />,
    );
    const button = getByText('Press me');

    fireEvent.mouseDown(button);
    jest.advanceTimersByTime(250); // Advance timers less than threshold
    fireEvent.mouseLeave(button);

    expect(callback).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1); // onCancel should be called on mouse leave
  });
});
