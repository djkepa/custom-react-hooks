import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateEffectTestComponent from '../examples/useUpdateEffect.example';

describe('UpdateEffectTestComponent', () => {
  it('does not display effect message initially', () => {
    render(<UpdateEffectTestComponent />);
    expect(screen.queryByText(/Effect ran at count:/)).toBeNull();
  });

  it('displays effect message after first update', async () => {
    render(<UpdateEffectTestComponent />);
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => expect(screen.getByText('Effect ran at count: 1')).toBeInTheDocument());
  });

  it('updates effect message on subsequent updates', async () => {
    render(<UpdateEffectTestComponent />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));
    await waitFor(() => expect(screen.getByText('Effect ran at count: 2')).toBeInTheDocument());
  });
});
