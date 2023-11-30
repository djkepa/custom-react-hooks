interface UseImageLoadOptions {
    thumbnailSrc: string;
    fullSrc: string;
    lazyLoad?: boolean;
}
interface UseImageLoadState {
    src: string;
    isLoading: boolean;
    isLoaded: boolean;
    hasError: boolean;
}
declare function useImageLoad({ thumbnailSrc, fullSrc, lazyLoad }: UseImageLoadOptions): UseImageLoadState;
export default useImageLoad;
//# sourceMappingURL=index.d.ts.map