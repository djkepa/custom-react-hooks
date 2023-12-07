# usePortal Hook

The `usePortal` hook facilitates the creation and management of portal components in React applications. Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This hook is particularly useful for rendering modals, dropdowns, and tooltips.

## Features

- **Dynamic Portal Creation:** Automatically creates and manages a DOM element for the portal.
- **Simple State Management:** Provides functions to open and close the portal, along with a state variable to track its visibility.
- **Easy Integration:** Can be integrated seamlessly with existing React components.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-portal
```

or

```bash
yarn add @custom-react-hooks/use-portal
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

Import the `usePortal` hook and use it in your React components to manage portals:

```typescript
import { usePortal } from '@custom-react-hooks/all';

const PortalComponent = () => {
  const { openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      <button onClick={closePortal}>
        Close Portal
      </button>
      {isOpen && <div className="modal">This is portal content</div>}
    </div>
  );
};

export default PortalComponent;
```

In this example, the `usePortal` hook is used to render a modal-like component. The portal can be opened and closed using the provided functions.

## API Reference

### Returns
- `Portal`: A component for rendering the portal's children. It only renders its children when the portal is open.
- `openPortal`: A function to open the portal.
- `closePortal`: A function to close the portal.
- `isOpen`: A state variable indicating whether the portal is currently open.

## Use Cases

- **Modals and Dialogs**: Render modals, popups, or dialogs in a DOM node outside of the parent component's hierarchy.
- **Tooltips and Popovers**: Create tooltips or popovers that need to break out of their parent's z-index or overflow context.
- **Layered UI Elements**: Manage layered UI elements like notifications or full-screen overlays.
- **Dynamic Content Rendering**: Render content dynamically in different parts of the document for layout or styling purposes.

## Contributing

Contributions to improve `usePortal` are welcome. If you have suggestions or enhancements, feel free to submit issues or pull requests to the repository.
