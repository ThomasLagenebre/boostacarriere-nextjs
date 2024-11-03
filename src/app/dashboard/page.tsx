import React from 'react'
import DashboardSection from './_components/DashboardSection';
import { Chart } from './_components/charts/Chart';
import SectionTitle from '../(landing)/prestations/_components/SectionTitle';
import ItemCard from './_components/ItemCard';

export default function page() {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className='lg:w-5/6 lg:py-6 px-4'>
      <DashboardSection className='mt-0'>
        <p className='font-bold'>Nous sommes le {today}</p>
      </DashboardSection>
      <DashboardSection>
        <SectionTitle title='Nombre de ventes réalisés'/>
        <Chart />
      </DashboardSection>
      <div className='grid lg:grid-cols-2 gap-6'>
        <DashboardSection>
          <SectionTitle title='Les prochains coachings'/>
          <ItemCard type='Appointment' appointment='Le vendredi 25 octobre 2024 à 18H30' img='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2Fboost-ton-salaire.png?alt=media&token=a93fe947-87cb-4df8-ae8e-b91fe8602d08' username="Axel Constance" link='/dashboard' />
        </DashboardSection>
        <DashboardSection>
          <SectionTitle title='Les derniers avis des coachings'/>
          <ItemCard type='Review' review="Merci pour ce coaching vraiment génial, Laurine est à l'écoute et très arrangeante dez" img='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78' link='/dashboard'/>
        </DashboardSection>
      </div>
      
      
    </div>
  )
}
