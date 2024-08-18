# useImageLoad Hook

`useImageLoad` is a custom React hook designed to enhance the user experience by efficiently loading images. It supports lazy loading to improve performance and provides detailed status updates during the image loading process.

## Features

- **Progressive Image Loading:** Displays a thumbnail first, followed by the full-resolution image once loaded.
- **Lazy Loading Support:** Defers the loading of off-screen images until they are needed.
- **Detailed Loading States:** Tracks the loading state, completion, and any errors that occur.
- **SSR Safe:** Checks for window object availability to ensure compatibility with server-side rendered applications.
- **Cleanup Mechanism:** Properly disconnects `IntersectionObserver` to prevent memory leaks.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-image-load
```

or

```bash
yarn add @custom-react-hooks/use-image-load
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

The `useImageLoad` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useImageLoad } from '@custom-react-hooks/use-image-load';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import { useImageLoad } from '@custom-react-hooks/all';

const ImageLoadComponent = ({ thumbnailSrc, fullSrc }) => {
  const thumbnailOnlyRef = useRef(null);
  const lazyLoadRef = useRef(null);

  const thumbnailOnlyState = useImageLoad({ thumbnailSrc, fullSrc: '' }, thumbnailOnlyRef);
  const lazyLoadState = useImageLoad({ thumbnailSrc, fullSrc, lazyLoad: true }, lazyLoadRef);

  return (
    <div>
      <div>
        <h3>Thumbnail Only</h3>
        {thumbnailOnlyState.isLoading && <p>Loading thumbnail...</p>}
        {thumbnailOnlyState.hasError && <p>Error loading thumbnail.</p>}
        <img
          ref={thumbnailOnlyRef}
          src={thumbnailOnlyState.src}
          alt="Thumbnail Only"
        />
      </div>
      <p>Scroll down to trigger lazy load</p>

      <div>
        <h3>Lazy Loading Image</h3>
        {lazyLoadState.isLoading && <p>Loading image...</p>}
        {lazyLoadState.hasError && <p>Error loading image.</p>}
        <img
          ref={lazyLoadRef}
          src={lazyLoadState.src}
          alt="Lazy Loading"
        />
      </div>
    </div>
  );
};

export default ImageLoadComponent;
```

## API Reference

### Parameters
- `thumbnailSrc`: The source path of the thumbnail image.
- `fullSrc`: The source path of the full-resolution image.
- `lazyLoad`: (optional) A boolean to enable lazy loading.

### Returns
  - `src`: The current source of the image.
  - `isLoading`: Indicates if the image is currently loading.
  - `isLoaded`: Indicates if the image has fully loaded.
  - `hasError`: Indicates if there was an error during loading.

## Use Cases

- **Progressive Image Loading**: Show a low-quality image or placeholder while the full image loads.
- **Lazy Loading**: Load images only when they are in or near the viewport, improving page load times.
- **Error Handling**: Handle image load errors gracefully with fallbacks or error messages.
- **Loading State Indicators**: Display a loading indicator while images are being fetched.

## Contributing

We welcome contributions to `useImageLoad`. For bugs, feature requests, or pull requests, please reach out through the project's repository.