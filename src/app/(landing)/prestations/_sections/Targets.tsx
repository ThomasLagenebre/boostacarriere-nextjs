import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'

export default function Targets({targets}: {targets: string[]}) {
  return (
    <ShadowSection>
        <SectionTitle title="À qui s'adresse ce coaching ?"/>
        <ul className='list-disc ps-6 my-4'>
          {targets?.map((target, idx) => (
            <li key={idx}>{target}</li>
          ))}
        </ul>
    </ShadowSection>
  )
}
