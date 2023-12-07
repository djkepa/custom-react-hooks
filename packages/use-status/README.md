# useStatus Hook

The `useStatus` hook is designed to monitor the network status of a user's device in React applications. It provides real-time information on whether the user is online or offline and includes additional network details when available.

## Features

- **Network Connection Status:** Detects and reports the user's online or offline status.
- **Network Information Tracking:** When available, provides additional network information such as downlink speed, effective connection type, and round-trip time.
- **Real-Time Updates:** Listens to changes in the network status and updates the information accordingly.
- **TypeScript Compatibility:** Includes TypeScript definitions to handle non-standard browser APIs like the Network Information API.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-status
```

or

```bash
yarn add @custom-react-hooks/use-status
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

Import and use the `useStatus` hook in your React components to get network status:

```typescript
import { useStatus } from '@custom-react-hooks/all';

const StatusComponent = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <h1>Network Status</h1>
      <p>{online ? 'Online' : 'Offline'}</p>
      {downlink && (
        <p>
          Downlink Speed:
          <span>{downlink}Mbps</span>
        </p>
      )}
      {effectiveType && (
        <p>
          Effective Type:
          <span>{effectiveType}</span>
        </p>
      )}
      {rtt && (
        <p>
          RTT: <span>{rtt}ms</span>
        </p>
      )}
    </div>
  );
};

export default StatusComponent;
```

In this example, the hook provides the current network status along with additional network information if the user is online.

## API Reference

### Returns
  - `online`: Boolean indicating if the user is online.
  - `downlink`: The downlink speed in Mbps (optional).
  - `effectiveType`: The effective type of the network connection (e.g., '4g', '3g') (optional).
  - `rtt`: The round-trip time in milliseconds (optional).

## Use Cases

- **Online/Offline Indicators**: Display indicators showing whether the user is currently online or offline.
- **Adaptive Content Loading**: Adjust the amount of data loaded based on network speed (e.g., lower-quality images for slow connections).
- **Handling Disconnections**: Gracefully handle disconnections, e.g., by saving user progress or pausing activities.
- **User Experience Optimization**: Optimize user experience based on network conditions, such as simplifying interfaces under poor connectivity.

## Contributing

Contributions to improve `useStatus` are welcome. Feel free to submit issues or pull requests to the repository.
