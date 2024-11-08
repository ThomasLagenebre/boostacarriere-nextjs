import React from 'react'
import CoachingsCard from '../_components/CoachingsCard'
import allCoachings from '../_data/allCoachings'

export default function Coachings() {
  return (
    <section className='grid grid-cols-1 gap-10 my-32 lg:grid-cols-2 xl:grid-cols-3 max-xl:px-4'>
      {allCoachings.map((coaching) => (
        <CoachingsCard key={coaching.id} title={coaching.title} icon={coaching.picture} category={coaching.category.name} description={coaching.description} />
      ))}
    </section>
  )
}
