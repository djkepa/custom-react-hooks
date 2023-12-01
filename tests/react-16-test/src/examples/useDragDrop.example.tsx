import React from 'react';
import useDragDrop from '../hook/useDragDrop';

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
