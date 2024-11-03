import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import ReviewsSlider from '@/app/_global_components/ReviewsSlider'
import ShadowSection from '../_components/ShadowSection'

export default function Reviews() {
  return (
    <ShadowSection>
        <SectionTitle title="Ce qu'ils ont pensé du coaching"/>
        <ReviewsSlider />
    </ShadowSection>
  )
}
