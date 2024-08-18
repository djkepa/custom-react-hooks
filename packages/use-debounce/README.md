# useDebounce Hook

The `useDebounce` hook is used to delay the execution of a function until a specified amount of time has passed since it was last invoked. This is useful for handling rapid user input scenarios, such as search input fields or window resizing.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-debounce
```

or

```bash
yarn add @custom-react-hooks/use-debounce
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

The `useDebounce` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useDebounce } from '@custom-react-hooks/use-debounce';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.

## Features

- **Function Execution Delay:** Delays the execution of a function until a certain amount of time has passed since its last invocation, effectively controlling the rate at which the function fires.

- **Configurable Delay and Max Wait:** Offers the flexibility to set both a delay for the debounce and a maximum waiting time, ensuring the function is executed after a certain period even if the input continues.

- **Leading and Trailing Edge Execution:** Provides options for executing the function at the start (leading edge) or at the end (trailing edge) of the debounce delay, catering to different use case requirements.

- **Improved Performance in Rapid Input Scenarios:** Particularly useful in scenarios involving rapid user inputs, such as typing in search fields or adjusting UI elements, to prevent excessive function calls.

- **Cancel Functionality:** Includes a mechanism to cancel the debounced action, offering additional control over the debounced function's behavior.

- **Optimized for User Interaction Scenarios:** Ideal for use cases like search inputs, form validations, or any scenario where user input can trigger frequent updates or API calls.

- **Versatile Application:** Can be used in various scenarios beyond input fields, such as debouncing API calls, resize or scroll event handlers, and more.

- **Memory Leak Prevention:** Cleans up timeouts on component unmount to prevent memory leaks, ensuring better resource management in React applications.

- **Refined User Experience:** Enhances user experience by reducing the frequency of potentially disruptive or intensive operations during rapid user interactions.

- **Rate-limiting for User Actions:** Useful for rate-limiting user actions, preventing excessive or unintended interactions, like rapid button clicks or toggle switches.

## Usage

Here's an example of using `useDebounce` in a search input component:

```typescript
import React, { useState } from 'react';
import { useDebounce } from '@custom-react-hooks/all';

const DebounceComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [updateDebouncedValue] = useDebounce(
    (val) => {
      setDebouncedValue(val);
    },
    1000,
    { maxWait: 2000 },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    updateDebouncedValue(value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebounceComponent;
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

## Use Cases

- **Search Input**: Debounce search input to reduce the number of API calls during typing.
- **Form Validation**: Delay validation until the user has stopped typing, improving performance and user experience.
- **Resize or Scroll Events**: Improve performance by debouncing window resize or scroll event handlers.
- **Autocomplete Fields**: Use in autocomplete or typeahead fields to control the rate of server requests.
- **Saving User Input**: Auto-save user input in a text field or editor with a delay, reducing unnecessary save operations.
- **Rate-limiting User Actions**: Prevent rapid, repeated actions by the user, like button clicks or toggle switches.

## Notes

- The `useDebounce` hook is useful for optimizing performance in scenarios where you want to limit the frequency of function execution.
- Make sure to adjust the delay based on your specific use case.

## Contributing

Your contributions are welcome! Feel free to submit issues or pull requests to improve the `useDebounce` hook.
