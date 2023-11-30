import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import useMediaDevices from '../src/index';
function TestComponent() {
  const { devices, isLoading, error } = useMediaDevices();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {devices.map((device) => (
        <li key={device.id}>{device.label}</li>
      ))}
    </ul>
  );
}

describe('useMediaDevices Hook', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        enumerateDevices: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        getUserMedia: jest.fn(),
      },
      writable: true,
    });

    global.navigator.mediaDevices.enumerateDevices = jest.fn().mockResolvedValue([
      { deviceId: '1', kind: 'audioinput', label: 'Microphone' },
      { deviceId: '2', kind: 'videoinput', label: 'Camera' },
    ]) as jest.MockedFunction<() => Promise<MediaDeviceInfo[]>>;
  });

  it('should handle the enumeration of media devices', async () => {
    const { findByText } = render(<TestComponent />);
    expect(await findByText('Microphone')).toBeInTheDocument();
    expect(await findByText('Camera')).toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    // Delay the resolution of enumerateDevices to simulate loading
    global.navigator.mediaDevices.enumerateDevices = jest
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve([]), 100)));

    const { getByText } = render(<TestComponent />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle errors in enumerating devices', async () => {
    // Mock a rejection for enumerateDevices
    global.navigator.mediaDevices.enumerateDevices = jest
      .fn()
      .mockRejectedValue(new Error('Enumeration error'));

    const { findByText } = render(<TestComponent />);
    expect(await findByText('Error: Unable to enumerate devices')).toBeInTheDocument();
  });
});
