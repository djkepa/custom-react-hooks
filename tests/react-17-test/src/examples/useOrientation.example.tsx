import React from 'react';
import useOrientation from '../src/hooks/useOrientation';

const MyComponent = () => {
  const { angle, type } = useOrientation();

  return (
    <div>
      <p>Current Angle: {angle} degrees</p>
      <p>Orientation Type: {type}</p>
    </div>
  );
};