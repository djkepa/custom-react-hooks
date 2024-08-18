# useTimeout Hook

`useTimeout` is a custom React hook that manages timeouts. It provides a straightforward way to handle actions that should occur after a delay, with the ability to start, reset, and stop the timeout.

## Features

- **Timeout Control:** Start, reset, and clear timeouts with simple API calls.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments, avoiding calls to `setTimeout` on the server.
- **Automatic Cleanup:** Automatically clears the timeout to prevent memory leaks when the component unmounts or when the timeout is stopped.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-timeout
```

or

```bash
yarn add @custom-react-hooks/use-timeout
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useTimeout` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useTimeout } from '@custom-react-hooks/use-timeout';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React, { useState } from 'react';
import { useTimeout } from '@custom-react-hooks/all';

const TimeoutComponent = () => {
  const [message, setMessage] = useState('');
  const showMessage = () => setMessage('Hello! The timeout has completed.');

  const { isActive, reset, clear } = useTimeout(showMessage, 3000);

  const handleStart = () => {
    setMessage('');
    reset();
  };

  const resetMessage = () => {
    clear();
    setMessage('');
  };

  return (
    <div className="center">
      <h2>Timeout Example</h2>
      <div className="btns">
        <button
          onClick={handleStart}
          disabled={isActive}
        >
          {isActive ? 'Timeout is active...' : 'Start Timeout'}
        </button>
        <button
          onClick={resetMessage}
          disabled={!isActive}
        >
          Clear Timeout
        </button>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default TimeoutComponent;
```

In this example, `useTimeout` is used to manage a timeout that triggers a function after a specified delay.

## API Reference

### Parameters
- `callback`: The function to be executed after the timeout.
- `delay`: The delay in milliseconds before the timeout is triggered. Pass `null` to deactivate the timeout.

### Returns
  - `isActive`: Boolean indicating if the timeout is currently active.
  - `reset`: Function to start or restart the timeout.
  - `clear`: Function to stop the timeout.

## Use Cases 

- **Delayed Actions**: Perform actions after a specified delay, like showing a tooltip or closing a modal.
- **Debouncing User Input**: Implement a delay in processing input to wait for user typing to pause or finish.
- **Timeout-based Transitions**: Create animations or transitions that are triggered after a timeout.
- **Polling Mechanism**: Set up a polling mechanism where a function is executed repeatedly with a delay.

## Contributing

Contributions to improve `useTimeout` are welcome. Feel free to submit issues or pull requests to the repository.
