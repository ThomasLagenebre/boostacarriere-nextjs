import React from 'react'
import DashboardSection from '../../_components/DashboardSection'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import Button from '@/app/_global_components/Button'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import Input from '../[id]/_components/Input'
import Link from 'next/link'

export default function page() {
  return (
    <>
        <DashboardSection className='flex items-center justify-between'>
            <SectionTitle  title='Le planning de la formation'/>
            <Button className='text-white hover:text-secondary flex items-center gap-4' type='link' style='secondary' link='/dashboard/coachings/add-chapter'><FaLongArrowAltLeft />Retour vers le chapitre</Button>
        </DashboardSection>
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Gestion de la vidéo</h4>
            <div className='flex items-center gap-4'>
                <div className="flex items-center justify-center w-2/5">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Sélectionne</span> ou dépose ta vidéo</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Format MP4 uniquement</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".mp4"/>
                    </label>
                </div> 
                ou 
                <Input id='linkVideo' label='Lien de la vidéo' type='text'/>
            </div>
        </DashboardSection>
        <DashboardSection>
            <Input id='content-lesson' label='Contenu de la leçon' type='textarea'/>
        </DashboardSection>
    </>
    
  )
}
