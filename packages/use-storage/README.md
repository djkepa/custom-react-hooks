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

## Importing the Hook

The `useStorage` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useStorage } from '@custom-react-hooks/use-storage';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React from 'react';
import { useStorage } from '@custom-react-hooks/all';

const StorageList = ({ storageType }: { storageType: 'local' | 'session' }) => {
  const [items, setItems] = useStorage(`${storageType}-items`, [], storageType);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.currentTarget.value) {
            addItem(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        placeholder={`Add to ${storageType} storage`}
      />
      <h2>{storageType === 'local' ? 'LocalStorage' : 'SessionStorage'} List</h2>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item} <XCircleIcon onClick={() => removeItem(index)} />
          </li>
        ))}
      </ol>
    </div>
  );
};

const StorageComponent = () => (
  <div className="storage">
    <StorageList storageType="local" />
    <StorageList storageType="session" />
  </div>
);

return default StorageComponent;
```

In this example, the hook manages a value in `localStorage`, providing functions to read and update it.

## API Reference

### Parameters
- `key`: The key under which to store the value in storage.
- `defaultValue`: The default value to use if no item is found in storage.
- `storageType`: Type of storage to use (`'local'` for `localStorage`, `'session'` for `sessionStorage`).

### Returns
- Returns an array with the stored value and a setter function to update it.

## Use Cases

- **State Persistence**: Persist state between page reloads, such as user preferences or session data.
- **Form Data Saving**: Save form data in the browser to prevent loss on page refresh.
- **Local Data Caching**: Cache data locally to reduce API calls and improve loading times.
- **Feature Toggling**: Store feature flags or toggles in the browser for conditional feature rendering.

## Contributing

Contributions to enhance `useStorage` are welcome. Feel free to submit issues or pull requests to the repository.
