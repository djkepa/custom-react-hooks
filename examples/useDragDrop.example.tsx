import React from 'react';
import { useDragDrop } from '../src/hooks/useDragDrop';

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