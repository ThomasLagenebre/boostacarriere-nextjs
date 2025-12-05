import React from 'react'
import EditFormationClient from './_components/EditFormationClient'
import { fetchFormationById } from '@/app/_data/fetchFormationById';

export default async function EditFormationPage({ params }: { params: { id: number }}) {
  const formation = await fetchFormationById(params.id);
  
  if (!formation) {
    return <div>Formation not found</div>;
  }

  return <EditFormationClient initialFormation={formation} id={params.id} />;
} 