import React from 'react'

export default function Breadcrumbs({linksArray}: {linksArray: {label: string, href:string}[]}) {
  return (
    <ul className='flex items-center gap-2'>
        {linksArray.map((link, idx) => (
        <li key={idx} className='flex items-center gap-2 mb-6'>
            <a href={link.href} className='max-lg:text-xs'>{link.label}</a>
            {idx < linksArray.length - 1 && (
                <svg className="rtl:rotate-180 w-3 h-3 dark:text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            )}
            
        </li>
        ))}
    </ul>
  )
}
