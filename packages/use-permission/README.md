# usePermission Hook

`usePermission` is a React hook designed to query and monitor the status of user permissions for various browser APIs such as geolocation, notifications, microphone, and camera.

## Features

- **Permission Querying**: Queries the status of a specified permission.
- **Real-time Updates**: Monitors and updates the permission status in real-time if it changes.
- **Error Handling**: Provides error messages if the Permissions API is not supported or if an error occurs during the query.
- **SSR Compatibility**: Executes safely in a server-side rendering environment by avoiding direct browser API calls during SSR.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-permission
```

or

```bash
yarn add @custom-react-hooks/use-permission
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

```tsx
import React, { useState } from 'react';
import { usePermission } from '@custom-react-hooks/all';

const PermissionComponent = () => {
  const [selectedPermission, setSelectedPermission] = useState('geolocation');
  const { state, isLoading, error } = usePermission(selectedPermission);

  return (
    <div>
      <h2>Check Browser Permission Status</h2>
      <label htmlFor="permission-select">Choose a permission: </label>
      <select
        id="permission-select"
        value={selectedPermission}
        onChange={(e) => setSelectedPermission(e.target.value)}
      >
        <option value="geolocation">Geolocation</option>
        <option value="notifications">Notifications</option>
        <option value="microphone">Microphone</option>
        <option value="camera">Camera</option>
      </select>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Permission status for {selectedPermission}:
            <span> {state}</span>
          </p>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default PermissionComponent;
```

## API Reference

### Parameters
  - `permissionName`: A string that represents the permission to query. It must be one of the supported permission names defined by the Permissions API.

### Returns
  - `state`: A string representing the permission state (`'prompt'`, `'granted'`, or `'denied'`).
  - `isLoading`: A boolean indicating if the permission query is in progress.
  - `error`: A string containing an error message if the query fails or if the Permissions API is not supported.

## Use Cases

- **Feature Availability Checks**: Check if a user has granted permission for features like geolocation, notifications, or camera access.
- **Conditional Feature Access**: Enable or disable features based on permission status.
- **User Permission Management**: Prompt users for necessary permissions or provide feedback on their status.
- **Privacy Compliance**: Ensure compliance with privacy practices by checking permissions before accessing sensitive features.

## Contributing

We welcome contributions to `usePermission`. Please report bugs or suggest feature enhancements through issues or pull requests in the project's repository.