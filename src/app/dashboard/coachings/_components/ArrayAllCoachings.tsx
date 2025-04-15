"use client"
import { fetchAllCoachings } from '@/app/_data/fetchAllCoachings';
import ArraySkeleton from '@/app/_global_components/ArraySkeleton';
import { ICoaching } from '@/interface/ICoaching';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';

function ArrayAllCoachings() {
    const [allCoachings, setAllCoachings] = useState([]); // État pour les coachings
    const [loading, setLoading] = useState(true);         // État pour le chargement

    useEffect(() => {
        const loadCoachings = async () => {
          try {
            setLoading(true);
            const data = await fetchAllCoachings(); // Appel de l'API
            setAllCoachings(data.data); // Mise à jour de l'état avec les données
          } catch (err) {
            console.error(err); // Log de l'erreur pour le debug
          } finally {
            setLoading(false);
          }
        };
    
        loadCoachings();
      }, []);


      if (loading) {
        return (
            <tr>
                <td colSpan={3}>
                    <ArraySkeleton />
                </td>
            </tr>
        );
    }
    
     
  return (
        allCoachings.map((coaching: ICoaching , idx: number) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {coaching.id}
                </th>
                <td className="px-6 py-4">
                    {coaching.title}
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                    <Link className='cursor-pointer' target='_blank' href={`/prestations/${coaching.slug}`}>
                        <MdOutlineRemoveRedEye size={22} className='text-green-500'/>
                    </Link>
                    <Link className='cursor-pointer' href={`/dashboard/coachings/edit/${coaching.id}`}>
                        <FaRegEdit size={18} className='text-secondary'/>
                    </Link>
                    <button className='cursor-pointer'>
                        <MdDeleteOutline size={22} className='text-red-400'/>
                    </button>
                </td>
            </tr>
            ))
    
  )
}

export default ArrayAllCoachings