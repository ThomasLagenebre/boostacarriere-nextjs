import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React from 'react'
import Input from '../_components/Input'

export default function GeneralModule({title, slogan, shortDescription, description, slug}: {title?: string, slogan?: string, shortDescription?:string, description?: string, slug?:string}) {


  return (
        <DashboardSection>
                <h4 className='font-bold underline text-secondary'>Informations générales</h4>
                    <Input id='title' type='text' value={title} placeholder='Négocie ton salaire efficacement' label='Titre' indicationLabel='(max 120 caract.)' required/>
                    <Input id='slogan' type='textarea' rows={2} value={slogan} placeholder='Prends le contrôle de ta réumnération et atteins de nouveaux sommets financiers' label='Slogan' indicationLabel='max 255 caract.' required/>
                    <Input id='shortDescription' type='textarea' rows={3} placeholder="A ajouter dans la BDD" label='Description courte' indicationLabel='(max 300 caract.)' required/>
                    <Input id='description' value={description} type='textarea' rows={5} label='Description longue' required/>
                    <Input id='slug' type='text' value={slug} placeholder="negocie-ton-salaire-efficacement" label='Slug' indicationLabel='(uniquement des minuscules et des tirets ) - Optionnel' required />
            </DashboardSection>
  )
}
