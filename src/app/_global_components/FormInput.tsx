'use client';

import React, { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface FormInputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url';
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: IconType;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword = false,
}, ref) => {
  const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          className={`block w-full ${
            Icon ? 'pl-10' : 'pl-3'
          } ${
            showPasswordToggle ? 'pr-12' : 'pr-3'
          } py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
            error 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-primary'
          } ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          }`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={disabled}
          >
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
