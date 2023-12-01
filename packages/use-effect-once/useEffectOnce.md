# `useEffectOnce` Hook

`useEffectOnce` is a custom hook in React designed to mimic the behavior of `componentDidMount` and `componentWillUnmount` lifecycle methods in class components. It's a modified version of `useEffect` that runs only once when the component mounts.

## Features

- **Single Execution:** The hook executes the provided effect function once upon the component's initial render.
- **Cleanup Capability:** It supports an optional cleanup function, returned from the effect, which is called when the component unmounts.
- **SSR Compatibility:** As an extension of `useEffect`, it is naturally compatible with server-side rendering environments.

## Installation

To include `useEffectOnce` in your project:

```bash
npm install @custom-react-hooks/use-effect-once
```

or

```bash
yarn add @custom-react-hooks/use-effect-once
```

Replace `@custom-react-hooks/use-effect-once` with the actual name of your package.

## Usage

```typescript
import React from 'react';
import useEffectOnce from '@react-custom-hooks/useEffectOnce';

const EffectOnceComponent: React.FC = () => {
  useEffectOnce(() => {
    console.log('This effect runs only once after the component mounts.');

    return () => {
      console.log('This cleanup runs when the component unmounts.');
    };
  });

  return <div>My Component</div>;
};

export default EffectOnceComponent;
```

In this example, `useEffectOnce` is used to perform actions at the mounting and unmounting phases of `MyComponent`.

## API Reference

- `effect`: A function that will be executed once when the component mounts. This function can optionally return a cleanup function, which will be executed when the component unmounts.

## Contributing

Contributions to enhance `useEffectOnce` are always welcome. Feel free to submit issues or pull requests to the repository for further improvements.