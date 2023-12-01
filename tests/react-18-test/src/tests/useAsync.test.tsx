import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AsyncComponent from '../examples/useAsync.example';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('useAsync', () => {
  it('should initially be in idle state with a fetch button', () => {
    render(<AsyncComponent />);
    expect(screen.getByRole('button', { name: 'Fetch Data' })).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should show loading state when fetch is triggered', () => {
    render(<AsyncComponent />);
    fireEvent.click(screen.getByRole('button', { name: 'Fetch Data' }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show data on successful fetch', async () => {
    const mockData = { data: 'Test data' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    await act(async () => {
      render(<AsyncComponent />);
      fireEvent.click(screen.getByRole('button', { name: 'Fetch Data' }));
      await waitFor(() => screen.getByText(JSON.stringify(mockData)));
    });

    // Assertions can be outside the act() if they are not triggering any updates
    expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument();
  });

  it('should show error message on fetch failure', async () => {
    const errorMessage = 'Failed to fetch';
    fetchMock.mockRejectOnce(new Error(errorMessage));

    await act(async () => {
      render(<AsyncComponent />);
      fireEvent.click(screen.getByRole('button', { name: 'Fetch Data' }));
      // The state update happens asynchronously, so you need to wait for it
      await waitFor(() => screen.getByText(`Error: ${errorMessage}`));
    });

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
