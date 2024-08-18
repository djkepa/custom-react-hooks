import { ReactNode } from 'react';
declare function usePortal(): {
    Portal: ({ children }: {
        children: ReactNode;
    }) => import("react").ReactPortal | null;
    openPortal: () => void;
    closePortal: () => void;
    isOpen: boolean;
};
export { usePortal };
//# sourceMappingURL=index.d.ts.map