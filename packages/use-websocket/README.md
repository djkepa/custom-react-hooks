# useWebSocket Hook

The `useWebSocket` hook is a simple yet powerful utility for managing WebSocket connections in React applications. It provides an easy way to connect to WebSocket servers, send messages, and handle connection states with optional reconnection functionality.

## Features

- **Simple WebSocket Management:** Easy connection setup and message handling.
- **Connection State Tracking:** Real-time connection status monitoring.
- **Automatic Reconnection:** Optional reconnection with configurable attempts and intervals.
- **Event Callbacks:** Support for onOpen, onClose, onMessage, and onError callbacks.
- **Protocol Support:** Support for WebSocket subprotocols.
- **SSR Safe:** Handles server-side rendering environments gracefully.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-websocket
```

or

```bash
yarn add @custom-react-hooks/use-websocket
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

### Basic Usage

```typescript
import React, { useState } from 'react';
import { useWebSocket } from '@custom-react-hooks/use-websocket';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const { sendMessage, lastMessage, connectionStatus } = useWebSocket(
    'ws://localhost:8080',
    {
      onMessage: (event) => {
        setMessages(prev => [...prev, event.data]);
      },
      onOpen: () => {
        console.log('Connected to WebSocket');
      },
      onClose: () => {
        console.log('Disconnected from WebSocket');
      },
    }
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>Status: {connectionStatus}</div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
```

### With Reconnection

```typescript
import React from 'react';
import { useWebSocket } from '@custom-react-hooks/use-websocket';

const ReconnectingWebSocket = () => {
  const { sendMessage, lastMessage, connectionStatus } = useWebSocket(
    'ws://localhost:8080',
    {
      shouldReconnect: true,
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      onOpen: () => console.log('Connected!'),
      onClose: (event) => {
        if (!event.wasClean) {
          console.log('Connection lost, attempting to reconnect...');
        }
      },
    }
  );

  return (
    <div>
      <h3>Connection Status: {connectionStatus}</h3>
      <button 
        onClick={() => sendMessage('Hello Server!')}
        disabled={connectionStatus !== 'Open'}
      >
        Send Message
      </button>
      {lastMessage && <p>Last message: {lastMessage.data}</p>}
    </div>
  );
};
```

### With Protocols

```typescript
import React from 'react';
import { useWebSocket } from '@custom-react-hooks/use-websocket';

const ProtocolWebSocket = () => {
  const { sendMessage, connectionStatus } = useWebSocket(
    'ws://localhost:8080',
    {
      protocols: ['chat', 'superchat'],
      onOpen: (event) => {
        console.log('Connected with protocol:', event.target.protocol);
      },
    }
  );

  return (
    <div>
      <p>Status: {connectionStatus}</p>
      <button onClick={() => sendMessage('Hello with protocol!')}>
        Send Message
      </button>
    </div>
  );
};
```

## API Reference

### Parameters

- `socketUrl` (string | null): The WebSocket URL to connect to. Pass `null` to disable connection.
- `options` (UseWebSocketOptions, optional): Configuration options object.

### Options

- `onOpen` (function, optional): Callback fired when the connection opens.
- `onClose` (function, optional): Callback fired when the connection closes.
- `onMessage` (function, optional): Callback fired when a message is received.
- `onError` (function, optional): Callback fired when an error occurs.
- `shouldReconnect` (boolean, optional): Whether to attempt reconnection. Default: `false`.
- `reconnectAttempts` (number, optional): Maximum number of reconnection attempts. Default: `3`.
- `reconnectInterval` (number, optional): Time between reconnection attempts in milliseconds. Default: `3000`.
- `protocols` (string | string[], optional): WebSocket subprotocols.

### Returns

An object containing:

- `sendMessage` (function): Function to send messages through the WebSocket.
- `lastMessage` (MessageEvent | null): The last received message event.
- `readyState` (ReadyState): Current connection state (numeric WebSocket constants).
- `connectionStatus` ('Connecting' | 'Open' | 'Closing' | 'Closed'): Human-readable connection status.

## Connection States

- **Connecting (0)**: The connection is not yet open.
- **Open (1)**: The connection is open and ready to communicate.
- **Closing (2)**: The connection is in the process of closing.
- **Closed (3)**: The connection is closed or couldn't be opened.

## Use Cases

- **Real-time Chat Applications**: Implement chat functionality with instant messaging.
- **Live Data Feeds**: Display real-time data updates (stock prices, sports scores, etc.).
- **Collaborative Editing**: Enable real-time collaborative features.
- **Gaming Applications**: Handle real-time game state synchronization.
- **IoT Dashboards**: Monitor and control IoT devices in real-time.
- **Live Notifications**: Push notifications to users instantly.

## Error Handling

The hook includes built-in error handling:

- Connection errors are logged to the console
- Failed message sends are warned about
- Reconnection is attempted automatically if enabled
- Event callbacks allow custom error handling

## Performance Considerations

- The hook automatically cleans up WebSocket connections on unmount
- Reconnection attempts are limited and configurable
- Message sending is optimized to only work when connected
- Event listeners are properly managed to prevent memory leaks

## Contributing

Contributions to enhance `useWebSocket` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

