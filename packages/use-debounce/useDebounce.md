# `useDebounce` Hook

The `useDebounce` hook is used to delay the execution of a function until a specified amount of time has passed since it was last invoked. This is useful for handling rapid user input scenarios, such as search input fields or window resizing.

## Installation

```bash
npm install @react-custom-hooks/use-debounce
```

or

```bash
yarn add @react-custom-hooks/use-debounce
```

## Usage

Here's an example of using `useDebounce` in a search input component:

```typescript
import React, { useState } from 'react';
import useDebounce from '@react-custom-hooks/use-debounce';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, cancelSearch] = useDebounce(() => {
    console.log('Searching for:', searchTerm);
  }, 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch();
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
```

In this component, the search function is debounced, which means it will only execute 500 milliseconds after the user stops typing.

## API Reference

### Parameters

- `callback` (Function): The function to debounce.
- `delay` (number): The number of milliseconds to delay.
- `options` (object, optional): Configuration options for the debounce behavior. Options include:
  - `maxWait` (number): The maximum time the function can be delayed before it's executed, regardless of subsequent calls.
  - `leading` (boolean): If `true`, the function is executed on the leading edge of the timeout.
  - `trailing` (boolean): If `true`, the function is executed on the trailing edge of the timeout.

### Returns

- `[debouncedFunction, cancelDebounce]`: 
  - `debouncedFunction` (Function): The debounced version of the provided function.
  - `cancelDebounce` (Function): A function that can be called to cancel the debounced action.

## Notes

- The `useDebounce` hook is useful for optimizing performance in scenarios where you want to limit the frequency of function execution.
- Make sure to adjust the delay based on your specific use case.

## Contributing

Your contributions are welcome! Feel free to submit issues or pull requests to improve the `useDebounce` hook.
