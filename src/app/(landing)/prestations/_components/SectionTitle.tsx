import React from 'react'

export default function SectionTitle({title, className}: {title: string, className?: string}) {
  return (
    <h3 className={`${className} font-bold text-lg text-secondary dark:text-primary `}>{title}</h3>
  )
}
