# useDragDrop Hook

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
import useDragDrop from '@custom-react-hooks/useDragDrop';

const DragDropTestComponent = ({ onDrop }: any) => {
  const dragData = { id: 1, name: 'Draggable Item' };
  const { state, bindDrag, bindDrop } = useDragDrop(dragData, onDrop);

  return (
    <div>
      <div
        {...bindDrag}
        style={{ border: '1px solid blue', padding: '10px', marginBottom: '10px' }}
      >
        {state.isDragging ? 'Dragging...' : 'Drag Me'}
      </div>
      <div
        {...bindDrop}
        style={{ border: '1px solid green', padding: '10px' }}
      >
        {state.isOver ? 'Drop Here!' : 'Drop Area'}
      </div>
    </div>
  );
};

export default DragDropTestComponent;
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