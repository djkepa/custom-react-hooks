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

## Importing the Hook

The `useLockBodyScroll` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useLockBodyScroll } from '@custom-react-hooks/use-lock-body';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


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