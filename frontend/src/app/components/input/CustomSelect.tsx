import type { SelectHTMLAttributes } from 'react';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    className?: string;
}

export default function CustomSelect({ label, className = '', children, id, ...props }: CustomSelectProps) {
    const selectId = id || `custom-select-${Math.random().toString(36).substring(2, 9)}`

    return (
        <div className="flex flex-col flex-1 min-w-[150px]">
            {label && <label htmlFor={selectId} className="mb-1 text-gray-600 text-sm">{label}</label>}
            <select
                id={selectId}
                {...props}
                className={`
          border border-gray-300 
          p-2 rounded 
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          transition-colors duration-200
          ${className}
        `}
            >
                {children}
            </select>
        </div>
    );
}