import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import ShadowSection from '../_components/ShadowSection'

export default function CurrentProblems() {
  return (
    <ShadowSection>
        <SectionTitle title='As-tu déjà vécu ça ?'/>
        <ul className='list-disc ps-6'>
            <li>Tu as envoyé de nombreux CV, mais tu n&apos;as pas encore décroché l&apos;entretien d&apos;embauche tant espéré ?</li>
            <li>L&apos;idée de devoir créer un CV te semble compliqué et tu ne sais pas par où commencer ?</li>
            <li>Lorsque tu obtiens un entretien, tu te sens stressé(e) et peu préparé(e) pour convaincre le recruteur que tu es le/la candidat(e) idéal(e) ?</li>
        </ul>
    </ShadowSection>
  )
}
