import React from 'react'

export default function Input({label, type, id, classNameLabel, classNameInput, placeholder, required}: {label: string, type: 'text' | 'number' | 'password' | 'email', id: string, classNameLabel?: string,classNameInput?: string, placeholder?: string, required?: boolean}) {
  return (
    <div className='my-6'>
        <label htmlFor={id} className={`block mb-1 text-sm font-medium lg:text-white ${classNameLabel}`}>{label}</label>
        <input type={type} id={id} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classNameInput}`} placeholder={placeholder} required={required} />
    </div>
  )
}
