import React from 'react';
import useScript from "../src/hooks/useScript";

const MyComponent = () => {
  const scripts = useScript(
    ['https://example.com/script1.js', 'https://example.com/script2.js'],
    {
      onLoad: () => console.log('Scripts loaded'),
      onError: () => console.log('Script load error'),
      defer: true,
      removeOnUnmount: true
    }
  );

  return (
    <div>
      {scripts.map(script => (
        <div key={script.src}>{script.status}</div>
      ))}
    </div>
  );
};
