import React, { useRef } from 'react';
import useMouse from '../src/hooks/useMouse';

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMouse(ref, { offsetX: 15, offsetY: 15, avoidEdges: true });

  return (
    <div ref={ref} style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        Tooltip or Pop-up content
      </div>
    </div>
  );
};