import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState } from 'react'
import DashboardSection from '../../_components/DashboardSection'
import GeneralModule from '../../_modulesForm/GeneralModule';
import ImgModule from '../../_modulesForm/ImgModule';
import PriceModule from '../../_modulesForm/PriceModule';
import CurrentProblemsModule from '../../_modulesForm/CurrentProblemsModule';
import GainsModule from '../../_modulesForm/GainsModule';
import ContentModule from '../../_modulesForm/ContentModule';
import CoachingForm from '../_components/CoachingForm';



export default function Page() {


  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title='Nouveau coaching' className='text-left' />
      </DashboardSection>
      <CoachingForm />
    </div>
  );
}

