# useLongPress Hook

The `useLongPress` hook is designed for adding long press interactions to elements in React applications. It provides a flexible way to handle long press events with customizable thresholds and callbacks.

## Features

- **Customizable Long Press Duration:** Set a threshold for how long the press should last to trigger the event.
- **Multiple Event Callbacks:** Options for onStart, onFinish, and onCancel callbacks.
- **Support for Mouse and Touch:** Works with both mouse and touch events.
- **SSR Safe:** Can be safely used in server-side rendered applications.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-long-press
```

or

```bash
yarn add @custom-react-hooks/use-long-press
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

The `useLongPress` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useLongPress } from '@custom-react-hooks/use-long-press';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React, { useState } from 'react';
import { useLongPress } from '@custom-react-hooks/all';

const LongPressTestComponent = () => {
  const [status, setStatus] = useState('Ready');

  const longPressCallback = () => {
    setStatus('Finished');
  };

  const longPressEvents = useLongPress(longPressCallback, {
    threshold: 500,
    onStart: () => setStatus('Started'),
    onFinish: () => setStatus('Finished'),
    onCancel: () => setStatus('Cancelled'),
  });

  return (
    <div>
      <button {...longPressEvents}>
        Press and Hold
      </button>
      <p>
        Status: <span>{status}</span>
      </p>
    </div>
  );
};

export default LongPressTestComponent;
```

This example demonstrates how to use the `useLongPress` hook to add a long press interaction to a button element.

## API Reference

### Parameters

- `callback`: The function to execute when a long press event is successfully detected.
- `options`: Configuration object with the following optional properties:
  - `threshold`: Time in milliseconds the user must press and hold to trigger a long press event.
  - `onStart`: Function called when the user starts pressing.
  - `onFinish`: Function called when a long press event finishes successfully.
  - `onCancel`: Function called when a press event is cancelled.

### Returns

- `onMouseDown`: Event handler for mouse down event to start detecting long press.
- `onMouseUp`: Event handler for mouse up event to cancel long press detection.
- `onMouseLeave`: Event handler for mouse leave event to cancel long press detection.
- `onTouchStart`: Event handler for touch start event to start detecting long press.
- `onTouchEnd`: Event handler for touch end event to cancel long press detection.

## Use Cases

- **Mobile Interaction**: Implement long press interactions common in mobile interfaces.
- **Context Menus**: Display custom context menus on long press.
- **Drag-and-Drop Initiation**: Start a drag-and-drop process after a long press.
- **Gesture Recognition**: Recognize specific user gestures for advanced UI interactions.

## Contributing

Your contributions to improve `useLongPress` are appreciated. Feel free to submit issues or pull requests to the repository.
