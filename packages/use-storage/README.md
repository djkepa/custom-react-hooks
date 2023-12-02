# useStorage Hook

`useStorage` is a versatile hook for interacting with Web Storage (localStorage and sessionStorage) in React applications. It simplifies storage operations and ensures compatibility with server-side rendering.

## Features

- **LocalStorage and SessionStorage:** Works with both `localStorage` and `sessionStorage`.
- **Server-Side Rendering Support:** Safely handles server-side rendering scenarios.
- **Automatic JSON Handling:** Automatically serializes and deserializes stored values.
- **Synchronized State:** Keeps the React state in sync with storage changes.
- **Error Handling:** Provides error handling for storage access and manipulation.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-storage
```

or

```bash
yarn add @custom-react-hooks/use-storage
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
import useStorage from '@custom-react-hooks/use-storage';

const StorageTestComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useStorage('testKey', '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setStoredValue(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save to Storage</button>
      <div>Stored Value: {storedValue}</div>
    </div>
  );
};

export default StorageTestComponent;
```

In this example, the hook manages a value in `localStorage`, providing functions to read and update it.

## API Reference

- `key`: The key under which to store the value in storage.
- `defaultValue`: The default value to use if no item is found in storage.
- `storageType`: Type of storage to use (`'local'` for `localStorage`, `'session'` for `sessionStorage`).
- Returns an array with the stored value and a setter function to update it.

## Contributing

Contributions to enhance `useStorage` are welcome. Feel free to submit issues or pull requests to the repository.
