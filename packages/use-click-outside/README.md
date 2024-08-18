
# useClickOutside Hook

The `useClickOutside` hook is designed to detect and handle clicks outside of a specified element or set of elements. This is particularly useful for closing modal windows, dropdowns, and other components when a user interacts outside of them.

## Features

- **Element Focus Management:** Detects clicks outside of the specified element(s), which is essential for managing the focus and closing modal windows, dropdowns, and other components.
- **Customizable Event Listening:** Listens for specific events like `mousedown` and `touchstart` to determine outside clicks, with the option to customize the events.
- **Dynamic Detection Control:** Provides the ability to enable or disable the click outside detection dynamically, which offers flexible integration with various UI state requirements.
- **Ref Exclusion:** Allows for the exclusion of certain elements (by refs) from triggering the outside click logic, which is useful when certain elements within the component should not close it.
- **Multiple Element Support:** Can handle multiple elements as an array of refs, which is great for complex components that may consist of disjointed elements.
- **Simple Integration:** Easy to integrate into existing components with minimal changes required to the existing structure.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-click-outside
```

or

```bash
yarn add @custom-react-hooks/use-click-outside
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

The `useClickOutside` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useClickOutside } from '@custom-react-hooks/use-click-outside';
```

This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.

## Usage

Here's an example of how to use the `useClickOutside` hook in a modal component:

```typescript
import React, { useState, useRef } from 'react';
import { useClickOutside } from '@custom-react-hooks/all';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    <div ref={modalRef}>
      <p>Modal content goes here</p>
      <button onClick={onClose}>Close Modal</button>
    </div>
  );
};

const ClickOutsideComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default ClickOutsideComponent;
```

In the above example, clicking outside the `<div>` containing the modal content will trigger the `onClose` function.

## API Reference

### Parameters

- `refs` (RefObject | RefObject[]): A ref or an array of refs to the element(s) you want to detect outside clicks on.
- `callback` (function): A callback function that will be called when a click outside the detected elements occurs.
- `events` (string[], optional): An array of event names to listen for clicks. Defaults to `['mousedown', 'touchstart']`.
- `enableDetection` (boolean, optional): A boolean to enable or disable click detection. Defaults to `true`.
- `ignoreRefs` (RefObject[], optional): An array of ref objects for elements that, when clicked, should not trigger the callback.

## Use Cases

- **Closing Modals or Popups**: Automatically close a modal or popup when a user clicks outside of it.
- **Dropdown Menus**: Collapse dropdown menus when the user interacts with other parts of the application.
- **Context Menus**: Hide context menus or custom right-click menus when clicking elsewhere on the page.
- **Form Validation or Submission**: Trigger form validation or submission when clicking outside of a form area.
- **Toggling UI Elements**: Toggle the visibility of UI elements like sidebars or tooltips when clicking outside of them.

## Notes

- Ensure the elements referenced by `refs` are mounted when the hook is called.
- The hook must be called within a functional component body or another custom hook.

## Contributing

Feel free to contribute to the development of this hook by submitting issues or pull requests to the repository.