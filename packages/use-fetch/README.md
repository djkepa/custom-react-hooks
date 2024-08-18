# useFetch Hook

The `useFetch` hook is a powerful tool for making API requests in React applications. It simplifies the process of fetching data from a URL and handles various advanced features like caching, timeouts, and integration with global state management systems.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-fetch
```

or

```bash
yarn add @custom-react-hooks/use-fetch
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

Certainly! Based on the provided `useFetch` hook, here are some detailed features that you can include in your documentation:

## Importing the Hook

The `useFetch` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useFetch } from '@custom-react-hooks/use-fetch';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.

## Features

- **Automatic Data Fetching:** The hook initiates a fetch request as soon as the component mounts, making it effortless to load data from APIs or servers. This behavior can be controlled with the `manual` option for more specific use cases.

- **Manual Fetch Control:** Provides the flexibility to manually trigger fetch requests using the `fetchData` function. This is particularly useful for cases where data needs to be re-fetched based on user interactions or other events.

- **Built-in Loading and Error States:** Manages loading and error states internally, simplifying the process of rendering different UI components based on the status of the API request.

- **Configurable Fetch Options:** Extends the standard `fetch` API options, allowing customization of request headers, method, body, and other settings. This makes it versatile for various types of API requests.

- **Timeout Support:** Includes a timeout feature, enabling the specification of a maximum time to wait for a response. This helps in handling scenarios where the server response might be delayed.

- **Response Caching:** Offers an optional caching mechanism to store and retrieve responses. This reduces redundant network requests, optimizing performance for frequently accessed data.

- **Global State Integration:** Allows for the integration with global state management systems by providing an optional setter function. This is useful for updating global states like Redux or Context API with the fetched data.

- **Automatic Cleanup:** Handles the cleanup of timeouts and aborts ongoing fetch requests to prevent memory leaks and unwanted side effects, especially important in dynamic and complex applications.

- **Error Handling:** Captures and returns errors encountered during the fetch process, facilitating robust error handling and user feedback mechanisms in the application.

- **Flexible Return Types:** The hook is generic, making it capable of returning data in any format (e.g., JSON, text), depending on the needs of the application.

- **Server-Side Rendering Compatibility:** Designed to be safely used in server-side rendering environments, avoiding errors related to the absence of a `window` or browser-specific APIs.


## Usage

Here's an example of how to use the `useFetch` hook in a component:

```typescript
import { useFetch } from '@custom-react-hooks/all';

const FetchComponent = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users/1');
  const { data, loading, error, fetchData } = useFetch(url, { manual: true });

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetch = () => {
    fetchData();
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={handleChange}
      />
      <button
        onClick={handleFetch}
        disabled={loading}
      >
        Fetch Data
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Data:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
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

## Use Cases

- **Data Fetching**: Load data from an API or server, handling loading states and errors.
- **Caching Responses**: Implement caching strategies to reduce redundant network requests.
- **Global State Updates**: Update global state (like in Redux or Context API) with fetched data.
- **Polling Mechanism**: Implement polling for real-time updates from a server.
- **Conditional Requests**: Make API requests based on user actions or component lifecycle.

## Notes

- The `useFetch` hook is designed to be flexible and can be adapted to fit various fetching requirements.
- Remember to handle the cleanup of timeouts and abort controllers to avoid memory leaks and unexpected behavior in your components.

## Contributing

Contributions to enhance the `useFetch` hook are welcome. Feel free to submit issues or pull requests to the repository.
