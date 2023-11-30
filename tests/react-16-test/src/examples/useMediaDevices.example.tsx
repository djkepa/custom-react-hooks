import React from 'react';
import useMediaDevices from '../src/hooks/useMediaDevices';

const MediaDevicesComponent: React.FC = () => {
  const { devices, isLoading, error } = useMediaDevices();

  if (isLoading) {
    return <p>Loading devices...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {devices.map(device => (
        <li key={device.id}>
          {device.label} - {device.kind}
        </li>
      ))}
    </ul>
  );
};

export default MediaDevicesComponent;