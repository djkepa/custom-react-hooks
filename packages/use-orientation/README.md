# useOrientation Hook

The `useOrientation` hook is designed for both React web and mobile applications, providing a comprehensive solution to monitor and respond to orientation changes. This hook can track the orientation of the device or a specific HTML element, offering valuable data for responsive and dynamic UIs.

## Features

- **Dynamic Orientation Tracking:** Continuously updates with the device's current orientation angle and type, as well as the orientation of a specified element.
- **Versatile Usage:** Capable of tracking either the device's window or a specified element's orientation.
- **Detailed Information:** Provides orientation angle, type (landscape or portrait), aspect ratio, and orientation state of the referenced element.
- **Server-Side Rendering (SSR) Compatibility:** Handles environments without a `window` object, making it suitable for server-side rendering.

## Installation

### Install Specific Hook

```bash
npm install @custom-react-hooks/use-orientation
```

or

```bash
yarn add @custom-react-hooks/use-orientation
```

### Install Complete Hook Collection

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useOrientation` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useOrientation } from '@custom-react-hooks/use-orientation';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage Example

```typescript
import React, { useRef } from 'react';
import { useOrientation } from '@custom-react-hooks/all';

const OrientationComponent = () => {
  const elementRef1 = useRef(null);
  const elementRef2 = useRef(null);

  const elementOrientation1 = useOrientation(elementRef1, false);
  const elementOrientation2 = useOrientation(elementRef2, false);
  const windowOrientation = useOrientation(undefined, true);

  return (
    <div>
      <div ref={elementRef1}>
        <strong>Element 1: </strong> {elementOrientation1.elementOrientation}
        <br />
        <strong>Aspect Ratio:</strong>
        {elementOrientation1.aspectRatio ? elementOrientation1.aspectRatio.toFixed(2) : 0}
      </div>
      <div ref={elementRef2}>
        <strong>Element 2: </strong>
        {elementOrientation2.elementOrientation}
        <br />
        <strong>Aspect Ratio:</strong>
        {elementOrientation2.aspectRatio ? elementOrientation2.aspectRatio.toFixed(2) : 0}
      </div>
      <p>Window Orientation: {windowOrientation.type}</p>
    </div>
  );
};

export default OrientationComponent;
```

In this example, the `useOrientation` hook is used to monitor the orientation of both the device's window and a specific image element.

## API Reference

### Parameters
  - `elementRef` (Optional): A React `RefObject` to an HTML element.
  - `trackWindow` (Optional): Boolean to track the device's window orientation.

### Returns
  - `angle`: The current orientation angle of the device or element in degrees.
  - `type`: The orientation type (`'landscape-primary'`, `'landscape-secondary'`, `'portrait-primary'`, `'portrait-secondary'`).
  - `aspectRatio`: The aspect ratio of the referenced element (if provided).
  - `elementOrientation`: The orientation of the referenced element (`'landscape'` or `'portrait'`).

## Use Cases

- **Responsive Design**: Adjust layouts and UI elements based on device orientation.
- **Device Orientation Features**: Implement features that depend on device orientation, like games or 3D views.
- **Element-Specific Orientation**: Change the functionality or display of specific elements based on their orientation.
- **Aspect Ratio Detection**: Detect and respond to changes in the aspect ratio of an element.

## Contributing

We welcome contributions to improve `useOrientation`. Feel free to submit issues or pull requests to the repository for enhancements, bug fixes, or documentation improvements.