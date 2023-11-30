import React from 'react';
import usePermission from '../src/hooks/usePermission';

const MyComponent: React.FC = () => {
  const { state, isLoading, error } = usePermission('microphone');

  if (isLoading) {
    return <p>Checking microphone permission...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      Microphone permission status: {state}
    </div>
  );
};

export default MyComponent;