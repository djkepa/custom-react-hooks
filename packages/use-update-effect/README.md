# useUpdateEffect Hook

The `useUpdateEffect` hook is an enhanced version of React's `useEffect` that is triggered only when dependencies update, skipping the effect on the component's initial mount. It's particularly useful for effects that need to run in response to specific changes after the initial rendering.

## Features

- **Skips Initial Render:** Executes the effect only on updates, not during the initial component mount.
- **Custom Cleanup Function:** Similar to `useEffect`, it allows for a cleanup function to be returned from the effect.
- **Compatible with SSR:** Designed to work seamlessly in server-side rendering environments.

## Installation

### Installing Specific Hook

```bash
npm install @custom-react-hooks/use-update-effect
```

or

```bash
yarn add @custom-react-hooks/use-update-effect
```

### Installing Complete Package

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useUpdateEffect` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useUpdateEffect } from '@custom-react-hooks/use-update-effect';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React, { useState } from 'react';
import { useUpdateEffect } from '@custom-react-hooks/all';

const UpdateEffectComponent = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useUpdateEffect(() => {
    setMessage(`Effect ran at count: ${count}`);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <p>Count: {count}</p>
      <p>{message}</p>
    </div>
  );
};

export default UpdateEffectComponent;
```

## API Reference

### Parameters
- `effect` (EffectCallback): The effect function to execute upon updates.
- `deps` (DependencyList): An array of dependencies that, when changed, trigger the effect.

## Use Cases

- **Conditional Execution:** Run effects based on specific conditions or changes.
- **Efficient Updates:** Optimize component behavior by limiting effects to only necessary renders.

## Contributing

Contributions to `useUpdateEffect` are welcome. Please submit issues or pull requests to enhance its functionality or address any concerns.
