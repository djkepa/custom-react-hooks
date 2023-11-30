<p align="center">
  <img src="https://i.ibb.co/ykSxVSX/custom-react-hooks-logo.png" alt="Custom React Hooks Logo"/>
</p>

<p align="center">
  <a href="https://github.com/djkepa/react-custom-hooks/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  </a>
  <a href="https://github.com/djkepa/react-custom-hooks/stargazers">
    <img src="https://img.shields.io/github/stars/djkepa/react-custom-hooks.svg" alt="GitHub Stars"/>
  </a>
  <a href="https://github.com/djkepa/react-custom-hooks/network">
    <img src="https://img.shields.io/github/forks/djkepa/react-custom-hooks.svg" alt="GitHub Forks"/>
  </a>
  <a href="https://github.com/djkepa/react-custom-hooks/issues">
    <img src="https://img.shields.io/github/issues/djkepa/react-custom-hooks.svg" alt="GitHub Issues"/>
  </a>
</p>

<div align="center">
  A collection of reusable and well-documented custom React hooks for supercharging your React applications. These hooks cover a wide range of functionalities, making it easier for you to build dynamic and interactive user interfaces.
</div>


# Custom React Hooks Library

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
npm install custom-react-hooks
```

or

```sh
yarn add custom-react-hooks
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

## 📚 [Hooks List](#hooks-list)

A list of available hooks and their respective documentation can be found below:

- [useAsync](#use-async)
- [useClickOutside](#use-click-outside)
- [useClipboard](#use-clipboard)
- [useDebounce](#use-debounce)
- [useDocumentTitle](#use-document-title)
- [useDragDrop](#use-drag-drop)
- [useEffectOnce](#use-effect-once)
- [useElementSize](#use-element-size)
- [useEventListener](#use-event-listener)
- [useFetch](#use-fetch)
- [useForm](#use-form)
- [useGeoLocation](#use-geo-location)
- [useHover](#use-hover)
- [useIdle](#use-idle)
- [useImageLoad](#use-image-load)
- [useKeyPress](#use-key-press)
- [useLockBodyScroll](#use-lock-body-scroll)
- [useLongPress](#use-long-press)
- [useMediaDevices](#use-media-devices)
- [useMediaQuery](#use-media-query)
- [useMouse](#use-mouse)
- [useOnScreen](#use-on-screen)
- [useOrientation](#use-orientation)
- [usePermission](#use-permission)
- [usePortal](#use-portal)
- [useScript](#use-script)
- [useStatus](#use-status)
- [useStep](#use-step)
- [useStorage](#use-storage)
- [useThrottle](#use-throttle)
- [useTimeout](#use-timeout)
- [useToggle](#use-toggle)
- [useUpdateEffect](#use-update-effect)
- [useWindowSize](#use-window-size)


# useAsync Hook 

The `useAsync` hook simplifies the handling of asynchronous operations in React applications, such as data fetching or any other promise-returning functions. It provides a structured way to track the status and outcome of async operations.

## Features

- **Automated Execution:** Optionally executes the async function automatically on component mount.
- **Manual Execution:** Provides a function to manually trigger the async operation.
- **Status and Error Tracking:** Tracks the status of the async operation and captures any errors.
- **SSR Compatibility:** Safe for server-side rendering, with checks to prevent automatic execution on the server.
- **Value Management:** Manages the value returned from the async operation.

## Installation

```bash
npm install @custom-react-hooks/use-async
```

or

```bash
yarn add @custom-react-hooks/use-async
```

## Usage

```typescript
import useAsync from '@custom-react-hooks/use-async';

const fetchData = async () => {
  // Async function to fetch data
  return await fetch('/api/data').then(res => res.json());
};

const MyComponent = () => {
  const { execute, status, value, error } = useAsync(fetchData, false);

  return (
    <div>
      {status === 'idle' && <button onClick={execute}>Fetch Data</button>}
      {status === 'pending' && <p>Loading...</p>}
      {status === 'success' && <div>{JSON.stringify(value)}</div>}
      {status === 'error' && <p>Error: {error?.message}</p>}
    </div>
  );
};
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


## Contributing

Contributions to enhance `useAsync` are highly encouraged. Feel free to submit issues or pull requests to the repository.

Certainly, I'll help you update the documentation for your `useAsync` custom hook. Below is an improved and more detailed documentation template:


# [useClickOutside](#use-click-outside) Hook 

The `useClickOutside` hook is designed to detect and handle clicks outside of a specified element or set of elements. This is particularly useful for closing modal windows, dropdowns, and other components when a user interacts outside of them.

## Installation

```bash
npm install @react-custom-hooks/use-click-outside
```

or

```bash
yarn add @react-custom-hooks/use-click-outside
```

## Usage

Here's an example of how to use the `useClickOutside` hook in a modal component:

```typescript
import React, { useRef } from 'react';
import useClickOutside from '@react-custom-hooks/use-click-outside';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null); // Ref for the modal content
  useClickOutside(modalRef, onClose); // Setup the hook to call `onClose` when a click outside is detected

  return (
    <div ref={modalRef}>
      {/* Your modal content goes here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

In the above example, clicking outside the `<div>` containing the modal content will trigger the `onClose` function.

## API Reference

### Parameters

- `refs` (RefObject | RefObject[]): A ref or an array of refs to the element(s) you want to detect outside clicks on.
- `callback` (function): A callback function that will be called when a click outside the detected elements occurs.
- `events` (string[], optional): An array of event names to listen for clicks. Defaults to `['mousedown', 'touchstart']`.
- `enableDetection` (boolean, optional): A boolean to enable or disable click detection. Defaults to `true`.
- `ignoreRefs` (RefObject[], optional): An array of ref objects for elements that, when clicked, should not trigger the callback.


## Notes

- Ensure the elements referenced by `refs` are mounted when the hook is called.
- The hook must be called within a functional component body or another custom hook.

## Contributing

Feel free to contribute to the development of this hook by submitting issues or pull requests to the repository.

# [useClipboard](#use-clipboard) Hook 

`useClipboard` is a React hook that provides an interface for copying to and pasting from the user's clipboard. It uses the modern Clipboard API for improved performance and flexibility.

## Features

- **Copy and Paste**: Offers methods to both copy text to and paste text from the clipboard.
- **Asynchronous API**: Uses promise-based Clipboard API methods for non-blocking operations.
- **Status and Error Reporting**: Returns the status of clipboard operations and any error messages.
- **Server-Side Rendering Compatibility**: Checks for the availability of the Clipboard API, ensuring the hook does not break in a server-side rendering context.

## Installation

To integrate `useClipboard` into your project:

```bash
npm install @custom-react-hooks/use-clipboard
```

or

```bash
yarn add @custom-react-hooks/use-clipboard
```

## Usage

```typescript
import React, { useState } from 'react';
import useClipboard from '@custom-react-hooks/use-clipboard';

function MyComponent() {
  const [text, setText] = useState('');
  const { copyToClipboard, pasteFromClipboard, state } = useClipboard();

  const handleCopy = async () => {
    await copyToClipboard(text);
    // Handle feedback with state.success and state.error
  };

  const handlePaste = async () => {
    const pastedText = await pasteFromClipboard();
    if (state.success) {
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

# [useDebounce](#use-debounce) Hook 

The `useDebounce` hook is used to delay the execution of a function until a specified amount of time has passed since it was last invoked. This is useful for handling rapid user input scenarios, such as search input fields or window resizing.

## Installation

```bash
npm install @react-custom-hooks/use-debounce
```

or

```bash
yarn add @react-custom-hooks/use-debounce
```

## Usage

Here's an example of using `useDebounce` in a search input component:

```typescript
import React, { useState } from 'react';
import useDebounce from '@react-custom-hooks/use-debounce';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, cancelSearch] = useDebounce(() => {
    console.log('Searching for:', searchTerm);
  }, 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch();
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
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

## Notes

- The `useDebounce` hook is useful for optimizing performance in scenarios where you want to limit the frequency of function execution.
- Make sure to adjust the delay based on your specific use case.

## Contributing

Your contributions are welcome! Feel free to submit issues or pull requests to improve the `useDebounce` hook.

# [useDocumentTitle](#use-document-title) Hook 

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

# [useDragDrop](#use-drag-drop) Hook 

`useDragDrop` is a combined React hook that facilitates drag-and-drop interactions in your application. It abstracts the handling of both draggable elements and drop targets, simplifying the implementation of drag-and-drop functionality.

## Features

- **Combined Drag and Drop Handling**: Manages both dragging and dropping within a single hook.
- **Customizable Data Transfer**: Allows any data to be associated with the drag operation and retrieved upon dropping.
- **Event Handling**: Abstracts away the complexity of drag-and-drop event management.
- **Real-time State Management**: Tracks the state of dragging and dropping actions in real-time.
- **SSR Compatibility**: Designed to be server-side rendering friendly.

## Installation

To integrate `useDragDrop` into your project:

```bash
npm install @custom-react-hooks/use-drag-drop
```

or

```bash
yarn add @custom-react-hooks/use-drag-drop
```

## Usage

```tsx
import React from 'react';
import { useDragDrop } from '@custom-react-hooks/use-drag-drop';

const DraggableComponent = ({ data }) => {
  const { bindDrag } = useDragDrop(data, (dropData) => console.log(dropData));

  return (
    <div {...bindDrag}>
      I am draggable
    </div>
  );
};

const DropZoneComponent = () => {
  const { bindDrop } = useDragDrop(null, (dropData) => console.log('Data dropped:', dropData));

  return (
    <div {...bindDrop}>
      Drop items here
    </div>
  );
};
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

## Contributing

Contributions to improve `useDragDrop` are welcome. Please submit issues or pull requests to the repository for any bugs or feature enhancements.

# [useEffectOnce](#use-effect-once) Hook

`useEffectOnce` is a custom hook in React designed to mimic the behavior of `componentDidMount` and `componentWillUnmount` lifecycle methods in class components. It's a modified version of `useEffect` that runs only once when the component mounts.

## Features

- **Single Execution:** The hook executes the provided effect function once upon the component's initial render.
- **Cleanup Capability:** It supports an optional cleanup function, returned from the effect, which is called when the component unmounts.
- **SSR Compatibility:** As an extension of `useEffect`, it is naturally compatible with server-side rendering environments.

## Installation

To include `useEffectOnce` in your project:

```bash
npm install @custom-react-hooks/use-effect-once
```

or

```bash
yarn add @custom-react-hooks/use-effect-once
```

Replace `@custom-react-hooks/use-effect-once` with the actual name of your package.

## Usage

```typescript
import React from 'react';
import useEffectOnce from '@custom-react-hooks/use-effect-once';

const MyComponent: React.FC = () => {
  useEffectOnce(() => {
    console.log('Runs only once after the component mounts.');

    return () => {
      console.log('Runs when the component unmounts.');
    };
  });

  return <div>My Component</div>;
};
```

In this example, `useEffectOnce` is used to perform actions at the mounting and unmounting phases of `MyComponent`.

## API Reference

- `effect`: A function that will be executed once when the component mounts. This function can optionally return a cleanup function, which will be executed when the component unmounts.

## Contributing

Contributions to enhance `useEffectOnce` are always welcome. Feel free to submit issues or pull requests to the repository for further improvements.

# [useElementSize](#use-element-size) Hook

`useElementSize` is a React hook that enables dynamic tracking of an HTML element's dimensions. It updates the element's width and height in response to window resizing, element mounting/unmounting, and ref changes.

## Features

- **Dynamic Dimension Tracking:** Automatically tracks and updates the width and height of the specified element.
- **Responsive to Environmental Changes:** Responds to window resizing and ref changes, ensuring accurate size measurements.
- **SSR Safe:** Compatible with server-side rendering, avoiding errors in environments without a `window` object.
- **Optimized for Accuracy:** Uses `useLayoutEffect` for precise dimension measurements after DOM mutations.

## Installation

To integrate `useElementSize` into your project:

```bash
npm install @custom-react-hooks/use-element-size
```

or

```bash
yarn add @custom-react-hooks/use-element-size
```

## Usage

```typescript
import React, { useRef } from 'react';
import useElementSize from '@custom-react-hooks/use-element-size';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);

  return (
    <div ref={ref}>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};
```

In this example, `useElementSize` is used to measure and display the dimensions of a `div` element.

## API Reference

### Parameters

- `ref`: A React ref object attached to the element whose size you want to measure.

### Returns object

- `width`: width of the element
- `height`: height of the element.

## Contributing

Your contributions to improve `useElementSize` are welcome. Feel free to submit issues or pull requests to the repository.

# [useEventListener](#use-event-listener) Hook

The `useEventListener` hook is a custom React hook that simplifies the process of adding and removing event listeners in your React components. It handles the lifecycle of the event listener, ensuring it is cleaned up when the component unmounts or dependencies change.

## Installation

```bash
npm install @custom-react-hooks/use-event-listener
```

or

```bash
yarn add @custom-react-hooks/use-event-listener
```

## Usage

Here's an example of how to use the `useEventListener` hook in a component:

```typescript
import React, { useState, useRef } from 'react';
import useEventListener from '@custom-react-hooks/use-event-listener';

const MyComponent = () => {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    setKeyPressed(event.key);
  };

  // Using useEventListener to listen for keydown events on the div element
  useEventListener('keydown', handleKeyPress, divRef);

  return (
    <div ref={divRef}>
      <p>Press any key!</p>
      {keyPressed && <p>Last Key Pressed: {keyPressed}</p>}
    </div>
  );
};

export default MyComponent;
```

In this component, `useEventListener` is used to listen for `keydown` events on the `div` element, and the state is updated with the last key pressed.

## API Reference

### Parameters

- `eventName` (string | string[]): The name of the event to listen to, or an array of event names.
- `handler` (function): The function to be called when the event is triggered.
- `element` (RefObject, optional): The ref object pointing to the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the window object.
- `options` (boolean | AddEventListenerOptions, optional): Options to pass to the event listener.
- `condition` (boolean, optional): A boolean value to conditionally attach or detach the event listener.

## Notes

- Ensure the element referenced by `element` is mounted when the hook is called.
- The hook is versatile and can be used for various events and elements within a React application.

## Contributing

Your contributions to the development and enhancement of this hook are welcome! Feel free to submit issues or pull requests to the repository.

# [useFetch](#use-fetch) Hook

The `useFetch` hook is a powerful tool for making API requests in React applications. It simplifies the process of fetching data from a URL and handles various advanced features like caching, timeouts, and integration with global state management systems.

## Installation

```bash
npm install @custom-react-hooks/use-fetch
```

or

```bash
yarn add @custom-react-hooks/use-fetch
```

## Usage

Here's an example of how to use the `useFetch` hook in a component:

```typescript
import React from 'react';
import useFetch from '@custom-react-hooks/use-fetch';

const MyComponent = () => {
  const { data, loading, error, fetchData } = useFetch('https://api.example.com/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={fetchData}>Reload</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
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

## Notes

- The `useFetch` hook is designed to be flexible and can be adapted to fit various fetching requirements.
- Remember to handle the cleanup of timeouts and abort controllers to avoid memory leaks and unexpected behavior in your components.

## Contributing

Contributions to enhance the `useFetch` hook are welcome. Feel free to submit issues or pull requests to the repository.

# [useForm](#use-form) Hook

The `useForm` hook is an advanced form management tool for React applications, providing capabilities for managing form state, validation, loading status, and submission feedback.

## Features

- **Flexible Form State Management:** Handles values, errors, and touch status of form fields.
- **Custom Validation:** Supports custom validation logic for form fields.
- **Loading State (`isSubmitting`):** Indicates when the form is being submitted, useful for displaying loading indicators.
- **Submission Status (`submissionStatus`):** Provides feedback on the form submission process, with states like `idle`, `success`, or `error`.

## Installation

To integrate `useForm` into your project:

```bash
npm install @custom-react-hooks/use-form
```

or

```bash
yarn add @custom-react-hooks/use-form
```

## Usage

```typescript
import React from 'react';
import useForm from '@custom-react-hooks/use-form';

interface FormValues {
  username: string;
  email: string;
  // Define other form fields as needed
}

const MyForm = () => {
  const initialValues: FormValues = { username: '', email: '' };

  const validate = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.email) errors.email = 'Email is required';
    // Implement additional validation rules here
    return errors as Record<keyof FormValues, string | undefined>;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    submissionStatus
  } = useForm(initialValues, validate);

  const onSubmit = async (values: FormValues) => {
    // Handle form submission logic
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
      {touched.username && errors.username && <div>{errors.username}</div>}
      
      <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {touched.email && errors.email && <div>{errors.email}</div>}

      {/* Additional form fields */}

      <button type="submit" disabled={isSubmitting}>Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};
```

## API Reference

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

## Contributing

Your contributions to further enhance `useForm` are welcome. Feel free to submit issues or pull requests to the repository.

# [useGeoLocation](#use-geo-location) Hook

The `useGeoLocation` hook is a powerful tool for accessing and monitoring the user's geographical location in React applications. It offers features such as continuous location watching, error handling, and customizable geolocation options.

## Features

- **Real-Time Location Tracking:** Ability to continuously watch the user's location.
- **Custom Geolocation Options:** Supports customization of geolocation queries, like timeout and accuracy.
- **Error Handling:** Robust error handling, including cases where geolocation is not supported.

## Installation

To use `useGeoLocation`, install the package containing the hook:

```bash
npm install @custom-react-hooks/use-geo-location
```

or

```bash
yarn add @custom-react-hooks/use-geo-location
```

## Usage

Import and use the `useGeoLocation` hook in your React components:

```typescript
import useGeoLocation from '@custom-react-hooks/use-geo-location';

const MyComponent = () => {
  const { coordinates, error, loading } = useGeoLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      Latitude: {coordinates?.latitude}, Longitude: {coordinates?.longitude}
    </div>
  );
};
```

## API Reference

- `options`: Optional `PositionOptions` object to configure geolocation queries.
- `watch`: Boolean flag to continuously watch the user's location.
- `coordinates`: The current geographical position of the user.
- `error`: Error object containing details in case of a failure.
- `loading`: Boolean indicating whether the location data is being fetched.

## Contributing

Contributions to improve `useGeoLocation` are welcome. Feel free to submit issues or pull requests to enhance its functionality.

# [useHover](#use-hover) Hook

The `useHover` hook is a utility for detecting hover interactions in React components. It simplifies the process of tracking when a user's mouse pointer hovers over an element.

## Features

- **Hover State Management:** Tracks hover state of an element.
- **Ref-based Implementation:** Attaches event listeners using a React `ref`, ensuring compatibility with React's DOM handling.
- **Server-Side Rendering Compatibility:** Safe for use in SSR environments by avoiding direct DOM interactions unless the component is mounted in the browser.
- **Optimized Event Handling:** Uses `useCallback` to memoize event handlers for performance optimization.

## Installation

To use `useHover` in your project:

```bash
npm install @custom-react-hooks/use-hover
```

or

```bash
yarn add @custom-react-hooks/use-hover
```

## Usage

```typescript
import useHover from '@custom-react-hooks/use-hover';

const MyComponent = () => {
  const { ref, isHovered } = useHover();

  return (
    <div ref={ref}>
      {isHovered ? 'Hovering' : 'Not Hovering'}
    </div>
  );
};
```

In this example, the `useHover` hook provides a way to determine if a particular div is being hovered.

## API Reference

- Returns an object with:
  - `ref`: A React `ref` that should be attached to the element you want to monitor for hover.
  - `isHovered`: A boolean state indicating whether the element is currently being hovered.

## Contributing

Contributions to enhance `useHover` are welcome. Feel free to submit issues or pull requests to the repository.

# [useIdle](#use-idle) Hook

`useIdle` is a React hook designed to detect user inactivity or idle time in applications. It triggers a state change after a specified period of inactivity, making it useful for actions like auto-logout or activity pausing.

## Features

- **Idle Time Detection:** Tracks user inactivity and changes state after a set period.
- **Activity Monitoring:** Resets the idle timer upon user interactions like mouse movement, keypresses, and scrolling.
- **SSR Compatibility:** Safely handles server-side rendering by checking for the `window` object.
- **Configurable Idle Duration:** Allows setting a custom duration to define user inactivity.

## Installation

To integrate `useIdle` into your project:

```bash
npm install @custom-react-hooks/use-idle
```

or

```bash
yarn add @custom-react-hooks/use-idle
```

## Usage

```typescript
import React from 'react';
import useIdle from '@custom-react-hooks/use-idle';

const MyComponent = () => {
  const isUserIdle = useIdle(3000); // 3 seconds idle time

  return (
    <div>
      {isUserIdle ? 'User is idle' : 'User is active'}
    </div>
  );
};
```

In this example, the hook is used to detect when the user has been idle for more than 3 seconds.

## API Reference

- `idleTime`: The time in milliseconds to wait before considering the user as idle.
- Returns a boolean state indicating if the user is idle.

## Contributing

Contributions to enhance `useIdle` are welcome. Feel free to submit issues or pull requests to the repository.

# [useImageLoad](#use-image-load) Hook

`useImageLoad` is a custom React hook designed to enhance the user experience by efficiently loading images. It supports lazy loading to improve performance and provides detailed status updates during the image loading process.

## Features

- **Progressive Image Loading:** Displays a thumbnail first, followed by the full-resolution image once loaded.
- **Lazy Loading Support:** Defers the loading of off-screen images until they are needed.
- **Detailed Loading States:** Tracks the loading state, completion, and any errors that occur.
- **SSR Safe:** Checks for window object availability to ensure compatibility with server-side rendered applications.
- **Cleanup Mechanism:** Properly disconnects `IntersectionObserver` to prevent memory leaks.

## Installation

To add `useImageLoad` to your project:

```bash
npm install @custom-react-hooks/use-image-load
```

or

```bash
yarn add @custom-react-hooks/use-image-load
```

## Usage

```typescript
import React from 'react';
import useImageLoad from '@custom-react-hooks/use-image-load';

const MyImageComponent: React.FC = () => {
  const { src, isLoading, hasError } = useImageLoad({
    thumbnailSrc: 'path/to/thumbnail.jpg',
    fullSrc: 'path/to/full-image.jpg',
    lazyLoad: true
  });

  return (
    <div>
      {hasError ? (
        <p>Error loading image.</p>
      ) : (
        <img src={src} alt="Loaded image" style={{ filter: isLoading ? 'blur(10px)' : 'none' }} />
      )}
    </div>
  );
};
```

In this example, `useImageLoad` is used to load an image with a thumbnail transitioning to the full-resolution image.

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

## Contributing

We welcome contributions to `useImageLoad`. For bugs, feature requests, or pull requests, please reach out through the project's repository.

# [useKeyPress](#use-key-press) Hook

The `useKeyPress` hook is an advanced utility for detecting specific keypress events in React applications. It supports customizable debounce timing and can listen for keypress events either globally or locally within a component.

## Features

- **Key Detection:** Monitors for the press of a specific key.
- **Debounce Support:** Includes an optional debounce feature to manage rapid keypresses.
- **Global and Local Listening:** Option to listen for keypress events globally (across the entire window) or locally (within a specific component).
- **SSR Compatibility:** Safely handles server-side rendering environments.

## Installation

To integrate `useKeyPress` into your project:

```bash
npm install @custom-react-hooks/use-key-press
```

or

```bash
yarn add @custom-react-hooks/use-key-press
```

## Usage

```typescript
import useKeyPress from '@custom-react-hooks/use-key-press';

const MyComponent = () => {
  const keyPressed = useKeyPress('Enter', { debounce: 200, global: true });

  return (
    <div>
      {keyPressed ? 'Enter key is pressed' : 'Press the Enter key'}
    </div>
  );
};
```

This example demonstrates using `useKeyPress` to detect when the Enter key is pressed with a debounce of 200 milliseconds.

## API Reference

- `targetKey`: The key for which the press event should be detected.
- `options`: An object that may contain:
  - `debounce`: Optional number specifying the debounce time in milliseconds.
  - `global`: Optional boolean indicating whether to listen for the event globally.
  
- Returns a boolean state indicating whether the specified key is currently pressed.

## Contributing

We welcome contributions to improve `useKeyPress`. Feel free to submit issues or pull requests to the repository.

# [useLockBodyScroll](#use-lock-body-scroll) Hook

`useLockBodyScroll` is a React hook for controlling the scroll behavior of the body element in web applications. It's particularly useful for scenarios like opening modals or overlays where background scroll needs to be disabled.

## Features

- **Conditional Scroll Lock:** Allows you to conditionally enable or disable the body scroll.
- **Style Preservation:** Preserves the original body overflow style and restores it upon unmounting.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments by checking for the `document` object.
- **Synchronous Execution:** Uses `useLayoutEffect` for synchronous updates to the DOM.

## Installation

To integrate `useLockBodyScroll` into your project:

```bash
npm install @custom-react-hooks/use-lock-body-scroll
```

or

```bash
yarn add @custom-react-hooks/use-lock-body-scroll
```

## Usage

```typescript
import useLockBodyScroll from '@custom-react-hooks/use-lock-body-scroll';

const Modal = ({ isOpen }) => {
  useLockBodyScroll(isOpen);

  return isOpen ? <div className="modal">Modal Content</div> : null;
};
```

In this example, the hook is used to lock the body scroll when the modal is open.

## API Reference

- `lock`: A boolean indicating whether to lock (`true`) or unlock (`false`) the body scroll.

## Contributing

Your contributions to improve `useLockBodyScroll` are welcome. Feel free to submit issues or pull requests to the repository.

# [useLongPress](#use-long-press) Hook

The `useLongPress` hook is designed for adding long press interactions to elements in React applications. It provides a flexible way to handle long press events with customizable thresholds and callbacks.

## Features

- **Customizable Long Press Duration:** Set a threshold for how long the press should last to trigger the event.
- **Multiple Event Callbacks:** Options for onStart, onFinish, and onCancel callbacks.
- **Support for Mouse and Touch:** Works with both mouse and touch events.
- **SSR Safe:** Can be safely used in server-side rendered applications.

## Installation

To use `useLongPress` in your project:

```bash
npm install @custom-react-hooks/use-long-press
```

or

```bash
yarn add @custom-react-hooks/use-long-press
```

## Usage

```typescript
import React from 'react';
import useLongPress from '@custom-react-hooks/use-long-press';

const MyComponent = () => {
  const handleLongPress = () => console.log('Long pressed!');
  const longPressEvents = useLongPress(handleLongPress, {
    threshold: 500, // Time in milliseconds
    onStart: () => console.log('Press started'),
    onFinish: () => console.log('Long press finished'),
    onCancel: () => console.log('Press cancelled')
  });

  return (
    <div {...longPressEvents}>
      Press and hold me
    </div>
  );
};
```

This example demonstrates how to use the `useLongPress` hook to add a long press interaction to a div element.

## API Reference

- `callback`: The function to execute when a long press event is successfully detected.
- `options`: Configuration object with the following optional properties:
  - `threshold`: Time in milliseconds the user must press and hold to trigger a long press event.
  - `onStart`: Function called when the user starts pressing.
  - `onFinish`: Function called when a long press event finishes successfully.
  - `onCancel`: Function called when a press event

 is cancelled.

The hook returns an object containing event handlers (`onMouseDown`, `onMouseUp`, `onMouseLeave`, `onTouchStart`, `onTouchEnd`) to be spread on the target element.

## Contributing

Your contributions to improve `useLongPress` are appreciated. Feel free to submit issues or pull requests to the repository.

# [useMediaDevices](#use-media-devices) Hook

`useMediaDevices` is a React hook that provides a simple interface to access and monitor media devices like cameras and microphones. It handles user permissions and lists all available media input and output devices.

## Features

- **Device Enumeration**: Lists all available media devices with their labels, kinds, and IDs.
- **Permission Handling**: Prompts the user for access to media devices to retrieve full device information.
- **Loading State**: Indicates whether the hook is currently retrieving media devices.
- **Error Handling**: Provides error information if the media devices cannot be accessed or are not available.
- **SSR Compatibility**: Safely executed in a server-side rendering environment without accessing browser-specific APIs.

## Installation

To integrate `useMediaDevices` into your project:

```bash
npm install @custom-react-hooks/use-media-devices
```

or

```bash
yarn add @custom-react-hooks/use-media-devices
```

## Usage

```tsx
import React from 'react';
import useMediaDevices from '@custom-react-hooks/use-media-devices';

const MediaDevicesComponent: React.FC = () => {
  const { devices, isLoading, error } = useMediaDevices();

  if (isLoading) {
    return <p>Loading devices...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {devices.map(device => (
        <li key={device.id}>
          {device.label} - {device.kind}
        </li>
      ))}
    </ul>
  );
};

export default MediaDevicesComponent;
```

In this example, `useMediaDevices` is used to list all available media devices.

## API Reference

- Returns an object with:
  - `devices`: An array of objects representing the media devices.
    - Each device object contains:
      - `id`: The device ID.
      - `kind`: The kind of the device (e.g., `videoinput`, `audioinput`, `audiooutput`).
      - `label`: The label of the device (e.g., 'Internal Microphone').
  - `isLoading`: A boolean indicating if the hook is currently retrieving the devices.
  - `error`: A string containing an error message if the devices cannot be accessed.

## Contributing

Contributions to improve `useMediaDevices` are welcome. Please submit issues or pull requests to the repository for any bugs or feature enhancements.

# [useMediaQuery](#use-media-query) Hook

The `useMediaQuery` hook is designed for responsive design in React applications. It enables components to adapt to different screen sizes or respond to media query changes.

## Features

- **Dynamic Media Queries:** Accepts any valid CSS media query string.
- **SSR Compatibility:** Safe for server-side rendering, as it checks for the availability of the `window` object.
- **Efficient and Optimized:** Only updates component state when media query match status changes.

## Installation

```bash
npm install @custom-react-hooks/use-media-query
```

or

```bash
yarn add @custom-react-hooks/use-media-query
```

## Usage

Import and use the `useMediaQuery` hook in your React components:

```typescript
import useMediaQuery from '@custom-react-hooks/use-media-query';

const MyResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div>
      {isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}
    </div>
  );
};
```

In this example, the component renders different content based on the screen width.

## API Reference

- `query`: A string representing the media query to evaluate.

## Contributing

Contributions to enhance the `useMediaQuery` hook are welcome. Feel free to submit issues or pull requests to the repository.

# [useMouse](#use-mouse) Hook

The `useMouse` hook is designed for tracking the mouse position within a specified element in React applications. It's enhanced to provide additional features such as offsetting the mouse position and avoiding edges of the screen, which is useful for tooltips and other floating elements.

## Features

- **Dynamic Mouse Position Tracking:** Captures the mouse's x and y coordinates within the target element.
- **Offset and Edge Avoidance:** Supports offsetting the mouse position and adjusting it to avoid going off the screen edges.
- **TypeScript Support:** Strongly typed for better integration with TypeScript projects.
- **Flexible and Customizable:** Provides options for customizing offset values and tooltip dimensions.

## Installation

To integrate `useMouse` into your project:

```bash
npm install @custom-react-hooks/use-mouse
```

or

```bash
yarn add @custom-react-hooks/use-mouse
```

## Usage

```typescript
import React, { useRef } from 'react';
import useMouse from '@custom-react-hooks/use-mouse';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMouse(ref, { offsetX: 15, offsetY: 15, avoidEdges: true });

  return (
    <div ref={ref} style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        Tooltip or Pop-up content
      </div>
    </div>
  );
};
```

In this TypeScript example, the `useMouse` hook is used to track the mouse position within a `div` element and adjust the position of a tooltip or pop-up element accordingly.

## API Reference

- `ref`: A React `RefObject` pointing to the target element.
- `options`: Configuration options for mouse position adjustments.
  - `offsetX`: Horizontal offset from the mouse position.
  - `offsetY`: Vertical offset from the mouse position.
  - `avoidEdges`: Boolean indicating whether to adjust the position to avoid screen edges.
  - `tooltipWidth`: Optional width of the tooltip element.
  - `tooltipHeight`: Optional height of the tooltip element.
- Returns an object containing the adjusted mouse position (`x`, `y` coordinates).

## Contributing

Contributions to enhance `useMouse` are welcome. Please feel free to submit issues or pull requests to the repository.

# [useOnScreen](#use-on-screen) Hook

The `useOnScreen` hook utilizes the Intersection Observer API to detect if an element is visible within the viewport. It's ideal for scenarios such as lazy loading images, triggering animations on scroll, and implementing features like infinite scroll.

## Features

- **Visibility Detection:** Determines if an element is currently visible in the viewport.
- **Memoization of Observer:** Efficient use of resources by memoizing the Intersection Observer instance.
- **One-time Observation:** Option to unobserve the element after it becomes visible for the first time.
- **Customizable Observer Options:** Supports threshold, root, and root margin options for the observer.

## Installation

To include `useOnScreen` in your project, install the package containing the hook:

```bash
npm install @custom-react-hooks/use-on-screen
```

or

```bash
yarn add @custom-react-hooks/use-on-screen
```

## Usage

Import and use the `useOnScreen` hook in your React components. You can also specify whether the element should be unobserved after first being visible by setting the `once` parameter.

```typescript
import useOnScreen from '@custom-react-hooks/use-on-screen';

const MyComponent = () => {
  const { ref, isIntersecting } = useOnScreen({ threshold: 0.5 }, true);

  return (
    <div ref={ref}>
      {isIntersecting ? 'Element is visible' : 'Element is not visible'}
    </div>
  );
};
```

In this example, the hook observes an element and updates its visibility status. When `once` is set to `true`, the element is unobserved after becoming visible for the first time.

## API Reference

- `options`: Optional `IntersectionObserverInit` object to customize the observer.
- `once`: Boolean flag indicating if the element should be unobserved after it becomes visible for the first time.
- `ref`: Ref object to be attached to the element you want to observe.
- `isIntersecting`: Boolean indicating whether the observed element is in the viewport.

## Contributing

Your contributions to enhance `useOnScreen` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality and performance.

# [usePermission](#use-permission) Hook

`usePermission` is a React hook designed to query and monitor the status of user permissions for various browser APIs such as geolocation, notifications, microphone, and camera.

## Features

- **Permission Querying**: Queries the status of a specified permission.
- **Real-time Updates**: Monitors and updates the permission status in real-time if it changes.
- **Error Handling**: Provides error messages if the Permissions API is not supported or if an error occurs during the query.
- **SSR Compatibility**: Executes safely in a server-side rendering environment by avoiding direct browser API calls during SSR.

## Installation

To integrate `usePermission` into your project:

```bash
npm install @custom-react-hooks/use-permission
```

or

```bash
yarn add @custom-react-hooks/use-permission
```

## Usage

```tsx
import React from 'react';
import usePermission from '@custom-react-hooks/use-permission';

const MyComponent: React.FC = () => {
  const { state, isLoading, error } = usePermission('microphone');

  if (isLoading) {
    return <p>Checking microphone permission...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      Microphone permission status: {state}
    </div>
  );
};

export default MyComponent;
```

In this example, `usePermission` is used to check the permission status of the user's microphone.

## API Reference

- `usePermission(permissionName: PermissionName)`: A function that accepts a permission name and returns the permission state.
- Parameters:
  - `permissionName`: A string that represents the permission to query. It must be one of the supported permission names defined by the Permissions API.
- Returns an object with:
  - `state`: A string representing the permission state (`'prompt'`, `'granted'`, or `'denied'`).
  - `isLoading`: A boolean indicating if the permission query is in progress.
  - `error`: A string containing an error message if the query fails or if the Permissions API is not supported.

## Contributing

We welcome contributions to `usePermission`. Please report bugs or suggest feature enhancements through issues or pull requests in the project's repository.

# [usePortal](#use-portal) Hook

The `usePortal` hook facilitates the creation and management of portal components in React applications. Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This hook is particularly useful for rendering modals, dropdowns, and tooltips.

## Features

- **Dynamic Portal Creation:** Automatically creates and manages a DOM element for the portal.
- **Simple State Management:** Provides functions to open and close the portal, along with a state variable to track its visibility.
- **Easy Integration:** Can be integrated seamlessly with existing React components.

## Installation

To use the `usePortal` hook, include it in your project:

```bash
npm install @custom-react-hooks/use-portal
```

or

```bash
yarn add @custom-react-hooks/use-portal
```

## Usage

Import the `usePortal` hook and use it in your React components to manage portals:

```typescript
import usePortal from '@custom-react-hooks/use-portal';

const MyComponent = () => {
  const { Portal, openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      {isOpen && (
        <Portal>
          <div>Portal Content</div>
          <button onClick={closePortal}>Close Portal</button>
        </Portal>
      )}
    </div>
  );
};
```

In this example, the `usePortal` hook is used to render a modal-like component. The portal can be opened and closed using the provided functions.

## API Reference

- `Portal`: A component for rendering the portal's children. It only renders its children when the portal is open.
- `openPortal`: A function to open the portal.
- `closePortal`: A function to close the portal.
- `isOpen`: A state variable indicating whether the portal is currently open.

## Contributing

Contributions to improve `usePortal` are welcome. If you have suggestions or enhancements, feel free to submit issues or pull requests to the repository.

# [useScript](#use-script) Hook

The `useScript` hook is an advanced tool for dynamically loading and managing external scripts in React applications. It supports loading multiple scripts, handling load and error events, custom script attributes, and optional script removal.

## Features

- **Multiple Script Support:** Can handle an array of script sources.
- **Event Callbacks:** Provides `onLoad` and `onError` callbacks for handling respective script events.
- **Custom Script Attributes:** Allows setting attributes like `defer`, `async`, or custom `data-*` attributes.
- **Optional Script Removal:** Can remove script tags from the DOM on component unmount.

## Installation

To include `useScript` in your project, install the package containing the hook:

```bash
npm install @custom-react-hooks/use-script
```

or

```bash
yarn add @custom-react-hooks/use-script
```

## Usage

Import the `useScript` hook and use it in your React components. You can specify multiple scripts and custom attributes:

```typescript
import useScript from '@custom-react-hooks/use-script';

const MyComponent = () => {
  const scripts = useScript(
    ['https://example.com/script1.js', 'https://example.com/script2.js'],
    {
      onLoad: () => console.log('Scripts loaded'),
      onError: () => console.log('Script load error'),
      defer: true,
      removeOnUnmount: true
    }
  );

  return (
    <div>
      {scripts.map(script => (
        <div key={script.src}>{script.status}</div>
      ))}
    </div>
  );
};
```

In this example, the hook loads multiple scripts with additional attributes and provides callbacks for load and error events.

## API Reference

- `src`: A string or an array of strings representing the script source URLs.
- `options`: An object containing:
  - `onLoad`: Callback function triggered when the script loads.
  - `onError`: Callback function triggered on script load error.
  - `removeOnUnmount`: Boolean indicating whether to remove the script tags on unmount.
  - Additional attributes (e.g., `defer`, `async`) to be set on the script tags.
- Returns an array of script load states, each with:
  - `src`: Script source URL.
  - `status`: Load status of the script (`'loading'`, `'ready'`, or `'error'`).

## Contributing

Contributions to enhance the `useScript` hook are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.

# [useStatus](#use-status) Hook

The `useStatus` hook is designed to monitor the network status of a user's device in React applications. It provides real-time information on whether the user is online or offline and includes additional network details when available.

## Features

- **Network Connection Status:** Detects and reports the user's online or offline status.
- **Network Information Tracking:** When available, provides additional network information such as downlink speed, effective connection type, and round-trip time.
- **Real-Time Updates:** Listens to changes in the network status and updates the information accordingly.
- **TypeScript Compatibility:** Includes TypeScript definitions to handle non-standard browser APIs like the Network Information API.

## Installation

```bash
npm install @custom-react-hooks/use-status
```

or

```bash
yarn add @custom-react-hooks/use-status
```

## Usage

Import and use the `useStatus` hook in your React components to get network status:

```typescript
import useStatus from '@custom-react-hooks/use-status';

const MyComponent = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <p>{online ? 'Online' : 'Offline'}</p>
      {online && (
        <>
          <p>Downlink Speed: {downlink} Mbps</p>
          <p>Effective Connection Type: {effectiveType}</p>
          <p>Round-trip Time: {rtt} ms</p>
        </>
      )}
    </div>
  );
};
```

In this example, the hook provides the current network status along with additional network information if the user is online.

## API Reference

- The hook returns an object with the following properties:
  - `online`: Boolean indicating if the user is online.
  - `downlink`: The downlink speed in Mbps (optional).
  - `effectiveType`: The effective type of the network connection (e.g., '4g', '3g') (optional).
  - `rtt`: The round-trip time in milliseconds (optional).

## Contributing

Contributions to improve `useStatus` are welcome. Feel free to submit issues or pull requests to the repository.

# [useStep](#use-step) Hook

`useStep` is a custom React hook designed for handling step-based logic in applications, such as wizards or multi-step forms. It manages the current step and provides navigation functionality.

## Features

- **Step Navigation:** Manages the current step and provides functions for navigating between steps.
- **Boundary Control:** Ensures navigation stays within the defined steps, with an optional looping feature.
- **Customizable Step Controls:** Offers functions for specific, next, previous, and reset step actions.
- **Looping Functionality:** Optionally allows steps to loop back to the start or end.
- **SSR Safe:** Can be used in server-side rendered applications.

## Installation

To integrate `useStep` into your project:

```bash
npm install @custom-react-hooks/use-step
```

or

```bash
yarn add @custom-react-hooks/use-step
```

## Usage

```typescript
import React from 'react';
import useStep from '@custom-react-hooks/use-step';

const MyStepperComponent = () => {
  const { currentStep, nextStep, prevStep, reset } = useStep({ totalSteps: 5, loop: true });

  return (
    <div>
      <p>Current Step: {currentStep + 1}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

In this example, `useStep` is used to navigate through a series of steps with looping enabled.

## API Reference

- `initialStep`: (optional) The starting step index.
- `totalSteps`: The total number of steps.
- `loop`: (optional) A boolean indicating if navigation should loop around.
- Returns an object containing:
  - `currentStep`: The index of the current step.
  - `goToStep`: Function to navigate to a specific step.
  - `nextStep`: Function to go to the next step.
  - `prevStep`: Function to go to the previous step.
  - `reset`: Function to reset to the initial step.

## Contributing

Contributions to improve `useStep` are welcome. Please feel free to submit issues or pull requests to the repository.

# [useStorage](#use-storage) Hook

`useStorage` is a versatile hook for interacting with Web Storage (localStorage and sessionStorage) in React applications. It simplifies storage operations and ensures compatibility with server-side rendering.

## Features

- **LocalStorage and SessionStorage:** Works with both `localStorage` and `sessionStorage`.
- **Server-Side Rendering Support:** Safely handles server-side rendering scenarios.
- **Automatic JSON Handling:** Automatically serializes and deserializes stored values.
- **Synchronized State:** Keeps the React state in sync with storage changes.
- **Error Handling:** Provides error handling for storage access and manipulation.

## Installation

Include `useStorage` in your project:

```bash
npm install @custom-react-hooks/use-storage
```

or

```bash
yarn add @custom-react-hooks/use-storage
```

## Usage

```typescript
import useStorage from '@custom-react-hooks/use-storage';

const MyComponent = () => {
  const [value, setValue] = useStorage('myKey', 'defaultValue', 'local');

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue('newValue')}>Update Value</button>
    </div>
  );
};
```

In this example, the hook manages a value in `localStorage`, providing functions to read and update it.

## API Reference

- `key`: The key under which to store the value in storage.
- `defaultValue`: The default value to use if no item is found in storage.
- `storageType`: Type of storage to use (`'local'` for `localStorage`, `'session'` for `sessionStorage`).
- Returns an array with the stored value and a setter function to update it.

## Contributing

Contributions to enhance `useStorage` are welcome. Feel free to submit issues or pull requests to the repository.

# [useThrottle](#use-throttle) Hook

The `useThrottle` hook in React is designed to limit the rate at which a function can be executed, making it ideal for handling events that fire rapidly, such as scrolling, resizing, or continuous keypresses.

## Features

- **Throttle Control:** Limits the frequency of function execution to improve performance and reduce resource usage.
- **Immediate Execution Option:** Executes the function immediately on the first call and then applies the throttle to subsequent calls.
- **State Tracking:** Monitors the throttling status to manage the function execution effectively.
- **SSR Compatibility:** Safe for server-side rendering as it does not depend on browser-specific APIs.

## Installation

To integrate `useThrottle` into your project:

```bash
npm install @custom-react-hooks/use-throttle
```

or

```bash
yarn add @custom-react-hooks/use-throttle
```

## Usage

```typescript
import useThrottle from '@custom-react-hooks/use-throttle';

const MyComponent = () => {
  const handleScroll = useThrottle(() => {
    // Throttled scroll event logic
    console.log('Scroll event throttled');
  }, 1000);

  useEffect(() => {
    // Attach the throttled event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <div>Content here</div>;
};
```

In this example, `useThrottle` is used to throttle the execution of a function handling the scroll event, thereby enhancing performance.

## API Reference

- `callback`: The function to be throttled.
- `limit`: The time limit (in milliseconds) that determines how often the `callback` can be executed.
- `immediate`: (optional) A boolean indicating whether to execute the function immediately on the first call.
- Returns a throttled version of the provided function.

## Contributing

Contributions to improve `useThrottle` are welcome. Feel free to submit issues or pull requests to enhance its functionality and usability.

# [useTimeout](#use-timeout) Hook

`useTimeout` is a custom React hook that manages timeouts. It provides a straightforward way to handle actions that should occur after a delay, with the ability to start, reset, and stop the timeout.

## Features

- **Timeout Control:** Start, reset, and clear timeouts with simple API calls.
- **Server-Side Rendering (SSR) Compatibility:** Safe for use in SSR environments, avoiding calls to `setTimeout` on the server.
- **Automatic Cleanup:** Automatically clears the timeout to prevent memory leaks when the component unmounts or when the timeout is stopped.

## Installation

```bash
npm install @custom-react-hooks/use-timeout
```

or

```bash
yarn add @custom-react-hooks/use-timeout
```

## Usage

```typescript
import useTimeout from '@custom-react-hooks/use-timeout';

const MyComponent = () => {
  const doSomething = () => {
    console.log('Action after timeout');
  };

  const { reset, clear, isActive } = useTimeout(doSomething, 5000);

  return (
    <div>
      {isActive ? <p>Timeout is active</p> : <p>Timeout is inactive</p>}
      <button onClick={reset}>Start/Restart Timeout</button>
      <button onClick={clear}>Stop Timeout</button>
    </div>
  );
};
```

In this example, `useTimeout` is used to manage a timeout that triggers a function after a specified delay.

## API Reference

- `callback`: The function to be executed after the timeout.
- `delay`: The delay in milliseconds before the timeout is triggered. Pass `null` to deactivate the timeout.
- Returns an object with:
  - `isActive`: Boolean indicating if the timeout is currently active.
  - `reset`: Function to start or restart the timeout.
  - `clear`: Function to stop the timeout.

## Contributing

Contributions to improve `useTimeout` are welcome. Feel free to submit issues or pull requests to the repository.

# [useToggle](#use-toggle) Hook

`useToggle` is a custom React hook for managing boolean states with enhanced control. It provides a simple and efficient way to toggle a boolean state and execute a callback function in response to the state changes.

## Features

- **Simple State Toggle:** Easily toggle a boolean state between `true` and `false`.
- **Direct State Control:** Functions to explicitly set the state to `true` or `false`.
- **Callback Execution:** Executes a callback function whenever the state changes.

## Installation

To integrate `useToggle` into your project:

```bash
npm install @custom-react-hooks/use-toggle
```

or

```bash
yarn add @custom-react-hooks/use-toggle
```

## Usage

```typescript
import useToggle from '@custom-react-hooks/use-toggle';

const MyComponent = () => {
  const handleToggle = (newValue) => {
    console.log('Toggle state is now:', newValue);
  };

  const { value, toggle, setTrue, setFalse } = useToggle(false, handleToggle);

  return (
    <div>
      <p>The toggle state is: {value ? 'True' : 'False'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
};
```

In this example, `useToggle` is used to manage a boolean state. A callback function is provided to log the new state whenever it changes.

## API Reference

- `initialValue`: (optional) The initial boolean value (default is `false`).
- `onToggle`: (optional) A callback function that gets called with the new value whenever the toggle state changes.
- Returns an object with:
  - `value`: The current boolean value.
  - `toggle`: Function to toggle the value.
  - `setTrue`: Function to set the value to true.
  - `setFalse`: Function to set the value to false.

## Contributing

Contributions to enhance `useToggle` are welcome. Feel free to submit issues or pull requests to improve its functionality and usability.

# [useUpdateEffect](#use-update-effect) Hook

The `useUpdateEffect` hook is an enhanced version of React's `useEffect` that is triggered only when dependencies update, skipping the effect on the component's initial mount. This hook is particularly useful for effects that you only want to run in response to specific changes.

## Features

- **Update-Only Execution:** Runs the effect only when dependencies change, not on the initial render.
- **Custom Cleanup Support:** Allows for a cleanup function to be returned from the effect, similar to `useEffect`.
- **Server-Side Rendering Compatibility:** Fully compatible with SSR environments.
- **Conditional Execution:** Introduces an optional `condition` function. The effect only runs if this function returns `true`.
- **Delay Execution:** Adds an optional `delay` parameter to delay the execution of the effect.
- **Skip Initial Effect Option:** Allows the user to choose whether to skip the effect on the initial mount. This is set to `true` by default for backward compatibility.

## Installation

To use `useUpdateEffect` in your project:

```bash
npm install @custom-react-hooks/use-update-effect
```

or

```bash
yarn add @custom-react-hooks/use-update-effect
```

## Usage

```typescript
import useUpdateEffect from '@custom-react-hooks/use-update-effect';

const MyComponent = ({ value }) => {
  useUpdateEffect(() => {
    // Effect logic here
    console.log('Value updated:', value);

    return () => {
      // Optional cleanup logic
    };
  }, [value]);

  return <div>Current Value: {value}</div>;
};
```

In this example, the `useUpdateEffect` hook is utilized to perform an action when the `value` prop changes, excluding the initial mount.

## API Reference

- `effect`: The effect function to run when dependencies update.
- `deps`: An array of dependencies that trigger the effect when they change.
- `delay`: This parameter allows you to specify a delay (in milliseconds) before the effect function is executed. When the dependencies of the effect change, the effect won't run immediately; instead, it waits for the specified delay time before executing. This is useful for debouncing or throttling the effect execution.
- `condition`: This is a function that returns a boolean. The effect will only run if this function returns true. This allows conditional execution of the effect based on custom logic, providing greater control over when the effect should run.
- `skipInitialEffect`: When set to true, this parameter ensures that the effect does not run on the initial render of the component. It's useful when you want the effect to run only in response to updates after the initial mount, not on the initial mount itself.

## Contributing

Your contributions to enhance `useUpdateEffect` are highly appreciated. Feel free to submit issues or pull requests to improve its functionality.

# [useWindowSize](#use-window-size) Hook

The `useWindowSize` hook is designed for responsive React applications, providing an easy way to track changes in window size. It includes debouncing for performance optimization and is compatible with server-side rendering.

## Features

- **Responsive Design Support:** Facilitates the development of responsive components.
- **Debounced Resize Events:** Limits the frequency of resize event handling to improve performance.
- **SSR Compatibility:** Safely handles scenarios where the `window` object is not available, such as server-side rendering.

## Installation

```bash
npm install @custom-react-hooks/use-window-size
```

or

```bash
yarn add @custom-react-hooks/use-window-size
```

## Usage

```typescript
import useWindowSize from '@custom-react-hooks/use-window-size';

const MyComponent = () => {
  const { width, height } = useWindowSize(200); // 200ms debounce delay

  return (
    <div>
      <p>Window width: {width}</p>
      <p>Window height: {height}</p>
    </div>
  );
};
```

In this example, the `useWindowSize` hook is used to track the size of the browser window. The debounce delay is set to 200 milliseconds to optimize performance.

## API Reference

- `debounceDelay`: (optional) The delay in milliseconds for debouncing the resize event.
- Returns an object with:
  - `width`: The current width of the window.
  - `height`: The current height of the window.

## Contributing

Contributions to enhance `useWindowSize` are welcome. Feel free to submit issues or pull requests to the repository.

## 🛠️ [Contributing](#contributing)

Your contributions are welcome! Please read our [Contributing Guidelines](https://github.com/djkepa/react-custom-hooks/blob/main/CONTRIBUTING.md) for details on how to submit pull requests, file bugs, and suggest enhancements.

## 🔗 [Links](#links)

- [GitHub Repository](https://github.com/djkepa/react-custom-hooks)
- [Issue Tracker](https://github.com/djkepa/react-custom-hooks/issues)

## 📄 [License](#license)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/djkepa/react-custom-hooks/blob/main/LICENSE) file for details.