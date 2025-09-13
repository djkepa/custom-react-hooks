"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebSocket = void 0;
var react_1 = require("react");
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
function useWebSocket(socketUrl, options) {
    if (options === void 0) { options = {}; }
    var onOpen = options.onOpen, onClose = options.onClose, onMessage = options.onMessage, onError = options.onError, _a = options.shouldReconnect, shouldReconnect = _a === void 0 ? false : _a, _b = options.reconnectAttempts, reconnectAttempts = _b === void 0 ? 3 : _b, _c = options.reconnectInterval, reconnectInterval = _c === void 0 ? 3000 : _c, protocols = options.protocols;
    var _d = (0, react_1.useState)(null), lastMessage = _d[0], setLastMessage = _d[1];
    var _e = (0, react_1.useState)(WebSocket.CONNECTING), readyState = _e[0], setReadyState = _e[1];
    var webSocketRef = (0, react_1.useRef)(null);
    var reconnectAttemptsRef = (0, react_1.useRef)(0);
    var reconnectTimeoutRef = (0, react_1.useRef)(null);
    var getConnectionStatus = function (state) {
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
    var connect = (0, react_1.useCallback)(function () {
        if (!socketUrl || typeof window === 'undefined')
            return;
        try {
            var ws = new WebSocket(socketUrl, protocols);
            webSocketRef.current = ws;
            ws.onopen = function (event) {
                setReadyState(WebSocket.OPEN);
                reconnectAttemptsRef.current = 0;
                onOpen === null || onOpen === void 0 ? void 0 : onOpen(event);
            };
            ws.onclose = function (event) {
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
            ws.onmessage = function (event) {
                setLastMessage(event);
                onMessage === null || onMessage === void 0 ? void 0 : onMessage(event);
            };
            ws.onerror = function (event) {
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
    var sendMessage = (0, react_1.useCallback)(function (message) {
        var _a;
        if (((_a = webSocketRef.current) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
            webSocketRef.current.send(message);
        }
        else {
            console.warn('WebSocket is not connected. Message not sent:', message);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (socketUrl) {
            connect();
        }
        return function () {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [connect, socketUrl]);
    return {
        sendMessage: sendMessage,
        lastMessage: lastMessage,
        readyState: readyState,
        connectionStatus: getConnectionStatus(readyState),
    };
}
exports.useWebSocket = useWebSocket;
