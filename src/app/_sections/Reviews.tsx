import React from 'react'
import SectionsHead from '../_components/SectionsHead'
import ReviewsSlider from '../_global_components/ReviewsSlider'
import SocialsStats from '../_components/SocialsStats'

export default function Reviews() {
  return (
    <section className='my-32 max-md:px-4'>
      <SectionsHead title='Ils ont aimé' description='Découvre le témoignage des clients qui ont participés à un coaching, suivi une formation ou acheter un ebook.'/>
      <ReviewsSlider />
      <SocialsStats />
    </section>
  )
}
