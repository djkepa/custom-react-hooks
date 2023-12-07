# useKeyPress Hook

The `useKeyPress` hook is an advanced utility for detecting specific keypress events in React applications. It supports customizable debounce timing and can listen for keypress events either globally or locally within a component.

## Features

- **Key Detection:** Monitors for the press of a specific key.
- **Debounce Support:** Includes an optional debounce feature to manage rapid keypresses.
- **Global and Local Listening:** Option to listen for keypress events globally (across the entire window) or locally (within a specific component).
- **SSR Compatibility:** Safely handles server-side rendering environments.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-key-press
```

or

```bash
yarn add @custom-react-hooks/use-key-press
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
import { useKeyPress } from '@custom-react-hooks/all';

const KeyPressComponent = () => {
  const isPressed = useKeyPress('Enter');

  return (
    <div>
      <p>Press the "Enter" key</p>
      <button>
        Enter
      </button>
      {isPressed && <p>You are pressing the "Enter" key!</p>}
    </div>
  );
};

export default KeyPressComponent;
```

This example demonstrates using `useKeyPress` to detect when the Enter key is pressed with a debounce of 200 milliseconds.

## API Reference

### Parameters
- `targetKey`: The key for which the press event should be detected.
- `options`: An object that may contain:
- `debounce`: Optional number specifying the debounce time in milliseconds.
- `global`: Optional boolean indicating whether to listen for the event globally.
  
### Returns
- Returns a boolean state indicating whether the specified key is currently pressed.

## Use Cases

- **Keyboard Shortcuts**: Implement custom keyboard shortcuts for enhanced user interaction.
- **Game Controls**: Handle key presses for browser-based games.
- **Navigation**: Navigate through components or pages using keyboard keys.
- **Accessibility Enhancements**: Improve accessibility by providing keyboard interactions.

## Contributing

We welcome contributions to improve `useKeyPress`. Feel free to submit issues or pull requests to the repository.