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

export default function page({ params }: { params: { id: number } }) {

  const { id } = params;
  try {
    const currentProduct = fetchCoachingById(id);
    console.log(currentProduct);
    
    return (
        <div className='max-lg:px-4'>
            <DashboardSection>
                <SectionTitle title={`TITRE : Négocie ton salaire efficacement ${currentProduct}`} className='text-left'/>
            </DashboardSection>
            <form className='my-6'>
                <ImagesList />
                <GeneralModule />
                <ImgModule />
                {/* <PriceModule /> */}
                <CurrentProblemsModule />
                <GainsModule />
                <ContentModule />
            </form>
        </div>
    );
  } catch {
    console.log("Lol");
    
  }
}