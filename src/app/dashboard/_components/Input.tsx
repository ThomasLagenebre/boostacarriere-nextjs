'use client';
import React, { useState } from 'react'

export default function Input({id, placeholder, label, indicationLabel, type, labelClassName, inputClassName, required, value, rows, disabled, onChange }: {id: string, placeholder?: string, label: string, indicationLabel?:string, type: 'text' | 'number' | 'textarea', labelClassName?: string, inputClassName?: string, required?: boolean, value?: string | number, rows?: number, disabled?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;}) {
    const [currentValue, setCurrentValue] = useState(value || '');

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentValue(e.target.value);
        if (onChange) {
          onChange(e); // Passe l'événement complet au parent
        }
      };

  return (
        <div className='my-4'>
            <label htmlFor={id} className={`${labelClassName} block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>{label} <span className='italic text-xs font-normal'>{indicationLabel}</span></label>
            {(type === 'number' || type === 'text') && (
                <input type={type} id={id} className={`${inputClassName} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={placeholder} required={required} value={currentValue} disabled={disabled} onChange={handleChangeValue}/>
            )}
            {type === 'textarea' && (
                <textarea id={id} rows={rows} className={`${inputClassName} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={placeholder} required={required} value={currentValue} disabled={disabled} onChange={handleChangeValue}></textarea>
            )}
            
        </div>
  )
}
