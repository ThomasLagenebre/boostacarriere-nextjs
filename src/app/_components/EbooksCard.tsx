import Image from 'next/image'
import React from 'react'
import StarsRate from '../_global_components/StarsRate'

export default function EbooksCard() {
  return (
    <div className='sm:border-s border-gray-300 px-10 dark:text-light'>
        <Image alt='page de garde du ebook' src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2F30-jour-double-ton-salaire.png?alt=media&token=c102f07c-4267-45f3-a103-2d499853f1fb" width={200} height={200} className='mx-auto'/>
        <div className='flex flex-col gap-3'>
          <h3 className='mt-6'>Double ton salaire en 30 jours</h3>
          <StarsRate rate={3}/>
          <p className='font-bold text-lg'>Gratuit</p>
        </div>
    </div>
  )
}
