# `useOrientation` Hook

The `useOrientation` hook provides a way to access and respond to changes in device orientation in React applications. It tracks the orientation of the device in real-time, offering both the orientation angle and type.

## Features

- **Real-time Orientation Data:** Updates with the current orientation angle and type as the device orientation changes.
- **Server-Side Rendering Compatibility:** Safely handles scenarios without a `window` object, suitable for SSR.
- **Detailed Orientation Information:** Provides the orientation angle and type (landscape or portrait).

## Installation

```bash
npm install @custom-react-hooks/use-orientation
```

or

```bash
yarn add @custom-react-hooks/use-orientation
```

## Usage

```typescript
import useOrientation from '@custom-react-hooks/use-orientation';

const MyComponent = () => {
  const { angle, type } = useOrientation();

  return (
    <div>
      <p>Current Angle: {angle} degrees</p>
      <p>Orientation Type: {type}</p>
    </div>
  );
};
```

This example demonstrates how to use the `useOrientation` hook to monitor and display the device's current orientation.

## API Reference

- Returns an object with:
  - `angle`: The current orientation angle of the device in degrees.
  - `type`: The current orientation type (`'landscape-primary'`, `'landscape-secondary'`, `'portrait-primary'`, `'portrait-secondary'`).

## Contributing

Contributions to enhance `useOrientation` are highly welcomed. Feel free to submit issues or pull requests to the repository.