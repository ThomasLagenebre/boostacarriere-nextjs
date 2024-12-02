import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import ShadowSection from '../_components/ShadowSection'
import { Gain } from '@/interface/ICoaching'

export default function Gains({gains}: {gains: Gain[]}) {
  return (
    <ShadowSection>
        <SectionTitle title="Que vais-je t'apporter ?"/>
        <ul className='my-4'>
          {gains?.map((gain, idx) => (
            <li key={idx} className='flex items-center my-2'>
                <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                {gain.gain.includes(':') ? 
                <p><span className='font-bold'>{gain.gain.split(':')[0]} : </span>{gain.gain.split(':')[1]}</p> 
                : 
                <p>{gain.gain}</p>
                }
                
            </li>
          ))}
            
        </ul>
    </ShadowSection>
  )
}
