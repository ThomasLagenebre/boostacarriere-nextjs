import React from 'react'
import DashboardSection from '../_components/DashboardSection'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import Button from '@/app/_global_components/Button'
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'

function ChaptersModule() {
  return (
    <DashboardSection>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                        <caption className='mb-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <SectionTitle title='Tous les chapitres' className='text-left'/>
                                <Button type='link' link='/dashboard/formations/add-chapter' style='secondary' className='text-white hover:text-secondary'>Ajouter un chapitre</Button>
                            </div>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-8">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                     Nom du chapitre
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    2
                                </th>
                                <td className="px-6 py-4">
                                    Comment se lancer
                                </td>
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <a className='cursor-pointer' target='_blank' href={`/prestations/`}><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
                                    <a className='cursor-pointer' href={`/dashboard/formations/add-chapter`}><FaRegEdit size={18} className='text-secondary'/></a>
                                    <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
    </DashboardSection>
  )
}

export default ChaptersModule