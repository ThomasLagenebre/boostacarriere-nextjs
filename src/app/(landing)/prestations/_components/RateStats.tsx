import StarsRate from '@/app/_global_components/StarsRate'
import React from 'react'

export default function RateStats({rate, nbOfRates}: {rate: number, nbOfRates: number}) {
    
  return (
    <div className='flex items-center gap-3 mt-6'>
        <StarsRate rate={rate}/>
        <p>{Number.isInteger(rate) ? rate + '.0' : rate}</p>
        <p>({nbOfRates} avis)</p>
    </div>
  )
}
