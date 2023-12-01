import React, { useRef, useState } from 'react';
import useElementSize from '../hook/useElementSize';

const TestComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { width, height } = useElementSize(ref);
  const [customWidth, setCustomWidth] = useState<number | undefined>(undefined);
  const [customHeight, setCustomHeight] = useState<number | undefined>(undefined);

  const handleInputChange = () => {
    if (textareaRef.current) {
      const parsedWidth = parseFloat(textareaRef.current.value);
      if (!isNaN(parsedWidth)) {
        setCustomWidth(parsedWidth);
      }
    }
  };

  const handleHeightInputChange = () => {
    if (textareaRef.current) {
      const parsedHeight = parseFloat(textareaRef.current.value);
      if (!isNaN(parsedHeight)) {
        setCustomHeight(parsedHeight);
      }
    }
  };

  return (
    <div>
      <div
        ref={ref}
        style={{ width: customWidth || width, height: customHeight || height }}
      >
        <p>Width: {customWidth || width}px</p>
        <p>Height: {customHeight || height}px</p>
      </div>
      <textarea
        ref={textareaRef}
        aria-label="Set custom width"
        placeholder="Set custom width"
        onChange={handleInputChange}
      />
      <textarea
        ref={textareaRef}
        aria-label="Set custom height"
        placeholder="Set custom height"
        onChange={handleHeightInputChange}
      />
    </div>
  );
};

export default TestComponent;
