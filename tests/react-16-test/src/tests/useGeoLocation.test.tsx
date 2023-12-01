// src/tests/useGeoLocation.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import GeoLocationComponent from '../examples/useGeoLocation.example';
import '@testing-library/jest-dom';
import useGeoLocation from '../hook/useGeoLocation';

jest.mock('../hook/useGeoLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('GeoLocationComponent', () => {
  it('renders loading message', () => {
    // Mock the useGeoLocation hook's return value for this specific test
    (useGeoLocation as jest.Mock).mockReturnValueOnce({
      loading: true,
      coordinates: null,
      error: null,
      isWatching: false,
    });

    const { getByText } = render(<GeoLocationComponent />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message', () => {
    // Mock the useGeoLocation hook's return value for this specific test
    (useGeoLocation as jest.Mock).mockReturnValueOnce({
      loading: false,
      coordinates: null,
      error: new Error('Geolocation error'),
      isWatching: false,
    });

    const { getByText } = render(<GeoLocationComponent />);
    expect(getByText('Error: Geolocation error')).toBeInTheDocument();
  });

  it('renders location information', () => {
    // Mock the useGeoLocation hook's return value for this specific test
    (useGeoLocation as jest.Mock).mockReturnValueOnce({
      loading: false,
      coordinates: {
        latitude: 42.12345,
        longitude: -78.54321,
      },
      error: null,
      isWatching: false,
    });

    const { getByText } = render(<GeoLocationComponent />);
    expect(getByText('Latitude: 42.12345')).toBeInTheDocument();
    expect(getByText('Longitude: -78.54321')).toBeInTheDocument();
  });

  it('renders "Watching: Yes" when isWatching is true', () => {
    // Mock the useGeoLocation hook's return value for this specific test
    (useGeoLocation as jest.Mock).mockReturnValueOnce({
      loading: false,
      coordinates: null,
      error: null,
      isWatching: true,
    });

    const { getByText } = render(<GeoLocationComponent />);
    expect(getByText('Watching: Yes')).toBeInTheDocument();
  });

  it('renders "Watching: No" when isWatching is false', () => {
    // Mock the useGeoLocation hook's return value for this specific test
    (useGeoLocation as jest.Mock).mockReturnValueOnce({
      loading: false,
      coordinates: null,
      error: null,
      isWatching: false,
    });

    const { getByText } = render(<GeoLocationComponent />);
    expect(getByText('Watching: No')).toBeInTheDocument();
  });
});
