import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import EffectOnceComponent from '../examples/useEffectOnce.example';

let container: HTMLDivElement | null = null;

beforeEach(() => {
  // Set up a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
  }
});

describe('EffectOnceComponent', () => {
  it('should render the component and execute the effect once', () => {
    const consoleLogSpy = jest.spyOn(console, 'log'); // Spy on console.log

    act(() => {
      render(<EffectOnceComponent />, container);
    });

    // Check that the component has rendered
    expect(container!.querySelector('div')!.textContent).toBe('My Component');

    // Check that the effect function is called once
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'This effect runs only once after the component mounts.',
    );

    // Ensure that the cleanup function is not called yet
    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      'This cleanup runs when the component unmounts.',
    );

    // Unmount the component
    act(() => {
      if (container) {
        unmountComponentAtNode(container);
      }
    });

    // Check that the cleanup function is called when unmounting
    expect(consoleLogSpy).toHaveBeenCalledWith('This cleanup runs when the component unmounts.');

    // Restore the console.log spy
    consoleLogSpy.mockRestore();
  });
});
