import type { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function CustomInput({ label, className = '', ...props }: CustomInputProps) {
    return (
        <div className="flex flex-col flex-1 min-w-[150px]">
            {label && <label className="mb-1 text-gray-600 text-sm">{label}</label>}
            <input
                {...props}
                className={`
                    border
                    p-2 rounded 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                    transition-colors duration-200
                    ${className}
                `}
            />
        </div>
    );
}