'use client';
import React from 'react'

export default function SwitchButton({setter, state} : {setter: React.Dispatch<React.SetStateAction<string>>, state:string | React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <div className='rounded-full mx-auto max-2xl:mt-4 w-5/6 lg:w-1/2 xl:w-1/2 2xl:w-1/3 max-lg:border max-lg:border-secondary flex items-center'>
        <button onClick={() => {setter('connect')}} className={`px-6 py-2  font-semibold lg:border-y lg:border-s ${state === 'connect' ? 'lg:border-white lg:text-white max-lg:bg-secondary max-lg:text-white' : 'lg:border-secondary text-secondary'} rounded-s-full w-1/2`}>Se connecter</button>
        <button onClick={() => {setter('register')}} className={`px-6 py-2  font-semibold lg:border-y lg:border-e ${state === 'register' ? 'lg:border-white lg:text-white max-lg:bg-secondary max-lg:text-white' : 'lg:border-secondary text-secondary'} rounded-e-full w-1/2`}>S&apos;inscrire</button>
    </div>
  )
}
