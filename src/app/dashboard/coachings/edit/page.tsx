'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState } from 'react'
import DashboardSection from '../../_components/DashboardSection'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import GeneralModule from './_modulesForm/GeneralModule';
import ImgModule from './_modulesForm/ImgModule';
import PriceModule from './_modulesForm/PriceModule';
import CurrentProblemsModule from './_modulesForm/CurrentProblemsModule';
import GainsModule from './_modulesForm/GainsModule';

export default function page() {

  return (
    <div className='w-5/6'>
        <DashboardSection>
            <SectionTitle title='TITRE : Négocie ton salaire efficacement' className='text-left'/>
        </DashboardSection>
        <form className='my-6'>
            <GeneralModule />
            <ImgModule />
            <PriceModule />
            <CurrentProblemsModule />
            <GainsModule />
        </form>
    </div>
        
  )
}
