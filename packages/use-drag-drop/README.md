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

## Importing the Hook

The `useDragDrop` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useDragDrop } from '@custom-react-hooks/use-drag-drop';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


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