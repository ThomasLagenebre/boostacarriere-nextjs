import React from 'react'

export default function DashboardSection({className, background, children}: {className?: string, background?: string, children:React.ReactNode}) {
  return (
    <div className={`${className} shadow-md ${background ? background : 'bg-white'} dark:bg-slate-800 dark:text-white rounded-lg px-6 py-4 md:p-6 my-4 `}>{children}</div>
  )
}
