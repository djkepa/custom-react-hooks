# `useMediaDevices` Hook

`useMediaDevices` is a React hook that provides a simple interface to access and monitor media devices like cameras and microphones. It handles user permissions and lists all available media input and output devices.

## Features

- **Device Enumeration**: Lists all available media devices with their labels, kinds, and IDs.
- **Permission Handling**: Prompts the user for access to media devices to retrieve full device information.
- **Loading State**: Indicates whether the hook is currently retrieving media devices.
- **Error Handling**: Provides error information if the media devices cannot be accessed or are not available.
- **SSR Compatibility**: Safely executed in a server-side rendering environment without accessing browser-specific APIs.

## Installation

To integrate `useMediaDevices` into your project:

```bash
npm install @custom-react-hooks/use-media-devices
```

or

```bash
yarn add @custom-react-hooks/use-media-devices
```

## Usage

```tsx
import React from 'react';
import useMediaDevices from '@custom-react-hooks/use-media-devices';

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

```

In this example, `useMediaDevices` is used to list all available media devices.

## API Reference

- Returns an object with:
  - `devices`: An array of objects representing the media devices.
    - Each device object contains:
      - `id`: The device ID.
      - `kind`: The kind of the device (e.g., `videoinput`, `audioinput`, `audiooutput`).
      - `label`: The label of the device (e.g., 'Internal Microphone').
  - `isLoading`: A boolean indicating if the hook is currently retrieving the devices.
  - `error`: A string containing an error message if the devices cannot be accessed.

## Contributing

Contributions to improve `useMediaDevices` are welcome. Please submit issues or pull requests to the repository for any bugs or feature enhancements.