import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React from 'react'
import DashboardSection from '../../_components/DashboardSection'
import ImagesList from './_components/ImagesList';
import { fetchCoachingById } from '@/app/_data/fetchCoachingById';
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule';
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule';
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule';
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule';
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule';
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule';
import ChaptersModule from '@/app/dashboard/_modulesForm/ChaptersModule';
import { notFound } from 'next/navigation';
import FormationPageClient from './FormationPageClient';

interface FormationPageProps {
  params: { id: number };
}

export default async function FormationPage({ params }: FormationPageProps) {
  const response = await fetchCoachingById(params.id);
  const currentCoaching = await response;
    
  if (!currentCoaching) {
    return notFound();
  }
  
  return <FormationPageClient coaching={currentCoaching} />;
}