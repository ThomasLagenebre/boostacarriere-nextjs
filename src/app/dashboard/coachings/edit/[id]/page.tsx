import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React from 'react'
import DashboardSection from '../../../_components/DashboardSection'

import { fetchCoachingById } from '@/app/_data/fetchCoachingById';
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule';
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule';
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule';
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule';
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule';
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule';

export default async function page({ params }: { params: { id: number }}) {
  const response = await fetchCoachingById(params.id);
  const currentCoaching = await response;
    
  console.log(currentCoaching);
  
    return (
        <div className='max-lg:px-4'>
            <DashboardSection>
                <SectionTitle title={`TITRE : ${currentCoaching.title}`} className='text-left'/>
            </DashboardSection>
            <form className='my-6'>
                {/* <ImagesList /> */}
                <GeneralModule title={currentCoaching.title} slogan={currentCoaching.slogan} shortDescription={currentCoaching.description} description={currentCoaching.description} slug={currentCoaching.slug}/>
                <ImgModule imgURL={currentCoaching.picture}/>
                <PriceModule price={currentCoaching.price} promotion={currentCoaching.promotion} promotionTime={20}/>
                <CurrentProblemsModule currentProblems={currentCoaching.currentProblems}/>
                <GainsModule gains={currentCoaching.gains}/>
                <ContentModule contents={currentCoaching.includes}/>
            </form>
        </div>
    )}