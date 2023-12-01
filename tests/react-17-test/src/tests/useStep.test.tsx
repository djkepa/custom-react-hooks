import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepTestComponent from '../examples/useStep.example';

describe('StepTestComponent', () => {
  it('navigates through the steps', () => {
    render(<StepTestComponent totalSteps={3} />);
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Current Step: 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();
  });

  it('loops from the last to the first step and vice versa', () => {
    render(
      <StepTestComponent
        totalSteps={3}
        loop
      />,
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Current Step: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();
  });

  it('resets to the initial step', () => {
    render(
      <StepTestComponent
        totalSteps={3}
        initialStep={1}
      />,
    );
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Current Step: 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Current Step: 1')).toBeInTheDocument();
  });
});
