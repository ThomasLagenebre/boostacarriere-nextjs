import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

export default function Coach({coach}: {coach?: {name: string, description: string, nbOfCoachings: number} }) {
  return (
    <ShadowSection background='bg-primary'>
        <SectionTitle title='Ta coach' />
        <div className='flex items-center gap-10 my-6'>
            <Image alt='Laurine' src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78' width={200} height={200} className='rounded-full w-20 h-20 object-cover'/>
            <div>
                <h4 className='text-lg font-bold'>{coach?.name}</h4>
                <p>{coach?.description}</p>
                <div className='flex items-center gap-3 mt-4 text-gray-600 dark:text-gray-300'>
                    <FaUser />
                    <p>{coach?.nbOfCoachings} coachings</p>
                </div>

            </div>
        </div>
    </ShadowSection>
  )
}
