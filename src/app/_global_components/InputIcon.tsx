import React, { ReactNode } from 'react';

interface InputIconProps {
  iconSvg: ReactNode;
  placeholder: string;
  id: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}

const InputIcon = ({ 
  iconSvg, 
  placeholder, 
  id, 
  className = '', 
  value, 
  onChange,
  required = false,
  type = 'text'
}: InputIconProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {iconSvg}
      </div>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export { InputIcon };
  