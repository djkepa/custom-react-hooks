
# useEventListener Hook

The `useEventListener` hook is a custom React hook that simplifies the process of adding and removing event listeners in your React components. It handles the lifecycle of the event listener, ensuring it is cleaned up when the component unmounts or dependencies change.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-event-listener
```

or

```bash
yarn add @custom-react-hooks/use-event-listener
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

The `useEventListener` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useEventListener } from '@custom-react-hooks/use-event-listener';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Features

- **Effortless Event Handling:** Streamlines the process of adding and removing event listeners in React components, making it easier to handle user interactions and other events.

- **Automatic Cleanup:** Automatically cleans up event listeners when the component unmounts or dependencies change, preventing memory leaks and ensuring optimal performance.

- **Support for Multiple Events:** Capable of attaching listeners to multiple events simultaneously, making it versatile for handling various types of interactions within a single component.

- **Flexible Element Targeting:** Offers the ability to attach event listeners to specific DOM elements using a ref, or defaults to the global `window` object if no element is specified.

- **Conditional Event Listening:** Includes an optional condition parameter to dynamically attach or detach event listeners based on certain conditions, enhancing the hook's adaptability in different scenarios.

- **Custom Event Handling Function:** Allows for the specification of a custom handler function for each event, providing full control over the response to the triggered events.

- **Option Customization:** Supports both boolean and object options for event listeners, aligning with the standard `addEventListener` API and providing flexibility for more complex event handling requirements.

- **Ref Management:** Uses a ref to store the current handler function, ensuring that the most recent handler is used and preventing stale closures.

- **Event Listener Abstraction:** Abstracts the complexities of correctly attaching and detaching event listeners in React's lifecycle, allowing developers to focus on the core logic of their components.

- **Versatility in Use:** Suitable for a wide range of use cases, from handling user inputs like keyboard and mouse events to responding to browser and device events like resizing and orientation changes.


## Usage

Here's an example of how to use the `useEventListener` hook in a component:

```typescript
import { useEventListener } from '@custom-react-hooks/all';

const EventListenerComponent = () => {
  const [count, setCount] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCount((prevCount) => prevCount + 1);
    } else if (event.key === 'ArrowLeft') {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEventListener('keydown', handleKeyDown);

  const getColor = () => {
    if (count < 0) return '#ff5868';
    if (count > 0) return '#00989a';
    return '#f9f871';
  };

  return (
    <div>
      <h2>Press the Arrow Left/Right keys to change the counter.</h2>
      <p>(If is not working, click me!)</p>
      <p>
        Counter: <span style={{ color: getColor() }}>{count}</span>
      </p>
    </div>
  );
};

export default EventListenerComponent;
```

In this component, `useEventListener` is used to listen for `keydown` events on the `div` element, and the state is updated with the last key pressed.

## API Reference

### Parameters

- `eventName` (string | string[]): The name of the event to listen to, or an array of event names.
- `handler` (function): The function to be called when the event is triggered.
- `element` (RefObject, optional): The ref object pointing to the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the window object.
- `options` (boolean | AddEventListenerOptions, optional): Options to pass to the event listener.
- `condition` (boolean, optional): A boolean value to conditionally attach or detach the event listener.

## Use Cases
Let's explore the use cases for each of the four additional hooks you've provided:

### 1. `useEventListener`

- **Custom Interactions**: Capture custom user interactions like keyboard shortcuts or mouse movements.
- **Tracking User Behavior**: Monitor events for analytics, like clicks or page visibility changes.
- **Interactive Components**: Enhance components with interactive features, like drag-and-drop or hover effects.
- **Window or Document Events**: Listen to window resize, scroll, or focus events to adjust UI accordingly.
- **Device Capabilities**: Detect device capabilities, such as orientation change or network status updates.

## Notes

- Ensure the element referenced by `element` is mounted when the hook is called.
- The hook is versatile and can be used for various events and elements within a React application.

## Contributing

Your contributions to the development and enhancement of this hook are welcome! Feel free to submit issues or pull requests to the repository.
