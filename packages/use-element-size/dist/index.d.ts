/// <reference types="react" />
export interface Size {
    width: number | undefined;
    height: number | undefined;
}
declare function useElementSize<T extends HTMLElement>(ref: React.RefObject<T>): Size;
export default useElementSize;
//# sourceMappingURL=index.d.ts.map