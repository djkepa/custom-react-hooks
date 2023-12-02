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
import useStatus from '@custom-react-hooks/use-status';

const NetworkStatusComponent: React.FC = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <h1>Network Status</h1>
      <p>{online ? 'Online' : 'Offline'}</p>
      {downlink && <p>Downlink Speed: {downlink} Mbps</p>}
      {effectiveType && <p>Effective Type: {effectiveType}</p>}
      {rtt && <p>RTT: {rtt} ms</p>}
    </div>
  );
};

export default NetworkStatusComponent;
```

In this example, the hook provides the current network status along with additional network information if the user is online.

## API Reference

- The hook returns an object with the following properties:
  - `online`: Boolean indicating if the user is online.
  - `downlink`: The downlink speed in Mbps (optional).
  - `effectiveType`: The effective type of the network connection (e.g., '4g', '3g') (optional).
  - `rtt`: The round-trip time in milliseconds (optional).

## Contributing

Contributions to improve `useStatus` are welcome. Feel free to submit issues or pull requests to the repository.
