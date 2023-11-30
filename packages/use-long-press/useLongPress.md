# `useLongPress` Hook

The `useLongPress` hook is designed for adding long press interactions to elements in React applications. It provides a flexible way to handle long press events with customizable thresholds and callbacks.

## Features

- **Customizable Long Press Duration:** Set a threshold for how long the press should last to trigger the event.
- **Multiple Event Callbacks:** Options for onStart, onFinish, and onCancel callbacks.
- **Support for Mouse and Touch:** Works with both mouse and touch events.
- **SSR Safe:** Can be safely used in server-side rendered applications.

## Installation

To use `useLongPress` in your project:

```bash
npm install @custom-react-hooks/use-long-press
```

or

```bash
yarn add @custom-react-hooks/use-long-press
```

## Usage

```typescript
import React from 'react';
import useLongPress from '@custom-react-hooks/use-long-press';

const MyComponent = () => {
  const handleLongPress = () => console.log('Long pressed!');
  const longPressEvents = useLongPress(handleLongPress, {
    threshold: 500, // Time in milliseconds
    onStart: () => console.log('Press started'),
    onFinish: () => console.log('Long press finished'),
    onCancel: () => console.log('Press cancelled')
  });

  return (
    <div {...longPressEvents}>
      Press and hold me
    </div>
  );
};
```

This example demonstrates how to use the `useLongPress` hook to add a long press interaction to a div element.

## API Reference

- `callback`: The function to execute when a long press event is successfully detected.
- `options`: Configuration object with the following optional properties:
  - `threshold`: Time in milliseconds the user must press and hold to trigger a long press event.
  - `onStart`: Function called when the user starts pressing.
  - `onFinish`: Function called when a long press event finishes successfully.
  - `onCancel`: Function called when a press event

 is cancelled.

The hook returns an object containing event handlers (`onMouseDown`, `onMouseUp`, `onMouseLeave`, `onTouchStart`, `onTouchEnd`) to be spread on the target element.

## Contributing

Your contributions to improve `useLongPress` are appreciated. Feel free to submit issues or pull requests to the repository.
