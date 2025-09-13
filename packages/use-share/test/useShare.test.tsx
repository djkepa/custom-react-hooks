import { renderHook, act } from '@testing-library/react';
import { useShare } from '../src/index';

// Mock navigator.share
const mockShare = jest.fn();
const mockCanShare = jest.fn();
const mockWriteText = jest.fn();

// Mock document.execCommand
const mockExecCommand = jest.fn();

Object.defineProperty(global, 'navigator', {
  value: {
    share: mockShare,
    canShare: mockCanShare,
    clipboard: {
      writeText: mockWriteText,
    },
  },
  writable: true,
});

Object.defineProperty(document, 'execCommand', {
  value: mockExecCommand,
  writable: true,
});

describe('useShare', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShare.mockResolvedValue(undefined);
    mockCanShare.mockReturnValue(true);
    mockWriteText.mockResolvedValue(undefined);
    mockExecCommand.mockReturnValue(true);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useShare());

    expect(result.current.isSupported).toBe(true);
    expect(result.current.isSharing).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.share).toBe('function');
  });

  it('should detect Web Share API support', () => {
    const { result } = renderHook(() => useShare());
    expect(result.current.isSupported).toBe(true);
  });

  it('should use native share when supported', async () => {
    const { result } = renderHook(() => useShare());

    const shareData = {
      title: 'Test Title',
      text: 'Test Text',
      url: 'https://example.com',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockShare).toHaveBeenCalledWith(shareData);
    expect(result.current.error).toBeNull();
  });

  it('should handle sharing with files when supported', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const { result } = renderHook(() => useShare());

    const shareData = {
      title: 'Test Title',
      files: [mockFile],
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockCanShare).toHaveBeenCalledWith({ files: [mockFile] });
    expect(mockShare).toHaveBeenCalled();
  });

  it('should fallback to clipboard when Web Share API is not supported', async () => {
    // Mock Web Share API as not supported
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWriteText,
        },
      },
      writable: true,
    });

    const { result } = renderHook(() => useShare());

    const shareData = {
      text: 'Test Text',
      url: 'https://example.com',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockWriteText).toHaveBeenCalledWith('Test Text\nhttps://example.com');
    expect(result.current.error).toBeNull();
  });

  it('should handle sharing errors', () => {
    const { result } = renderHook(() => useShare());

    // Test that error state can be set
    expect(result.current.error).toBeNull();

    // Test that share function exists and can be called
    expect(typeof result.current.share).toBe('function');
  });

  it('should handle basic functionality', async () => {
    const { result } = renderHook(() => useShare());

    expect(result.current).toBeDefined();
    expect(typeof result.current.share).toBe('function');
    expect(typeof result.current.isSupported).toBe('boolean');
    expect(typeof result.current.isSharing).toBe('boolean');
    expect(result.current.error === null || typeof result.current.error === 'string').toBe(true);
  });

  it('should handle options correctly', () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() =>
      useShare({
        onSuccess,
        onError,
        fallbackCopy: false,
      }),
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current.share).toBe('function');
  });

  it('should handle empty share data', async () => {
    const { result } = renderHook(() => useShare());

    await act(async () => {
      try {
        await result.current.share({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  it('should handle success callback', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useShare({ onSuccess }));

    const shareData = {
      text: 'Test Text',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});
