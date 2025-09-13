"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWorker = void 0;
var react_1 = require("react");
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
function useWorker(workerScript, options) {
    if (options === void 0) { options = {}; }
    var onMessage = options.onMessage, onError = options.onError, timeout = options.timeout;
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var workerRef = (0, react_1.useRef)(null);
    var timeoutRef = (0, react_1.useRef)(null);
    var createWorker = (0, react_1.useCallback)(function () {
        if (typeof window === 'undefined' || !window.Worker) {
            setError('Web Workers are not supported in this environment');
            return null;
        }
        try {
            var worker = void 0;
            if (typeof workerScript === 'string') {
                // Create worker from URL
                worker = new Worker(workerScript);
            }
            else {
                // Create worker from function
                var workerCode = "\n          self.onmessage = function(e) {\n            const fn = ".concat(workerScript.toString(), ";\n            try {\n              const result = fn(e.data);\n              if (result instanceof Promise) {\n                result\n                  .then(data => self.postMessage({ success: true, data }))\n                  .catch(error => self.postMessage({ success: false, error: error.message }));\n              } else {\n                self.postMessage({ success: true, data: result });\n              }\n            } catch (error) {\n              self.postMessage({ success: false, error: error.message });\n            }\n          };\n        ");
                var blob = new Blob([workerCode], { type: 'application/javascript' });
                var workerUrl_1 = URL.createObjectURL(blob);
                worker = new Worker(workerUrl_1);
                // Clean up the blob URL when worker is terminated
                worker.addEventListener('error', function () { return URL.revokeObjectURL(workerUrl_1); });
                worker.addEventListener('message', function () { return URL.revokeObjectURL(workerUrl_1); }, { once: true });
            }
            worker.onmessage = function (event) {
                setIsLoading(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                var messageData = event.data;
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
            worker.onerror = function (errorEvent) {
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
            var errorMessage = err instanceof Error ? err.message : 'Failed to create worker';
            setError(errorMessage);
            return null;
        }
    }, [workerScript, onMessage, onError]);
    (0, react_1.useEffect)(function () {
        workerRef.current = createWorker();
        return function () {
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
    var postMessage = (0, react_1.useCallback)(function (message, transfer) {
        if (!workerRef.current) {
            setError('Worker is not available');
            return;
        }
        setIsLoading(true);
        setError(null);
        // Set timeout if specified
        if (timeout) {
            timeoutRef.current = setTimeout(function () {
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
            var errorMessage = err instanceof Error ? err.message : 'Failed to post message to worker';
            setError(errorMessage);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, [timeout]);
    var terminate = (0, react_1.useCallback)(function () {
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
        postMessage: postMessage,
        terminate: terminate,
        data: data,
        error: error,
        isLoading: isLoading,
    };
}
exports.useWorker = useWorker;
