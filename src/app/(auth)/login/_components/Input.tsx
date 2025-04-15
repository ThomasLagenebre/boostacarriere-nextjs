import React from 'react'

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function Input({ 
  label, 
  type, 
  placeholder, 
  id, 
  value, 
  onChange,
  required,
  className
}: InputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${className}`}>
        {label}
      </label>
      <input 
        type={type} 
        id={id} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}
