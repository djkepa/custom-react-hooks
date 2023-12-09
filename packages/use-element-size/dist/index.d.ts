export interface Size {
    width: number;
    height: number;
}
declare function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
    (node: T | null) => void,
    Size
];
export default useElementSize;
//# sourceMappingURL=index.d.ts.map