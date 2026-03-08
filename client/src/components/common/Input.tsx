import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    icon: Icon,
    className = '',
    type,
    label,
    error,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const resolvedType = isPassword && showPassword ? 'text' : type;
    const hasIcon = !!Icon;

    return (
        <div className="relative w-full">
            {hasIcon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Icon size={18} />
                </span>
            )}

            <input
                type={resolvedType}
                className={[
                    'w-full rounded-xl p-2 outline-none transition-all font-medium',
                    'bg-[#FCFCFD] border border-[#E5E7EB]',
                    'focus:bg-white focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/5',
                    'placeholder:text-slate-400/60',
                    hasIcon ? 'pl-10' : '',
                    isPassword ? 'pr-11' : '',
                    className,
                ].join(' ')}
                {...props}
            />

            {isPassword && (
                <Button
                    type="button"
                    variant="ghost"
                    icon={showPassword ? EyeOff : Eye}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="!absolute !right-1 !top-1/2 !-translate-y-1/2 !p-2 !rounded-lg text-slate-400 hover:!text-slate-600"
                    tabIndex={-1}
                />
            )}
        </div>
    );
};

export { Input };
