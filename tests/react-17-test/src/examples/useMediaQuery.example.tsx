import React from 'react';
import useMediaQuery from '../hook/useMediaQuery';

const MediaQueryTestComponent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return <div>{isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}</div>;
};

export default MediaQueryTestComponent;
