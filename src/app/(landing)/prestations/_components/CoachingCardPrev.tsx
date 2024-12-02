import StarsRate from '@/app/_global_components/StarsRate'
import Image from 'next/image'
import React from 'react'
import RateStats from './RateStats'
import PriceView from '@/app/_global_components/PriceView'

export default function CoachingCardPrev({img, title, description, rate, reviews, price, promotion, slug}: {img: string, title: string, description: string, rate?: number, reviews? : string[], price: number, promotion: number, slug: string}) {
  return (
    <a href={`/prestations/${slug}`} className='hover:bg-light xl:p-4 xl:rounded-lg sm:flex items-start justify-between gap-5 max-sm:border max-sm:border-gray-200 dark:max-sm:border-gray-600 max-sm:rounded-lg'>
        <Image alt='image prev' src={img} width={800} height={800} className='max-sm:h-32 object-cover w-full sm:w-1/5 rounded-t-lg sm:rounded-md'/>
        <div className='sm:w-3/5 max-sm:mt-3 max-sm:px-4'>
            <h4 className='font-bold'>{title}</h4>
            <p className='text-sm'>{description?.slice(0, 150)} {description?.length > 150 && "..."}</p>
            {reviews && rate && <RateStats rate={rate} nbOfRates={reviews?.length} />}
        </div>
        <PriceView price={price} promotion={promotion} className='w-1/5'/>
    </a>
  )
}
