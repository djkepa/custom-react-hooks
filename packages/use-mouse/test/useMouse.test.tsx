import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useMouse } from '../src/index';
import '@testing-library/jest-dom';

const TestComponent = ({ options }) => {
  const ref = React.useRef(null);
  const mousePosition = useMouse(ref, options);

  return (
    <div
      ref={ref}
      style={{ width: '200px', height: '200px' }}
      data-testid="mouse-area"
    >
      Mouse X: {mousePosition.x}, Mouse Y: {mousePosition.y}
    </div>
  );
};

describe('useMouse', () => {
  it('tracks mouse position relative to the element', () => {
    const { getByTestId } = render(<TestComponent options={{ offsetX: 10, offsetY: 10 }} />);
    const mouseArea = getByTestId('mouse-area');

    fireEvent.mouseMove(mouseArea, { clientX: 100, clientY: 100 });

    setTimeout(() => {
      expect(mouseArea).toHaveTextContent('Mouse X: 110');
      expect(mouseArea).toHaveTextContent('Mouse Y: 110');
    }, 0);
  });
});
