import { useEffect } from 'react';

/**
 * `useDocumentTitle` sets the document title (the title shown in the browser tab). The title reverts to its original value when the component unmounts if `revertOnUnmount` is true.
 *
 * @param title - The string to set as the document title.
 * @param revertOnUnmount - Boolean indicating whether to revert the title to its original value on component unmount. Defaults to true.
 */

function useDocumentTitle(title: string, revertOnUnmount: boolean = true) {
  const defaultTitle = typeof document !== 'undefined' ? document.title : '';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }

    return () => {
      if (revertOnUnmount && typeof document !== 'undefined') {
        document.title = defaultTitle;
      }
    };
  }, [title, revertOnUnmount, defaultTitle]);
}

export { useDocumentTitle };
