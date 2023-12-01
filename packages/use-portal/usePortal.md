# `usePortal` Hook

The `usePortal` hook facilitates the creation and management of portal components in React applications. Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This hook is particularly useful for rendering modals, dropdowns, and tooltips.

## Features

- **Dynamic Portal Creation:** Automatically creates and manages a DOM element for the portal.
- **Simple State Management:** Provides functions to open and close the portal, along with a state variable to track its visibility.
- **Easy Integration:** Can be integrated seamlessly with existing React components.

## Installation

To use the `usePortal` hook, include it in your project:

```bash
npm install @custom-react-hooks/use-portal
```

or

```bash
yarn add @custom-react-hooks/use-portal
```

## Usage

Import the `usePortal` hook and use it in your React components to manage portals:

```typescript
import usePortal from '@custom-react-hooks/use-portal';

const PortalTestComponent: React.FC = () => {
  const { Portal, openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      <button onClick={closePortal}>Close Portal</button>
      <Portal>
        <div id="portal-content">This is portal content</div>
      </Portal>
      {isOpen && <p>Portal is open</p>}
    </div>
  );
};

export default PortalTestComponent;
```

In this example, the `usePortal` hook is used to render a modal-like component. The portal can be opened and closed using the provided functions.

## API Reference

- `Portal`: A component for rendering the portal's children. It only renders its children when the portal is open.
- `openPortal`: A function to open the portal.
- `closePortal`: A function to close the portal.
- `isOpen`: A state variable indicating whether the portal is currently open.

## Contributing

Contributions to improve `usePortal` are welcome. If you have suggestions or enhancements, feel free to submit issues or pull requests to the repository.
