import React from 'react'
import DashboardSection from '../_components/DashboardSection'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import Button from '@/app/_global_components/Button'

export default function page() {
  return (
        <DashboardSection className='w-full'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                <caption className='mb-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <SectionTitle title='Tous les coachings' className='text-left'/>
                        <Button type='link' link='/dashboard' style='secondary' className='text-white hover:text-secondary'>Ajouter un coaching</Button>
                    </div>
                    <p className='text-sm text-gray-500 text-left'>Gère ici l&apos;ensemble de tes coachings : crée, modifie, supprime ou consulte tous les coachings disponible sur le site</p>
                </caption>
                
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-8">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                             Nom du coaching
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4 flex items-center gap-4">
                            <a className='cursor-pointer'><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
                            <a className='cursor-pointer' href='/dashboard/coachings/edit'><FaRegEdit size={18} className='text-secondary'/></a>
                            <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            2
                        </th>
                        <td className="px-6 py-4">
                            White
                        </td>
                        <td className="px-6 py-4 flex items-center gap-4">
                            <a className='cursor-pointer'><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
                            <a className='cursor-pointer'><FaRegEdit size={18} className='text-secondary'/></a>
                            <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            3
                        </th>
                        <td className="px-6 py-4">
                            Black
                        </td>
                        <td className="px-6 py-4 flex items-center gap-4">
                            <a className='cursor-pointer'><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
                            <a className='cursor-pointer'><FaRegEdit size={18} className='text-secondary'/></a>
                            <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </DashboardSection>
  )
}
