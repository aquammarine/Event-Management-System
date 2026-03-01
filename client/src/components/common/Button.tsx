import React from 'react';
import { Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    icon: Icon,
    iconPosition = 'right',
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6';

    const variants = {
        primary: 'bg-[#6366f1] hover:bg-[#4f46e5] text-white',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900',
        outline: 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold',
        ghost: 'bg-transparent hover:bg-slate-50 text-slate-600',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon size={20} />}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && <Icon size={20} />}
                </>
            )}
        </button>
    );
};

export default Button;
