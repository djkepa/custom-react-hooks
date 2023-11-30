
# `useEventListener` Hook

The `useEventListener` hook is a custom React hook that simplifies the process of adding and removing event listeners in your React components. It handles the lifecycle of the event listener, ensuring it is cleaned up when the component unmounts or dependencies change.

## Installation

```bash
npm install @custom-react-hooks/use-event-listener
```

or

```bash
yarn add @custom-react-hooks/use-event-listener
```

## Usage

Here's an example of how to use the `useEventListener` hook in a component:

```typescript
import React, { useState, useRef } from 'react';
import useEventListener from '@custom-react-hooks/use-event-listener';

const MyComponent = () => {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    setKeyPressed(event.key);
  };

  // Using useEventListener to listen for keydown events on the div element
  useEventListener('keydown', handleKeyPress, divRef);

  return (
    <div ref={divRef}>
      <p>Press any key!</p>
      {keyPressed && <p>Last Key Pressed: {keyPressed}</p>}
    </div>
  );
};

export default MyComponent;
```

In this component, `useEventListener` is used to listen for `keydown` events on the `div` element, and the state is updated with the last key pressed.

## API Reference

### Parameters

- `eventName` (string | string[]): The name of the event to listen to, or an array of event names.
- `handler` (function): The function to be called when the event is triggered.
- `element` (RefObject, optional): The ref object pointing to the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the window object.
- `options` (boolean | AddEventListenerOptions, optional): Options to pass to the event listener.
- `condition` (boolean, optional): A boolean value to conditionally attach or detach the event listener.

## Notes

- Ensure the element referenced by `element` is mounted when the hook is called.
- The hook is versatile and can be used for various events and elements within a React application.

## Contributing

Your contributions to the development and enhancement of this hook are welcome! Feel free to submit issues or pull requests to the repository.
