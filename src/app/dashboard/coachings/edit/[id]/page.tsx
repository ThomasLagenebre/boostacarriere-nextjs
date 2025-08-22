'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState } from 'react'
import DashboardSection from '../../../_components/DashboardSection'
import { fetchCoachingById } from '@/app/_data/fetchCoachingById';
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule';
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule';
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule';
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule';
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule';
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { updateCoaching } from '@/app/_data/updateCoaching';
import { notFound } from 'next/navigation';

interface ProblemObject {
  id: number;
  problem: string;
}

interface Coaching {
  id: number;
  title: string;
  slogan: string;
  picture: string;
  summary: string | null;
  description: string;
  shortDescription: string;
  rate: number | null;
  price: number;
  isActive: boolean;
  slug: string;
  promotion: number;
  category: {
    id: number;
    name: string;
  };
  currentProblems: ProblemObject[];
  gains: any[];
  includes: any[];
  numberOfReviews: number;
  reviews: any[];
}

export default function EditCoachingPage({ params }: { params: { id: number }}) {
  const router = useRouter();
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(coaching);

  React.useEffect(() => {
    const loadCoaching = async () => {
      try {
        const coaching = await fetchCoachingById(params.id);
        
        if (!coaching) {
          return notFound();
        }
        setCoaching(coaching);
      } catch (error) {
        console.error('Error loading coaching:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCoaching();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coaching) return;

    console.log(coaching);
    console.log("Je modifie le coaching");

    try {
      await updateCoaching(params.id, {
        title: coaching.title,
        slogan: coaching.slogan,
        picture: coaching.picture,
        description: coaching.description,
        shortDescription: coaching.shortDescription,
        price: Number(coaching.price),
        promotion: coaching.promotion,
        promotionTime: 20,
        currentProblems: coaching.currentProblems.map(p => p.problem),
        gains: coaching.gains,
        includes: coaching.includes
      });
      router.push('/dashboard/coachings');
    } catch (error) {
      console.error('Error updating coaching:', error);
    }
  };

  const handleFieldChange = (id: string, value: any) => {
    if (!coaching) return;
    const fieldMap: { [key: string]: string } = {
      'title': 'title',
      'slogan': 'slogan',
      'shortDescription': 'shortDescription',
      'description': 'description',
      'price': 'price',
      'promotion': 'promotion',
      'promotionTime': 'promotionTime'
    };
    
    if (fieldMap[id]) {
      setCoaching(prev => prev ? { ...prev, [fieldMap[id]]: value } : null);
    }
  };

  const handleGeneralModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!coaching) return;
    const { id, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'title': 'title',
      'slogan': 'slogan',
      'shortDescription': 'shortDescription',
      'description': 'description'
    };
    
    if (fieldMap[id]) {
      handleFieldChange(fieldMap[id], value);
    }
  };

  const handlePriceModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!coaching) return;
    const { id, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'price': 'price',
      'promotion': 'promotion',
      'promotionTime': 'promotionTime'
    };
    
    if (fieldMap[id]) {
      handleFieldChange(fieldMap[id], Number(value));
    }
  };

  const handleCurrentProblemsModuleChange = (problems: ProblemObject[]) => {
    if (!coaching) return;
    setCoaching(prev => prev ? { ...prev, currentProblems: problems } : null);
  };  

  const handleGainsModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!coaching) return;
    try {
      const parsedGains = JSON.parse(e.target.value);
      setCoaching(prev => prev ? { ...prev, gains: parsedGains } : null);
    } catch (error) {
      console.error('Error parsing gains:', error);
    }
  };

  const handleContentModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!coaching) return;
    try {
      const parsedContent = JSON.parse(e.target.value);
      setCoaching(prev => prev ? { ...prev, includes: parsedContent } : null);
    } catch (error) {
      console.error('Error parsing content:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!coaching) return <div>Coaching not found</div>;

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title={`TITRE : ${coaching.title}`} className='text-left'/>
      </DashboardSection>
      <form className='my-6' onSubmit={handleSubmit}>
        <GeneralModule 
          title={coaching.title} 
          slogan={coaching.slogan} 
          shortDescription={coaching.shortDescription} 
          description={coaching.description}
          handleChange={handleGeneralModuleChange}
        />
        <ImgModule 
          imgURL={coaching.picture}
          handleChange={handleGeneralModuleChange}
        />
        <PriceModule  
          price={Number(coaching.price)} 
          promotion={coaching.promotion} 
          promotionTime={20}
          handlePriceChange={handlePriceModuleChange}
          handlePromotionChange={handlePriceModuleChange}
          handlePromotionTimeChange={handlePriceModuleChange}
        />
        <CurrentProblemsModule 
          currentProblems={coaching.currentProblems}
          handleChange={handleCurrentProblemsModuleChange}
        />
        <GainsModule 
          gains={coaching.gains}
          handleChange={handleGainsModuleChange}
        />    
        <ContentModule 
          contents={coaching.includes}
          handleChange={handleContentModuleChange}
        />
        <button 
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}