# `usePermission` Hook

`usePermission` is a React hook designed to query and monitor the status of user permissions for various browser APIs such as geolocation, notifications, microphone, and camera.

## Features

- **Permission Querying**: Queries the status of a specified permission.
- **Real-time Updates**: Monitors and updates the permission status in real-time if it changes.
- **Error Handling**: Provides error messages if the Permissions API is not supported or if an error occurs during the query.
- **SSR Compatibility**: Executes safely in a server-side rendering environment by avoiding direct browser API calls during SSR.

## Installation

To integrate `usePermission` into your project:

```bash
npm install @custom-react-hooks/use-permission
```

or

```bash
yarn add @custom-react-hooks/use-permission
```

## Usage

```tsx
import React from 'react';
import usePermission from '@custom-react-hooks/use-permission';

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

```

In this example, `usePermission` is used to check the permission status of the user's microphone.

## API Reference

- `usePermission(permissionName: PermissionName)`: A function that accepts a permission name and returns the permission state.
- Parameters:
  - `permissionName`: A string that represents the permission to query. It must be one of the supported permission names defined by the Permissions API.
- Returns an object with:
  - `state`: A string representing the permission state (`'prompt'`, `'granted'`, or `'denied'`).
  - `isLoading`: A boolean indicating if the permission query is in progress.
  - `error`: A string containing an error message if the query fails or if the Permissions API is not supported.

## Contributing

We welcome contributions to `usePermission`. Please report bugs or suggest feature enhancements through issues or pull requests in the project's repository.