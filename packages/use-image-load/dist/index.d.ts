import { RefObject } from 'react';
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
declare function useImageLoad({ thumbnailSrc, fullSrc, lazyLoad }: UseImageLoadOptions, imgRef: RefObject<HTMLImageElement>): UseImageLoadState;
export { useImageLoad };
//# sourceMappingURL=index.d.ts.map