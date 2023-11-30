# `useUpdateEffect` Hook

The `useUpdateEffect` hook is an enhanced version of React's `useEffect` that is triggered only when dependencies update, skipping the effect on the component's initial mount. This hook is particularly useful for effects that you only want to run in response to specific changes.

## Features

- **Update-Only Execution:** Runs the effect only when dependencies change, not on the initial render.
- **Custom Cleanup Support:** Allows for a cleanup function to be returned from the effect, similar to `useEffect`.
- **Server-Side Rendering Compatibility:** Fully compatible with SSR environments.
- **Conditional Execution:** Introduces an optional `condition` function. The effect only runs if this function returns `true`.
- **Delay Execution:** Adds an optional `delay` parameter to delay the execution of the effect.
- **Skip Initial Effect Option:** Allows the user to choose whether to skip the effect on the initial mount. This is set to `true` by default for backward compatibility.

## Installation

To use `useUpdateEffect` in your project:

```bash
npm install @custom-react-hooks/use-update-effect
```

or

```bash
yarn add @custom-react-hooks/use-update-effect
```

## Usage

```typescript
import useUpdateEffect from '@custom-react-hooks/use-update-effect';

const MyComponent = ({ value }) => {
  useUpdateEffect(() => {
    // Effect logic here
    console.log('Value updated:', value);

    return () => {
      // Optional cleanup logic
    };
  }, [value]);

  return <div>Current Value: {value}</div>;
};
```

In this example, the `useUpdateEffect` hook is utilized to perform an action when the `value` prop changes, excluding the initial mount.

## API Reference

- `effect`: The effect function to run when dependencies update.
- `deps`: An array of dependencies that trigger the effect when they change.
- `delay`: This parameter allows you to specify a delay (in milliseconds) before the effect function is executed. When the dependencies of the effect change, the effect won't run immediately; instead, it waits for the specified delay time before executing. This is useful for debouncing or throttling the effect execution.
- `condition`: This is a function that returns a boolean. The effect will only run if this function returns true. This allows conditional execution of the effect based on custom logic, providing greater control over when the effect should run.
- `skipInitialEffect`: When set to true, this parameter ensures that the effect does not run on the initial render of the component. It's useful when you want the effect to run only in response to updates after the initial mount, not on the initial mount itself.

## Contributing

Your contributions to enhance `useUpdateEffect` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality.
