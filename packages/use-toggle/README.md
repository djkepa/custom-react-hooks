# useToggle Hook

`useToggle` is a custom React hook for managing boolean states with enhanced control. It provides a simple and efficient way to toggle a boolean state and execute a callback function in response to the state changes.

## Features

- **Simple State Toggle:** Easily toggle a boolean state between `true` and `false`.
- **Direct State Control:** Functions to explicitly set the state to `true` or `false`.
- **Callback Execution:** Executes a callback function whenever the state changes.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-toggle
```

or

```bash
yarn add @custom-react-hooks/use-toggle
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

The `useToggle` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useToggle } from '@custom-react-hooks/use-toggle';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import { useToggle } from '@custom-react-hooks/all';

const ToggleComponent = () => {
  const { value, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div>
      <div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={setTrue}>
          Set True
        </button>
        <button onClick={setFalse}>
          Set False
        </button>
      </div>
      {value && <h2>Message Visible</h2>}
    </div>
  );
};

export default ToggleComponent;
```

In this example, `useToggle` is used to manage a boolean state. A callback function is provided to log the new state whenever it changes.

## API Reference

### Parameters
- `initialValue`: (optional) The initial boolean value (default is `false`).
- `onToggle`: (optional) A callback function that gets called with the new value whenever the toggle state changes.

### Returns
  - `value`: The current boolean value.
  - `toggle`: Function to toggle the value.
  - `setTrue`: Function to set the value to true.
  - `setFalse`: Function to set the value to false.

## Use Cases 

- **Toggle UI Elements**: Manage the state of toggleable UI elements like dropdowns, modals, or switches.
- **Feature Flags**: Implement feature toggling within your application for enabling or disabling features.
- **Conditional Rendering**: Control the rendering of components based on a toggle state.
- **User Preferences**: Manage user preferences such as dark mode or layout options.

## Contributing

Contributions to enhance `useToggle` are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.