import React from 'react';
import { Label } from './Label';
import { Input } from './Input';
import type { InputProps } from './Input';

export interface FormFieldProps extends InputProps {
    id: string; // Ensure id is required for accessibility (htmlFor in label)
}

const FormField: React.FC<FormFieldProps> = ({ label, required, error, id, className, ...inputProps }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className || ''}`}>
            {label && (
                <Label text={label} required={required} htmlFor={id} />
            )}
            <Input id={id} required={required} {...inputProps} />
            {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
        </div>
    );
};

export { FormField };
