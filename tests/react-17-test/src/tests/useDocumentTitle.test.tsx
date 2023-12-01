import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen } from '@testing-library/react';
import useDocumentTitle from '../hook/useDocumentTitle';
import React from 'react';
import DocumentTitleComponent from '../examples/useDocumentTitle.example';

describe('useDocumentTitle', () => {
  it('updates document title on button click', () => {
    render(<DocumentTitleComponent />);

    // Check initial title
    expect(document.title).toBe('My Awesome Page');

    const buttonChangeTitle = screen.getByText('Click on the button');
    fireEvent.click(buttonChangeTitle);

    // Check title after button click
    expect(document.title).toBe('Clicked on the button');

    const buttonRestoreTitle = screen.getByText('Restore title name');
    fireEvent.click(buttonRestoreTitle);

    // Check title after restoring
    expect(document.title).toBe('My Awesome Page');
  });
});
