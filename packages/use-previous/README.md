# usePrevious Hook

The `usePrevious` hook is a simple yet powerful utility that stores the previous value of a state or prop. It's particularly useful for comparing current and previous values in effects, implementing animations based on value changes, or tracking state transitions.

## Features

- **Simple Value Tracking:** Stores the previous value of any data type.
- **Type Safe:** Full TypeScript support with generic typing.
- **Memory Efficient:** Uses a single ref to store the previous value.
- **Universal Compatibility:** Works with any data type (primitives, objects, arrays).
- **SSR Safe:** No side effects during server-side rendering.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-previous
```

or

```bash
yarn add @custom-react-hooks/use-previous
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

### Basic Usage

```typescript
import React, { useState } from 'react';
import { usePrevious } from '@custom-react-hooks/use-previous';

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>Previous count: {previousCount ?? 'None'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
```

### Comparing Values in Effects

```typescript
import React, { useState, useEffect } from 'react';
import { usePrevious } from '@custom-react-hooks/use-previous';

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);
  const previousUserId = usePrevious(userId);

  useEffect(() => {
    // Only fetch if userId actually changed
    if (previousUserId !== userId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId, previousUserId]);

  return <div>{user ? user.name : 'Loading...'}</div>;
};
```

### Animation Based on Value Changes

```typescript
import React, { useState } from 'react';
import { usePrevious } from '@custom-react-hooks/use-previous';

const AnimatedValue = () => {
  const [value, setValue] = useState(0);
  const previousValue = usePrevious(value);
  
  const isIncreasing = previousValue !== undefined && value > previousValue;
  const isDecreasing = previousValue !== undefined && value < previousValue;

  return (
    <div>
      <div 
        className={`value ${isIncreasing ? 'increasing' : ''} ${isDecreasing ? 'decreasing' : ''}`}
      >
        {value}
      </div>
      <button onClick={() => setValue(v => v + 1)}>+</button>
      <button onClick={() => setValue(v => v - 1)}>-</button>
    </div>
  );
};
```

### Working with Objects

```typescript
import React, { useState } from 'react';
import { usePrevious } from '@custom-react-hooks/use-previous';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const previousFormData = usePrevious(formData);

  const hasChanged = previousFormData && 
    JSON.stringify(previousFormData) !== JSON.stringify(formData);

  return (
    <div>
      <input
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      {hasChanged && <p>Form has been modified</p>}
    </div>
  );
};
```

## API Reference

### Parameters

- `value` (T): The current value to track. Can be of any type.

### Returns

- `T | undefined`: The previous value. Returns `undefined` on the first render.

## Use Cases

- **Value Comparison**: Compare current and previous values in effects or render logic.
- **Animation Triggers**: Trigger animations based on value changes.
- **Optimization**: Prevent unnecessary API calls or expensive operations when values haven't changed.
- **State Transitions**: Track state transitions for debugging or analytics.
- **Form Validation**: Implement validation that depends on previous form states.
- **Undo Functionality**: Implement simple undo functionality by storing previous states.

## TypeScript Support

The hook is fully typed and will infer the type from the value you pass:

```typescript
const previousString = usePrevious('hello'); // string | undefined
const previousNumber = usePrevious(42); // number | undefined
const previousObject = usePrevious({ key: 'value' }); // { key: string } | undefined
```

## Performance Considerations

- The hook uses a single `useRef` to store the previous value, making it very lightweight.
- It only updates the ref after the component has rendered, ensuring the previous value is always from the last render cycle.
- No unnecessary re-renders are triggered by this hook.

## Contributing

Contributions to enhance `usePrevious` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

