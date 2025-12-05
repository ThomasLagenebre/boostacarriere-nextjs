"use client";
import { fetchAllEbooks } from '@/app/_data/fetchAllEbooks';
import { deleteEbook } from '@/app/_data/deleteEbook';
import Skeleton from '@/app/_global_components/Skeleton';
import DeleteModal from '@/app/_global_components/DeleteModal';
import { ICoaching } from '@/interface/ICoaching';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import { toast } from 'react-toastify';

function ArrayAllEbooks() {
    const [allEbooks, setAllEbooks] = useState<ICoaching[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEbook, setSelectedEbook] = useState<ICoaching | null>(null);

    useEffect(() => {
        const loadEbooks = async () => {
            try {
                setLoading(true);
                const data = await fetchAllEbooks();
                setAllEbooks(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadEbooks();
    }, []);

    const handleDeleteClick = (ebook: ICoaching) => {
        setSelectedEbook(ebook);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedEbook) return;

        try {
            await deleteEbook(selectedEbook.id);
            setAllEbooks(allEbooks.filter(ebook => ebook.id !== selectedEbook.id));
            setIsModalOpen(false);
            setSelectedEbook(null);
            toast.success('L\'ebook a été supprimé avec succès', {
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
            console.error('Error deleting ebook:', error);
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
            {allEbooks.map((ebook: ICoaching, idx: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ebook.id}
                    </th>
                    <td className="px-6 py-4">
                        {ebook.title}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                        <Link className='cursor-pointer' target='_blank' href={`/prestations/ebooks/${ebook.id}`}>
                            <MdOutlineRemoveRedEye size={22} className='text-green-500'/>
                        </Link>
                        <Link className='cursor-pointer' href={`/dashboard/ebooks/edit/${ebook.id}`}>
                            <FaRegEdit size={18} className='text-secondary'/>
                        </Link>
                        <button 
                            className='cursor-pointer'
                            onClick={() => handleDeleteClick(ebook)}
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
                    setSelectedEbook(null);
                }}
                onConfirm={handleConfirmDelete}
                title={selectedEbook?.title || ''}
            />
        </tbody>
    );
}

export default ArrayAllEbooks; 