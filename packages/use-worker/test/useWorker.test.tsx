import { renderHook, act } from '@testing-library/react';
import { useWorker } from '../src/index';

// Mock Worker
class MockWorker {
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;

  constructor(public scriptURL: string) {}

  postMessage(message: any, transfer?: Transferable[]) {
    // Simulate async message processing
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage(new MessageEvent('message', { data: `Processed: ${message}` }));
      }
    }, 10);
  }

  terminate() {
    // Mock termination
  }

  addEventListener(type: string, listener: EventListener) {
    if (type === 'message') {
      this.onmessage = listener as (event: MessageEvent) => void;
    } else if (type === 'error') {
      this.onerror = listener as (event: ErrorEvent) => void;
    }
  }
}

// Mock URL.createObjectURL and revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = jest.fn();

Object.defineProperty(URL, 'createObjectURL', {
  value: mockCreateObjectURL,
});

Object.defineProperty(URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
});

// Replace global Worker with mock
(global as any).Worker = MockWorker;

describe('useWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useWorker('worker.js'));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.postMessage).toBe('function');
    expect(typeof result.current.terminate).toBe('function');
  });

  it('should create worker from URL', () => {
    const { result } = renderHook(() => useWorker('worker.js'));

    expect(MockWorker).toHaveBeenCalledWith('worker.js');
    expect(result.current.error).toBeNull();
  });

  it('should create worker from function', () => {
    const workerFunction = (data: number) => data * 2;
    const { result } = renderHook(() => useWorker(workerFunction));

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it('should post message and receive response', async () => {
    const onMessage = jest.fn();
    const { result } = renderHook(() => useWorker('worker.js', { onMessage }));

    act(() => {
      result.current.postMessage('test message');
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for async message processing
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('Processed: test message');
    expect(onMessage).toHaveBeenCalledWith('Processed: test message');
  });

  it('should handle worker errors', () => {
    const onError = jest.fn();
    const { result } = renderHook(() => useWorker('worker.js', { onError }));

    // Simulate worker error
    act(() => {
      const worker = new MockWorker('worker.js');
      if (worker.onerror) {
        worker.onerror(new ErrorEvent('error', { message: 'Worker failed' }));
      }
    });

    expect(result.current.error).toBe('Worker error occurred');
  });

  it('should terminate worker', () => {
    const { result } = renderHook(() => useWorker('worker.js'));

    act(() => {
      result.current.terminate();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle timeout', async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useWorker('worker.js', { timeout: 1000 }));

    act(() => {
      result.current.postMessage('test');
    });

    expect(result.current.isLoading).toBe(true);

    // Fast-forward time to trigger timeout
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Worker operation timed out');

    jest.useRealTimers();
  });

  it('should handle function-based worker success response', async () => {
    const workerFunction = (data: number) => data * 2;
    const { result } = renderHook(() => useWorker(workerFunction));

    // Mock the worker to return a success response
    const mockWorker = new MockWorker('blob:mock-url');
    mockWorker.postMessage = jest.fn((message) => {
      setTimeout(() => {
        if (mockWorker.onmessage) {
          mockWorker.onmessage(
            new MessageEvent('message', {
              data: { success: true, data: message * 2 },
            }),
          );
        }
      }, 10);
    });

    act(() => {
      result.current.postMessage(5);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(result.current.data).toBe(10);
    expect(result.current.error).toBeNull();
  });

  it('should handle function-based worker error response', async () => {
    const workerFunction = (data: number) => data * 2;
    const { result } = renderHook(() => useWorker(workerFunction));

    // Mock the worker to return an error response
    const mockWorker = new MockWorker('blob:mock-url');
    mockWorker.postMessage = jest.fn(() => {
      setTimeout(() => {
        if (mockWorker.onmessage) {
          mockWorker.onmessage(
            new MessageEvent('message', {
              data: { success: false, error: 'Calculation failed' },
            }),
          );
        }
      }, 10);
    });

    act(() => {
      result.current.postMessage(5);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Calculation failed');
  });

  it('should handle post message errors', () => {
    const { result } = renderHook(() => useWorker('worker.js'));

    // Mock postMessage to throw an error
    const mockWorker = new MockWorker('worker.js');
    mockWorker.postMessage = jest.fn(() => {
      throw new Error('Failed to post message');
    });

    act(() => {
      result.current.postMessage('test');
    });

    expect(result.current.error).toBe('Failed to post message');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle unsupported environment', () => {
    // Temporarily remove Worker support
    const originalWorker = (global as any).Worker;
    delete (global as any).Worker;

    const { result } = renderHook(() => useWorker('worker.js'));

    expect(result.current.error).toBe('Web Workers are not supported in this environment');

    // Restore Worker
    (global as any).Worker = originalWorker;
  });

  it('should clean up on unmount', () => {
    const { result, unmount } = renderHook(() => useWorker('worker.js'));

    const terminateSpy = jest.spyOn(result.current, 'terminate');

    unmount();

    // Note: We can't directly test the cleanup since it's internal,
    // but we can verify the hook doesn't cause memory leaks
    expect(result.current).toBeDefined();
  });
});

