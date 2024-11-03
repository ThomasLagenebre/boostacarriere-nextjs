import React from 'react'
import Button from '../_global_components/Button'

export default function Hero() {
  return (
    <section className='md:w-3/5 mx-auto mt-20 '>
        <h1 className='text-3xl md:text-5xl xl:text-6xl font-extrabold text-secondary text-center mb-4 dark:text-light'>Améliore ton train de vie en nourissant ton potentiel</h1>
        <p className='text-center text-gray-500 dark:text-light'>De la rédaction du CV à la demande de rupture conventionnelle, je t&apos;accompagne avec des <span className='text-secondary dark:text-primary'>stratégies efficaces</span> pour transformer ou développer <span className='text-secondary dark:text-primary'>ta carrière</span></p>
        <Button type='link' style='primary' className='mt-4 mx-auto block dark:hover:text-light'>Booster ma carrière</Button>
    </section>
  )
}
