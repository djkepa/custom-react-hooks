# `useToggle` Hook

`useToggle` is a custom React hook for managing boolean states with enhanced control. It provides a simple and efficient way to toggle a boolean state and execute a callback function in response to the state changes.

## Features

- **Simple State Toggle:** Easily toggle a boolean state between `true` and `false`.
- **Direct State Control:** Functions to explicitly set the state to `true` or `false`.
- **Callback Execution:** Executes a callback function whenever the state changes.

## Installation

To integrate `useToggle` into your project:

```bash
npm install @custom-react-hooks/use-toggle
```

or

```bash
yarn add @custom-react-hooks/use-toggle
```

## Usage

```typescript
import useToggle from '@custom-react-hooks/use-toggle';

const MyComponent = () => {
  const handleToggle = (newValue) => {
    console.log('Toggle state is now:', newValue);
  };

  const { value, toggle, setTrue, setFalse } = useToggle(false, handleToggle);

  return (
    <div>
      <p>The toggle state is: {value ? 'True' : 'False'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
};
```

In this example, `useToggle` is used to manage a boolean state. A callback function is provided to log the new state whenever it changes.

## API Reference

- `initialValue`: (optional) The initial boolean value (default is `false`).
- `onToggle`: (optional) A callback function that gets called with the new value whenever the toggle state changes.
- Returns an object with:
  - `value`: The current boolean value.
  - `toggle`: Function to toggle the value.
  - `setTrue`: Function to set the value to true.
  - `setFalse`: Function to set the value to false.

## Contributing

Contributions to enhance `useToggle` are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.