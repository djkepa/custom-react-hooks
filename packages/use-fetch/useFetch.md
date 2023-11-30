# `useFetch` Hook

The `useFetch` hook is a powerful tool for making API requests in React applications. It simplifies the process of fetching data from a URL and handles various advanced features like caching, timeouts, and integration with global state management systems.

## Installation

```bash
npm install @custom-react-hooks/use-fetch
```

or

```bash
yarn add @custom-react-hooks/use-fetch
```

## Usage

Here's an example of how to use the `useFetch` hook in a component:

```typescript
import React from 'react';
import useFetch from '@custom-react-hooks/use-fetch';

const MyComponent = () => {
  const { data, loading, error, fetchData } = useFetch('https://api.example.com/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={fetchData}>Reload</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
```

In this example, `useFetch` is used to load data from an API. The component displays the data, a loading state, and any error that might occur. A button is provided to manually trigger the fetch request.

## API Reference

### Parameters

- `url` (string): The URL to fetch data from.
- `options` (RequestInit & { manual?: boolean, timeout?: number }, optional): Configuration options for the fetch request. Includes standard `fetch` options along with `manual` for manual trigger and `timeout` for request timeout.
- `cache` (Map<string, T> | null, optional): An optional cache object to store and retrieve responses.
- `globalStateSetter` ((data: T | null) => void, optional): An optional global state setter function for integration with global state management systems.

### Returns

An object containing:
- `data` (T | null): The data received from the fetch request.
- `loading` (boolean): The loading state of the request.
- `error` (Error | null): Any error encountered during the request.
- `fetchData` (() => Promise<void>): A function to manually trigger the fetch request.

## Notes

- The `useFetch` hook is designed to be flexible and can be adapted to fit various fetching requirements.
- Remember to handle the cleanup of timeouts and abort controllers to avoid memory leaks and unexpected behavior in your components.

## Contributing

Contributions to enhance the `useFetch` hook are welcome. Feel free to submit issues or pull requests to the repository.
