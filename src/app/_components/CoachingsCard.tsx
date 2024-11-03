import React from 'react'
import Button from '../_global_components/Button'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function CoachingsCard() {
  return (
    <div className='bg-white shadow-lg rounded-tr-lg px-4 pb-8 dark:bg-slate-800 dark:text-white'>
        <div className='flex items-center justify-between'>
            <p className='text-black text-xs uppercase font-bold dark:text-light'>Recherche d&apos;emploi</p>
            <Image alt="illustration recherche d'emploi" src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2Fboost-ton-cv.png?alt=media&token=116ef549-f11c-44be-83e1-fb9aae80b401" width={100} height={100}/>
        </div>
        <h3 className='font-semibold text-xl'>Obtiens le CV parfait</h3>
        <p className='text-sm mb-4'>Création d&apos;un CV personnalisé et réussi ton entretien grâce à des conseils avisés</p>
        <Button type='link' style='secondary' className='text-light font-bold flex items-center gap-5 hover:text-secondary'>Boost ton CV <FaArrowRight /></Button>
    </div>
  )
}