import React from 'react';
import usePermission from '../hook/usePermission';

interface PermissionTestComponentProps {
  permissionName: PermissionName;
}

const PermissionTestComponent: React.FC<PermissionTestComponentProps> = ({ permissionName }) => {
  const { state, isLoading, error } = usePermission(permissionName);

  return (
    <div>
      <h1>Permission Status</h1>
      <p>Permission: {permissionName}</p>
      <p>Status: {isLoading ? 'Loading...' : state}</p>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PermissionTestComponent;
