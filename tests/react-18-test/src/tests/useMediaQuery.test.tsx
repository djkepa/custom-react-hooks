import React from 'react';
import '@testing-library/jest-dom';
import useMediaQuery from '../../../../packages/use-media-query/src/index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

function TestComponent({ query }: any) {
  const matches = useMediaQuery(query);
  return <div>{matches ? 'Matches' : 'Does not match'}</div>;
}

describe('useMediaQuery Hook', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === 'test-query',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should return true if the query matches', () => {
    const { getByText } = render(<TestComponent query="test-query" />);
    expect(getByText('Matches')).toBeInTheDocument();
  });

  it('should return false if the query does not match', () => {
    const { getByText } = render(<TestComponent query="non-matching-query" />);
    expect(getByText('Does not match')).toBeInTheDocument();
  });

  // Additional tests can be written to simulate changes in media query matching
});
