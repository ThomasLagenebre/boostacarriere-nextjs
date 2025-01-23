'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React from 'react'
import DashboardSection from '../../_components/DashboardSection'
import ImagesList from '../[id]/_components/ImagesList';
import GeneralModule from '../../_modulesForm/GeneralModule';
import ImgModule from '../../_modulesForm/ImgModule';
import PriceModule from '../../_modulesForm/PriceModule';
import WhatYouLearnModule from '../../_modulesForm/WhatYouLearnModule';
import ChaptersModule from '../../_modulesForm/ChaptersModule';



export default function page() {

  return (
    <div className='max-lg:px-4'>
        <DashboardSection>
            <SectionTitle title='TITRE : Négocie ton salaire efficacement' className='text-left'/>
        </DashboardSection>
        <form className='my-6'>
            <ImagesList />
            <GeneralModule />
            <ImgModule/>
            <PriceModule />
            <WhatYouLearnModule />
            <ChaptersModule />
        </form>
    </div>
        
  )
}
