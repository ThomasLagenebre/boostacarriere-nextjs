import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React from 'react'
import Input from '../_components/Input'

export default function GeneralModule() {
  return (
        <DashboardSection>
                <h4 className='font-bold underline text-secondary'>Informations générales</h4>
                    <Input id='title' type='text' placeholder='Négocie ton salaire efficacement' label='Titre' indicationLabel='(max 120 caract.)' required/>
                    <Input id='slogan' type='text' placeholder='Prends le contrôle de ta réumnération et atteins de nouveaux sommets financiers' label='Slogan' indicationLabel='max 255 caract.' required/>
                    <Input id='shortDescription' type='textarea' rows={3} placeholder="Valorise ta valeur ! Booste ton salaire. Apprends à négocier avec confiance, détermine tes prétentions salariales, met en avant ta plus-value pour l'entreprise et atteins tes objectifs." label='Description courte' indicationLabel='(max 300 caract.)' required/>
                    <Input id='description' type='textarea' rows={5} label='Description longue' required/>
                    <Input id='slug' type='text' placeholder="negocie-ton-salaire-efficacement" label='Slug' indicationLabel='(uniquement des minuscules et des tirets ) - Optionnel' required />
            </DashboardSection>
  )
}
