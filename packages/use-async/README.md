# useAsync Hook

The `useAsync` hook simplifies the handling of asynchronous operations in React applications, such as data fetching or any other promise-returning functions. It provides a structured way to track the status and outcome of async operations.

## Features

- **Automated Execution:** Optionally executes the async function automatically on component mount.
- **Manual Execution:** Provides a function to manually trigger the async operation.
- **Status and Error Tracking:** Tracks the status of the async operation and captures any errors.
- **SSR Compatibility:** Safe for server-side rendering, with checks to prevent automatic execution on the server.
- **Value Management:** Manages the value returned from the async operation.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-async
```

or

```bash
yarn add @custom-react-hooks/use-async
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
import React, { useState } from 'react';
import { useAsync } from '@custom-react-hooks/all';

const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }
  return response.json();
};

const AsyncComponent = () => {
  const [endpoint, setEndpoint] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const { execute, status, value: data, error } = useAsync(() => fetchData(endpoint), false);

  const handleFetch = () => {
    if (simulateError) {
      setEndpoint('https://jsonplaceholder.typicode.com/todos/1');
    }
    execute();
  };

  return (
    <div>
      <input
        type="text"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        placeholder="Enter API endpoint"
      />
      <button onClick={handleFetch}>Fetch Data</button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={simulateError}
            onChange={() => setSimulateError(!simulateError)}
          />
          Simulate Error
        </label>
      </div>

      {status === 'pending' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error?.message}</div>}
      {status === 'success' && (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AsyncComponent;
```

In this example, the `useAsync` hook is used to perform an asynchronous data fetch operation.

## API Reference

### Parameters

- `asyncFunction` (Function): The asynchronous function to execute.
- `immediate` (Boolean, optional): A boolean indicating whether the async function should be executed immediately on component mount. Defaults to `false`.

### Returns

An object with the following properties:

- `execute` (Function): A function to trigger the async operation.
- `status` (String): The current status of the async operation (`idle`, `pending`, `success`, `error`).
- `value` (Any): The value returned from the async operation.
- `error` (Error | null): Any error that occurred during the execution.

## Use Cases

1. **API Data Fetching**: Fetching data from an API when a component mounts or based on user actions.

2. **Form Submission Handling**: Managing asynchronous form submissions to a server, including loading states and error handling.

3. **Lazy Loading**: Dynamically loading components or data based on certain conditions or user interactions.

4. **Web API Interactions**: Simplifying the use of asynchronous Web APIs (like geolocation or camera access).

5. **File Uploads**: Handling the asynchronous process of file uploads, including progress tracking and error management.

6. **Real-time Data Updates**: Managing WebSocket connections or server polling for live data updates.

7. **Complex Calculations/Processing**: Executing and managing state for asynchronous complex calculations, such as those using Web Workers.

8. **Third-party Service Integration**: Facilitating interactions with asynchronous third-party services (e.g., payment gateways, social media APIs).

9. **Conditional Async Operations**: Executing asynchronous tasks based on specific conditions or inputs.

10. **Sequencing Async Operations**: Coordinating multiple dependent asynchronous operations in sequence.

## Contributing

Contributions to enhance `useAsync` are highly encouraged. Feel free to submit issues or pull requests to the repository.