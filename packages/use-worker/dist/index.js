import { useState, useEffect, useRef, useCallback } from 'react';
/**
 * `useWorker` is a hook for managing Web Workers in React applications.
 * It provides an easy way to offload heavy computations to background threads,
 * with automatic cleanup and message handling.
 *
 * @param workerScript - The worker script URL or function
 * @param options - Configuration options for the worker
 * @return - An object containing:
 *   - `postMessage`: Function to send messages to the worker
 *   - `terminate`: Function to terminate the worker
 *   - `data`: Latest data received from the worker
 *   - `error`: Error message if worker fails
 *   - `isLoading`: Boolean indicating if worker is processing
 */
function useWorker(workerScript, options = {}) {
    const { onMessage, onError, timeout } = options;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const workerRef = useRef(null);
    const timeoutRef = useRef(null);
    const createWorker = useCallback(() => {
        if (typeof window === 'undefined' || !window.Worker) {
            setError('Web Workers are not supported in this environment');
            return null;
        }
        try {
            let worker;
            if (typeof workerScript === 'string') {
                // Create worker from URL
                worker = new Worker(workerScript);
            }
            else {
                // Create worker from function
                const workerCode = `
          self.onmessage = function(e) {
            const fn = ${workerScript.toString()};
            try {
              const result = fn(e.data);
              if (result instanceof Promise) {
                result
                  .then(data => self.postMessage({ success: true, data }))
                  .catch(error => self.postMessage({ success: false, error: error.message }));
              } else {
                self.postMessage({ success: true, data: result });
              }
            } catch (error) {
              self.postMessage({ success: false, error: error.message });
            }
          };
        `;
                const blob = new Blob([workerCode], { type: 'application/javascript' });
                const workerUrl = URL.createObjectURL(blob);
                worker = new Worker(workerUrl);
                // Clean up the blob URL when worker is terminated
                worker.addEventListener('error', () => URL.revokeObjectURL(workerUrl));
                worker.addEventListener('message', () => URL.revokeObjectURL(workerUrl), { once: true });
            }
            worker.onmessage = (event) => {
                setIsLoading(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                const messageData = event.data;
                // Handle function-based worker responses
                if (typeof workerScript === 'function' && messageData && typeof messageData === 'object') {
                    if (messageData.success === false) {
                        setError(messageData.error || 'Worker execution failed');
                        setData(null);
                        return;
                    }
                    else if (messageData.success === true) {
                        setData(messageData.data);
                        setError(null);
                        onMessage === null || onMessage === void 0 ? void 0 : onMessage(messageData.data);
                        return;
                    }
                }
                // Handle regular worker responses
                setData(messageData);
                setError(null);
                onMessage === null || onMessage === void 0 ? void 0 : onMessage(messageData);
            };
            worker.onerror = (errorEvent) => {
                setIsLoading(false);
                setError(errorEvent.message || 'Worker error occurred');
                onError === null || onError === void 0 ? void 0 : onError(errorEvent);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
            };
            return worker;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create worker';
            setError(errorMessage);
            return null;
        }
    }, [workerScript, onMessage, onError]);
    useEffect(() => {
        workerRef.current = createWorker();
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [createWorker]);
    const postMessage = useCallback((message, transfer) => {
        if (!workerRef.current) {
            setError('Worker is not available');
            return;
        }
        setIsLoading(true);
        setError(null);
        // Set timeout if specified
        if (timeout) {
            timeoutRef.current = setTimeout(() => {
                setIsLoading(false);
                setError('Worker operation timed out');
            }, timeout);
        }
        try {
            if (transfer) {
                workerRef.current.postMessage(message, transfer);
            }
            else {
                workerRef.current.postMessage(message);
            }
        }
        catch (err) {
            setIsLoading(false);
            const errorMessage = err instanceof Error ? err.message : 'Failed to post message to worker';
            setError(errorMessage);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, [timeout]);
    const terminate = useCallback(() => {
        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsLoading(false);
        setData(null);
        setError(null);
    }, []);
    return {
        postMessage,
        terminate,
        data,
        error,
        isLoading,
    };
}
export { useWorker };
//# sourceMappingURL=index.js.map