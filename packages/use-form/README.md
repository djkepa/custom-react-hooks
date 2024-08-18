# useForm Hook

The `useForm` hook is an advanced form management tool for React applications, providing capabilities for managing form state, validation, loading status, and submission feedback.

## Features

- **Flexible Form State Management:** Handles values, errors, and touch status of form fields.
- **Custom Validation:** Supports custom validation logic for form fields.
- **Loading State (`isSubmitting`):** Indicates when the form is being submitted, useful for displaying loading indicators.
- **Submission Status (`submissionStatus`):** Provides feedback on the form submission process, with states like `idle`, `success`, or `error`.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-form
```

or

```bash
yarn add @custom-react-hooks/use-form
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Importing the Hook

The `useForm` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useForm } from '@custom-react-hooks/use-form';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## Features

- **Comprehensive Form State Management:** Efficiently manages the state of form fields including values, validation errors, and touched status, ensuring a smooth form handling experience.

- **Customizable Validation Logic:** Supports custom validation functions, allowing for flexible and complex validation rules tailored to specific form requirements.

- **Real-Time Feedback on Form State:** Tracks the `isSubmitting` state, providing real-time feedback on the form's submission process, which is particularly useful for implementing loading indicators.

- **Detailed Submission Status Tracking:** Maintains a `submissionStatus` state with values like `idle`, `success`, or `error`, offering precise feedback on the outcome of form submissions.

- **Dynamic Form Field Handling:** Capable of managing dynamic form fields, allowing for adding, removing, or updating fields as needed within the form.

- **Synchronous and Asynchronous Validation:** Supports both synchronous and asynchronous validation, making it suitable for a variety of validation scenarios including server-side validation checks.

- **Event Handlers for Form Interactions:** Provides built-in handlers for common form events like changes (`handleChange`), blurs (`handleBlur`), and submissions (`handleSubmit`), simplifying form interaction logic.

- **Form Reset Functionality:** Includes a `resetForm` function to easily reset the form to its initial state, enhancing user experience in scenarios like form cancellation or reinitialization.

- **Declarative Form Submission:** The `handleSubmit` function allows for declarative handling of form submissions, including support for asynchronous operations like API calls.

- **Enhanced User Experience:** Improves user experience by providing immediate feedback on input validation and submission status, reducing user errors and confusion.

- **Optimized for Complex Forms:** Ideal for handling complex forms, such as multi-step forms or forms with conditional logic, due to its comprehensive state management and flexible validation capabilities.

## Usage

```typescript
import React from 'react';
import useForm from '@custom-react-hooks/use-form';

const FormComponent = () => {
  const initialValues = { username: '', email: '' };
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState('');

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.email) errors.email = 'Email is required';
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useForm(
    initialValues,
    validate,
  );

  const onSubmit = async () => {
    setSubmitting(true);
    console.log('Form submitted:', values);

    setTimeout(() => {
      setSubmitResult('Form submitted successfully!');
      setSubmitting(false);
    }, 2000);
  };

  return (
    <>
      {submitting && <div>Loading...</div>}
      {!submitting && submitResult && <div>{submitResult}</div>}
      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className="form"
      >
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="pair">
          <button
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetForm}
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
```

## API Reference

### Parameters

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

## Use Cases

- **Form State Management**: Handle input values, errors, and touched fields.
- **Dynamic Form Handling**: Dynamically add, remove, or update form fields.
- **Form Validation**: Implement synchronous or asynchronous form validation.
- **Form Submission**: Manage form submission status and handle submit events.
- **Multi-Step Forms**: Control multi-step or wizard-like form processes.

## Contributing

Your contributions to further enhance `useForm` are welcome. Feel free to submit issues or pull requests to the repository.
