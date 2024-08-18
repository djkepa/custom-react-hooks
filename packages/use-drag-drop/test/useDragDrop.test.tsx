import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import { useDragDrop } from '../src/index';

const TestComponent = ({ onDrop }) => {
  const { state, bindDrag, bindDrop } = useDragDrop(onDrop);

  return (
    <div>
      <div
        {...bindDrag('draggable-item')}
        data-testid="draggable"
      >
        Draggable
      </div>
      <div
        {...bindDrop('droppable-area')}
        data-testid="droppable"
      >
        Droppable
      </div>
    </div>
  );
};

describe('useDragDrop', () => {
  it('should handle drag and drop events correctly', () => {
    const mockOnDrop = jest.fn();
    const { getByTestId } = render(<TestComponent onDrop={mockOnDrop} />);

    const draggable = getByTestId('draggable');
    const droppable = getByTestId('droppable');

    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn().mockReturnValue('draggable-item'),
      clearData: jest.fn(),
      setDragImage: jest.fn(),
      effectAllowed: '',
      dropEffect: '',
    };

    fireEvent.dragStart(draggable, { dataTransfer });

    fireEvent.dragEnter(droppable, { dataTransfer });
    fireEvent.dragOver(droppable, { dataTransfer });

    fireEvent.drop(droppable, { dataTransfer });

    fireEvent.dragEnd(draggable);

    expect(mockOnDrop).toHaveBeenCalledWith('draggable-item', 'droppable-area');
    expect(mockOnDrop).toHaveBeenCalledTimes(1);
  });
});
