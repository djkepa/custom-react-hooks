import React from 'react';
import useStatus from '../hook/useStatus';

const NetworkStatusComponent: React.FC = () => {
  const { online, downlink, effectiveType, rtt } = useStatus();

  return (
    <div>
      <h1>Network Status</h1>
      <p>{online ? 'Online' : 'Offline'}</p>
      {downlink && <p>Downlink Speed: {downlink} Mbps</p>}
      {effectiveType && <p>Effective Type: {effectiveType}</p>}
      {rtt && <p>RTT: {rtt} ms</p>}
    </div>
  );
};

export default NetworkStatusComponent;
