import React from 'react'

export default function ShadowSection({children, className, background}: {children: React.ReactNode, className?: string, background?: string}) {
  return (
    <section className={`${className} shadow-lg ${background ? background : 'bg-white'} dark:bg-slate-800 dark:text-white rounded-lg px-6 py-4 md:p-6 my-6 `}>{children}</section>
  )
}
