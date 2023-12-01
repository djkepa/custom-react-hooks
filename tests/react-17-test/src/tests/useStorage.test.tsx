import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StorageTestComponent from '../examples/useStorage.example';

describe('StorageTestComponent', () => {
  let unmountComponent: any;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    if (unmountComponent) {
      unmountComponent(); // Ensure the component is unmounted after each test
    }
  });
  it('initially displays default stored value', () => {
    const { unmount } = render(<StorageTestComponent />);
    unmountComponent = unmount;
    expect(screen.getByText('Stored Value:')).toBeInTheDocument();
  });

  it('updates the stored value on save', () => {
    render(<StorageTestComponent />);
    const input = screen.getByRole('textbox');
    const saveButton = screen.getByText('Save to Storage');

    fireEvent.change(input, { target: { value: 'New Value' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Stored Value: New Value')).toBeInTheDocument();
  });

  it('persists stored value across renders', () => {
    const { unmount } = render(<StorageTestComponent />);
    unmountComponent = unmount;

    const input = screen.getByRole('textbox');
    const saveButton = screen.getByText('Save to Storage');

    fireEvent.change(input, { target: { value: 'Persistent Value' } });
    fireEvent.click(saveButton);

    unmount(); // Unmount the first instance

    const { unmount: unmountSecond } = render(<StorageTestComponent />);
    unmountComponent = unmountSecond;

    expect(screen.getByText('Stored Value: Persistent Value')).toBeInTheDocument();
  });
});
