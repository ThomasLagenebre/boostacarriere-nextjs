"use client";
import React, { useEffect, useState } from 'react'
import NavlinkDropdown from './NavlinkDropdown';
import { fetchAllCoachings } from '../_data/fetchAllCoachings';
import { fetchAllFormations } from '../_data/fetchAllFormations';
import { fetchAllEbooks } from '../_data/fetchAllEbooks';
import { ICoaching } from '@/interface/ICoaching';
import Link from 'next/link';

interface PrestationsNavbarProps {
  onClose?: () => void; // Fonction pour fermer la navbar
}

function PrestationsNavbar({ onClose }: PrestationsNavbarProps) {
    const [openCoachingDropdown, setOpenCoachingDropdown] = useState(false);
    const [openFormationsDropdown, setOpenFormationsDropdown] = useState(false);
    const [openEbooksDropdown, setOpenEbooksDropdown] = useState(false);
    const [allCoachings, setAllCoachings] = useState<ICoaching[]>([]);
    const [allFormations, setAllFormations] = useState<ICoaching[]>([]);
    const [allEbooks, setAllEbooks] = useState<ICoaching[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [coachingsData, formationsData, ebooksData] = await Promise.all([
                    fetchAllCoachings(),
                    fetchAllFormations(),
                    fetchAllEbooks()
                ]);
                setAllCoachings(coachingsData.data);
                setAllFormations(formationsData.data);
                setAllEbooks(ebooksData.data);
            } catch (err) {
                console.error(err);
                setError('Erreur lors du chargement des données');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Fonction pour fermer tous les dropdowns et la navbar
    const handleLinkClick = () => {
        setOpenCoachingDropdown(false);
        setOpenFormationsDropdown(false);
        setOpenEbooksDropdown(false);
        if (onClose) {
            onClose();
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-72">
            <NavlinkDropdown 
                onClick={() => setOpenCoachingDropdown(!openCoachingDropdown)} 
                label='Coachings' 
                className='ps-4'
            />
            <div className={`z-10 ${!openCoachingDropdown && "hidden"} bg-white dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200">
                    {allCoachings.map((coaching: ICoaching) => (
                        <ItemLinkDropdown 
                            key={coaching.id} 
                            link={`/prestations/coachings/${coaching.slug}`} 
                            label={coaching.title} 
                            onClick={handleLinkClick}
                        />
                    ))}
                </ul>
            </div>
            <NavlinkDropdown 
                onClick={() => setOpenFormationsDropdown(!openFormationsDropdown)} 
                label='Formations' 
                className='ps-4'
            />
            <div className={`z-10 ${!openFormationsDropdown && "hidden"} bg-white divide-y divide-gray-100 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {allFormations.map((formation: ICoaching) => (
                        <ItemLinkDropdown 
                            key={formation.id} 
                            link={`/prestations/formations/${formation.id}`} 
                            label={formation.title} 
                            onClick={handleLinkClick}
                        />
                    ))}
                </ul>
            </div>
            <NavlinkDropdown 
                onClick={() => setOpenEbooksDropdown(!openEbooksDropdown)} 
                label='Ebooks' 
                className='ps-4'
            />
            <div className={`z-10 ${!openEbooksDropdown && "hidden"} bg-white divide-y divide-gray-100 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {allEbooks.map((ebook: ICoaching) => (
                        <ItemLinkDropdown 
                            key={ebook.id} 
                            link={`/prestations/ebooks/${ebook.id}`} 
                            label={ebook.title} 
                            onClick={handleLinkClick}
                        />
                    ))}
                </ul>
            </div>
        </ul>
    );
}

export default PrestationsNavbar;

const ItemLinkDropdown = ({link, className, label, onClick}: {link: string, className?: string, label: string, onClick?: () => void}) => {
    return (
        <li>
            <Link 
                href={link} 
                className={`${className} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                onClick={onClick}
            >
                {label}
            </Link>
        </li>
  );
}