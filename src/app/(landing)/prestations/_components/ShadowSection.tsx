import React from 'react'

export default function ShadowSection({children, className, background, marge = true}: {children: React.ReactNode, className?: string, background?: string, marge?: boolean}) {
  return (
    <section className={` shadow-lg ${background ? background : 'bg-white'} dark:bg-slate-800 dark:text-white rounded-lg px-6 py-4 md:p-6 ${className} ${marge ? 'my-6' : 'my-0'}`}>{children}</section>
  )
}
