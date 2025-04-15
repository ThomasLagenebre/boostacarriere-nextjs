import React from 'react'

function NavlinkDropdown({onClick, className, label}: {onClick: () => void, className?: string, label: string}) {
    return (
        <button onClick={onClick} className={`${className} border-b lg:border-b-2 py-2 border-transparent hover:border-white flex items-center justify-center`}>
          {label}
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
    )
}

export default NavlinkDropdown