# useHover Hook

The `useHover` hook is a utility for detecting hover interactions in React components. It simplifies the process of tracking when a user's mouse pointer hovers over an element.

## Features

- **Hover State Management:** Tracks hover state of an element.
- **Ref-based Implementation:** Attaches event listeners using a React `ref`, ensuring compatibility with React's DOM handling.
- **Server-Side Rendering Compatibility:** Safe for use in SSR environments by avoiding direct DOM interactions unless the component is mounted in the browser.
- **Optimized Event Handling:** Uses `useCallback` to memoize event handlers for performance optimization.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-hover
```

or

```bash
yarn add @custom-react-hooks/use-hover
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
import useHover from '@custom-react-hooks/use-hover';

function HoverComponent() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-testid="hover-component"
    >
      <h1>Hover Component</h1>
      <p>{isHovered ? 'Hovered' : 'Not Hovered'}</p>
    </div>
  );
}

export default HoverComponent;

```

In this example, the `useHover` hook provides a way to determine if a particular div is being hovered.

## API Reference

- Returns an object with:
  - `ref`: A React `ref` that should be attached to the element you want to monitor for hover.
  - `isHovered`: A boolean state indicating whether the element is currently being hovered.

## Contributing

Contributions to enhance `useHover` are welcome. Feel free to submit issues or pull requests to the repository.