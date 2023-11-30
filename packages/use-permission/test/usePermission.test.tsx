import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePermission from '../src/index';

function TestComponent({ permissionName }) {
  const { state, isLoading, error } = usePermission(permissionName);
  return <div>{isLoading ? 'Loading...' : error ? `Error: ${error}` : `Permission: ${state}`}</div>;
}

describe('usePermission Hook', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'permissions', {
      value: {
        query: jest.fn(),
      },
      writable: true,
    });
  });

  it('should handle granted permission', async () => {
    navigator.permissions.query = jest.fn().mockResolvedValue({ state: 'granted', onchange: null });
    const { findByText } = render(<TestComponent permissionName="geolocation" />);
    expect(await findByText('Permission: granted')).toBeInTheDocument();
  });

  it('should handle denied permission', async () => {
    navigator.permissions.query = jest.fn().mockResolvedValue({ state: 'denied', onchange: null });
    const { findByText } = render(<TestComponent permissionName="notifications" />);
    expect(await findByText('Permission: denied')).toBeInTheDocument();
  });
});
