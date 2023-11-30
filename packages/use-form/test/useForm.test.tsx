import React from 'react';
import { render, fireEvent, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useForm from '../src/index';

const TestForm = ({ initialValues, validate }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    submissionStatus,
  } = useForm(initialValues, validate);

  const onSubmit = async (values) => {
    // Simulate async submit action
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.username && errors.username && <span>{errors.username}</span>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password && <span>{errors.password}</span>}

      <button
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
      {submissionStatus === 'success' && <div>Form submitted successfully</div>}
      {submissionStatus === 'error' && <div>Form submission failed</div>}
      <button
        type="button"
        onClick={resetForm}
      >
        Reset
      </button>
    </form>
  );
};

describe('useForm', () => {
  const initialValues = { username: '', password: '' };
  const validate = (values) => {
    const errors = { username: '', password: '' };
    if (!values.username) {
      errors.username = 'Username required';
    }
    if (!values.password) {
      errors.password = 'Password required';
    }
    return errors;
  };

  it('should handle input value changes', () => {
    const { getByLabelText } = render(
      <TestForm
        initialValues={initialValues}
        validate={validate}
      />,
    );
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    expect(usernameInput.value).toBe('user');
  });

  it('should validate fields on blur', () => {
    const { getByLabelText, getByText } = render(
      <TestForm
        initialValues={initialValues}
        validate={validate}
      />,
    );
    const usernameInput = getByLabelText('Username');
    fireEvent.blur(usernameInput);
    expect(getByText('Username required')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const { getByLabelText, getByText, getByRole } = render(
      <TestForm
        initialValues={initialValues}
        validate={validate}
      />,
    );
    fireEvent.change(getByLabelText('Username'), { target: { value: 'user' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.submit(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(getByText('Form submitted successfully')).toBeInTheDocument();
    });
  });

  it('should handle form reset', async () => {
    const { getByLabelText, getByRole } = render(
      <TestForm
        initialValues={initialValues}
        validate={validate}
      />,
    );

    // Assert that these elements are HTMLInputElements to access the 'value' property
    const usernameInput = getByLabelText('Username') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const resetButton = getByRole('button', { name: 'Reset' });

    // Change values
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Reset form
    fireEvent.click(resetButton);

    // Use waitFor to ensure the state updates have been processed
    await waitFor(() => {
      expect(usernameInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  it('should display error state when form submission fails', async () => {
    const { getByLabelText, getByRole, getByText } = render(
      <TestForm
        initialValues={initialValues}
        validate={validate}
      />,
    );
    fireEvent.change(getByLabelText('Username'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: '' } });
    fireEvent.submit(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(getByText('Form submission failed')).toBeInTheDocument();
    });
  });
});
