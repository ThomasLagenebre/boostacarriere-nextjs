'use client';

import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState, useCallback } from 'react'
import DashboardSection from '../../../../_components/DashboardSection'
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule';
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule';
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule';
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule';
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule';
import ChaptersModule from '@/app/dashboard/_modulesForm/ChaptersModule';
import { useRouter } from 'next/navigation';
import { updateFormation } from '@/app/_data/updateFormation';

interface Formation {
  id: number;
  title: string;
  slogan: string;
  picture: string;
  description: string;
  shortDescription: string;
  price: number;
  promotion: number;
  promotionTime: number;
  currentProblems: { problem: string }[];
  chapters: { 
    id?: number;
    title: string; 
    position: number;
    lessons: {
      id?: number;
      title: string;
      content: string;
      video: string;
      position: number;
    }[];
  }[];
  gains: { gain: string }[];
  includes: { title: string; description: string; icon?: string }[];
  product_category_id: number;
  is_active: boolean;
}

interface EditFormationClientProps {
  initialFormation: Formation;
  id: number;
}

export default function EditFormationClient({ initialFormation, id }: EditFormationClientProps) {
  const router = useRouter();
  
  // Initialisation plus sûre des chapitres
  const initializeChapters = () => {
    if (!initialFormation.chapters || !Array.isArray(initialFormation.chapters)) {
      return [];
    }
    
    return initialFormation.chapters.map((chapter, chapterIndex) => ({
      id: chapter.id,
      title: chapter.title || '',
      position: chapter.position || chapterIndex + 1,
      lessons: Array.isArray(chapter.lessons) ? chapter.lessons.map((lesson, lessonIndex) => ({
        id: lesson.id || undefined, // L'API ne retourne pas toujours l'id
        title: lesson.title || '',
        content: lesson.content || '',
        video: lesson.video || '',
        position: lesson.position || lessonIndex + 1 // Utiliser l'index si position n'existe pas
      })) : []
    }));
  };
  
  const [formation, setFormation] = useState<Formation>({
    ...initialFormation,
    chapters: initializeChapters()
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formation) return;

    try {
      const formattedData = {
        title: formation.title,
        slogan: formation.slogan,
        picture: formation.picture,
        description: formation.description,
        shortDescription: formation.shortDescription,
        price: Number(formation.price),
        promotion: formation.promotion,
        promotionTime: formation.promotionTime,
        currentProblems: formation.currentProblems.map(problem => problem.problem),
        gains: formation.gains,
        content: formation.includes.map(item => ({
          title: item.title,
          description: item.description
        })),
        chapters: formation.chapters.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          position: chapter.position,
          lessons: chapter.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            content: lesson.content,
            videoUrl: lesson.video,
            position: lesson.position
          }))
        }))
      };

      await updateFormation(id, formattedData);
      router.push('/dashboard/formations');
    } catch (error) {
      console.error('Error updating formation:', error);
    }
  }, [formation, id, router]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormation(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleSloganChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormation(prev => ({ ...prev, slogan: e.target.value }));
  }, []);

  const handleShortDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormation(prev => ({ ...prev, shortDescription: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormation(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handlePriceModuleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'price': 'price',
      'promotion': 'promotion',
      'promotionTime': 'promotionTime'
    };
    
    if (fieldMap[id]) {
      setFormation(prev => ({ ...prev, [fieldMap[id]]: Number(value) }));
    }
  }, []);

  const handleCurrentProblemsModuleChange = useCallback((problems: { problem: string }[]) => {
    setFormation(prev => ({ ...prev, currentProblems: problems }));
  }, []);

  const handleGainsModuleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const parsedGains = JSON.parse(e.target.value);
      setFormation(prev => ({ ...prev, gains: parsedGains }));
    } catch (error) {
      console.error('Error parsing gains:', error);
    }
  }, []);

  const handleContentModuleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }, []);

  const handleChaptersModuleChange = useCallback((chapters: { title: string; position: number; lessons: { title: string; content: string; video: string; position: number; }[] }[]) => {
    setFormation(prev => ({ ...prev, chapters }));
  }, []);

  const handleImgModuleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormation(prev => ({ ...prev, picture: e.target.value }));
  }, []);

  console.log(formation);
  

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title={`TITRE : ${formation.title}`} className='text-left'/>
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
        <button type="submit" className="mt-4 bg-secondary text-white px-4 py-2 rounded">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
} 