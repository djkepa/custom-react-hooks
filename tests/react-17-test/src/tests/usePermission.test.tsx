// PermissionTestComponent.test.tsx
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PermissionTestComponent from '../examples/usePermission.examples';

describe('PermissionTestComponent', () => {
  let originalPermissions: (typeof navigator)['permissions'];

  beforeAll(() => {
    originalPermissions = navigator.permissions;

    // Define a mock permissions object
    Object.defineProperty(navigator, 'permissions', {
      configurable: true,
      writable: true,
      value: {
        query: jest.fn(),
      },
    });
  });

  beforeEach(() => {
    (navigator.permissions.query as jest.Mock).mockResolvedValue({ state: 'prompt' });
  });

  it('displays granted state for permissions', async () => {
    (navigator.permissions.query as jest.Mock).mockResolvedValue({ state: 'granted' });
    render(<PermissionTestComponent permissionName="geolocation" />);

    // Wait for the text "Status: granted" to appear
    await waitFor(() => {
      expect(screen.getByText('Status: granted')).toBeInTheDocument();
    });
  });

  it('displays error for unsupported permissions', async () => {
    (navigator.permissions.query as jest.Mock).mockRejectedValue(new Error('Permission not found'));
    render(<PermissionTestComponent permissionName={'unknown-permission' as PermissionName} />);

    // Wait for an error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
