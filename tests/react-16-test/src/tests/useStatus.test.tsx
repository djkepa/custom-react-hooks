import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NetworkStatusComponent from '../examples/useStatus.example';

describe('NetworkStatusComponent', () => {
  beforeEach(() => {
    const addEventListenerMock = jest.fn((event, handler) => {});
    const removeEventListenerMock = jest.fn((event, handler) => {});

    const mockConnection = {
      downlink: 2.5,
      effectiveType: '4g',
      rtt: 50,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    };

    Object.defineProperty(navigator, 'connection', {
      value: mockConnection,
      writable: true,
    });

    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
    });
  });

  it('displays online status initially', () => {
    render(<NetworkStatusComponent />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('updates to offline status', async () => {
    // Mock window.navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });

    render(<NetworkStatusComponent />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('updates network information', () => {
    Object.defineProperty(navigator, 'connection', {
      value: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        downlink: 2.5,
        effectiveType: '4g',
        rtt: 50,
      },
      writable: true,
    });

    render(<NetworkStatusComponent />);
    expect(screen.getByText('Downlink Speed: 2.5 Mbps')).toBeInTheDocument();
    expect(screen.getByText('Effective Type: 4g')).toBeInTheDocument();
    expect(screen.getByText('RTT: 50 ms')).toBeInTheDocument();
  });
});
