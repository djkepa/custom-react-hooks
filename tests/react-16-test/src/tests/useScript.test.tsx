// ScriptTestComponent.test.tsx
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScriptTestComponent from '../examples/useScript.example';

describe('ScriptTestComponent', () => {
  let originalCreateElement: any;

  beforeEach(() => {
    originalCreateElement = document.createElement;
    document.createElement = jest.fn((tag) => {
      if (tag === 'script') {
        const script = originalCreateElement.call(document, 'script');
        return script;
      }
      return originalCreateElement.call(document, tag);
    });
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
  });

  it('handles script loading successfully', () => {
    const scriptSrc = 'https://example.com/script.js';
    render(<ScriptTestComponent src={scriptSrc} />);
    act(() => {
      const script = document.querySelector('script[src="' + scriptSrc + '"]');
      script && script.dispatchEvent(new Event('load'));
    });
    expect(screen.getByText('Script status: ready')).toBeInTheDocument();
  });

  it('does not reload an existing script', () => {
    // Mock existing script in DOM
    const script = originalCreateElement.call(document, 'script');
    script.src = 'https://example.com/existing-script.js';
    document.body.appendChild(script);

    render(<ScriptTestComponent src="https://example.com/existing-script.js" />);
    expect(screen.getByText('Script status: unknown')).toBeInTheDocument();
  });

  jest.useFakeTimers();
});
