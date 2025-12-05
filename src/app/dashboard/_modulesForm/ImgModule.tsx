'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection';
import Image from 'next/image';
import React, { useState } from 'react';
import Input from '../_components/Input';
import { uploadToFirebase } from '@/lib/uploadToFirebase';

interface ImgModuleProps {
    imgURL?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

export default function ImgModule({imgURL, handleChange}: ImgModuleProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(imgURL || null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = await uploadToFirebase(file, 'formations');
            setImagePreview(imageUrl);
            handleChange({ target: { value: imageUrl } } as React.ChangeEvent<HTMLInputElement>);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary'>Image</h4>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    URL de l&apos;image
                </label>
                <input
                    type="text"
                    id="picture"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="URL de l&apos;image"
                    value={imgURL}
                    onChange={handleChange}
                />
            </div>
            {/* <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ou télécharger une image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleImageChange}
                />
            </div>
            {imagePreview && (
                <div className="mt-4">
                    <Image
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg"
                    />
                </div>
            )} */}
        </DashboardSection>
    );
}
