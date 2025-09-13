# useWorker Hook

The `useWorker` hook provides an easy way to manage Web Workers in React applications. It allows you to offload heavy computations to background threads, preventing UI blocking while maintaining a clean and simple API for communication with workers.

## Features

- **Background Processing:** Offload heavy computations to prevent UI blocking.
- **Function or URL Support:** Create workers from functions or external script files.
- **Message Handling:** Simple API for sending and receiving messages.
- **Error Handling:** Comprehensive error handling with timeout support.
- **Automatic Cleanup:** Workers are automatically terminated on component unmount.
- **Loading States:** Track worker processing state for better UX.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-worker
```

or

```bash
yarn add @custom-react-hooks/use-worker
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

### Basic Usage with Function

```typescript
import React, { useState } from 'react';
import { useWorker } from '@custom-react-hooks/use-worker';

const HeavyCalculation = () => {
  const [input, setInput] = useState(10);
  
  // Define the worker function
  const fibonacciWorker = (n: number): number => {
    const fib = (num: number): number => {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    };
    return fib(n);
  };

  const { postMessage, data, error, isLoading } = useWorker(fibonacciWorker, {
    onMessage: (result) => {
      console.log('Calculation completed:', result);
    },
    onError: (error) => {
      console.error('Worker error:', error);
    },
  });

  const handleCalculate = () => {
    postMessage(input);
  };

  return (
    <div>
      <h3>Fibonacci Calculator</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        min="1"
        max="40"
      />
      <button onClick={handleCalculate} disabled={isLoading}>
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
      
      {data !== null && <p>Result: {data}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default HeavyCalculation;
```

### Using External Worker Script

```typescript
import React, { useState } from 'react';
import { useWorker } from '@custom-react-hooks/use-worker';

// Create a separate worker file: public/image-processor.js
/*
self.onmessage = function(e) {
  const { imageData, filter } = e.data;
  
  // Process image data
  const processedData = applyFilter(imageData, filter);
  
  self.postMessage(processedData);
};

function applyFilter(imageData, filter) {
  // Image processing logic here
  return imageData;
}
*/

const ImageProcessor = () => {
  const [selectedFilter, setSelectedFilter] = useState('blur');
  
  const { postMessage, data, error, isLoading, terminate } = useWorker(
    '/image-processor.js',
    {
      timeout: 10000, // 10 second timeout
      onMessage: (processedImage) => {
        console.log('Image processed successfully');
      },
    }
  );

  const handleProcessImage = (imageFile: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result;
      postMessage({ imageData, filter: selectedFilter });
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h3>Image Processor</h3>
      <select 
        value={selectedFilter} 
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="blur">Blur</option>
        <option value="sharpen">Sharpen</option>
        <option value="grayscale">Grayscale</option>
      </select>
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleProcessImage(file);
        }}
        disabled={isLoading}
      />
      
      {isLoading && <p>Processing image...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <img src={data} alt="Processed" style={{ maxWidth: '300px' }} />}
      
      <button onClick={terminate}>Stop Processing</button>
    </div>
  );
};
```

### Data Processing with Progress

```typescript
import React, { useState } from 'react';
import { useWorker } from '@custom-react-hooks/use-worker';

const DataProcessor = () => {
  const [dataset, setDataset] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  const dataProcessingWorker = (data: number[]) => {
    // Simulate heavy data processing
    const result = [];
    const total = data.length;
    
    for (let i = 0; i < total; i++) {
      // Heavy computation
      const processed = Math.sqrt(data[i]) * Math.PI;
      result.push(processed);
      
      // Send progress updates (in real worker, use self.postMessage)
      if (i % 100 === 0) {
        const progressPercent = (i / total) * 100;
        // Note: Progress updates would need special handling in real implementation
      }
    }
    
    return result;
  };

  const { postMessage, data, error, isLoading } = useWorker(
    dataProcessingWorker,
    {
      onMessage: (result) => {
        setProgress(100);
        console.log('Processing completed:', result.length, 'items processed');
      },
    }
  );

  const generateData = () => {
    const newData = Array.from({ length: 10000 }, () => Math.random() * 1000);
    setDataset(newData);
  };

  const processData = () => {
    setProgress(0);
    postMessage(dataset);
  };

  return (
    <div>
      <h3>Data Processor</h3>
      <button onClick={generateData}>Generate Random Data</button>
      <button onClick={processData} disabled={isLoading || dataset.length === 0}>
        {isLoading ? 'Processing...' : 'Process Data'}
      </button>
      
      <p>Dataset size: {dataset.length} items</p>
      
      {isLoading && (
        <div>
          <p>Processing: {progress}%</p>
          <progress value={progress} max="100" />
        </div>
      )}
      
      {data && <p>Processed {data.length} items successfully!</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};
```

### Crypto Mining Simulation

```typescript
import React, { useState } from 'react';
import { useWorker } from '@custom-react-hooks/use-worker';

const CryptoMiner = () => {
  const [difficulty, setDifficulty] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

  const miningWorker = (config: { difficulty: number; data: string }) => {
    const { difficulty, data } = config;
    let nonce = 0;
    const target = '0'.repeat(difficulty);
    
    // Simple proof-of-work simulation
    while (true) {
      const hash = btoa(data + nonce).slice(0, 10); // Simplified hash
      if (hash.startsWith(target)) {
        return { nonce, hash, attempts: nonce + 1 };
      }
      nonce++;
      
      // Prevent infinite loop in demo
      if (nonce > 100000) {
        throw new Error('Mining timeout - difficulty too high');
      }
    }
  };

  const { postMessage, data, error, isLoading, terminate } = useWorker(
    miningWorker,
    {
      timeout: 30000, // 30 second timeout
      onMessage: (result) => {
        setIsRunning(false);
        console.log('Block mined:', result);
      },
      onError: (error) => {
        setIsRunning(false);
        console.error('Mining failed:', error);
      },
    }
  );

  const startMining = () => {
    setIsRunning(true);
    postMessage({
      difficulty,
      data: `Block data ${Date.now()}`,
    });
  };

  const stopMining = () => {
    setIsRunning(false);
    terminate();
  };

  return (
    <div>
      <h3>Crypto Miner Simulation</h3>
      
      <div>
        <label>Difficulty: </label>
        <input
          type="range"
          min="1"
          max="6"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          disabled={isRunning}
        />
        <span>{difficulty}</span>
      </div>
      
      <div>
        <button onClick={startMining} disabled={isRunning}>
          Start Mining
        </button>
        <button onClick={stopMining} disabled={!isRunning}>
          Stop Mining
        </button>
      </div>
      
      {isRunning && <p>⛏️ Mining in progress...</p>}
      
      {data && (
        <div>
          <h4>Block Mined! 🎉</h4>
          <p>Nonce: {data.nonce}</p>
          <p>Hash: {data.hash}</p>
          <p>Attempts: {data.attempts}</p>
        </div>
      )}
      
      {error && <p style={{ color: 'red' }}>Mining Error: {error}</p>}
    </div>
  );
};
```

## API Reference

### Parameters

- `workerScript` (string | function): Either a URL to a worker script file or a function to execute in the worker.
- `options` (UseWorkerOptions, optional): Configuration options.
  - `onMessage` (function, optional): Callback fired when worker sends a message.
  - `onError` (function, optional): Callback fired when worker encounters an error.
  - `timeout` (number, optional): Timeout in milliseconds for worker operations.

### Returns

An object containing:

- `postMessage` (function): Function to send messages to the worker.
- `terminate` (function): Function to terminate the worker.
- `data` (any): Latest data received from the worker.
- `error` (string | null): Error message if worker fails.
- `isLoading` (boolean): Whether worker is currently processing.

## Worker Function Requirements

When using a function as the worker script:

```typescript
// The function should accept data and return a result
const workerFunction = (inputData: any) => {
  // Your computation logic here
  return result;
};

// For async operations, return a Promise
const asyncWorkerFunction = async (inputData: any) => {
  const result = await someAsyncOperation(inputData);
  return result;
};
```

## Use Cases

- **Heavy Calculations:** Fibonacci, prime numbers, mathematical computations.
- **Data Processing:** Large dataset transformations, sorting, filtering.
- **Image/Video Processing:** Filters, compression, format conversion.
- **Cryptographic Operations:** Hashing, encryption, mining simulations.
- **Text Processing:** Parsing, analysis, search operations.
- **Scientific Simulations:** Physics, chemistry, biology simulations.

## Browser Support

Web Workers are supported in all modern browsers:
- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge 12+
- IE 10+

## Performance Considerations

- Workers have overhead for creation and message passing
- Best for CPU-intensive tasks that take >16ms
- Data is copied between main thread and worker (use Transferable objects for large data)
- Limited to the number of CPU cores available

## Security Considerations

- Worker scripts must be served from the same origin (CORS applies)
- Workers run in a separate global context with limited API access
- No access to DOM, parent object, or window object

## Error Handling

The hook provides comprehensive error handling:

- Worker creation errors
- Runtime errors in worker execution  
- Timeout errors for long-running operations
- Message posting errors

## Memory Management

- Workers are automatically terminated on component unmount
- Blob URLs are cleaned up automatically for function-based workers
- Timeouts are cleared to prevent memory leaks

## Contributing

Contributions to enhance `useWorker` are welcome. Feel free to submit issues or pull requests to the repository.

## License

MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.

