import React from 'react'

export default function PriceView({promotion, price, className}: {promotion?: number|null|undefined, price: number, className?: string}) {
    const calculatePriceOfPromotion = (price: number,  promotion: number|null|undefined) => {
      if(promotion && promotion > 0){
        const promotionAmount = price / 100 * (promotion / 100);
        return (price / 100  - promotionAmount).toFixed(2)
      } 
      return (price/100).toFixed(2);
        
    };
  return (
    <>
        {promotion && promotion > 0 && price > 0 ? (
            <p className={`${className} font-bold text-lg flex items-center gap-5`}>{calculatePriceOfPromotion(price, promotion) + "€"} <span className='font-normal text-xs text-gray-400 line-through'>{(price / 100).toFixed(2)} €</span></p> )
            : 
            <p className={`${className} font-bold text-lg`}>{price !== 0 ? calculatePriceOfPromotion(price, promotion) + "€" : "Gratuit"}</p>
        }
    </>
    
  )
}
