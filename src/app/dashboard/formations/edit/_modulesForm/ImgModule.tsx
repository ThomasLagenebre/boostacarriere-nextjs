'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ImgModule() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imagePreview2, setImagePreview2] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview2(URL.createObjectURL(file));
        }
    };

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Gestion des images</h4>
            <div className='grid grid-cols-2 gap-10'>
                {/* Image principale */}
                <div>
                    <p className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Image principale</p>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="img1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Sélectionne</span> ou dépose ton image</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="img1" type="file" className="hidden" onChange={handleImageChange} accept=".svg, .png, .jpg, .jpeg, .gif" />
                        </label>
                    </div>
                    
                    {imagePreview && (
                        <div className="mt-4">
                            <p className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Aperçu </p>
                            <Image src={imagePreview} alt="Aperçu de l'image sélectionnée" className="w-full h-auto rounded-lg border-2 border-gray-300 object-cover max-w-[200px] max-h-[400px]" width={800} height={400} />
                        </div>
                    )}
                </div>

                {/* Deuxième image */}
                <div>
                    <p className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Image secondaire</p>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="img2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Sélectionne</span> ou dépose ton image</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou ICO (MAX. 800x400px)</p>
                            </div>
                            <input id="img2" type="file" className="hidden" onChange={handleImageChange2} accept=".svg, .png, .jpg, .jpeg, .ico" />
                        </label>
                    </div>
                    
                    {imagePreview2 && (
                        <div className="mt-4">
                            <p className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Aperçu </p>
                            <Image src={imagePreview2} alt="Aperçu de l'image sélectionnée" className="w-full h-auto rounded-lg border-2 border-gray-300 object-cover max-w-[200px] max-h-[400px]" width={800} height={400} />
                        </div>
                    )}
                </div>
            </div>
        </DashboardSection>
    );
}
