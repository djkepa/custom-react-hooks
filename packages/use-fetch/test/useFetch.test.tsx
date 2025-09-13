import React from 'react';
import '@testing-library/jest-dom';
import { render, act, screen, waitFor } from '@testing-library/react';
import { useFetch } from '../src/index';

declare global {
  function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

  namespace fetch {
    export var mockResolvedValueOnce: (value: any) => void;
    export var mockRejectedValueOnce: (reason?: any) => void;
  }
}

function TestComponent({ url, options = {} }) {
  const { data, loading, error, fetchData } = useFetch(url, options);
  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error.message}</div>}
      {data ? <div data-testid="data">{JSON.stringify(data)}</div> : null}
      <button
        onClick={fetchData}
        data-testid="fetch-button"
      >
        Fetch Data
      </button>
    </div>
  );
}

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    // Clear any existing cache
    jest.clearAllMocks();
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
  }, 10000);

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
});
