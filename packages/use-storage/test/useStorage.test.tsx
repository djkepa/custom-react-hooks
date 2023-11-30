import React from 'react';
import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import useStorage from '../src/index';

describe('useStorage Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should retrieve the initial value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('testValue'));
    const { result } = renderHook(() => useStorage('testKey', 'defaultValue', 'local'));
    expect(result.current[0]).toBe('testValue');
  });

  it('should update the value in localStorage', () => {
    const { result } = renderHook(() => useStorage('testKey', 'defaultValue', 'local'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });
});
