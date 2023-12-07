# useMediaQuery Hook

The `useMediaQuery` hook is designed for responsive design in React applications. It enables components to adapt to different screen sizes or respond to media query changes.

## Features

- **Dynamic Media Queries:** Accepts any valid CSS media query string.
- **SSR Compatibility:** Safe for server-side rendering, as it checks for the availability of the `window` object.
- **Efficient and Optimized:** Only updates component state when media query match status changes.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-media-query
```

or

```bash
yarn add @custom-react-hooks/use-media-query
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

Import and use the `useMediaQuery` hook in your React components:

```typescript
import { useMediaQuery } from '@custom-react-hooks/all';

const MediaQueryComponent = () => {
  const isWide = useMediaQuery('(min-width: 600px)');

  return (
    <div>
      {isWide ? 'Wide viewport detected' : 'Narrow viewport detected'}
      <br />
      <span>
        <i>Resize to see the effect</i>
      </span>
    </div>
  );
};

export default MediaQueryComponent;
```

## API Reference

### Parameters
- `query`: A string representing the media query to evaluate.

## Use Cases 

- **Responsive Design**: Dynamically adjust the layout or functionality based on viewport size.
- **Dark Mode Toggle**: Switch between light and dark themes based on user's system preferences.
- **Adaptive Rendering**: Render different components or content based on media query matches.
- **Performance Optimization**: Load resources conditionally based on the media query (e.g., images for mobile).

## Contributing

Contributions to enhance the `useMediaQuery` hook are welcome. Feel free to submit issues or pull requests to the repository.

