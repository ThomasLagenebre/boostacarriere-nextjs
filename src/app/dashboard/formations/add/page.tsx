'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React from 'react'
import DashboardSection from '../../_components/DashboardSection'
import ImagesList from '../edit/_components/ImagesList';
import GeneralModule from '../edit/_modulesForm/GeneralModule';
import ImgModule from '../edit/_modulesForm/ImgModule';
import PriceModule from '../edit/_modulesForm/PriceModule';
import CurrentProblemsModule from '../edit/_modulesForm/CurrentProblemsModule';
import GainsModule from '../edit/_modulesForm/GainsModule';
import ContentModule from '../edit/_modulesForm/ContentModule';


export default function page() {

  return (
    <div className='max-lg:px-4'>
        <DashboardSection>
            <SectionTitle title='TITRE : Négocie ton salaire efficacement' className='text-left'/>
        </DashboardSection>
        <form className='my-6'>
            <ImagesList />
            <GeneralModule />
            <ImgModule />
            <PriceModule />
            <CurrentProblemsModule />
            <GainsModule />
            <ContentModule />
        </form>
    </div>
        
  )
}
