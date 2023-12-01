import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaQueryTestComponent from '../examples/useMediaQuery.example';

describe('MediaQueryTestComponent', () => {
  beforeAll(() => {
    const listeners: { [key: string]: Function[] } = {};

    const matchMediaMock = jest.fn().mockImplementation((query) => {
      const matches = query.includes('(max-width: 600px)');

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn((listener: Function) => {
          listeners.change = listeners.change || [];
          listeners.change.push(listener);
        }), // For older browsers
        removeListener: jest.fn((listener: Function) => {
          listeners.change = listeners.change.filter((l) => l !== listener);
        }), // For older browsers
        addEventListener: jest.fn((event: string, listener: Function) => {
          listeners[event] = listeners[event] || [];
          listeners[event].push(listener);
        }), // For modern browsers
        removeEventListener: jest.fn((event: string, listener: Function) => {
          listeners[event] = listeners[event].filter((l) => l !== listener);
        }), // For modern browsers
        dispatchEvent: jest.fn((event: MediaQueryListEvent) => {
          listeners[event.type]?.forEach((listener) => listener(event));
        }),
      };
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  it('displays mobile view for small screens', () => {
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    render(<MediaQueryTestComponent />);
    expect(screen.getByText('Mobile View')).toBeInTheDocument();
  });

  it('displays desktop view for large screens', () => {
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    render(<MediaQueryTestComponent />);
    expect(screen.getByText('Desktop View')).toBeInTheDocument();
  });
});
