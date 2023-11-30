import { renderHook } from '@testing-library/react';
import useDocumentTitle from '../../../../packages/use-document-title/dist/index';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle; // Reset the title after each test
  });

  it('sets the document title', () => {
    const newTitle = 'New Title';
    renderHook(() => useDocumentTitle(newTitle));

    expect(document.title).toBe(newTitle);
  });

  it('reverts to the original title on unmount', () => {
    const newTitle = 'Temporary Title';
    const { unmount } = renderHook(() => useDocumentTitle(newTitle, true));

    expect(document.title).toBe(newTitle);
    unmount();
    expect(document.title).toBe(originalTitle);
  });

  it('does not revert title on unmount if revertOnUnmount is false', () => {
    const newTitle = 'Temporary Title';
    const { unmount } = renderHook(() => useDocumentTitle(newTitle, false));

    expect(document.title).toBe(newTitle);
    unmount();
    expect(document.title).toBe(newTitle); // Still the new title
  });
});
