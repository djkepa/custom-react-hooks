import React from 'react';
import useForm from '../src/hooks/useForm';

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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useForm(initialValues, validate);

  const onSubmit = async () => {
    // If you have asynchronous operations, place them here
    console.log('Form submitted:', values);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
      {touched.username && errors.username && <div>{errors.username}</div>}
      
      <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};

export default MyForm;
