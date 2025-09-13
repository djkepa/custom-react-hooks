# useIsland

A React hook for implementing island architecture with selective hydration, allowing you to optimize performance by hydrating components only when needed.

## Features

- 🏝️ **Island Architecture**: Implement selective hydration patterns
- ⚡ **Performance Optimized**: Hydrate components only when necessary
- 🎯 **Priority Support**: Control hydration priority (high, normal, low)
- 👁️ **Visibility Detection**: Automatic hydration based on visibility
- 🔄 **Lazy Loading**: Support for lazy hydration
- 📊 **State Management**: Track hydration and visibility states
- 🎣 **Callbacks**: Custom handlers for hydration events
- 🧹 **Auto Cleanup**: Automatic cleanup on unmount

## Installation

```bash
npm install @custom-react-hooks/use-island
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { useIsland } from '@custom-react-hooks/use-island';

function MyIslandComponent() {
  const { isHydrated, isVisible, hydrate, dehydrate } = useIsland('my-island');

  return (
    <div>
      <p>Hydrated: {isHydrated ? 'Yes' : 'No'}</p>
      <p>Visible: {isVisible ? 'Yes' : 'No'}</p>
      <button onClick={hydrate}>Hydrate</button>
      <button onClick={dehydrate}>Dehydrate</button>
    </div>
  );
}
```

### With Priority

```jsx
import React from 'react';
import { useIsland } from '@custom-react-hooks/use-island';

function HighPriorityIsland() {
  const { isHydrated, hydrate } = useIsland('critical-island', {
    priority: 'high',
    lazy: false
  });

  return (
    <div>
      {isHydrated ? (
        <ExpensiveComponent />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
```

### With Callbacks

```jsx
import React from 'react';
import { useIsland } from '@custom-react-hooks/use-island';

function CallbackIsland() {
  const { isHydrated, hydrate } = useIsland('callback-island', {
    onHydrate: (islandId) => {
      console.log(`Island ${islandId} hydrated`);
      // Analytics, logging, etc.
    },
    onDehydrate: (islandId) => {
      console.log(`Island ${islandId} dehydrated`);
    }
  });

  return (
    <div>
      <button onClick={hydrate}>
        {isHydrated ? 'Hydrated' : 'Hydrate Island'}
      </button>
    </div>
  );
}
```

### Lazy Hydration

```jsx
import React from 'react';
import { useIsland } from '@custom-react-hooks/use-island';

function LazyIsland() {
  const { isHydrated, isVisible } = useIsland('lazy-island', {
    lazy: true,
    priority: 'low'
  });

  return (
    <div>
      {isHydrated ? (
        <HeavyComponent />
      ) : (
        <PlaceholderComponent />
      )}
    </div>
  );
}
```

## API Reference

### Parameters

- **islandId** (`string`): Unique identifier for the island
- **options** (`IslandOptions`, optional): Configuration options

### IslandOptions

```typescript
interface IslandOptions {
  priority?: 'high' | 'normal' | 'low';
  lazy?: boolean;
  onHydrate?: (islandId: string) => void;
  onDehydrate?: (islandId: string) => void;
}
```

### Return Value

```typescript
interface IslandState {
  isHydrated: boolean;
  isVisible: boolean;
  hydrate: () => void;
  dehydrate: () => void;
}
```

#### Properties

- **isHydrated** (`boolean`): Whether the island is currently hydrated
- **isVisible** (`boolean`): Whether the island is visible in viewport
- **hydrate** (`function`): Function to hydrate the island
- **dehydrate** (`function`): Function to dehydrate the island

## Use Cases

1. **Performance Optimization**: Defer hydration of non-critical components
2. **Progressive Enhancement**: Gradually enhance static content
3. **Lazy Loading**: Hydrate components when they become visible
4. **Resource Management**: Control when expensive components are active
5. **Server-Side Rendering**: Optimize SSR with selective hydration
6. **Mobile Optimization**: Reduce initial bundle size and improve performance

## TypeScript Support

This hook is written in TypeScript and provides full type safety:

```typescript
import { useIsland, IslandOptions, IslandState } from '@custom-react-hooks/use-island';

const options: IslandOptions = {
  priority: 'high',
  lazy: false
};

const island: IslandState = useIsland('my-island', options);
```

## License

MIT © [Bane Grozdanovic](https://github.com/djkepa)
