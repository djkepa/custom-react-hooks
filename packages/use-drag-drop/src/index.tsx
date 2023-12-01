import { useState, useCallback } from 'react';

interface DragDropState {
  isDragging: boolean;
  isOver: boolean;
  dragData: any;
  dropData: any;
}

/**
 * `useDragDrop` is a hook for enabling drag and drop interactions in your component.
 * It manages the state and events related to dragging and dropping items.
 *
 * @param dragData - The data associated with the drag item.
 * @param onDrop - The function to execute when an item is dropped.
 * @return - An object containing the drag and drop state and binding functions for draggable and droppable elements.
 */

const useDragDrop = (dragData: any, onDrop: (data: any) => void) => {
  const [state, setState] = useState<DragDropState>({
    isDragging: false,
    isOver: false,
    dragData: null,
    dropData: null,
  });

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      setState((s) => ({ ...s, isDragging: true, dragData: dragData }));
      e.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
      e.dataTransfer.effectAllowed = 'move';
    },
    [dragData],
  );

  const handleDragEnd = useCallback(() => {
    setState((s) => ({ ...s, isDragging: false }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState((s) => ({ ...s, isOver: true }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('application/reactflow'));
      setState((s) => ({ ...s, isOver: false, dropData: data }));
      onDrop(data);
    },
    [onDrop],
  );

  const handleDragLeave = useCallback(() => {
    setState((s) => ({ ...s, isOver: false }));
  }, []);

  return {
    state,
    bindDrag: {
      draggable: true,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
    bindDrop: {
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      onDragLeave: handleDragLeave,
    },
  };
};

export default useDragDrop;
