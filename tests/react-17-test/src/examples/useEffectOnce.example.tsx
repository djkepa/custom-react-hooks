import React from 'react';
import useEffectOnce from '../src/hooks/useEffectOnce';

const MyComponent: React.FC = () => {
  useEffectOnce(() => {
    console.log('This effect runs only once after the component mounts.');

    return () => {
      console.log('This cleanup runs when the component unmounts.');
    };
  });

  return <div>My Component</div>;
};
