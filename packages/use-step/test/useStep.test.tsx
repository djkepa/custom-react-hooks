import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStep } from '../src/index';

function TestComponent(props) {
  const { currentStep, nextStep, prevStep, reset } = useStep(props);
  return (
    <div>
      <p>Current Step: {currentStep}</p>
      <button onClick={nextStep}>Next</button>
      <button onClick={prevStep}>Previous</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

describe('useStep', () => {
  it('initializes with the correct step', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={1}
        totalSteps={3}
      />,
    );
    expect(getByText('Current Step: 1')).toBeInTheDocument();
  });

  it('navigates to the next and previous steps', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={1}
        totalSteps={3}
      />,
    );
    fireEvent.click(getByText('Next'));
    expect(getByText('Current Step: 2')).toBeInTheDocument();
    fireEvent.click(getByText('Previous'));
    expect(getByText('Current Step: 1')).toBeInTheDocument();
  });

  it('does not go beyond the total steps', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={0}
        totalSteps={3}
      />,
    );
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Next'));
    expect(getByText('Current Step: 2')).toBeInTheDocument();
  });

  it('does not go before the first step', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={0}
        totalSteps={3}
      />,
    );
    fireEvent.click(getByText('Previous'));
    expect(getByText('Current Step: 0')).toBeInTheDocument();
  });

  it('loops from last step to first when enabled', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={2}
        totalSteps={3}
        loop={true}
      />,
    );
    fireEvent.click(getByText('Next'));
    expect(getByText('Current Step: 0')).toBeInTheDocument();
  });

  it('loops from first step to last when enabled', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={0}
        totalSteps={3}
        loop={true}
      />,
    );
    fireEvent.click(getByText('Previous'));
    expect(getByText('Current Step: 2')).toBeInTheDocument();
  });

  it('resets to the initial step', () => {
    const { getByText } = render(
      <TestComponent
        initialStep={1}
        totalSteps={3}
      />,
    );
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Reset'));
    expect(getByText('Current Step: 1')).toBeInTheDocument();
  });
});
