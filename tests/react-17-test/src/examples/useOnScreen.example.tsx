import React from 'react';
import useOnScreen from '../hook/useOnScreen';

const OnScreenTestComponent: React.FC = () => {
  const { ref, isIntersecting } = useOnScreen<HTMLDivElement>();

  return (
    <div>
      <div
        ref={ref}
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: isIntersecting ? 'green' : 'red',
        }}
      >
        Test Box
      </div>
      <p>{isIntersecting ? 'Visible in viewport' : 'Not visible in viewport'}</p>
    </div>
  );
};

export default OnScreenTestComponent;
