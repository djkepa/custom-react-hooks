// PortalTestComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalTestComponent from '../examples/usePortal.example';

describe('PortalTestComponent', () => {
  it('renders portal content when open', () => {
    render(<PortalTestComponent />);
    const openButton = screen.getByText('Open Portal');
    fireEvent.click(openButton);

    const portalContent = screen.getByText('This is portal content');
    expect(portalContent).toBeInTheDocument();
    expect(portalContent.parentNode).not.toBe(document.body);
  });

  it('does not render portal content when closed', () => {
    render(<PortalTestComponent />);
    const closeButton = screen.getByText('Close Portal');
    fireEvent.click(closeButton);

    expect(screen.queryByText('This is portal content')).not.toBeInTheDocument();
  });

  it('indicates when the portal is open', () => {
    render(<PortalTestComponent />);
    const openButton = screen.getByText('Open Portal');
    fireEvent.click(openButton);

    expect(screen.getByText('Portal is open')).toBeInTheDocument();
  });
});
