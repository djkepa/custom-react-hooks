import React from 'react';
import useHover from "../src/hooks/useHover";

const MyComponent = () => {
  const { ref, isHovered } = useHover<HTMLDivElement>(); 

  return (
    <div ref={ref}>
      {isHovered ? 'Hovering' : 'Not Hovering'}
    </div>
  );
};