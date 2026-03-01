import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    error?: string;
    fullWidth?: boolean;
    required?: boolean;
    containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    icon: Icon,
    iconPosition = 'left',
    error,
    fullWidth = false,
    required = false,
    containerClassName = '',
    className = '',
    ...props
}) => {
    const widthStyles = fullWidth ? 'w-full' : '';
    return (
        <div className={`space-y-2 ${widthStyles} ${containerClassName}`}>
            {label && (
                <label className="text-[14px] font-bold text-slate-800 ml-0.5 flex items-center gap-1">
                    {label}
                    {required && <span className="text-[#ef4444] text-base leading-none">*</span>}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#6366f1] transition-colors`}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`w-full bg-[#f8fafc] border ${error ? 'border-red-300' : 'border-slate-200/60'
                        } text-slate-900 rounded-xl py-3 px-4 ${Icon && iconPosition === 'left' ? 'pl-11' : 'pl-4'
                        } ${Icon && iconPosition === 'right' ? 'pr-11' : 'pr-4'
                        } outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/5 transition-all font-medium placeholder:text-slate-400/60 ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
        </div>
    );
};

export default Input;
