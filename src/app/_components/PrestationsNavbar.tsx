"use client";
import React, { useEffect, useState } from 'react'
import NavlinkDropdown from './NavlinkDropdown';
import { fetchAllCoachings } from '../_data/fetchAllCoachings';
import { ICoaching } from '@/interface/ICoaching';
import Link from 'next/link';

function PrestationsNavbar() {

    const [openCoachingDropdown, setOpenCoachingDropdown] = useState (false);
    const [openFormationsDropdown, setOpenFormationsDropdown] = useState (false);
      const [allCoachings, setAllCoachings] = useState([]); // État pour les coachings
      const [loading, setLoading] = useState(true);         // État pour le chargement
      const [error, setError] = useState(null);             // État pour les erreurs
    
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
        return <p>Chargement des coachings...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }

  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-72 ">
      <NavlinkDropdown onClick={() => setOpenCoachingDropdown(!openCoachingDropdown)} label='Coachings' className='ps-4'/>
          <div className={`z-10 ${!openCoachingDropdown && "hidden"} bg-white dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200">
              {allCoachings.map((coaching: ICoaching) => (
                <ItemLinkDropdown key={coaching.id} link={`/prestations/coachings/${coaching.slug}`} label={coaching.title} />
              ))}
            </ul>
          </div>
      <NavlinkDropdown onClick={() => setOpenFormationsDropdown(!openFormationsDropdown)} label='Formations' className='ps-4'/>
          <div className={`z-10 ${!openFormationsDropdown && "hidden"} bg-white divide-y divide-gray-100 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <ItemLinkDropdown link='/prestations/formations/negocie-ton-salaire-efficacement' label='Premier test'/>
              <ItemLinkDropdown link='/prestations/negocie-ton-salaire-efficacement' label='Premier test'/>
              <ItemLinkDropdown link='/prestations/negocie-ton-salaire-efficacement' label='Premier test'/>
            </ul>
          </div>
      </ul>
  )
}

export default PrestationsNavbar

const ItemLinkDropdown = ({link, className, label}: {link: string, className?: string, label:string}) => {
  return (
    <li>
      <Link 
        href={link} 
        className={`${className} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        {label}
      </Link>
    </li>
  )
}