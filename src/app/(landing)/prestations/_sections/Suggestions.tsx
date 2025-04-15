import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import CoachingCardPrev from '../_components/CoachingCardPrev'
import { ICoaching } from '@/interface/ICoaching'

export default function Suggestions({suggestions}: {suggestions: ICoaching[]}) {
  return (
    <ShadowSection>
        <SectionTitle title='Les coachings complémentaires'/>
        <div className='my-4 flex flex-col gap-4'>
          {suggestions.map((suggestion, idx) => (
            <CoachingCardPrev key={idx} title={suggestion.title} img={suggestion.picture} description={suggestion.description} rate={suggestion.rate} reviews={suggestion.reviews} price={parseInt(suggestion.price)} promotion={suggestion.promotion} slug={suggestion.slug}/>
          ))}
        </div>
        
    </ShadowSection>
  )
}