import React, { useState } from 'react';
import useClipboard from '../src/hooks/useClipboard';

function MyComponent() {
  const [text, setText] = useState('');
  const { copyToClipboard, pasteFromClipboard, state } = useClipboard();

  const handleCopy = async () => {
    await copyToClipboard(text);
    // Handle feedback with state.success and state.error
  };

 const handlePaste = async () => {
  const pastedText = await pasteFromClipboard();
  if (state.success && pastedText !== undefined) {
    setText(pastedText);
  }
  // Handle errors with state.error
};

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      <button onClick={handlePaste}>Paste from Clipboard</button>
      {state.success && <p>Action successful!</p>}
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
}