import { useState, useCallback } from 'react';

export interface DragDropState {
  isDragging: boolean;
  isOver: boolean;
  draggedItemId: string | null;
  overDropId: string | null;
}

/**
 * `useDragDrop` is a hook for enabling drag and drop interactions in your component.
 * It manages the state and events related to dragging and dropping items.
 *
 * @param dragData - The data associated with the drag item.
 * @param onDrop - The function to execute when an item is dropped.
 * @return - An object containing the drag and drop state and binding functions for draggable and droppable elements.
 */

const useDragDrop = (onDrop: (dragId: string, dropId: string) => void) => {
  const [state, setState] = useState<DragDropState>({
    isDragging: false,
    isOver: false,
    draggedItemId: null,
    overDropId: null,
  });

  const handleDragStart = useCallback((e: React.DragEvent, dragId: string) => {
    e.dataTransfer.setData('text/plain', dragId);
    e.dataTransfer.effectAllowed = 'move';
    setState({ isDragging: true, isOver: false, draggedItemId: dragId, overDropId: null });
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, dropId: string) => {
      e.preventDefault();
      if (state.overDropId !== dropId) {
        setState((s) => ({ ...s, isOver: true, overDropId: dropId }));
      }
    },
    [state.overDropId],
  );

  const handleDragEnter = useCallback((e: React.DragEvent, dropId: string) => {
    e.preventDefault();
    setState((s) => ({ ...s, isOver: true, overDropId: dropId }));
  }, []);

  const handleDragLeave = useCallback(
    (e: React.DragEvent, dropId: string) => {
      e.preventDefault();
      if (state.overDropId === dropId) {
        setState((s) => ({ ...s, isOver: false, overDropId: null }));
      }
    },
    [state.overDropId],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, dropId: string) => {
      e.preventDefault();
      const dragId = e.dataTransfer.getData('text/plain');
      setState({ isDragging: false, isOver: false, draggedItemId: dragId, overDropId: dropId });
      onDrop(dragId, dropId);
    },
    [onDrop],
  );

  return {
    state,
    bindDrag: (dragId: string) => ({
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleDragStart(e, dragId),
    }),
    bindDrop: (dropId: string) => ({
      onDragOver: (e: React.DragEvent) => handleDragOver(e, dropId),
      onDragEnter: (e: React.DragEvent) => handleDragEnter(e, dropId),
      onDragLeave: (e: React.DragEvent) => handleDragLeave(e, dropId),
      onDrop: (e: React.DragEvent) => handleDrop(e, dropId),
    }),
  };
};

export { useDragDrop };
