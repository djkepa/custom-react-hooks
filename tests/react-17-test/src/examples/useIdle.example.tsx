import React from 'react';
import useIdle from '../hook/useIdle';

const TestComponent = ({ idleTime }: any) => {
  const isIdle = useIdle(idleTime);

  return (
    <div>
      <p data-testid="idle-status">{isIdle ? 'Idle' : 'Not Idle'}</p>
    </div>
  );
};

export default TestComponent;
