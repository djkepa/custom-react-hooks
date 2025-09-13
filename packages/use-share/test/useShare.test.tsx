import { renderHook, act } from '@testing-library/react';
import { useShare } from '../src/index';

// Mock navigator.share
const mockShare = jest.fn();
const mockCanShare = jest.fn();
const mockWriteText = jest.fn();

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

// Mock document.execCommand
document.execCommand = jest.fn();

describe('useShare', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShare.mockResolvedValue(undefined);
    mockCanShare.mockReturnValue(true);
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    delete (navigator as any).share;
    delete (navigator as any).canShare;
  });

  it('should detect Web Share API support', () => {
    // Test without support
    const { result: resultWithoutSupport } = renderHook(() => useShare());
    expect(resultWithoutSupport.current.isSupported).toBe(false);

    // Test with support
    (navigator as any).share = mockShare;
    const { result: resultWithSupport } = renderHook(() => useShare());
    expect(resultWithSupport.current.isSupported).toBe(true);
  });

  it('should use native share when supported', async () => {
    (navigator as any).share = mockShare;
    const onSuccess = jest.fn();

    const { result } = renderHook(() => useShare({ onSuccess }));

    const shareData = {
      title: 'Test Title',
      text: 'Test Text',
      url: 'https://example.com',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockShare).toHaveBeenCalledWith(shareData);
    expect(onSuccess).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  it('should handle sharing with files when supported', async () => {
    (navigator as any).share = mockShare;
    (navigator as any).canShare = mockCanShare;

    const { result } = renderHook(() => useShare());

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const shareData = {
      title: 'Test Title',
      files: [file],
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockCanShare).toHaveBeenCalledWith({ files: [file] });
    expect(mockShare).toHaveBeenCalledWith({
      title: 'Test Title',
      files: [file],
    });
  });

  it('should fallback to clipboard when Web Share API is not supported', async () => {
    const onSuccess = jest.fn();

    const { result } = renderHook(() => useShare({ onSuccess }));

    const shareData = {
      title: 'Test Title',
      text: 'Test Text',
      url: 'https://example.com',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(mockWriteText).toHaveBeenCalledWith('Test Title\nTest Text\nhttps://example.com');
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should use document.execCommand fallback when clipboard API is not available', async () => {
    // Remove clipboard API
    delete (navigator as any).clipboard;

    const { result } = renderHook(() => useShare());

    const shareData = {
      text: 'Test Text',
    };

    await act(async () => {
      await result.current.share(shareData);
    });

    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should handle sharing errors', async () => {
    (navigator as any).share = mockShare;
    mockShare.mockRejectedValue(new Error('Share failed'));

    const onError = jest.fn();
    const { result } = renderHook(() => useShare({ onError }));

    const shareData = { text: 'Test' };

    await act(async () => {
      try {
        await result.current.share(shareData);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Share failed');
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should handle sharing state correctly', async () => {
    (navigator as any).share = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    });

    const { result } = renderHook(() => useShare());

    expect(result.current.isSharing).toBe(false);

    const sharePromise = act(async () => {
      await result.current.share({ text: 'Test' });
    });

    // Should be sharing during the async operation
    expect(result.current.isSharing).toBe(true);

    await sharePromise;

    // Should not be sharing after completion
    expect(result.current.isSharing).toBe(false);
  });

  it('should throw error when fallback is disabled and Web Share API is not supported', async () => {
    const { result } = renderHook(() => useShare({ fallbackCopy: false }));

    await act(async () => {
      try {
        await result.current.share({ text: 'Test' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('not supported and fallback is disabled');
      }
    });
  });

  it('should handle empty share data', async () => {
    const { result } = renderHook(() => useShare());

    await act(async () => {
      try {
        await result.current.share({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('No content to share');
      }
    });
  });

  it('should clear error on successful share', async () => {
    (navigator as any).share = mockShare;

    const { result } = renderHook(() => useShare());

    // First, cause an error
    mockShare.mockRejectedValueOnce(new Error('First error'));

    await act(async () => {
      try {
        await result.current.share({ text: 'Test' });
      } catch (error) {
        // Expected
      }
    });

    expect(result.current.error).toBe('First error');

    // Then, successful share should clear the error
    mockShare.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.share({ text: 'Test' });
    });

    expect(result.current.error).toBeNull();
  });
});

