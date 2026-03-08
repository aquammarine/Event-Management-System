import React from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    isDanger?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    confirmText,
    onConfirm,
    isDanger = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div
                className={`bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-white/20`}
            >
                <div className="relative pt-8 pb-4 px-8 text-center">
                    <div className="absolute top-4 right-4">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 transition-all focus:outline-none border-none group"
                            icon={X}
                        />
                    </div>

                    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                        }`}>
                        {isDanger ? <AlertTriangle size={32} /> : <Info size={32} />}
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
                </div>

                <div className="px-8 pb-8 text-center">
                    <p className="text-slate-500 leading-relaxed font-medium">
                        {children}
                    </p>
                </div>

                <div className="flex flex-col gap-2 p-8 bg-slate-50/50 border-t border-slate-100/80">
                    {confirmText && onConfirm && (
                        <Button
                            variant={isDanger ? 'danger' : 'primary'}
                            onClick={onConfirm}
                            className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${isDanger ? 'shadow-red-200' : 'shadow-indigo-200'
                                }`}
                        >
                            {confirmText}
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="w-full py-3 rounded-xl text-slate-500 font-semibold hover:bg-slate-100/80 transition-all"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { Modal };
