"use client";
import { fetchAllCoachings } from '@/app/_data/fetchAllCoachings';
import { fetchAllFormations } from '@/app/_data/fetchAllFormations';
import { ICoaching } from '@/interface/ICoaching';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';

function ArrayAllFormations() {
    const [allFormations, setAllFormations] = useState([]); // État pour les coachings
    const [loading, setLoading] = useState(true);         // État pour le chargement
    useEffect(() => {
        const loadFormations = async () => {
          try {
            setLoading(true);
            const data = await fetchAllFormations(); // Appel de l'API
            setAllFormations(data.data); // Mise à jour de l'état avec les données
          } catch (err) {
            console.error(err); // Log de l'erreur pour le debug
          } finally {
            setLoading(false);
          }
        };
    
        loadFormations();
      }, []);


      if (loading) {
        return <p>Chargement des formations...</p>;
      }
    
     
  return (
    <tbody>
        {allFormations.map((formation: ICoaching , idx: number) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {formation.id}
                </th>
                <td className="px-6 py-4">
                    {formation.title}
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                    <a className='cursor-pointer' target='_blank' href={`/prestations/${formation.slug}`}><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
                    <a className='cursor-pointer' href={`/dashboard/formations/edit/${formation.id}`}><FaRegEdit size={18} className='text-secondary'/></a>
                    <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
                </td>
            </tr>
            ))}
    </tbody>
    
  )
}

export default ArrayAllFormations