# useMediaDevices Hook

`useMediaDevices` is a React hook that offers an easy way to access and monitor media devices like cameras, microphones, and speakers. It not only lists all available media input and output devices but also manages user permissions to retrieve detailed device information.

## Features

- **Device Enumeration**: Enumerates all available media devices with details like labels, kinds, and IDs.
- **Optional Permission Handling**: Optionally prompts the user for access to media devices to retrieve full device information.
- **Loading State**: Provides a loading state indicating the process of retrieving media devices.
- **Error Handling**: Offers comprehensive error handling if media devices cannot be accessed or are not available.
- **Server-Side Rendering (SSR) Compatibility**: Designed to be safely executed in a server-side rendering environment, gracefully handling the absence of browser-specific APIs.

## Installation

### Installing This Hook Individually

```bash
npm install @custom-react-hooks/use-media-devices
```

or

```bash
yarn add @custom-react-hooks/use-media-devices
```

### Installing the Complete Hooks Package

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

```tsx
import React from 'react';
import { useMediaDevices } from '@custom-react-hooks/all';

const MediaDevicesComponent = () => {
  const { devices, isLoading, error } = useMediaDevices(false);

  if (isLoading) {
    return <div>Loading devices...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="media-devices">
      <h2>Available Media Devices</h2>
      {devices.length === 0 ? (
        <div>No devices found.</div>
      ) : (
        <ul>
          {devices.map((device) => (
            <li key={device.id}>
              <strong>{device.kind}:</strong> {device.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MediaDevicesComponent;
```

In this example, `useMediaDevices(true)` is used to request user permission and list all available media devices.

## API Reference

### Parameters

- `requestPermission` (optional, default = false): A boolean parameter that, when set to true, prompts the user for permission to access media devices such as the camera and microphone. If false, the hook will only list the available devices without requesting access.

### Returns object

- `devices`: An array of `MediaDevice` objects, each representing an available media device. Each `MediaDevice` object contains the following properties:
    - `id`: A string representing the unique identifier of the device.
    - `kind`: A string indicating the type of the device (e.g., 'videoinput', 'audioinput', 'audiooutput').
    - `label`: A string representing the label of the device, or 'Unknown Device' if the label is unavailable.
- `isLoading`: A boolean indicating whether the hook is currently in the process of loading the list of media devices.
- `error`: A string representing an error message if an error occurred while fetching the list of devices, or `null` if no error occurred.

## Use Cases
 
- **Device Selection**: Let users select from available input/output devices for media capture.
- **Feature Accessibility**: Check for the availability of media devices for features like video calls.
- **Dynamic Device Updates**: Update the UI when new devices are connected or disconnected.
- **Permission Management**: Manage user permissions for accessing media devices.

## Contributing

We welcome contributions to enhance `useMediaDevices`. For bug reports or feature suggestions, please open issues or submit pull requests to our repository.
