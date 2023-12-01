import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import ClipboardComponent from '../examples/useClipboard.example';
import '@testing-library/jest-dom';

// Mock the useClipboard hook
jest.mock('../hook/useClipboard', () => ({
  __esModule: true, // This property is needed for proper default export mocking
  default: () => {
    return {
      copyToClipboard: jest.fn(),
      pasteFromClipboard: jest.fn().mockResolvedValue('Mocked Text'),
      state: { success: true, error: null },
    };
  },
}));

describe('ClipboardComponent', () => {
  it('should handle copy to clipboard', async () => {
    render(<ClipboardComponent />);
    const input = screen.getByRole('textbox');
    const copyButton = screen.getByText('Copy to Clipboard');

    fireEvent.change(input, { target: { value: 'Test' } });

    await act(async () => {
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.queryByText('Action successful!')).toBeInTheDocument();
      });
    });
  });

  it('should handle paste from clipboard', async () => {
    render(<ClipboardComponent />);
    const pasteButton = screen.getByText('Paste from Clipboard');

    await act(async () => {
      fireEvent.click(pasteButton);

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('Mocked Text');
        expect(screen.queryByText('Action successful!')).toBeInTheDocument();
      });
    });
  });
});
