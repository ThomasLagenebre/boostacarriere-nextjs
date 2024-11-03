import React from 'react'

export default function SectionTitle({title, className}: {title: string, className?: string}) {
  return (
    <h3 className={`font-bold text-lg text-secondary dark:text-primary ${className}`}>{title}</h3>
  )
}
