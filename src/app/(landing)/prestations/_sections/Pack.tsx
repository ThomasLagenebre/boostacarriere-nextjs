import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import CoachingCardPrev from '../_components/CoachingCardPrev'
import { FaPlusCircle } from 'react-icons/fa'
import Button from '@/app/_global_components/Button'

export default function Pack() {
  return (
    <ShadowSection>
        <SectionTitle title='LE PACK: TROUVER UN EMPLOI EN 30 JOURS' className='text-center'/>
        <div className='my-6'>
            <CoachingCardPrev />
            <FaPlusCircle size={35} className='mx-auto my-4 text-secondary dark:text-primary'/>
            <CoachingCardPrev />
            <FaPlusCircle size={35} className='mx-auto my-4 text-secondary dark:text-primary'/>
            <CoachingCardPrev />
        </div>
        <div className='sm:flex items-end justify-between'>
            <div>
                <p className='text-red-400 line-through text-lg'>TOTAL: <span className='font-bold'>159.98€</span></p>
                <p className='text-lg'>TOTAL: <span className='font-bold'>129.99€</span></p>
            </div>
            <Button type='button' style='secondary' className='text-white hover:text-secondary w-52 dark:bg-primary dark:text-secondary dark:hover:border-primary dark:hover:text-primary max-sm:my-3'>Je veux le pack</Button>
            
        </div>
        
    </ShadowSection>
  )
}
