# useHistoryState Hook

The `useHistoryState` hook extends the standard `useState` with undo/redo functionality. It maintains a history of state changes and provides functions to navigate through the history, making it perfect for implementing undo/redo features in your React applications.

## Features

- **Undo/Redo Functionality:** Navigate through state history with undo and redo operations.
- **History Management:** Maintains a configurable history of state changes.
- **Functional Updates:** Supports functional state updates like regular `useState`.
- **Memory Efficient:** Configurable maximum history size to prevent memory leaks.
- **Type Safe:** Full TypeScript support with generic typing.
- **Smart History:** Prevents duplicate consecutive states from being added to history.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-history-state
```

or

```bash
yarn add @custom-react-hooks/use-history-state
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
import React from 'react';
import { useHistoryState } from '@custom-react-hooks/use-history-state';

const UndoRedoCounter = () => {
  const { state, setState, undo, redo, canUndo, canRedo } = useHistoryState(0);

  return (
    <div>
      <h2>Counter: {state}</h2>
      <div>
        <button onClick={() => setState(state + 1)}>Increment</button>
        <button onClick={() => setState(state - 1)}>Decrement</button>
      </div>
      <div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default UndoRedoCounter;
```

### Text Editor with Undo/Redo

```typescript
import React from 'react';
import { useHistoryState } from '@custom-react-hooks/use-history-state';

const TextEditor = () => {
  const { 
    state: text, 
    setState: setText, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    clear,
    history,
    currentIndex
  } = useHistoryState('', { maxHistorySize: 20 });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div>
        <button onClick={undo} disabled={!canUndo}>
          ⟲ Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          ⟳ Redo
        </button>
        <button onClick={clear}>
          Clear History
        </button>
      </div>
      
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing..."
        rows={10}
        cols={50}
      />
      
      <div>
        <p>History: {currentIndex + 1} / {history.length}</p>
        <p>Can undo: {canUndo ? 'Yes' : 'No'}</p>
        <p>Can redo: {canRedo ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default TextEditor;
```

### Drawing Canvas with History

```typescript
import React, { useRef } from 'react';
import { useHistoryState } from '@custom-react-hooks/use-history-state';

interface DrawingState {
  paths: string[];
  currentColor: string;
}

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    state, 
    setState, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useHistoryState<DrawingState>({
    paths: [],
    currentColor: '#000000'
  });

  const addPath = (path: string) => {
    setState(prevState => ({
      ...prevState,
      paths: [...prevState.paths, path]
    }));
  };

  const changeColor = (color: string) => {
    setState(prevState => ({
      ...prevState,
      currentColor: color
    }));
  };

  return (
    <div>
      <div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <input
          type="color"
          value={state.currentColor}
          onChange={(e) => changeColor(e.target.value)}
        />
      </div>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: '1px solid #ccc' }}
      />
      
      <p>Paths drawn: {state.paths.length}</p>
    </div>
  );
};
```

### Form with History

```typescript
import React from 'react';
import { useHistoryState } from '@custom-react-hooks/use-history-state';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const FormWithHistory = () => {
  const { state, setState, undo, redo, canUndo, canRedo } = useHistoryState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div>
        <button onClick={undo} disabled={!canUndo}>
          Undo Changes
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo Changes
        </button>
      </div>
      
      <form>
        <div>
          <label>Name:</label>
          <input
            value={state.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            value={state.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>
        
        <div>
          <label>Message:</label>
          <textarea
            value={state.message}
            onChange={(e) => updateField('message', e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
```

## API Reference

### Parameters

- `initialState` (T): The initial state value.
- `options` (UseHistoryStateOptions, optional): Configuration options.
  - `maxHistorySize` (number, optional): Maximum number of states to keep in history. Default: 50.

### Returns

An object containing:

- `state` (T): The current state value.
- `setState` (function): Function to update the state (similar to useState).
- `undo` (function): Function to undo the last state change.
- `redo` (function): Function to redo the next state change.
- `canUndo` (boolean): Whether undo operation is possible.
- `canRedo` (boolean): Whether redo operation is possible.
- `clear` (function): Function to clear the history (keeps current state).
- `history` (T[]): Array of all states in history.
- `currentIndex` (number): Current position in the history.

## Use Cases

- **Text Editors**: Implement undo/redo functionality in text editors or rich text components.
- **Drawing Applications**: Allow users to undo/redo drawing operations on canvas.
- **Form Management**: Enable users to undo form changes or navigate through form states.
- **Game Development**: Implement move history in games like chess or puzzle games.
- **Data Visualization**: Allow users to undo changes to charts or graph configurations.
- **Image Editing**: Provide undo/redo for image manipulation operations.

## Behavior Notes

### History Management
- New states are added to the end of the history
- When undoing and then setting a new state, future history is cleared
- Duplicate consecutive states are not added to history
- History size is limited by `maxHistorySize` option

### Memory Management
- Old states are automatically removed when history exceeds `maxHistorySize`
- The hook prevents memory leaks by limiting history size
- Clearing history keeps only the current state

### State Updates
- Supports both direct values and functional updates
- Functional updates receive the current state as parameter
- State comparisons use `Object.is()` for duplicate detection

## Performance Considerations

- History is stored in memory, so large objects or frequent updates may impact performance
- Use `maxHistorySize` to limit memory usage
- Consider debouncing rapid state changes for better performance
- The hook is optimized to prevent unnecessary re-renders

## TypeScript Support

The hook is fully typed and supports generic types:

```typescript
const numberHistory = useHistoryState<number>(0);
const objectHistory = useHistoryState<{ count: number }>({ count: 0 });
const arrayHistory = useHistoryState<string[]>([]);
```

## Contributing

Contributions to enhance `useHistoryState` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

