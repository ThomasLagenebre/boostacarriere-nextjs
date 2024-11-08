import Image from 'next/image'
import React from 'react'
import StarsRate from '../_global_components/StarsRate'

export default function EbooksCard({title, rate, price, img,promotion}: {title: string, rate: number, price: number, img: string, promotion: number}) {
  const calculatePriceOfPromotion = (price: number,  promotion: number) => {
      const promotionAmount = price / 100 * (promotion / 100);
      return (price / 100  - promotionAmount).toFixed(2)
  };
    
  return (
    <div className='sm:border-s border-gray-300 px-10 dark:text-light'>
        <Image alt={`couverture du ebook ${title}`} src={img} width={400} height={1000} className='mx-auto object-cover h-[280px]'/>
        <div className='flex flex-col gap-3 h-[150px]'>
          <h3 className='mt-6 h-1/2'>{title}</h3>
          {rate && <StarsRate rate={rate}/>}
          {promotion > 0 && price > 0 ? (
            <p className='font-bold text-lg flex items-center gap-5'>{calculatePriceOfPromotion(price, promotion) + "€"} <span className='font-normal text-xs text-gray-400 line-through'>{(price / 100).toFixed(2)} €</span></p> )
            : 
            <p className='font-bold text-lg'>{price !== 0 ? calculatePriceOfPromotion(price, promotion) + "€" : "Gratuit"}</p>
          }
          
        </div>
    </div>
  )
}