import { useState, useEffect } from 'react';

type ScriptStatus = 'loading' | 'ready' | 'error' | 'unknown';

/**
 * `useScript` is a hook for dynamically loading external JavaScript scripts into a page.
 * It manages the loading status and error handling for each script.
 *
 * @param src - The source URL or an array of URLs for the scripts to load.
 * @param options - An object containing optional callbacks for load and error events, and a flag to remove the script on unmount.
 * @return - An array of objects, each representing the load state of a script.
 */

function useScript(src: string, removeOnUnmount: boolean = false): ScriptStatus {
  // Check if the script is already in the DOM
  const isScriptExisting = document.querySelector(`script[src="${src}"]`);
  console.log('isScriptExisting', isScriptExisting);
  const [status, setStatus] = useState<ScriptStatus>(isScriptExisting ? 'unknown' : 'loading');

  useEffect(() => {
    // If the script is already in the DOM, we won't load it again
    if (isScriptExisting) {
      return;
    }
    console.log('status', status);

    const script = document.createElement('script');
    script.src = src;

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('error');

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
