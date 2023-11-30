# `useStep` Hook

`useStep` is a custom React hook designed for handling step-based logic in applications, such as wizards or multi-step forms. It manages the current step and provides navigation functionality.

## Features

- **Step Navigation:** Manages the current step and provides functions for navigating between steps.
- **Boundary Control:** Ensures navigation stays within the defined steps, with an optional looping feature.
- **Customizable Step Controls:** Offers functions for specific, next, previous, and reset step actions.
- **Looping Functionality:** Optionally allows steps to loop back to the start or end.
- **SSR Safe:** Can be used in server-side rendered applications.

## Installation

To integrate `useStep` into your project:

```bash
npm install @custom-react-hooks/use-step
```

or

```bash
yarn add @custom-react-hooks/use-step
```

## Usage

```typescript
import React from 'react';
import useStep from '@custom-react-hooks/use-step';

const MyStepperComponent = () => {
  const { currentStep, nextStep, prevStep, reset } = useStep({ totalSteps: 5, loop: true });

  return (
    <div>
      <p>Current Step: {currentStep + 1}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

In this example, `useStep` is used to navigate through a series of steps with looping enabled.

## API Reference

- `initialStep`: (optional) The starting step index.
- `totalSteps`: The total number of steps.
- `loop`: (optional) A boolean indicating if navigation should loop around.
- Returns an object containing:
  - `currentStep`: The index of the current step.
  - `goToStep`: Function to navigate to a specific step.
  - `nextStep`: Function to go to the next step.
  - `prevStep`: Function to go to the previous step.
  - `reset`: Function to reset to the initial step.

## Contributing



Contributions to improve `useStep` are welcome. Please feel free to submit issues or pull requests to the repository.