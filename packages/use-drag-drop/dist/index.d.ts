export interface DragDropState {
    isDragging: boolean;
    isOver: boolean;
    dragData: any;
    dropData: any;
}
declare const useDragDrop: (dragData: any, onDrop: (data: any) => void) => {
    state: DragDropState;
    bindDrag: {
        draggable: boolean;
        onDragStart: (e: React.DragEvent) => void;
        onDragEnd: () => void;
    };
    bindDrop: {
        onDragOver: (e: React.DragEvent) => void;
        onDrop: (e: React.DragEvent) => void;
        onDragLeave: () => void;
    };
};
export default useDragDrop;
//# sourceMappingURL=index.d.ts.map