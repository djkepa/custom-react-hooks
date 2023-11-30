# `useKeyPress` Hook

The `useKeyPress` hook is an advanced utility for detecting specific keypress events in React applications. It supports customizable debounce timing and can listen for keypress events either globally or locally within a component.

## Features

- **Key Detection:** Monitors for the press of a specific key.
- **Debounce Support:** Includes an optional debounce feature to manage rapid keypresses.
- **Global and Local Listening:** Option to listen for keypress events globally (across the entire window) or locally (within a specific component).
- **SSR Compatibility:** Safely handles server-side rendering environments.

## Installation

To integrate `useKeyPress` into your project:

```bash
npm install @custom-react-hooks/use-key-press
```

or

```bash
yarn add @custom-react-hooks/use-key-press
```

## Usage

```typescript
import useKeyPress from '@custom-react-hooks/use-key-press';

const MyComponent = () => {
  const keyPressed = useKeyPress('Enter', { debounce: 200, global: true });

  return (
    <div>
      {keyPressed ? 'Enter key is pressed' : 'Press the Enter key'}
    </div>
  );
};
```

This example demonstrates using `useKeyPress` to detect when the Enter key is pressed with a debounce of 200 milliseconds.

## API Reference

- `targetKey`: The key for which the press event should be detected.
- `options`: An object that may contain:
  - `debounce`: Optional number specifying the debounce time in milliseconds.
  - `global`: Optional boolean indicating whether to listen for the event globally.
  
- Returns a boolean state indicating whether the specified key is currently pressed.

## Contributing

We welcome contributions to improve `useKeyPress`. Feel free to submit issues or pull requests to the repository.