import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import CoachingCardPrev from '../_components/CoachingCardPrev'

export default function Suggestions() {
  return (
    <ShadowSection>
        <SectionTitle title='Les coachings complémentaires'/>
        <div className='my-4 flex flex-col gap-4'>
          <CoachingCardPrev />
          <CoachingCardPrev />
          <CoachingCardPrev />
        </div>
        
    </ShadowSection>
  )
}
