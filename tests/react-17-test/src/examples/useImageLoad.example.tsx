import React from 'react';
import useImageLoad from '../src/hooks/useImageLoad';

const MyImageComponent: React.FC = () => {
  const { src, isLoading, hasError } = useImageLoad({
    thumbnailSrc: 'path/to/thumbnail.jpg',
    fullSrc: 'path/to/full-image.jpg',
    lazyLoad: true
  });

  return (
    <div>
      {hasError ? (
        <p>Error loading image.</p>
      ) : (
        <img src={src} alt="Loaded image" style={{ filter: isLoading ? 'blur(10px)' : 'none' }} />
      )}
    </div>
  );
};