# `useElementSize` Hook

`useElementSize` is a React hook that enables dynamic tracking of an HTML element's dimensions. It updates the element's width and height in response to window resizing, element mounting/unmounting, and ref changes.

## Features

- **Dynamic Dimension Tracking:** Automatically tracks and updates the width and height of the specified element.
- **Responsive to Environmental Changes:** Responds to window resizing and ref changes, ensuring accurate size measurements.
- **SSR Safe:** Compatible with server-side rendering, avoiding errors in environments without a `window` object.
- **Optimized for Accuracy:** Uses `useLayoutEffect` for precise dimension measurements after DOM mutations.

## Installation

To integrate `useElementSize` into your project:

```bash
npm install @custom-react-hooks/use-element-size
```

or

```bash
yarn add @custom-react-hooks/use-element-size
```

## Usage

```typescript
import React, { useRef } from 'react';
import useElementSize from '@custom-react-hooks/use-element-size';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);

  return (
    <div ref={ref}>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};
```

In this example, `useElementSize` is used to measure and display the dimensions of a `div` element.

## API Reference

### Parameters

- `ref`: A React ref object attached to the element whose size you want to measure.

### Returns object

- `width`: width of the element
- `height`: height of the element.

## Contributing

Your contributions to improve `useElementSize` are welcome. Feel free to submit issues or pull requests to the repository.