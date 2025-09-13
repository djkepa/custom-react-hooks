# `useClipboard` Hook

`useClipboard` is a React hook that provides a comprehensive interface for clipboard operations. It offers advanced features like automatic clipboard content reading, change detection, and polling capabilities, making it perfect for building sophisticated clipboard-aware applications.

## Features

- **Copy and Paste**: Offers methods to both copy text to and paste text from the clipboard.
- **Clipboard Content Reading**: Automatically reads and tracks clipboard content with real-time updates.
- **Content Change Detection**: Detects when clipboard content changes and provides callbacks.
- **Polling Support**: Optional polling to continuously monitor clipboard changes.
- **Smart State Management**: Tracks clipboard content, loading states, and operation status.
- **Asynchronous API**: Uses promise-based Clipboard API methods for non-blocking operations.
- **Status and Error Reporting**: Returns the status of clipboard operations and any error messages.
- **Server-Side Rendering Compatibility**: Checks for the availability of the Clipboard API, ensuring the hook does not break in a server-side rendering context.
- **Memory Efficient**: Automatic cleanup of intervals and proper resource management.

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

## Importing the Hook

The `useClipboard` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useClipboard } from '@custom-react-hooks/use-clipboard';
```

This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.

## Usage

### Basic Usage

```typescript
import React, { useState } from 'react';
import { useClipboard } from '@custom-react-hooks/use-clipboard';

const BasicClipboardComponent = () => {
  const { 
    copyToClipboard, 
    pasteFromClipboard, 
    state, 
    clipboardContent, 
    hasContent,
    isReading 
  } = useClipboard();
  
  const [textToCopy, setTextToCopy] = useState('');

  const handleCopy = async () => {
    await copyToClipboard(textToCopy);
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    console.log('Pasted:', text);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={textToCopy}
          onChange={(e) => setTextToCopy(e.target.value)}
          placeholder="Text to copy"
        />
        <button onClick={handleCopy} disabled={!textToCopy.trim()}>
          Copy to Clipboard
        </button>
      </div>

      <div>
        <button 
          onClick={handlePaste} 
          disabled={!hasContent || isReading}
        >
          {isReading ? 'Reading...' : `Paste${hasContent ? ` (${clipboardContent.substring(0, 20)}...)` : ' (Empty)'}`}
        </button>
      </div>

      <div>
        <p>Clipboard Content: {clipboardContent || 'Empty'}</p>
        <p>Has Content: {hasContent ? 'Yes' : 'No'}</p>
      </div>

      {state.success && <p style={{ color: 'green' }}>Operation successful!</p>}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
    </div>
  );
};

export default BasicClipboardComponent;
```

### Advanced Usage with Options

```typescript
import React, { useState } from 'react';
import { useClipboard } from '@custom-react-hooks/use-clipboard';

const AdvancedClipboardComponent = () => {
  const [changeLog, setChangeLog] = useState<string[]>([]);

  const { 
    copyToClipboard, 
    clipboardContent, 
    hasContent,
    refreshClipboard,
    clearClipboard,
    state 
  } = useClipboard({
    readOnMount: true,
    pollingInterval: 2000, // Poll every 2 seconds
    onClipboardChange: (content) => {
      setChangeLog(prev => [...prev, `Changed to: "${content}" at ${new Date().toLocaleTimeString()}`]);
    }
  });

  return (
    <div>
      <h3>Advanced Clipboard Monitor</h3>
      
      <div>
        <p>Current Clipboard: {clipboardContent || 'Empty'}</p>
        <p>Has Content: {hasContent ? 'Yes' : 'No'}</p>
      </div>

      <div>
        <button onClick={() => copyToClipboard('Hello World!')}>
          Copy "Hello World!"
        </button>
        <button onClick={() => copyToClipboard(new Date().toISOString())}>
          Copy Current Time
        </button>
        <button onClick={refreshClipboard}>
          Refresh Clipboard
        </button>
        <button onClick={clearClipboard} disabled={!hasContent}>
          Clear Clipboard
        </button>
      </div>

      <div>
        <h4>Change Log:</h4>
        <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
          {changeLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
    </div>
  );
};

export default AdvancedClipboardComponent;
```

### Smart Button Example (Addressing the GitHub Comment)

```typescript
import React from 'react';
import { useClipboard } from '@custom-react-hooks/use-clipboard';

const SmartPasteButton = () => {
  const { pasteFromClipboard, clipboardContent, hasContent, isReading } = useClipboard();

  const handlePaste = async () => {
    if (hasContent) {
      const content = await pasteFromClipboard();
      // Do something with the pasted content
      console.log('Pasted:', content);
    }
  };

  return (
    <button 
      onClick={handlePaste}
      disabled={!hasContent || isReading}
      style={{
        opacity: hasContent ? 1 : 0.5,
        cursor: hasContent ? 'pointer' : 'not-allowed'
      }}
    >
      {isReading 
        ? 'Reading clipboard...' 
        : hasContent 
          ? `Paste "${clipboardContent.substring(0, 15)}${clipboardContent.length > 15 ? '...' : ''}"`
          : 'Clipboard is empty'
      }
    </button>
  );
};

export default SmartPasteButton;
```

## API Reference

### Parameters

The `useClipboard` hook accepts an optional configuration object:

```typescript
interface UseClipboardOptions {
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
```

### Returns

The hook returns an object with the following properties and methods:

```typescript
{
  // Methods
  copyToClipboard: (text: string) => Promise<void>;
  pasteFromClipboard: () => Promise<string>;
  refreshClipboard: () => Promise<string>;
  clearClipboard: () => Promise<void>;
  
  // State
  state: {
    success: boolean;
    error: string | null;
  };
  clipboardContent: string;
  hasContent: boolean;
  isReading: boolean;
}
```

#### Methods

- **`copyToClipboard(text: string)`**: Copies the provided text to the clipboard and updates the local state.
- **`pasteFromClipboard()`**: Reads and returns text from the clipboard, updating the local state.
- **`refreshClipboard()`**: Manually refreshes the clipboard content without performing a paste operation.
- **`clearClipboard()`**: Clears the clipboard by copying a space character.

#### State Properties

- **`state.success`**: Boolean indicating if the last operation was successful.
- **`state.error`**: String containing an error message if the operation failed, or `null` if no error.
- **`clipboardContent`**: Current content of the clipboard as a string.
- **`hasContent`**: Boolean indicating whether the clipboard contains non-empty content.
- **`isReading`**: Boolean indicating whether the hook is currently reading from the clipboard.

## Use Cases

- **Smart Paste Buttons**: Create buttons that are enabled/disabled based on clipboard content, as suggested in the GitHub comment.
- **Clipboard Monitoring**: Monitor clipboard changes for security applications or productivity tools.
- **Copy to Clipboard**: Copy text like URLs, codes, or user-generated content to the clipboard.
- **Paste from Clipboard**: Retrieve and use data from the clipboard, useful in form fields or for data import.
- **Clipboard Integration in Editors**: Use in text editors or note-taking apps for enhanced clipboard interactions.
- **Sharing Content**: Enable users to easily copy shareable content or links to their clipboard.
- **Data Export/Import**: Simplify copying and pasting data for export/import operations within an application.
- **Clipboard History**: Build clipboard history features by tracking clipboard changes over time.
- **Content Validation**: Validate clipboard content before allowing paste operations.
- **Cross-Tab Synchronization**: Synchronize clipboard content across multiple browser tabs or windows.

## Performance Considerations

- **Polling Impact**: Use polling sparingly as it can impact performance. Consider using longer intervals (2-5 seconds) for most use cases.
- **Permission Handling**: The hook gracefully handles clipboard permission denials without throwing errors.
- **Memory Management**: Automatic cleanup of intervals and event listeners prevents memory leaks.
- **Debouncing**: Consider debouncing clipboard operations in high-frequency scenarios.

## Contributing

We encourage contributions to enhance `useClipboard`. For bugs, feature requests, or pull requests, please reach out through the project's repository.