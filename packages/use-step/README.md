# useStep Hook

`useStep` is a custom React hook designed for handling step-based logic in applications, such as wizards or multi-step forms. It manages the current step and provides navigation functionality.

## Features

- **Step Navigation:** Manages the current step and provides functions for navigating between steps.
- **Boundary Control:** Ensures navigation stays within the defined steps, with an optional looping feature.
- **Customizable Step Controls:** Offers functions for specific, next, previous, and reset step actions.
- **Looping Functionality:** Optionally allows steps to loop back to the start or end.
- **SSR Safe:** Can be used in server-side rendered applications.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-step
```

or

```bash
yarn add @custom-react-hooks/use-step
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useStep` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useStep } from '@custom-react-hooks/use-step';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Usage

```typescript
import React from 'react';
import { useStep } from '@custom-react-hooks/all';

const StepComponent = ({ totalSteps, initialStep, loop }) => {
  const { currentStep, nextStep, prevStep, reset } = useStep({ initialStep, totalSteps, loop });

  return (
    <div>
      <h2>Current Step: {currentStep}</h2>
      <div>
        <button onClick={prevStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default StepComponent;
```

## API Reference

### Parameters
- `initialStep`: (optional) The starting step index.
- `totalSteps`: The total number of steps.
- `loop`: (optional) A boolean indicating if navigation should loop around.

### Returns
  - `currentStep`: The index of the current step.
  - `goToStep`: Function to navigate to a specific step.
  - `nextStep`: Function to go to the next step.
  - `prevStep`: Function to go to the previous step.
  - `reset`: Function to reset to the initial step.

## Use Cases

- **Wizard or Form Navigation**: Navigate through multi-step forms or wizards, like checkout processes or surveys.
- **Step-by-Step Guides**: Create step-by-step user guides or tutorials.
- **Progress Tracking**: Track and display progress in a multi-step process.
- **Looping Slideshows or Carousels**: Control the navigation of items in a looping carousel or slideshow.

## Contributing

Contributions to improve `useStep` are welcome. Please feel free to submit issues or pull requests to the repository.