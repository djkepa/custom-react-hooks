import React from 'react';
import useStatus from "../src/hooks/useStatus";

const MyComponent = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <p>{online ? 'Online' : 'Offline'}</p>
      {online && (
        <>
          <p>Downlink Speed: {downlink} Mbps</p>
          <p>Effective Connection Type: {effectiveType}</p>
          <p>Round-trip Time: {rtt} ms</p>
        </>
      )}
    </div>
  );
};