import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGeoLocation from '../../../../packages/use-geo-location/src/index';

// Mock the Geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn().mockReturnValue(123), // Mock return value for watch ID
  clearWatch: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

function TestComponent({ options, watch }: any) {
  const { loading, coordinates, error, isWatching } = useGeoLocation(options, watch);

  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error.message}</div>}
      {coordinates && (
        <div data-testid="coordinates">
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </div>
      )}
      <div data-testid="isWatching">{isWatching ? 'Watching' : 'Not Watching'}</div>
    </div>
  );
}

describe('useGeoLocation', () => {
  it('should show loading initially', () => {
    render(
      <TestComponent
        options={{}}
        watch={false}
      />,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  // Additional test cases
  it('handles successful geolocation retrieval', async () => {
    const mockPosition = { coords: { latitude: 10, longitude: 20 } };
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      act(() => {
        success(mockPosition);
      });
    });

    render(
      <TestComponent
        options={{}}
        watch={false}
      />,
    );
    expect(await screen.findByTestId('coordinates')).toHaveTextContent(
      'Latitude: 10, Longitude: 20',
    );
  });

  it('handles geolocation errors', async () => {
    const mockError = new Error('Geolocation error');
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      act(() => {
        error(mockError);
      });
    });

    render(
      <TestComponent
        options={{}}
        watch={false}
      />,
    );
    expect(await screen.findByTestId('error')).toHaveTextContent('Geolocation error');
  });

  it('enables watch mode when requested', () => {
    render(
      <TestComponent
        watch={true}
        options={{}}
      />,
    );
    expect(screen.getByTestId('isWatching')).toHaveTextContent('Watching');
  });

  // Add more tests here for different scenarios
  // e.g., handling success, handling errors, and checking the behavior of the watch functionality
});
