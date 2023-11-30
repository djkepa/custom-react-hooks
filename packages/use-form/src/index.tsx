import { useState, useCallback, useEffect } from 'react';

type ValidatorFunction<T> = (values: T) => Record<keyof T, string | undefined>;

interface UseFormReturnType<T> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  touched: Record<keyof T, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, callback: (values: T) => Promise<void>) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  submissionStatus: 'idle' | 'success' | 'error';
}

/**
 * `useForm` is a hook for managing form state and validation in React.
 * It provides an API for handling form inputs, validation, submissions, and form reset functionality.
 *
 * @param initialValues - An object containing the initial values of the form fields.
 * @param validate - A function to validate form values. Should return an object with error messages.
 * @return - An object containing form values, errors, handlers for changes, blurs, submission, form reset, submission status, and whether the form is submitting.
 */

function useForm<T extends Record<string, any>>(
 initialValues: T,
  validate?: ValidatorFunction<T>
): UseFormReturnType<T> {
  const [values, setValues] = useState<T>(initialValues);
 const createInitialErrorsState = (): Record<keyof T, string | undefined> => {
    return Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = undefined;
      return acc;
    }, {} as Record<keyof T, string | undefined>);
  };
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>(createInitialErrorsState);

  const createInitialTouchedState = (): Record<keyof T, boolean> => {
    return Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>);
  };
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(createInitialTouchedState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));

    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>, callback: (values: T) => void | Promise<void>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(t => Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), t));

    const isValid = !Object.values(validationErrors).some(error => error);
    if (isValid) {
      try {
        await callback(values);
        setSubmissionStatus('success');
      } catch (error) {
        setSubmissionStatus('error');
      }
    } else {
      setSubmissionStatus('error');
    }

    setIsSubmitting(false);
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors(createInitialErrorsState());
    setTouched(createInitialTouchedState());
    setIsSubmitting(false);
    setSubmissionStatus('idle');
  }, [initialValues]);

  useEffect(() => {
    setErrors(validate(values));
  }, [values, validate]);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting, submissionStatus };
}

export default useForm;
