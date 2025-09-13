import { renderHook, act } from '@testing-library/react';
import { useCache } from '../src/index';

// Mock Date.now for consistent testing
const mockDateNow = jest.spyOn(Date, 'now');

describe('useCache', () => {
  beforeEach(() => {
    mockDateNow.mockReturnValue(1000);
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockDateNow.mockRestore();
  });

  it('should set and get values', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.get('key1')).toBe('value1');
    expect(result.current.has('key1')).toBe(true);
  });

  it('should return undefined for non-existent keys', () => {
    const { result } = renderHook(() => useCache<string>());

    expect(result.current.get('nonexistent')).toBeUndefined();
    expect(result.current.has('nonexistent')).toBe(false);
  });

  it('should delete entries', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.has('key1')).toBe(true);

    act(() => {
      result.current.delete('key1');
    });

    expect(result.current.has('key1')).toBe(false);
    expect(result.current.get('key1')).toBeUndefined();
  });

  it('should clear all entries', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    expect(result.current.size()).toBe(2);

    act(() => {
      result.current.clear();
    });

    expect(result.current.size()).toBe(0);
    expect(result.current.has('key1')).toBe(false);
    expect(result.current.has('key2')).toBe(false);
  });

  it('should handle TTL expiration', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('key1', 'value1', 1000); // 1 second TTL
    });

    expect(result.current.get('key1')).toBe('value1');

    // Advance time by 1.5 seconds
    mockDateNow.mockReturnValue(2500);

    expect(result.current.get('key1')).toBeUndefined();
    expect(result.current.has('key1')).toBe(false);
  });

  it('should use default TTL from options', () => {
    const { result } = renderHook(() => useCache<string>({ ttl: 500 }));

    act(() => {
      result.current.set('key1', 'value1'); // Uses default TTL
    });

    expect(result.current.get('key1')).toBe('value1');

    // Advance time by 600ms
    mockDateNow.mockReturnValue(1600);

    expect(result.current.get('key1')).toBeUndefined();
  });

  it('should respect maxSize limit', () => {
    const { result } = renderHook(() => useCache<string>({ maxSize: 2 }));

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
      result.current.set('key3', 'value3'); // Should evict oldest
    });

    expect(result.current.size()).toBe(2);
    expect(result.current.has('key1')).toBe(false); // Oldest, should be evicted
    expect(result.current.has('key2')).toBe(true);
    expect(result.current.has('key3')).toBe(true);
  });

  it('should return correct keys', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    const keys = result.current.keys();
    expect(keys).toHaveLength(2);
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
  });

  it('should work with different data types', () => {
    const { result } = renderHook(() => useCache<any>());

    const obj = { id: 1, name: 'test' };
    const arr = [1, 2, 3];

    act(() => {
      result.current.set('string', 'hello');
      result.current.set('number', 42);
      result.current.set('boolean', true);
      result.current.set('object', obj);
      result.current.set('array', arr);
    });

    expect(result.current.get('string')).toBe('hello');
    expect(result.current.get('number')).toBe(42);
    expect(result.current.get('boolean')).toBe(true);
    expect(result.current.get('object')).toBe(obj);
    expect(result.current.get('array')).toBe(arr);
  });

  it('should handle entries without TTL', () => {
    const { result } = renderHook(() => useCache<string>());

    act(() => {
      result.current.set('persistent', 'value');
    });

    // Advance time significantly
    mockDateNow.mockReturnValue(10000);

    // Should still be available since no TTL was set
    expect(result.current.get('persistent')).toBe('value');
  });

  it('should override default TTL with specific TTL', () => {
    const { result } = renderHook(() => useCache<string>({ ttl: 1000 }));

    act(() => {
      result.current.set('key1', 'value1'); // Uses default TTL (1000ms)
      result.current.set('key2', 'value2', 2000); // Uses specific TTL (2000ms)
    });

    // Advance time by 1500ms
    mockDateNow.mockReturnValue(2500);

    expect(result.current.get('key1')).toBeUndefined(); // Expired
    expect(result.current.get('key2')).toBe('value2'); // Still valid
  });
});

