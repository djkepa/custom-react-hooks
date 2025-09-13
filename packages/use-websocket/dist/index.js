import { useState, useEffect, useRef, useCallback } from 'react';
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
function useWebSocket(socketUrl, options = {}) {
    const { onOpen, onClose, onMessage, onError, shouldReconnect = false, reconnectAttempts = 3, reconnectInterval = 3000, protocols, } = options;
    const [lastMessage, setLastMessage] = useState(null);
    const [readyState, setReadyState] = useState(WebSocket.CONNECTING);
    const webSocketRef = useRef(null);
    const reconnectAttemptsRef = useRef(0);
    const reconnectTimeoutRef = useRef(null);
    const getConnectionStatus = (state) => {
        switch (state) {
            case WebSocket.CONNECTING:
                return 'Connecting';
            case WebSocket.OPEN:
                return 'Open';
            case WebSocket.CLOSING:
                return 'Closing';
            case WebSocket.CLOSED:
                return 'Closed';
            default:
                return 'Closed';
        }
    };
    const connect = useCallback(() => {
        if (!socketUrl || typeof window === 'undefined')
            return;
        try {
            const ws = new WebSocket(socketUrl, protocols);
            webSocketRef.current = ws;
            ws.onopen = (event) => {
                setReadyState(WebSocket.OPEN);
                reconnectAttemptsRef.current = 0;
                onOpen === null || onOpen === void 0 ? void 0 : onOpen(event);
            };
            ws.onclose = (event) => {
                setReadyState(WebSocket.CLOSED);
                onClose === null || onClose === void 0 ? void 0 : onClose(event);
                // Attempt reconnection if enabled and not manually closed
                if (shouldReconnect &&
                    reconnectAttemptsRef.current < reconnectAttempts &&
                    !event.wasClean) {
                    reconnectAttemptsRef.current += 1;
                    reconnectTimeoutRef.current = setTimeout(connect, reconnectInterval);
                }
            };
            ws.onmessage = (event) => {
                setLastMessage(event);
                onMessage === null || onMessage === void 0 ? void 0 : onMessage(event);
            };
            ws.onerror = (event) => {
                setReadyState(WebSocket.CLOSED);
                onError === null || onError === void 0 ? void 0 : onError(event);
            };
            setReadyState(WebSocket.CONNECTING);
        }
        catch (error) {
            setReadyState(WebSocket.CLOSED);
            console.error('WebSocket connection error:', error);
        }
    }, [
        socketUrl,
        protocols,
        onOpen,
        onClose,
        onMessage,
        onError,
        shouldReconnect,
        reconnectAttempts,
        reconnectInterval,
    ]);
    const sendMessage = useCallback((message) => {
        var _a;
        if (((_a = webSocketRef.current) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
            webSocketRef.current.send(message);
        }
        else {
            console.warn('WebSocket is not connected. Message not sent:', message);
        }
    }, []);
    useEffect(() => {
        if (socketUrl) {
            connect();
        }
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [connect, socketUrl]);
    return {
        sendMessage,
        lastMessage,
        readyState,
        connectionStatus: getConnectionStatus(readyState),
    };
}
export { useWebSocket };
//# sourceMappingURL=index.js.map