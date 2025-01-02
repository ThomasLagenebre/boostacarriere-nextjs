import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React from 'react'
import DashboardSection from '../../../_components/DashboardSection'
import GeneralModule from '../_modulesForm/GeneralModule';
import ImgModule from '../_modulesForm/ImgModule';
import PriceModule from '../_modulesForm/PriceModule';
import CurrentProblemsModule from '../_modulesForm/CurrentProblemsModule';
import GainsModule from '../_modulesForm/GainsModule';
import ContentModule from '../_modulesForm/ContentModule';
import ImagesList from '../_components/ImagesList';
import { fetchCoachingById } from '@/app/_data/fetchCoachingById';
import { ICoaching } from '@/interface/ICoaching';

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
                {/* <PriceModule /> */}
                <CurrentProblemsModule currentProblems={currentCoaching.currentProblems}/>
                <GainsModule gains={currentCoaching.gains}/>
                <ContentModule />
            </form>
        </div>
    )}