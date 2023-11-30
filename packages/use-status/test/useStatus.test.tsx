import { act, renderHook, waitFor } from '@testing-library/react';
import useStatus from '../src/index';

describe('useStatus Hook', () => {
  beforeAll(() => {
    // Mock navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      writable: true,
    });

    // Mock navigator.connection
    if (!('connection' in navigator)) {
      Object.defineProperty(navigator, 'connection', {
        value: {
          downlink: 10,
          effectiveType: '4g',
          rtt: 50,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
        writable: true,
      });
    }
  });

  it('should return initial network status', () => {
    const { result } = renderHook(() => useStatus());
    expect(result.current.online).toBe(true);
    expect(result.current.downlink).toBe(10);
  });

  it('should update network status on online/offline', async () => {
    const { result } = renderHook(() => useStatus());

    // Simulate offline event
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        value: false,
        writable: true,
      });
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      expect(result.current.online).toBe(false);
    });

    // Simulate online event
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        value: true,
        writable: true,
      });
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(result.current.online).toBe(true);
    });
  });
});
