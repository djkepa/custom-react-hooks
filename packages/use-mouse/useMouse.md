# `useMouse` Hook

The `useMouse` hook is designed for tracking the mouse position within a specified element in React applications. It's enhanced to provide additional features such as offsetting the mouse position and avoiding edges of the screen, which is useful for tooltips and other floating elements.

## Features

- **Dynamic Mouse Position Tracking:** Captures the mouse's x and y coordinates within the target element.
- **Offset and Edge Avoidance:** Supports offsetting the mouse position and adjusting it to avoid going off the screen edges.
- **TypeScript Support:** Strongly typed for better integration with TypeScript projects.
- **Flexible and Customizable:** Provides options for customizing offset values and tooltip dimensions.

## Installation

To integrate `useMouse` into your project:

```bash
npm install @custom-react-hooks/use-mouse
```

or

```bash
yarn add @custom-react-hooks/use-mouse
```

## Usage

```typescript
import React, { useRef } from 'react';
import useMouse from '@custom-react-hooks/use-mouse';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMouse(ref, { offsetX: 15, offsetY: 15, avoidEdges: true });

  return (
    <div ref={ref} style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        Tooltip or Pop-up content
      </div>
    </div>
  );
};
```

In this TypeScript example, the `useMouse` hook is used to track the mouse position within a `div` element and adjust the position of a tooltip or pop-up element accordingly.

## API Reference

- `ref`: A React `RefObject` pointing to the target element.
- `options`: Configuration options for mouse position adjustments.
  - `offsetX`: Horizontal offset from the mouse position.
  - `offsetY`: Vertical offset from the mouse position.
  - `avoidEdges`: Boolean indicating whether to adjust the position to avoid screen edges.
  - `tooltipWidth`: Optional width of the tooltip element.
  - `tooltipHeight`: Optional height of the tooltip element.
- Returns an object containing the adjusted mouse position (`x`, `y` coordinates).

## Contributing

Contributions to enhance `useMouse` are welcome. Please feel free to submit issues or pull requests to the repository.
