import { renderHook } from '@testing-library/react';
import { useNetwork } from '../src/index';

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

// Mock connection API
const mockConnection = {
  downlink: 10,
  effectiveType: '4g' as const,
  rtt: 100,
  saveData: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

Object.defineProperty(navigator, 'connection', {
  writable: true,
  value: mockConnection,
});

// Mock window.addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: mockRemoveEventListener,
});

describe('useNetwork', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
  });

  it('should return initial network state', () => {
    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(true);
    expect(result.current.downlink).toBe(10);
    expect(result.current.effectiveType).toBe('4g');
    expect(result.current.rtt).toBe(100);
    expect(result.current.saveData).toBe(false);
  });

  it('should set up event listeners', () => {
    renderHook(() => useNetwork());

    expect(mockAddEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
    expect(mockConnection.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useNetwork());

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(mockRemoveEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
    expect(mockConnection.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should handle offline state', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true });

    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(false);
  });
});
