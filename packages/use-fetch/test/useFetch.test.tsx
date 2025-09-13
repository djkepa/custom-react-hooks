import React from 'react';
import '@testing-library/jest-dom';
import { render, act, screen, waitFor } from '@testing-library/react';
import { useFetch, cacheManager } from '../src/index';

declare global {
  function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

  namespace fetch {
    export var mockResolvedValueOnce: (value: any) => typeof fetch;
    export var mockRejectedValueOnce: (reason?: any) => typeof fetch;
    export var mockImplementation: (fn: any) => typeof fetch;
  }
}

function TestComponent({ url, options = {} }) {
  const { data, loading, error, isValidating, fetchData, mutate, revalidate } = useFetch(
    url,
    options,
  );
  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {isValidating && <div data-testid="validating">Validating...</div>}
      {error && <div data-testid="error">{error.message}</div>}
      {data ? <div data-testid="data">{JSON.stringify(data)}</div> : null}
      <button
        onClick={fetchData}
        data-testid="fetch-button"
      >
        Fetch Data
      </button>
      <button
        onClick={() => mutate({ data: 'mutated data' })}
        data-testid="mutate-button"
      >
        Mutate Data
      </button>
      <button
        onClick={revalidate}
        data-testid="revalidate-button"
      >
        Revalidate
      </button>
    </div>
  );
}

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
    cacheManager.clear();
  });

  it('should fetch data successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'mock data' }),
    });

    render(<TestComponent url="https://example.com" />);
    await waitFor(() => expect(screen.queryByTestId('loading')).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByTestId('data')).toHaveTextContent('mock data'));
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should manually fetch data when manual option is true', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'manual fetch data' }),
    });

    render(
      <TestComponent
        url="https://manual-test.com"
        options={{ manual: true }}
      />,
    );

    // Initially, no data should be loaded
    expect(screen.queryByTestId('loading')).toBeNull();
    expect(screen.queryByTestId('data')).toBeNull();

    // Click to manually fetch data
    await act(async () => {
      screen.getByTestId('fetch-button').click();
    });

    // Wait for data to be loaded and check the JSON stringified content
    await waitFor(() => {
      const dataElement = screen.getByTestId('data');
      expect(dataElement).toHaveTextContent('{"data":"manual fetch data"}');
    });

    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('should handle mutate function', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'initial data' }),
    });

    render(<TestComponent url="https://example.com" />);

    // Wait for initial data
    await waitFor(() => {
      expect(screen.getByTestId('data')).toHaveTextContent('{"data":"initial data"}');
    });

    // Mutate data
    await act(async () => {
      screen.getByTestId('mutate-button').click();
    });

    // Check mutated data
    await waitFor(() => {
      expect(screen.getByTestId('data')).toHaveTextContent('{"data":"mutated data"}');
    });
  });

  it('should handle transform function', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ value: 'raw data' }),
    });

    const transform = (data: any) => ({ transformed: data.value.toUpperCase() });

    render(
      <TestComponent
        url="https://transform-test.com"
        options={{ transform }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data')).toHaveTextContent('{"transformed":"RAW DATA"}');
    });
  });

  it('should handle fallback data', async () => {
    const fallbackData = { data: 'fallback' };

    render(
      <TestComponent
        url="https://example.com"
        options={{ manual: true, fallbackData }}
      />,
    );

    // Should show fallback data immediately
    expect(screen.getByTestId('data')).toHaveTextContent('{"data":"fallback"}');
  });
});
