import Image from 'next/image'
import React from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

export default function ItemCard({type, appointment, review, username, link, img}: {type: 'Appointment' | 'Review', appointment?: string, review?:string, username?: string, link: string, img: string}) {
  return (
    <div className='flex items-center gap-4 justify-between border border-secondary rounded-md px-4 my-3 py-2'>
        <Image src={img} alt='Logo' width={300} height={300} className={`w-1/6 ${type === 'Review' && 'rounded-full w-12 h-12 object-cover'}`}/>
        <p className={`w-4/6 ${type === 'Appointment' && 'font-semibold'}`}>{type === 'Appointment' && appointment + ' avec ' + username}{type === "Review" && '« ' + review?.substring(0, 100)}{review && review.length > 100 && ' ...'}{type === "Review" && ' »'}</p>
        <a href={link} className='w-1/6'><MdOutlineRemoveRedEye className='cursor-pointer mx-auto' size={20}/></a>
    </div>
  )
}

