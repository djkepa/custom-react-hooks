# useForm Hook

The `useForm` hook is an advanced form management tool for React applications, providing capabilities for managing form state, validation, loading status, and submission feedback.

## Features

- **Flexible Form State Management:** Handles values, errors, and touch status of form fields.
- **Custom Validation:** Supports custom validation logic for form fields.
- **Loading State (`isSubmitting`):** Indicates when the form is being submitted, useful for displaying loading indicators.
- **Submission Status (`submissionStatus`):** Provides feedback on the form submission process, with states like `idle`, `success`, or `error`.

## Installation

To integrate `useForm` into your project:

```bash
npm install @custom-react-hooks/use-form
```

or

```bash
yarn add @custom-react-hooks/use-form
```

## Usage

```typescript
import React from 'react';
import useForm from '@custom-react-hooks/useForm';

interface FormValues {
  username: string;
  email: string;
}

const MyForm = () => {
  const initialValues: FormValues = { username: '', email: '' };

  const validate = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.email) errors.email = 'Email is required';
    // Add more validation rules as needed
    return errors as Record<keyof FormValues, string | undefined>;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useForm(
    initialValues,
    validate,
  );

  const onSubmit = async () => {
    // If you have asynchronous operations, place them here
    console.log('Form submitted:', values);
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
      {touched.username && errors.username && <div>{errors.username}</div>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <button type="submit">Submit</button>
      <button
        type="button"
        onClick={resetForm}
      >
        Reset
      </button>
    </form>
  );
};

export default MyForm;
```

## API Reference

- `initialValues`: Object representing the initial state of the form fields.
- `validate`: Function for custom validation logic, returning error messages for each field.
- `values`: Object representing the current values of the form fields.
- `errors`: Object representing validation errors for each field.
- `touched`: Object indicating which fields have been touched.
- `handleChange`: Function to handle changes in form fields.
- `handleBlur`: Function to handle blur events on form fields.
- `handleSubmit`: Function to handle form submission, including asynchronous operations.
- `resetForm`: Function to reset the form to its initial state.
- `isSubmitting`: Boolean indicating the submitting state of the form.
- `submissionStatus`: String representing the status of the form submission (`idle`, `success`, or `error`).

## Contributing

Your contributions to further enhance `useForm` are welcome. Feel free to submit issues or pull requests to the repository.
