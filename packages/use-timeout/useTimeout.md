# `useTimeout` Hook

`useTimeout` is a custom React hook that manages timeouts. It provides a straightforward way to handle actions that should occur after a delay, with the ability to start, reset, and stop the timeout.

## Features

- **Timeout Control:** Start, reset, and clear timeouts with simple API calls.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments, avoiding calls to `setTimeout` on the server.
- **Automatic Cleanup:** Automatically clears the timeout to prevent memory leaks when the component unmounts or when the timeout is stopped.

## Installation

```bash
npm install @custom-react-hooks/use-timeout
```

or

```bash
yarn add @custom-react-hooks/use-timeout
```

## Usage

```typescript
import React, { useState } from 'react';
import useTimeout from '@custom-react-hooks/use-timeout';

const TimeoutTestComponent: React.FC = () => {
  const [message, setMessage] = useState('No timeout set');
  const { reset, clear, isActive } = useTimeout(() => setMessage('Timeout triggered'), 2000); // 2-second timeout

  const handleSetTimeout = () => {
    reset();
    setMessage('Timeout is active...');
  };

  const handleClearTimeout = () => {
    clear();
    setMessage('Timeout cleared');
  };

  return (
    <div>
      <button onClick={handleSetTimeout}>Set Timeout</button>
      <button onClick={handleClearTimeout}>Clear Timeout</button>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>{message}</p>
    </div>
  );
};

export default TimeoutTestComponent;
```

In this example, `useTimeout` is used to manage a timeout that triggers a function after a specified delay.

## API Reference

- `callback`: The function to be executed after the timeout.
- `delay`: The delay in milliseconds before the timeout is triggered. Pass `null` to deactivate the timeout.
- Returns an object with:
  - `isActive`: Boolean indicating if the timeout is currently active.
  - `reset`: Function to start or restart the timeout.
  - `clear`: Function to stop the timeout.

## Contributing

Contributions to improve `useTimeout` are welcome. Feel free to submit issues or pull requests to the repository.
