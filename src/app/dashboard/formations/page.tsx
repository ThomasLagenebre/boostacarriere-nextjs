import React from 'react'
import DashboardSection from '../_components/DashboardSection'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import Button from '@/app/_global_components/Button'
import ArrayAllCoachings from '../coachings/_components/ArrayAllCoachings'

export default function page() {
    
  return (
        <DashboardSection className='w-full'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                <caption className='mb-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <SectionTitle title='Toutes les formations' className='text-left'/>
                        <Button type='link' link='/dashboard/coachings/add' style='secondary' className='text-white hover:text-secondary'>Ajouter un coaching</Button>
                    </div>
                    <p className='text-sm text-gray-500 text-left'>Gère ici l&apos;ensemble de tes formations : crée, modifie, supprime ou consulte toutes les formations disponible sur le site</p>
                </caption>
                
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-8">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                             Nom de la formation
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <ArrayAllCoachings />
            </table>
        </DashboardSection>
  )
}
