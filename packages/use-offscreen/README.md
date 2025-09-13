# useOffscreen

A React hook for managing offscreen rendering, allowing you to render components in the background and control their visibility for optimal performance.

## Features

- 🎭 **Offscreen Rendering**: Render components outside the visible viewport
- ⚡ **Performance Optimized**: Reduce main thread blocking
- 🔄 **State Management**: Track offscreen/onscreen states
- 🎯 **Priority Control**: Manage render priority levels
- 🧹 **Auto Cleanup**: Automatic cleanup when components unmount
- 📊 **Callbacks**: Custom handlers for state changes
- 🎨 **Flexible API**: Simple toggle and explicit control methods

## Installation

```bash
npm install @custom-react-hooks/use-offscreen
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

function MyComponent() {
  const { isOffscreen, moveOffscreen, moveOnscreen, toggle } = useOffscreen();

  return (
    <div>
      <p>Status: {isOffscreen ? 'Offscreen' : 'Onscreen'}</p>
      <button onClick={moveOffscreen}>Move Offscreen</button>
      <button onClick={moveOnscreen}>Move Onscreen</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

### With Initial State

```jsx
import React from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

function OffscreenComponent() {
  const { isOffscreen, moveOnscreen } = useOffscreen({
    initialOffscreen: true
  });

  return (
    <div>
      {isOffscreen ? (
        <div>Component is rendering offscreen</div>
      ) : (
        <ExpensiveComponent />
      )}
      <button onClick={moveOnscreen}>Show Component</button>
    </div>
  );
}
```

### With Callbacks

```jsx
import React from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

function CallbackComponent() {
  const { isOffscreen, toggle } = useOffscreen({
    onOffscreen: () => {
      console.log('Component moved offscreen');
      // Pause animations, stop timers, etc.
    },
    onOnscreen: () => {
      console.log('Component moved onscreen');
      // Resume animations, start timers, etc.
    }
  });

  return (
    <div>
      <button onClick={toggle}>
        {isOffscreen ? 'Show' : 'Hide'} Component
      </button>
      {!isOffscreen && <AnimatedComponent />}
    </div>
  );
}
```

### Performance Mode

```jsx
import React from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

function PerformanceComponent() {
  const { isOffscreen, moveOffscreen } = useOffscreen({
    performanceMode: true,
    renderPriority: 'low',
    autoCleanup: true
  });

  return (
    <div>
      {!isOffscreen && <HeavyComponent />}
      <button onClick={moveOffscreen}>
        Optimize Performance
      </button>
    </div>
  );
}
```

### Background Processing

```jsx
import React, { useEffect } from 'react';
import { useOffscreen } from '@custom-react-hooks/use-offscreen';

function BackgroundProcessor() {
  const { isOffscreen, moveOffscreen, moveOnscreen } = useOffscreen({
    initialOffscreen: true
  });

  useEffect(() => {
    if (isOffscreen) {
      // Perform background processing
      const processData = async () => {
        // Heavy computation here
        await heavyDataProcessing();
        moveOnscreen(); // Show results when done
      };
      processData();
    }
  }, [isOffscreen, moveOnscreen]);

  return (
    <div>
      {isOffscreen ? (
        <div>Processing in background...</div>
      ) : (
        <ProcessedDataComponent />
      )}
    </div>
  );
}
```

## API Reference

### Parameters

- **options** (`OffscreenOptions`, optional): Configuration options

### OffscreenOptions

```typescript
interface OffscreenOptions {
  initialOffscreen?: boolean;
  performanceMode?: boolean;
  autoCleanup?: boolean;
  renderPriority?: 'high' | 'normal' | 'low';
  onOffscreen?: () => void;
  onOnscreen?: () => void;
}
```

### Return Value

```typescript
interface OffscreenState {
  isOffscreen: boolean;
  moveOffscreen: () => void;
  moveOnscreen: () => void;
  toggle: () => void;
}
```

#### Properties

- **isOffscreen** (`boolean`): Whether the component is currently offscreen
- **moveOffscreen** (`function`): Function to move component offscreen
- **moveOnscreen** (`function`): Function to move component onscreen
- **toggle** (`function`): Function to toggle between offscreen/onscreen states

## Use Cases

1. **Performance Optimization**: Render expensive components in background
2. **Background Processing**: Perform computations without blocking UI
3. **Memory Management**: Reduce memory usage by moving components offscreen
4. **Animation Control**: Pause/resume animations based on visibility
5. **Resource Conservation**: Optimize resource usage for hidden components
6. **Progressive Loading**: Load components incrementally
7. **Mobile Optimization**: Improve performance on resource-constrained devices

## Performance Benefits

- **Reduced Main Thread Blocking**: Offscreen rendering doesn't block user interactions
- **Memory Optimization**: Components can be garbage collected when offscreen
- **Battery Life**: Reduced CPU usage on mobile devices
- **Smoother Animations**: Better frame rates by controlling render priority

## TypeScript Support

This hook is written in TypeScript and provides full type safety:

```typescript
import { useOffscreen, OffscreenOptions, OffscreenState } from '@custom-react-hooks/use-offscreen';

const options: OffscreenOptions = {
  initialOffscreen: false,
  performanceMode: true
};

const offscreen: OffscreenState = useOffscreen(options);
```

## License

MIT © [Bane Grozdanovic](https://github.com/djkepa)
