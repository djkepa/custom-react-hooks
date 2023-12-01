import React, { useRef } from 'react';
import useMouse, { MouseOptions } from '../hook/useMouse';

type TestComponentProps = {
  options?: MouseOptions;
};

const TestComponent: React.FC<TestComponentProps> = ({ options }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mousePosition = useMouse(ref, options);

  return (
    <div
      ref={ref}
      className="container"
    >
      <div className="tooltip">
        Mouse Position: ({mousePosition.x}, {mousePosition.y})
      </div>
    </div>
  );
};

export default TestComponent;
