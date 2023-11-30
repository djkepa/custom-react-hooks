import React from 'react';
import useMediaQuery from '../src/hooks/useMediaQuery';

const MyResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div>
      {isMobile ? <p>Mobile View</p> : <p>Desktop View</p>}
    </div>
  );
};