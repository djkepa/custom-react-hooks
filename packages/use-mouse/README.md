# useMouse Hook

The `useMouse` hook is designed for tracking the mouse position within a specified element in React applications. It's enhanced to provide additional features such as offsetting the mouse position and avoiding edges of the screen, which is useful for tooltips and other floating elements.

## Features

- **Dynamic Mouse Position Tracking:** Captures the mouse's x and y coordinates within the target element.
- **Offset and Edge Avoidance:** Supports offsetting the mouse position and adjusting it to avoid going off the screen edges.
- **TypeScript Support:** Strongly typed for better integration with TypeScript projects.
- **Flexible and Customizable:** Provides options for customizing offset values and tooltip dimensions.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-mouse
```

or

```bash
yarn add @custom-react-hooks/use-mouse
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useMouse` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useMouse } from '@custom-react-hooks/use-mouse';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React, { useRef } from 'react';
import { useMouse } from '@custom-react-hooks/all';

const Tooltip = ({ mousePosition, isVisible }) => {
  const { window, document } = useFrame();
  const tooltipRef = useRef(null);

  const positionStyles = useMemo(() => {
    const style = { display: isVisible ? 'block' : 'none' };

    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let newX = mousePosition.x;
      let newY = mousePosition.y;

      if (newX + tooltipRect.width > window.innerWidth) {
        newX -= tooltipRect.width;
      }

      if (newY + tooltipRect.height > window.innerHeight) {
        newY -= tooltipRect.height;
      }

      style.left = `${newX}px`;
      style.top = `${newY}px`;
    }

    return style;
  }, [mousePosition, isVisible]);

  return (
    <div
      ref={tooltipRef}
      style={positionStyles}
    >
      X: <span>{mousePosition.x}</span>,
      Y: <span>{mousePosition.y}</span>
    </div>
  );
};

const MouseComponent = () => {
  const boxRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipOptions = {
    offsetX: 15,
    offsetY: 15,
    avoidEdges: true,
    tooltipWidth: 120,
    tooltipHeight: 50,
  };
  const mousePosition = useMouse(boxRef, tooltipOptions);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  return (
    <div className="center">
      <div
        ref={boxRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover over this box
      </div>
      <Tooltip
        mousePosition={mousePosition}
        isVisible={isTooltipVisible}
      />
    </div>
  );
};

export default MouseComponent;
```

In this TypeScript example, the `useMouse` hook is used to track the mouse position within a `div` element and adjust the position of a tooltip or pop-up element accordingly.

## API Reference

### Parameters

- `ref`: A React `RefObject` pointing to the target element that the mouse position will be relative to.
- `options`: Configuration object for the mouse position adjustments with the following properties:
  - `offsetX`: The horizontal offset added to the mouse position.
  - `offsetY`: The vertical offset added to the mouse position.
  - `avoidEdges`: Boolean that indicates whether the tooltip position should be adjusted to avoid the edges of the screen or the target element.
  - `tooltipWidth`: (Optional) The width of the tooltip element, used in calculating edge avoidance.
  - `tooltipHeight`: (Optional) The height of the tooltip element, used in calculating edge avoidance.
  - `relativeToWindow`: (Optional) Boolean that indicates whether the mouse position should be calculated relative to the window instead of the target element. If not provided, it defaults to `false`.

### Returns

- An object containing the adjusted mouse position and additional information:
  - `x`: The calculated x-coordinate for the tooltip position.
  - `y`: The calculated y-coordinate for the tooltip position.
  - `position`: A string indicating the tooltip's position relative to the cursor. Possible values are `'bottomRight'`, `'bottomLeft'`, `'topRight'`, and `'topLeft'`.

## Use Cases

- **Custom Tooltips**: Display tooltips that follow the mouse cursor.
- **Interactive Canvas**: Implement interactive features on a canvas element based on mouse position.
- **UI Enhancements**: Enhance UI elements with mouse-over effects or interactions.
- **Mouse Tracking**: Track mouse movements for user behavior analysis or interactive games.

## Contributing

Contributions to enhance `useMouse` are welcome. Please feel free to submit issues or pull requests to the repository.
