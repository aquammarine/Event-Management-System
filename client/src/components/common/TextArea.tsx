import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    required?: boolean;
    containerClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
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
            <textarea
                className={`w-full bg-[#f8fafc] border ${error ? 'border-red-300' : 'border-slate-200/60'
                    } text-slate-900 rounded-xl py-3 px-4 outline-none focus:bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/5 transition-all font-medium placeholder:text-slate-400/60 resize-none min-h-[120px] ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
        </div>
    );
};

export default TextArea;
