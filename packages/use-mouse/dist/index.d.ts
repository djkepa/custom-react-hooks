/// <reference types="react" />
export interface MouseOptions {
    offsetX: number;
    offsetY: number;
    avoidEdges: boolean;
    tooltipWidth?: number;
    tooltipHeight?: number;
}
declare function useMouse<T extends HTMLElement>(ref: React.RefObject<T>, options?: MouseOptions): {
    x: number;
    y: number;
};
export default useMouse;
//# sourceMappingURL=index.d.ts.map