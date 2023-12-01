import React, { useRef } from 'react';
import useOrientation from '../hook/useOrientation';

const MyComponent = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const orientation = useOrientation();
  const elementOrientation = useOrientation(imgRef);

  return (
    <div>
      <p>
        Device Orientation: Angle - {orientation.angle}, Type - {orientation.type}
      </p>
      <img
        ref={imgRef}
        src="path/to/image.jpg"
        alt="Sample"
      />
      <p>
        Element Orientation: Aspect Ratio - {elementOrientation.aspectRatio?.toFixed(2)},
        Orientation - {elementOrientation.elementOrientation}
      </p>
    </div>
  );
};

export default MyComponent;
