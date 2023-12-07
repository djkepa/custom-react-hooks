import { useState, useEffect } from 'react';

export type ScriptStatus = 'loading' | 'ready' | 'error' | 'unknown';

/**
 * `useScript` is a hook for dynamically loading external JavaScript scripts into a page.
 * It manages the loading status and error handling for each script.
 *
 * @param src - The source URL or an array of URLs for the scripts to load.
 * @param options - An object containing optional callbacks for load and error events, and a flag to remove the script on unmount.
 * @return - An array of objects, each representing the load state of a script.
 */

const cachedScriptStatuses: Record<string, ScriptStatus> = {};

function useScript(src: string, removeOnUnmount: boolean = false): ScriptStatus {
  const isScriptExisting = document.querySelector(`script[src="${src}"]`);
  const cachedStatus = cachedScriptStatuses[src];

  const [status, setStatus] = useState<ScriptStatus>(
    cachedStatus || (isScriptExisting ? 'ready' : 'loading'),
  );

  useEffect(() => {
    if (typeof window === 'undefined' || isScriptExisting) {
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const handleLoad = () => {
      setStatus('ready');
      cachedScriptStatuses[src] = 'ready';
    };
    const handleError = () => {
      setStatus('error');
      cachedScriptStatuses[src] = 'error';
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);

      if (removeOnUnmount) {
        document.body.removeChild(script);
      }
    };
  }, [src, removeOnUnmount]);

  return status;
}

export default useScript;
