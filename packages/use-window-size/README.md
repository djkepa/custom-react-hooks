# useWindowSize Hook

The `useWindowSize` hook is designed for responsive React applications, providing an easy way to track changes in window size. It includes debouncing for performance optimization and is compatible with server-side rendering.

## Features

- **Responsive Design Support:** Facilitates the development of responsive components.
- **Debounced Resize Events:** Limits the frequency of resize event handling to improve performance.
- **SSR Compatibility:** Safely handles scenarios where the `window` object is not available, such as server-side rendering.

## Installation

```bash
npm install @custom-react-hooks/use-window-size
```

or

```bash
yarn add @custom-react-hooks/use-window-size
```

## Usage

```typescript
import useWindowSize from '@custom-react-hooks/use-window-size';

const WindowSizeTestComponent: React.FC = () => {
  const { width, height } = useWindowSize(200); // Using a 200ms debounce delay

  return (
    <div>
      <p>Window Width: {width}</p>
      <p>Window Height: {height}</p>
    </div>
  );
};

export default WindowSizeTestComponent;
```

In this example, the `useWindowSize` hook is used to track the size of the browser window. The debounce delay is set to 200 milliseconds to optimize performance.

## API Reference

- `debounceDelay`: (optional) The delay in milliseconds for debouncing the resize event.
- Returns an object with:
  - `width`: The current width of the window.
  - `height`: The current height of the window.

## Contributing

Contributions to enhance `useWindowSize` are welcome. Feel free to submit issues or pull requests to the repository.
