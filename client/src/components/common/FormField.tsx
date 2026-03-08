import React from 'react';
import { Label } from './Label';
import { Input } from './Input';
import type { InputProps } from './Input';
import { Error } from './Error';

export interface FormFieldProps extends InputProps {
    id: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, required, error, id, className, ...inputProps }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className || ''}`}>
            {label && (
                <Label text={label} required={required} htmlFor={id} />
            )}
            <Input id={id} required={required} {...inputProps} />
            {error && <Error message={error} />}
        </div>
    );
};

export { FormField };
