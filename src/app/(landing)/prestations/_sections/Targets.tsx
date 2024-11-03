import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'

export default function Targets() {
  return (
    <ShadowSection>
        <SectionTitle title="À qui s'adresse ce coaching ?"/>
        <ul className='list-disc ps-6 my-4'>
            <li>Tu n&apos;as jamais créer de CV </li>
            <li>Tu n&apos;arrives pas à avoir un CV reflétant parfaitement ton expérience </li>
        </ul>
    </ShadowSection>
  )
}
