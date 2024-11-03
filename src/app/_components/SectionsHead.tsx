import React from 'react'

export default function SectionsHead({titleClassName, title, description, descriptionClassName}: {titleClassName?: string, descriptionClassName?: string, title:string, description: string}) {
  return (
    <>
      <h2 className={`font-bold text-xl text-secondary text-center dark:text-primary ${titleClassName}`}>{title}</h2>
      <p className={`text-center px-6 md:w-3/5 mx-auto text-gray-500 dark:text-light ${descriptionClassName}`}>{description}</p>
    </>
    
  )
}
