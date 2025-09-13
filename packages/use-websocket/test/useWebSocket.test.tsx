import { renderHook, act, waitFor } from '@testing-library/react';
import { useWebSocket } from '../src/index';

// Mock WebSocket
class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(public url: string, public protocols?: string | string[]) {
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.(new Event('open'));
    }, 0);
  }

  send(data: string | ArrayBuffer | Blob) {
    if (this.readyState === MockWebSocket.OPEN) {
      // Simulate receiving the sent message
      setTimeout(() => {
        const event = new MessageEvent('message', { data });
        this.onmessage?.(event);
      }, 0);
    }
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    setTimeout(() => {
      const event = new CloseEvent('close', { wasClean: true });
      this.onclose?.(event);
    }, 0);
  }
}

// Replace global WebSocket with mock
(global as any).WebSocket = MockWebSocket;

describe('useWebSocket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with connecting state', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'));

    expect(result.current.readyState).toBe(WebSocket.CONNECTING);
    expect(result.current.connectionStatus).toBe('Connecting');
    expect(result.current.lastMessage).toBeNull();
  });

  it('should connect and change state to open', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'));

    await waitFor(() => {
      expect(result.current.readyState).toBe(WebSocket.OPEN);
    });

    expect(result.current.connectionStatus).toBe('Open');
  });

  it('should send and receive messages', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'));

    await waitFor(() => {
      expect(result.current.readyState).toBe(WebSocket.OPEN);
    });

    act(() => {
      result.current.sendMessage('test message');
    });

    await waitFor(() => {
      expect(result.current.lastMessage?.data).toBe('test message');
    });
  });

  it('should call onOpen callback', async () => {
    const onOpen = jest.fn();
    renderHook(() => useWebSocket('ws://localhost:8080', { onOpen }));

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  it('should call onMessage callback', async () => {
    const onMessage = jest.fn();
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080', { onMessage }));

    await waitFor(() => {
      expect(result.current.readyState).toBe(WebSocket.OPEN);
    });

    act(() => {
      result.current.sendMessage('test');
    });

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledWith(expect.any(MessageEvent));
    });
  });

  it('should not connect when socketUrl is null', () => {
    const { result } = renderHook(() => useWebSocket(null));

    expect(result.current.readyState).toBe(WebSocket.CONNECTING);
  });

  it('should handle protocols parameter', () => {
    const protocols = ['protocol1', 'protocol2'];
    const mockConstructor = jest
      .fn()
      .mockImplementation((url, prots) => new MockWebSocket(url, prots));
    (global as any).WebSocket = mockConstructor;

    renderHook(() => useWebSocket('ws://localhost:8080', { protocols }));

    expect(mockConstructor).toHaveBeenCalledWith('ws://localhost:8080', protocols);
  });

  it('should warn when sending message while not connected', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { result } = renderHook(() => useWebSocket('ws://localhost:8080'));

    act(() => {
      result.current.sendMessage('test');
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'WebSocket is not connected. Message not sent:',
      'test',
    );

    consoleSpy.mockRestore();
  });
});
