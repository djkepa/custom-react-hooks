/// <reference types="react" />
declare function useOnScreen<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit, once?: boolean): {
    ref: React.RefObject<T>;
    isIntersecting: boolean;
};
export { useOnScreen };
//# sourceMappingURL=index.d.ts.map