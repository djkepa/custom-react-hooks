# useShare Hook

The `useShare` hook provides an easy way to implement native sharing functionality using the Web Share API, with automatic fallback to clipboard copying when native sharing is not available. Perfect for sharing content, URLs, and files across different platforms and devices.

## Features

- **Native Sharing:** Uses the Web Share API for native sharing experience on supported devices.
- **Automatic Fallback:** Falls back to clipboard copying when Web Share API is not available.
- **File Sharing:** Supports sharing files when the platform allows it.
- **Error Handling:** Comprehensive error handling with customizable callbacks.
- **Loading States:** Tracks sharing state for better UX.
- **SSR Safe:** Handles server-side rendering environments gracefully.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-share
```

or

```bash
yarn add @custom-react-hooks/use-share
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

### Basic Usage

```typescript
import React from 'react';
import { useShare } from '@custom-react-hooks/use-share';

const ShareButton = () => {
  const { share, isSupported, isSharing, error } = useShare({
    onSuccess: () => console.log('Shared successfully!'),
    onError: (error) => console.error('Share failed:', error),
  });

  const handleShare = async () => {
    try {
      await share({
        title: 'Check out this awesome content!',
        text: 'I found this really interesting article.',
        url: 'https://example.com',
      });
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleShare} disabled={isSharing}>
        {isSharing ? 'Sharing...' : 'Share'}
      </button>
      
      {!isSupported && (
        <p>Native sharing not supported - will copy to clipboard</p>
      )}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ShareButton;
```

### Article Sharing Component

```typescript
import React from 'react';
import { useShare } from '@custom-react-hooks/use-share';

interface Article {
  title: string;
  excerpt: string;
  url: string;
  author: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  const { share, isSupported, isSharing } = useShare({
    onSuccess: () => {
      // Show success toast or notification
      alert('Article shared successfully!');
    },
    onError: (error) => {
      alert(`Failed to share: ${error.message}`);
    },
  });

  const handleShare = async () => {
    await share({
      title: article.title,
      text: `${article.excerpt} - by ${article.author}`,
      url: article.url,
    });
  };

  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <p>By {article.author}</p>
      
      <button onClick={handleShare} disabled={isSharing}>
        {isSharing ? 'Sharing...' : '📤 Share'}
      </button>
      
      {!isSupported && (
        <small>Will copy link to clipboard</small>
      )}
    </div>
  );
};
```

### File Sharing

```typescript
import React, { useRef } from 'react';
import { useShare } from '@custom-react-hooks/use-share';

const FileSharer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { share, isSupported, isSharing } = useShare();

  const handleFileShare = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      alert('Please select a file first');
      return;
    }

    try {
      await share({
        title: 'Sharing a file',
        files: Array.from(files),
      });
    } catch (error) {
      console.error('File sharing failed:', error);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,text/*,.pdf"
      />
      
      <button onClick={handleFileShare} disabled={isSharing}>
        {isSharing ? 'Sharing...' : 'Share Files'}
      </button>
      
      {!isSupported && (
        <p>File sharing not supported on this device</p>
      )}
    </div>
  );
};
```

### Social Media Sharing

```typescript
import React from 'react';
import { useShare } from '@custom-react-hooks/use-share';

const SocialShareButtons = ({ content }: { content: { title: string; url: string } }) => {
  const { share, isSupported } = useShare({
    fallbackCopy: true,
    onSuccess: () => {
      // Track sharing analytics
      console.log('Content shared successfully');
    },
  });

  const shareToSocial = async (platform?: string) => {
    const shareData = {
      title: content.title,
      url: content.url,
      text: platform ? `Check this out! ${content.title}` : content.title,
    };

    await share(shareData);
  };

  return (
    <div className="social-share">
      <h4>Share this content:</h4>
      
      {isSupported ? (
        <button onClick={() => shareToSocial()}>
          📱 Share (Native)
        </button>
      ) : (
        <div>
          <button onClick={() => shareToSocial('twitter')}>
            🐦 Share to Twitter
          </button>
          <button onClick={() => shareToSocial('facebook')}>
            📘 Share to Facebook
          </button>
          <button onClick={() => shareToSocial()}>
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
};
```

### Custom Share Modal

```typescript
import React, { useState } from 'react';
import { useShare } from '@custom-react-hooks/use-share';

const CustomShareModal = ({ isOpen, onClose, content }) => {
  const [customMessage, setCustomMessage] = useState('');
  
  const { share, isSupported, isSharing, error } = useShare({
    onSuccess: () => {
      onClose();
      setCustomMessage('');
    },
  });

  const handleCustomShare = async () => {
    await share({
      title: content.title,
      text: customMessage || content.description,
      url: content.url,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Share: {content.title}</h3>
        
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Add your message..."
          rows={3}
        />
        
        <div className="modal-actions">
          <button onClick={handleCustomShare} disabled={isSharing}>
            {isSharing ? 'Sharing...' : isSupported ? 'Share' : 'Copy to Clipboard'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
        
        {error && <p className="error">{error}</p>}
        
        {!isSupported && (
          <p className="info">Native sharing not available - will copy to clipboard</p>
        )}
      </div>
    </div>
  );
};
```

## API Reference

### Parameters

- `options` (UseShareOptions, optional): Configuration options.
  - `onSuccess` (function, optional): Callback fired when sharing succeeds.
  - `onError` (function, optional): Callback fired when sharing fails.
  - `fallbackCopy` (boolean, optional): Whether to fallback to clipboard copying. Default: `true`.

### Returns

An object containing:

- `share` (function): Function to trigger sharing with ShareData.
- `isSupported` (boolean): Whether the Web Share API is supported.
- `isSharing` (boolean): Whether sharing is currently in progress.
- `error` (string | null): Error message if sharing fails.

### ShareData Interface

```typescript
interface ShareData {
  title?: string;    // Title of the content to share
  text?: string;     // Text description or message
  url?: string;      // URL to share
  files?: File[];    // Files to share (when supported)
}
```

## Browser Support

### Web Share API Support
- **Chrome/Edge**: 89+ (desktop), 61+ (mobile)
- **Safari**: 14+ (desktop), 12.2+ (mobile)
- **Firefox**: Not supported (falls back to clipboard)

### File Sharing Support
- **Chrome/Edge**: 89+ (with `navigator.canShare()` check)
- **Safari**: 14+ (limited file types)
- **Firefox**: Not supported

## Use Cases

- **Content Sharing**: Share articles, blog posts, or any web content.
- **Social Media Integration**: Enable users to share content to social platforms.
- **File Sharing**: Share images, documents, or other files.
- **E-commerce**: Share product pages or deals.
- **Event Sharing**: Share event details or calendar invites.
- **App Promotion**: Share app download links or referral codes.

## Fallback Behavior

When the Web Share API is not supported:

1. **Text Content**: Combines title, text, and URL into a single string and copies to clipboard
2. **Files**: File sharing is not available in fallback mode
3. **Error Handling**: Provides appropriate error messages for unsupported features

## Security Considerations

- The Web Share API requires a secure context (HTTPS)
- File sharing has restrictions on file types and sizes
- Some browsers may show permission prompts for clipboard access

## Performance Notes

- The hook checks for API support only once during initialization
- Sharing operations are asynchronous and don't block the UI
- Error states are automatically cleared on successful shares

## Contributing

Contributions to enhance `useShare` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

