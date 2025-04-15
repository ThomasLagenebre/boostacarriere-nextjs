import Image from 'next/image'
import React from 'react'

export default function ReviewContener({profilePicture, username, job, review}: {profilePicture:string, username: string, job:string, review: string}) {
  return (
    <>
        <div className='flex items-center gap-6 '>
            <Image alt='photo de profil' src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' width={50} height={50} className='rounded-full bg-light p-2'/>
            <div>
                <p className='font-bold'>{username}</p>
                <p>{job}</p>
            </div>
        </div>
        <p className='mt-8 md:w-3/4'>{review}</p>
    </>
  )
}
