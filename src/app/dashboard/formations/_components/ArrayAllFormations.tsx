"use client";
import { fetchAllFormations } from '@/app/_data/fetchAllFormations';
import { deleteFormation } from '@/app/_data/deleteFormation';
import Skeleton from '@/app/_global_components/Skeleton';
import DeleteModal from '@/app/_global_components/DeleteModal';
import { ICoaching } from '@/interface/ICoaching';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import { toast } from 'react-toastify';

function ArrayAllFormations() {
    const [allFormations, setAllFormations] = useState<ICoaching[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFormation, setSelectedFormation] = useState<ICoaching | null>(null);

    useEffect(() => {
        const loadFormations = async () => {
            try {
                setLoading(true);
                const data = await fetchAllFormations();
                setAllFormations(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadFormations();
    }, []);

    const handleDeleteClick = (formation: ICoaching) => {
        setSelectedFormation(formation);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedFormation) return;

        try {
            await deleteFormation(selectedFormation.id);
            setAllFormations(allFormations.filter(formation => formation.id !== selectedFormation.id));
            setIsModalOpen(false);
            setSelectedFormation(null);
            toast.success('La formation a été supprimée avec succès', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Error deleting formation:', error);
            toast.error('Une erreur est survenue lors de la suppression', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    if (loading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={3}>
                        <Skeleton rows={1} columns={1} />
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {allFormations.map((formation: ICoaching, idx: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {formation.id}
                    </th>
                    <td className="px-6 py-4">
                        {formation.title}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                        <Link className='cursor-pointer' target='_blank' href={`/prestations/formations/${formation.id}`}>
                            <MdOutlineRemoveRedEye size={22} className='text-green-500'/>
                        </Link>
                        <Link className='cursor-pointer' href={`/dashboard/formations/edit/${formation.id}`}>
                            <FaRegEdit size={18} className='text-secondary'/>
                        </Link>
                        <button 
                            className='cursor-pointer'
                            onClick={() => handleDeleteClick(formation)}
                        >
                            <MdDeleteOutline size={22} className='text-red-400'/>
                        </button>
                    </td>
                </tr>
            ))}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedFormation(null);
                }}
                onConfirm={handleConfirmDelete}
                title={selectedFormation?.title || ''}
            />
        </tbody>
    );
}

export default ArrayAllFormations; 