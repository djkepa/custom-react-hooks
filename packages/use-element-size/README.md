# `useElementSize` Hook

`useElementSize` is a React hook that enables dynamic tracking of an HTML element's dimensions. It updates the element's width and height in response to window resizing, element mounting/unmounting, and ref changes.

## Features

- **Dynamic Dimension Tracking:** Automatically tracks and updates the width and height of the specified element.
- **Responsive to Environmental Changes:** Responds to window resizing and ref changes, ensuring accurate size measurements.
- **SSR Safe:** Compatible with server-side rendering, avoiding errors in environments without a `window` object.
- **Optimized for Accuracy:** Uses `useLayoutEffect` for precise dimension measurements after DOM mutations.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-element-size
```

or

```bash
yarn add @custom-react-hooks/use-element-size
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
import React, { useRef, useState } from 'react';
import { useElementSize } from '@custom-react-hooks/all';

const ElementSizeComponent = () => {
  const [setRef, size] = useElementSize();

  return (
    <div className="element-size">
      <div
        ref={setRef}
        className="resize"
      >
        <p>Drag from the bottom-right corner to resize.</p>
      </div>
      <br />
      <div>Current Size:</div>
      <div className="btns">
        <p>
          Width: <span>{size.width}px</span>
        </p>
        <p>
          Height: <span>{size.height}px</span>
        </p>
      </div>
    </div>
  );
};

export default ElementSizeComponent;
```

In this example, `useElementSize` is used to measure and display the dimensions of a `div` element.

## API Reference

### Parameters

- `ref`: A React ref object attached to the element whose size you want to measure.

### Returns object

- `width`: width of the element
- `height`: height of the element.

## Use cases

- **Responsive Components**: Adjust component behavior or style based on its size.
- **Layout Calculations**: Calculate layout for items like grids or masonry layouts that depend on element sizes.
- **Size-dependent Rendering**: Render different content or components based on available size.
- **Animations and Transitions**: Trigger animations or transitions when an element's size changes.
- **Optimizing Canvas or SVG**: Adjust dimensions for canvas or SVG elements based on their container size.


## Contributing

Your contributions to improve `useElementSize` are welcome. Feel free to submit issues or pull requests to the repository.