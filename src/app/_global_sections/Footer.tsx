import Image from 'next/image'
import React from 'react'
import textSettings from '../_data/settings'

export default function Footer() {
  return (
    <footer className='bg-secondary py-4 px-4 xl:py-10 mt-6'>
        <div className='md:flex items-center gap-8 justify-center max-w-screen-xl mx-auto'>
            <Image alt='photo de profil Laurine' src={textSettings.footer.img} width={250} height={250} className='rounded-full w-32 h-32 md:w-40 md:h-40 object-cover max-xl:my-6'/>
            <div>
                <p className='font-bold text-white mb-2'>{textSettings.footer.title}</p>
                <p className='text-white'>{textSettings.footer.description}</p>
            </div>
            
        </div>
    </footer>
  )
}
