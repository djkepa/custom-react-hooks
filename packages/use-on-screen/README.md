# useOnScreen Hook

The `useOnScreen` hook utilizes the Intersection Observer API to detect if an element is visible within the viewport. It's ideal for scenarios such as lazy loading images, triggering animations on scroll, and implementing features like infinite scroll.

## Features

- **Visibility Detection:** Determines if an element is currently visible in the viewport.
- **Memoization of Observer:** Efficient use of resources by memoizing the Intersection Observer instance.
- **One-time Observation:** Option to unobserve the element after it becomes visible for the first time.
- **Customizable Observer Options:** Supports threshold, root, and root margin options for the observer.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-on-screen
```

or

```bash
yarn add @custom-react-hooks/use-on-screen
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

Import and use the `useOnScreen` hook in your React components. You can also specify whether the element should be unobserved after first being visible by setting the `once` parameter.

```typescript
import useOnScreen from '@custom-react-hooks/use-on-screen';

const OnScreenTestComponent: React.FC = () => {
  const { ref, isIntersecting } = useOnScreen<HTMLDivElement>();

  return (
    <div>
      <div
        ref={ref}
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: isIntersecting ? 'green' : 'red',
        }}
      >
        Test Box
      </div>
      <p>{isIntersecting ? 'Visible in viewport' : 'Not visible in viewport'}</p>
    </div>
  );
};

export default OnScreenTestComponent;

```

In this example, the hook observes an element and updates its visibility status. When `once` is set to `true`, the element is unobserved after becoming visible for the first time.

## API Reference

- `options`: Optional `IntersectionObserverInit` object to customize the observer.
- `once`: Boolean flag indicating if the element should be unobserved after it becomes visible for the first time.
- `ref`: Ref object to be attached to the element you want to observe.
- `isIntersecting`: Boolean indicating whether the observed element is in the viewport.

## Contributing

Your contributions to enhance `useOnScreen` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality and performance.
