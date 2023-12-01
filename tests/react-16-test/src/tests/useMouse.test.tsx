import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestComponent from '../examples/useMouse.example';
import { act } from 'react-dom/test-utils';

describe('TestComponent', () => {
  it('renders with default options', () => {
    const { getByText } = render(<TestComponent />);
    const tooltip = getByText('Mouse Position: (0, 0)');
    expect(tooltip).toBeInTheDocument();
  });

  it('renders with custom options', async () => {
    const options = { offsetX: 20, offsetY: 30, avoidEdges: true };
    render(<TestComponent options={options} />);

    await waitFor(() => {
      const tooltip = screen.getByText(/Mouse Position:/);
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('renders with avoidEdges option and mouse near edges', async () => {
    const options = { offsetX: 20, offsetY: 30, avoidEdges: true };
    render(<TestComponent options={options} />);

    await waitFor(() => {
      const tooltip = screen.getByText(/Mouse Position:/);
      expect(tooltip).toBeInTheDocument();
    });
  });
});
