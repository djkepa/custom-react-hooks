import { useState, useEffect, useCallback, RefObject } from 'react';

export interface UseImageLoadOptions {
  thumbnailSrc: string;
  fullSrc: string;
  lazyLoad?: boolean;
}

export interface UseImageLoadState {
  src: string;
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
}

/**
 * `useImageLoad` is a hook for managing the loading of images, especially useful for progressive image loading and lazy loading.
 * It tracks the loading state, loaded state, and any errors for a given image source.
 *
 * @param options - The options object containing `thumbnailSrc`, `fullSrc`, and an optional `lazyLoad` flag.
 * @return - An object containing the current source of the image, loading state, loaded state, and error state.
 */

function useImageLoad(
  { thumbnailSrc, fullSrc, lazyLoad = false }: UseImageLoadOptions,
  imgRef: RefObject<HTMLImageElement>,
): UseImageLoadState {
  const [state, setState] = useState<UseImageLoadState>({
    src: lazyLoad ? '' : thumbnailSrc,
    isLoading: !lazyLoad,
    isLoaded: false,
    hasError: false,
  });

  const loadImage = useCallback(
    (imageSrc: string) => {
      if (!imgRef.current) return;

      setState((prevState) => ({ ...prevState, isLoading: true }));

      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        setState({
          src: imageSrc,
          isLoading: false,
          isLoaded: true,
          hasError: false,
        });
        if (imageSrc === thumbnailSrc && fullSrc) {
          loadImage(fullSrc);
        }
      };

      img.onerror = () => {
        setState((prevState) => ({ ...prevState, isLoading: false, hasError: true }));
      };
    },
    [thumbnailSrc, fullSrc, imgRef],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!lazyLoad) {
      loadImage(thumbnailSrc);
    } else if (imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage(thumbnailSrc);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(imgRef.current);

      return () => observer.disconnect();
    }
  }, [thumbnailSrc, lazyLoad, loadImage, imgRef]);

  return state;
}

export { useImageLoad };
