import { useState, useEffect } from 'react';

interface OrientationState {
  angle: number;
  type: 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary' | undefined;
}

/**
 * `useOrientation` is a hook that provides information about the orientation of the device.
 * It returns the current orientation angle and type (portrait or landscape).
 *
 * @return - An object containing the current orientation angle and type.
 */

function useOrientation() {
  const getOrientation = (): OrientationState => {
    if (typeof window === 'undefined' || !window.screen.orientation) {
      return { angle: 0, type: undefined };
    }
    const { angle, type } = window.screen.orientation;
    return { angle, type };
  };

  const [orientation, setOrientation] = useState<OrientationState>(getOrientation);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.screen.orientation) {
      return;
    }

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
}

export default useOrientation;
