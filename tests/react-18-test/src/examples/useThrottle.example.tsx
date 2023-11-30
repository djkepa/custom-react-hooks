import React, { useEffect } from 'react';
import useThrottle from '../src/hooks/useThrottle';

const MyComponent = () => {
  const handleScroll = useThrottle(() => {
    // Throttled scroll event logic
    console.log('Scroll event throttled');
  }, 1000);

  useEffect(() => {
    // Attach the throttled event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <div>Content here</div>;
}