# `useLockBodyScroll` Hook

`useLockBodyScroll` is a React hook for controlling the scroll behavior of the body element in web applications. It's particularly useful for scenarios like opening modals or overlays where background scroll needs to be disabled.

## Features

- **Conditional Scroll Lock:** Allows you to conditionally enable or disable the body scroll.
- **Style Preservation:** Preserves the original body overflow style and restores it upon unmounting.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments by checking for the `document` object.
- **Synchronous Execution:** Uses `useLayoutEffect` for synchronous updates to the DOM.

## Installation

To integrate `useLockBodyScroll` into your project:

```bash
npm install @custom-react-hooks/use-lock-body-scroll
```

or

```bash
yarn add @custom-react-hooks/use-lock-body-scroll
```


## Usage

```typescript
import useLockBodyScroll from '@custom-react-hooks/use-lock-body-scroll';

const Modal = ({ isOpen }) => {
  useLockBodyScroll(isOpen);

  return isOpen ? <div className="modal">Modal Content</div> : null;
};
```

In this example, the hook is used to lock the body scroll when the modal is open.

## API Reference

- `lock`: A boolean indicating whether to lock (`true`) or unlock (`false`) the body scroll.

## Contributing

Your contributions to improve `useLockBodyScroll` are welcome. Feel free to submit issues or pull requests to the repository.