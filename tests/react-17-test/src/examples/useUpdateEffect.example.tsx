import React from 'react';
import useUpdateEffect from '../src/hooks/useUpdateEffect';

const MyComponent = ({ value }) => {
  useUpdateEffect(() => {
    // Effect logic here
    console.log('Value updated:', value);

    return () => {
      // Optional cleanup logic
    };
  }, [value]);

  return <div>Current Value: {value}</div>;
};