import React from 'react';
import useEffectOnce from '../hook/useEffectOnce';

const EffectOnceComponent: React.FC = () => {
  useEffectOnce(() => {
    console.log('This effect runs only once after the component mounts.');

    return () => {
      console.log('This cleanup runs when the component unmounts.');
    };
  });

  return <div>My Component</div>;
};

export default EffectOnceComponent;
