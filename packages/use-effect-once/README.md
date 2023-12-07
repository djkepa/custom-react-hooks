# useEffectOnce Hook

`useEffectOnce` is a custom hook in React designed to mimic the behavior of `componentDidMount` and `componentWillUnmount` lifecycle methods in class components. It's a modified version of `useEffect` that runs only once when the component mounts.

## Features

- **Single Execution:** The hook executes the provided effect function once upon the component's initial render.
- **Cleanup Capability:** It supports an optional cleanup function, returned from the effect, which is called when the component unmounts.
- **SSR Compatibility:** As an extension of `useEffect`, it is naturally compatible with server-side rendering environments.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-effect-once
```

or

```bash
yarn add @custom-react-hooks/use-effect-once
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
import React from 'react';
import { useEffectOnce } from '@custom-react-hooks/all';

const EffectOnceComponent = () => {
  const [fibonacciSequence, setFibonacciSequence] = useState([]);

  const calculateFibonacci = (n) => {
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence.slice(0, n);
  };

  useEffectOnce(() => {
    const sequence = calculateFibonacci(5);
    setFibonacciSequence(sequence);
  });

  return (
    <div>
      <p>First {5} numbers in the Fibonacci sequence:</p>
      <ul>
        {fibonacciSequence.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default EffectOnceComponent;
```

In this example, `useEffectOnce` is used to perform actions at the mounting and unmounting phases of `MyComponent`.

## API Reference

### Parameters

- `effect`: A function that will be executed once when the component mounts. This function can optionally return a cleanup function, which will be executed when the component unmounts.

## Use Cases

- **Initial Setup**: Perform setup operations like fetching initial data or setting up listeners.
- **One-time Calculations**: Compute values needed only once during the component's lifecycle.
- **Single API Calls**: Make a single API call when a component is rendered for the first time.
- **Non-Recurring Subscriptions**: Subscribe to a service or event listener that should only be initialized once.

## Contributing

Contributions to enhance `useEffectOnce` are always welcome. Feel free to submit issues or pull requests to the repository for further improvements.