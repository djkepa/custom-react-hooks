import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useKeyPress from '../src/index';

function TestComponent({ targetKey }) {
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

// // Test component to use the hook
// function TestComponent({ targetKey, options }) {
//   const keyPressed = useKeyPress(targetKey, options);
//   return <div data-testid="key-press-state">{keyPressed ? 'Pressed' : 'Not Pressed'}</div>;
// }

// describe('useKeyPress', () => {
//   it('should detect when the target key is pressed and released', async () => {
//     const targetKey = 'Enter';
//     const { getByTestId } = render(<TestComponent targetKey={targetKey} options={{}} />);

//     expect(getByTestId('key-press-state').textContent).toBe('Not Pressed');

//     // Wrap the key events and assertions in act
//     act(() => {
//       fireEvent.keyDown(window, { key: targetKey });
//     });
//     expect(getByTestId('key-press-state').textContent).toBe('Pressed');

//     act(() => {
//       fireEvent.keyUp(window, { key: targetKey });
//     });
//     expect(getByTestId('key-press-state').textContent).toBe('Not Pressed');
//   });

//   it('should not respond to non-target keys', () => {
//     const targetKey = 'Enter';
//     const { getByTestId } = render(<TestComponent targetKey={targetKey} options={{}} />);

//     fireEvent.keyDown(window, { key: 'Escape' });
//     expect(getByTestId('key-press-state').textContent).toBe('Not Pressed');
//   });

//    it('should respect debounce timing', async () => {
//     const targetKey = 'Enter';
//     const debounceTime = 500;
//     const { getByTestId } = render(<TestComponent targetKey={targetKey} options={{ debounce: debounceTime }} />);

//     act(() => {
//       fireEvent.keyDown(window, { key: targetKey });
//     });
//     expect(getByTestId('key-press-state').textContent).toBe('Not Pressed');

//     // Wait for the debounce time plus a small buffer
//     await waitFor(() => {
//       expect(getByTestId('key-press-state').textContent).toBe('Pressed');
//     }, { timeout: debounceTime + 100 });

//     act(() => {
//       fireEvent.keyUp(window, { key: targetKey });
//     });
//     await waitFor(() => {
//       expect(getByTestId('key-press-state').textContent).toBe('Not Pressed');
//     }, { timeout: debounceTime + 100 });
//   });
// });
