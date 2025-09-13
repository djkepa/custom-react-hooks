<p align="center">
  <img src="https://i.ibb.co/ykSxVSX/custom-react-hooks-logo.png" alt="Custom React Hooks Logo"/>
</p>

 <p align="center">
    <a href="https://www.npmjs.com/package/@custom-react-hooks/all">
      <img src="https://img.shields.io/npm/v/@custom-react-hooks/all.svg"
    </a>
    <a href="https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
    </a>
    <a href="https://github.com/djkepa/custom-react-hooks/stargazers">
      <img src="https://img.shields.io/github/stars/djkepa/custom-react-hooks.svg" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/djkepa/custom-react-hooks/network">
      <img src="https://img.shields.io/github/forks/djkepa/custom-react-hooks.svg" alt="GitHub Forks" />
    </a>
    <a href="https://github.com/djkepa/custom-react-hooks/issues">
      <img src="https://img.shields.io/github/issues/djkepa/custom-react-hooks.svg" alt="GitHub Issues" />
    </a>
  </p>

<div align="center">
  A collection of reusable and well-documented custom React hooks for supercharging your React applications. These hooks cover a wide range of functionalities, making it easier for you to build dynamic and interactive user interfaces.
</div>


# Custom React Hooks Library

## Website

```sh
https://custom-react-hooks-live.vercel.app
```

## 🌟 Table of Contents

- [Installation](#-installation)
- [Hooks List](#-hooks-list)
- [Links](#-links)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 [Installation](#installation)

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing All Hooks

If you prefer to have all hooks at your disposal, you can install the entire collection:

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

### Installing Specific Hooks

Each hook is a standalone package, and you can install them individually using npm or yarn:

```sh
npm install @custom-react-hooks/use-async
```

or

```sh
yarn add @custom-react-hooks/use-async
```

## Importing the Hook

The `useExample` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useExample } from '@custom-react-hooks/use-example';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## 📚 [Hooks List](#hooks-list)

- [useAsync](#useasync-hook)
- [useClickOutside](#useclickoutside-hook)
- [useClipboard](#useclipboard-hook)
- [useDebounce](#usedebounce-hook)
- [useDocumentTitle](#usedocumenttitle-hook)
- [useDragDrop](#usedragdrop-hook)
- [useEffectOnce](#useeffectonce-hook)
- [useElementSize](#useelementsize-hook)
- [useEventListener](#useeventlistener-hook)
- [useFetch](#usefetch-hook)
- [useForm](#useform-hook)
- [useGeoLocation](#usegeolocation-hook)
- [useHover](#usehover-hook)
- [useIdle](#useidle-hook)
- [useImageLoad](#useimageload-hook)
- [useKeyPress](#usekeypress-hook)
- [useLockBodyScroll](#uselockbodyscroll-hook)
- [useLongPress](#uselongpress-hook)
- [useMediaDevices](#usemediadevices-hook)
- [useMediaQuery](#usemediaquery-hook)
- [useMouse](#usemouse-hook)
- [useOnScreen](#useonscreen-hook)
- [useOrientation](#useorientation-hook)
- [usePermission](#usepermission-hook)
- [usePortal](#useportal-hook)
- [useScript](#usescript-hook)
- [useStatus](#usestatus-hook)
- [useStep](#usestep-hook)
- [useStorage](#usestorage-hook)
- [useThrottle](#usethrottle-hook)
- [useTimeout](#usetimeout-hook)
- [useToggle](#usetoggle-hook)
- [useUpdateEffect](#useupdateeffect-hook)
- [useWindowSize](#usewindowsize-hook)

## 🆕 New in Version 2.0.0

- [useNetwork](#usenetwork-hook)
- [usePrevious](#useprevious-hook)
- [useWebSocket](#usewebsocket-hook)
- [useCache](#usecache-hook)
- [useHistoryState](#usehistorystate-hook)
- [useShare](#useshare-hook)
- [useWorker](#useworker-hook)
- [useIsland](#useisland-hook)
- [useOffscreen](#useoffscreen-hook)
- [useVirtual](#usevirtual-hook)


# useAsync Hook

The `useAsync` hook simplifies the handling of asynchronous operations in React applications, such as data fetching or any other promise-returning functions. It provides a structured way to track the status and outcome of async operations.

## Features

- **Automated Execution:** Optionally executes the async function automatically on component mount.
- **Manual Execution:** Provides a function to manually trigger the async operation.
- **Status and Error Tracking:** Tracks the status of the async operation and captures any errors.
- **SSR Compatibility:** Safe for server-side rendering, with checks to prevent automatic execution on the server.
- **Value Management:** Manages the value returned from the async operation.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-async
```

or

```bash
yarn add @custom-react-hooks/use-async
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
import { useAsync } from '@custom-react-hooks/all';

const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }
  return response.json();
};

const AsyncComponent = () => {
  const [endpoint, setEndpoint] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const { execute, status, value: data, error } = useAsync(() => fetchData(endpoint), false);

  const handleFetch = () => {
    if (simulateError) {
      setEndpoint('https://jsonplaceholder.typicode.com/todos/1');
    }
    execute();
  };

  return (
    <div>
      <input
        type="text"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        placeholder="Enter API endpoint"
      />
      <button onClick={handleFetch}>Fetch Data</button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={simulateError}
            onChange={() => setSimulateError(!simulateError)}
          />
          Simulate Error
        </label>
      </div>

      {status === 'pending' && <div>Loading...</div>}
      {status === 'error' && <div>Error: {error?.message}</div>}
      {status === 'success' && (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AsyncComponent;
```

In this example, the `useAsync` hook is used to perform an asynchronous data fetch operation.

## API Reference

### Parameters

- `asyncFunction` (Function): The asynchronous function to execute.
- `immediate` (Boolean, optional): A boolean indicating whether the async function should be executed immediately on component mount. Defaults to `false`.

### Returns

An object with the following properties:

- `execute` (Function): A function to trigger the async operation.
- `status` (String): The current status of the async operation (`idle`, `pending`, `success`, `error`).
- `value` (Any): The value returned from the async operation.
- `error` (Error | null): Any error that occurred during the execution.

## Use Cases

1. **API Data Fetching**: Fetching data from an API when a component mounts or based on user actions.

2. **Form Submission Handling**: Managing asynchronous form submissions to a server, including loading states and error handling.

3. **Lazy Loading**: Dynamically loading components or data based on certain conditions or user interactions.

4. **Web API Interactions**: Simplifying the use of asynchronous Web APIs (like geolocation or camera access).

5. **File Uploads**: Handling the asynchronous process of file uploads, including progress tracking and error management.

6. **Real-time Data Updates**: Managing WebSocket connections or server polling for live data updates.

7. **Complex Calculations/Processing**: Executing and managing state for asynchronous complex calculations, such as those using Web Workers.

8. **Third-party Service Integration**: Facilitating interactions with asynchronous third-party services (e.g., payment gateways, social media APIs).

9. **Conditional Async Operations**: Executing asynchronous tasks based on specific conditions or inputs.

10. **Sequencing Async Operations**: Coordinating multiple dependent asynchronous operations in sequence.

## Contributing

Contributions to enhance `useAsync` are highly encouraged. Feel free to submit issues or pull requests to the repository.


# useClickOutside Hook 

The `useClickOutside` hook is designed to detect and handle clicks outside of a specified element or set of elements. This is particularly useful for closing modal windows, dropdowns, and other components when a user interacts outside of them.

## Features

- **Element Focus Management:** Detects clicks outside of the specified element(s), which is essential for managing the focus and closing modal windows, dropdowns, and other components.
- **Customizable Event Listening:** Listens for specific events like `mousedown` and `touchstart` to determine outside clicks, with the option to customize the events.
- **Dynamic Detection Control:** Provides the ability to enable or disable the click outside detection dynamically, which offers flexible integration with various UI state requirements.
- **Ref Exclusion:** Allows for the exclusion of certain elements (by refs) from triggering the outside click logic, which is useful when certain elements within the component should not close it.
- **Multiple Element Support:** Can handle multiple elements as an array of refs, which is great for complex components that may consist of disjointed elements.
- **Simple Integration:** Easy to integrate into existing components with minimal changes required to the existing structure.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-click-outside
```

or

```bash
yarn add @custom-react-hooks/use-click-outside
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

Here's an example of how to use the `useClickOutside` hook in a modal component:

```typescript
import React, { useState, useRef } from 'react';
import { useClickOutside } from '@custom-react-hooks/all';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    <div ref={modalRef}>
      <p>Modal content goes here</p>
      <button onClick={onClose}>Close Modal</button>
    </div>
  );
};

const ClickOutsideComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default ClickOutsideComponent;
```

In the above example, clicking outside the `<div>` containing the modal content will trigger the `onClose` function.

## API Reference

### Parameters

- `refs` (RefObject | RefObject[]): A ref or an array of refs to the element(s) you want to detect outside clicks on.
- `callback` (function): A callback function that will be called when a click outside the detected elements occurs.
- `events` (string[], optional): An array of event names to listen for clicks. Defaults to `['mousedown', 'touchstart']`.
- `enableDetection` (boolean, optional): A boolean to enable or disable click detection. Defaults to `true`.
- `ignoreRefs` (RefObject[], optional): An array of ref objects for elements that, when clicked, should not trigger the callback.

## Use Cases

- **Closing Modals or Popups**: Automatically close a modal or popup when a user clicks outside of it.
- **Dropdown Menus**: Collapse dropdown menus when the user interacts with other parts of the application.
- **Context Menus**: Hide context menus or custom right-click menus when clicking elsewhere on the page.
- **Form Validation or Submission**: Trigger form validation or submission when clicking outside of a form area.
- **Toggling UI Elements**: Toggle the visibility of UI elements like sidebars or tooltips when clicking outside of them.

## Notes

- Ensure the elements referenced by `refs` are mounted when the hook is called.
- The hook must be called within a functional component body or another custom hook.

## Contributing

Feel free to contribute to the development of this hook by submitting issues or pull requests to the repository.

# useClipboard Hook

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
import { useClipboard } from '@custom-react-hooks/all';

const ClipboardComponent = () => {
  const { copyToClipboard, pasteFromClipboard, state } = useClipboard();
  const [textToCopy, setTextToCopy] = useState('');
  const [pastedText, setPastedText] = useState('');

  const handleCopy = async () => {
    await copyToClipboard(textToCopy);
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    setPastedText(text);
  };

  return (
    <div>
      <input
        type="text"
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)}
        placeholder="Text to copy"
      />
      <button onClick={handleCopy}>Copy to Clipboard</button>
      <button onClick={handlePaste}>Paste from Clipboard</button>

      {state.success && <p>Operation successful!</p>}
      {state.error && <p>Error: {state.error}</p>}

      <p>Pasted Text: {pastedText}</p>
    </div>
  );
};

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

## Use Cases

- **Copy to Clipboard**: Copy text like URLs, codes, or user-generated content to the clipboard.
- **Paste from Clipboard**: Retrieve and use data from the clipboard, useful in form fields or for data import.
- **Clipboard Integration in Editors**: Use in text editors or note-taking apps for enhanced clipboard interactions.
- **Sharing Content**: Enable users to easily copy shareable content or links to their clipboard.
- **Data Export/Import**: Simplify copying and pasting data for export/import operations within an application.

## Contributing

We encourage contributions to enhance `useClipboard`. For bugs, feature requests, or pull requests, please reach out through the project's repository.

# useDebounce Hook

The `useDebounce` hook is used to delay the execution of a function until a specified amount of time has passed since it was last invoked. This is useful for handling rapid user input scenarios, such as search input fields or window resizing.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-debounce
```

or

```bash
yarn add @custom-react-hooks/use-debounce
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Features

- **Function Execution Delay:** Delays the execution of a function until a certain amount of time has passed since its last invocation, effectively controlling the rate at which the function fires.

- **Configurable Delay and Max Wait:** Offers the flexibility to set both a delay for the debounce and a maximum waiting time, ensuring the function is executed after a certain period even if the input continues.

- **Leading and Trailing Edge Execution:** Provides options for executing the function at the start (leading edge) or at the end (trailing edge) of the debounce delay, catering to different use case requirements.

- **Improved Performance in Rapid Input Scenarios:** Particularly useful in scenarios involving rapid user inputs, such as typing in search fields or adjusting UI elements, to prevent excessive function calls.

- **Cancel Functionality:** Includes a mechanism to cancel the debounced action, offering additional control over the debounced function's behavior.

- **Optimized for User Interaction Scenarios:** Ideal for use cases like search inputs, form validations, or any scenario where user input can trigger frequent updates or API calls.

- **Versatile Application:** Can be used in various scenarios beyond input fields, such as debouncing API calls, resize or scroll event handlers, and more.

- **Memory Leak Prevention:** Cleans up timeouts on component unmount to prevent memory leaks, ensuring better resource management in React applications.

- **Refined User Experience:** Enhances user experience by reducing the frequency of potentially disruptive or intensive operations during rapid user interactions.

- **Rate-limiting for User Actions:** Useful for rate-limiting user actions, preventing excessive or unintended interactions, like rapid button clicks or toggle switches.

## Usage

Here's an example of using `useDebounce` in a search input component:

```typescript
import React, { useState } from 'react';
import { useDebounce } from '@custom-react-hooks/all';

const DebounceComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [updateDebouncedValue] = useDebounce(
    (val) => {
      setDebouncedValue(val);
    },
    1000,
    { maxWait: 2000 },
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    updateDebouncedValue(value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebounceComponent;
```

In this component, the search function is debounced, which means it will only execute 500 milliseconds after the user stops typing.

## API Reference

### Parameters

- `callback` (Function): The function to debounce.
- `delay` (number): The number of milliseconds to delay.
- `options` (object, optional): Configuration options for the debounce behavior. Options include:
  - `maxWait` (number): The maximum time the function can be delayed before it's executed, regardless of subsequent calls.
  - `leading` (boolean): If `true`, the function is executed on the leading edge of the timeout.
  - `trailing` (boolean): If `true`, the function is executed on the trailing edge of the timeout.

### Returns

- `[debouncedFunction, cancelDebounce]`: 
  - `debouncedFunction` (Function): The debounced version of the provided function.
  - `cancelDebounce` (Function): A function that can be called to cancel the debounced action.

## Use Cases

- **Search Input**: Debounce search input to reduce the number of API calls during typing.
- **Form Validation**: Delay validation until the user has stopped typing, improving performance and user experience.
- **Resize or Scroll Events**: Improve performance by debouncing window resize or scroll event handlers.
- **Autocomplete Fields**: Use in autocomplete or typeahead fields to control the rate of server requests.
- **Saving User Input**: Auto-save user input in a text field or editor with a delay, reducing unnecessary save operations.
- **Rate-limiting User Actions**: Prevent rapid, repeated actions by the user, like button clicks or toggle switches.

## Notes

- The `useDebounce` hook is useful for optimizing performance in scenarios where you want to limit the frequency of function execution.
- Make sure to adjust the delay based on your specific use case.

## Contributing

Your contributions are welcome! Feel free to submit issues or pull requests to improve the `useDebounce` hook.

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
import { useDocumentTitle } from '@custom-react-hooks/all';

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

In this example, the hook is used to set the document title to "My Awesome Page" when `DocumentTitleComponent` is rendered.

## API Reference

### Parameters

- `title`: The string to set as the document title.
- `revertOnUnmount`: (optional) A boolean that determines whether to revert to the original title on component unmount.

## Use Cases

- **Page Titling**: Update the document title based on the current page or view in a Single Page Application (SPA).
- **Contextual Information**: Show contextual information (like unread message count) in the title.
- **Feedback on User Actions**: Reflect changes in application state (like a successful form submission).
- **SEO Optimization**: For server-side rendered applications, dynamically setting titles can help with SEO.

## Contributing

Your contributions to improve `useDocumentTitle` are appreciated. Feel free to submit issues or pull requests to enhance its functionality and usability.

# useDragDrop Hook

`useDragDrop` is a combined React hook that facilitates drag-and-drop interactions in your application. It abstracts the handling of both draggable elements and drop targets, simplifying the implementation of drag-and-drop functionality.

## Features

- **Combined Drag and Drop Handling**: Manages both dragging and dropping within a single hook.
- **Customizable Data Transfer**: Allows any data to be associated with the drag operation and retrieved upon dropping.
- **Event Handling**: Abstracts away the complexity of drag-and-drop event management.
- **Real-time State Management**: Tracks the state of dragging and dropping actions in real-time.
- **SSR Compatibility**: Designed to be server-side rendering friendly.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-drag-drop
```

or

```bash
yarn add @custom-react-hooks/use-drag-drop
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

```tsx
import React from 'react';
import { useDragDrop } from '@custom-react-hooks/all';

const DraggableItem = ({ id, bindDrag }) => (
  <div {...bindDrag(id)}>
    {id}
  </div>
);


const DroppableArea = ({ id, bindDrop, children }) => (
  <div {...bindDrop(id)}>
    {children}
  </div>
);

const DragDropComponent = () => {
  const [itemLocations, setItemLocations] = useState({ Item1: 'outside' });

  const handleDrop = (dragId, dropId) => {
    setItemLocations((prev) => ({ ...prev, [dragId]: dropId }));
  };

  const { state, bindDrag, bindDrop } = useDragDrop(handleDrop);

  const renderDraggableItem = (id, location) => {
    return itemLocations[id] === location ? (
      <DraggableItem
        id={id}
        bindDrag={bindDrag}
      />
    ) : null;
  };

  return (
    <div>
      {renderDraggableItem('Item1', 'outside')}

      <div className="btns">
        <DroppableArea
          id="Area1"
          bindDrop={bindDrop}
          isOver={state.isOver && state.overDropId === 'Area1'}
        >
          {renderDraggableItem('Item1', 'Area1')}
        </DroppableArea>

        <DroppableArea
          id="Area2"
          bindDrop={bindDrop}
          isOver={state.isOver && state.overDropId === 'Area2'}
        >
          {renderDraggableItem('Item1', 'Area2')}
        </DroppableArea>
      </div>
    </div>
  );
};

export default DragDropComponent;
```

In this example, `useDragDrop` is used to implement both draggable and droppable components.

## API Reference

- `useDragDrop(dragData: any, onDrop: (data: any) => void)`: A function that accepts drag data and a drop callback.

### Parameters:
  - `dragData`: The data to be associated with the drag operation.
  - `onDrop`: A callback function that gets executed with the dropped data.

### Returns an object with:
  - `state`: An object containing the current drag and drop states.
  - `bindDrag`: Binding properties for the draggable element.
  - `bindDrop`: Binding properties for the drop target.

## Use Cases

- **List and Grid Manipulation**: Rearrange items in lists or grids via drag and drop.
- **File Upload Interfaces**: Implement drag-and-drop file upload interfaces.
- **Interactive Dashboards**: Allow users to customize dashboards by moving widgets or cards.
- **Cross-Component Data Transfer**: Facilitate data transfer between different parts of the UI.
- **Visual Editors**: Use in visual editors for dragging elements, layers, or tools.

## Contributing

Contributions to improve `useDragDrop` are welcome. Please submit issues or pull requests to the repository for any bugs or feature enhancements.

# useEffectOnce Hook

`useEffectOnce` is a custom hook in React designed to mimic the behavior of `componentDidMount` and `componentWillUnmount` lifecycle methods in class components. It's a modified version of `useEffect` that runs only once when the component mounts.

## Features

- **Single Execution:** The hook executes the provided effect function once upon the component's initial render.
- **Cleanup Capability:** It supports an optional cleanup function, returned from the effect, which is called when the component unmounts.
- **SSR Compatibility:** As an extension of `useEffect`, it is naturally compatible with server-side rendering environments.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-effect-once
```

or

```bash
yarn add @custom-react-hooks/use-effect-once
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
import React from 'react';
import { useEffectOnce } from '@custom-react-hooks/all';

const EffectOnceComponent = () => {
  const [fibonacciSequence, setFibonacciSequence] = useState([]);

  const calculateFibonacci = (n) => {
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence.slice(0, n);
  };

  useEffectOnce(() => {
    const sequence = calculateFibonacci(5);
    setFibonacciSequence(sequence);
  });

  return (
    <div>
      <p>First {5} numbers in the Fibonacci sequence:</p>
      <ul>
        {fibonacciSequence.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default EffectOnceComponent;
```

In this example, `useEffectOnce` is used to perform actions at the mounting and unmounting phases of `MyComponent`.

## API Reference

### Parameters

- `effect`: A function that will be executed once when the component mounts. This function can optionally return a cleanup function, which will be executed when the component unmounts.

## Use Cases

- **Initial Setup**: Perform setup operations like fetching initial data or setting up listeners.
- **One-time Calculations**: Compute values needed only once during the component's lifecycle.
- **Single API Calls**: Make a single API call when a component is rendered for the first time.
- **Non-Recurring Subscriptions**: Subscribe to a service or event listener that should only be initialized once.

## Contributing

Contributions to enhance `useEffectOnce` are always welcome. Feel free to submit issues or pull requests to the repository for further improvements.

# `useElementSize` Hook

`useElementSize` is a React hook that enables dynamic tracking of an HTML element's dimensions. It updates the element's width and height in response to window resizing, element mounting/unmounting, and ref changes.

## Features

- **Dynamic Dimension Tracking:** Automatically tracks and updates the width and height of the specified element.
- **Responsive to Environmental Changes:** Responds to window resizing and ref changes, ensuring accurate size measurements.
- **SSR Safe:** Compatible with server-side rendering, avoiding errors in environments without a `window` object.
- **Optimized for Accuracy:** Uses `useLayoutEffect` for precise dimension measurements after DOM mutations.

## Installation

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-element-size
```

or

```bash
yarn add @custom-react-hooks/use-element-size
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
import React, { useRef, useState } from 'react';
import { useElementSize } from '@custom-react-hooks/all';

const ElementSizeComponent = () => {
  const [setRef, size] = useElementSize();

  return (
    <div className="element-size">
      <div
        ref={setRef}
        className="resize"
      >
        <p>Drag from the bottom-right corner to resize.</p>
      </div>
      <br />
      <div>Current Size:</div>
      <div className="btns">
        <p>
          Width: <span>{size.width}px</span>
        </p>
        <p>
          Height: <span>{size.height}px</span>
        </p>
      </div>
    </div>
  );
};

export default ElementSizeComponent;
```

In this example, `useElementSize` is used to measure and display the dimensions of a `div` element.

## API Reference

### Parameters

- `ref`: A React ref object attached to the element whose size you want to measure.

### Returns object

- `width`: width of the element
- `height`: height of the element.

## Use cases

- **Responsive Components**: Adjust component behavior or style based on its size.
- **Layout Calculations**: Calculate layout for items like grids or masonry layouts that depend on element sizes.
- **Size-dependent Rendering**: Render different content or components based on available size.
- **Animations and Transitions**: Trigger animations or transitions when an element's size changes.
- **Optimizing Canvas or SVG**: Adjust dimensions for canvas or SVG elements based on their container size.


## Contributing

Your contributions to improve `useElementSize` are welcome. Feel free to submit issues or pull requests to the repository.


# useEventListener Hook

The `useEventListener` hook is a custom React hook that simplifies the process of adding and removing event listeners in your React components. It handles the lifecycle of the event listener, ensuring it is cleaned up when the component unmounts or dependencies change.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-event-listener
```

or

```bash
yarn add @custom-react-hooks/use-event-listener
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Features

- **Effortless Event Handling:** Streamlines the process of adding and removing event listeners in React components, making it easier to handle user interactions and other events.

- **Automatic Cleanup:** Automatically cleans up event listeners when the component unmounts or dependencies change, preventing memory leaks and ensuring optimal performance.

- **Support for Multiple Events:** Capable of attaching listeners to multiple events simultaneously, making it versatile for handling various types of interactions within a single component.

- **Flexible Element Targeting:** Offers the ability to attach event listeners to specific DOM elements using a ref, or defaults to the global `window` object if no element is specified.

- **Conditional Event Listening:** Includes an optional condition parameter to dynamically attach or detach event listeners based on certain conditions, enhancing the hook's adaptability in different scenarios.

- **Custom Event Handling Function:** Allows for the specification of a custom handler function for each event, providing full control over the response to the triggered events.

- **Option Customization:** Supports both boolean and object options for event listeners, aligning with the standard `addEventListener` API and providing flexibility for more complex event handling requirements.

- **Ref Management:** Uses a ref to store the current handler function, ensuring that the most recent handler is used and preventing stale closures.

- **Event Listener Abstraction:** Abstracts the complexities of correctly attaching and detaching event listeners in React's lifecycle, allowing developers to focus on the core logic of their components.

- **Versatility in Use:** Suitable for a wide range of use cases, from handling user inputs like keyboard and mouse events to responding to browser and device events like resizing and orientation changes.


## Usage

Here's an example of how to use the `useEventListener` hook in a component:

```typescript
import { useEventListener } from '@custom-react-hooks/all';

const EventListenerComponent = () => {
  const [count, setCount] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setCount((prevCount) => prevCount + 1);
    } else if (event.key === 'ArrowLeft') {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEventListener('keydown', handleKeyDown);

  const getColor = () => {
    if (count < 0) return '#ff5868';
    if (count > 0) return '#00989a';
    return '#f9f871';
  };

  return (
    <div>
      <h2>Press the Arrow Left/Right keys to change the counter.</h2>
      <p>(If is not working, click me!)</p>
      <p>
        Counter: <span style={{ color: getColor() }}>{count}</span>
      </p>
    </div>
  );
};

export default EventListenerComponent;
```

In this component, `useEventListener` is used to listen for `keydown` events on the `div` element, and the state is updated with the last key pressed.

## API Reference

### Parameters

- `eventName` (string | string[]): The name of the event to listen to, or an array of event names.
- `handler` (function): The function to be called when the event is triggered.
- `element` (RefObject, optional): The ref object pointing to the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the window object.
- `options` (boolean | AddEventListenerOptions, optional): Options to pass to the event listener.
- `condition` (boolean, optional): A boolean value to conditionally attach or detach the event listener.

## Use Cases
Let's explore the use cases for each of the four additional hooks you've provided:

### 1. `useEventListener`

- **Custom Interactions**: Capture custom user interactions like keyboard shortcuts or mouse movements.
- **Tracking User Behavior**: Monitor events for analytics, like clicks or page visibility changes.
- **Interactive Components**: Enhance components with interactive features, like drag-and-drop or hover effects.
- **Window or Document Events**: Listen to window resize, scroll, or focus events to adjust UI accordingly.
- **Device Capabilities**: Detect device capabilities, such as orientation change or network status updates.

## Notes

- Ensure the element referenced by `element` is mounted when the hook is called.
- The hook is versatile and can be used for various events and elements within a React application.

## Contributing

Your contributions to the development and enhancement of this hook are welcome! Feel free to submit issues or pull requests to the repository.

# useFetch Hook

The `useFetch` hook is a powerful tool for making API requests in React applications. It simplifies the process of fetching data from a URL and handles various advanced features like caching, timeouts, and integration with global state management systems.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-fetch
```

or

```bash
yarn add @custom-react-hooks/use-fetch
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Features

- **Automatic Data Fetching:** The hook initiates a fetch request as soon as the component mounts, making it effortless to load data from APIs or servers. This behavior can be controlled with the `manual` option for more specific use cases.

- **Manual Fetch Control:** Provides the flexibility to manually trigger fetch requests using the `fetchData` function. This is particularly useful for cases where data needs to be re-fetched based on user interactions or other events.

- **Built-in Loading and Error States:** Manages loading and error states internally, simplifying the process of rendering different UI components based on the status of the API request.

- **Configurable Fetch Options:** Extends the standard `fetch` API options, allowing customization of request headers, method, body, and other settings. This makes it versatile for various types of API requests.

- **Timeout Support:** Includes a timeout feature, enabling the specification of a maximum time to wait for a response. This helps in handling scenarios where the server response might be delayed.

- **Response Caching:** Offers an optional caching mechanism to store and retrieve responses. This reduces redundant network requests, optimizing performance for frequently accessed data.

- **Global State Integration:** Allows for the integration with global state management systems by providing an optional setter function. This is useful for updating global states like Redux or Context API with the fetched data.

- **Automatic Cleanup:** Handles the cleanup of timeouts and aborts ongoing fetch requests to prevent memory leaks and unwanted side effects, especially important in dynamic and complex applications.

- **Error Handling:** Captures and returns errors encountered during the fetch process, facilitating robust error handling and user feedback mechanisms in the application.

- **Flexible Return Types:** The hook is generic, making it capable of returning data in any format (e.g., JSON, text), depending on the needs of the application.

- **Server-Side Rendering Compatibility:** Designed to be safely used in server-side rendering environments, avoiding errors related to the absence of a `window` or browser-specific APIs.


## Usage

Here's an example of how to use the `useFetch` hook in a component:

```typescript
import { useFetch } from '@custom-react-hooks/all';

const FetchComponent = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users/1');
  const { data, loading, error, fetchData } = useFetch(url, { manual: true });

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetch = () => {
    fetchData();
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={handleChange}
      />
      <button
        onClick={handleFetch}
        disabled={loading}
      >
        Fetch Data
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Data:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
```

In this example, `useFetch` is used to load data from an API. The component displays the data, a loading state, and any error that might occur. A button is provided to manually trigger the fetch request.

## API Reference

### Parameters

- `url` (string): The URL to fetch data from.
- `options` (RequestInit & { manual?: boolean, timeout?: number }, optional): Configuration options for the fetch request. Includes standard `fetch` options along with `manual` for manual trigger and `timeout` for request timeout.
- `cache` (Map<string, T> | null, optional): An optional cache object to store and retrieve responses.
- `globalStateSetter` ((data: T | null) => void, optional): An optional global state setter function for integration with global state management systems.

### Returns

An object containing:
- `data` (T | null): The data received from the fetch request.
- `loading` (boolean): The loading state of the request.
- `error` (Error | null): Any error encountered during the request.
- `fetchData` (() => Promise<void>): A function to manually trigger the fetch request.

## Use Cases

- **Data Fetching**: Load data from an API or server, handling loading states and errors.
- **Caching Responses**: Implement caching strategies to reduce redundant network requests.
- **Global State Updates**: Update global state (like in Redux or Context API) with fetched data.
- **Polling Mechanism**: Implement polling for real-time updates from a server.
- **Conditional Requests**: Make API requests based on user actions or component lifecycle.

## Notes

- The `useFetch` hook is designed to be flexible and can be adapted to fit various fetching requirements.
- Remember to handle the cleanup of timeouts and abort controllers to avoid memory leaks and unexpected behavior in your components.

## Contributing

Contributions to enhance the `useFetch` hook are welcome. Feel free to submit issues or pull requests to the repository.

# useForm Hook

The `useForm` hook is an advanced form management tool for React applications, providing capabilities for managing form state, validation, loading status, and submission feedback.

## Features

- **Flexible Form State Management:** Handles values, errors, and touch status of form fields.
- **Custom Validation:** Supports custom validation logic for form fields.
- **Loading State (`isSubmitting`):** Indicates when the form is being submitted, useful for displaying loading indicators.
- **Submission Status (`submissionStatus`):** Provides feedback on the form submission process, with states like `idle`, `success`, or `error`.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-form
```

or

```bash
yarn add @custom-react-hooks/use-form
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Features

- **Comprehensive Form State Management:** Efficiently manages the state of form fields including values, validation errors, and touched status, ensuring a smooth form handling experience.

- **Customizable Validation Logic:** Supports custom validation functions, allowing for flexible and complex validation rules tailored to specific form requirements.

- **Real-Time Feedback on Form State:** Tracks the `isSubmitting` state, providing real-time feedback on the form's submission process, which is particularly useful for implementing loading indicators.

- **Detailed Submission Status Tracking:** Maintains a `submissionStatus` state with values like `idle`, `success`, or `error`, offering precise feedback on the outcome of form submissions.

- **Dynamic Form Field Handling:** Capable of managing dynamic form fields, allowing for adding, removing, or updating fields as needed within the form.

- **Synchronous and Asynchronous Validation:** Supports both synchronous and asynchronous validation, making it suitable for a variety of validation scenarios including server-side validation checks.

- **Event Handlers for Form Interactions:** Provides built-in handlers for common form events like changes (`handleChange`), blurs (`handleBlur`), and submissions (`handleSubmit`), simplifying form interaction logic.

- **Form Reset Functionality:** Includes a `resetForm` function to easily reset the form to its initial state, enhancing user experience in scenarios like form cancellation or reinitialization.

- **Declarative Form Submission:** The `handleSubmit` function allows for declarative handling of form submissions, including support for asynchronous operations like API calls.

- **Enhanced User Experience:** Improves user experience by providing immediate feedback on input validation and submission status, reducing user errors and confusion.

- **Optimized for Complex Forms:** Ideal for handling complex forms, such as multi-step forms or forms with conditional logic, due to its comprehensive state management and flexible validation capabilities.

## Usage

```typescript
import React from 'react';
import useForm from '@custom-react-hooks/use-form';

const FormComponent = () => {
  const initialValues = { username: '', email: '' };
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState('');

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.email) errors.email = 'Email is required';
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useForm(
    initialValues,
    validate,
  );

  const onSubmit = async () => {
    setSubmitting(true);
    console.log('Form submitted:', values);

    setTimeout(() => {
      setSubmitResult('Form submitted successfully!');
      setSubmitting(false);
    }, 2000);
  };

  return (
    <>
      {submitting && <div>Loading...</div>}
      {!submitting && submitResult && <div>{submitResult}</div>}
      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className="form"
      >
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="pair">
          <button
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetForm}
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
```

## API Reference

### Parameters

- `initialValues`: Object representing the initial state of the form fields.
- `validate`: Function for custom validation logic, returning error messages for each field.
- `values`: Object representing the current values of the form fields.
- `errors`: Object representing validation errors for each field.
- `touched`: Object indicating which fields have been touched.
- `handleChange`: Function to handle changes in form fields.
- `handleBlur`: Function to handle blur events on form fields.
- `handleSubmit`: Function to handle form submission, including asynchronous operations.
- `resetForm`: Function to reset the form to its initial state.
- `isSubmitting`: Boolean indicating the submitting state of the form.
- `submissionStatus`: String representing the status of the form submission (`idle`, `success`, or `error`).

## Use Cases

- **Form State Management**: Handle input values, errors, and touched fields.
- **Dynamic Form Handling**: Dynamically add, remove, or update form fields.
- **Form Validation**: Implement synchronous or asynchronous form validation.
- **Form Submission**: Manage form submission status and handle submit events.
- **Multi-Step Forms**: Control multi-step or wizard-like form processes.

## Contributing

Your contributions to further enhance `useForm` are welcome. Feel free to submit issues or pull requests to the repository.

# useGeoLocation Hook

The `useGeoLocation` hook is a powerful tool for accessing and monitoring the user's geographical location in React applications. It offers features such as continuous location watching, error handling, and customizable geolocation options.

## Features

- **Real-Time Location Tracking:** Ability to continuously watch the user's location.
- **Custom Geolocation Options:** Supports customization of geolocation queries, like timeout and accuracy.
- **Error Handling:** Robust error handling, including cases where geolocation is not supported.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-geo-location
```

or

```bash
yarn add @custom-react-hooks/use-geo-location
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

Import and use the `useGeoLocation` hook in your React components:

```typescript
import { useGeoLocation } from '@custom-react-hooks/all';

function GeoLocationComponent() {
  const { loading, coordinates, error, isWatching } = useGeoLocation();

  return (
    <div>
      <h1>GeoLocation Component</h1>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error.message}</p>}
      {!loading && !error && coordinates && (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
      <p>Watching: {isWatching ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default GeoLocationComponent;
```

## API Reference

### Parameters

- `options`: Optional `PositionOptions` object to configure geolocation queries.
- `watch`: Boolean flag to continuously watch the user's location.
- `coordinates`: The current geographical position of the user.
- `error`: Error object containing details in case of a failure.
- `loading`: Boolean indicating whether the location data is being fetched.

## Use Cases

- **User Location Tracking**: Get the current location of the user for services like maps or local information.
- **Continuous Location Monitoring**: Continuously monitor user's location for real-time tracking applications.
- **Geofencing**: Implement geofencing features, triggering actions when the user enters or leaves a region.
- **Location-Based Services**: Provide services or content based on the user’s geographical location.
- **Error Handling**: Manage errors related to geolocation access, like permission denial or unavailable services.

## Contributing

Contributions to improve `useGeoLocation` are welcome. Feel free to submit issues or pull requests to enhance its functionality.

# useHover Hook

The `useHover` hook is a utility for detecting hover interactions in React components. It simplifies the process of tracking when a user's mouse pointer hovers over an element.

## Features

- **Hover State Management:** Tracks hover state of an element.
- **Ref-based Implementation:** Attaches event listeners using a React `ref`, ensuring compatibility with React's DOM handling.
- **Server-Side Rendering Compatibility:** Safe for use in SSR environments by avoiding direct DOM interactions unless the component is mounted in the browser.
- **Optimized Event Handling:** Uses `useCallback` to memoize event handlers for performance optimization.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-hover
```

or

```bash
yarn add @custom-react-hooks/use-hover
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
import { useHover } from '@custom-react-hooks/all';

function HoverComponent() {
  const { ref, isHovered } = useHover();

  return (
    <div ref={ref}>
      <h3>
        {isHovered ? 'Hovered' : 'Hover Me!'}
      </h3>
    </div>
  );
}

export default HoverComponent;
```

In this example, the `useHover` hook provides a way to determine if a particular div is being hovered.

## API Reference

### Returns
  - `ref`: A React `ref` that should be attached to the element you want to monitor for hover.
  - `isHovered`: A boolean state indicating whether the element is currently being hovered.

## Use Cases

- **UI Feedback**: Change styles or display additional information when an element is hovered.
- **Dropdown Menus**: Show dropdown menus or submenus when a user hovers over a menu item.
- **Tooltip Display**: Show tooltips on hover for buttons, links, or other UI elements.
- **Interactive Elements**: Enhance interactivity for elements like cards or images in a gallery.

## Contributing

Contributions to enhance `useHover` are welcome. Feel free to submit issues or pull requests to the repository.

# useIdle Hook

`useIdle` is a React hook designed to detect user inactivity or idle time in applications. It triggers a state change after a specified period of inactivity, making it useful for actions like auto-logout or activity pausing.

## Features

- **Idle Time Detection:** Tracks user inactivity and changes state after a set period.
- **Activity Monitoring:** Resets the idle timer upon user interactions like mouse movement, keypresses, and scrolling.
- **SSR Compatibility:** Safely handles server-side rendering by checking for the `window` object.
- **Configurable Idle Duration:** Allows setting a custom duration to define user inactivity.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-idle
```

or

```bash
yarn add @custom-react-hooks/use-idle
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
import React from 'react';
import { useIdle } from '@custom-react-hooks/all';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';


const IdleComponent = () => {
  const isIdle = useIdle(1000);

  return (
    <div className="center">
      {isIdle ? (
        <div className="btns">
          <MoonIcon/>
          <p>Away</p>
        </div>
      ) : (
        <div className="btns">
          <SunIcon/>
          <p>Online</p>
        </div>
      )}
      <br />
      <p>To see the effect, do not move the mouse or touch the keyboard!</p>
    </div>
  );
};

export default IdleComponent;
```

In this example, the hook is used to detect when the user has been idle for more than 3 seconds.

## API Reference

### Parameters

- `idleTime`: The time in milliseconds to wait before considering the user as idle.

### Returns
- Returns a boolean state indicating if the user is idle.

## Use Cases

- **Auto Logout**: Automatically log users out after a period of inactivity for security purposes.
- **Pause Background Activities**: Pause or reduce background activities like animations or data fetching.
- **User Activity Monitoring**: Track user activity to understand usage patterns or for analytics.
- **Energy Saving**: Reduce energy consumption by dimming the screen or reducing resource-intensive tasks.

## Contributing

Contributions to enhance `useIdle` are welcome. Feel free to submit issues or pull requests to the repository.

# useImageLoad Hook

`useImageLoad` is a custom React hook designed to enhance the user experience by efficiently loading images. It supports lazy loading to improve performance and provides detailed status updates during the image loading process.

## Features

- **Progressive Image Loading:** Displays a thumbnail first, followed by the full-resolution image once loaded.
- **Lazy Loading Support:** Defers the loading of off-screen images until they are needed.
- **Detailed Loading States:** Tracks the loading state, completion, and any errors that occur.
- **SSR Safe:** Checks for window object availability to ensure compatibility with server-side rendered applications.
- **Cleanup Mechanism:** Properly disconnects `IntersectionObserver` to prevent memory leaks.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-image-load
```

or

```bash
yarn add @custom-react-hooks/use-image-load
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
import { useImageLoad } from '@custom-react-hooks/all';

const ImageLoadComponent = ({ thumbnailSrc, fullSrc }) => {
  const thumbnailOnlyRef = useRef(null);
  const lazyLoadRef = useRef(null);

  const thumbnailOnlyState = useImageLoad({ thumbnailSrc, fullSrc: '' }, thumbnailOnlyRef);
  const lazyLoadState = useImageLoad({ thumbnailSrc, fullSrc, lazyLoad: true }, lazyLoadRef);

  return (
    <div>
      <div>
        <h3>Thumbnail Only</h3>
        {thumbnailOnlyState.isLoading && <p>Loading thumbnail...</p>}
        {thumbnailOnlyState.hasError && <p>Error loading thumbnail.</p>}
        <img
          ref={thumbnailOnlyRef}
          src={thumbnailOnlyState.src}
          alt="Thumbnail Only"
        />
      </div>
      <p>Scroll down to trigger lazy load</p>

      <div>
        <h3>Lazy Loading Image</h3>
        {lazyLoadState.isLoading && <p>Loading image...</p>}
        {lazyLoadState.hasError && <p>Error loading image.</p>}
        <img
          ref={lazyLoadRef}
          src={lazyLoadState.src}
          alt="Lazy Loading"
        />
      </div>
    </div>
  );
};

export default ImageLoadComponent;
```

## API Reference

### Parameters
- `thumbnailSrc`: The source path of the thumbnail image.
- `fullSrc`: The source path of the full-resolution image.
- `lazyLoad`: (optional) A boolean to enable lazy loading.

### Returns
  - `src`: The current source of the image.
  - `isLoading`: Indicates if the image is currently loading.
  - `isLoaded`: Indicates if the image has fully loaded.
  - `hasError`: Indicates if there was an error during loading.

## Use Cases

- **Progressive Image Loading**: Show a low-quality image or placeholder while the full image loads.
- **Lazy Loading**: Load images only when they are in or near the viewport, improving page load times.
- **Error Handling**: Handle image load errors gracefully with fallbacks or error messages.
- **Loading State Indicators**: Display a loading indicator while images are being fetched.

## Contributing

We welcome contributions to `useImageLoad`. For bugs, feature requests, or pull requests, please reach out through the project's repository.

# useKeyPress Hook

The `useKeyPress` hook is an advanced utility for detecting specific keypress events in React applications. It supports customizable debounce timing and can listen for keypress events either globally or locally within a component.

## Features

- **Key Detection:** Monitors for the press of a specific key.
- **Debounce Support:** Includes an optional debounce feature to manage rapid keypresses.
- **Global and Local Listening:** Option to listen for keypress events globally (across the entire window) or locally (within a specific component).
- **SSR Compatibility:** Safely handles server-side rendering environments.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-key-press
```

or

```bash
yarn add @custom-react-hooks/use-key-press
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
import { useKeyPress } from '@custom-react-hooks/all';

const KeyPressComponent = () => {
  const isPressed = useKeyPress('Enter');

  return (
    <div>
      <p>Press the "Enter" key</p>
      <button>
        Enter
      </button>
      {isPressed && <p>You are pressing the "Enter" key!</p>}
    </div>
  );
};

export default KeyPressComponent;
```

This example demonstrates using `useKeyPress` to detect when the Enter key is pressed with a debounce of 200 milliseconds.

## API Reference

### Parameters
- `targetKey`: The key for which the press event should be detected.
- `options`: An object that may contain:
- `debounce`: Optional number specifying the debounce time in milliseconds.
- `global`: Optional boolean indicating whether to listen for the event globally.
  
### Returns
- Returns a boolean state indicating whether the specified key is currently pressed.

## Use Cases

- **Keyboard Shortcuts**: Implement custom keyboard shortcuts for enhanced user interaction.
- **Game Controls**: Handle key presses for browser-based games.
- **Navigation**: Navigate through components or pages using keyboard keys.
- **Accessibility Enhancements**: Improve accessibility by providing keyboard interactions.

## Contributing

We welcome contributions to improve `useKeyPress`. Feel free to submit issues or pull requests to the repository.

# useLockBodyScroll Hook

`useLockBodyScroll` is a React hook for controlling the scroll behavior of the body element in web applications. It's particularly useful for scenarios like opening modals or overlays where background scroll needs to be disabled.

## Features

- **Conditional Scroll Lock:** Allows you to conditionally enable or disable the body scroll.
- **Style Preservation:** Preserves the original body overflow style and restores it upon unmounting.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments by checking for the `document` object.
- **Synchronous Execution:** Uses `useLayoutEffect` for synchronous updates to the DOM.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-lock-body-scroll
```

or

```bash
yarn add @custom-react-hooks/use-lock-body-scroll
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
import { useLockBodyScroll } from '@custom-react-hooks/all';

const LockBodyScrollComponent= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useLockBodyScroll(isModalOpen);

  return (
    <div>
      <p>{isModalOpen ? 'Scroll hidden' : 'When you click on the button scroll will be hidden'}</p>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <div className="modal">
          <div>
            <p>Modal Content</p>
            <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockBodyScrollComponent;
```

In this example, the hook is used to lock the body scroll when the modal is open.

## API Reference

- `lock`: A boolean indicating whether to lock (`true`) or unlock (`false`) the body scroll.

## Use Cases

1. **Modals and Popups**: This is the most common use case. When a modal or popup is opened, it's often desirable to lock the background content to prevent the user from scrolling. This keeps the focus on the modal content.

2. **Full-Screen Menus**: In mobile-responsive designs or certain desktop layouts, when a full-screen menu is opened, you might want to lock the scroll to keep the user's focus on the navigation options.

3. **Onboarding Flows or Guided Tours**: If your application has a step-by-step onboarding process or a guided tour, you might want to lock scrolling to ensure the user follows the flow without distractions.

4. **Image or Video Galleries**: When a user clicks on an image or video to view it in a larger format (like a lightbox), locking the scroll can enhance the viewing experience by removing background distractions.

5. **Infinite Scroll Prevention**: In some scenarios, you might want to temporarily disable infinite scrolling features. For example, when a user performs an action that requires attention or confirmation, you could lock the scroll to keep them focused on the task.

6. **Interactive Games or Quizzes**: If you're embedding games or quizzes in your web application, you might want to lock the background scroll when these elements are in focus to enhance user engagement and prevent accidental scroll-offs.

7. **Alerts or Critical Notifications**: When displaying critical alerts or notifications that require immediate attention or action, disabling the background scroll can ensure that the user addresses these alerts without distraction.

8. **Complex Forms or Surveys**: In a long, multi-step form or survey, you may want to lock the scroll when displaying validation errors or important information to ensure the user sees and acknowledges these messages.

## Contributing

Your contributions to improve `useLockBodyScroll` are welcome. Feel free to submit issues or pull requests to the repository.

# useLongPress Hook

The `useLongPress` hook is designed for adding long press interactions to elements in React applications. It provides a flexible way to handle long press events with customizable thresholds and callbacks.

## Features

- **Customizable Long Press Duration:** Set a threshold for how long the press should last to trigger the event.
- **Multiple Event Callbacks:** Options for onStart, onFinish, and onCancel callbacks.
- **Support for Mouse and Touch:** Works with both mouse and touch events.
- **SSR Safe:** Can be safely used in server-side rendered applications.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-long-press
```

or

```bash
yarn add @custom-react-hooks/use-long-press
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
import { useLongPress } from '@custom-react-hooks/all';

const LongPressTestComponent = () => {
  const [status, setStatus] = useState('Ready');

  const longPressCallback = () => {
    setStatus('Finished');
  };

  const longPressEvents = useLongPress(longPressCallback, {
    threshold: 500,
    onStart: () => setStatus('Started'),
    onFinish: () => setStatus('Finished'),
    onCancel: () => setStatus('Cancelled'),
  });

  return (
    <div>
      <button {...longPressEvents}>
        Press and Hold
      </button>
      <p>
        Status: <span>{status}</span>
      </p>
    </div>
  );
};

export default LongPressTestComponent;
```

This example demonstrates how to use the `useLongPress` hook to add a long press interaction to a button element.

## API Reference

### Parameters

- `callback`: The function to execute when a long press event is successfully detected.
- `options`: Configuration object with the following optional properties:
  - `threshold`: Time in milliseconds the user must press and hold to trigger a long press event.
  - `onStart`: Function called when the user starts pressing.
  - `onFinish`: Function called when a long press event finishes successfully.
  - `onCancel`: Function called when a press event is cancelled.

### Returns

- `onMouseDown`: Event handler for mouse down event to start detecting long press.
- `onMouseUp`: Event handler for mouse up event to cancel long press detection.
- `onMouseLeave`: Event handler for mouse leave event to cancel long press detection.
- `onTouchStart`: Event handler for touch start event to start detecting long press.
- `onTouchEnd`: Event handler for touch end event to cancel long press detection.

## Use Cases

- **Mobile Interaction**: Implement long press interactions common in mobile interfaces.
- **Context Menus**: Display custom context menus on long press.
- **Drag-and-Drop Initiation**: Start a drag-and-drop process after a long press.
- **Gesture Recognition**: Recognize specific user gestures for advanced UI interactions.

## Contributing

Your contributions to improve `useLongPress` are appreciated. Feel free to submit issues or pull requests to the repository.

# useMediaDevices Hook

`useMediaDevices` is a React hook that offers an easy way to access and monitor media devices like cameras, microphones, and speakers. It not only lists all available media input and output devices but also manages user permissions to retrieve detailed device information.

## Features

- **Device Enumeration**: Enumerates all available media devices with details like labels, kinds, and IDs.
- **Optional Permission Handling**: Optionally prompts the user for access to media devices to retrieve full device information.
- **Loading State**: Provides a loading state indicating the process of retrieving media devices.
- **Error Handling**: Offers comprehensive error handling if media devices cannot be accessed or are not available.
- **Server-Side Rendering (SSR) Compatibility**: Designed to be safely executed in a server-side rendering environment, gracefully handling the absence of browser-specific APIs.

## Installation

### Installing This Hook Individually

```bash
npm install @custom-react-hooks/use-media-devices
```

or

```bash
yarn add @custom-react-hooks/use-media-devices
```

### Installing the Complete Hooks Package

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

```tsx
import React from 'react';
import { useMediaDevices } from '@custom-react-hooks/all';

const MediaDevicesComponent = () => {
  const { devices, isLoading, error } = useMediaDevices(false);

  if (isLoading) {
    return <div>Loading devices...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="media-devices">
      <h2>Available Media Devices</h2>
      {devices.length === 0 ? (
        <div>No devices found.</div>
      ) : (
        <ul>
          {devices.map((device) => (
            <li key={device.id}>
              <strong>{device.kind}:</strong> {device.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MediaDevicesComponent;
```

In this example, `useMediaDevices(true)` is used to request user permission and list all available media devices.

## API Reference

### Parameters

- `requestPermission` (optional, default = false): A boolean parameter that, when set to true, prompts the user for permission to access media devices such as the camera and microphone. If false, the hook will only list the available devices without requesting access.

### Returns object

- `devices`: An array of `MediaDevice` objects, each representing an available media device. Each `MediaDevice` object contains the following properties:
  - `id`: A string representing the unique identifier of the device.
  - `kind`: A string indicating the type of the device (e.g., 'videoinput', 'audioinput', 'audiooutput').
  - `label`: A string representing the label of the device, or 'Unknown Device' if the label is unavailable.
- `isLoading`: A boolean indicating whether the hook is currently in the process of loading the list of media devices.
- `error`: A string representing an error message if an error occurred while fetching the list of devices, or `null` if no error occurred.

## Use Cases
 
- **Device Selection**: Let users select from available input/output devices for media capture.
- **Feature Accessibility**: Check for the availability of media devices for features like video calls.
- **Dynamic Device Updates**: Update the UI when new devices are connected or disconnected.
- **Permission Management**: Manage user permissions for accessing media devices.

## Contributing

We welcome contributions to enhance `useMediaDevices`. For bug reports or feature suggestions, please open issues or submit pull requests to our repository.

# useMediaQuery Hook

The `useMediaQuery` hook is designed for responsive design in React applications. It enables components to adapt to different screen sizes or respond to media query changes.

## Features

- **Dynamic Media Queries:** Accepts any valid CSS media query string.
- **SSR Compatibility:** Safe for server-side rendering, as it checks for the availability of the `window` object.
- **Efficient and Optimized:** Only updates component state when media query match status changes.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-media-query
```

or

```bash
yarn add @custom-react-hooks/use-media-query
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

Import and use the `useMediaQuery` hook in your React components:

```typescript
import { useMediaQuery } from '@custom-react-hooks/all';

const MediaQueryComponent = () => {
  const isWide = useMediaQuery('(min-width: 600px)');

  return (
    <div>
      {isWide ? 'Wide viewport detected' : 'Narrow viewport detected'}
      <br />
      <span>
        <i>Resize to see the effect</i>
      </span>
    </div>
  );
};

export default MediaQueryComponent;
```

## API Reference

### Parameters
- `query`: A string representing the media query to evaluate.

## Use Cases 

- **Responsive Design**: Dynamically adjust the layout or functionality based on viewport size.
- **Dark Mode Toggle**: Switch between light and dark themes based on user's system preferences.
- **Adaptive Rendering**: Render different components or content based on media query matches.
- **Performance Optimization**: Load resources conditionally based on the media query (e.g., images for mobile).

## Contributing

Contributions to enhance the `useMediaQuery` hook are welcome. Feel free to submit issues or pull requests to the repository.

# useMouse Hook

The `useMouse` hook is designed for tracking the mouse position within a specified element in React applications. It's enhanced to provide additional features such as offsetting the mouse position and avoiding edges of the screen, which is useful for tooltips and other floating elements.

## Features

- **Dynamic Mouse Position Tracking:** Captures the mouse's x and y coordinates within the target element.
- **Offset and Edge Avoidance:** Supports offsetting the mouse position and adjusting it to avoid going off the screen edges.
- **TypeScript Support:** Strongly typed for better integration with TypeScript projects.
- **Flexible and Customizable:** Provides options for customizing offset values and tooltip dimensions.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-mouse
```

or

```bash
yarn add @custom-react-hooks/use-mouse
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
import React, { useRef } from 'react';
import { useMouse } from '@custom-react-hooks/all';

const Tooltip = ({ mousePosition, isVisible }) => {
  const { window, document } = useFrame();
  const tooltipRef = useRef(null);

  const positionStyles = useMemo(() => {
    const style = { display: isVisible ? 'block' : 'none' };

    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let newX = mousePosition.x;
      let newY = mousePosition.y;

      if (newX + tooltipRect.width > window.innerWidth) {
        newX -= tooltipRect.width;
      }

      if (newY + tooltipRect.height > window.innerHeight) {
        newY -= tooltipRect.height;
      }

      style.left = `${newX}px`;
      style.top = `${newY}px`;
    }

    return style;
  }, [mousePosition, isVisible]);

  return (
    <div
      ref={tooltipRef}
      style={positionStyles}
    >
      X: <span>{mousePosition.x}</span>,
      Y: <span>{mousePosition.y}</span>
    </div>
  );
};

const MouseComponent = () => {
  const boxRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipOptions = {
    offsetX: 15,
    offsetY: 15,
    avoidEdges: true,
    tooltipWidth: 120,
    tooltipHeight: 50,
  };
  const mousePosition = useMouse(boxRef, tooltipOptions);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  return (
    <div className="center">
      <div
        ref={boxRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover over this box
      </div>
      <Tooltip
        mousePosition={mousePosition}
        isVisible={isTooltipVisible}
      />
    </div>
  );
};

export default MouseComponent;
```

In this TypeScript example, the `useMouse` hook is used to track the mouse position within a `div` element and adjust the position of a tooltip or pop-up element accordingly.

## API Reference

### Parameters

- `ref`: A React `RefObject` pointing to the target element that the mouse position will be relative to.
- `options`: Configuration object for the mouse position adjustments with the following properties:
  - `offsetX`: The horizontal offset added to the mouse position.
  - `offsetY`: The vertical offset added to the mouse position.
  - `avoidEdges`: Boolean that indicates whether the tooltip position should be adjusted to avoid the edges of the screen or the target element.
  - `tooltipWidth`: (Optional) The width of the tooltip element, used in calculating edge avoidance.
  - `tooltipHeight`: (Optional) The height of the tooltip element, used in calculating edge avoidance.
  - `relativeToWindow`: (Optional) Boolean that indicates whether the mouse position should be calculated relative to the window instead of the target element. If not provided, it defaults to `false`.

### Returns

- An object containing the adjusted mouse position and additional information:
  - `x`: The calculated x-coordinate for the tooltip position.
  - `y`: The calculated y-coordinate for the tooltip position.
  - `position`: A string indicating the tooltip's position relative to the cursor. Possible values are `'bottomRight'`, `'bottomLeft'`, `'topRight'`, and `'topLeft'`.

## Use Cases

- **Custom Tooltips**: Display tooltips that follow the mouse cursor.
- **Interactive Canvas**: Implement interactive features on a canvas element based on mouse position.
- **UI Enhancements**: Enhance UI elements with mouse-over effects or interactions.
- **Mouse Tracking**: Track mouse movements for user behavior analysis or interactive games.

## Contributing

Contributions to enhance `useMouse` are welcome. Please feel free to submit issues or pull requests to the repository.

# useOnScreen Hook

The `useOnScreen` hook utilizes the Intersection Observer API to detect if an element is visible within the viewport. It's ideal for scenarios such as lazy loading images, triggering animations on scroll, and implementing features like infinite scroll.

## Features

- **Visibility Detection:** Determines if an element is currently visible in the viewport.
- **Memoization of Observer:** Efficient use of resources by memoizing the Intersection Observer instance.
- **One-time Observation:** Option to unobserve the element after it becomes visible for the first time.
- **Customizable Observer Options:** Supports threshold, root, and root margin options for the observer.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-on-screen
```

or

```bash
yarn add @custom-react-hooks/use-on-screen
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

Import and use the `useOnScreen` hook in your React components. You can also specify whether the element should be unobserved after first being visible by setting the `once` parameter.

```typescript
import { useOnScreen } from '@custom-react-hooks/all';

const OnScreenComponent = () => {
  const { ref, isIntersecting } = useOnScreen({ threshold: 1 }, false);

  return (
    <div ref={ref}>
      {isIntersecting ? 'Element is visible!' : 'Scroll down...'}
    </div>
  );
};

export default OnScreenComponent;
```

## API Reference

### Parameters
- `options`: Optional `IntersectionObserverInit` object to customize the observer.
- `once`: Boolean flag indicating if the element should be unobserved after it becomes visible for the first time.

### Returns
- `ref`: Ref object to be attached to the element you want to observe.
- `isIntersecting`: Boolean indicating whether the observed element is in the viewport.

## Use Cases

- **Lazy Loading**: Load content (like images or videos) only when they enter the viewport.
- **Animation on Scroll**: Trigger animations or transitions when an element comes into view.
- **Infinite Scrolling**: Load more content as the user scrolls down a page.
- **Visibility Tracking**: Track which components are visible on the screen for analytics.

## Contributing

Your contributions to enhance `useOnScreen` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality and performance.

# useOrientation Hook

The `useOrientation` hook is designed for both React web and mobile applications, providing a comprehensive solution to monitor and respond to orientation changes. This hook can track the orientation of the device or a specific HTML element, offering valuable data for responsive and dynamic UIs.

## Features

- **Dynamic Orientation Tracking:** Continuously updates with the device's current orientation angle and type, as well as the orientation of a specified element.
- **Versatile Usage:** Capable of tracking either the device's window or a specified element's orientation.
- **Detailed Information:** Provides orientation angle, type (landscape or portrait), aspect ratio, and orientation state of the referenced element.
- **Server-Side Rendering (SSR) Compatibility:** Handles environments without a `window` object, making it suitable for server-side rendering.

## Installation

### Install Specific Hook

```bash
npm install @custom-react-hooks/use-orientation
```

or

```bash
yarn add @custom-react-hooks/use-orientation
```

### Install Complete Hook Collection

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage Example

```typescript
import React, { useRef } from 'react';
import { useOrientation } from '@custom-react-hooks/all';

const OrientationComponent = () => {
  const elementRef1 = useRef(null);
  const elementRef2 = useRef(null);

  const elementOrientation1 = useOrientation(elementRef1, false);
  const elementOrientation2 = useOrientation(elementRef2, false);
  const windowOrientation = useOrientation(undefined, true);

  return (
    <div>
      <div ref={elementRef1}>
        <strong>Element 1: </strong> {elementOrientation1.elementOrientation}
        <br />
        <strong>Aspect Ratio:</strong>
        {elementOrientation1.aspectRatio ? elementOrientation1.aspectRatio.toFixed(2) : 0}
      </div>
      <div ref={elementRef2}>
        <strong>Element 2: </strong>
        {elementOrientation2.elementOrientation}
        <br />
        <strong>Aspect Ratio:</strong>
        {elementOrientation2.aspectRatio ? elementOrientation2.aspectRatio.toFixed(2) : 0}
      </div>
      <p>Window Orientation: {windowOrientation.type}</p>
    </div>
  );
};

export default OrientationComponent;
```

In this example, the `useOrientation` hook is used to monitor the orientation of both the device's window and a specific image element.

## API Reference

### Parameters
  - `elementRef` (Optional): A React `RefObject` to an HTML element.
  - `trackWindow` (Optional): Boolean to track the device's window orientation.

### Returns
  - `angle`: The current orientation angle of the device or element in degrees.
  - `type`: The orientation type (`'landscape-primary'`, `'landscape-secondary'`, `'portrait-primary'`, `'portrait-secondary'`).
  - `aspectRatio`: The aspect ratio of the referenced element (if provided).
  - `elementOrientation`: The orientation of the referenced element (`'landscape'` or `'portrait'`).

## Use Cases

- **Responsive Design**: Adjust layouts and UI elements based on device orientation.
- **Device Orientation Features**: Implement features that depend on device orientation, like games or 3D views.
- **Element-Specific Orientation**: Change the functionality or display of specific elements based on their orientation.
- **Aspect Ratio Detection**: Detect and respond to changes in the aspect ratio of an element.

## Contributing

We welcome contributions to improve `useOrientation`. Feel free to submit issues or pull requests to the repository for enhancements, bug fixes, or documentation improvements.

# usePermission Hook

`usePermission` is a React hook designed to query and monitor the status of user permissions for various browser APIs such as geolocation, notifications, microphone, and camera.

## Features

- **Permission Querying**: Queries the status of a specified permission.
- **Real-time Updates**: Monitors and updates the permission status in real-time if it changes.
- **Error Handling**: Provides error messages if the Permissions API is not supported or if an error occurs during the query.
- **SSR Compatibility**: Executes safely in a server-side rendering environment by avoiding direct browser API calls during SSR.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-permission
```

or

```bash
yarn add @custom-react-hooks/use-permission
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

```tsx
import React, { useState } from 'react';
import { usePermission } from '@custom-react-hooks/all';

const PermissionComponent = () => {
  const [selectedPermission, setSelectedPermission] = useState('geolocation');
  const { state, isLoading, error } = usePermission(selectedPermission);

  return (
    <div>
      <h2>Check Browser Permission Status</h2>
      <label htmlFor="permission-select">Choose a permission: </label>
      <select
        id="permission-select"
        value={selectedPermission}
        onChange={(e) => setSelectedPermission(e.target.value)}
      >
        <option value="geolocation">Geolocation</option>
        <option value="notifications">Notifications</option>
        <option value="microphone">Microphone</option>
        <option value="camera">Camera</option>
      </select>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Permission status for {selectedPermission}:
            <span> {state}</span>
          </p>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default PermissionComponent;
```

## API Reference

### Parameters
  - `permissionName`: A string that represents the permission to query. It must be one of the supported permission names defined by the Permissions API.

### Returns
  - `state`: A string representing the permission state (`'prompt'`, `'granted'`, or `'denied'`).
  - `isLoading`: A boolean indicating if the permission query is in progress.
  - `error`: A string containing an error message if the query fails or if the Permissions API is not supported.

## Use Cases

- **Feature Availability Checks**: Check if a user has granted permission for features like geolocation, notifications, or camera access.
- **Conditional Feature Access**: Enable or disable features based on permission status.
- **User Permission Management**: Prompt users for necessary permissions or provide feedback on their status.
- **Privacy Compliance**: Ensure compliance with privacy practices by checking permissions before accessing sensitive features.

## Contributing

We welcome contributions to `usePermission`. Please report bugs or suggest feature enhancements through issues or pull requests in the project's repository.

# usePortal Hook

The `usePortal` hook facilitates the creation and management of portal components in React applications. Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This hook is particularly useful for rendering modals, dropdowns, and tooltips.

## Features

- **Dynamic Portal Creation:** Automatically creates and manages a DOM element for the portal.
- **Simple State Management:** Provides functions to open and close the portal, along with a state variable to track its visibility.
- **Easy Integration:** Can be integrated seamlessly with existing React components.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-portal
```

or

```bash
yarn add @custom-react-hooks/use-portal
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

Import the `usePortal` hook and use it in your React components to manage portals:

```typescript
import { usePortal } from '@custom-react-hooks/all';

const PortalComponent = () => {
  const { openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      <button onClick={closePortal}>
        Close Portal
      </button>
      {isOpen && <div className="modal">This is portal content</div>}
    </div>
  );
};

export default PortalComponent;
```

In this example, the `usePortal` hook is used to render a modal-like component. The portal can be opened and closed using the provided functions.

## API Reference

### Returns
- `Portal`: A component for rendering the portal's children. It only renders its children when the portal is open.
- `openPortal`: A function to open the portal.
- `closePortal`: A function to close the portal.
- `isOpen`: A state variable indicating whether the portal is currently open.

## Use Cases

- **Modals and Dialogs**: Render modals, popups, or dialogs in a DOM node outside of the parent component's hierarchy.
- **Tooltips and Popovers**: Create tooltips or popovers that need to break out of their parent's z-index or overflow context.
- **Layered UI Elements**: Manage layered UI elements like notifications or full-screen overlays.
- **Dynamic Content Rendering**: Render content dynamically in different parts of the document for layout or styling purposes.

## Contributing

Contributions to improve `usePortal` are welcome. If you have suggestions or enhancements, feel free to submit issues or pull requests to the repository.

# useScript Hook

The `useScript` hook is an advanced tool for dynamically loading and managing external scripts in React applications. It supports loading multiple scripts, handling load and error events, custom script attributes, and optional script removal.

## Features

- **Multiple Script Support:** Can handle an array of script sources.
- **Event Callbacks:** Provides `onLoad` and `onError` callbacks for handling respective script events.
- **Custom Script Attributes:** Allows setting attributes like `defer`, `async`, or custom `data-*` attributes.
- **Optional Script Removal:** Can remove script tags from the DOM on component unmount.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-script
```

or

```bash
yarn add @custom-react-hooks/use-script
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

Import the `useScript` hook and use it in your React components. You can specify multiple scripts and custom attributes:

```typescript
import { useScript } from '@custom-react-hooks/all';

const ScriptComponent = () => {
  const status = useScript(
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.js',
  );

  const triggerConfetti = () => {
    if (status === 'ready' && window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div>
      <h1>Confetti Script Loader</h1>

      <p>Script Loading Status: {status}</p>

      <button
        onClick={triggerConfetti}
        disabled={status !== 'ready'}
      >
        Trigger Confetti
      </button>
      {status === 'error' && (
        <p>Failed to load the script. Please check the URL.</p>
      )}
    </div>
  );
};

export default ScriptComponent;
```

In this example, the hook loads multiple scripts with additional attributes and provides callbacks for load and error events.

## API Reference

### Parameters
- `src`: A string or an array of strings representing the script source URLs.
- `options`: An object containing:
  - `onLoad`: Callback function triggered when the script loads.
  - `onError`: Callback function triggered on script load error.
  - `removeOnUnmount`: Boolean indicating whether to remove the script tags on unmount.
  - Additional attributes (e.g., `defer`, `async`) to be set on the script tags.

### Returns
  - `src`: Script source URL.
  - `status`: Load status of the script (`'loading'`, `'ready'`, or `'error'`).

## Use Cases

- **Third-Party Integrations**: Load external libraries or widgets, like social media sharing buttons or analytics scripts.
- **Conditional Script Loading**: Load scripts only when certain conditions are met, optimizing performance.
- **Feature Enhancement**: Enhance your application with additional features available via external scripts.
- **Asynchronous Script Loading**: Manage asynchronous loading of scripts without blocking the rendering of your application.

## Contributing

Contributions to enhance the `useScript` hook are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.

# useStatus Hook

The `useStatus` hook is designed to monitor the network status of a user's device in React applications. It provides real-time information on whether the user is online or offline and includes additional network details when available.

## Features

- **Network Connection Status:** Detects and reports the user's online or offline status.
- **Network Information Tracking:** When available, provides additional network information such as downlink speed, effective connection type, and round-trip time.
- **Real-Time Updates:** Listens to changes in the network status and updates the information accordingly.
- **TypeScript Compatibility:** Includes TypeScript definitions to handle non-standard browser APIs like the Network Information API.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-status
```

or

```bash
yarn add @custom-react-hooks/use-status
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

Import and use the `useStatus` hook in your React components to get network status:

```typescript
import { useStatus } from '@custom-react-hooks/all';

const StatusComponent = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <h1>Network Status</h1>
      <p>{online ? 'Online' : 'Offline'}</p>
      {downlink && (
        <p>
          Downlink Speed:
          <span>{downlink}Mbps</span>
        </p>
      )}
      {effectiveType && (
        <p>
          Effective Type:
          <span>{effectiveType}</span>
        </p>
      )}
      {rtt && (
        <p>
          RTT: <span>{rtt}ms</span>
        </p>
      )}
    </div>
  );
};

export default StatusComponent;
```

In this example, the hook provides the current network status along with additional network information if the user is online.

## API Reference

### Returns
  - `online`: Boolean indicating if the user is online.
  - `downlink`: The downlink speed in Mbps (optional).
  - `effectiveType`: The effective type of the network connection (e.g., '4g', '3g') (optional).
  - `rtt`: The round-trip time in milliseconds (optional).

## Use Cases

- **Online/Offline Indicators**: Display indicators showing whether the user is currently online or offline.
- **Adaptive Content Loading**: Adjust the amount of data loaded based on network speed (e.g., lower-quality images for slow connections).
- **Handling Disconnections**: Gracefully handle disconnections, e.g., by saving user progress or pausing activities.
- **User Experience Optimization**: Optimize user experience based on network conditions, such as simplifying interfaces under poor connectivity.

## Contributing

Contributions to improve `useStatus` are welcome. Feel free to submit issues or pull requests to the repository.

# useStep Hook

`useStep` is a custom React hook designed for handling step-based logic in applications, such as wizards or multi-step forms. It manages the current step and provides navigation functionality.

## Features

- **Step Navigation:** Manages the current step and provides functions for navigating between steps.
- **Boundary Control:** Ensures navigation stays within the defined steps, with an optional looping feature.
- **Customizable Step Controls:** Offers functions for specific, next, previous, and reset step actions.
- **Looping Functionality:** Optionally allows steps to loop back to the start or end.
- **SSR Safe:** Can be used in server-side rendered applications.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-step
```

or

```bash
yarn add @custom-react-hooks/use-step
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
import React from 'react';
import { useStep } from '@custom-react-hooks/all';

const StepComponent = ({ totalSteps, initialStep, loop }) => {
  const { currentStep, nextStep, prevStep, reset } = useStep({ initialStep, totalSteps, loop });

  return (
    <div>
      <h2>Current Step: {currentStep}</h2>
      <div>
        <button onClick={prevStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default StepComponent;
```

## API Reference

### Parameters
- `initialStep`: (optional) The starting step index.
- `totalSteps`: The total number of steps.
- `loop`: (optional) A boolean indicating if navigation should loop around.

### Returns
  - `currentStep`: The index of the current step.
  - `goToStep`: Function to navigate to a specific step.
  - `nextStep`: Function to go to the next step.
  - `prevStep`: Function to go to the previous step.
  - `reset`: Function to reset to the initial step.

## Use Cases

- **Wizard or Form Navigation**: Navigate through multi-step forms or wizards, like checkout processes or surveys.
- **Step-by-Step Guides**: Create step-by-step user guides or tutorials.
- **Progress Tracking**: Track and display progress in a multi-step process.
- **Looping Slideshows or Carousels**: Control the navigation of items in a looping carousel or slideshow.

## Contributing

Contributions to improve `useStep` are welcome. Please feel free to submit issues or pull requests to the repository.

# useStorage Hook

`useStorage` is a versatile hook for interacting with Web Storage (localStorage and sessionStorage) in React applications. It simplifies storage operations and ensures compatibility with server-side rendering.

## Features

- **LocalStorage and SessionStorage:** Works with both `localStorage` and `sessionStorage`.
- **Server-Side Rendering Support:** Safely handles server-side rendering scenarios.
- **Automatic JSON Handling:** Automatically serializes and deserializes stored values.
- **Synchronized State:** Keeps the React state in sync with storage changes.
- **Error Handling:** Provides error handling for storage access and manipulation.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-storage
```

or

```bash
yarn add @custom-react-hooks/use-storage
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
import React from 'react';
import { useStorage } from '@custom-react-hooks/all';

const StorageList = ({ storageType }: { storageType: 'local' | 'session' }) => {
  const [items, setItems] = useStorage(`${storageType}-items`, [], storageType);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.currentTarget.value) {
            addItem(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        placeholder={`Add to ${storageType} storage`}
      />
      <h2>{storageType === 'local' ? 'LocalStorage' : 'SessionStorage'} List</h2>
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item} <XCircleIcon onClick={() => removeItem(index)} />
          </li>
        ))}
      </ol>
    </div>
  );
};

const StorageComponent = () => (
  <div className="storage">
    <StorageList storageType="local" />
    <StorageList storageType="session" />
  </div>
);

return default StorageComponent;
```

In this example, the hook manages a value in `localStorage`, providing functions to read and update it.

## API Reference

### Parameters
- `key`: The key under which to store the value in storage.
- `defaultValue`: The default value to use if no item is found in storage.
- `storageType`: Type of storage to use (`'local'` for `localStorage`, `'session'` for `sessionStorage`).

### Returns
- Returns an array with the stored value and a setter function to update it.

## Use Cases

- **State Persistence**: Persist state between page reloads, such as user preferences or session data.
- **Form Data Saving**: Save form data in the browser to prevent loss on page refresh.
- **Local Data Caching**: Cache data locally to reduce API calls and improve loading times.
- **Feature Toggling**: Store feature flags or toggles in the browser for conditional feature rendering.

## Contributing

Contributions to enhance `useStorage` are welcome. Feel free to submit issues or pull requests to the repository.

# useThrottle Hook

The `useThrottle` hook in React is designed to limit the rate at which a function can be executed, making it ideal for handling events that fire rapidly, such as scrolling, resizing, or continuous keypresses.

## Features

- **Throttle Control:** Limits the frequency of function execution to improve performance and reduce resource usage.
- **Immediate Execution Option:** Executes the function immediately on the first call and then applies the throttle to subsequent calls.
- **State Tracking:** Monitors the throttling status to manage the function execution effectively.
- **SSR Compatibility:** Safe for server-side rendering as it does not depend on browser-specific APIs.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-throttle
```

or

```bash
yarn add @custom-react-hooks/use-throttle
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
import { useThrottle } from '@custom-react-hooks/all';

const ThrottleComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const throttledValue = useThrottle(inputValue, 1000);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Throttled Input Example</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <p>Input Value: {inputValue}</p>
      <p>Throttled Value: {throttledValue}</p>
    </div>
  );
};

export default ThrottleComponent;
```

In this example, `useThrottle` is used to throttle the execution of a function handling the scroll event, thereby enhancing performance.

## API Reference

### Parameters
- `callback`: The function to be throttled.
- `limit`: The time limit (in milliseconds) that determines how often the `callback` can be executed.
- `immediate`: (optional) A boolean indicating whether to execute the function immediately on the first call.

### Returns
- Returns a throttled version of the provided function.

## Use Cases

- **Input Rate Limiting**: Limit the rate at which input values are processed, useful in search inputs or sliders.
- **Performance Optimization**: Reduce the number of updates in response to frequent events like window resizing or scrolling.
- **Data Fetching**: Throttle API calls made in response to user input or other rapidly changing states.

## Contributing

Contributions to improve `useThrottle` are welcome. Feel free to submit issues or pull requests to enhance its functionality and usability.

# useTimeout Hook

`useTimeout` is a custom React hook that manages timeouts. It provides a straightforward way to handle actions that should occur after a delay, with the ability to start, reset, and stop the timeout.

## Features

- **Timeout Control:** Start, reset, and clear timeouts with simple API calls.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments, avoiding calls to `setTimeout` on the server.
- **Automatic Cleanup:** Automatically clears the timeout to prevent memory leaks when the component unmounts or when the timeout is stopped.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-timeout
```

or

```bash
yarn add @custom-react-hooks/use-timeout
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
import { useTimeout } from '@custom-react-hooks/all';

const TimeoutComponent = () => {
  const [message, setMessage] = useState('');
  const showMessage = () => setMessage('Hello! The timeout has completed.');

  const { isActive, reset, clear } = useTimeout(showMessage, 3000);

  const handleStart = () => {
    setMessage('');
    reset();
  };

  const resetMessage = () => {
    clear();
    setMessage('');
  };

  return (
    <div className="center">
      <h2>Timeout Example</h2>
      <div className="btns">
        <button
          onClick={handleStart}
          disabled={isActive}
        >
          {isActive ? 'Timeout is active...' : 'Start Timeout'}
        </button>
        <button
          onClick={resetMessage}
          disabled={!isActive}
        >
          Clear Timeout
        </button>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default TimeoutComponent;
```

In this example, `useTimeout` is used to manage a timeout that triggers a function after a specified delay.

## API Reference

### Parameters
- `callback`: The function to be executed after the timeout.
- `delay`: The delay in milliseconds before the timeout is triggered. Pass `null` to deactivate the timeout.

### Returns
  - `isActive`: Boolean indicating if the timeout is currently active.
  - `reset`: Function to start or restart the timeout.
  - `clear`: Function to stop the timeout.

## Use Cases 

- **Delayed Actions**: Perform actions after a specified delay, like showing a tooltip or closing a modal.
- **Debouncing User Input**: Implement a delay in processing input to wait for user typing to pause or finish.
- **Timeout-based Transitions**: Create animations or transitions that are triggered after a timeout.
- **Polling Mechanism**: Set up a polling mechanism where a function is executed repeatedly with a delay.

## Contributing

Contributions to improve `useTimeout` are welcome. Feel free to submit issues or pull requests to the repository.

# useToggle Hook

`useToggle` is a custom React hook for managing boolean states with enhanced control. It provides a simple and efficient way to toggle a boolean state and execute a callback function in response to the state changes.

## Features

- **Simple State Toggle:** Easily toggle a boolean state between `true` and `false`.
- **Direct State Control:** Functions to explicitly set the state to `true` or `false`.
- **Callback Execution:** Executes a callback function whenever the state changes.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-toggle
```

or

```bash
yarn add @custom-react-hooks/use-toggle
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
import { useToggle } from '@custom-react-hooks/all';

const ToggleComponent = () => {
  const { value, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div>
      <div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={setTrue}>
          Set True
        </button>
        <button onClick={setFalse}>
          Set False
        </button>
      </div>
      {value && <h2>Message Visible</h2>}
    </div>
  );
};

export default ToggleComponent;
```

In this example, `useToggle` is used to manage a boolean state. A callback function is provided to log the new state whenever it changes.

## API Reference

### Parameters
- `initialValue`: (optional) The initial boolean value (default is `false`).
- `onToggle`: (optional) A callback function that gets called with the new value whenever the toggle state changes.

### Returns
  - `value`: The current boolean value.
  - `toggle`: Function to toggle the value.
  - `setTrue`: Function to set the value to true.
  - `setFalse`: Function to set the value to false.

## Use Cases 

- **Toggle UI Elements**: Manage the state of toggleable UI elements like dropdowns, modals, or switches.
- **Feature Flags**: Implement feature toggling within your application for enabling or disabling features.
- **Conditional Rendering**: Control the rendering of components based on a toggle state.
- **User Preferences**: Manage user preferences such as dark mode or layout options.

## Contributing

Contributions to enhance `useToggle` are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.

# useUpdateEffect Hook

The `useUpdateEffect` hook is an enhanced version of React's `useEffect` that is triggered only when dependencies update, skipping the effect on the component's initial mount. It's particularly useful for effects that need to run in response to specific changes after the initial rendering.

## Features

- **Skips Initial Render:** Executes the effect only on updates, not during the initial component mount.
- **Custom Cleanup Function:** Similar to `useEffect`, it allows for a cleanup function to be returned from the effect.
- **Compatible with SSR:** Designed to work seamlessly in server-side rendering environments.

## Installation

### Installing Specific Hook

```bash
npm install @custom-react-hooks/use-update-effect
```

or

```bash
yarn add @custom-react-hooks/use-update-effect
```

### Installing Complete Package

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
import { useUpdateEffect } from '@custom-react-hooks/all';

const UpdateEffectComponent = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useUpdateEffect(() => {
    setMessage(`Effect ran at count: ${count}`);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <p>Count: {count}</p>
      <p>{message}</p>
    </div>
  );
};

export default UpdateEffectComponent;
```

## API Reference

### Parameters
- `effect` (EffectCallback): The effect function to execute upon updates.
- `deps` (DependencyList): An array of dependencies that, when changed, trigger the effect.

## Use Cases

- **Conditional Execution:** Run effects based on specific conditions or changes.
- **Efficient Updates:** Optimize component behavior by limiting effects to only necessary renders.

## Contributing

Contributions to `useUpdateEffect` are welcome. Please submit issues or pull requests to enhance its functionality or address any concerns.

# useWindowSize Hook

The `useWindowSize` hook is designed for responsive React applications, providing an easy way to track changes in window size. It includes debouncing for performance optimization and is compatible with server-side rendering.

## Features

- **Responsive Design Support:** Facilitates the development of responsive components.
- **Debounced Resize Events:** Limits the frequency of resize event handling to improve performance.
- **SSR Compatibility:** Safely handles scenarios where the `window` object is not available, such as server-side rendering.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-window-size
```

or

```bash
yarn add @custom-react-hooks/use-window-size
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
import { useWindowSize } from '@custom-react-hooks/all';

const WindowSizeComponent = () => {
  const { width, height } = useWindowSize(100);

  return (
    <div>
      <h2>Current Window Size:</h2>
      <div>
        <p>
          Width: <span>{width}</span>
        </p>
        <p>
          Height: <span>{height}</span>
        </p>
      </div>
    </div>
  );
};
export default WindowSizeComponent;
```

In this example, the `useWindowSize` hook is used to track the size of the browser window. The debounce delay is set to 200 milliseconds to optimize performance.

## API Reference

### Parameters
- `debounceDelay`: (optional) The delay in milliseconds for debouncing the resize event.

### Returns
  - `width`: The current width of the window.
  - `height`: The current height of the window.


## Use Cases

- **Responsive Components**: Create components that respond to changes in window size.
- **Layout Adjustments**: Adjust layout dynamically based on the window size, enhancing responsiveness.
- **Visibility Control**: Show or hide elements based on the available viewport size.
- **Size-Dependent Functionality**: Implement functionality that depends on the size of the window, like different navigation styles for mobile and desktop.

## Contributing

Contributions to enhance `useWindowSize` are welcome. Feel free to submit issues or pull requests to the repository.

# useNetwork Hook

The `useNetwork` hook is designed for monitoring network status and connection information in React applications. It provides real-time information about the user's network connection including online/offline status, connection speed, and connection type.

## Features

- **Network Status Monitoring:** Tracks online/offline status in real-time.
- **Connection Information:** Provides detailed network connection data when available.
- **Automatic Updates:** Listens for network changes and updates state accordingly.
- **Cross-Browser Support:** Works with different browser implementations of the Network Information API.
- **SSR Compatibility:** Safe for server-side rendering environments.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-network
```

or

```bash
yarn add @custom-react-hooks/use-network
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
import React from 'react';
import { useNetwork } from '@custom-react-hooks/all';

const NetworkComponent = () => {
  const { online, downlink, effectiveType, rtt } = useNetwork();

  return (
    <div>
      <h2>Network Status</h2>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
      
      {online && (
        <div>
          {downlink && <p>Downlink Speed: {downlink} Mbps</p>}
          {effectiveType && <p>Connection Type: {effectiveType}</p>}
          {rtt && <p>Round Trip Time: {rtt}ms</p>}
        </div>
      )}
    </div>
  );
};

export default NetworkComponent;
```

## API Reference

### Returns

An object containing the following properties:

- `online` (boolean): Indicates if the user is currently online.
- `downlink` (number, optional): Effective bandwidth estimate in megabits per second.
- `effectiveType` ('slow-2g' | '2g' | '3g' | '4g', optional): Effective connection type.
- `rtt` (number, optional): Estimated effective round-trip time in milliseconds.

## Use Cases

- **Adaptive Content Loading**: Adjust content quality based on connection speed.
- **Offline Handling**: Provide appropriate UI when the user goes offline.
- **Data Usage Optimization**: Respect user's data saving preferences.

## Contributing

Contributions to enhance `useNetwork` are welcome. Feel free to submit issues or pull requests to the repository.

# usePrevious Hook

The `usePrevious` hook is a simple yet powerful utility that stores the previous value of a state or prop. It's particularly useful for comparing current and previous values in effects, implementing animations based on value changes, or tracking state transitions.

## Features

- **Simple Value Tracking:** Stores the previous value of any data type.
- **Type Safe:** Full TypeScript support with generic typing.
- **Memory Efficient:** Uses a single ref to store the previous value.
- **Universal Compatibility:** Works with any data type (primitives, objects, arrays).
- **SSR Safe:** No side effects during server-side rendering.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-previous
```

or

```bash
yarn add @custom-react-hooks/use-previous
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
import { usePrevious } from '@custom-react-hooks/all';

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>Previous count: {previousCount ?? 'None'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default CounterComponent;
```

## API Reference

### Parameters

- `value` (T): The current value to track. Can be of any type.

### Returns

- `T | undefined`: The previous value. Returns `undefined` on the first render.

## Use Cases

- **Value Comparison**: Compare current and previous values in effects or render logic.
- **Animation Triggers**: Trigger animations based on value changes.
- **Optimization**: Prevent unnecessary API calls or expensive operations when values haven't changed.

## Contributing

Contributions to enhance `usePrevious` are welcome. Feel free to submit issues or pull requests to the repository.

# useWebSocket Hook

The `useWebSocket` hook is a simple yet powerful utility for managing WebSocket connections in React applications. It provides an easy way to connect to WebSocket servers, send messages, and handle connection states with optional reconnection functionality.

## Features

- **Simple WebSocket Management:** Easy connection setup and message handling.
- **Connection State Tracking:** Real-time connection status monitoring.
- **Automatic Reconnection:** Optional reconnection with configurable attempts and intervals.
- **Event Callbacks:** Support for onOpen, onClose, onMessage, and onError callbacks.
- **Protocol Support:** Support for WebSocket subprotocols.
- **SSR Safe:** Handles server-side rendering environments gracefully.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-websocket
```

or

```bash
yarn add @custom-react-hooks/use-websocket
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
import { useWebSocket } from '@custom-react-hooks/all';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const { sendMessage, lastMessage, connectionStatus } = useWebSocket(
    'ws://localhost:8080',
    {
      onMessage: (event) => {
        setMessages(prev => [...prev, event.data]);
      },
    }
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>Status: {connectionStatus}</div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
```

## API Reference

### Parameters

- `socketUrl` (string | null): The WebSocket URL to connect to.
- `options` (UseWebSocketOptions, optional): Configuration options object.

### Returns

An object containing:

- `sendMessage` (function): Function to send messages through the WebSocket.
- `lastMessage` (MessageEvent | null): The last received message event.
- `connectionStatus` ('Connecting' | 'Open' | 'Closing' | 'Closed'): Human-readable connection status.

## Use Cases

- **Real-time Chat Applications**: Implement chat functionality with instant messaging.
- **Live Data Feeds**: Display real-time data updates (stock prices, sports scores, etc.).
- **Collaborative Editing**: Enable real-time collaborative features.

## Contributing

Contributions to enhance `useWebSocket` are welcome. Feel free to submit issues or pull requests to the repository.

# useCache Hook

The `useCache` hook provides a simple in-memory caching solution with TTL (Time To Live) support and automatic cleanup. It's perfect for caching API responses, computed values, or any data that you want to store temporarily in memory.

## Features

- **TTL Support:** Automatic expiration of cached entries after a specified time.
- **Size Limiting:** Configurable maximum cache size with LRU-style eviction.
- **Type Safe:** Full TypeScript support with generic typing.
- **Memory Efficient:** Automatic cleanup of expired entries.
- **Simple API:** Easy-to-use interface similar to Map/Set APIs.
- **Persistent Across Renders:** Cache persists across component re-renders.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-cache
```

or

```bash
yarn add @custom-react-hooks/use-cache
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
import { useCache } from '@custom-react-hooks/all';

const CacheExample = () => {
  const cache = useCache<string>();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSet = () => {
    if (key && value) {
      cache.set(key, value);
      setKey('');
      setValue('');
    }
  };

  const handleGet = () => {
    const cachedValue = cache.get(key);
    alert(cachedValue ? `Value: ${cachedValue}` : 'Key not found');
  };

  return (
    <div>
      <h3>Cache Demo</h3>
      <div>
        <input
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSet}>Set</button>
        <button onClick={handleGet}>Get</button>
      </div>
      <p>Cache size: {cache.size()}</p>
    </div>
  );
};

export default CacheExample;
```

## API Reference

### Parameters

- `options` (UseCacheOptions, optional): Configuration options for the cache.

### Returns

An object containing cache management functions:

- `get(key: string)`: Retrieve a value from the cache.
- `set(key: string, value: T, ttl?: number)`: Store a value in the cache.
- `has(key: string)`: Check if a key exists and is not expired.
- `delete(key: string)`: Remove a specific entry from the cache.
- `clear()`: Remove all entries from the cache.
- `size()`: Get the current number of entries.

## Use Cases

- **API Response Caching**: Cache API responses to reduce network requests.
- **Computed Value Caching**: Store results of expensive calculations.
- **User Data Caching**: Cache user profiles, preferences, or session data.

## Contributing

Contributions to enhance `useCache` are welcome. Feel free to submit issues or pull requests to the repository.

# useHistoryState Hook

The `useHistoryState` hook extends the standard `useState` with undo/redo functionality. It maintains a history of state changes and provides functions to navigate through the history, making it perfect for implementing undo/redo features in your React applications.

## Features

- **Undo/Redo Functionality:** Navigate through state history with undo and redo operations.
- **History Management:** Maintains a configurable history of state changes.
- **Functional Updates:** Supports functional state updates like regular `useState`.
- **Memory Efficient:** Configurable maximum history size to prevent memory leaks.
- **Type Safe:** Full TypeScript support with generic typing.
- **Smart History:** Prevents duplicate consecutive states from being added to history.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-history-state
```

or

```bash
yarn add @custom-react-hooks/use-history-state
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
import { useHistoryState } from '@custom-react-hooks/use-history-state';

const UndoRedoCounter = () => {
  const { state, setState, undo, redo, canUndo, canRedo } = useHistoryState(0);

  return (
    <div>
      <h2>Counter: {state}</h2>
      <div>
        <button onClick={() => setState(state + 1)}>Increment</button>
        <button onClick={() => setState(state - 1)}>Decrement</button>
      </div>
      <div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default UndoRedoCounter;
```

## API Reference

### Parameters

- `initialState` (T): The initial state value.
- `options` (UseHistoryStateOptions, optional): Configuration options.
  - `maxHistorySize` (number, optional): Maximum number of states to keep in history. Default: 50.

### Returns

An object containing:

- `state` (T): The current state value.
- `setState` (function): Function to update the state (similar to useState).
- `undo` (function): Function to undo the last state change.
- `redo` (function): Function to redo the next state change.
- `canUndo` (boolean): Whether undo operation is possible.
- `canRedo` (boolean): Whether redo operation is possible.
- `clear` (function): Function to clear the history (keeps current state).
- `history` (T[]): Array of all states in history.
- `currentIndex` (number): Current position in the history.

## Use Cases

- **Text Editors**: Implement undo/redo functionality in text editors or rich text components.
- **Drawing Applications**: Allow users to undo/redo drawing operations on canvas.
- **Form Management**: Enable users to undo form changes or navigate through form states.
- **Game Development**: Implement move history in games like chess or puzzle games.
- **Data Visualization**: Allow users to undo changes to charts or graph configurations.
- **Image Editing**: Provide undo/redo for image manipulation operations.

## Contributing

Contributions to enhance `useHistoryState` are welcome. Feel free to submit issues or pull requests to the repository.

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

## Use Cases

- **Content Sharing**: Share articles, blog posts, or any web content.
- **Social Media Integration**: Enable users to share content to social platforms.
- **File Sharing**: Share images, documents, or other files.
- **E-commerce**: Share product pages or deals.
- **Event Sharing**: Share event details or calendar invites.
- **App Promotion**: Share app download links or referral codes.

## Contributing

Contributions to enhance `useShare` are welcome. Feel free to submit issues or pull requests to the repository.

# useWorker Hook

The `useWorker` hook provides an easy way to manage Web Workers in React applications. It allows you to offload heavy computations to background threads, preventing UI blocking while maintaining a clean and simple API for communication with workers.

## Features

- **Background Processing:** Offload heavy computations to prevent UI blocking.
- **Function or URL Support:** Create workers from functions or external script files.
- **Message Handling:** Simple API for sending and receiving messages.
- **Error Handling:** Comprehensive error handling with timeout support.
- **Automatic Cleanup:** Workers are automatically terminated on component unmount.
- **Loading States:** Track worker processing state for better UX.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-worker
```

or

```bash
yarn add @custom-react-hooks/use-worker
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

### Basic Usage with Function

```typescript
import React, { useState } from 'react';
import { useWorker } from '@custom-react-hooks/use-worker';

const HeavyCalculation = () => {
  const [input, setInput] = useState(10);
  
  // Define the worker function
  const fibonacciWorker = (n: number): number => {
    const fib = (num: number): number => {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    };
    return fib(n);
  };

  const { postMessage, data, error, isLoading } = useWorker(fibonacciWorker, {
    onMessage: (result) => {
      console.log('Calculation completed:', result);
    },
    onError: (error) => {
      console.error('Worker error:', error);
    },
  });

  const handleCalculate = () => {
    postMessage(input);
  };

  return (
    <div>
      <h3>Fibonacci Calculator</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        min="1"
        max="40"
      />
      <button onClick={handleCalculate} disabled={isLoading}>
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
      
      {data !== null && <p>Result: {data}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default HeavyCalculation;
```

## API Reference

### Parameters

- `workerScript` (string | function): Either a URL to a worker script file or a function to execute in the worker.
- `options` (UseWorkerOptions, optional): Configuration options.
  - `onMessage` (function, optional): Callback fired when worker sends a message.
  - `onError` (function, optional): Callback fired when worker encounters an error.
  - `timeout` (number, optional): Timeout in milliseconds for worker operations.

### Returns

An object containing:

- `postMessage` (function): Function to send messages to the worker.
- `terminate` (function): Function to terminate the worker.
- `data` (any): Latest data received from the worker.
- `error` (string | null): Error message if worker fails.
- `isLoading` (boolean): Whether worker is currently processing.

## Use Cases

- **Heavy Calculations:** Fibonacci, prime numbers, mathematical computations.
- **Data Processing:** Large dataset transformations, sorting, filtering.
- **Image/Video Processing:** Filters, compression, format conversion.
- **Cryptographic Operations:** Hashing, encryption, mining simulations.
- **Text Processing:** Parsing, analysis, search operations.
- **Scientific Simulations:** Physics, chemistry, biology simulations.

## Contributing

Contributions to enhance `useWorker` are welcome. Feel free to submit issues or pull requests to the repository.

# useIsland Hook

The `useIsland` hook implements island architecture and selective hydration for React applications. It allows components to be hydrated only when they become visible or when explicitly triggered, improving performance by reducing initial JavaScript bundle size and execution time.

## Features

- **Selective Hydration:** Components hydrate only when needed (visibility-based or manual)
- **Island Architecture:** Implements modern island architecture patterns
- **Performance Optimization:** Reduces initial bundle size and execution time
- **Intersection Observer:** Uses modern browser APIs for efficient visibility detection
- **Priority Control:** Configure hydration priority (high, low, auto)
- **SSR Safe:** Handles server-side rendering environments gracefully

## Installation

```bash
npm install @custom-react-hooks/use-island
```

## Usage

```typescript
import React from 'react';
import { useIsland } from '@custom-react-hooks/use-island';

const HeavyComponent = () => {
  const { isVisible, isHydrated, ref, hydrate } = useIsland({
    threshold: 0.1,
    rootMargin: '50px',
    priority: 'low',
    delay: 100
  });

  return (
    <div ref={ref}>
      {isHydrated ? (
        <ExpensiveComponent />
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={hydrate}>Force Hydrate</button>
    </div>
  );
};
```

## Use Cases

- **Heavy Components:** Defer hydration of computationally expensive components
- **Below-the-fold Content:** Hydrate content only when it becomes visible
- **Performance Optimization:** Reduce initial page load time and JavaScript execution
- **Progressive Enhancement:** Gradually enhance page functionality as needed

# useOffscreen Hook

The `useOffscreen` hook provides offscreen rendering capabilities for heavy computations and rendering tasks. It allows rendering components or performing computations in the background without blocking the main thread.

## Features

- **Background Processing:** Perform heavy computations without blocking the UI
- **Priority Control:** Configure rendering priority (high, normal, low)
- **Timeout Support:** Set timeouts for long-running operations
- **Error Handling:** Comprehensive error handling for failed operations
- **Cancellation:** Cancel ongoing operations when needed

## Installation

```bash
npm install @custom-react-hooks/use-offscreen
```

## Usage

```typescript
import React from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

const HeavyRenderingComponent = () => {
  const { render, isRendering, result, error } = useOffscreen({
    priority: 'low',
    timeout: 5000
  });

  const handleHeavyRender = () => {
    render(() => {
      // Heavy computation or rendering logic
      return processLargeDataset(data);
    });
  };

  return (
    <div>
      <button onClick={handleHeavyRender} disabled={isRendering}>
        {isRendering ? 'Processing...' : 'Start Heavy Render'}
      </button>
      {result && <div>Result: {result}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
```

## Use Cases

- **Heavy Computations:** Process large datasets without blocking the UI
- **Image Processing:** Perform image manipulations in the background
- **Data Transformations:** Transform large amounts of data efficiently
- **Complex Calculations:** Execute mathematical computations without UI freezing

# useVirtual Hook

The `useVirtual` hook provides virtualization for large lists, improving performance by rendering only visible items plus a small buffer. This significantly reduces DOM nodes and improves scroll performance for large datasets.

## Features

- **List Virtualization:** Render only visible items for optimal performance
- **Dynamic Item Heights:** Support for variable item heights
- **Smooth Scrolling:** Maintain smooth scroll experience
- **Overscan Support:** Render additional items outside viewport for smoother scrolling
- **Scroll Control:** Programmatic scrolling to specific items or offsets

## Installation

```bash
npm install @custom-react-hooks/use-virtual
```

## Usage

```typescript
import React, { useRef } from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

const VirtualList = ({ items }) => {
  const parentRef = useRef();
  
  const { virtualItems, totalSize, scrollToIndex } = useVirtual(
    items.length,
    parentRef,
    {
      itemHeight: 50,
      containerHeight: 400,
      overscan: 5
    }
  );

  return (
    <div
      ref={parentRef}
      style={{
        height: 400,
        overflow: 'auto'
      }}
    >
      <div style={{ height: totalSize, position: 'relative' }}>
        {virtualItems.map(({ index, start, size }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: start,
              height: size,
              width: '100%'
            }}
          >
            {items[index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Use Cases

- **Large Lists:** Efficiently render thousands of list items
- **Data Tables:** Virtualize large data tables for better performance
- **Chat Applications:** Handle long message histories efficiently
- **File Browsers:** Display large directories without performance issues

## 🛠️ [Contributing](#contributing)

Your contributions are welcome! Please read our [Contributing Guidelines](https://github.com/djkepa/custom-react-hooks/blob/main/CONTRIBUTING.md) for details on how to submit pull requests, file bugs, and suggest enhancements.

## 🔗 [Links](#links)

- [GitHub Repository](https://github.com/djkepa/custom-react-hooks)
- [Issue Tracker](https://github.com/djkepa/custom-react-hooks/issues)

## 📄 [License](#license)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.
