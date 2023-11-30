import { RefObject } from 'react';
type ValidEvent = MouseEvent | TouchEvent;
declare function useClickOutside<T extends HTMLElement>(refs: RefObject<T>[] | RefObject<T>, callback: (event: ValidEvent) => void, events?: string[], enableDetection?: boolean, ignoreRefs?: RefObject<HTMLElement>[]): void;
export default useClickOutside;
//# sourceMappingURL=index.d.ts.map