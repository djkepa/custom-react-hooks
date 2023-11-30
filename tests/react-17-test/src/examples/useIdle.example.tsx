
import React from 'react';
import useIdle from "../src/hooks/useIdle";

const MyComponent = () => {
  const isUserIdle = useIdle(3000); // User is idle after 3 seconds of inactivity

  return (
    <div>
      {isUserIdle ? 'User is idle' : 'User is active'}
    </div>
  );
};