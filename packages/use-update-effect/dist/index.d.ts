import { DependencyList } from 'react';
type UseUpdateEffectOptions = {
    skipInitialEffect?: boolean;
    delay?: number;
    condition?: () => boolean;
};
declare function useUpdateEffect(effect: () => void | (() => void), deps?: DependencyList, options?: UseUpdateEffectOptions): void;
export default useUpdateEffect;
//# sourceMappingURL=index.d.ts.map