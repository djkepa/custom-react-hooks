import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import DragDropTestComponent from '../examples/useDragDrop.example';

describe('DragDropTestComponent', () => {
  jest.useFakeTimers();

  // Define a type for the mock dataTransfer object
  type MockDataTransfer = {
    data: Record<string, string>;
    setData: (key: string, value: string) => void;
    getData: (key: string) => string | undefined;
  };

  const mockDataTransfer: MockDataTransfer = {
    data: {},
    setData: function (key, value) {
      this.data[key] = value;
    },
    getData: function (key) {
      return this.data[key];
    },
  };

  it('handles drag and drop', async () => {
    const handleDrop = jest.fn();
    const { getByText } = render(<DragDropTestComponent onDrop={handleDrop} />);

    const dragItem = getByText('Drag Me');
    const dropArea = getByText('Drop Area');

    // Simulate drag start
    fireEvent.dragStart(dragItem, { dataTransfer: mockDataTransfer });
    expect(dragItem.textContent).toBe('Dragging...');

    // Simulate drag over drop area
    fireEvent.dragOver(dropArea, { dataTransfer: mockDataTransfer });
    expect(dropArea.textContent).toBe('Drop Here!');

    // Simulate drop
    fireEvent.drop(dropArea, { dataTransfer: mockDataTransfer });

    await waitFor(() => expect(dropArea.textContent).toBe('Drop Area'));

    expect(handleDrop).toHaveBeenCalledWith({ id: 1, name: 'Draggable Item' });

    // Simulate drag end
    fireEvent.dragEnd(dragItem, { dataTransfer: mockDataTransfer });
    expect(dragItem.textContent).toBe('Drag Me');
  });
});
