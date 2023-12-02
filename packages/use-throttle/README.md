# useThrottle Hook

The `useThrottle` hook in React is designed to limit the rate at which a function can be executed, making it ideal for handling events that fire rapidly, such as scrolling, resizing, or continuous keypresses.

## Features

- **Throttle Control:** Limits the frequency of function execution to improve performance and reduce resource usage.
- **Immediate Execution Option:** Executes the function immediately on the first call and then applies the throttle to subsequent calls.
- **State Tracking:** Monitors the throttling status to manage the function execution effectively.
- **SSR Compatibility:** Safe for server-side rendering as it does not depend on browser-specific APIs.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-throttle
```

or

```bash
yarn add @custom-react-hooks/use-throttle
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
import React, { useState } from 'react';
import useThrottle from '@custom-react-hooks/use-throttle';

const ThrottleTestComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const throttledValue = useThrottle(inputValue, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {throttledValue !== undefined && <div>Throttled Value: {throttledValue}</div>}
    </div>
  );
};

export default ThrottleTestComponent;
```

In this example, `useThrottle` is used to throttle the execution of a function handling the scroll event, thereby enhancing performance.

## API Reference

- `callback`: The function to be throttled.
- `limit`: The time limit (in milliseconds) that determines how often the `callback` can be executed.
- `immediate`: (optional) A boolean indicating whether to execute the function immediately on the first call.
- Returns a throttled version of the provided function.

## Contributing

Contributions to improve `useThrottle` are welcome. Feel free to submit issues or pull requests to enhance its functionality and usability.
