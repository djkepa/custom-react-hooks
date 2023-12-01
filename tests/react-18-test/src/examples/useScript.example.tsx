import React from 'react';
import useScript from '../hook/useScript';

interface ScriptTestComponentProps {
  src: string;
}

const ScriptTestComponent: React.FC<ScriptTestComponentProps> = ({ src }) => {
  const status = useScript(src);

  return (
    <div>
      <p>Script status: {status}</p>
    </div>
  );
};

export default ScriptTestComponent;
