# useScript Hook

The `useScript` hook is an advanced tool for dynamically loading and managing external scripts in React applications. It supports loading multiple scripts, handling load and error events, custom script attributes, and optional script removal.

## Features

- **Multiple Script Support:** Can handle an array of script sources.
- **Event Callbacks:** Provides `onLoad` and `onError` callbacks for handling respective script events.
- **Custom Script Attributes:** Allows setting attributes like `defer`, `async`, or custom `data-*` attributes.
- **Optional Script Removal:** Can remove script tags from the DOM on component unmount.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-script
```

or

```bash
yarn add @custom-react-hooks/use-script
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

Import the `useScript` hook and use it in your React components. You can specify multiple scripts and custom attributes:

```typescript
import { useScript } from '@custom-react-hooks/all';

const ScriptComponent = () => {
  const status = useScript(
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.js',
  );

  const triggerConfetti = () => {
    if (status === 'ready' && window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div>
      <h1>Confetti Script Loader</h1>

      <p>Script Loading Status: {status}</p>

      <button
        onClick={triggerConfetti}
        disabled={status !== 'ready'}
      >
        Trigger Confetti
      </button>
      {status === 'error' && (
        <p>Failed to load the script. Please check the URL.</p>
      )}
    </div>
  );
};

export default ScriptComponent;
```

In this example, the hook loads multiple scripts with additional attributes and provides callbacks for load and error events.

## API Reference

### Parameters
- `src`: A string or an array of strings representing the script source URLs.
- `options`: An object containing:
  - `onLoad`: Callback function triggered when the script loads.
  - `onError`: Callback function triggered on script load error.
  - `removeOnUnmount`: Boolean indicating whether to remove the script tags on unmount.
  - Additional attributes (e.g., `defer`, `async`) to be set on the script tags.

### Returns
  - `src`: Script source URL.
  - `status`: Load status of the script (`'loading'`, `'ready'`, or `'error'`).

## Use Cases

- **Third-Party Integrations**: Load external libraries or widgets, like social media sharing buttons or analytics scripts.
- **Conditional Script Loading**: Load scripts only when certain conditions are met, optimizing performance.
- **Feature Enhancement**: Enhance your application with additional features available via external scripts.
- **Asynchronous Script Loading**: Manage asynchronous loading of scripts without blocking the rendering of your application.

## Contributing

Contributions to enhance the `useScript` hook are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.
