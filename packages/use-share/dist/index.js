import { useState, useCallback } from 'react';
/**
 * `useShare` is a hook for Web Share API with fallback support.
 * It provides native sharing capabilities on supported devices and browsers,
 * with automatic fallback to clipboard copying when native sharing is not available.
 *
 * @param options - Configuration options for sharing behavior
 * @return - An object containing:
 *   - `share`: Function to trigger sharing
 *   - `isSupported`: Boolean indicating if Web Share API is supported
 *   - `isSharing`: Boolean indicating if sharing is in progress
 *   - `error`: Error message if sharing fails
 */
function useShare(options = {}) {
    const { onSuccess, onError, fallbackCopy = true } = options;
    const [isSharing, setIsSharing] = useState(false);
    const [error, setError] = useState(null);
    const isSupported = typeof window !== 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator !== null &&
        'share' in navigator &&
        typeof navigator.share === 'function';
    const copyToClipboard = async (text) => {
        if (typeof navigator !== 'undefined' &&
            navigator !== null &&
            navigator.clipboard &&
            navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        }
        else if (typeof document !== 'undefined') {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            }
            finally {
                document.body.removeChild(textArea);
            }
        }
        else {
            throw new Error('Clipboard API not available');
        }
    };
    const share = useCallback(async (data) => {
        if (typeof window === 'undefined') {
            throw new Error('useShare can only be used in browser environment');
        }
        setIsSharing(true);
        setError(null);
        try {
            if (isSupported) {
                // Use native Web Share API
                const shareData = {};
                if (data.title)
                    shareData.title = data.title;
                if (data.text)
                    shareData.text = data.text;
                if (data.url)
                    shareData.url = data.url;
                if (data.files && data.files.length > 0) {
                    // Check if files sharing is supported
                    if (typeof navigator !== 'undefined' &&
                        navigator !== null &&
                        navigator.canShare &&
                        navigator.canShare({ files: data.files })) {
                        shareData.files = data.files;
                    }
                }
                if (typeof navigator !== 'undefined' && navigator !== null && navigator.share) {
                    await navigator.share(shareData);
                }
                else {
                    throw new Error('Web Share API not available');
                }
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            }
            else if (fallbackCopy) {
                // Fallback to copying to clipboard
                let textToCopy = '';
                if (data.title)
                    textToCopy += data.title + '\n';
                if (data.text)
                    textToCopy += data.text + '\n';
                if (data.url)
                    textToCopy += data.url;
                if (textToCopy.trim()) {
                    await copyToClipboard(textToCopy.trim());
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }
                else {
                    throw new Error('No content to share');
                }
            }
            else {
                throw new Error('Web Share API not supported and fallback is disabled');
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Sharing failed';
            setError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(err instanceof Error ? err : new Error(errorMessage));
            throw err;
        }
        finally {
            setIsSharing(false);
        }
    }, [isSupported, fallbackCopy, onSuccess, onError]);
    return {
        share,
        isSupported,
        isSharing,
        error,
    };
}
export { useShare };
//# sourceMappingURL=index.js.map