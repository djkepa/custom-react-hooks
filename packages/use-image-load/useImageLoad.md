# `useImageLoad` Hook

`useImageLoad` is a custom React hook designed to enhance the user experience by efficiently loading images. It supports lazy loading to improve performance and provides detailed status updates during the image loading process.

## Features

- **Progressive Image Loading:** Displays a thumbnail first, followed by the full-resolution image once loaded.
- **Lazy Loading Support:** Defers the loading of off-screen images until they are needed.
- **Detailed Loading States:** Tracks the loading state, completion, and any errors that occur.
- **SSR Safe:** Checks for window object availability to ensure compatibility with server-side rendered applications.
- **Cleanup Mechanism:** Properly disconnects `IntersectionObserver` to prevent memory leaks.

## Installation

To add `useImageLoad` to your project:

```bash
npm install @custom-react-hooks/use-image-load
```

or

```bash
yarn add @custom-react-hooks/use-image-load
```

## Usage

```typescript
import useImageLoad from '@custom-react-hooks/use-image-load';

type ImageComponent = {
  options: {
    thumbnailSrc: string;
    fullSrc: string;
    lazyLoad?: boolean;
  };
};

export const ImageComponent = ({ options }: ImageComponent) => {
  const imgRef = useRef(null);
  const { src, isLoading, isLoaded, hasError } = useImageLoad(options, imgRef);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Error loading image</p>}
      <img
        ref={imgRef}
        src={src}
        alt=""
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      />
    </div>
  );
};

const GalleryComponent = () => {
  const images = [
    { thumbnailSrc: 'path/to/thumbnail1.jpg', fullSrc: 'path/to/fullimage1.jpg' },
    { thumbnailSrc: 'path/to/thumbnail2.jpg', fullSrc: 'path/to/fullimage2.jpg' },
  ];

  return (
    <div>
      {images.map((image, index) => (
        <ImageComponent
          key={index}
          options={image}
        />
      ))}
    </div>
  );
};

export default GalleryComponent;
```

In this example, `useImageLoad` is used to load an image with a thumbnail transitioning to the full-resolution image.

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

## Contributing

We welcome contributions to `useImageLoad`. For bugs, feature requests, or pull requests, please reach out through the project's repository.