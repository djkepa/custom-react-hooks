import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import useDragDrop from '../src/index';

// Mock Test Component using useDragDrop
const TestComponent = ({ onDrop }) => {
  const { bindDrag, bindDrop } = useDragDrop({ item: 'test' }, onDrop);

  return (
    <div>
      <div
        {...bindDrag}
        data-testid="draggable"
      >
        Draggable
      </div>
      <div
        {...bindDrop}
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

    // Simulate drag and drop events
    const data = { item: 'test' };

    // Create a mock DataTransfer object
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn().mockReturnValue(JSON.stringify(data)),
      clearData: jest.fn(),
      setDragImage: jest.fn(),
      effectAllowed: '',
      dropEffect: '',
    };

    fireEvent.dragStart(draggable, { dataTransfer });

    fireEvent.dragEnter(droppable, { dataTransfer });
    fireEvent.dragOver(droppable, { dataTransfer });

    // Use the mock DataTransfer object in the drop event
    fireEvent.drop(droppable, { dataTransfer });

    fireEvent.dragEnd(draggable);

    // Assertions
    expect(mockOnDrop).toHaveBeenCalledTimes(1);
    // Add more assertions as necessary
  });
});
