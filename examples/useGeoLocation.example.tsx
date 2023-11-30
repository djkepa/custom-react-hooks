import React from 'react';
import useGeoLocation from '../src/hooks/useGeoLocation';

const MyComponent = () => {
  const { coordinates, error, loading } = useGeoLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      Latitude: {coordinates?.latitude}, Longitude: {coordinates?.longitude}
    </div>
  );
};