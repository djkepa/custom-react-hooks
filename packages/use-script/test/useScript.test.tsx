import React from 'react';
import { render, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useScript } from '../src/index';

describe('useScript Hook', () => {
  it('renders without crashing', () => {
    renderHook(() => useScript('https://example.com/script.js'));
  });
});
