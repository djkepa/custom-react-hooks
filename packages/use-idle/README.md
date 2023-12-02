# useIdle Hook

`useIdle` is a React hook designed to detect user inactivity or idle time in applications. It triggers a state change after a specified period of inactivity, making it useful for actions like auto-logout or activity pausing.

## Features

- **Idle Time Detection:** Tracks user inactivity and changes state after a set period.
- **Activity Monitoring:** Resets the idle timer upon user interactions like mouse movement, keypresses, and scrolling.
- **SSR Compatibility:** Safely handles server-side rendering by checking for the `window` object.
- **Configurable Idle Duration:** Allows setting a custom duration to define user inactivity.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-idle
```

or

```bash
yarn add @custom-react-hooks/use-idle
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

```typescript
import useIdle from '@custom-react-hooks/use-idle';

const TestComponent = ({ idleTime }: any) => {
  const isIdle = useIdle(idleTime);

  return (
    <div>
      <p data-testid="idle-status">{isIdle ? 'Idle' : 'Not Idle'}</p>
    </div>
  );
};

export default TestComponent;
```

In this example, the hook is used to detect when the user has been idle for more than 3 seconds.

## API Reference

- `idleTime`: The time in milliseconds to wait before considering the user as idle.
- Returns a boolean state indicating if the user is idle.

## Contributing

Contributions to enhance `useIdle` are welcome. Feel free to submit issues or pull requests to the repository.
