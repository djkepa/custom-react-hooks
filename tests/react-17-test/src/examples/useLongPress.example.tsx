import React from 'react';
import useLongPress from '../packages/use-long-press/test/useLongPress.test';

const MyComponent = () => {
  const handleLongPress = () => console.log('Long pressed!');
  const longPressEvents = useLongPress(handleLongPress, {
    threshold: 500,
    onStart: () => console.log('Press started'),
    onFinish: () => console.log('Long press finished'),
    onCancel: () => console.log('Press cancelled')
  });

  return (
    <div {...longPressEvents}>
      Press and hold me
    </div>
  );
};