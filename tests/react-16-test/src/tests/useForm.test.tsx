// MyForm.test.tsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MyForm from '../examples/useForm.example';

describe('MyForm Component', () => {
  it('renders form inputs and buttons', () => {
    render(<MyForm />);

    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    render(<MyForm />);

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    // Focus on the input and then blur to trigger validation
    fireEvent.focus(usernameInput);
    fireEvent.blur(usernameInput);
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    // Wait for error messages to appear
    expect(await screen.findByText('Username is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<MyForm />);

    userEvent.type(screen.getByRole('textbox', { name: /username/i }), 'JohnDoe');
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  });
});
