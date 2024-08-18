import { useState, useCallback, useEffect } from 'react';

export type ValidatorFunction<T> = (values: T) => Record<keyof T, string | undefined>;

export interface UseFormReturnType<T> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  touched: Record<keyof T, boolean>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    callback: (values: T) => Promise<void>,
  ) => void;
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
  validate?: ValidatorFunction<T>,
): UseFormReturnType<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>(() =>
    createInitialErrorsState<T>(initialValues),
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() =>
    createInitialTouchedState<T>(initialValues),
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
    },
    [],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((t) => ({ ...t, [name]: true }));

      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      }
    },
    [values, validate],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, callback: (values: T) => Promise<void>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmissionStatus('idle');

      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setTouched((t) => createAllTouchedState<T>(values, t));

        const isValid = !Object.values(validationErrors).some((error) => error);
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
      }

      setIsSubmitting(false);
    },
    [values, validate],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors(createInitialErrorsState(initialValues));
    setTouched(createInitialTouchedState(initialValues));
    setIsSubmitting(false);
    setSubmissionStatus('idle');
  }, [initialValues]);

  useEffect(() => {
    if (validate) {
      const newErrors = validate(values);

      if (!areErrorsEqual(errors, newErrors)) {
        setErrors(newErrors);
      }
    }
  }, [values, validate, errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    submissionStatus,
  };
}

function areErrorsEqual<T>(
  errors1: Record<keyof T, string | undefined>,
  errors2: Record<keyof T, string | undefined>,
): boolean {
  const keys = Object.keys(errors1) as Array<keyof T>;
  return keys.every((key) => errors1[key] === errors2[key]);
}

function createInitialErrorsState<T extends Record<string, any>>(
  initialValues: T,
): Record<keyof T, string | undefined> {
  return Object.keys(initialValues).reduce((acc, key) => {
    acc[key as keyof T] = undefined;
    return acc;
  }, {} as Record<keyof T, string | undefined>);
}

function createInitialTouchedState<T extends Record<string, any>>(
  initialValues: T,
): Record<keyof T, boolean> {
  return Object.keys(initialValues).reduce((acc, key) => {
    acc[key as keyof T] = false;
    return acc;
  }, {} as Record<keyof T, boolean>);
}

function createAllTouchedState<T extends Record<string, any>>(
  values: T,
  currentTouched: Record<keyof T, boolean>,
): Record<keyof T, boolean> {
  return Object.keys(values).reduce((acc, key) => {
    acc[key as keyof T] = true;
    return acc;
  }, currentTouched);
}

export { useForm };
