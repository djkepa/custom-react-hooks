import React from 'react';
import { render } from '@testing-library/react';
import useLockBodyScroll from '../src/index'; 

function TestComponent({ lock }) {
  useLockBodyScroll(lock);
  return <div>Test</div>;
}

describe('useLockBodyScroll', () => {
  it('locks body scroll when active', () => {
    render(<TestComponent lock={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores original body scroll when not active', () => {
    const originalOverflow = document.body.style.overflow;
    render(<TestComponent lock={false} />);
    expect(document.body.style.overflow).toBe(originalOverflow);
  });
});
