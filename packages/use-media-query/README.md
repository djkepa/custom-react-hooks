# useMediaQuery Hook

The `useMediaQuery` hook is designed for responsive design in React applications. It enables components to adapt to different screen sizes or respond to media query changes.

## Features

- **Dynamic Media Queries:** Accepts any valid CSS media query string.
- **SSR Compatibility:** Safe for server-side rendering, as it checks for the availability of the `window` object.
- **Efficient and Optimized:** Only updates component state when media query match status changes.

## Installation

```bash
npm install @custom-react-hooks/use-media-query
```

or

```bash
yarn add @custom-react-hooks/use-media-query
```

## Usage

Import and use the `useMediaQuery` hook in your React components:

```typescript
import useMediaQuery from '@custom-react-hooks/use-media-query';

const MediaQueryTestComponent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return <div>{isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}</div>;
};

export default MediaQueryTestComponent;

```

In this example, the component renders different content based on the screen width.

## API Reference

- `query`: A string representing the media query to evaluate.

## Contributing

Contributions to enhance the `useMediaQuery` hook are welcome. Feel free to submit issues or pull requests to the repository.

