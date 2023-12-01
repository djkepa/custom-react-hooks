import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import useImageLoad, { UseImageLoadOptions } from '../src/index';

const TestComponent: React.FC<UseImageLoadOptions> = ({ thumbnailSrc, fullSrc, lazyLoad }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { src, isLoading, isLoaded, hasError } = useImageLoad(
    { thumbnailSrc, fullSrc, lazyLoad },
    imgRef,
  );

  return (
    <div>
      {isLoading && <div data-testid="loading">Loading...</div>}
      {hasError && <div data-testid="error">Error</div>}
      {isLoaded && (
        <img
          ref={imgRef}
          data-testid="loaded-image"
          src={src}
          alt="Loaded"
        />
      )}
    </div>
  );
};

describe('useImageLoad Hook', () => {
  beforeEach(() => {
    jest.resetModules();

    window.Image = jest.fn().mockImplementation(() => ({
      onload: jest.fn(),
      onerror: jest.fn(),
      src: '',
    })) as unknown as typeof Image;
  });

  it('starts in a loading state', () => {
    const { getByTestId } = render(
      <TestComponent
        thumbnailSrc="thumbnail.jpg"
        fullSrc="full.jpg"
        lazyLoad={false}
      />,
    );
    expect(getByTestId('loading')).toBeInTheDocument();
  });
});
