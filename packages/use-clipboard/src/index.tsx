import { useState, useCallback } from 'react';

interface ClipboardState {
  success: boolean;
  error: string | null;
}

const isClipboardAvailable =
  typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined';

/**
 * `useClipboard` provides functionality to copy to and paste from the clipboard.
 * It returns a state indicating the success or failure of clipboard operations, and functions to perform copy and paste.
 *
 * @return - An object containing `copyToClipboard` and `pasteFromClipboard` functions, and `state` with success and error information.
 */

function useClipboard() {
  const [state, setState] = useState<ClipboardState>({ success: false, error: null });

  const copyToClipboard = useCallback(async (text: string) => {
    if (!isClipboardAvailable) {
      setState({ success: false, error: 'Clipboard is not available' });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setState({ success: true, error: null });
    } catch (error) {
      setState({ success: false, error: 'Failed to copy' });
    }
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    if (!isClipboardAvailable) {
      setState({ success: false, error: 'Clipboard is not available' });
      return;
    }

    try {
      const text = await navigator.clipboard.readText();
      setState({ success: true, error: null });
      return text;
    } catch (error) {
      setState({ success: false, error: 'Failed to paste' });
      return '';
    }
  }, []);

  return { copyToClipboard, pasteFromClipboard, state };
}

export default useClipboard;
