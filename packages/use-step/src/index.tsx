import { useState, useCallback } from 'react';

export interface UseStepOptions {
  initialStep?: number;
  totalSteps: number;
  loop?: boolean;
}

/**
 * `useStep` is a hook to manage steps in multi-step interfaces like wizards or forms.
 * It provides functionality to move between steps, with optional looping from first to last step.
 *
 * @param options - Configuration options including the initial step, total number of steps, and looping behavior.
 * @return - An object containing the current step and functions to navigate between steps.
 */

function useStep({ initialStep = 0, totalSteps, loop = false }: UseStepOptions) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) {
        if (loop) {
          const newStep = step < 0 ? totalSteps - 1 : 0;
          setCurrentStep(newStep);
        }
        return;
      }
      setCurrentStep(step);
    },
    [totalSteps, loop],
  );

  const nextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return { currentStep, goToStep, nextStep, prevStep, reset };
}

export default useStep;
