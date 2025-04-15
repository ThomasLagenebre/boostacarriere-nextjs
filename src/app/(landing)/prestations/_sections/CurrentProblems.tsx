import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import ShadowSection from '../_components/ShadowSection'
import { CurrentProblem } from '@/interface/ICoaching'

export default function CurrentProblems({currentProblems}: {currentProblems: CurrentProblem[]}) {
  return (
    <ShadowSection>
        <SectionTitle title='As-tu déjà vécu ça ?'/>
        <ul className='list-disc ps-6'>
          {currentProblems.map((currentProblem, idx) => (
            <li key={idx}>{currentProblem.problem}</li>
          ))}
        </ul>
    </ShadowSection>
  )
}
