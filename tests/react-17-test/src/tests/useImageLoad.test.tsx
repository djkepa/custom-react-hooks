import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useImageLoad from '../../../../packages/use-image-load/src/index';

function TestComponent({ thumbnailSrc, fullSrc, lazyLoad }: any) {
  const imgRef = useRef(null);
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
}

describe('useImageLoad Hook', () => {
  beforeEach(() => {
    // Mock Image constructor
    const mockImage = class {
      onload: () => void = jest.fn();
      onerror: () => void = jest.fn();
      src: string = '';

      constructor() {
        setTimeout(() => {
          // Check if src is 'invalid.jpg' to simulate an error
          if (this.src === 'invalid.jpg') {
            this.onerror();
          } else {
            this.onload();
          }
        }, 100);
      }
    };

    global.Image = mockImage as any;

    // Mock IntersectionObserver
    window.IntersectionObserver = jest.fn().mockImplementation((callback, options) => {
      return {
        observe: jest.fn().mockImplementation((element) => {
          callback([{ isIntersecting: true, target: element }], this);
        }),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  it('shows loading state initially', () => {
    render(
      <TestComponent
        thumbnailSrc="thumbnail.jpg"
        fullSrc="full.jpg"
        lazyLoad={false}
      />,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('loads the full image after the thumbnail', async () => {
    render(
      <TestComponent
        thumbnailSrc="thumbnail.jpg"
        fullSrc="full.jpg"
        lazyLoad={false}
      />,
    );
    await waitFor(() =>
      expect(screen.getByTestId('loaded-image')).toHaveAttribute('src', 'full.jpg'),
    );
  });

  it('shows error state on image load failure', async () => {
    render(
      <TestComponent
        thumbnailSrc="invalid.jpg"
        fullSrc="full.jpg"
        lazyLoad={false}
      />,
    );
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
  });

  it('loads image on intersection', async () => {
    render(
      <TestComponent
        thumbnailSrc="thumbnail.jpg"
        fullSrc="full.jpg"
        lazyLoad={true}
      />,
    );
    await waitFor(() =>
      expect(screen.getByTestId('loaded-image')).toHaveAttribute('src', 'full.jpg'),
    );
  });
});
