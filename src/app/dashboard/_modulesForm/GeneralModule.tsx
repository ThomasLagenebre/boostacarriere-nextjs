'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React from 'react'
import Input from '../_components/Input'

interface GeneralModuleProps {
  title?: string;
  slogan?: string;
  shortDescription?: string;
  description?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function GeneralModule({title, slogan, shortDescription, description, handleChange}: GeneralModuleProps) {
  return (
    <DashboardSection>
      <h4 className='font-bold underline text-secondary'>Informations générales</h4>
      <Input 
        id='title' 
        type='text' 
        value={title} 
        placeholder='Négocie ton salaire efficacement' 
        label='Titre' 
        indicationLabel='(max 120 caract.)' 
        onChange={handleChange}
        required
      />
      <Input 
        id='slogan' 
        type='textarea' 
        rows={2} 
        value={slogan} 
        placeholder='Prends le contrôle de ta réumnération et atteins de nouveaux sommets financiers' 
        label='Slogan' 
        indicationLabel='max 255 caract.' 
        onChange={handleChange}
        required
      />
      <Input 
        id='shortDescription' 
        type='textarea'
        value={shortDescription}  
        rows={3} 
        placeholder="A ajouter dans la BDD" 
        label='Description courte' 
        indicationLabel='(max 300 caract.)' 
        onChange={handleChange}
        required
      />
      <Input 
        id='description' 
        value={description} 
        type='textarea' 
        rows={5} 
        label='Description longue' 
        onChange={handleChange}
        required
      />
    </DashboardSection>
  )
}
