import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import useEventListener from '../src/index';

function TestComponent({ eventName, elementRef, eventHandler, condition = true }) {
  useEventListener(eventName, eventHandler, elementRef, undefined, condition);

  return (
    <div
      ref={elementRef}
      data-testid="test-element"
    >
      Test Element
    </div>
  );
}

describe('useEventListener', () => {
  it('should call event handler when event occurs', () => {
    const eventHandler = jest.fn();
    const elementRef = React.createRef();
    const { getByTestId } = render(
      <TestComponent
        eventName="click"
        elementRef={elementRef}
        eventHandler={eventHandler}
      />,
    );

    const testElement = getByTestId('test-element');
    fireEvent.click(testElement);

    expect(eventHandler).toHaveBeenCalled();
  });

  it('should not call event handler when condition is false', () => {
    const eventHandler = jest.fn();
    const elementRef = React.createRef();
    const { getByTestId } = render(
      <TestComponent
        eventName="click"
        elementRef={elementRef}
        eventHandler={eventHandler}
        condition={false}
      />,
    );

    const testElement = getByTestId('test-element');
    fireEvent.click(testElement);

    expect(eventHandler).not.toHaveBeenCalled();
  });
});
