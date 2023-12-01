// MediaDevicesComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaDevicesComponent from '../examples/useMediaDevices.example';

describe('MediaDevicesComponent', () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        enumerateDevices: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
    });
  });

  it('displays loading initially', () => {
    navigator.mediaDevices.enumerateDevices = jest.fn().mockResolvedValue([]);
    render(<MediaDevicesComponent />);
    expect(screen.getByText('Loading devices...')).toBeInTheDocument();
  });

  it('displays devices once loaded', async () => {
    const mockDevices = [
      { deviceId: '1', kind: 'audioinput', label: 'Microphone' },
      { deviceId: '2', kind: 'videoinput', label: 'Camera' },
    ];
    navigator.mediaDevices.enumerateDevices = jest.fn().mockResolvedValue(mockDevices);
    render(<MediaDevicesComponent />);

    expect(await screen.findByText('audioinput: Microphone')).toBeInTheDocument();
    expect(screen.getByText('videoinput: Camera')).toBeInTheDocument();
  });

  it('displays an error message if devices cannot be loaded', async () => {
    navigator.mediaDevices.enumerateDevices = jest
      .fn()
      .mockRejectedValue(new Error('Error fetching devices'));
    render(<MediaDevicesComponent />);
    expect(await screen.findByText('Error: Unable to enumerate devices')).toBeInTheDocument();
  });
});
