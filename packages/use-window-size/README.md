# useWindowSize Hook

The `useWindowSize` hook is designed for responsive React applications, providing an easy way to track changes in window size. It includes debouncing for performance optimization and is compatible with server-side rendering.

## Features

- **Responsive Design Support:** Facilitates the development of responsive components.
- **Debounced Resize Events:** Limits the frequency of resize event handling to improve performance.
- **SSR Compatibility:** Safely handles scenarios where the `window` object is not available, such as server-side rendering.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-window-size
```

or

```bash
yarn add @custom-react-hooks/use-window-size
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

The `useWindowSize` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useWindowSize } from '@custom-react-hooks/use-window-size';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import { useWindowSize } from '@custom-react-hooks/all';

const WindowSizeComponent = () => {
  const { width, height } = useWindowSize(100);

  return (
    <div>
      <h2>Current Window Size:</h2>
      <div>
        <p>
          Width: <span>{width}</span>
        </p>
        <p>
          Height: <span>{height}</span>
        </p>
      </div>
    </div>
  );
};
export default WindowSizeComponent;
```

In this example, the `useWindowSize` hook is used to track the size of the browser window. The debounce delay is set to 200 milliseconds to optimize performance.

## API Reference

### Parameters
- `debounceDelay`: (optional) The delay in milliseconds for debouncing the resize event.

### Returns
  - `width`: The current width of the window.
  - `height`: The current height of the window.


## Use Cases

- **Responsive Components**: Create components that respond to changes in window size.
- **Layout Adjustments**: Adjust layout dynamically based on the window size, enhancing responsiveness.
- **Visibility Control**: Show or hide elements based on the available viewport size.
- **Size-Dependent Functionality**: Implement functionality that depends on the size of the window, like different navigation styles for mobile and desktop.

## Contributing

Contributions to enhance `useWindowSize` are welcome. Feel free to submit issues or pull requests to the repository.
