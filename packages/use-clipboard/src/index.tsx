import { useState, useCallback, useEffect, useRef } from 'react';

export interface ClipboardState {
  success: boolean;
  error: string | null;
}

export interface UseClipboardOptions {
  /**
   * Whether to automatically read clipboard content on mount
   * @default true
   */
  readOnMount?: boolean;
  /**
   * Polling interval in milliseconds to check for clipboard changes
   * Set to 0 to disable polling
   * @default 0
   */
  pollingInterval?: number;
  /**
   * Callback fired when clipboard content changes
   */
  onClipboardChange?: (content: string) => void;
}

const isClipboardAvailable = () =>
  typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined';

/**
 * `useClipboard` provides functionality to copy to and paste from the clipboard.
 * It returns a state indicating the success or failure of clipboard operations,
 * clipboard content, and functions to perform copy and paste operations.
 *
 * @param options - Configuration options for clipboard behavior
 * @return - An object containing clipboard functions, state, and content information
 */

function useClipboard(options: UseClipboardOptions = {}) {
  const { readOnMount = true, pollingInterval = 0, onClipboardChange } = options;

  const [state, setState] = useState<ClipboardState>({ success: false, error: null });
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [isReading, setIsReading] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>('');

  // Function to read clipboard content
  const readClipboardContent = useCallback(async (): Promise<string> => {
    if (!isClipboardAvailable()) {
      return '';
    }

    try {
      setIsReading(true);
      const text = await navigator.clipboard.readText();
      const content = text || '';

      // Update content and trigger callback if changed
      if (content !== lastContentRef.current) {
        setClipboardContent(content);
        lastContentRef.current = content;
        onClipboardChange?.(content);
      }

      return content;
    } catch (error) {
      // Silently handle permission errors for reading
      return '';
    } finally {
      setIsReading(false);
    }
  }, [onClipboardChange]);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!isClipboardAvailable()) {
        setState({ success: false, error: 'Clipboard is not available' });
        return;
      }

      if (!text.trim()) {
        setState({ success: false, error: 'Cannot copy empty or whitespace text' });
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setState({ success: true, error: null });

        // Update local clipboard content after successful copy
        setClipboardContent(text);
        lastContentRef.current = text;
        onClipboardChange?.(text);
      } catch (error) {
        setState({ success: false, error: 'Failed to copy' });
      }
    },
    [onClipboardChange],
  );

  const pasteFromClipboard = useCallback(async (): Promise<string> => {
    if (!isClipboardAvailable()) {
      setState({ success: false, error: 'Clipboard is not available' });
      return '';
    }

    try {
      const text = await navigator.clipboard.readText();
      const content = text || '';

      setState({ success: true, error: null });

      // Update local clipboard content
      if (content !== lastContentRef.current) {
        setClipboardContent(content);
        lastContentRef.current = content;
        onClipboardChange?.(content);
      }

      return content;
    } catch (error) {
      setState({ success: false, error: 'Failed to paste' });
      return '';
    }
  }, [onClipboardChange]);

  // Effect to read clipboard on mount and set up polling
  useEffect(() => {
    if (readOnMount) {
      readClipboardContent();
    }

    // Set up polling if interval is specified
    if (pollingInterval > 0) {
      intervalRef.current = setInterval(() => {
        readClipboardContent();
      }, pollingInterval);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [readOnMount, pollingInterval, readClipboardContent]);

  // Function to manually refresh clipboard content
  const refreshClipboard = useCallback(() => {
    return readClipboardContent();
  }, [readClipboardContent]);

  // Function to clear clipboard (by copying empty string)
  const clearClipboard = useCallback(async () => {
    await copyToClipboard(' '); // Copy space to effectively clear
    setClipboardContent('');
    lastContentRef.current = '';
  }, [copyToClipboard]);

  return {
    copyToClipboard,
    pasteFromClipboard,
    state,
    clipboardContent,
    isReading,
    refreshClipboard,
    clearClipboard,
    hasContent: clipboardContent.trim().length > 0,
  };
}

export { useClipboard };
