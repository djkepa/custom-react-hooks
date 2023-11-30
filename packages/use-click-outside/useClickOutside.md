
# `useClickOutside` Hook

The `useClickOutside` hook is designed to detect and handle clicks outside of a specified element or set of elements. This is particularly useful for closing modal windows, dropdowns, and other components when a user interacts outside of them.

## Installation

```bash
npm install @react-custom-hooks/use-click-outside
```

or

```bash
yarn add @react-custom-hooks/use-click-outside
```

## Usage

Here's an example of how to use the `useClickOutside` hook in a modal component:

```typescript
import React, { useRef } from 'react';
import useClickOutside from '@react-custom-hooks/use-click-outside';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null); // Ref for the modal content
  useClickOutside(modalRef, onClose); // Setup the hook to call `onClose` when a click outside is detected

  return (
    <div ref={modalRef}>
      {/* Your modal content goes here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

In the above example, clicking outside the `<div>` containing the modal content will trigger the `onClose` function.

## API Reference

### Parameters

- `refs` (RefObject | RefObject[]): A ref or an array of refs to the element(s) you want to detect outside clicks on.
- `callback` (function): A callback function that will be called when a click outside the detected elements occurs.
- `events` (string[], optional): An array of event names to listen for clicks. Defaults to `['mousedown', 'touchstart']`.
- `enableDetection` (boolean, optional): A boolean to enable or disable click detection. Defaults to `true`.
- `ignoreRefs` (RefObject[], optional): An array of ref objects for elements that, when clicked, should not trigger the callback.


## Notes

- Ensure the elements referenced by `refs` are mounted when the hook is called.
- The hook must be called within a functional component body or another custom hook.

## Contributing

Feel free to contribute to the development of this hook by submitting issues or pull requests to the repository.