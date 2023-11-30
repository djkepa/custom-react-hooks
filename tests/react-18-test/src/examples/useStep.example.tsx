import React from 'react';
import useStep from "../src/hooks/useStep";

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
