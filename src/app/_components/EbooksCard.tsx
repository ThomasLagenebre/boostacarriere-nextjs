import Image from 'next/image'
import React from 'react'
import StarsRate from '../_global_components/StarsRate'
import PriceView from '../_global_components/PriceView'

export default function EbooksCard({title, rate, price, img,promotion}: {title: string, rate: number, price: number, img: string, promotion: number}) {
  
    
  return (
    <div className='sm:border-s border-gray-300 px-10 dark:text-light'>
        <Image alt={`couverture du ebook ${title}`} src={img} width={400} height={1000} className='mx-auto object-cover h-[280px]'/>
        <div className='flex flex-col gap-3 h-[150px]'>
          <h3 className='mt-6 h-1/2'>{title}</h3>
          {rate && <StarsRate rate={rate}/>}
          <PriceView price={price} promotion={promotion} />
          
        </div>
    </div>
  )
}