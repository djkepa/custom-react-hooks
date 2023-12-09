import { RefObject } from 'react';
export interface OrientationState {
    angle: number;
    type: 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary' | undefined;
    aspectRatio?: number;
    elementOrientation?: 'landscape' | 'portrait';
}
declare function useOrientation<T extends HTMLElement>(elementRef?: RefObject<T>, trackWindow?: boolean): OrientationState;
export default useOrientation;
//# sourceMappingURL=index.d.ts.map