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
import { useOnScreen } from '@custom-react-hooks/all';

const OnScreenComponent = () => {
  const { ref, isIntersecting } = useOnScreen({ threshold: 1 }, false);

  return (
    <div ref={ref}>
      {isIntersecting ? 'Element is visible!' : 'Scroll down...'}
    </div>
  );
};

export default OnScreenComponent;
```

## API Reference

### Parameters
- `options`: Optional `IntersectionObserverInit` object to customize the observer.
- `once`: Boolean flag indicating if the element should be unobserved after it becomes visible for the first time.

### Returns
- `ref`: Ref object to be attached to the element you want to observe.
- `isIntersecting`: Boolean indicating whether the observed element is in the viewport.

## Use Cases

- **Lazy Loading**: Load content (like images or videos) only when they enter the viewport.
- **Animation on Scroll**: Trigger animations or transitions when an element comes into view.
- **Infinite Scrolling**: Load more content as the user scrolls down a page.
- **Visibility Tracking**: Track which components are visible on the screen for analytics.

## Contributing

Your contributions to enhance `useOnScreen` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality and performance.
