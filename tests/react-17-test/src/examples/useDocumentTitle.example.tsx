import React from 'react';
import useDocumentTitle from "../src/hooks/useDocumentTitle";

const MyPageComponent = () => {
  useDocumentTitle("My Awesome Page");

  return (
    <div>
      <h1>Welcome to My Awesome Page</h1>
      {/* Page content */}
    </div>
  );
};