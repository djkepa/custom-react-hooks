import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import ReactDOM from 'react-dom';

/**
 * `usePortal` is a hook for creating and managing React portals.
 * It simplifies the process of rendering children into a DOM node outside of the parent component's hierarchy.
 *
 * @return - An object containing a `Portal` component, and functions to open and close the portal.
 */

function usePortal() {
  const [isOpen, setIsOpen] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  if (!portalRef.current && typeof document !== 'undefined') {
    portalRef.current = document.createElement('div');
  }

  const openPortal = useCallback(() => setIsOpen(true), []);
  const closePortal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const portalElement = portalRef.current;
    if (portalElement) {
      document.body.appendChild(portalElement);
    }

    return () => {
      if (portalElement) {
        document.body.removeChild(portalElement);
      }
    };
  }, []);

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      return isOpen && portalRef.current
        ? ReactDOM.createPortal(children, portalRef.current)
        : null;
    },
    [isOpen],
  );

  return { Portal, openPortal, closePortal, isOpen };
}

export default usePortal;
