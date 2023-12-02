# `useClipboard` Hook

`useClipboard` is a React hook that provides an interface for copying to and pasting from the user's clipboard. It uses the modern Clipboard API for improved performance and flexibility.

## Features

- **Copy and Paste**: Offers methods to both copy text to and paste text from the clipboard.
- **Asynchronous API**: Uses promise-based Clipboard API methods for non-blocking operations.
- **Status and Error Reporting**: Returns the status of clipboard operations and any error messages.
- **Server-Side Rendering Compatibility**: Checks for the availability of the Clipboard API, ensuring the hook does not break in a server-side rendering context.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-clipboard
```

or

```bash
yarn add @custom-react-hooks/use-clipboard
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

```typescript
import React, { useState } from 'react';
import useClipboard from 'custom-react-hooks/useClipboard';

function ClipboardComponent() {
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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      <button onClick={handlePaste}>Paste from Clipboard</button>
      {state.success && <p>Action successful!</p>}
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
}
export default ClipboardComponent;
```

This example demonstrates how to use the `useClipboard` hook to copy text to and paste text from the clipboard using buttons.

## API Reference

## Parameters

- `copyToClipboard(text: string)`: An asynchronous function to copy the provided text to the clipboard.
- `pasteFromClipboard()`: An asynchronous function to paste the text from the clipboard.

## Returns

  - `success`: A boolean indicating if the last operation was successful.
  - `error`: A string containing an error message if the operation failed.

## Contributing

We encourage contributions to enhance `useClipboard`. For bugs, feature requests, or pull requests, please reach out through the project's repository.