import React from 'react';
import { render, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useScript from '../src/index';

describe('useScript Hook', () => {
  it('renders without crashing', () => {
    renderHook(() => useScript('https://example.com/script.js'));
  });
});

// function TestComponent({ src, removeOnUnmount }: { src: string; removeOnUnmount?: boolean }) {
//   const status = useScript(src, removeOnUnmount);
//   return <div data-testid="status">Status: {status}</div>;
// }

// describe('useScript Hook', () => {
//   let originalCreateElement;

//   beforeEach(() => {
//     // Store the original createElement function
//     originalCreateElement = document.createElement.bind(document);

//     jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
//       if (tagName === 'script') {
//         // Mock script creation with necessary properties and methods
//         const mockScriptElement = {
//           setAttribute: jest.fn(),
//           addEventListener: jest.fn((event, callback) => {
//             if (event === 'load') {
//               setTimeout(callback, 0); // Simulate async script loading
//             }
//           }),
//           removeEventListener: jest.fn(),
//           src: '',
//         } as unknown as HTMLScriptElement;
//         return mockScriptElement;
//       }
//       // Call the original createElement for other tags
//       return originalCreateElement(tagName);
//     });

//     jest.spyOn(document.body, 'appendChild').mockImplementation((element: Node) => element);
//     jest.spyOn(document.body, 'removeChild').mockImplementation((element: Node) => element);
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it('loads a single script', async () => {
//     const { getByTestId } = render(<TestComponent src="https://example.com/script.js" />);

//     await waitFor(() => {
//       const statusElement = getByTestId('status');
//       expect(statusElement.textContent).toBe('Status: loading');
//     });
//   });
// });

// export default useScript;
