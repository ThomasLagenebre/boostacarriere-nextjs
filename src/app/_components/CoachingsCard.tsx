import React from 'react'
import Button from '../_global_components/Button'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function CoachingsCard({title, icon, category, description, slug }: {title: string, icon: string, category: string, description: string, slug: string}) {
  return (
    <div className='bg-white shadow-lg rounded-tr-lg px-4 pb-8 dark:bg-slate-800 dark:text-white'>
        <div className='flex items-center justify-between'>
            <p className='text-black text-xs uppercase font-bold dark:text-light'>{category}</p>
            <Image alt={`icône ${title}`} src={icon} width={100} height={100} className='h-28 p-2 object-cover'/>
        </div>
        <h3 className='font-semibold text-xl'>{title}</h3>
        <p className='text-sm mb-4'>{description.substring(0, 150)}{description.length > 150 && "..."}</p>
        <Button type='link' style='secondary' link={`prestations/coachings/${slug}`} className='font-bold flex items-center gap-5 hover:text-secondary w-fit'>Boost ton CV <FaArrowRight /></Button>
    </div>
  )
}