"use client"
import { fetchAllCoachings } from '@/app/_data/fetchAllCoachings';
import { deleteCoaching } from '@/app/_data/deleteCoaching';
import Skeleton from '@/app/_global_components/Skeleton';
import DeleteModal from '@/app/_global_components/DeleteModal';
import { ICoaching } from '@/interface/ICoaching';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function ArrayAllCoachings() {
    const [allCoachings, setAllCoachings] = useState<ICoaching[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoaching, setSelectedCoaching] = useState<ICoaching | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadCoachings = async () => {
            try {
                setLoading(true);
                const data = await fetchAllCoachings();
                setAllCoachings(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCoachings();
    }, []);

    const handleDeleteClick = (coaching: ICoaching) => {
        setSelectedCoaching(coaching);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCoaching) return;

        try {
            await deleteCoaching(selectedCoaching.id);
            setAllCoachings(allCoachings.filter(coaching => coaching.id !== selectedCoaching.id));
            setIsModalOpen(false);
            setSelectedCoaching(null);
            toast.success('Le coaching a été supprimé avec succès', {
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
            console.error('Error deleting coaching:', error);
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
            <tr>
                <td colSpan={3}>
                    <Skeleton rows={1} columns={1} />
                </td>
            </tr>
        );
    }

    return (
        <>
            {allCoachings.map((coaching: ICoaching, idx: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {coaching.id}
                    </th>
                    <td className="px-6 py-4">
                        {coaching.title}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                        <Link className='cursor-pointer' target='_blank' href={`/prestations/coachings/${coaching.slug}`}>
                            <MdOutlineRemoveRedEye size={22} className='text-green-500'/>
                        </Link>
                        <Link className='cursor-pointer' href={`/dashboard/coachings/edit/${coaching.id}`}>
                            <FaRegEdit size={18} className='text-secondary'/>
                        </Link>
                        <button 
                            className='cursor-pointer'
                            onClick={() => handleDeleteClick(coaching)}
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
                    setSelectedCoaching(null);
                }}
                onConfirm={handleConfirmDelete}
                title={selectedCoaching?.title || ''}
            />
        </>
    );
}

export default ArrayAllCoachings;