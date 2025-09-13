# useNetwork Hook

The `useNetwork` hook is designed for monitoring network status and connection information in React applications. It provides real-time information about the user's network connection including online/offline status, connection speed, and connection type.

## Features

- **Network Status Monitoring:** Tracks online/offline status in real-time.
- **Connection Information:** Provides detailed network connection data when available.
- **Automatic Updates:** Listens for network changes and updates state accordingly.
- **Cross-Browser Support:** Works with different browser implementations of the Network Information API.
- **SSR Compatibility:** Safe for server-side rendering environments.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-network
```

or

```bash
yarn add @custom-react-hooks/use-network
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

```typescript
import React from 'react';
import { useNetwork } from '@custom-react-hooks/use-network';

const NetworkComponent = () => {
  const { online, downlink, effectiveType, rtt, saveData, type } = useNetwork();

  return (
    <div>
      <h2>Network Status</h2>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
      
      {online && (
        <div>
          {downlink && <p>Downlink Speed: {downlink} Mbps</p>}
          {effectiveType && <p>Connection Type: {effectiveType}</p>}
          {rtt && <p>Round Trip Time: {rtt}ms</p>}
          {saveData !== undefined && <p>Save Data Mode: {saveData ? 'Enabled' : 'Disabled'}</p>}
          {type && <p>Network Type: {type}</p>}
        </div>
      )}
    </div>
  );
};

export default NetworkComponent;
```

## API Reference

### Returns

An object containing the following properties:

- `online` (boolean): Indicates if the user is currently online.
- `downlink` (number, optional): Effective bandwidth estimate in megabits per second.
- `downlinkMax` (number, optional): Maximum downlink speed in megabits per second.
- `effectiveType` ('slow-2g' | '2g' | '3g' | '4g', optional): Effective connection type.
- `rtt` (number, optional): Estimated effective round-trip time in milliseconds.
- `saveData` (boolean, optional): Indicates if the user has requested a reduced data usage mode.
- `type` (string, optional): Connection type ('bluetooth', 'cellular', 'ethernet', 'none', 'wifi', etc.).

## Use Cases

- **Adaptive Content Loading**: Adjust content quality based on connection speed.
- **Offline Handling**: Provide appropriate UI when the user goes offline.
- **Data Usage Optimization**: Respect user's data saving preferences.
- **Performance Monitoring**: Track network performance for analytics.
- **Progressive Enhancement**: Enhance features based on connection quality.

## Browser Support

The hook works in all modern browsers. The Network Information API is supported in:
- Chrome 61+
- Firefox (limited support)
- Safari (not supported)
- Edge 79+

When the Network Information API is not available, the hook will only provide online/offline status.

## Contributing

Contributions to enhance `useNetwork` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

