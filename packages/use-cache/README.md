# useCache Hook

The `useCache` hook provides a simple in-memory caching solution with TTL (Time To Live) support and automatic cleanup. It's perfect for caching API responses, computed values, or any data that you want to store temporarily in memory.

## Features

- **TTL Support:** Automatic expiration of cached entries after a specified time.
- **Size Limiting:** Configurable maximum cache size with LRU-style eviction.
- **Type Safe:** Full TypeScript support with generic typing.
- **Memory Efficient:** Automatic cleanup of expired entries.
- **Simple API:** Easy-to-use interface similar to Map/Set APIs.
- **Persistent Across Renders:** Cache persists across component re-renders.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-cache
```

or

```bash
yarn add @custom-react-hooks/use-cache
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

### Basic Usage

```typescript
import React, { useState } from 'react';
import { useCache } from '@custom-react-hooks/use-cache';

const CacheExample = () => {
  const cache = useCache<string>();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSet = () => {
    if (key && value) {
      cache.set(key, value);
      setKey('');
      setValue('');
    }
  };

  const handleGet = () => {
    const cachedValue = cache.get(key);
    alert(cachedValue ? `Value: ${cachedValue}` : 'Key not found');
  };

  return (
    <div>
      <h3>Cache Demo</h3>
      <div>
        <input
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSet}>Set</button>
        <button onClick={handleGet}>Get</button>
      </div>
      <p>Cache size: {cache.size()}</p>
      <p>Keys: {cache.keys().join(', ')}</p>
    </div>
  );
};

export default CacheExample;
```

### With TTL (Time To Live)

```typescript
import React, { useEffect, useState } from 'react';
import { useCache } from '@custom-react-hooks/use-cache';

const TTLCacheExample = () => {
  const cache = useCache<string>({ ttl: 5000 }); // 5 second default TTL
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    // Check cache first
    const cached = cache.get('api-data');
    if (cached) {
      setData(cached);
      return;
    }

    // Simulate API call
    const response = await fetch('/api/data');
    const result = await response.text();
    
    // Cache the result
    cache.set('api-data', result);
    setData(result);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>Data: {data}</p>
      <p>Cached: {cache.has('api-data') ? 'Yes' : 'No'}</p>
    </div>
  );
};
```

### Caching API Responses

```typescript
import React, { useState } from 'react';
import { useCache } from '@custom-react-hooks/use-cache';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserCache = () => {
  const userCache = useCache<User>({ ttl: 60000, maxSize: 50 }); // 1 minute TTL, max 50 users
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (id: string) => {
    // Check cache first
    const cached = userCache.get(id);
    if (cached) {
      setUser(cached);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`);
      const userData = await response.json();
      
      // Cache the user data
      userCache.set(id, userData);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => fetchUser(userId)}>
        {loading ? 'Loading...' : 'Fetch User'}
      </button>
      
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
      
      <div>
        <p>Cached users: {userCache.size()}</p>
        <button onClick={() => userCache.clear()}>Clear Cache</button>
      </div>
    </div>
  );
};
```

### Computed Value Caching

```typescript
import React, { useState } from 'react';
import { useCache } from '@custom-react-hooks/use-cache';

const ExpensiveCalculation = () => {
  const computeCache = useCache<number>();
  const [input, setInput] = useState(10);

  const expensiveComputation = (n: number): number => {
    // Check cache first
    const cached = computeCache.get(`fib-${n}`);
    if (cached !== undefined) {
      return cached;
    }

    // Expensive Fibonacci calculation
    const result = n <= 1 ? n : expensiveComputation(n - 1) + expensiveComputation(n - 2);
    
    // Cache the result
    computeCache.set(`fib-${n}`, result);
    return result;
  };

  const result = expensiveComputation(input);

  return (
    <div>
      <h3>Fibonacci Calculator with Caching</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        min="0"
        max="40"
      />
      <p>Fibonacci({input}) = {result}</p>
      <p>Cache size: {computeCache.size()}</p>
      <button onClick={() => computeCache.clear()}>Clear Cache</button>
    </div>
  );
};
```

## API Reference

### Parameters

- `options` (UseCacheOptions, optional): Configuration options for the cache.
  - `ttl` (number, optional): Default time-to-live for cache entries in milliseconds.
  - `maxSize` (number, optional): Maximum number of entries in the cache. Default: 100.

### Returns

An object containing the following methods:

- `get(key: string)`: Retrieve a value from the cache. Returns `undefined` if not found or expired.
- `set(key: string, value: T, ttl?: number)`: Store a value in the cache with optional TTL override.
- `has(key: string)`: Check if a key exists and is not expired.
- `delete(key: string)`: Remove a specific entry from the cache.
- `clear()`: Remove all entries from the cache.
- `size()`: Get the current number of entries (after cleanup).
- `keys()`: Get an array of all keys (after cleanup).

## Use Cases

- **API Response Caching**: Cache API responses to reduce network requests.
- **Computed Value Caching**: Store results of expensive calculations.
- **User Data Caching**: Cache user profiles, preferences, or session data.
- **Search Results**: Cache search results to improve user experience.
- **Configuration Caching**: Store application configuration or feature flags.
- **Image/Asset Caching**: Cache processed images or other assets.

## Cache Behavior

### TTL (Time To Live)
- Entries with TTL automatically expire after the specified time
- Expired entries are removed when accessed or during cleanup
- TTL can be set globally or per entry

### Size Management
- When maxSize is reached, oldest entries are evicted (LRU-style)
- Cleanup happens automatically during set operations
- Expired entries are prioritized for removal over old entries

### Memory Management
- The cache automatically cleans up expired entries
- No memory leaks as the cache is tied to component lifecycle
- Efficient storage using Map data structure

## Performance Considerations

- Cache operations are O(1) for get/set/delete
- Cleanup operations are O(n) but happen infrequently
- Memory usage is bounded by maxSize setting
- No external dependencies or timers

## TypeScript Support

The hook is fully typed and supports generic types:

```typescript
const stringCache = useCache<string>();
const userCache = useCache<User>();
const anyCache = useCache<any>();
```

## Contributing

Contributions to enhance `useCache` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

