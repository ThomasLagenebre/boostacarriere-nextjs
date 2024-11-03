import Button from '@/app/_global_components/Button'
import React from 'react'
import Module from './_sections/Module'
import { useRouter } from 'next/router'

export default function page() {
  return (
    <main>
      <div className='md:fixed top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 px-4 md:w-3/4 mx-auto'>
        <Button type='link' link='/' style='secondary' className='text-white mt-6 mb-16 hover:text-secondary md:absolute md:-translate-y-20'> Retour sur le site</Button>
        <Module />
      </div>
    </main>
    
  )
}
