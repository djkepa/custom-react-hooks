import React from 'react';
import useStep from '../hook/useStep';

interface StepTestComponentProps {
  totalSteps: number;
  initialStep?: number;
  loop?: boolean;
}

const StepTestComponent: React.FC<StepTestComponentProps> = ({ totalSteps, initialStep, loop }) => {
  const { currentStep, nextStep, prevStep, reset } = useStep({ initialStep, totalSteps, loop });

  return (
    <div>
      <p>Current Step: {currentStep}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default StepTestComponent;
