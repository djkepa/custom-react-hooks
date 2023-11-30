import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useKeyPress from '../../../../packages/use-key-press/src/index';

function TestComponent({ targetKey }: any) {
  const keyPressed = useKeyPress(targetKey);

  return <div data-testid="key-status">{keyPressed ? 'Key Pressed' : 'Key Not Pressed'}</div>;
}

describe('useKeyPress Hook', () => {
  it('should detect when a specified key is pressed and released', async () => {
    const { getByTestId } = render(<TestComponent targetKey="Enter" />);

    expect(getByTestId('key-status')).toHaveTextContent('Key Not Pressed');

    fireEvent.keyDown(window, { key: 'Enter' });
    await waitFor(() => expect(getByTestId('key-status')).toHaveTextContent('Key Pressed'));

    fireEvent.keyUp(window, { key: 'Enter' });
    await waitFor(() => expect(getByTestId('key-status')).toHaveTextContent('Key Not Pressed'));
  });
});
