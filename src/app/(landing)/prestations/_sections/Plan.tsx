import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import Accordion from '../_components/Accordion'
import ShadowSection from '../_components/ShadowSection'

interface Chapter {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
    duration: number;
  }[];
}

interface PlanProps {
  chapters?: Chapter[];
}

export default function Plan({ chapters = [] }: PlanProps) {
  return (
    <ShadowSection>
        <SectionTitle title="Plan de la formation"/>
        <Accordion chapters={chapters} />
    </ShadowSection>
  )
}
 