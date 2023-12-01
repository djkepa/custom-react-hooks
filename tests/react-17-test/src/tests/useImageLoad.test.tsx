import React from 'react';
import { render, act } from '@testing-library/react';
import useImageLoad from '../hook/useImageLoad';
import { ImageComponent } from '../examples/useImageLoad.example';
import '@testing-library/jest-dom';

// Mocking Intersection Observer
class MockIntersectionObserver {
  constructor(public callback: IntersectionObserverCallback) {}

  observe() {
    act(() => {
      this.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
  }

  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mocking useImageLoad hook
jest.mock('../hook/useImageLoad', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ImageComponent Tests', () => {
  beforeEach(() => {
    // Resetting the mock before each test
    (useImageLoad as jest.Mock).mockReset();
  });

  // Test 1: ImageComponent displays loading message
  it('displays loading message when image is loading', () => {
    (useImageLoad as jest.Mock).mockReturnValue({
      src: 'thumbnail.jpg',
      isLoading: true,
      isLoaded: false,
      hasError: false,
    });

    const options = { thumbnailSrc: 'thumbnail.jpg', fullSrc: 'full.jpg', lazyLoad: true };
    const { getByText } = render(<ImageComponent options={options} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  // Test 2: ImageComponent displays error message
  it('displays error message when there is an error loading the image', () => {
    (useImageLoad as jest.Mock).mockReturnValue({
      src: '',
      isLoading: false,
      isLoaded: false,
      hasError: true,
    });

    const options = { thumbnailSrc: 'thumbnail.jpg', fullSrc: 'full.jpg', lazyLoad: true };
    const { getByText } = render(<ImageComponent options={options} />);
    expect(getByText('Error loading image')).toBeInTheDocument();
  });

  // Test 3: ImageComponent successfully loads an image
  it('renders the image when successfully loaded', () => {
    (useImageLoad as jest.Mock).mockReturnValue({
      src: 'full.jpg',
      isLoading: false,
      isLoaded: true,
      hasError: false,
    });

    const options = { thumbnailSrc: 'thumbnail.jpg', fullSrc: 'full.jpg', lazyLoad: true };
    const { getByRole } = render(<ImageComponent options={options} />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'full.jpg');
    expect(image.style.visibility).toBe('visible');
  });
});
