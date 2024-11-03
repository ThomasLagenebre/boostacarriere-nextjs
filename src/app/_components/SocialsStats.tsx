import React from 'react'

export default function SocialsStats() {
  return (
    <div  className='md:flex items-center justify-around mt-10 w-3/4 mx-auto'>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>5K</span><br/>
            <span className='font-light'>Abonnés sur instagram</span></p>
        </div>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>10K</span><br/>
            <span className='font-light'>Abonnés sur Tiktok</span></p>
        </div>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>2.5M</span><br/>
            <span className='font-light'>de vues sur les plateformes</span></p>
        </div>
    </div>
  )
}
