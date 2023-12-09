import { RefObject } from 'react';
export interface MouseOptions {
    offsetX: number;
    offsetY: number;
    avoidEdges: boolean;
    tooltipWidth?: number;
    tooltipHeight?: number;
    relativeToWindow?: boolean;
}
export interface UseMouseState {
    x: number;
    y: number;
    position: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
}
declare function useMouse<T extends HTMLElement>(ref: RefObject<T>, options?: MouseOptions): UseMouseState;
export default useMouse;
//# sourceMappingURL=index.d.ts.map