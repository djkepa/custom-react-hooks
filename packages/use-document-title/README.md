# useDocumentTitle Hook

`useDocumentTitle` is a custom React hook for dynamically setting the document title. It updates the title shown in the browser tab, enhancing the user experience by reflecting the current page or content state.

## Features

- **Dynamic Title Management:** Easily update the browser tab title based on the current app state or page.
- **Reversion Option:** Optionally reverts to the original title when the component unmounts.
- **Server-Side Rendering Support:** Compatible with SSR by safely checking for the `document` object.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-document-title
```

or

```bash
yarn add @custom-react-hooks/use-document-title
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
import useDocumentTitle from '@custom-react-hooks/useDocumentTitle';

const DocumentTitleComponent = () => {
  const [title, setTitle] = useState('My Awesome Page');
  useDocumentTitle(title);

  return (
    <div>
      <h1>Welcome to My Awesome Page</h1>
      <button
        onClick={(e) => {
          setTitle('Clicked on the button');
        }}
      >
        Click on the button
      </button>
      <button
        onClick={(e) => {
          setTitle('My Awesome Page');
        }}
      >
        Restore title name
      </button>
    </div>
  );
};
export default DocumentTitleComponent;
```

In this example, the hook is used to set the document title to "My Awesome Page" when `MyPageComponent` is rendered.

## API Reference

### Parameters

- `title`: The string to set as the document title.
- `revertOnUnmount`: (optional) A boolean that determines whether to revert to the original title on component unmount.

## Contributing

Your contributions to improve `useDocumentTitle` are appreciated. Feel free to submit issues or pull requests to enhance its functionality and usability.