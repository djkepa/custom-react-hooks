import React from 'react';
import useOnScreen from '../src/hooks/useOnScreen'; 

const MyComponent = () => {
  const { ref, isIntersecting } = useOnScreen<HTMLDivElement>({ threshold: 0.5 }, true);

  return (
    <div ref={ref}>
      {isIntersecting ? 'Element is visible' : 'Element is not visible'}
    </div>
  );
};
