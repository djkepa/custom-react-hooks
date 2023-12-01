import React, { useRef } from 'react';
import useImageLoad from '../hook/useImageLoad';

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
