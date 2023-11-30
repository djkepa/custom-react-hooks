# `useDocumentTitle` Hook

`useDocumentTitle` is a custom React hook for dynamically setting the document title. It updates the title shown in the browser tab, enhancing the user experience by reflecting the current page or content state.

## Features

- **Dynamic Title Management:** Easily update the browser tab title based on the current app state or page.
- **Reversion Option:** Optionally reverts to the original title when the component unmounts.
- **Server-Side Rendering Support:** Compatible with SSR by safely checking for the `document` object.

## Installation

To integrate `useDocumentTitle` into your project:

```bash
npm install @custom-react-hooks/use-document-title
```

or

```bash
yarn add @custom-react-hooks/use-document-title
```

## Usage

```typescript
import React from 'react';
import useDocumentTitle from '@custom-react-hooks/use-document-title';

const MyPageComponent = () => {
  useDocumentTitle("My Awesome Page");

  return (
    <div>
      <h1>Welcome to My Awesome Page</h1>
      {/* Additional page content */}
    </div>
  );
};
```

In this example, the hook is used to set the document title to "My Awesome Page" when `MyPageComponent` is rendered.

## API Reference

### Parameters

- `title`: The string to set as the document title.
- `revertOnUnmount`: (optional) A boolean that determines whether to revert to the original title on component unmount.

## Contributing

Your contributions to improve `useDocumentTitle` are appreciated. Feel free to submit issues or pull requests to enhance its functionality and usability.