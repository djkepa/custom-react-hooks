import React from 'react';
import useWebSocket from '../src/hooks/useWebSocket';

const WebSocketComponent = () => {
  const { sendMessage, isConnected } = useWebSocket('wss://example.com', {
    onOpen: () => console.log('Connected'),
    onClose: () => console.log('Disconnected'),
    onMessage: (message) => console.log('New message:', message.data),
    onError: () => console.log('Error'),
  });

  const sendMsg = () => {
    sendMessage('Hello, WebSocket!');
  };

  return (
    <div>
      <p>WebSocket is {isConnected ? 'connected' : 'disconnected'}</p>
      <button onClick={sendMsg} disabled={!isConnected}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
