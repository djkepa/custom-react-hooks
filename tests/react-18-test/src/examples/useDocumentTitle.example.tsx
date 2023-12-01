import React, { useState } from 'react';
import useDocumentTitle from '../hook/useDocumentTitle';

const DocumentTitleComponent = () => {
  const [title, setTitle] = useState('My Awesome Page');
  useDocumentTitle(title);

  return (
    <div>
      <h1>Welcome to My Awesome Page</h1>
      <button
        onClick={(e) => {
          setTitle('Clicked on the button');
        }}
      >
        Click on the button
      </button>
      <button
        onClick={(e) => {
          setTitle('My Awesome Page');
        }}
      >
        Restore title name
      </button>
    </div>
  );
};
export default DocumentTitleComponent;
