# `useAsync` Hook

The `useAsync` hook simplifies the handling of asynchronous operations in React applications, such as data fetching or any other promise-returning functions. It provides a structured way to track the status and outcome of async operations.

## Features

- **Automated Execution:** Optionally executes the async function automatically on component mount.
- **Manual Execution:** Provides a function to manually trigger the async operation.
- **Status and Error Tracking:** Tracks the status of the async operation and captures any errors.
- **SSR Compatibility:** Safe for server-side rendering, with checks to prevent automatic execution on the server.
- **Value Management:** Manages the value returned from the async operation.

## Installation

```bash
npm install @custom-react-hooks/use-async
```

or

```bash
yarn add @custom-react-hooks/use-async
```

## Usage

```typescript
import useAsync from '@custom-react-hooks/use-async';

const fetchData = async () => {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());
};

const TestComponent = () => {
  const { execute, status, value, error } = useAsync(fetchData, false);

  return (
    <div>
      {status === 'idle' && <button onClick={execute}>Fetch Data</button>}
      {status === 'pending' && <p>Loading...</p>}
      {status === 'success' && <div>{JSON.stringify(value)}</div>}
      {status === 'error' && <p>Error: {error?.message}</p>}
    </div>
  );
};

export default TestComponent;
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


## Contributing

Contributions to enhance `useAsync` are highly encouraged. Feel free to submit issues or pull requests to the repository.

Certainly, I'll help you update the documentation for your `useAsync` custom hook. Below is an improved and more detailed documentation template:
