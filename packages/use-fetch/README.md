# useFetch Hook

The `useFetch` hook is a powerful and feature-rich tool for making API requests in React applications. It provides advanced features like SWR-style caching, automatic retries, request batching, data transformation, and comprehensive state management.

## Installation

### Installing Only Current Hook

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

## Importing the Hook

The `useFetch` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useFetch } from '@custom-react-hooks/use-fetch';
```

## Features

- **🚀 Automatic Data Fetching:** Initiates fetch requests on component mount with configurable manual control
- **🔄 SWR-Style Caching:** Built-in intelligent caching with configurable deduplication intervals
- **🔁 Automatic Retries:** Configurable retry logic with exponential backoff for failed requests
- **📦 Request Batching:** Batch multiple identical requests to reduce server load
- **🔄 Data Revalidation:** Manual and automatic revalidation with focus/reconnect triggers
- **✨ Data Transformation:** Transform response data with custom functions
- **⏱️ Timeout Support:** Configurable request timeouts with proper cleanup
- **🔧 Data Mutation:** Optimistic updates and manual data mutations
- **📊 Loading States:** Comprehensive loading and validation state management
- **🎯 Fallback Data:** Support for fallback data during loading states
- **🔒 Memory Management:** Proper cleanup and memory leak prevention
- **🌐 Global State Integration:** Optional integration with global state management
- **⚡ Performance Optimized:** Keep previous data option for smooth UX transitions

## Basic Usage

```typescript
import React from 'react';
import { useFetch } from '@custom-react-hooks/use-fetch';

const UserProfile = () => {
  const { data, loading, error, isValidating } = useFetch('/api/user/profile');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
      {isValidating && <span>Refreshing...</span>}
    </div>
  );
};
```

## Advanced Usage

### Manual Fetching with Options

```typescript
const DataComponent = () => {
  const { data, loading, error, fetchData, mutate, revalidate } = useFetch(
    'https://api.example.com/data',
    {
      manual: true,
      timeout: 5000,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      dedupingInterval: 30000,
      keepPreviousData: true,
      transform: (rawData) => ({
        ...rawData,
        processedAt: new Date().toISOString()
      })
    }
  );

  const handleFetch = () => fetchData();
  const handleMutate = () => mutate({ name: 'Updated Data' });
  const handleRevalidate = () => revalidate();

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        Fetch Data
      </button>
      <button onClick={handleMutate}>Update Data</button>
      <button onClick={handleRevalidate}>Refresh</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
```

### With Request Batching

```typescript
const BatchedRequests = () => {
  const { data: data1 } = useFetch('/api/popular-data', {
    batchRequests: true,
    batchDelay: 50 // Wait 50ms to batch requests
  });
  
  const { data: data2 } = useFetch('/api/popular-data', {
    batchRequests: true,
    batchDelay: 50
  });

  // Both requests will be batched into a single network call
  return <div>{/* Render data */}</div>;
};
```

### With Automatic Revalidation

```typescript
const LiveData = () => {
  const { data, isValidating } = useFetch('/api/live-data', {
    refreshInterval: 5000, // Refresh every 5 seconds
    revalidateOnFocus: true, // Refresh when window gains focus
    revalidateOnReconnect: true, // Refresh when network reconnects
    dedupingInterval: 2000 // Cache for 2 seconds
  });

  return (
    <div>
      <h2>Live Data {isValidating && '🔄'}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

## API Reference

### Parameters

#### `url` (string | null)
The URL to fetch data from. Pass `null` to disable fetching.

#### `options` (FetchOptions<T>)
Configuration options extending the standard `RequestInit`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `manual` | `boolean` | `false` | Disable automatic fetching on mount |
| `timeout` | `number` | `undefined` | Request timeout in milliseconds |
| `revalidateOnFocus` | `boolean` | `true` | Revalidate when window gains focus |
| `revalidateOnReconnect` | `boolean` | `true` | Revalidate when network reconnects |
| `refreshInterval` | `number` | `0` | Auto-refresh interval in milliseconds |
| `dedupingInterval` | `number` | `2000` | Cache duration in milliseconds |
| `errorRetryCount` | `number` | `3` | Number of retry attempts on error |
| `errorRetryInterval` | `number` | `5000` | Delay between retries in milliseconds |
| `fallbackData` | `T` | `undefined` | Initial data to display |
| `keepPreviousData` | `boolean` | `false` | Keep previous data during revalidation |
| `batchRequests` | `boolean` | `false` | Enable request batching |
| `batchDelay` | `number` | `10` | Batch delay in milliseconds |
| `transform` | `(data: any) => T` | `undefined` | Transform response data |

#### `cache` (Map<string, T> | null)
Optional external cache instance for custom caching strategies.

#### `globalStateSetter` ((data: T | null) => void)
Optional function to update global state with fetched data.

### Returns

The hook returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `T \| null` | The fetched data |
| `loading` | `boolean` | Initial loading state |
| `error` | `Error \| null` | Error object if request failed |
| `isValidating` | `boolean` | Whether data is being revalidated |
| `fetchData` | `() => Promise<void>` | Manually trigger fetch |
| `mutate` | `(data?: T \| Promise<T> \| ((current: T \| null) => T \| Promise<T>)) => Promise<T \| null>` | Update data optimistically |
| `revalidate` | `() => Promise<void>` | Revalidate current data |

## Advanced Features

### Data Mutation

```typescript
const { data, mutate } = useFetch('/api/user');

// Optimistic update
const updateUser = async (newData) => {
  // Update UI immediately
  mutate(newData);
  
  // Send request to server
  try {
    const result = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(newData)
    });
    // Revalidate to sync with server
    mutate();
  } catch (error) {
    // Revert on error
    mutate(data);
  }
};
```

### Custom Cache Management

```typescript
import { cacheManager } from '@custom-react-hooks/use-fetch';

// Clear all cache
cacheManager.clear();

// Access cache directly
const cachedData = cacheManager.get('/api/data');
```

### Error Handling with Retries

```typescript
const { data, error } = useFetch('/api/unreliable-endpoint', {
  errorRetryCount: 5,
  errorRetryInterval: 2000, // 2 seconds between retries
  timeout: 10000 // 10 second timeout
});

if (error) {
  console.log('Failed after 5 retries:', error.message);
}
```

## Use Cases

- **📊 Dashboard Data:** Real-time dashboards with automatic refresh
- **👤 User Profiles:** User data with optimistic updates
- **📝 Form Submissions:** Handle form data with proper error states
- **🔍 Search Results:** Debounced search with caching
- **📱 Mobile Apps:** Offline-first data fetching
- **⚡ Performance Critical:** Batched requests and intelligent caching
- **🌐 Global State:** Integration with Redux, Zustand, or Context API

## Best Practices

1. **Use caching wisely:** Set appropriate `dedupingInterval` based on data freshness requirements
2. **Handle loading states:** Always provide feedback during data fetching
3. **Implement error boundaries:** Wrap components using `useFetch` in error boundaries
4. **Optimize re-renders:** Use `keepPreviousData` for smooth transitions
5. **Clean up properly:** The hook handles cleanup automatically, but be mindful of component unmounting
6. **Batch similar requests:** Use `batchRequests` for frequently accessed endpoints

## TypeScript Support

The hook is fully typed and supports generic type parameters:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const { data } = useFetch<User>('/api/user/1');
// data is typed as User | null
```

## Error Handling

```typescript
const { data, error, loading } = useFetch('/api/data');

if (loading) return <Spinner />;
if (error) {
  return (
    <ErrorMessage>
      {error.message}
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </ErrorMessage>
  );
}

return <DataDisplay data={data} />;
```

## Notes

- The hook uses a global cache manager for optimal performance across components
- Request deduplication prevents unnecessary network calls
- Automatic cleanup prevents memory leaks
- Server-side rendering compatible
- Works with any data format (JSON, text, blob, etc.)

## Contributing

Contributions to enhance the `useFetch` hook are welcome. Please feel free to submit issues or pull requests to the repository.

## License

MIT License - see LICENSE file for details.