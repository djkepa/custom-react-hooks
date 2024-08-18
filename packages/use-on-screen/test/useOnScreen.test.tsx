import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { useOnScreen } from '../src/index';
import '@testing-library/jest-dom';

function TestComponent({ options, once }) {
  const { ref, isIntersecting } = useOnScreen(options, once);
  return (
    <p ref={ref as React.RefObject<HTMLDivElement>}>{isIntersecting ? 'Visible' : 'Not Visible'}</p>
  );
}

describe('useOnScreen', () => {
  let observerMock;
  let originalObserver;

  beforeAll(() => {
    originalObserver = window.IntersectionObserver;
    observerMock = jest.fn();
    window.IntersectionObserver = jest.fn().mockImplementation((callback, options) => {
      observerMock.mockImplementation(callback);
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  afterAll(() => {
    window.IntersectionObserver = originalObserver;
  });

  afterEach(() => {
    observerMock.mockClear();
  });

  it('detects when element is on screen', () => {
    const { getByText } = render(
      <TestComponent
        options={false}
        once={false}
      />,
    );
    const element = getByText('Not Visible');

    act(() => {
      observerMock([{ isIntersecting: true, target: element }]);
    });

    expect(getByText('Visible')).toBeInTheDocument();
  });

  it('unobserves after first intersection if `once` is true', () => {
    const { getByText } = render(
      <TestComponent
        once={true}
        options
      />,
    );
    const element = getByText('Not Visible');
    const observerInstance = (window.IntersectionObserver as any).mock.results[0].value;

    act(() => {
      observerMock([{ isIntersecting: true, target: element }]);
    });

    expect(getByText('Visible')).toBeInTheDocument();
    expect(observerInstance.unobserve).toHaveBeenCalledWith(element);
  });

  it('respects observer options', () => {
    const options = { rootMargin: '10px' };
    render(
      <TestComponent
        options={options}
        once={true}
      />,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);
  });

  it('toggles visibility based on intersection changes', () => {
    const { getByText, rerender } = render(
      <TestComponent
        once
        options
      />,
    );

    act(() => {
      observerMock([{ isIntersecting: true }]);
    });
    expect(getByText('Visible')).toBeInTheDocument();

    rerender(
      <TestComponent
        options
        once
      />,
    );
    act(() => {
      observerMock([{ isIntersecting: false }]);
    });
    expect(getByText('Not Visible')).toBeInTheDocument();
  });

  it('cleans up on component unmount', () => {
    const { unmount } = render(
      <TestComponent
        once={true}
        options
      />,
    );
    const observerInstance = (window.IntersectionObserver as any).mock.results[0].value;

    unmount();

    expect(observerInstance.disconnect).toHaveBeenCalled();
  });
});
