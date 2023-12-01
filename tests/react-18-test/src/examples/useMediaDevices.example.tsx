import React from 'react';
import useMediaDevices from '../hook/useMediaDevices';

const MediaDevicesComponent: React.FC = () => {
  const { devices, isLoading, error } = useMediaDevices();

  if (isLoading) {
    return <div>Loading devices...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Media Devices</h2>
      {devices.length === 0 ? (
        <p>No devices found</p>
      ) : (
        <ul>
          {devices.map((device) => (
            <li key={device.id}>{`${device.kind}: ${device.label}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MediaDevicesComponent;
