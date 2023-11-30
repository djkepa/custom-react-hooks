import React from 'react';
import '@testing-library/jest-dom';
import { render, act, screen, waitFor } from '@testing-library/react';
import useFetch from '../../../../packages/use-fetch/src/index';

declare global {
  // Extending the existing fetch, not redeclaring it
  function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

  // Extend the fetch to include Jest's mock functions
  namespace fetch {
    export var mockResolvedValueOnce: (value: any) => void;
    export var mockRejectedValueOnce: (reason?: any) => void;
  }
}

function TestComponent({ url, options = {} }: any) {
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
        url="https://example.com"
        options={{ manual: true }}
      />,
    );
    expect(screen.queryByTestId('loading')).toBeNull();

    screen.getByTestId('fetch-button').click();
    await waitFor(() => expect(screen.getByTestId('data')).toHaveTextContent('manual fetch data'));
    expect(screen.queryByTestId('error')).toBeNull();
  });
});
