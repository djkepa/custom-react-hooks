/// <reference types="react" />
export type ValidatorFunction<T> = (values: T) => Record<keyof T, string | undefined>;
export interface UseFormReturnType<T> {
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
declare function useForm<T extends Record<string, any>>(initialValues: T, validate?: ValidatorFunction<T>): UseFormReturnType<T>;
export { useForm };
//# sourceMappingURL=index.d.ts.map