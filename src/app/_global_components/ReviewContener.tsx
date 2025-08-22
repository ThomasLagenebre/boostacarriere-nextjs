import Image from 'next/image'
import React from 'react'

export default function ReviewContener({profilePicture, username, job, review, productName}: {profilePicture:string, username: string, job:string, review: string, productName: string}) {
  return (
    <>
        <div className='flex items-center gap-6 '>
              <div className='w-10 h-10 rounded-full bg-light p-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-secondary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
            <div>
                <p className='font-bold'>{username}</p>
                <p>{job}</p>
            </div>
        </div>
        <p className='mt-8 md:w-3/4 text-justify'>{review}</p>
        <p className='mt-8 text-gray-500 dark:text-gray-400 italic text-xs'>Avis laissé sur {productName}</p>
    </>
  )
}
