# useVirtual

A React hook for implementing list virtualization, enabling efficient rendering of large datasets by only rendering visible items in the viewport.

## Features

- 📋 **List Virtualization**: Render only visible items for optimal performance
- 📏 **Dynamic Heights**: Support for variable item heights
- 🔄 **Horizontal & Vertical**: Support for both scrolling directions
- 🎯 **Overscan**: Configurable buffer for smoother scrolling
- 📊 **Performance Metrics**: Track rendering performance
- 🎣 **Scroll Control**: Programmatic scrolling to specific items
- 📱 **Mobile Optimized**: Touch-friendly scrolling
- 🧮 **Memory Efficient**: Minimal memory footprint for large lists

## Installation

```bash
npm install @custom-react-hooks/use-virtual
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

function VirtualList() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
  
  const {
    visibleItems,
    totalHeight,
    scrollToIndex,
    scrollToTop
  } = useVirtual({
    items,
    itemHeight: 50,
    containerHeight: 400
  });

  return (
    <div>
      <button onClick={() => scrollToIndex(5000)}>Go to Item 5000</button>
      <button onClick={scrollToTop}>Scroll to Top</button>
      
      <div style={{ height: 400, overflow: 'auto' }}>
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map(({ item, index, style }) => (
            <div key={index} style={style}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Dynamic Item Heights

```jsx
import React from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

function DynamicHeightList() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    content: `Item ${i}`,
    height: 50 + (i % 3) * 25 // Variable heights
  }));

  const getItemHeight = (index) => items[index].height;

  const { visibleItems, totalHeight } = useVirtual({
    items,
    itemHeight: getItemHeight,
    containerHeight: 600
  });

  return (
    <div style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, style }) => (
          <div key={item.id} style={style}>
            <div style={{ height: item.height, border: '1px solid #ccc' }}>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Horizontal Virtualization

```jsx
import React from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

function HorizontalList() {
  const items = Array.from({ length: 1000 }, (_, i) => `Column ${i}`);

  const { visibleItems, totalHeight } = useVirtual({
    items,
    itemHeight: 200, // Width in horizontal mode
    containerHeight: 800, // Container width
    horizontal: true
  });

  return (
    <div style={{ width: 800, height: 200, overflow: 'auto' }}>
      <div style={{ width: totalHeight, height: 200, position: 'relative' }}>
        {visibleItems.map(({ item, index, style }) => (
          <div key={index} style={style}>
            <div style={{ width: 200, height: 200, border: '1px solid #ccc' }}>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### With Overscan and Callbacks

```jsx
import React from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

function OptimizedList() {
  const items = Array.from({ length: 50000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`
  }));

  const { visibleItems, startIndex, endIndex } = useVirtual({
    items,
    itemHeight: 60,
    containerHeight: 500,
    overscan: 10, // Render 10 extra items for smoother scrolling
    onScroll: ({ scrollTop, startIndex, endIndex }) => {
      console.log(`Scrolled to ${scrollTop}, showing items ${startIndex}-${endIndex}`);
    }
  });

  return (
    <div>
      <p>Showing items {startIndex} to {endIndex} of {items.length}</p>
      <div style={{ height: 500, overflow: 'auto' }}>
        <div style={{ height: items.length * 60, position: 'relative' }}>
          {visibleItems.map(({ item, index, style }) => (
            <div key={item.id} style={style}>
              <div style={{ padding: 10, borderBottom: '1px solid #eee' }}>
                <strong>{item.name}</strong>
                <br />
                <small>{item.email}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Grid Virtualization

```jsx
import React from 'react';
import { useVirtual } from '@custom-react-hooks/use-virtual';

function VirtualGrid() {
  const items = Array.from({ length: 10000 }, (_, i) => `Cell ${i}`);
  const itemsPerRow = 5;
  const rows = Math.ceil(items.length / itemsPerRow);
  
  const rowItems = Array.from({ length: rows }, (_, rowIndex) => 
    items.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
  );

  const { visibleItems } = useVirtual({
    items: rowItems,
    itemHeight: 100,
    containerHeight: 400
  });

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: rows * 100, position: 'relative' }}>
        {visibleItems.map(({ item: rowItems, index, style }) => (
          <div key={index} style={style}>
            <div style={{ display: 'flex', height: 100 }}>
              {rowItems.map((item, cellIndex) => (
                <div
                  key={cellIndex}
                  style={{
                    flex: 1,
                    border: '1px solid #ccc',
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

```typescript
interface VirtualOptions<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan?: number;
  horizontal?: boolean;
  onScroll?: (info: ScrollInfo) => void;
}
```

### Return Value

```typescript
interface VirtualState<T> {
  visibleItems: VirtualItem<T>[];
  totalHeight: number;
  startIndex: number;
  endIndex: number;
  scrollToIndex: (index: number) => void;
  scrollToTop: () => void;
}
```

#### Properties

- **visibleItems** (`VirtualItem<T>[]`): Array of visible items with positioning
- **totalHeight** (`number`): Total height of all items
- **startIndex** (`number`): Index of first visible item
- **endIndex** (`number`): Index of last visible item
- **scrollToIndex** (`function`): Scroll to specific item index
- **scrollToTop** (`function`): Scroll to the top of the list

#### VirtualItem

```typescript
interface VirtualItem<T> {
  item: T;
  index: number;
  style: React.CSSProperties;
}
```

## Use Cases

1. **Large Data Tables**: Efficiently render thousands of rows
2. **Chat Applications**: Handle long message histories
3. **Product Catalogs**: Display large inventories
4. **Social Media Feeds**: Infinite scrolling feeds
5. **File Explorers**: Navigate large directory structures
6. **Data Visualization**: Render large datasets
7. **Mobile Lists**: Optimize performance on mobile devices

## Performance Benefits

- **Memory Efficiency**: Only renders visible items
- **Smooth Scrolling**: Maintains 60fps even with large datasets
- **Reduced DOM Nodes**: Minimal DOM manipulation
- **Fast Initial Load**: Quick rendering regardless of data size

## TypeScript Support

This hook is written in TypeScript and provides full type safety:

```typescript
import { useVirtual, VirtualOptions, VirtualState } from '@custom-react-hooks/use-virtual';

interface User {
  id: number;
  name: string;
  email: string;
}

const options: VirtualOptions<User> = {
  items: users,
  itemHeight: 60,
  containerHeight: 400
};

const virtual: VirtualState<User> = useVirtual(options);
```

## License

MIT © [Bane Grozdanovic](https://github.com/djkepa)
