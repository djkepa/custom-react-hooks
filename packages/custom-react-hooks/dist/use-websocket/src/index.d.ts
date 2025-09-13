export type ReadyState = typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED;
export interface UseWebSocketOptions {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    shouldReconnect?: boolean;
    reconnectAttempts?: number;
    reconnectInterval?: number;
    protocols?: string | string[];
}
export interface UseWebSocketReturn {
    sendMessage: (message: string | ArrayBuffer | Blob) => void;
    lastMessage: MessageEvent | null;
    readyState: ReadyState;
    connectionStatus: 'Connecting' | 'Open' | 'Closing' | 'Closed';
}
/**
 * `useWebSocket` is a simple hook for managing WebSocket connections in React.
 * It provides an easy way to connect to WebSocket servers, send messages, and handle
 * connection states with optional reconnection functionality.
 *
 * @param socketUrl - The WebSocket URL to connect to
 * @param options - Configuration options for the WebSocket connection
 * @return - An object containing:
 *   - `sendMessage`: Function to send messages through the WebSocket
 *   - `lastMessage`: The last received message event
 *   - `readyState`: Current connection state (numeric)
 *   - `connectionStatus`: Human-readable connection status
 */
declare function useWebSocket(socketUrl: string | null, options?: UseWebSocketOptions): UseWebSocketReturn;
export { useWebSocket };
