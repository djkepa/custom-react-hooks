export interface DragDropState {
    isDragging: boolean;
    isOver: boolean;
    draggedItemId: string | null;
    overDropId: string | null;
}
declare const useDragDrop: (onDrop: (dragId: string, dropId: string) => void) => {
    state: DragDropState;
    bindDrag: (dragId: string) => {
        draggable: boolean;
        onDragStart: (e: React.DragEvent) => void;
    };
    bindDrop: (dropId: string) => {
        onDragOver: (e: React.DragEvent) => void;
        onDragEnter: (e: React.DragEvent) => void;
        onDragLeave: (e: React.DragEvent) => void;
        onDrop: (e: React.DragEvent) => void;
    };
};
export default useDragDrop;
//# sourceMappingURL=index.d.ts.map