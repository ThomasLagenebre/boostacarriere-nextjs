import StarsRate from '@/app/_global_components/StarsRate'
import Image from 'next/image'
import React from 'react'
import RateStats from './RateStats'

export default function CoachingCardPrev() {
  return (
    <div className='sm:flex items-start justify-between gap-5 max-sm:border max-sm:border-gray-200 dark:max-sm:border-gray-600 max-sm:rounded-lg'>
        <Image alt='image prev' src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2Fnegocie-ton-salaire.jpg?alt=media&token=d1d25fdb-91de-485f-a238-54d5e71cc93d' width={800} height={800} className='max-sm:h-32 object-cover w-full sm:w-1/5 rounded-t-lg sm:rounded-md'/>
        <div className='sm:w-3/5 max-sm:mt-3 max-sm:px-4'>
            <h4 className='font-bold'>Réussi ton entretien d&apos;embauche</h4>
            <p className='text-sm'>Décroche ton poste de rêve ! Anticipe les questions, perfectionne ta prestance et gagne en confiance.</p>
            <RateStats rate={3} nbOfRates='220' />
        </div>
        <p className='sm:w-1/5 font-bold sm:text-center max-sm:p-4'>79.99€</p>
    </div>
  )
}
