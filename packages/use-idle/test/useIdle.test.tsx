import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import { useIdle } from '../src/index';

const TestComponent: React.FC<{ idleTime: number }> = ({ idleTime }) => {
  const isIdle = useIdle(idleTime);
  return <div>{isIdle ? 'Idle' : 'Active'}</div>;
};

describe('useIdle Hook', () => {
  jest.useFakeTimers();

  it('starts in an active state', () => {
    const { getByText } = render(<TestComponent idleTime={1000} />);
    expect(getByText('Active')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
