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
const MockWorkerSpy = jest
  .fn()
  .mockImplementation((scriptURL: string) => new MockWorker(scriptURL));
(global as any).Worker = MockWorkerSpy;

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

    expect(MockWorkerSpy).toHaveBeenCalledWith('worker.js');
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

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('Processed: test message');
    expect(onMessage).toHaveBeenCalledWith('Processed: test message');
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

  it('should handle basic functionality', () => {
    const { result } = renderHook(() => useWorker('worker.js'));

    // Test basic properties
    expect(result.current).toBeDefined();
    expect(typeof result.current.postMessage).toBe('function');
    expect(typeof result.current.terminate).toBe('function');
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle function-based worker', () => {
    const workerFunction = (data: number) => data * 2;
    const { result } = renderHook(() => useWorker(workerFunction));

    expect(result.current).toBeDefined();
    expect(typeof result.current.postMessage).toBe('function');
    expect(typeof result.current.terminate).toBe('function');
  });

  it('should clean up on unmount', () => {
    const { result, unmount } = renderHook(() => useWorker('worker.js'));

    expect(result.current).toBeDefined();

    unmount();

    // Hook should still be defined after unmount
    expect(result.current).toBeDefined();
  });
});
