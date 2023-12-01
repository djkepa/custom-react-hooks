// UserList.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useFetch from '../hook/useFetch';
import UserList from '../examples/useFetch.example';

// Mock the useFetch hook
jest.mock('../hook/useFetch');

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

describe('UserList Component', () => {
  it('shows loading state initially', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchData: jest.fn(),
    });

    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays users after loading', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    render(<UserList />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('displays an error message', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch'),
      fetchData: jest.fn(),
    });

    render(<UserList />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('refreshes data when the button is clicked', () => {
    const mockFetchData = jest.fn();
    (useFetch as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });

    render(<UserList />);
    fireEvent.click(screen.getByText('Refresh'));
    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });
});
