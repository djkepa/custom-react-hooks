import { useState, useEffect, useCallback, RefObject } from 'react';

export interface OrientationState {
  angle: number;
  type:
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait-primary'
    | 'portrait-secondary'
    | undefined;
  aspectRatio?: number;
  elementOrientation?: 'landscape' | 'portrait';
}

/**
 * `useOrientation` is a hook that provides information about the orientation of the device
 * and an optional HTML element. It returns the current device orientation angle and type
 * (portrait or landscape), as well as the aspect ratio and orientation of the referenced element.
 *
 * @param elementRef - (Optional) A React ref to an HTML element to track its orientation and aspect ratio.
 * @return - An object containing the current orientation angle, type, aspect ratio, and element orientation.
 */

function useOrientation<T extends HTMLElement>(elementRef?: RefObject<T>): OrientationState {
  const getOrientation = (): OrientationState => {
    const orientationData: OrientationState = {
      angle: 0,
      type: undefined,
      aspectRatio: undefined,
      elementOrientation: undefined,
    };

    if (typeof window !== 'undefined' && window.screen.orientation) {
      const { angle, type } = window.screen.orientation;
      orientationData.angle = angle;
      orientationData.type = type;
    }

    if (elementRef?.current) {
      const { offsetWidth, offsetHeight } = elementRef.current;
      orientationData.aspectRatio = offsetWidth / offsetHeight;
      orientationData.elementOrientation = offsetWidth > offsetHeight ? 'landscape' : 'portrait';
    }

    return orientationData;
  };

  const [orientation, setOrientation] = useState<OrientationState>(getOrientation);

  const handleOrientationChange = useCallback(() => {
    setOrientation(getOrientation());
  }, [elementRef]);

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [handleOrientationChange]);

  return orientation;
}

export default useOrientation;
