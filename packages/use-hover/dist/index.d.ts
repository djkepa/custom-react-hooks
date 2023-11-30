/// <reference types="react" />
declare function useHover<T extends HTMLElement>(): {
    ref: import("react").MutableRefObject<T | null>;
    isHovered: boolean;
};
export default useHover;
//# sourceMappingURL=index.d.ts.map