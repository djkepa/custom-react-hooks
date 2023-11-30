import { renderHook, act } from '@testing-library/react';
import useFetch from '../hooks/useFetch';

// Extend the global Window interface to include the AbortController
declare global {
  interface Window {
    AbortController: {
      new (): {
        signal: AbortSignal;
        abort: () => void;
      };
    };
  }
}

// Mocking the AbortController in the test
window.AbortController = jest.fn().mockImplementation(() => ({
  signal: new EventTarget() as AbortSignal, // or as any if you don't care about the exact type here
  abort: jest.fn(),
}));


describe('useFetch', () => {
 let mockFetch: jest.Mock;

  // Mock the AbortController
  let originalAbortController: typeof AbortController;

  beforeEach(() => {
    // Set up fetch mock
    const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
      status: 200,
      headers: { 'Content-type': 'application/json' }
    });
    mockFetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse) as jest.Mock;

    // Set up AbortController mock
    originalAbortController = window.AbortController;
    const abortControllerMock = {
      signal: {
        aborted: false,
        onabort: null,
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      abort: jest.fn(),
    };
    window.AbortController = jest.fn(() => abortControllerMock) as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.AbortController = originalAbortController;
  });

  it('starts with the correct initial state', () => {
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles successful fetch correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });
    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual({ data: 'test' });
  });

 it('handles fetch errors correctly', async () => {
    const errorMessage = 'Fetch failed';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));
    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    if (result.current.error) { // Check if error is not null
      expect(result.current.error.message).toBe(errorMessage);
    } else {
      fail('Expected an error to be set');
    }
  });

  // Test for manual fetch option
  it('does not automatically fetch data when manual is true', () => {
    const { result } = renderHook(() => useFetch('https://api.example.com/data', { manual: true }));
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  // Test for cache interaction
  it('uses cached data and updates the cache correctly', async () => {
    const cache = new Map();
    cache.set('https://api.example.com/data', { cachedData: 'cached' });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data', {}, cache)
    );

    // Should use cached data immediately
    expect(result.current.data).toEqual({ cachedData: 'cached' });

    // Simulate a fetch response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'new data' }),
    });

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ data: 'new data' });
    expect(cache.get('https://api.example.com/data')).toEqual({ data: 'new data' });
  });

  // Test for global state update
  it('updates global state with fetched data', async () => {
    const globalStateSetter = jest.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data', {}, null, globalStateSetter)
    );

    await waitForNextUpdate();

    expect(globalStateSetter).toHaveBeenCalledWith({ data: 'test' });
  });

  // Test for timeout handling
it('aborts the fetch request when the timeout is exceeded', async () => {
  jest.useFakeTimers();
  mockFetch.mockImplementationOnce(() => new Promise((resolve) => setTimeout(resolve, 1000)));

  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch('https://api.example.com/data', { timeout: 100 })
  );

  act(() => {
    jest.advanceTimersByTime(150);
  });

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  if (result.current.error) { // Check if error is not null
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toContain('The user aborted a request.');
  } else {
    fail('Expected an error due to timeout, but error was null');
  }

  jest.useRealTimers();
});


  // Test for aborting fetch on component unmount
 it('aborts the fetch request on component unmount', async () => {
  const abortSpy = jest.fn();
  const originalAbortController = window.AbortController;

  // Mock the AbortController
  window.AbortController = jest.fn().mockImplementation(() => ({
    signal: new EventTarget() as unknown as AbortSignal,
    abort: abortSpy,
  }));

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' }),
  });

  const { unmount } = renderHook(() => useFetch('https://api.example.com/data'));

  unmount();

  expect(abortSpy).toHaveBeenCalled();

  // Restore the original AbortController
  window.AbortController = originalAbortController;
});

   // Test for successful fetch with re-fetching after data changes
  it('refetches data when url changes', async () => {
    const initialUrl = 'https://api.example.com/data';
    const newUrl = 'https://api.example.com/new-data';
    const initialData = { data: 'initial data' };
    const newData = { data: 'new data' };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => initialData,
    });

    const { result, rerender, waitForNextUpdate } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: initialUrl }
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual(initialData);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newData,
    });

    rerender({ url: newUrl }); // Trigger a re-fetch with a new URL
    await waitForNextUpdate();

    expect(result.current.data).toEqual(newData);
  });

});
