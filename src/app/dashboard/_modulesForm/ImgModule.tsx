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
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setUploading(true);
                // Upload to Firebase
                const downloadURL = await uploadToFirebase(file, 'coachings');
                
                // Create a synthetic event to pass to handleChange
                const syntheticEvent = {
                    target: {
                        name: 'picture',
                        value: downloadURL
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                
                // Call the parent's handleChange with the URL
                handleChange(syntheticEvent);
                
                // Update preview
                setImagePreview(downloadURL);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    // Fonction wrapper pour adapter le type
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement) {
            handleChange(e as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Image principale</h4>
            <Input 
                id='picture' 
                type='text' 
                value={imgURL} 
                placeholder="URL de l'image" 
                label="URL de l'image" 
                onChange={handleInputChange} 
                required
            />
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
                            <input id="img1" type="file" className="hidden" onChange={handleImageChange} accept=".svg, .png, .jpg, .jpeg, .gif" disabled={uploading} />
                        </label>
                    </div>
                    
                    {uploading && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500">Téléchargement en cours...</p>
                        </div>
                    )}
                    
                    {imagePreview && !uploading && (
                        <div className="mt-4">
                            <p className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>Aperçu </p>
                            <Image src={imagePreview} alt="Aperçu de l'image sélectionnée" className="w-full h-auto rounded-lg border-2 border-gray-300 object-cover max-w-[200px] max-h-[400px]" width={800} height={400} />
                        </div>
                    )}
                </div>
            </div>
        </DashboardSection>
    );
}
