import React from 'react'
import { IconType } from 'react-icons'

export default function ItemCard({title, number, evolution, icon: Icon}: {title: string, number: number, evolution: number, icon: IconType}) {
  return (
    <div className='border border-gray-300 bg-blue-100 rounded-md w-fit p-4'> 
        <div className='flex items-start gap-4'>
          <div className='bg-secondary w-12 h-12 rounded-full flex items-center justify-center'>
            <Icon className='fill-light h-5 w-5'/>
          </div>
          <div>
            <h4 className='text-gray-700'>{title}</h4>
            <p className='font-semibold text-xl'>{number}</p>
          </div>
        </div>
        <p className='mt-4 text-gray-700'>
          {evolution < 0 ? (
            <span className="bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 me-1 rounded dark:bg-red-900 dark:text-red-300">{evolution}</span> 
          ) : (
            <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 me-1 py-0.5 rounded dark:bg-green-900 dark:text-green-300">+{evolution}</span> 
          )}
          par rapport à S-1
          </p>
      </div>
  )
}

