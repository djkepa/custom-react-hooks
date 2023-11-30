import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePortal from '../src/index';

function TestComponent() {
  const { Portal, openPortal, closePortal, isOpen } = usePortal();

  return (
    <div>
      <button onClick={openPortal}>Open Portal</button>
      <button onClick={closePortal}>Close Portal</button>
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
      {isOpen && <div data-testid="backdrop">Backdrop</div>}
    </div>
  );
}

describe('usePortal Hook', () => {
  let appendChildMock;
  let removeChildMock;

  beforeEach(() => {
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = jest.fn((tagName) => {
      return tagName === 'div' ? originalCreateElement('div') : originalCreateElement(tagName);
    });

    appendChildMock = jest.spyOn(document.body, 'appendChild');
    removeChildMock = jest.spyOn(document.body, 'removeChild');
  });

  afterEach(() => {
    document.createElement = document.createElement.bind(document);
    appendChildMock.mockRestore();
    removeChildMock.mockRestore();
  });

  it('opens and closes the portal correctly', () => {
    const { getByText, getByTestId, queryByTestId } = render(<TestComponent />);

    act(() => {
      getByText('Open Portal').click();
    });

    expect(getByTestId('portal-content')).toBeInTheDocument();
    expect(getByTestId('backdrop')).toBeInTheDocument();

    act(() => {
      getByText('Close Portal').click();
    });

    expect(queryByTestId('portal-content')).not.toBeInTheDocument();
    expect(queryByTestId('backdrop')).not.toBeInTheDocument();
  });

  // Additional tests can be added for more specific behaviors
});
