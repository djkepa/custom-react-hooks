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
import React from 'react';
import { useIdle } from '@custom-react-hooks/all';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';


const IdleComponent = () => {
  const isIdle = useIdle(1000);

  return (
    <div className="center">
      {isIdle ? (
        <div className="btns">
          <MoonIcon/>
          <p>Away</p>
        </div>
      ) : (
        <div className="btns">
          <SunIcon/>
          <p>Online</p>
        </div>
      )}
      <br />
      <p>To see the effect, do not move the mouse or touch the keyboard!</p>
    </div>
  );
};

export default IdleComponent;
```

In this example, the hook is used to detect when the user has been idle for more than 3 seconds.

## API Reference

### Parameters

- `idleTime`: The time in milliseconds to wait before considering the user as idle.

### Returns
- Returns a boolean state indicating if the user is idle.

## Use Cases

- **Auto Logout**: Automatically log users out after a period of inactivity for security purposes.
- **Pause Background Activities**: Pause or reduce background activities like animations or data fetching.
- **User Activity Monitoring**: Track user activity to understand usage patterns or for analytics.
- **Energy Saving**: Reduce energy consumption by dimming the screen or reducing resource-intensive tasks.

## Contributing

Contributions to enhance `useIdle` are welcome. Feel free to submit issues or pull requests to the repository.
