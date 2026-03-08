import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { loginSchema, type LoginFormData } from '../features/Login/login.schema';
import type { ZodError } from 'zod';

export const useLoginForm = () => {
    const { login } = useAuthStore();

    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});

        try {
            const validated = loginSchema.parse(form);
            await login(validated);
        } catch (err: any) {
            if (err?.name === 'ZodError') {
                const zodError = err as ZodError;
                const errors: Partial<Record<keyof LoginFormData, string>> = {};
                zodError.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof LoginFormData;
                    if (!errors[field]) errors[field] = issue.message;
                });
                setFieldErrors(errors);
            } else {
                const apiErrorMessage = err?.response?.data?.message || err?.message || 'Login failed';
                setFieldErrors({ password: apiErrorMessage });
            }
        }
    };

    return {
        form,
        setForm,
        fieldErrors,
        handleSubmit,
    };
};
