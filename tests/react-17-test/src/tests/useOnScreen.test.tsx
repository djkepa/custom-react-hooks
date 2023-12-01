// OnScreenTestComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OnScreenTestComponent from '../examples/useOnScreen.example';

describe('OnScreenTestComponent', () => {
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;
  let disconnectMock: jest.Mock;
  let mockIntersectionObserver: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    disconnectMock = jest.fn();

    mockIntersectionObserver = jest.fn().mockImplementation((callback, options) => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    }));

    global.IntersectionObserver = mockIntersectionObserver;
  });

  it('should observe the element on mount', () => {
    render(<OnScreenTestComponent />);
    expect(observeMock).toHaveBeenCalled();
  });

  it('should display the element as not visible initially', () => {
    render(<OnScreenTestComponent />);
    expect(screen.getByText('Not visible in viewport')).toBeInTheDocument();
  });

  it('should display the element as visible when intersecting', () => {
    render(<OnScreenTestComponent />);
    // Simulate the element intersecting
    mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: true }]);
    expect(screen.getByText('Visible in viewport')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
