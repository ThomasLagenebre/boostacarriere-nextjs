import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title }: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Confirmer la suppression
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <FaTimes />
                    </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Êtes-vous sûr de vouloir supprimer &quot;{title}&quot; ? Cette action est irréversible.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
} 