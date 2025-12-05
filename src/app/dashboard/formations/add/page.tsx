'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState, useCallback } from 'react'
import DashboardSection from '../../_components/DashboardSection'
import ImgModule from '../../_modulesForm/ImgModule';
import PriceModule from '../../_modulesForm/PriceModule';
import CurrentProblemsModule from '../../_modulesForm/CurrentProblemsModule';
import GainsModule from '../../_modulesForm/GainsModule';
import ContentModule from '../../_modulesForm/ContentModule';
import ChaptersModule from '../../_modulesForm/ChaptersModule';
import { createFormation } from '@/app/_data/createFormation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Formation {
  title: string;
  slogan: string;
  picture: string;
  description: string;
  shortDescription: string;
  price: number;
  promotion: number;
  promotionTime: number;
  currentProblems: { problem: string }[];
  chapters: { title: string; position: number; lessons: { title: string; position: number; content: string; video: string }[] }[];
  gains: { gain: string }[];
  includes: { title: string; description: string; icon?: string }[];
  product_category_id: number;
  is_active: boolean;
}

export default function AddFormationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formation, setFormation] = useState<Formation>({
        title: '',
        slogan: '',
        picture: '',
        description: '',
        shortDescription: '',
        price: 0,
        promotion: 0,
        promotionTime: 0,
        currentProblems: [],
        chapters: [],
        gains: [],
        includes: [],
        product_category_id: 3,
        is_active: true
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormation(prev => ({ ...prev, title: e.target.value }));
    };

    const handleSloganChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormation(prev => ({ ...prev, slogan: e.target.value }));
    };

    const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormation(prev => ({ ...prev, shortDescription: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormation(prev => ({ ...prev, description: e.target.value }));
    };

    const handlePriceModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const fieldMap: { [key: string]: string } = {
            'price': 'price',
            'promotion': 'promotion',
            'promotionTime': 'promotionTime'
        };
        
        if (fieldMap[id]) {
            setFormation(prev => ({ ...prev, [fieldMap[id]]: Number(value) }));
        }
    };

    const handleCurrentProblemsModuleChange = (problems: { problem: string }[]) => {
        setFormation(prev => ({ ...prev, currentProblems: problems }));
    };

    const handleGainsModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            const parsedGains = JSON.parse(e.target.value);
            setFormation(prev => ({ ...prev, gains: parsedGains }));
        } catch (error) {
            console.error('Error parsing gains:', error);
        }
    };

    const handleContentModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            const parsedContent = JSON.parse(e.target.value);
            setFormation(prev => ({ 
                ...prev, 
                includes: parsedContent.map((item: { title: string; description: string }) => ({
                    title: item.title,
                    description: item.description,
                    icon: "icon"
                }))
            }));
        } catch (error) {
            console.error('Error parsing content:', error);
        }
    };

    const handleChaptersModuleChange = useCallback((chapters: { title: string; position: number; lessons: { title: string; position: number; content: string; video: string }[] }[]) => {
        setFormation(prev => ({ ...prev, chapters }));
    }, []);

    const handleImgModuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormation(prev => ({ ...prev, picture: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formattedData = {
                title: formation.title,
                slogan: formation.slogan,
                picture: formation.picture,
                description: formation.description,
                short_description: formation.shortDescription,
                price: Number(formation.price),
                promotion: formation.promotion,
                promotion_time: formation.promotionTime,
                currentProblems: formation.currentProblems,
                gains: formation.gains,
                content: formation.includes.map(item => ({
                    title: item.title,
                    description: item.description,
                    icon: item.icon || "icon"
                })),
                chapters: formation.chapters,
                product_category_id: formation.product_category_id,
                is_active: formation.is_active
            };

            await createFormation(formattedData as unknown as FormData);
            toast.success('Formation créée avec succès');
            router.push('/dashboard/formations');
        } catch (error) {
            console.error('Error creating formation:', error);
            toast.error('Une erreur est survenue lors de la création de la formation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-lg:px-4'>
            <DashboardSection>
                <SectionTitle title='Ajouter une formation' className='text-left'/>
            </DashboardSection>
            <form className='my-6' onSubmit={handleSubmit}>
                <DashboardSection>
                    <h4 className='font-bold underline text-secondary'>Informations générales</h4>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Titre
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Titre de la formation"
                            required
                            value={formation.title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Slogan
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Slogan de la formation"
                            required
                            value={formation.slogan}
                            onChange={handleSloganChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description courte
                        </label>
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description courte de la formation"
                            required
                            value={formation.shortDescription}
                            onChange={handleShortDescriptionChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description de la formation"
                            required
                            value={formation.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </DashboardSection>
                <ImgModule 
                    imgURL={formation.picture}
                    handleChange={handleImgModuleChange}
                />
                <PriceModule 
                    price={formation.price} 
                    promotion={formation.promotion} 
                    promotionTime={formation.promotionTime}
                    handlePriceChange={handlePriceModuleChange}
                    handlePromotionChange={handlePriceModuleChange}
                    handlePromotionTimeChange={handlePriceModuleChange}
                />
                <CurrentProblemsModule 
                    currentProblems={formation.currentProblems}
                    handleChange={handleCurrentProblemsModuleChange}
                />
                <GainsModule 
                    gains={formation.gains}
                    handleChange={handleGainsModuleChange}
                />
                <ContentModule 
                    contents={formation.includes}
                    handleChange={handleContentModuleChange}
                />
                <ChaptersModule 
                    chapters={formation.chapters}
                    handleChange={handleChaptersModuleChange}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-4 bg-secondary text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Création en cours...' : 'Créer la formation'}
                </button>
            </form>
        </div>
    );
}
